import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll motion grammar (see globals.css):
 * - rise: text blocks lift out of the page
 * - card: cards stand up in 3D like a page being turned
 * - tile: images are uncovered by a cut, their photo settling inside
 * - pop: small objects scale in
 */
export type RevealMotion = "rise" | "card" | "tile" | "pop";

interface RevealProps {
  children: ReactNode;
  /** Position in a staggered group: shifts where in the scroll it plays. */
  index?: number;
  motion?: RevealMotion;
  className?: string;
}

/**
 * Marks a block for the scroll reveal. Rendered on the server and always
 * visible in the HTML. Browsers with scroll-driven animations play it from
 * CSS and reverse it when scrolling up; others fall back to <RevealObserver />.
 */
export function Reveal({ children, index = 0, motion = "rise", className }: RevealProps) {
  return (
    <div
      data-reveal=""
      data-motion={motion}
      className={className}
      style={{ "--reveal-i": Math.min(index, 8) } as CSSProperties}
    >
      {children}
    </div>
  );
}
