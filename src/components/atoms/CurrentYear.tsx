"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The current year, computed with new Date().getFullYear() in the
 * visitor's browser. `fallback` is the year at build time, used in the
 * static HTML and when JavaScript is off.
 */
export function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => fallback);
  return <span className="tabular">{year}</span>;
}
