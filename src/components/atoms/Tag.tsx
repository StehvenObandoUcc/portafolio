import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagTone = "accent" | "outline" | "warm" | "marker" | "solid";

interface TagProps {
  children: ReactNode;
  tone?: TagTone;
  className?: string;
}

const tones: Record<TagTone, string> = {
  accent: "bg-accent-50 text-accent-700",
  outline: "border border-line-strong text-ink-soft",
  /** Apricot dot: reserved for "live" states (availability, in progress). */
  warm: "border border-line-strong bg-surface text-ink",
  marker: "border border-line-strong bg-surface text-ink",
  solid: "bg-accent-600 text-surface",
};

/** Small mono pill for stacks, platforms and statuses. */
export function Tag({ children, tone = "accent", className }: TagProps) {
  return (
    <span
      className={cn(
        "text-label inline-flex min-h-6 items-center gap-1.5 rounded-pill px-2.5 py-1 whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {tone === "warm" && <span className="size-1.5 flex-none rounded-full bg-warm-400" aria-hidden="true" />}
      {tone === "marker" && <span className="size-1.5 flex-none rounded-full bg-accent-500" aria-hidden="true" />}
      {children}
    </span>
  );
}
