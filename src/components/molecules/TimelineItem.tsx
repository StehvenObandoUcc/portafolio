import { Tag } from "@/components/atoms/Tag";

export interface TimelineItemData {
  id: string;
  period: string;
  role: string;
  organization: string;
  outcomes: string[];
  stack: string[];
}

interface TimelineItemProps {
  item: TimelineItemData;
  stackLabel: string;
}

/** One entry on the vertical timeline: a dot on the rule, period in the margin. */
export function TimelineItem({ item, stackLabel }: TimelineItemProps) {
  return (
    <article className="relative grid gap-3 pl-8 md:grid-cols-[180px_1fr] md:gap-10 md:pl-0">
      <span
        aria-hidden="true"
        className="timeline-dot absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-accent-600 bg-paper-2 md:left-[199px]"
      />
      <p className="text-label order-last pt-0.5 text-ink-mute tabular md:order-none md:text-right">{item.period}</p>
      <div>
        <h3 className="text-h3 text-ink">{item.role}</h3>
        <p className="mt-1 text-[15px] font-medium text-accent-700">{item.organization}</p>
        <ul className="mt-4 space-y-2">
          {item.outcomes.map((outcome) => (
            <li key={outcome} className="relative pl-5 text-[15px] leading-relaxed text-ink-soft">
              <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-ink-mute" />
              {outcome}
            </li>
          ))}
        </ul>
        {item.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="sr-only">{stackLabel}:</span>
            {item.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
