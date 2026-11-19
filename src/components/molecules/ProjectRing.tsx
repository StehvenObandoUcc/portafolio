"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CASE_EVENT } from "@/components/molecules/ProjectGallery";
import type { Platform } from "@/data/types";

export interface RingItem {
  id: string;
  title: string;
  platform?: Platform;
  platformLabel: string;
  cover: { src: string; width: number; height: number; alt: string };
  /** Opens the project's gallery when the panel is clicked. */
  hasGallery: boolean;
}

interface ProjectRingProps {
  items: RingItem[];
  hint: string;
  /** "{n} / {total}" */
  counter: string;
  openLabel: string;
}

/**
 * The projects on a ring in 3D (after Alche's works carousel). The section
 * pins while the scroll turns the ring one project at a time; then the page
 * moves on to the usual grid. Pure CSS 3D: no WebGL.
 */
export function ProjectRing({ items, hint, counter, openLabel }: ProjectRingProps) {
  const pin = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState(0);
  const n = items.length;
  const step = 360 / n;

  useEffect(() => {
    const el = pin.current;
    const wheel = ring.current;
    if (!el || !wheel) return;
    let frame = 0;
    let shown = -1;
    const panels = [...wheel.querySelectorAll<HTMLElement>(".ring-panel")];
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const run = el.offsetHeight - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
      const angle = p * step * (n - 1);
      wheel.style.setProperty("--ring-turn", `${-angle}deg`);
      // Panels turned away fade and darken, the front one is lit.
      panels.forEach((panel, i) => {
        const rel = (((i * step - angle) % 360) + 540) % 360 - 180;
        const facing = Math.cos((rel * Math.PI) / 180);
        panel.style.setProperty("--facing", facing.toFixed(3));
        // Hide panels turned away outright: backface-visibility is unreliable on composited layers.
        panel.style.visibility = facing < -0.05 ? "hidden" : "visible";
      });
      const idx = Math.round(angle / step) % n;
      if (idx !== shown) {
        shown = idx;
        setFront(idx);
      }
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
    };
  }, [n, step]);

  const current = items[front];

  return (
    <div ref={pin} className="ring-pin" style={{ height: `${100 + n * 45}vh` }}>
      <div className="ring-stage">
        <div ref={ring} className="ring" style={{ "--n": n } as CSSProperties}>
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              tabIndex={i === front ? 0 : -1}
              aria-label={openLabel.replace("{title}", item.title)}
              onClick={() => item.hasGallery && window.dispatchEvent(new CustomEvent(CASE_EVENT, { detail: item.id }))}
              data-platform={item.platform}
              className="ring-panel project-cover"
              style={{ "--i": i } as CSSProperties}
            >
              <Image
                src={item.cover.src}
                alt={item.cover.alt}
                width={item.cover.width}
                height={item.cover.height}
                sizes="(min-width: 900px) 420px, 70vw"
                className="ring-shot"
              />
            </button>
          ))}
        </div>
        <div className="ring-caption" aria-live="polite">
          <p className="text-label text-accent-600 tabular">
            {counter.replace("{n}", String(front + 1).padStart(2, "0")).replace("{total}", String(n).padStart(2, "0"))}
            {" · "}
            {current?.platformLabel}
          </p>
          <p className="text-h2 mt-2 text-ink">{current?.title}</p>
          <p className="text-label mt-3 text-ink-mute">{hint}</p>
        </div>
      </div>
    </div>
  );
}
