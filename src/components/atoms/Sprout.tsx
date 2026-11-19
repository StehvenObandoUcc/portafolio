import type { CSSProperties } from "react";

/** Small seeded PRNG, so every plant is the same on every render and on the server. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 96;

interface Leaf {
  x: number;
  y: number;
  angle: number;
  size: number;
  /** 0–1: where along the growth this leaf opens. */
  at: number;
}

function buildPlant(seed: number, height: number, side: "left" | "right") {
  const rnd = mulberry32(seed);
  const lean = side === "left" ? 1 : -1;
  const baseX = side === "left" ? W * 0.3 : W * 0.7;
  const top = height * (0.06 + rnd() * 0.1);
  const steps = 6;
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = height - (height - top) * t;
    const x = baseX + lean * Math.sin(t * Math.PI * (0.8 + rnd() * 0.6)) * (10 + rnd() * 16) + lean * t * 14;
    pts.push([x, y]);
  }
  // Smooth stem through the points (quadratic midpoints).
  let stem = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    stem += ` Q${x.toFixed(1)} ${y.toFixed(1)} ${((x + nx) / 2).toFixed(1)} ${((y + ny) / 2).toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  stem += ` L${last[0].toFixed(1)} ${last[1].toFixed(1)}`;

  // Leaves alternate sides up the stem, smaller toward the tip.
  const leaves: Leaf[] = [];
  const count = Math.round(height / 46);
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 1);
    const k = Math.min(pts.length - 2, Math.floor(t * steps));
    const f = t * steps - k;
    const x = pts[k][0] + (pts[k + 1][0] - pts[k][0]) * f;
    const y = pts[k][1] + (pts[k + 1][1] - pts[k][1]) * f;
    const flip = i % 2 === 0 ? 1 : -1;
    leaves.push({ x, y, angle: flip * (38 + rnd() * 26) - 90, size: (15 + rnd() * 9) * (1 - t * 0.45), at: t });
  }
  const flower = rnd() > 0.35 ? { x: last[0], y: last[1], r: 4 + rnd() * 3, warm: rnd() > 0.5 } : null;
  return { stem, leaves, flower };
}

interface SproutProps {
  seed: number;
  side: "left" | "right";
  height: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * A line-drawn plant in the page margin. The stem draws itself upward and the
 * leaves open in order as it scrolls into view (or once it is revealed where
 * scroll timelines are not supported).
 */
export function Sprout({ seed, side, height, className, style }: SproutProps) {
  const { stem, leaves, flower } = buildPlant(seed, height, side);
  return (
    <svg
      aria-hidden="true"
      data-reveal=""
      data-motion="sprout"
      viewBox={`0 0 ${W} ${height}`}
      width={W}
      height={height}
      className={`sprout sprout-${side} ${className ?? ""}`}
      style={style}
    >
      <path d={stem} pathLength={1} className="sprout-stem" />
      {leaves.map((leaf, i) => (
        <g key={i} transform={`translate(${leaf.x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${leaf.angle.toFixed(1)})`}>
          <path
            className="sprout-leaf"
            style={{ "--at": leaf.at.toFixed(2) } as CSSProperties}
            d={`M0 0 C${(leaf.size * 0.35).toFixed(1)} ${(-leaf.size * 0.32).toFixed(1)} ${(leaf.size * 0.8).toFixed(1)} ${(-leaf.size * 0.22).toFixed(1)} ${leaf.size.toFixed(1)} 0 C${(leaf.size * 0.8).toFixed(1)} ${(leaf.size * 0.22).toFixed(1)} ${(leaf.size * 0.35).toFixed(1)} ${(leaf.size * 0.32).toFixed(1)} 0 0 Z`}
          />
        </g>
      ))}
      {flower && (
        <circle
          cx={flower.x.toFixed(1)}
          cy={flower.y.toFixed(1)}
          r={flower.r.toFixed(1)}
          className={flower.warm ? "sprout-bud sprout-bud-warm" : "sprout-bud"}
        />
      )}
    </svg>
  );
}

/** Plants spaced down the page, alternating margins. Hidden where the margins are too narrow. */
export function Garden() {
  const plants = [
    { top: "9%", side: "right", seed: 11, height: 360 },
    { top: "17%", side: "left", seed: 23, height: 300 },
    { top: "29%", side: "right", seed: 37, height: 420 },
    { top: "41%", side: "left", seed: 41, height: 380 },
    { top: "53%", side: "right", seed: 59, height: 320 },
    { top: "64%", side: "left", seed: 67, height: 400 },
    { top: "76%", side: "right", seed: 73, height: 360 },
    { top: "87%", side: "left", seed: 89, height: 300 },
  ] as const;
  return (
    <div aria-hidden="true" className="garden">
      {plants.map((p) => (
        <Sprout key={p.seed} seed={p.seed} side={p.side} height={p.height} style={{ top: p.top }} />
      ))}
    </div>
  );
}
