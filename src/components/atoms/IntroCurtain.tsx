interface IntroCurtainProps {
  monogram: string;
  wordmark: string;
}

/**
 * Cobalt cover sheet that lifts off the page on load (CSS only).
 * Hidden by default: it only shows while its animation runs, so with
 * animations off or unsupported it never covers anything.
 */
export function IntroCurtain({ monogram, wordmark }: IntroCurtainProps) {
  return (
    <div aria-hidden="true" className="intro-curtain">
      <div className="intro-curtain-mark">
        <span className="intro-curtain-monogram">{monogram}</span>
        <span className="intro-curtain-name">{wordmark}</span>
      </div>
    </div>
  );
}
