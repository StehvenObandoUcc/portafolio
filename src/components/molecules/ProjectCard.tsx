import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import type { IconName } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
import { ToolIcon } from "@/components/atoms/ToolIcon";
import { CaseButton } from "@/components/molecules/CaseButton";
import { ProjectGallery, type CaseStudy, type GalleryShot, type ProjectGalleryLabels } from "@/components/molecules/ProjectGallery";
import type { Platform } from "@/data/types";

export interface ProjectCardData {
  id: string;
  title: string;
  /** First platform; tints the cover. */
  platform?: Platform;
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
  /** Challenge and solution, shown in the gallery's case sheet; the card gets a button to open it. */
  caseStudy?: CaseStudy;
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
  const sizes = "(min-width: 1200px) 380px, (min-width: 640px) 45vw, 100vw";

  // A real screenshot stands whole on the platform-tinted ground, resting on the bottom edge.
  const visual = screenshot ? (
    <div className="absolute inset-x-[7%] top-[19%] bottom-0 flex items-end justify-center">
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        sizes={sizes}
        className="project-shot h-auto max-h-full w-auto max-w-full transition-transform duration-700 ease-out group-hover:-translate-y-1.5"
      />
    </div>
  ) : (
    <div className="parallax-frame absolute inset-x-0 -top-[8%] -bottom-[8%]">
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        sizes={sizes}
        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );

  return (
    <article
      data-tilt
      aria-labelledby={titleId}
      className="card card-interactive group flex h-full flex-col overflow-clip"
    >
      <div data-platform={project.platform} className="project-cover relative aspect-[16/10] overflow-clip border-b border-line">
        {project.shots.length > 1 ? (
          <ProjectGallery
            title={project.title}
            shots={project.shots}
            labels={project.galleryLabels}
            caseInfo={{
              id: project.id,
              text: project.description,
              meta: project.stack.join(" · "),
              kicker: project.platformLabel,
              study: project.caseStudy,
            }}
          >
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

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        {project.collaborationLabel && (
          <div className="flex">
            <Tag tone="marker">{project.collaborationLabel}</Tag>
          </div>
        )}

        <h3 id={titleId} className="text-h3 text-ink">
          {project.title}
        </h3>

        {project.description && (
          <p className="line-clamp-2 text-[15px] leading-relaxed text-pretty text-ink-soft">
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

        {project.caseStudy && project.shots.length > 1 && (
          <CaseButton id={project.id} label={project.caseStudy.labels.open} ariaLabel={project.caseStudy.labels.openAria} />
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
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
