"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { MOTION_EVENT, MOTION_STORAGE_KEY } from "@/lib/motionPreference";
import { THEME_EVENT, THEME_STORAGE_KEY } from "@/lib/themePreference";

/**
 * Switching language re-renders <html> and drops the data-theme and
 * data-motion-pref attributes the boot script set; restore them before paint.
 */
export function PreferenceSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    let theme: string | null = null;
    let motion: string | null = null;
    try {
      theme = localStorage.getItem(THEME_STORAGE_KEY);
      motion = localStorage.getItem(MOTION_STORAGE_KEY);
    } catch {
      // Storage blocked: fall back to the system theme below.
    }
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    root.dataset.theme = theme;
    if (motion === "off") root.dataset.motionPref = "off";
    // Let the navbar switches re-read the restored state.
    window.dispatchEvent(new Event(THEME_EVENT));
    window.dispatchEvent(new Event(MOTION_EVENT));
  }, [pathname]);

  return null;
}
