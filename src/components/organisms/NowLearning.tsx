import type { HeadingParts } from "@/components/atoms/Heading";
import { Reveal } from "@/components/atoms/Reveal";
import { LearningCard, type LearningCardData } from "@/components/molecules/LearningCard";
import { SectionHeader } from "@/components/molecules/SectionHeader";

export interface NowLearningProps {
  index: string;
  title: HeadingParts;
  subtitle: string;
  items: LearningCardData[];
  goalLabel: string;
  progressLabel: string;
}

/** Bento spans for up to four entries; extras fall back to a third. */
const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-3", "md:col-span-3"];

export function NowLearning(props: NowLearningProps) {
  return (
    <section id="learning" aria-labelledby="learning-title" className="py-section-y">
      <div className="container-page">
        <SectionHeader id="learning-title" index={props.index} title={props.title} subtitle={props.subtitle} />

        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-6 md:gap-5">
          {props.items.map((item, i) => (
            <li key={item.id} className={spans[i] ?? "md:col-span-2"}>
              <Reveal index={i} motion="card" className="h-full">
                <LearningCard
                  item={item}
                  goalLabel={props.goalLabel}
                  progressLabel={props.progressLabel}
                  large={i === 0}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
