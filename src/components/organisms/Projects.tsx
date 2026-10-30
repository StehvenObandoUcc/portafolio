import type { HeadingParts } from "@/components/atoms/Heading";
import { ProjectCard, type ProjectCardData } from "@/components/molecules/ProjectCard";
import { ProjectGrid } from "@/components/molecules/ProjectGrid";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import type { Platform, ProjectFilter } from "@/data/types";

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

/** Server-rendered section; only the filter chips and grid motion run on the client. */
export function Projects(props: ProjectsProps) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="bg-paper-2 py-section-y">
      <div className="container-page">
        <SectionHeader id="projects-title" index={props.index} title={props.title} subtitle={props.subtitle} />
        <ProjectGrid
          filters={props.filters}
          filtersLabel={props.filtersLabel}
          emptyLabel={props.emptyLabel}
          items={props.projects.map((project) => ({
            id: project.id,
            platforms: project.platforms,
            featured: project.featured,
            card: (
              <ProjectCard
                project={project}
                priority={false}
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
