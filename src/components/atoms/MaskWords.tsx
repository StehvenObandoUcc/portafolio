import type { CSSProperties } from "react";
import type { HeadingParts } from "./Heading";

interface MaskWordsProps {
  parts: HeadingParts;
}

/**
 * Heading copy split into words, each rising out of its own mask as the
 * heading scrolls in. The emphasis words keep the serif accent. Reads as
 * plain text to assistive tech; resting state is fully visible.
 */
export function MaskWords({ parts }: MaskWordsProps) {
  const runs = [
    { text: parts.before, emphasis: false },
    { text: parts.emphasis, emphasis: true },
    { text: parts.after, emphasis: false },
  ];
  let index = 0;

  return (
    <>
      {runs.map((run, r) =>
        run.text
          .split(/(\s+)/)
          .filter((chunk) => chunk.length > 0)
          .map((chunk, c) => {
            if (/^\s+$/.test(chunk)) return <span key={`${r}-${c}`}> </span>;
            const word = (
              <span className="word-mask" key={`${r}-${c}`}>
                <span className="word" style={{ "--i": index } as CSSProperties}>
                  {chunk}
                </span>
              </span>
            );
            index += 1;
            return run.emphasis ? (
              <em key={`${r}-${c}`} className="serif-em">
                {word}
              </em>
            ) : (
              word
            );
          }),
      )}
    </>
  );
}
