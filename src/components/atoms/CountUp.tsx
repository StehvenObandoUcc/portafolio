"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  /** Final value as written in the data, e.g. "6+" or "5.º". */
  value: string;
  /** Milliseconds before counting starts (matches the hero entrance). */
  delay?: number;
  duration?: number;
}

/**
 * Counts the leading number of `value` up from zero once, on load.
 * The server HTML already holds the final value, so nothing is lost
 * without JavaScript or with reduced motion.
 */
export function CountUp({ value, delay = 0, duration = 1100 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\d+)(.*)$/);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    el.textContent = `0${suffix}`;
    const timer = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value, delay, duration]);

  return <span ref={ref}>{value}</span>;
}
