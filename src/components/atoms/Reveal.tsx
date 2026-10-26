import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Position in a staggered group (60ms per step). */
  index?: number;
  className?: string;
}

/**
 * Marks a block for the scroll reveal. Rendered on the server and always
 * visible in the HTML; <RevealObserver /> (one client component for the
 * whole page) hides off-screen blocks after load and fades them in.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  return (
    <div data-reveal="" className={className} style={{ "--reveal-i": Math.min(index, 8) } as CSSProperties}>
      {children}
    </div>
  );
}
