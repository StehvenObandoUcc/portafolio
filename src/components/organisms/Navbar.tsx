"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Logo } from "@/components/atoms/Logo";
import { LanguageToggle, type LanguageOption } from "@/components/molecules/LanguageToggle";
import { NavLink } from "@/components/molecules/NavLink";
import type { Locale } from "@/data/types";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

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
    comingSoon: string;
    opensInNewTab: string;
  };
}

const MENU_ID = "mobile-menu";

export function Navbar(props: NavbarProps) {
  const { items, labels } = props;
  const scrolled = useScrolled(24);
  const direction = useScrollDirection();
  const [ids] = useState(() => items.map((item) => item.id));
  const active = useActiveSection(ids);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
    <header
      id="top"
      className={cn(
        "enter-nav fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter,translate] duration-500 ease-out",
        direction === "down" && !menuOpen && "-translate-y-full",
        scrolled || menuOpen
          ? "border-line bg-[rgba(245,243,238,.78)] backdrop-blur-[14px]"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Logo monogram={props.monogram} wordmark={props.wordmark} label={props.homeLabel} href="#home" />

        <nav aria-label={labels.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-0.5 lg:gap-3">
            {items.map((item) => (
              <li key={item.id}>
                <NavLink href={`#${item.id}`} label={item.label} active={active === item.id} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
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
            onClick={() => setMenuOpen((open) => !open)}
            className="text-ink md:hidden"
          />
        </div>
      </div>
      <span aria-hidden="true" className="scroll-progress" />
    </header>

    {/* Sibling of <header>: its backdrop-filter would trap a fixed child. */}
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
    </>
  );
}
