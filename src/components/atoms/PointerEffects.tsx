"use client";

import { useEffect } from "react";
import { isMotionOff } from "@/lib/motionPreference";

const MAGNETIC = ".btn, [data-magnetic]";
const TILT = "[data-tilt]";

/**
 * One delegated pointer listener for the whole page (mouse only):
 * - buttons lean toward the cursor (--mx, --my)
 * - [data-tilt] surfaces tilt in 3D with a moving glare (--rx, --ry, --gx, --gy)
 * - the hero graph paper lights up under the cursor (--cx, --cy)
 */
export function PointerEffects() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const hero = document.getElementById("home");
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    let frame = 0;
    let event: PointerEvent | null = null;

    const release = (el: HTMLElement | null, vars: string[]) => {
      if (!el) return;
      vars.forEach((name) => el.style.removeProperty(name));
    };

    const update = () => {
      frame = 0;
      const e = event;
      if (!e) return;
      const target = e.target instanceof Element ? e.target : null;

      const nextMagnet = target?.closest<HTMLElement>(MAGNETIC) ?? null;
      if (nextMagnet !== magnet) {
        release(magnet, ["--mx", "--my"]);
        magnet = nextMagnet;
      }
      if (magnet && magnet.getAttribute("aria-disabled") !== "true") {
        const r = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        magnet.style.setProperty("--mx", `${(dx * 12).toFixed(2)}px`);
        magnet.style.setProperty("--my", `${(dy * 10).toFixed(2)}px`);
      }

      const nextTilt = target?.closest<HTMLElement>(TILT) ?? null;
      if (nextTilt !== tilt) {
        release(tilt, ["--rx", "--ry", "--gx", "--gy"]);
        tilt = nextTilt;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        tilt.style.setProperty("--rx", `${((px - 0.5) * 9).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(-(py - 0.5) * 9).toFixed(2)}deg`);
        tilt.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
        tilt.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
      }

      if (hero) {
        const r = hero.getBoundingClientRect();
        if (e.clientY >= r.top && e.clientY <= r.bottom) {
          hero.style.setProperty("--cx", `${(e.clientX - r.left).toFixed(0)}px`);
          hero.style.setProperty("--cy", `${(e.clientY - r.top).toFixed(0)}px`);
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || isMotionOff()) return;
      event = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => {
      release(magnet, ["--mx", "--my"]);
      release(tilt, ["--rx", "--ry", "--gx", "--gy"]);
      magnet = null;
      tilt = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
