interface SpinSealProps {
  /** Runs around the ring; repeat separators are added here. */
  text: string;
  monogram: string;
  className?: string;
}

/** A round sticker whose lettering turns slowly around the monogram. */
export function SpinSeal({ text, monogram, className }: SpinSealProps) {
  const ring = `${text} · ${text} · `;
  return (
    <span aria-hidden="true" className={`spin-seal ${className ?? ""}`}>
      <svg viewBox="0 0 120 120" className="spin-seal-ring">
        <defs>
          <path id="spin-seal-path" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        </defs>
        <text>
          <textPath href="#spin-seal-path" textLength="288" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="spin-seal-core">{monogram}</span>
    </span>
  );
}
