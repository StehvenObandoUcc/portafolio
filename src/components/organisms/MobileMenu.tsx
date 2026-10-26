"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";
import { Button } from "@/components/atoms/Button";
import { NavLink } from "@/components/molecules/NavLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  const reducedMotion = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;

    document.body.dataset.scrollLocked = "";
    listRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const media = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => {
      if (media.matches) onClose();
    };

    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onResize);
    return () => {
      delete document.body.dataset.scrollLocked;
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onResize);
      toggle?.focus({ preventScroll: true });
    };
  }, [open, onClose, toggleRef]);

  const offset = reducedMotion ? 0 : 12;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={props.id}
          key="sheet"
          className="fixed inset-0 z-30 bg-[rgba(245,243,238,.92)] pt-[var(--nav-h)] backdrop-blur-[20px] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <nav aria-label={props.label} className="container-page pt-6" onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}>
            <ul ref={listRef} className="border-t border-line">
              {props.items.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: offset }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0.15 : 0.45, delay: reducedMotion ? 0 : 0.04 + index * 0.045, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    variant="sheet"
                    href={`#${item.id}`}
                    label={item.label}
                    active={props.active === item.id}
                    onClick={onClose}
                  />
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: offset }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : 0.04 + props.items.length * 0.045 }}
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
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
