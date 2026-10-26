import { cn } from "@/lib/cn";

interface LogoProps {
  monogram: string;
  wordmark: string;
  href?: string;
  label: string;
  className?: string;
}

/** "SO" monogram in a rounded square + wordmark (hidden under 400px). */
export function Logo({ monogram, wordmark, href = "#top", label, className }: LogoProps) {
  return (
    <a href={href} aria-label={label} className={cn("group inline-flex items-center gap-2.5 rounded-sm", className)}>
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-[9px] bg-accent-600 font-mono text-[13px] font-semibold tracking-[0.02em] text-surface transition-transform duration-500 ease-out group-hover:-rotate-6"
      >
        {monogram}
      </span>
      <span aria-hidden="true" className="hidden text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap text-ink xs:inline md:hidden lg:inline">
        {wordmark}
      </span>
    </a>
  );
}
