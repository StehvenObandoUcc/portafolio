"use client";

import { motion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { HeadingParts } from "@/components/atoms/Heading";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { CourseCard, type CourseCardData } from "@/components/molecules/CourseCard";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { SkillGroup } from "@/components/molecules/SkillGroup";
import { TimelineItem, type TimelineItemData } from "@/components/molecules/TimelineItem";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type TabId = "work" | "academic";

export interface ExperienceProps {
  index: string;
  title: HeadingParts;
  tabsLabel: string;
  tabs: Record<TabId, string>;
  stackLabel: string;
  timeline: TimelineItemData[];
  degree: { title: string; institution: string; campus: string; status: string };
  coursesTitle: string;
  courses: CourseCardData[];
  certificateLabel: string;
  english: { title: string; level: string };
  skillsTitle: string;
  skills: { id: string; icon: IconName; title: string; items: string[] }[];
  comingSoonLabel: string;
  newTabLabel: string;
}

const TAB_ORDER: TabId[] = ["work", "academic"];

export function Experience(props: ExperienceProps) {
  const [tab, setTab] = useState<TabId>("work");
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ work: null, academic: null });

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
    <section id="experience" aria-labelledby="experience-title" className="bg-paper-2 py-section-y">
      <div className="container-page">
        <SectionHeader
          id="experience-title"
          index={props.index}
          title={props.title}
          aside={
            <div role="tablist" aria-label={props.tabsLabel} className="flex gap-6 border-b border-line-strong md:border-b-0">
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
                    {props.tabs[id]}
                    {selected && (
                      <motion.span
                        layoutId={`${baseId}-underline`}
                        transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-x-0 -bottom-px h-0.5 rounded-pill bg-accent-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          }
        />

        <div
          role="tabpanel"
          id={`${baseId}-panel-work`}
          aria-labelledby={`${baseId}-tab-work`}
          hidden={tab !== "work"}
          tabIndex={0}
          className="panel-enter focus-visible:rounded-md"
        >
          <div className="relative space-y-12">
            {props.timeline.map((item, i) => (
              <Reveal key={item.id} index={i}>
                <TimelineItem item={item} stackLabel={props.stackLabel} />
              </Reveal>
            ))}
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong md:left-[204px]"
            />
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel-academic`}
          aria-labelledby={`${baseId}-tab-academic`}
          hidden={tab !== "academic"}
          tabIndex={0}
          className="panel-enter focus-visible:rounded-md"
        >
          <div className="grid gap-5 md:grid-cols-12 md:gap-6">
            <article className="card flex flex-col gap-4 p-6 sm:p-8 md:col-span-8">
              <span className="grid size-10 place-items-center rounded-sm bg-accent-600 text-surface">
                <Icon name="graduation" size={20} />
              </span>
              <h3 className="text-h3 text-ink">{props.degree.title}</h3>
              <p className="text-ink-soft">
                {props.degree.institution} · {props.degree.campus}
              </p>
              <p className="text-label text-accent-700">{props.degree.status}</p>
            </article>
            <article className="card flex flex-col gap-4 p-6 sm:p-8 md:col-span-4">
              <span className="grid size-10 place-items-center rounded-sm bg-accent-50 text-accent-600">
                <Icon name="globe" size={20} />
              </span>
              <h3 className="text-h3 text-ink">{props.english.title}</h3>
              <p className="text-ink-soft">{props.english.level}</p>
            </article>
          </div>

          <h3 className="text-h3 mt-14 mb-6 text-ink">{props.coursesTitle}</h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {props.courses.map((course) => (
              <li key={course.id}>
                <CourseCard
                  course={course}
                  certificateLabel={props.certificateLabel}
                  comingSoonLabel={props.comingSoonLabel}
                  newTabLabel={props.newTabLabel}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-section-y">
          <Reveal>
            <h3 className="text-h3 mb-6 text-ink">{props.skillsTitle}</h3>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {props.skills.map((group, i) => (
              <li key={group.id}>
                <Reveal index={i}>
                  <SkillGroup icon={group.icon} title={group.title} items={group.items} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
