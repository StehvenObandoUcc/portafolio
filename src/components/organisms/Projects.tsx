import type { HeadingParts } from "@/components/atoms/Heading";
import { ProjectCard, type ProjectCardData } from "@/components/molecules/ProjectCard";
import { ProjectGrid } from "@/components/molecules/ProjectGrid";
import { ProjectRing } from "@/components/molecules/ProjectRing";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { Platform, ProjectFilter } from "@/data/types";

export interface ProjectsProps {
  index: string;
  title: HeadingParts;
  subtitle: string;
  filters: { id: ProjectFilter; label: string }[];
  filtersLabel: string;
  emptyLabel: string;
  techLabels: { active: string; clear: string };
  ring: { hint: string; counter: string; open: string };
  projects: (ProjectCardData & { platforms: Platform[] })[];
  comingSoonLabel: string;
  newTabLabel: string;
}

/** Server-rendered section; only the filter chips and grid motion run on the client. */
export function Projects(props: ProjectsProps) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-paper-2 py-section-y [--ground:var(--paper-2)]">
      <div className="container-page">
        <SectionHeader id="projects-title" index={props.index} title={props.title} subtitle={props.subtitle} />
        <ProjectRing
          hint={props.ring.hint}
          counter={props.ring.counter}
          openLabel={props.ring.open}
          items={props.projects.map((project) => ({
            id: project.id,
            title: project.title,
            platform: project.platform,
            platformLabel: project.platformLabel,
            cover: project.cover,
            hasGallery: project.shots.length > 1,
          }))}
        />
        <ProjectGrid
          filters={props.filters}
          filtersLabel={props.filtersLabel}
          emptyLabel={props.emptyLabel}
          techLabels={props.techLabels}
          items={props.projects.map((project) => ({
            id: project.id,
            platforms: project.platforms,
            featured: project.featured,
            stack: project.stack,
            card: (
              <ProjectCard
                project={project}
                comingSoonLabel={props.comingSoonLabel}
                newTabLabel={props.newTabLabel}
              />
            ),
          }))}
        />
      </div>
    </section>
  );
}
