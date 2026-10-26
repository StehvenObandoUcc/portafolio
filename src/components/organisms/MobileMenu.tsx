"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";
import { Button } from "@/components/atoms/Button";
import { NavLink } from "@/components/molecules/NavLink";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
  items: { id: string; label: string }[];
  active: string;
  label: string;
  cvLabel: string;
  cvUrl: string;
  comingSoonLabel: string;
  newTabLabel: string;
}

const DESKTOP_QUERY = "(min-width: 900px)";

/** Full-screen sheet for < 900px. Escape, link click, outside click and resize close it. */
export function MobileMenu(props: MobileMenuProps) {
  const { open, onClose, toggleRef } = props;
  const listRef = useRef<HTMLUListElement>(null);

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

  const offset = 24;

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id={props.id}
          key="sheet"
          role="dialog"
          aria-modal="true"
          aria-label={props.label}
          className="fixed inset-0 z-30 overflow-y-auto bg-[var(--paper-sheet)] pt-[var(--nav-h)] backdrop-blur-[20px] md:hidden"
          initial={{ clipPath: "circle(0px at calc(100% - 42px) 34px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 42px) 34px)" }}
          exit={{ clipPath: "circle(0px at calc(100% - 42px) 34px)" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <nav aria-label={props.label} className="container-page pt-6" onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}>
            <ul ref={listRef} className="border-t border-line">
              {props.items.map((item, index) => (
                <m.li
                  key={item.id}
                  className="overflow-hidden"
                  initial={{ opacity: 0, y: "70%", rotate: 3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.18 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    variant="sheet"
                    href={`#${item.id}`}
                    label={item.label}
                    active={props.active === item.id}
                    index={String(index + 1).padStart(2, "0")}
                    onClick={onClose}
                  />
                </m.li>
              ))}
            </ul>
            <m.div
              className="mt-8"
              initial={{ opacity: 0, y: offset }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + props.items.length * 0.055 }}
            >
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
            </m.div>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
