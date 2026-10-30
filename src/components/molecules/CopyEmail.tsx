"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

interface CopyEmailProps {
  address: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
  copyAria: string;
}

/** Copy-to-clipboard button with a short confirmation toast. */
export function CopyEmail({ address, copyLabel, copiedLabel, copyFailedLabel, copyAria }: CopyEmailProps) {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setToast(copiedLabel);
    } catch {
      setToast(copyFailedLabel);
    }
  };

  const copied = toast === copiedLabel;

  return (
    <span className="relative">
      <button type="button" onClick={copy} aria-label={copyAria} className="btn btn-secondary btn-sm">
        <span key={copied ? "copied" : "idle"} className={cn(copied && "icon-swap")}>
          <Icon name={copied ? "check" : "copy"} size={16} />
        </span>
        <span>{copyLabel}</span>
      </button>
      <span role="status" aria-live="polite" className="pointer-events-none absolute right-0 bottom-[calc(100%+8px)]">
        <AnimatePresence>
          {toast && (
            <m.span
              key={toast}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="text-label inline-flex items-center gap-1.5 rounded-pill bg-ink px-3 py-1.5 whitespace-nowrap text-surface shadow-card"
            >
              <span className="size-1.5 rounded-full bg-accent-300" aria-hidden="true" />
              {toast}
            </m.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}
