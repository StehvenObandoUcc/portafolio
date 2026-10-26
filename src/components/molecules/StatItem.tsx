import type { CSSProperties } from "react";
import { CountUp } from "@/components/atoms/CountUp";

interface StatItemProps {
  value: string;
  label: string;
  /** Stagger position for the hero entrance. */
  index?: number;
}

/** A number and its mono label, read like a measurement in the margin. */
export function StatItem({ value, label, index = 0 }: StatItemProps) {
  return (
    <div className="enter-stat flex flex-col gap-1.5" style={{ "--i": index } as CSSProperties}>
      <dt className="text-label order-2 text-balance text-ink-mute">{label}</dt>
      <dd className="order-1 font-mono text-[clamp(24px,2.2vw,32px)] leading-none font-medium tracking-[-0.02em] text-ink tabular">
        <CountUp value={value} delay={1550 + index * 80} />
      </dd>
    </div>
  );
}
