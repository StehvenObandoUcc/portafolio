"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import type { Platform, ProjectFilter } from "@/data/types";
import { cn } from "@/lib/cn";
import { isMotionOff } from "@/lib/motionPreference";
import { TECH_EVENT, type TechFocus } from "@/lib/techFocus";

export interface ProjectGridItem {
  id: string;
  platforms: Platform[];
  featured: boolean;
  /** Stack names, matched against a tool picked on the logo wall. */
  stack: string[];
  /** The card, already rendered on the server. */
  card: ReactNode;
}

interface ProjectGridProps {
  filters: { id: ProjectFilter; label: string }[];
  filtersLabel: string;
  emptyLabel: string;
  /** "Con {tech}" and the button that clears it. */
  techLabels: { active: string; clear: string };
  items: ProjectGridItem[];
}

/**
 * Runs a filter change as a view transition: cards that stay slide to their
 * new cell, the ones that leave or arrive scale and fade (see globals.css).
 * Browsers without view transitions, and the navbar pause, just swap.
 */
function reflow(update: () => void) {
  if (typeof document.startViewTransition !== "function" || isMotionOff()) {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}

/**
 * Client island for the projects: filter chips and the grid that reflows
 * with a view transition. The cards themselves arrive server-rendered.
 */
export function ProjectGrid({ filters, filtersLabel, emptyLabel, techLabels, items }: ProjectGridProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [tech, setTech] = useState<TechFocus | null>(null);

  useEffect(() => {
    const onTech = (event: Event) => {
      reflow(() => {
        setFilter("all");
        setTech((event as CustomEvent<TechFocus>).detail);
      });
    };
    window.addEventListener(TECH_EVENT, onTech);
    return () => window.removeEventListener(TECH_EVENT, onTech);
  }, []);

  const visible = items.filter(
    (item) =>
      (filter === "all" || item.platforms.includes(filter)) &&
      (!tech || item.stack.some((name) => tech.includes.includes(name))),
  );
  const countFor = (id: ProjectFilter) =>
    id === "all" ? items.length : items.filter((item) => item.platforms.includes(id)).length;

  return (
    <>
      <Reveal className="mb-8">
        <div
          role="group"
          aria-label={filtersLabel}
          className="snap-rail -mx-gutter flex gap-2 overflow-x-auto px-gutter pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {filters.map((chip) => {
            const selected = chip.id === filter;
            const count = countFor(chip.id);
            // A platform with nothing published yet stays listed but cannot lead to an empty grid.
            const empty = count === 0;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={selected}
                disabled={empty}
                onClick={() =>
                  reflow(() => {
                    setFilter(chip.id);
                    setTech(null);
                  })
                }
                className={cn(
                  "chip inline-flex h-11 md:h-10 pointer-coarse:h-11 flex-none items-center gap-2 rounded-pill border px-4 text-[14px] font-medium transition-[background-color,color,border-color] duration-200 ease-soft",
                  empty
                    ? "cursor-not-allowed border-dashed border-line-strong bg-transparent text-ink-mute"
                    : selected
                      ? "border-accent-600 bg-accent-600 text-on-accent"
                      : "border-line-strong bg-surface/60 text-ink-soft hover:border-accent-500 hover:bg-accent-50 hover:text-accent-600",
                )}
              >
                {chip.label}
                <span className={cn("font-mono text-[11px] tabular", selected ? "text-accent-100" : "text-ink-mute")}>
                  {count}
                </span>
              </button>
            );
          })}
          {tech && (
            <span className="inline-flex h-11 flex-none items-center gap-1 rounded-pill border border-accent-600 bg-accent-50 pr-1 pl-4 text-[14px] font-medium text-accent-600 md:h-10">
              {techLabels.active.replace("{tech}", tech.label)}
              <button
                type="button"
                onClick={() => reflow(() => setTech(null))}
                aria-label={techLabels.clear}
                className="grid size-9 place-items-center rounded-pill transition-colors hover:bg-accent-100"
              >
                <Icon name="close" size={14} />
              </button>
            </span>
          )}
        </div>
      </Reveal>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {visible.map((item, i) => (
          <li
            key={item.id}
            className="project-cell"
            style={{ viewTransitionName: `project-${item.id.replace(/[^a-zA-Z0-9-]/g, "-")}` } as CSSProperties}
          >
            <Reveal index={i} motion="card" className="h-full">
              {item.card}
            </Reveal>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p role="status" className="rounded-lg border border-dashed border-line-strong px-6 py-12 text-center text-ink-soft">
          {emptyLabel}
        </p>
      )}
    </>
  );
}
