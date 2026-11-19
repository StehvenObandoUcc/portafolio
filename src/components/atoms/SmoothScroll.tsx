"use client";

import { useEffect } from "react";
import { isMotionOff, subscribeMotion } from "@/lib/motionPreference";

/**
 * Inertial scroll (Lenis, after Cappen) for mouse wheels and trackpads; touch
 * keeps the native scroll. It writes the scroll speed to --scroll-v so covers
 * can lean with it, follows in-page links with the navbar offset, pauses while
 * a dialog or menu locks the page, and switches off with the site's pause button.
 */
export function SmoothScroll() {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    let frame = 0;
    let disposed = false;
    const root = document.documentElement;

    const raf = (time: number) => {
      lenis?.raf(time);
      const v = lenis ? Math.max(-1, Math.min(1, lenis.velocity / 40)) : 0;
      root.style.setProperty("--scroll-v", v.toFixed(3));
      frame = requestAnimationFrame(raf);
    };

    const enable = async () => {
      if (lenis || isMotionOff()) return;
      const { default: Lenis } = await import("lenis");
      if (disposed || lenis || isMotionOff()) return;
      lenis = new Lenis({
        lerp: 0.09,
        wheelMultiplier: 1,
        // Dialogs and the mobile menu scroll on their own.
        prevent: (node) => Boolean(node.closest("dialog, [role='dialog'], [data-lenis-prevent]")),
      });
      frame = requestAnimationFrame(raf);
    };
    const disable = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
      root.style.setProperty("--scroll-v", "0");
    };

    // In-page links: glide to the target below the fixed navbar.
    const onClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const navH = parseFloat(getComputedStyle(root).getPropertyValue("--nav-h")) || 68;
      lenis.scrollTo(target, { offset: -(navH + 12) });
      history.pushState(null, "", `#${id}`);
    };

    // Scroll lock (galleries, mobile menu) pauses the inertia.
    const lockWatch = new MutationObserver(() => {
      if (!lenis) return;
      if ("scrollLocked" in document.body.dataset) lenis.stop();
      else lenis.start();
    });
    lockWatch.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    const onMotion = () => (isMotionOff() ? disable() : enable());
    const stopMotion = subscribeMotion(onMotion);
    document.addEventListener("click", onClick);
    enable();

    return () => {
      disposed = true;
      disable();
      stopMotion();
      lockWatch.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
