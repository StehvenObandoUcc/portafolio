"use client";

import { useRef, useSyncExternalStore } from "react";
import { Icon } from "@/components/atoms/Icon";
import { isMotionOff } from "@/lib/motionPreference";
import { getTheme, setTheme, subscribeTheme, type Theme } from "@/lib/themePreference";
import { cn } from "@/lib/cn";

interface ThemeToggleProps {
  /** Label while the page is light, e.g. "Activar modo oscuro". */
  toDarkLabel: string;
  /** Label while the page is dark, e.g. "Activar modo claro". */
  toLightLabel: string;
  className?: string;
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

/**
 * Sun / moon switch. Where View Transitions exist, the new theme is
 * revealed in a circle growing from the button; otherwise it swaps at once.
 */
export function ThemeToggle({ toDarkLabel, toLightLabel, className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "light" as Theme);
  const ref = useRef<HTMLButtonElement>(null);
  const dark = theme === "dark";

  const toggle = () => {
    const next: Theme = dark ? "light" : "dark";
    const doc = document as ViewTransitionDoc;
    if (!doc.startViewTransition || isMotionOff()) {
      setTheme(next);
      return;
    }
    const rect = ref.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
    doc.startViewTransition(() => setTheme(next));
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={dark ? toLightLabel : toDarkLabel}
      className={cn(
        "theme-toggle relative inline-flex size-11 md:size-10 flex-none items-center justify-center rounded-pill text-ink-soft transition-[background-color,color] duration-300 ease-soft hover:bg-accent-50 hover:text-accent-600 pointer-coarse:size-11",
        className,
      )}
    >
      <Icon name="sun" size={19} className="theme-icon theme-icon-sun" />
      <Icon name="moon" size={19} className="theme-icon theme-icon-moon" />
    </button>
  );
}
