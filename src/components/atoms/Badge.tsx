import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  /** Shows the warm "live" dot that pulses softly. */
  live?: boolean;
  className?: string;
}

/** Mono status pill used for the availability line. */
export function Badge({ children, live = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-label inline-flex items-center gap-2.5 rounded-pill border border-line-strong bg-surface/80 py-2 pr-3.5 pl-3 text-ink-soft",
        className,
      )}
    >
      {live && <span className="pulse-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
