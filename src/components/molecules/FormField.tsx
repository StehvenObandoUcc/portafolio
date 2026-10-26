import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  /** Helper text on the right of the label row (e.g. a character count). */
  hint?: string;
  children: ReactNode;
  className?: string;
}

/** ids for aria-describedby: `${id}-error` and `${id}-hint`. */
export function describedBy(id: string, hasError: boolean, hasHint: boolean): string | undefined {
  const ids = [hasError && `${id}-error`, hasHint && `${id}-hint`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function FormField({ id, label, error, hint, children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[14px] font-medium text-ink">
          {label}
        </label>
        {hint && (
          <span id={`${id}-hint`} className="text-label text-ink-mute tabular">
            {hint}
          </span>
        )}
      </div>
      {children}
      <p
        id={`${id}-error`}
        role={error ? "alert" : undefined}
        className={cn("min-h-5 text-[14px] leading-snug text-danger", error ? "message-enter" : "sr-only")}
      >
        {error}
      </p>
    </div>
  );
}
