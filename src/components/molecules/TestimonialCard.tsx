import Image from "next/image";
import { IconLink } from "@/components/atoms/IconButton";
import { cn } from "@/lib/cn";

export type TestimonialCardData =
  | {
      pending: false;
      id: string;
      quote: string;
      name: string;
      role: string;
      organization: string;
      linkedinUrl?: string;
      photo?: { src: string; alt: string };
    }
  | { pending: true; id: string; title: string; body: string; author: string };

interface TestimonialCardProps {
  testimonial: TestimonialCardData;
  linkedinLabel: string;
  comingSoonLabel: string;
  className?: string;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const quoteMark = (
  <span aria-hidden="true" className="block h-12 font-serif text-[88px] leading-[0.9] text-accent-300 select-none">
    &ldquo;
  </span>
);

export function TestimonialCard({ testimonial, linkedinLabel, comingSoonLabel, className }: TestimonialCardProps) {
  if (testimonial.pending) {
    return (
      <figure
        className={cn(
          "flex h-full flex-col gap-4 rounded-lg border border-dashed border-line-strong bg-surface/50 p-6 sm:p-7",
          className,
        )}
      >
        {quoteMark}
        <blockquote className="flex-1">
          <p className="text-h3 text-ink-soft">{testimonial.title}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-mute">{testimonial.body}</p>
        </blockquote>
        <figcaption className="flex items-center gap-3 border-t border-line pt-5">
          <span aria-hidden="true" className="size-11 flex-none rounded-full border border-dashed border-accent-300" />
          <span className="text-label text-ink-mute">{testimonial.author}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure data-tilt className={cn("card card-interactive flex h-full flex-col gap-4 p-6 sm:p-7", className)}>
      {quoteMark}
      <blockquote className="flex-1">
        <p className="text-[17px] leading-relaxed text-pretty text-ink">{testimonial.quote}</p>
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-line pt-5">
        {testimonial.photo ? (
          <Image
            src={testimonial.photo.src}
            alt={testimonial.photo.alt}
            width={88}
            height={88}
            className="size-11 flex-none rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-11 flex-none place-items-center rounded-full bg-accent-50 font-mono text-[13px] font-semibold text-accent-700"
          >
            {initials(testimonial.name)}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-ink">{testimonial.name}</span>
          <span className="block text-[14px] text-ink-soft">
            {testimonial.role} · {testimonial.organization}
          </span>
        </span>
        {testimonial.linkedinUrl && (
          <IconLink
            href={testimonial.linkedinUrl}
            external
            icon="linkedin"
            label={`${linkedinLabel}: ${testimonial.name}`}
            comingSoonLabel={comingSoonLabel}
          />
        )}
      </figcaption>
    </figure>
  );
}
