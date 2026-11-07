"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** `fallback` is the build-time year, used in the static HTML and without JavaScript. */
export function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => fallback);
  return <span className="tabular">{year}</span>;
}
