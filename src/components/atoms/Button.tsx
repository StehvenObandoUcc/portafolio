import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isTodo } from "@/lib/validators";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "start" | "end";
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  /** A URL, an in-page "#id", or "TODO" (renders a disabled control). */
  href: string;
  external?: boolean;
  /** Tooltip and screen-reader text for TODO links. */
  comingSoonLabel: string;
  newTabLabel?: string;
}

interface ActionButtonProps extends BaseProps {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

function Content({ children, icon, iconPosition = "end" }: BaseProps) {
  const glyph = icon ? <Icon name={icon} size={17} className="flex-none" /> : null;
  return (
    <>
      {iconPosition === "start" && glyph}
      <span>{children}</span>
      {iconPosition === "end" && glyph}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className } = props;
  const classes = cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", className);

  if (props.href === undefined) {
    return (
      <button type={props.type ?? "button"} className={classes} disabled={props.disabled} onClick={props.onClick}>
        <Content {...props} />
      </button>
    );
  }

  const { href, external, comingSoonLabel, newTabLabel } = props;

  if (isTodo(href)) {
    return (
      <button
        type="button"
        className={cn(classes, "has-tooltip")}
        aria-disabled="true"
        data-tooltip={comingSoonLabel}
      >
        <Content {...props} />
        <span className="sr-only">({comingSoonLabel})</span>
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        <Content {...props} />
        {newTabLabel && <span className="sr-only">{newTabLabel}</span>}
      </a>
    );
  }

  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        <Content {...props} />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <Content {...props} />
    </Link>
  );
}
