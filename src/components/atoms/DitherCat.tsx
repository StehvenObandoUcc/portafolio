"use client";

import { useEffect, useRef } from "react";
import { isMotionOff, subscribeMotion } from "@/lib/motionPreference";

/** CSS pixels per dither dot. */
const DOT = 1.6;
/** World units across the strip's height; the cat is about two units long. */
const VIEW_H = 2.2;
/** Yaw that turns the model to face +x (to the right). */
const FACING = Math.PI / 2;
const SPEED = 0.95;

/**
 * A low-poly cat (CC0, "simple cat" by drummyfish on OpenGameArt) drawn as
 * ordered-dither dots in the page's ink. It walks back and forth along its
 * strip with its own walk cycle, stops now and then, and turns to look when
 * the pointer comes close. three.js loads only once the strip is near the screen.
 */
export function DitherCat({ mode = "patrol" }: { mode?: "patrol" | "follow" }) {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      if (disposed) return;

      const canvas = document.createElement("canvas");
      canvas.className = "dither-cat-canvas";
      el.append(canvas);

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
      } catch {
        canvas.remove();
        return;
      }
      renderer.setPixelRatio(1);

      const gltf = await new GLTFLoader().loadAsync("/models/cat.glb");
      if (disposed) {
        renderer.dispose();
        return;
      }

      // Pass 1: the lit cat into a small texture.
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, VIEW_H, 0, 0.1, 50);
      // Feet on the bottom edge of the strip, so the cat walks on the rule below it.
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, 0);
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(-3, 4, 5);
      scene.add(key);

      const model = gltf.scene;
      const materials: import("three").Material[] = [];
      model.traverse((child) => {
        const mesh = child as import("three").Mesh;
        if (!mesh.isMesh) return;
        const source = mesh.material as import("three").MeshStandardMaterial;
        const material = new THREE.MeshLambertMaterial({ map: source.map, flatShading: true });
        materials.push(material);
        mesh.material = material;
      });
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.set(-center.x, -box.min.y, -center.z);
      const scale = 1.55 / size.y;
      const cat = new THREE.Group();
      const body = new THREE.Group();
      body.add(model);
      body.scale.setScalar(scale);
      cat.add(body);
      scene.add(cat);
      const halfLength = (Math.max(size.x, size.z) * scale) / 2;

      const mixer = new THREE.AnimationMixer(model);
      const walk = gltf.animations[0] ? mixer.clipAction(gltf.animations[0]) : null;
      walk?.play();

      const target = new THREE.WebGLRenderTarget(1, 1);

      // Pass 2: luminance through a 4×4 Bayer matrix; dark → ink dot, light → nothing.
      const ink = new THREE.Color();
      const readInk = () => ink.set(getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#14213d");
      readInk();
      const quadMaterial = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: { tScene: { value: target.texture }, uInk: { value: ink } },
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
        fragmentShader: `
          uniform sampler2D tScene; uniform vec3 uInk; varying vec2 vUv;
          float bayer(vec2 p){
            int x = int(mod(p.x, 4.0)); int y = int(mod(p.y, 4.0)); int i = x + y * 4;
            float m[16] = float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
            for (int k = 0; k < 16; k++) if (k == i) return (m[k] + 0.5) / 16.0;
            return 0.5;
          }
          void main(){
            vec4 c = texture2D(tScene, vUv);
            if (c.a < 0.5) discard;
            // The target holds linear light; dither in perceptual space so the fur keeps its stripes.
            float l = pow(dot(c.rgb, vec3(0.299, 0.587, 0.114)), 1.0 / 2.2);
            l = clamp((l - 0.12) * 1.45, 0.0, 1.0);
            if (l > bayer(gl_FragCoord.xy)) discard;
            gl_FragColor = vec4(uInk, 1.0);
          }`,
      });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), quadMaterial);
      const post = new THREE.Scene();
      post.add(quad);
      const postCam = new THREE.Camera();

      // Strip size → render size and the walkable range.
      let halfW = 1;
      const resize = () => {
        const w = Math.max(1, Math.round(el.clientWidth / DOT));
        const h = Math.max(1, Math.round(el.clientHeight / DOT));
        renderer.setSize(w, h, false);
        target.setSize(w, h);
        halfW = (VIEW_H * (w / h)) / 2;
        camera.left = -halfW;
        camera.right = halfW;
        camera.top = VIEW_H - 0.04;
        camera.bottom = -0.04;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(() => {
        resize();
        kick();
      });
      ro.observe(el);

      // Walk state: x in world units, dir ±1, pauses at random.
      let x = halfW * 0.4;
      let dir = -1;
      let yaw = FACING * dir;
      let pauseLeft = 0;
      let nextPause = 6 + Math.random() * 5;
      let near = false;
      let pointerX = 0;

      const onMove = (event: PointerEvent) => {
        const r = el.getBoundingClientRect();
        near =
          event.clientX > r.left - 40 && event.clientX < r.right + 40 &&
          event.clientY > r.top - 60 && event.clientY < r.bottom + 60;
        pointerX = ((event.clientX - r.left) / r.width - 0.5) * 2 * halfW;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      // A small sprite walking in place is not a vestibular trigger, so only the
      // portfolio's own pause button stops it (Windows with animations off reports
      // reduced motion for every page).
      const isStill = () => isMotionOff();

      // Follow mode: walking is driven by the page scroll, not by a timer.
      let lastScroll = window.scrollY;
      let scrollSpeed = 0;
      let idleFor = 0;

      const clock = new THREE.Clock();
      const step = (dt: number) => {
        const edge = halfW - halfLength - 0.1;
        if (mode === "follow") {
          const dy = window.scrollY - lastScroll;
          lastScroll = window.scrollY;
          const v = dt > 0 ? dy / dt : 0;
          scrollSpeed += (Math.abs(v) - scrollSpeed) * Math.min(1, dt * 6);
          idleFor = Math.abs(v) > 30 ? 0 : idleFor + dt;
          if (Math.abs(v) > 30) dir = v > 0 ? 1 : -1;
          const moving = idleFor < 0.35 && !near;
          if (moving) {
            const turning = Math.abs(FACING * dir - yaw) > 0.05;
            yaw += (FACING * dir - yaw) * Math.min(1, dt * 7);
            const pace = Math.min(2.4, 0.6 + scrollSpeed / 700);
            if (walk) walk.timeScale += (pace - walk.timeScale) * Math.min(1, dt * 8);
            if (!turning) x += dir * SPEED * pace * dt;
            if (x < -edge) { x = -edge; dir = 1; }
            if (x > edge) { x = edge; dir = -1; }
          } else {
            // Stopped: turn to look at the viewer (or the pointer when it is close).
            const want = near ? (pointerX > x ? FACING * 0.45 : -FACING * 0.45) : FACING * 0.15 * dir;
            yaw += (want - yaw) * Math.min(1, dt * 5);
            if (walk) walk.timeScale += (0 - walk.timeScale) * Math.min(1, dt * 8);
          }
          cat.position.x = x;
          cat.rotation.y = yaw;
          mixer.update(dt);
          return;
        }
        if (near) {
          // Stop and look toward the pointer, a little toward the viewer.
          const want = pointerX > x ? FACING * 0.45 : -FACING * 0.45;
          yaw += (want - yaw) * Math.min(1, dt * 6);
          if (walk) walk.timeScale += (0 - walk.timeScale) * Math.min(1, dt * 8);
        } else if (pauseLeft > 0) {
          pauseLeft -= dt;
          if (walk) walk.timeScale += (0 - walk.timeScale) * Math.min(1, dt * 8);
          yaw += (FACING * dir * 0.6 - yaw) * Math.min(1, dt * 3);
        } else {
          const turning = Math.abs(FACING * dir - yaw) > 0.05;
          yaw += (FACING * dir - yaw) * Math.min(1, dt * 5);
          if (walk) walk.timeScale += (1 - walk.timeScale) * Math.min(1, dt * 6);
          if (!turning) x += dir * SPEED * dt;
          if (x < -edge) { x = -edge; dir = 1; }
          if (x > edge) { x = edge; dir = -1; }
          nextPause -= dt;
          if (nextPause <= 0) {
            pauseLeft = 0.9 + Math.random() * 1.2;
            nextPause = 7 + Math.random() * 7;
          }
        }
        cat.position.x = x;
        cat.rotation.y = yaw;
        mixer.update(dt);
      };

      const draw = () => {
        renderer.setRenderTarget(target);
        renderer.setClearColor(0x000000, 0);
        renderer.clear();
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);
        renderer.clear();
        renderer.render(post, postCam);
      };

      // Animate only while on screen; a still view gets one frame.
      let frame = 0;
      let visible = false;
      const loop = () => {
        const dt = Math.min(0.05, clock.getDelta());
        if (!isStill()) step(dt);
        else {
          if (walk) walk.timeScale = 0;
          cat.rotation.y = FACING * 0.6 * dir;
          mixer.update(0);
        }
        draw();
        frame = visible && shown && !isStill() ? requestAnimationFrame(loop) : 0;
      };
      const kick = () => {
        if (!frame) {
          clock.getDelta();
          frame = requestAnimationFrame(loop);
        }
      };
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      });
      io.observe(el);
      // The follower only shows once the hero (and its own cat) has scrolled away.
      let shown = mode !== "follow";
      const hero = mode === "follow" ? document.getElementById("home") : null;
      const heroWatch = hero
        ? new IntersectionObserver(([entry]) => {
            shown = !entry.isIntersecting;
            el.dataset.away = shown ? "true" : "false";
            if (shown) {
              lastScroll = window.scrollY;
              kick();
            }
          })
        : null;
      if (hero && heroWatch) heroWatch.observe(hero);
      const stopMotion = subscribeMotion(kick);
      const themeWatch = new MutationObserver(() => {
        readInk();
        kick();
      });
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      el.dataset.ready = "";

      cleanup = () => {
        cancelAnimationFrame(frame);
        io.disconnect();
        heroWatch?.disconnect();
        ro.disconnect();
        stopMotion();
        themeWatch.disconnect();
        window.removeEventListener("pointermove", onMove);
        mixer.stopAllAction();
        target.dispose();
        materials.forEach((m) => m.dispose());
        quadMaterial.dispose();
        renderer.dispose();
        canvas.remove();
      };
    };

    // Load three.js only when the strip is about to be seen.
    const gate = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gate.disconnect();
        start();
      },
      { rootMargin: "200px" },
    );
    gate.observe(el);

    return () => {
      disposed = true;
      gate.disconnect();
      cleanup();
    };
  }, [mode]);

  return <div ref={holder} aria-hidden="true" className={mode === "follow" ? "dither-cat dither-cat-follow" : "dither-cat"} />;
}
