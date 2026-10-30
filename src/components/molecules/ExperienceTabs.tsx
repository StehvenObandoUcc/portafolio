"use client";

import { m } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { HeadingParts } from "@/components/atoms/Heading";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { cn } from "@/lib/cn";

export type ExperienceTabId = "work" | "academic";

interface ExperienceTabsProps {
  index: string;
  title: HeadingParts;
  tabsLabel: string;
  tabs: Record<ExperienceTabId, string>;
  /** Panel contents, already rendered on the server. */
  panels: Record<ExperienceTabId, ReactNode>;
}

const TAB_ORDER: ExperienceTabId[] = ["work", "academic"];

/** Client island for the Experience tabs: tablist, keyboard support and the sliding underline. */
export function ExperienceTabs({ index, title, tabsLabel, tabs, panels }: ExperienceTabsProps) {
  const [tab, setTab] = useState<ExperienceTabId>("work");
  const baseId = useId();
  const tabRefs = useRef<Record<ExperienceTabId, HTMLButtonElement | null>>({ work: null, academic: null });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const current = TAB_ORDER.indexOf(tab);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? TAB_ORDER.length - 1
          : (current + (event.key === "ArrowRight" ? 1 : -1) + TAB_ORDER.length) % TAB_ORDER.length;
    const nextTab = TAB_ORDER[next];
    setTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  return (
    <>
      <SectionHeader
        id="experience-title"
        index={index}
        title={title}
        aside={
          <div role="tablist" aria-label={tabsLabel} className="flex gap-6 border-b border-line-strong md:border-b-0">
            {TAB_ORDER.map((id) => {
              const selected = tab === id;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    tabRefs.current[id] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`${baseId}-tab-${id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(id)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    "relative h-11 text-[15px] font-medium transition-colors duration-200",
                    selected ? "text-accent-600" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {tabs[id]}
                  {selected && (
                    <m.span
                      layoutId={`${baseId}-underline`}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 -bottom-px h-0.5 rounded-pill bg-accent-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        }
      />

      {TAB_ORDER.map((id) => (
        <div
          key={id}
          role="tabpanel"
          id={`${baseId}-panel-${id}`}
          aria-labelledby={`${baseId}-tab-${id}`}
          hidden={tab !== id}
          tabIndex={0}
          className="panel-enter focus-visible:rounded-md"
        >
          {panels[id]}
        </div>
      ))}
    </>
  );
}
