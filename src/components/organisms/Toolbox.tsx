"use client";

import { Reveal } from "@/components/atoms/Reveal";
import { ToolIcon } from "@/components/atoms/ToolIcon";
import { TECH_EVENT, type TechFocus } from "@/lib/techFocus";

export interface ToolboxItem {
  id: string;
  name: string;
  icon: string;
  note?: string;
  /** Stack names that count as this tool, used to filter the projects. */
  includes: string[];
  /** Titles of the projects that use it. */
  projects: string[];
}

export interface ToolboxProps {
  title: string;
  items: ToolboxItem[];
  labels: {
    usedIn: string;
    noProject: string;
    /** "Ver proyectos con {tech}" */
    show: string;
  };
}

/**
 * The stack as a wall of logo cells on the hero's graph-paper lines. Hover or
 * focus shows which projects use a tool; clicking filters the projects to it.
 */
export function Toolbox({ title, items, labels }: ToolboxProps) {
  const focus = (item: ToolboxItem) => {
    const detail: TechFocus = { id: item.id, label: item.name, includes: item.includes };
    window.dispatchEvent(new CustomEvent(TECH_EVENT, { detail }));
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section aria-labelledby="toolbox-title" className="pb-[clamp(56px,7vw,96px)]">
      <div className="container-page">
        <Reveal>
          <h2 id="toolbox-title" className="text-h3 mb-6 text-ink">
            {title}
          </h2>
        </Reveal>
        <ul className="tech-wall grid grid-cols-2 sm:grid-cols-5">
          {items.map((item, i) => {
            const used = item.projects.length > 0;
            const cardId = `tech-${item.id}-card`;
            return (
              <li key={item.id} className="tech-cell-wrap">
                <Reveal index={i} motion="pop" className="h-full">
                  <button
                    type="button"
                    className="tech-cell"
                    aria-describedby={cardId}
                    aria-disabled={!used || undefined}
                    aria-label={used ? labels.show.replace("{tech}", item.name) : item.name}
                    onClick={() => used && focus(item)}
                  >
                    <span className="tech-logo">
                      <ToolIcon name={item.icon} size={34} />
                    </span>
                    <span className="tech-name">{item.name}</span>
                    {item.note && <span className="tech-note">{item.note}</span>}
                  </button>
                  <span id={cardId} role="tooltip" className="tech-card">
                    <span className="text-label text-ink-mute">{labels.usedIn}</span>
                    <span className="tech-card-list">{used ? item.projects.join(" · ") : labels.noProject}</span>
                  </span>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
