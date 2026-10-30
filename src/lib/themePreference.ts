/**
 * Light / dark theme. The first visit follows the operating system; once
 * the visitor picks one with the navbar switch it is remembered in
 * localStorage. Exposed as <html data-theme="light|dark">, which the CSS
 * tokens read.
 */
export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_EVENT = "themechange";
const DARK_QUERY = "(prefers-color-scheme: dark)";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(THEME_EVENT));
}

/** Sets and remembers the visitor's choice. */
export function setTheme(theme: Theme) {
  apply(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }
}

/** Notifies on theme changes, including OS changes while the visitor has not chosen. */
export function subscribeTheme(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  const onSystem = () => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // ignore
    }
    if (!stored) apply(media.matches ? "dark" : "light");
  };
  window.addEventListener(THEME_EVENT, onChange);
  media.addEventListener("change", onSystem);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    media.removeEventListener("change", onSystem);
  };
}

/** Runs before first paint so the page never flashes the wrong theme. */
export const themeBootScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("${DARK_QUERY}").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}`;
