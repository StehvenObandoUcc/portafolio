interface IntroCurtainProps {
  monogram: string;
  wordmark: string;
}

/** Hidden by default and shown only while its animation runs, so it never covers the page without animations. */
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
