"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Logo } from "@/components/atoms/Logo";
import { LanguageToggle, type LanguageOption } from "@/components/molecules/LanguageToggle";
import { MotionToggle } from "@/components/molecules/MotionToggle";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { NavLink } from "@/components/molecules/NavLink";
import type { Locale } from "@/data/types";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import dynamic from "next/dynamic";

// The full-screen sheet only exists below 900px: its code loads on first open.
const MobileMenu = dynamic(() => import("./MobileMenu").then((mod) => mod.MobileMenu), { ssr: false });

export interface NavItem {
  id: string;
  label: string;
}

export interface NavbarProps {
  locale: Locale;
  items: NavItem[];
  monogram: string;
  wordmark: string;
  homeLabel: string;
  cvLabel: string;
  cvUrl: string;
  languages: [LanguageOption, LanguageOption];
  labels: {
    mainNav: string;
    languageSwitch: string;
    openMenu: string;
    closeMenu: string;
    motionPause: string;
    motionPlay: string;
    themeDark: string;
    themeLight: string;
    comingSoon: string;
    opensInNewTab: string;
  };
}

const MENU_ID = "mobile-menu";

const pad = (n: number) => String(n).padStart(2, "0");

export function Navbar(props: NavbarProps) {
  const { items, labels } = props;
  const scrolled = useScrolled(24);
  const direction = useScrollDirection();
  const [ids] = useState(() => items.map((item) => item.id));
  const active = useActiveSection(ids);
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === active));
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  // One dot slides under the active section link.
  useEffect(() => {
    const list = listRef.current;
    const dot = dotRef.current;
    if (!list || !dot) return;
    const place = () => {
      const link = list.querySelector<HTMLElement>('a[aria-current="true"]');
      if (!link) {
        dot.style.opacity = "0";
        return;
      }
      dot.style.opacity = "1";
      dot.style.transform = `translateX(${link.offsetLeft + link.offsetWidth / 2 - 2}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
    <header
      id="top"
      className={cn(
        "enter-nav fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter,translate] duration-500 ease-out",
        direction === "down" && !menuOpen && "-translate-y-full",
        scrolled || menuOpen
          ? "border-line bg-[var(--paper-glass)] backdrop-blur-[14px]"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-[var(--nav-h)] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo monogram={props.monogram} wordmark={props.wordmark} label={props.homeLabel} href="#home" />
          <span aria-hidden="true" className="nav-counter text-label hidden items-center gap-1 text-ink-mute tabular sm:inline-flex md:hidden lg:inline-flex">
            <span className="nav-counter-window">
              <span key={activeIndex} className="nav-counter-roll text-accent-600">
                {pad(activeIndex + 1)}
              </span>
            </span>
            <span>/ {pad(items.length)}</span>
          </span>
        </div>

        <nav aria-label={labels.mainNav} className="hidden md:block">
          <ul ref={listRef} className="relative flex items-center gap-0.5 lg:gap-3">
            <span ref={dotRef} aria-hidden="true" className="nav-slider" />
            {items.map((item) => (
              <li key={item.id}>
                <NavLink href={`#${item.id}`} label={item.label} active={active === item.id} showDot={false} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">
          <ThemeToggle toDarkLabel={labels.themeDark} toLightLabel={labels.themeLight} />
          <MotionToggle pauseLabel={labels.motionPause} playLabel={labels.motionPlay} />
          <LanguageToggle current={props.locale} options={props.languages} label={labels.languageSwitch} />
          <Button
            href={props.cvUrl}
            external
            size="sm"
            icon="download"
            iconPosition="start"
            comingSoonLabel={labels.comingSoon}
            newTabLabel={labels.opensInNewTab}
            className="tooltip-below hidden md:inline-flex"
          >
            {props.cvLabel}
          </Button>
          <IconButton
            ref={toggleRef}
            icon={menuOpen ? "close" : "menu"}
            size="lg"
            label={menuOpen ? labels.closeMenu : labels.openMenu}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => {
              setMenuLoaded(true);
              setMenuOpen((open) => !open);
            }}
            className="text-ink md:hidden"
          />
        </div>
      </div>
      <span aria-hidden="true" className="scroll-progress" />
    </header>

    {/* Sibling of <header>: its backdrop-filter would trap a fixed child. */}
    {menuLoaded && (
    <MobileMenu
        id={MENU_ID}
        open={menuOpen}
        onClose={closeMenu}
        toggleRef={toggleRef}
        items={items}
        active={active}
        label={labels.mainNav}
        cvLabel={props.cvLabel}
        cvUrl={props.cvUrl}
        comingSoonLabel={labels.comingSoon}
        newTabLabel={labels.opensInNewTab}
      />
    )}
    </>
  );
}
