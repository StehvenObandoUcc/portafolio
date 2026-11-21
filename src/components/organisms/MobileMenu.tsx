"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { Button } from "@/components/atoms/Button";
import { NavLink } from "@/components/molecules/NavLink";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
  items: { id: string; label: string; index: string }[];
  active: string;
  label: string;
  cvLabel: string;
  cvUrl: string;
  comingSoonLabel: string;
  newTabLabel: string;
}

const DESKTOP_QUERY = "(min-width: 900px)";
/** Length of the closing circle in globals.css (.sheet[data-state="closed"]). */
const CLOSE_MS = 650;

/** Full-screen sheet for < 900px. Escape, link click, outside click and resize close it. */
export function MobileMenu(props: MobileMenuProps) {
  const { open, onClose, toggleRef } = props;
  const listRef = useRef<HTMLUListElement>(null);
  // The sheet stays mounted while its closing circle plays, then leaves.
  const [present, setPresent] = useState(open);
  if (open && !present) setPresent(true);

  useEffect(() => {
    if (open || !present) return;
    const timer = window.setTimeout(() => setPresent(false), CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [open, present]);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;

    document.body.dataset.scrollLocked = "";
    listRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });

    // The page behind the sheet is out of reach while it is open.
    const background = [...document.querySelectorAll<HTMLElement>("main, footer, a[href='#main']")];
    background.forEach((el) => (el.inert = true));

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      // Keep Tab cycling between the close button and the sheet's links.
      const sheet = document.getElementById(props.id);
      const focusables = [
        toggle,
        ...(sheet ? sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") : []),
      ].filter((el): el is HTMLElement => Boolean(el));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement as HTMLElement | null;
      const inCycle = current ? focusables.includes(current) : false;
      if (event.shiftKey && (current === first || !inCycle)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !inCycle)) {
        event.preventDefault();
        first.focus();
      }
    };
    const media = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => {
      if (media.matches) onClose();
    };

    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onResize);
    return () => {
      delete document.body.dataset.scrollLocked;
      background.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onResize);
      toggle?.focus({ preventScroll: true });
    };
  }, [open, onClose, toggleRef, props.id]);

  if (!present) return null;

  return (
    <div
      id={props.id}
      role="dialog"
      aria-modal="true"
      aria-label={props.label}
      data-state={open ? "open" : "closed"}
      className="sheet fixed inset-0 z-30 overflow-y-auto bg-[var(--paper-sheet)] pt-[var(--nav-h)] backdrop-blur-[20px] md:hidden"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <nav aria-label={props.label} className="container-page pt-6" onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
        <ul ref={listRef} className="border-t border-line">
          {props.items.map((item, index) => (
            <li key={item.id} className="sheet-item overflow-hidden" style={{ "--i": index } as CSSProperties}>
              <NavLink
                variant="sheet"
                href={`#${item.id}`}
                label={item.label}
                active={props.active === item.id}
                index={item.index}
                onClick={onClose}
              />
            </li>
          ))}
        </ul>
        <div className="sheet-cta mt-8" style={{ "--i": props.items.length } as CSSProperties}>
          <Button
            href={props.cvUrl}
            external
            icon="download"
            iconPosition="start"
            comingSoonLabel={props.comingSoonLabel}
            newTabLabel={props.newTabLabel}
            className="w-full"
          >
            {props.cvLabel}
          </Button>
        </div>
      </nav>
    </div>
  );
}
