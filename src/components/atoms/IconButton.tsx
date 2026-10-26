import type { Ref } from "react";
import { cn } from "@/lib/cn";
import { isTodo } from "@/lib/validators";
import { Icon, type IconName } from "./Icon";

interface IconButtonBase {
  icon: IconName;
  /** Accessible name, always required. */
  label: string;
  className?: string;
  size?: "md" | "lg";
}

interface IconButtonProps extends IconButtonBase {
  onClick?: () => void;
  ref?: Ref<HTMLButtonElement>;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-pressed"?: boolean;
}

interface IconLinkProps extends IconButtonBase {
  /** URL, mailto:, or "TODO" (renders a disabled control). */
  href: string;
  external?: boolean;
  comingSoonLabel: string;
}

const base =
  "inline-flex flex-none items-center justify-center rounded-pill text-ink-soft transition-[background-color,color] duration-300 ease-soft hover:bg-accent-50 hover:text-accent-600";

function sizing(size: IconButtonBase["size"]) {
  return size === "lg" ? { box: "size-11", glyph: 22 } : { box: "size-10 pointer-coarse:size-11", glyph: 19 };
}

/** Square-ish icon-only action button (44px at "lg"). */
export function IconButton({
  icon,
  label,
  className,
  size,
  onClick,
  ref,
  "aria-expanded": expanded,
  "aria-controls": controls,
  "aria-pressed": pressed,
}: IconButtonProps) {
  const s = sizing(size);
  return (
    <button
      ref={ref}
      type="button"
      className={cn(base, s.box, className)}
      aria-label={label}
      onClick={onClick}
      aria-expanded={expanded}
      aria-controls={controls}
      aria-pressed={pressed}
    >
      <Icon name={icon} size={s.glyph} />
    </button>
  );
}

/** Icon-only link. A "TODO" href renders a disabled control with a tooltip. */
export function IconLink({ icon, label, className, size, href, external, comingSoonLabel }: IconLinkProps) {
  const s = sizing(size);
  const glyph = <Icon name={icon} size={s.glyph} />;

  if (isTodo(href)) {
    return (
      <button
        type="button"
        aria-disabled="true"
        aria-label={`${label} (${comingSoonLabel})`}
        data-tooltip={comingSoonLabel}
        className={cn(base, s.box, "has-tooltip cursor-not-allowed text-ink-mute hover:bg-transparent hover:text-ink-mute", className)}
      >
        {glyph}
      </button>
    );
  }

  return (
    <a
      href={href}
      aria-label={label}
      className={cn(base, s.box, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {glyph}
    </a>
  );
}
