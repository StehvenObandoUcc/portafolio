import { cn } from "@/lib/cn";

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
  variant?: "bar" | "sheet";
  onClick?: () => void;
}

/** Section link: underline grows from the left, active gets the accent and a 4px dot. */
export function NavLink({ href, label, active = false, variant = "bar", onClick }: NavLinkProps) {
  if (variant === "sheet") {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-current={active ? "true" : undefined}
        className={cn(
          "flex h-14 items-center justify-between border-b border-line text-[20px] font-medium tracking-[-0.015em] transition-colors duration-200",
          active ? "text-accent-600" : "text-ink hover:text-accent-600",
        )}
      >
        {label}
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
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent-600 transition-[opacity,transform] duration-300 ease-out",
          active ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
      />
    </a>
  );
}
