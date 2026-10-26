import { cn } from "@/lib/cn";

interface DividerProps {
  className?: string;
  /** Dashed rule, like a notebook fold line. */
  dashed?: boolean;
}

export function Divider({ className, dashed = false }: DividerProps) {
  return (
    <hr
      className={cn(
        "h-px w-full border-0",
        dashed
          ? "bg-[repeating-linear-gradient(90deg,var(--line-strong)_0_6px,transparent_6px_12px)]"
          : "bg-line",
        className,
      )}
    />
  );
}
