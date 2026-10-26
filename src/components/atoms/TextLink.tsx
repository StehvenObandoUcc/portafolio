import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isTodo } from "@/lib/validators";
import { Icon } from "./Icon";

interface TextLinkProps {
  /** URL, mailto:, or "TODO" (renders as disabled text). */
  href: string;
  children: ReactNode;
  external?: boolean;
  comingSoonLabel: string;
  newTabLabel?: string;
  className?: string;
}

export function TextLink({ href, children, external, comingSoonLabel, newTabLabel, className }: TextLinkProps) {
  if (isTodo(href)) {
    return (
      <span
        role="link"
        aria-disabled="true"
        tabIndex={0}
        data-tooltip={comingSoonLabel}
        className={cn("has-tooltip inline-flex cursor-not-allowed items-center gap-1 text-ink-mute", className)}
      >
        {children}
        <span className="sr-only">({comingSoonLabel})</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-1 text-accent-600 underline decoration-accent-300 transition-colors duration-200 hover:text-accent-700 hover:decoration-accent-600",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external && <Icon name="arrow-up-right" size={14} />}
      {external && newTabLabel && <span className="sr-only">{newTabLabel}</span>}
    </a>
  );
}
