import type { ReactNode } from "react";
import type { HeadingParts } from "@/components/atoms/Heading";
import { MaskWords } from "@/components/atoms/MaskWords";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  /** Notebook page number, e.g. "02". */
  index: string;
  title: HeadingParts;
  subtitle?: string;
  id: string;
  /** Right-hand slot on wide screens (filters, counts). */
  aside?: ReactNode;
  className?: string;
}

/**
 * Section title set like a notebook page: the page number sits in the
 * margin of the heading itself, above a ruled line.
 */
export function SectionHeader({ index, title, subtitle, id, aside, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("relative isolate mb-10 md:mb-14", className)}>
      <span aria-hidden="true" className="section-numeral">
        {index}
      </span>
      <div className="relative flex flex-col gap-6 pb-8 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="max-w-3xl">
          <h2 id={id} className="text-h2 flex items-start gap-3 text-ink md:gap-4">
            <span aria-hidden="true" className="text-label-lg mt-[0.55em] flex-none text-accent-600 tabular">
              {index} —
            </span>
            <span>
              <MaskWords parts={title} />
            </span>
          </h2>
          {subtitle && (
            <Text size="lead" className="mt-4 max-w-[52ch] md:ml-[4.25rem]">
              {subtitle}
            </Text>
          )}
        </div>
        {aside && <div className="md:flex-none">{aside}</div>}
        <span aria-hidden="true" className="rule-line absolute inset-x-0 bottom-0 h-px bg-line-strong" />
      </div>
    </Reveal>
  );
}
