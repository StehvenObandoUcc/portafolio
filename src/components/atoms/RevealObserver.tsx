"use client";

import { useEffect } from "react";

const VISIBLE_SHARE = 0.15;

type RevealState = "shown" | "below" | "above";

function setState(el: HTMLElement, state: RevealState) {
  if (el.dataset.reveal !== state) el.dataset.reveal = state;
}

/**
 * Drives every [data-reveal] block with one IntersectionObserver.
 * Blocks off screen wait as "below" or "above" (the side they will enter
 * from) and glide in on a timed, eased transition once 15% of them shows,
 * so the motion stays smooth whatever the scroll wheel does. They reset
 * when they leave, so the page replays scrolling down and back up.
 * Blocks on screen at load are never hidden.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const viewport = entry.rootBounds?.height ?? window.innerHeight;
          const enough =
            entry.isIntersecting &&
            (entry.intersectionRatio >= VISIBLE_SHARE || entry.intersectionRect.height >= viewport * VISIBLE_SHARE);

          if (!seen.has(el)) {
            seen.add(el);
            // Already on screen at load: keep it as rendered.
            if (entry.isIntersecting) continue;
          }

          if (enough) {
            setState(el, "shown");
          } else if (!entry.isIntersecting) {
            setState(el, entry.boundingClientRect.top >= viewport ? "below" : "above");
          }
        }
      },
      { threshold: [0, VISIBLE_SHARE, 0.4] },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      // Cards in a horizontal rail can sit off-screen sideways: keep them visible.
      if (el.closest(".snap-rail")) return;
      io.observe(el);
    });

    // Content inserted by a filter or tab appears in place.
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          const blocks = node.matches("[data-reveal]") ? [node] : [...node.querySelectorAll<HTMLElement>("[data-reveal]")];
          blocks.forEach((el) => {
            seen.add(el);
            setState(el, "shown");
            io.observe(el);
          });
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
