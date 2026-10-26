import { Icon } from "@/components/atoms/Icon";
import { Tag } from "@/components/atoms/Tag";
import { TextLink } from "@/components/atoms/TextLink";

export interface CourseCardData {
  id: string;
  title: string;
  issuer: string;
  statusLabel: string;
  completed: boolean;
  /** Already formatted for the locale, e.g. "sept 2026". */
  date?: string;
  certificateUrl?: string;
}

interface CourseCardProps {
  course: CourseCardData;
  certificateLabel: string;
  comingSoonLabel: string;
  newTabLabel: string;
}

export function CourseCard({ course, certificateLabel, comingSoonLabel, newTabLabel }: CourseCardProps) {
  return (
    <article data-tilt className="card card-interactive flex h-full flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="icon-draw grid size-9 flex-none place-items-center rounded-sm bg-accent-50 text-accent-600">
          <Icon name="award" size={18} />
        </span>
        <Tag tone={course.completed ? "accent" : "outline"}>{course.statusLabel}</Tag>
      </div>
      <h4 className="text-[16px] leading-snug font-semibold text-pretty text-ink">{course.title}</h4>
      <p className="text-label mt-auto text-ink-mute">
        {course.issuer}
        {course.date && <span className="tabular"> · {course.date}</span>}
      </p>
      {course.certificateUrl && (
        <TextLink
          href={course.certificateUrl}
          external
          comingSoonLabel={comingSoonLabel}
          newTabLabel={newTabLabel}
          className="text-[14px]"
        >
          {certificateLabel}
        </TextLink>
      )}
    </article>
  );
}
