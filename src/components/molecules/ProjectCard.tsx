import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import type { IconName } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
import { cn } from "@/lib/cn";

export interface ProjectCardData {
  id: string;
  title: string;
  platformLabel: string;
  description: string;
  stack: string[];
  roleLabel: string;
  role: string;
  /** "Equipo" / "En pareja", or undefined for solo or unconfirmed. */
  collaborationLabel?: string;
  context?: string;
  featured: boolean;
  featuredLabel: string;
  cover: { src: string; width: number; height: number; alt: string };
  codeLabel: string;
  githubUrl: string;
  demoLabel: string;
  demoIcon: IconName;
  demoUrl: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  comingSoonLabel: string;
  newTabLabel: string;
  /** Load the cover eagerly (first card). */
  priority?: boolean;
}

export function ProjectCard({ project, comingSoonLabel, newTabLabel, priority = false }: ProjectCardProps) {
  const { featured } = project;
  const titleId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "card card-interactive group flex h-full flex-col overflow-hidden",
        featured && "md:grid md:grid-cols-[1.15fr_1fr] md:items-stretch",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden border-b border-line bg-paper-2",
          featured && "md:aspect-auto md:min-h-full md:border-r md:border-b-0",
        )}
      >
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          priority={priority}
          sizes={featured ? "(min-width: 1200px) 760px, (min-width: 640px) 90vw, 100vw" : "(min-width: 1200px) 380px, (min-width: 640px) 45vw, 100vw"}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Tag tone="solid">{project.platformLabel}</Tag>
          {featured && <Tag tone="marker">{project.featuredLabel}</Tag>}
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col gap-4 p-5 sm:p-6", featured && "md:justify-center md:p-8 lg:p-10")}>
        {project.collaborationLabel && (
          <div className="flex">
            <Tag tone="marker">{project.collaborationLabel}</Tag>
          </div>
        )}

        <h3 id={titleId} className={cn("text-h3 text-ink", featured && "md:text-[clamp(26px,2.4vw,34px)] md:tracking-[-0.025em]")}>
          {project.title}
        </h3>

        <p className={cn("text-[15px] leading-relaxed text-pretty text-ink-soft", featured ? "md:text-[16px]" : "line-clamp-2")}>
          {project.description}
        </p>

        {project.stack.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        )}

        <p className="text-[14px] leading-snug text-ink-soft">
          <span className="text-label mr-2 text-ink-mute">{project.roleLabel}</span>
          {project.role}
          {project.context && <span className="text-ink-mute"> · {project.context}</span>}
        </p>

        <div className={cn("flex flex-wrap gap-2 pt-2", featured ? "md:mt-2" : "mt-auto")}>
          <Button
            href={project.githubUrl}
            external
            variant="secondary"
            size="sm"
            icon="github"
            iconPosition="start"
            comingSoonLabel={comingSoonLabel}
            newTabLabel={newTabLabel}
          >
            {project.codeLabel}
          </Button>
          <Button
            href={project.demoUrl}
            external
            variant="primary"
            size="sm"
            icon={project.demoIcon}
            iconPosition="start"
            comingSoonLabel={comingSoonLabel}
            newTabLabel={newTabLabel}
          >
            {project.demoLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
