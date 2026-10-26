/**
 * Visitor-controlled motion switch. Motion is on by default; turning it
 * off is remembered in localStorage and exposed as
 * <html data-motion-pref="off">, which CSS and the motion runtime read.
 */
export const MOTION_STORAGE_KEY = "motion";
export const MOTION_EVENT = "motionpreference";

export function isMotionOff(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.motionPref === "off";
}

export function setMotionOff(off: boolean) {
  const root = document.documentElement;
  if (off) root.dataset.motionPref = "off";
  else delete root.dataset.motionPref;
  try {
    localStorage.setItem(MOTION_STORAGE_KEY, off ? "off" : "on");
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }
  window.dispatchEvent(new Event(MOTION_EVENT));
}

export function subscribeMotion(onChange: () => void) {
  window.addEventListener(MOTION_EVENT, onChange);
  return () => window.removeEventListener(MOTION_EVENT, onChange);
}

/** Runs before first paint so a visitor who turned motion off never sees it. */
export const motionBootScript = `try{if(localStorage.getItem("${MOTION_STORAGE_KEY}")==="off")document.documentElement.dataset.motionPref="off"}catch(e){}`;
