import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextSize = "lead" | "body" | "small";
type TextTone = "ink" | "soft" | "mute";

interface TextProps {
  as?: "p" | "span" | "div";
  size?: TextSize;
  tone?: TextTone;
  children: ReactNode;
  className?: string;
  id?: string;
}

const sizes: Record<TextSize, string> = {
  lead: "text-[clamp(17px,0.45vw+15.5px,20px)] leading-[1.55]",
  body: "leading-[1.6]",
  small: "text-[14px] leading-[1.55]",
};

const tones: Record<TextTone, string> = {
  ink: "text-ink",
  soft: "text-ink-soft",
  mute: "text-ink-mute",
};

export function Text({ as = "p", size = "body", tone = "soft", children, className, id }: TextProps) {
  const Tag = as;
  return (
    <Tag id={id} className={cn(sizes[size], tones[tone], "text-pretty", className)}>
      {children}
    </Tag>
  );
}
