interface IntroCurtainProps {
  monogram: string;
  wordmark: string;
  /** Status line while the curtain holds, then the word shown when it lifts. */
  status: { loading: string; ready: string };
}

/**
 * Hidden by default and shown only while its animation runs, so it never covers the page without animations.
 * The monogram is glass: the grid behind it shows through bent and enlarged, with a moving highlight,
 * all with SVG filters (no WebGL), so it costs nothing to load.
 */
export function IntroCurtain({ monogram, wordmark, status }: IntroCurtainProps) {
  return (
    <div aria-hidden="true" className="intro-curtain">
      <div className="intro-curtain-mark">
        <div className="intro-glass">
          {/* Depth: the outline repeated behind itself, so the letters read as a solid block of glass. */}
          {Array.from({ length: 9 }, (_, k) => (
            <svg
              key={k}
              viewBox="0 0 360 220"
              className="intro-depth"
              style={{ transform: `translateZ(${-(k + 1) * 5}px)`, opacity: 0.55 - k * 0.05 }}
            >
              <text x="180" y="160" textAnchor="middle" fill="none" stroke="currentColor" strokeWidth="1">
                {monogram}
              </text>
            </svg>
          ))}
          <svg viewBox="0 0 360 220" className="intro-glass-svg">
            <defs>
              <pattern id="ig-grid" width="18" height="18" patternUnits="userSpaceOnUse">
                <path d="M18 0H0V18" fill="none" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
              </pattern>
              {/* Seen through the glass: the same grid, larger and shifted. */}
              <pattern id="ig-grid-bent" width="27" height="27" patternUnits="userSpaceOnUse" patternTransform="translate(7 5) rotate(-6)">
                <path d="M27 0H0V27" fill="none" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.6" />
              </pattern>
              <filter id="ig-refract" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="ig-specular" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="soft" />
                <feSpecularLighting in="soft" surfaceScale="7" specularConstant="1.15" specularExponent="26" lightingColor="#ffffff" result="spec">
                  <fePointLight x="40" y="-90" z="200">
                    <animate attributeName="x" values="-60;420;-60" dur="2.6s" repeatCount="indefinite" />
                  </fePointLight>
                </feSpecularLighting>
                <feComposite in="spec" in2="SourceAlpha" operator="in" />
              </filter>
            </defs>
            <rect width="360" height="220" fill="url(#ig-grid)" className="intro-glass-ground" />
            <g className="intro-glass-letters">
              <text x="180" y="160" textAnchor="middle" fill="currentColor" fillOpacity="0.1">{monogram}</text>
              <text x="180" y="160" textAnchor="middle" fill="url(#ig-grid-bent)" filter="url(#ig-refract)">{monogram}</text>
              <text x="180" y="160" textAnchor="middle" fill="#fff" filter="url(#ig-specular)">{monogram}</text>
              <text x="180" y="160" textAnchor="middle" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2">{monogram}</text>
            </g>
          </svg>
          <svg viewBox="0 0 100 100" className="intro-ring">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="0.6 2.4" />
          </svg>
        </div>
        <span className="intro-curtain-name">{wordmark}</span>
        <span className="intro-status">
          <span className="intro-status-loading">{status.loading}</span>
          <span className="intro-status-ready">{status.ready}</span>
          <span className="intro-percent" />
        </span>
      </div>
    </div>
  );
}
