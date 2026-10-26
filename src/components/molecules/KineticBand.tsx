import { cn } from "@/lib/cn";

interface KineticBandProps {
  items: string[];
  /** Which way the type travels as the page scrolls down. */
  direction?: "left" | "right";
  className?: string;
}

/**
 * Oversized running type that slides with the scroll, alternating outlined
 * and inked words like a ruled header strip. Decorative: the same items are
 * listed accessibly in the Experience section.
 */
export function KineticBand({ items, direction = "left", className }: KineticBandProps) {
  const run = [...items, ...items];
  return (
    <div aria-hidden="true" className={cn("kinetic-band", className)}>
      <div className={cn("kinetic-track", direction === "right" && "kinetic-track-right")}>
        {run.map((item, i) => (
          <span key={`${item}-${i}`} className="kinetic-item">
            <span className={i % 2 === 0 ? "kinetic-word-outline" : "kinetic-word"}>{item}</span>
            <span className="kinetic-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
