"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import type { HeadingParts } from "@/components/atoms/Heading";
import { Reveal } from "@/components/atoms/Reveal";
import { ProjectCard, type ProjectCardData } from "@/components/molecules/ProjectCard";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { Platform, ProjectFilter } from "@/data/types";
import { cn } from "@/lib/cn";

export interface ProjectsProps {
  index: string;
  title: HeadingParts;
  subtitle: string;
  filters: { id: ProjectFilter; label: string }[];
  filtersLabel: string;
  emptyLabel: string;
  projects: (ProjectCardData & { platforms: Platform[] })[];
  comingSoonLabel: string;
  newTabLabel: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function Projects(props: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const visible = props.projects.filter(
    (project) => filter === "all" || project.platforms.includes(filter),
  );
  const countFor = (id: ProjectFilter) =>
    id === "all" ? props.projects.length : props.projects.filter((p) => p.platforms.includes(id)).length;

  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-paper-2 py-section-y">
      <div className="container-page">
        <SectionHeader id="projects-title" index={props.index} title={props.title} subtitle={props.subtitle} />

        <Reveal className="mb-8">
          <div role="group" aria-label={props.filtersLabel} className="snap-rail -mx-gutter flex gap-2 overflow-x-auto px-gutter pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {props.filters.map((chip) => {
              const selected = chip.id === filter;
              const count = countFor(chip.id);
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(chip.id)}
                  className={cn(
                    "chip inline-flex h-10 pointer-coarse:h-11 flex-none items-center gap-2 rounded-pill border px-4 text-[14px] font-medium transition-[background-color,color,border-color] duration-200 ease-soft",
                    selected
                      ? "border-accent-600 bg-accent-600 text-surface"
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
          </div>
        </Reveal>

        <m.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => (
              <m.li
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.55, ease }}
                className={cn(project.featured && "sm:col-span-2")}
              >
                <Reveal index={i} motion="card" className="h-full">
                  <ProjectCard
                    project={project}
                    priority={false}
                    comingSoonLabel={props.comingSoonLabel}
                    newTabLabel={props.newTabLabel}
                  />
                </Reveal>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>

        {visible.length === 0 && (
          <p role="status" className="rounded-lg border border-dashed border-line-strong px-6 py-12 text-center text-ink-soft">
            {props.emptyLabel}
          </p>
        )}
      </div>
    </section>
  );
}
