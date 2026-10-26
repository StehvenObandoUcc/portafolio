import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Heading copy split so one or two words can take the serif accent. */
export interface HeadingParts {
  before: string;
  emphasis: string;
  after: string;
}

type Level = "h1" | "h2" | "h3" | "h4";
type Size = "display" | "h2" | "h3" | "h4";

interface HeadingProps {
  as?: Level;
  size?: Size;
  parts?: HeadingParts;
  children?: ReactNode;
  className?: string;
  id?: string;
}

const sizes: Record<Size, string> = {
  display: "text-display",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-[17px] font-semibold leading-snug tracking-[-0.01em]",
};

export function Emphasis({ parts }: { parts: HeadingParts }) {
  return (
    <>
      {parts.before}
      {parts.emphasis && <em className="serif-em">{parts.emphasis}</em>}
      {parts.after}
    </>
  );
}

export function Heading({ as = "h2", size, parts, children, className, id }: HeadingProps) {
  const Tag = as;
  const resolved: Size = size ?? (as === "h1" ? "display" : as);
  return (
    <Tag id={id} className={cn("text-ink", sizes[resolved], className)}>
      {parts ? <Emphasis parts={parts} /> : children}
    </Tag>
  );
}
