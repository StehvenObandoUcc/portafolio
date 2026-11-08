import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import type { IconName } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
import { ToolIcon } from "@/components/atoms/ToolIcon";
import { ProjectGallery, type GalleryShot, type ProjectGalleryLabels } from "@/components/molecules/ProjectGallery";
import { cn } from "@/lib/cn";

export interface ProjectCardData {
  id: string;
  title: string;
  platformLabel: string;
  /** Left out while it is still "TODO" in the data. */
  description?: string;
  stack: string[];
  roleLabel: string;
  /** Left out while it is still "TODO" in the data. */
  role?: string;
  /** "Equipo" / "En pareja", or undefined for solo or unconfirmed. */
  collaborationLabel?: string;
  context?: string;
  featured: boolean;
  featuredLabel: string;
  cover: GalleryShot;
  /** Every screenshot (cover first); more than one turns the cover into a gallery button. */
  shots: GalleryShot[];
  galleryLabels: ProjectGalleryLabels;
  codeLabel: string;
  githubUrl: string;
  /** Set when the repository is private; replaces "coming soon" on its links. */
  privateLabel?: string;
  demoLabel: string;
  demoIcon: IconName;
  demoUrl: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  comingSoonLabel: string;
  newTabLabel: string;
}

export function ProjectCard({ project, comingSoonLabel, newTabLabel }: ProjectCardProps) {
  const { featured } = project;
  const titleId = `project-${project.id}-title`;
  // Real screenshots are shown whole; placeholder art fills the frame with parallax.
  const screenshot = !project.cover.src.endsWith(".svg");
  const sizes = featured ? "(min-width: 1200px) 640px, (min-width: 640px) 90vw, 100vw" : "(min-width: 1200px) 380px, (min-width: 640px) 45vw, 100vw";

  // The featured card is taller than one screenshot: from md it stacks two, framed on the paper well.
  const visual =
    featured && screenshot ? (
      <div className="absolute inset-0 flex flex-col justify-center gap-4 p-4 md:p-8">
        {[project.cover, project.shots[1]].filter(Boolean).map((shot, i) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={i === 0 ? shot.alt : ""}
            width={shot.width}
            height={shot.height}
            sizes={sizes}
            className={cn(
              "h-auto max-h-full w-full rounded-sm border border-line object-contain object-top shadow-card transition-transform duration-700 ease-out group-hover:scale-[1.02]",
              i > 0 && "hidden md:block",
            )}
          />
        ))}
      </div>
    ) : (
      <div className={screenshot ? "absolute inset-0" : "parallax-frame absolute inset-x-0 -top-[8%] -bottom-[8%]"}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes={sizes}
          className={cn(
            "size-full transition-transform duration-700 ease-out group-hover:scale-[1.03]",
            screenshot ? "object-contain" : "object-cover",
          )}
        />
      </div>
    );

  return (
    <article
      data-tilt
      aria-labelledby={titleId}
      className={cn(
        "card card-interactive group flex h-full flex-col overflow-clip",
        featured && "md:grid md:grid-cols-[1.15fr_1fr] md:items-stretch",
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-clip border-b border-line bg-paper-2",
          featured && "md:aspect-auto md:min-h-full md:border-r md:border-b-0",
        )}
      >
        {project.shots.length > 1 ? (
          <ProjectGallery title={project.title} shots={project.shots} labels={project.galleryLabels}>
            {visual}
          </ProjectGallery>
        ) : (
          visual
        )}
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

        {project.description && (
          <p className={cn("text-[15px] leading-relaxed text-pretty text-ink-soft", featured ? "md:text-[16px]" : "line-clamp-2")}>
            {project.description}
          </p>
        )}

        {project.stack.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li key={item}>
                <Tag>
                  <ToolIcon name={item} size={12} />
                  {item}
                </Tag>
              </li>
            ))}
          </ul>
        )}

        {project.role ? (
          <p className="text-[14px] leading-snug text-ink-soft">
            <span className="text-label mr-2 text-ink-mute">{project.roleLabel}</span>
            {project.role}
            {project.context && <span className="text-ink-mute"> · {project.context}</span>}
          </p>
        ) : (
          project.context && <p className="text-[14px] leading-snug text-ink-mute">{project.context}</p>
        )}

        <div className={cn("flex flex-wrap gap-2 pt-2", featured ? "md:mt-2" : "mt-auto")}>
          <Button
            href={project.githubUrl}
            external
            variant="secondary"
            size="sm"
            icon="github"
            iconPosition="start"
            comingSoonLabel={project.privateLabel ?? comingSoonLabel}
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
            comingSoonLabel={project.privateLabel ?? comingSoonLabel}
            newTabLabel={newTabLabel}
          >
            {project.demoLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
