"use client";

import { useEffect } from "react";

const VISIBLE_SHARE = 0.2;

function reveal(el: HTMLElement) {
  el.dataset.reveal = "shown";
}

/** Blocks skipped by a fast scroll or an anchor jump never intersect: release them. */
function revealPassed() {
  document.querySelectorAll<HTMLElement>('[data-reveal="hidden"]').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
  });
}

/**
 * Drives every [data-reveal] block with a single IntersectionObserver:
 * blocks below the fold on first report are hidden, then fade up once
 * 20% of them (or 20% of the viewport, for tall blocks) is visible.
 * Blocks added later (filters, tabs) are picked up by a MutationObserver.
 */
export function RevealObserver() {
  useEffect(() => {
    // Scroll-driven CSS animations play (and reverse) the reveals natively.
    if (CSS.supports("animation-timeline: view()")) return;
    if (!("IntersectionObserver" in window)) return;
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const viewport = entry.rootBounds?.height ?? window.innerHeight;

          if (!seen.has(el)) {
            seen.add(el);
            if (entry.isIntersecting || entry.boundingClientRect.top < viewport) {
              io.unobserve(el);
            } else {
              el.dataset.reveal = "hidden";
            }
            continue;
          }
          if (entry.intersectionRatio >= VISIBLE_SHARE || entry.intersectionRect.height >= viewport * VISIBLE_SHARE) {
            reveal(el);
            io.unobserve(el);
            revealPassed();
          }
        }
      },
      { threshold: [0, 0.1, VISIBLE_SHARE, 0.4] },
    );

    const observe = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>('[data-reveal=""]').forEach((el) => {
        // Cards in a horizontal rail can sit off-screen sideways: keep them visible.
        if (el.closest(".snap-rail")) return;
        if (!seen.has(el)) io.observe(el);
      });
    observe(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          // Content inserted by a filter or tab appears in place: show it.
          node.querySelectorAll<HTMLElement>("[data-reveal]").forEach(reveal);
          if (node.dataset.reveal !== undefined) reveal(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let frame = 0;
    const onScrollEnd = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(revealPassed);
    };
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("hashchange", onScrollEnd);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("hashchange", onScrollEnd);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
