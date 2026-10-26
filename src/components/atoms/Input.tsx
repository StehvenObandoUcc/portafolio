import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/cn";

export const fieldClasses =
  "w-full rounded-md border border-line-strong bg-surface px-4 text-[16px] text-ink transition-[border-color,box-shadow] duration-200 ease-soft hover:border-ink-mute/50 focus:border-accent-500 focus:shadow-[0_0_0_4px_var(--accent-50)] aria-[invalid=true]:border-danger aria-[invalid=true]:focus:shadow-[0_0_0_4px_var(--danger-ring)]";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export function Input({ className, ref, ...props }: InputProps) {
  return <input ref={ref} className={cn(fieldClasses, "h-12", className)} {...props} />;
}
