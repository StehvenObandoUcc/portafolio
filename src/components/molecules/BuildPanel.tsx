"use client";

import { useSyncExternalStore } from "react";

export interface BuildPanelCopy {
  commit: string;
  browser: string;
  localTime: string;
  screen: string;
  updated: string;
}

interface BuildPanelProps {
  copy: BuildPanelCopy;
  /** Short commit hash of this deployment. */
  commit: string;
  /** Build date, YYYY-MM-DD. */
  updated: string;
  locale: string;
}

const TIME_ZONE = "America/Bogota";

function browserName(ua: string) {
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua)) return "Safari";
  return "—";
}

const dash = () => "—";
const noSubscribe = () => () => {};

function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

function subscribeClock(onChange: () => void) {
  const timer = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(timer);
}

const clocks = new Map<string, Intl.DateTimeFormat>();
function clockFor(locale: string) {
  let clock = clocks.get(locale);
  if (!clock) {
    clock = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone: TIME_ZONE });
    clocks.set(locale, clock);
  }
  return clock;
}

/**
 * The page's own build sheet, like a lab label: which commit is live, when it
 * was built, and what the visitor is reading it on. Read-outs fill in on the client.
 */
export function BuildPanel({ copy, commit, updated, locale }: BuildPanelProps) {
  const browser = useSyncExternalStore(noSubscribe, () => browserName(navigator.userAgent), dash);
  const screen = useSyncExternalStore(subscribeResize, () => `${window.innerWidth}×${window.innerHeight}`, dash);
  const time = useSyncExternalStore(subscribeClock, () => clockFor(locale).format(new Date()), dash);

  const rows: [string, string][] = [
    [copy.commit, commit],
    [copy.updated, updated],
    [copy.localTime, time],
    [copy.browser, browser],
    [copy.screen, screen],
  ];

  return (
    <dl className="build-panel grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3 md:grid-cols-5">
      {rows.map(([label, value]) => (
        <div key={label} className="flex flex-col gap-1">
          <dt className="text-label text-ink-mute">{label}</dt>
          <dd className="font-mono text-[13px] text-ink tabular">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
