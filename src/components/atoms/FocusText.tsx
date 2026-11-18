"use client";

import { Fragment, useEffect, useRef } from "react";
import { isMotionOff } from "@/lib/motionPreference";

interface FocusTextProps {
  text: string;
  /** Words set as pills wherever they appear. */
  keywords: string[];
  className?: string;
}

/** Splits into clauses at commas, "y"/"and" and full stops, keeping the separators. */
function clauses(text: string) {
  return text.match(/[^,.;]+(?:[,.;]\s*|$)/g) ?? [text];
}

function withPills(part: string, keywords: string[]) {
  if (keywords.length === 0) return part;
  const re = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return part.split(re).map((piece, i) =>
    keywords.includes(piece) ? (
      <span key={i} className="focus-pill">
        {piece}
      </span>
    ) : (
      <Fragment key={i}>{piece}</Fragment>
    ),
  );
}

/**
 * A paragraph that comes into focus clause by clause as it scrolls up the
 * screen. The text is sharp in the HTML; the blur only applies once the
 * script runs and motion is on.
 */
export function FocusText({ text, keywords, className }: FocusTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const parts = clauses(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || isMotionOff() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = [...el.querySelectorAll<HTMLElement>(".focus-part")];
    el.dataset.focus = "on";

    let frame = 0;
    const update = () => {
      frame = 0;
      if (isMotionOff()) {
        delete el.dataset.focus;
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph's top reaches 85% of the screen, 1 when its bottom passes 45%.
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
      const lit = progress * spans.length;
      spans.forEach((s, i) => {
        s.style.setProperty("--focus", String(Math.min(1, Math.max(0, lit - i))));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete el.dataset.focus;
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {parts.map((part, i) => (
        <span key={i} className="focus-part">
          {withPills(part, keywords)}
        </span>
      ))}
    </p>
  );
}
