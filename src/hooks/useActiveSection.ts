"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently under the reading line
 * (just below the navbar), using IntersectionObserver.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
        const current = ids.find((id) => visible.get(id));
        if (current) setActive(current);
      },
      // A thin band 30% from the top of the viewport acts as the reading line.
      { rootMargin: "-30% 0px -69% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
