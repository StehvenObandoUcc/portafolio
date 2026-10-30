"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import type { Locale } from "@/data/types";
import { cn } from "@/lib/cn";

export interface LanguageOption {
  locale: Locale;
  /** Short visible label, e.g. "ES". */
  label: string;
  /** Full language name for screen readers, e.g. "Español". */
  name: string;
}

interface LanguageToggleProps {
  current: Locale;
  options: [LanguageOption, LanguageOption];
  label: string;
}

/** ES | EN pill switch. The thumb slides before the route changes. */
export function LanguageToggle({ current, options, label }: LanguageToggleProps) {
  const router = useRouter();
  const [active, setActive] = useState<Locale>(current);
  const activeIndex = options.findIndex((option) => option.locale === active);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, locale: Locale) => {
    if (locale === current || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    setActive(locale);
    const target = `/${locale}${window.location.hash}`;
    window.setTimeout(() => router.push(target, { scroll: false }), 260);
  };

  return (
    <nav aria-label={label}>
      <ul className="relative grid h-[50px] grid-cols-[repeat(2,minmax(2.75rem,1fr))] md:h-9 pointer-coarse:h-[50px] rounded-pill border border-line-strong bg-surface/70 p-0.5">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-pill bg-accent-600 shadow-[0_6px_14px_-8px_var(--accent-shadow)] transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        {options.map((option) => {
          const isActive = option.locale === active;
          return (
            <li key={option.locale} className="relative">
              <Link
                href={`/${option.locale}`}
                hrefLang={option.locale}
                lang={option.locale}
                aria-current={option.locale === current ? "page" : undefined}
                aria-label={`${option.label} ${option.name}`}
                onClick={(event) => handleClick(event, option.locale)}
                className={cn(
                  "grid h-full min-w-11 place-items-center rounded-pill px-2.5 font-mono text-[12px] font-medium tracking-[0.06em] transition-colors duration-300",
                  isActive ? "text-on-accent" : "text-ink-soft hover:text-ink",
                )}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
