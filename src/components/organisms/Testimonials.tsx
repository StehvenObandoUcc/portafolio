import type { HeadingParts } from "@/components/atoms/Heading";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { TestimonialCard, type TestimonialCardData } from "@/components/molecules/TestimonialCard";

export interface TestimonialsProps {
  index: string;
  title: HeadingParts;
  subtitle: string;
  testimonials: TestimonialCardData[];
  linkedinLabel: string;
  comingSoonLabel: string;
}

/** Scroll-snap rail on mobile, three columns from 900px. */
export function Testimonials(props: TestimonialsProps) {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="py-section-y">
      <div className="container-page">
        <SectionHeader id="testimonials-title" index={props.index} title={props.title} subtitle={props.subtitle} />

        <ul className="snap-rail -mx-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {props.testimonials.map((testimonial, i) => (
            <li
              key={testimonial.id}
              className="w-[min(84vw,360px)] flex-none snap-start scroll-ml-gutter md:w-auto"
            >
              <Reveal index={i} className="h-full">
                <TestimonialCard
                  testimonial={testimonial}
                  linkedinLabel={props.linkedinLabel}
                  comingSoonLabel={props.comingSoonLabel}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
