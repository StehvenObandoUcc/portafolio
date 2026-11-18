"use client";

import { useEffect, useRef } from "react";
import { isMotionOff, subscribeMotion } from "@/lib/motionPreference";

/** Internal render size; the canvas is scaled up with crisp pixels, so each dot reads. */
const RES = 100;

/**
 * A low-poly cat (CC0, "simple cat" by drummyfish on OpenGameArt) drawn as
 * ordered-dither dots in the page's ink. It turns to look at the pointer and
 * idles with a slow sway. three.js loads only once the hero is on screen.
 */
export function DitherCat() {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      const { OBJLoader } = await import("three/examples/jsm/loaders/OBJLoader.js");
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
      renderer.setSize(RES, RES, false);

      // Pass 1: the lit cat into a small texture.
      const target = new THREE.WebGLRenderTarget(RES, RES);
      const scene = new THREE.Scene();
      const FOV = 30;
      const DIST = 6.4;
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
      camera.position.set(0, 0, DIST);
      camera.lookAt(0, 0, 0);
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(-3, 4, 5);
      scene.add(key);

      const texture = await new THREE.TextureLoader().loadAsync("/models/cat.webp");
      texture.colorSpace = THREE.SRGBColorSpace;
      const obj = await new OBJLoader().loadAsync("/models/cat.obj");
      if (disposed) return;
      const material = new THREE.MeshLambertMaterial({ map: texture, flatShading: true });
      obj.traverse((child) => {
        if ((child as import("three").Mesh).isMesh) (child as import("three").Mesh).material = material;
      });
      // Centre the model on its feet and scale it to about two units tall.
      const box = new THREE.Box3().setFromObject(obj);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      obj.position.sub(center);
      obj.position.y += size.y / 2;
      const pivot = new THREE.Group();
      pivot.add(obj);
      pivot.scale.setScalar(2.7 / Math.max(size.x, size.y, size.z));
      // Feet on the bottom edge of the frame, so the cat sits on the rule below it.
      pivot.position.y = -DIST * Math.tan(((FOV / 2) * Math.PI) / 180) * 0.97;
      scene.add(pivot);

      // Pass 2: luminance through a 4×4 Bayer matrix; dark → ink dot, light → paper.
      const ink = new THREE.Color();
      const readInk = () => ink.set(getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#14213d");
      readInk();
      const quad = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
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
        }),
      );
      const post = new THREE.Scene();
      post.add(quad);
      const postCam = new THREE.Camera();

      // Pointer: the cat turns its body toward it, eased.
      let aimYaw = -0.5;
      let aimPitch = 0;
      let yaw = aimYaw;
      let pitch = 0;
      const onMove = (event: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (event.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (event.clientY - (r.top + r.height / 2)) / window.innerHeight;
        aimYaw = Math.max(-1.2, Math.min(1.2, dx * 2.6)) - 0.35;
        aimPitch = Math.max(-0.25, Math.min(0.25, dy * 0.6));
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const isStill = () => isMotionOff() || reduced.matches;
      const draw = (t: number) => {
        const still = isStill();
        const sway = still ? 0 : Math.sin(t / 1400) * 0.08;
        yaw += (aimYaw + sway - yaw) * 0.06;
        pitch += (aimPitch - pitch) * 0.06;
        pivot.rotation.set(pitch, yaw, 0);
        renderer.setRenderTarget(target);
        renderer.setClearColor(0x000000, 0);
        renderer.clear();
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);
        renderer.clear();
        renderer.render(post, postCam);
      };

      // Only animate while visible.
      let frame = 0;
      let visible = false;
      const loop = (t: number) => {
        draw(t);
        frame = visible && !isStill() ? requestAnimationFrame(loop) : 0;
      };
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame) frame = requestAnimationFrame(loop);
      });
      io.observe(el);
      const stopMotion = subscribeMotion(() => {
        if (!frame) frame = requestAnimationFrame(loop);
      });
      const themeWatch = new MutationObserver(() => {
        readInk();
        if (!frame) frame = requestAnimationFrame(loop);
      });
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      el.dataset.ready = "";

      cleanup = () => {
        cancelAnimationFrame(frame);
        io.disconnect();
        stopMotion();
        themeWatch.disconnect();
        window.removeEventListener("pointermove", onMove);
        target.dispose();
        texture.dispose();
        material.dispose();
        renderer.dispose();
        canvas.remove();
      };
    };

    // Load three.js only when the cat is about to be seen.
    const gate = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      gate.disconnect();
      start();
    }, { rootMargin: "200px" });
    gate.observe(el);

    return () => {
      disposed = true;
      gate.disconnect();
      cleanup();
    };
  }, []);

  return <div ref={holder} aria-hidden="true" className="dither-cat" />;
}
