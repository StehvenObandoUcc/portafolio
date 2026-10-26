import type { Ref, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { fieldClasses } from "./Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({ className, ref, ...props }: TextareaProps) {
  return <textarea ref={ref} className={cn(fieldClasses, "min-h-40 resize-y py-3 leading-relaxed", className)} {...props} />;
}
