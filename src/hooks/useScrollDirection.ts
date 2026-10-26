"use client";

import { useEffect, useState } from "react";

/**
 * "down" while the visitor scrolls down past `offset`, "up" otherwise.
 * Small jitters under `tolerance` pixels are ignored.
 */
export function useScrollDirection(offset = 320, tolerance = 6): "up" | "down" {
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < tolerance) return;
      setDirection(y > last && y > offset ? "down" : "up");
      last = y;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [offset, tolerance]);

  return direction;
}
