import { cn } from "@/lib/cn";

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
  variant?: "bar" | "sheet";
  /** Notebook number shown beside sheet links, e.g. "03". */
  index?: string;
  /** Bar links can leave the active dot to a shared sliding indicator. */
  showDot?: boolean;
  onClick?: () => void;
}

/** Section link: underline grows from the left, active gets the accent and a 4px dot. */
export function NavLink({ href, label, active = false, variant = "bar", index, showDot = true, onClick }: NavLinkProps) {
  if (variant === "sheet") {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-current={active ? "true" : undefined}
        className={cn(
          "group flex min-h-16 items-center justify-between gap-4 border-b border-line py-2 text-[clamp(28px,8vw,40px)] leading-none font-medium tracking-[-0.035em] transition-colors duration-200",
          active ? "text-accent-600" : "text-ink hover:text-accent-600",
        )}
      >
        <span className="flex items-baseline gap-4">
          {index && <span className="text-label text-accent-600 tabular">{index}</span>}
          <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2">{label}</span>
        </span>
        <span
          aria-hidden="true"
          className={cn("size-1.5 rounded-full bg-accent-600 transition-opacity duration-300", active ? "opacity-100" : "opacity-0")}
        />
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative inline-flex h-10 items-center px-1 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 lg:text-[14px]",
        active ? "text-accent-600" : "text-ink-soft hover:text-ink",
      )}
    >
      <span className="link-underline">{label}</span>
      {showDot && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent-600 transition-[opacity,transform] duration-300 ease-out",
            active ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
      )}
    </a>
  );
}
