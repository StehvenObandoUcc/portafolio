"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { isMotionOff, subscribeMotion } from "@/lib/motionPreference";

/** The testimonials are a sideways rail only below 900px; above, a grid. */
const RAIL_QUERY = "(max-width: 899px)";
/** How long each card rests before the rail moves on. */
const DWELL_MS = 5000;
/** A swipe, wheel or press hands the rail to the visitor for this long. */
const HOLD_MS = 8000;

function subscribeRail(onChange: () => void) {
  const media = window.matchMedia(RAIL_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const isRail = () => window.matchMedia(RAIL_QUERY).matches;

interface TestimonialRailProps {
  /** id of the section heading that names the rail. */
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

/**
 * On phones, a snap rail that advances one card every 5s while on screen.
 * Hover, focus or touch pauses it; the navbar motion switch stops it.
 */
export function TestimonialRail({ labelledBy, className, children }: TestimonialRailProps) {
  const ref = useRef<HTMLUListElement>(null);
  const rail = useSyncExternalStore(subscribeRail, isRail, () => false);
  const motionOff = useSyncExternalStore(subscribeMotion, isMotionOff, () => false);

  useEffect(() => {
    const list = ref.current;
    if (!list || !rail || motionOff) return;

    let hovered = false;
    let focused = false;
    let heldUntil = 0;
    let restingSince = performance.now();

    const hold = () => {
      heldUntil = performance.now() + HOLD_MS;
    };
    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovered = true;
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!list.contains(event.relatedTarget as Node | null)) focused = false;
    };

    const advance = () => {
      const first = list.firstElementChild;
      if (!first || list.children.length < 2) return;
      const step = first.getBoundingClientRect().width + (parseFloat(getComputedStyle(list).columnGap) || 0);
      const end = list.scrollWidth - list.clientWidth;
      const atEnd = list.scrollLeft >= end - 4;
      list.scrollTo({ left: atEnd ? 0 : Math.min(list.scrollLeft + step, end), behavior: "smooth" });
    };

    const tick = () => {
      const now = performance.now();
      const box = list.getBoundingClientRect();
      const onScreen = box.bottom > 0 && box.top < window.innerHeight;
      if (hovered || focused || document.hidden || !onScreen || now < heldUntil) {
        restingSince = now;
        return;
      }
      if (now - restingSince >= DWELL_MS) {
        advance();
        restingSince = now;
      }
    };

    const timer = window.setInterval(tick, 500);
    list.addEventListener("pointerenter", onPointerEnter);
    list.addEventListener("pointerleave", onPointerLeave);
    list.addEventListener("pointerdown", hold);
    list.addEventListener("touchstart", hold, { passive: true });
    list.addEventListener("wheel", hold, { passive: true });
    list.addEventListener("focusin", onFocusIn);
    list.addEventListener("focusout", onFocusOut);
    return () => {
      window.clearInterval(timer);
      list.removeEventListener("pointerenter", onPointerEnter);
      list.removeEventListener("pointerleave", onPointerLeave);
      list.removeEventListener("pointerdown", hold);
      list.removeEventListener("touchstart", hold);
      list.removeEventListener("wheel", hold);
      list.removeEventListener("focusin", onFocusIn);
      list.removeEventListener("focusout", onFocusOut);
    };
  }, [rail, motionOff]);

  return (
    <ul ref={ref} tabIndex={rail ? 0 : undefined} aria-labelledby={labelledBy} className={className}>
      {children}
    </ul>
  );
}
