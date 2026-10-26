"use client";

import { useEffect } from "react";

const VISIBLE_SHARE = 0.15;

function show(el: HTMLElement) {
  if (el.dataset.reveal !== "shown") el.dataset.reveal = "shown";
}

/** Blocks a fast scroll, anchor jump or find-in-page skipped over never intersect: release them. */
function releasePassed() {
  document.querySelectorAll<HTMLElement>('[data-reveal="below"]').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) show(el);
  });
}

/**
 * Drives every [data-reveal] block with one IntersectionObserver.
 * Blocks below the viewport wait as "below" and glide in on a timed, eased
 * transition once 15% of them shows, so the motion stays smooth whatever
 * the scroll wheel does. When the visitor scrolls back up past a block it
 * re-arms below, so it replays on the way down. A block that was seen is
 * never hidden above the viewport: printing, find-in-page and full-page
 * captures always get the content. Blocks on screen at load stay as rendered.
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
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) continue;
          }

          if (enough) {
            show(el);
          } else if (!entry.isIntersecting && entry.boundingClientRect.top >= viewport) {
            el.dataset.reveal = "below";
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
            show(el);
            io.observe(el);
          });
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let frame = 0;
    const onSettle = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(releasePassed);
    };
    const onPrint = () => document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(show);
    window.addEventListener("scrollend", onSettle);
    window.addEventListener("hashchange", onSettle);
    window.addEventListener("beforeprint", onPrint);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scrollend", onSettle);
      window.removeEventListener("hashchange", onSettle);
      window.removeEventListener("beforeprint", onPrint);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
