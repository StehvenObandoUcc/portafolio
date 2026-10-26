import { Tag } from "@/components/atoms/Tag";
import { cn } from "@/lib/cn";

export interface LearningCardData {
  id: string;
  title: string;
  source?: string;
  statusLabel: string;
  inProgress: boolean;
  goal: string;
  progress?: string;
}

interface LearningCardProps {
  item: LearningCardData;
  goalLabel: string;
  progressLabel: string;
  /** Larger bento cell. */
  large?: boolean;
}

/** A learning-log entry. Progress is words, never a bar. */
export function LearningCard({ item, goalLabel, progressLabel, large = false }: LearningCardProps) {
  return (
    <article
      className={cn(
        "card flex h-full flex-col gap-5 p-6",
        large && "sm:p-8",
        item.inProgress ? "" : "bg-transparent shadow-none",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {item.inProgress ? (
          <Tag tone="warm">{item.statusLabel}</Tag>
        ) : (
          <Tag tone="outline">{item.statusLabel}</Tag>
        )}
        {item.source && <span className="text-label truncate text-ink-mute">{item.source}</span>}
      </div>
      <h3 className={cn("text-h3 text-ink", large && "sm:text-[clamp(24px,2.2vw,32px)] sm:tracking-[-0.025em]")}>
        {item.title}
      </h3>
      <dl className="mt-auto grid gap-3 border-t border-dashed border-line-strong pt-4 text-[15px]">
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <dt className="text-label pt-0.5 text-ink-mute">{goalLabel}</dt>
          <dd className="text-ink-soft">{item.goal}</dd>
        </div>
        {item.progress && (
          <div className="grid grid-cols-[80px_1fr] gap-3">
            <dt className="text-label pt-0.5 text-ink-mute">{progressLabel}</dt>
            <dd className="text-ink-soft">{item.progress}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}
