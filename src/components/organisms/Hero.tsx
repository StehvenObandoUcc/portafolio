import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import type { HeadingParts } from "@/components/atoms/Heading";
import { PhotoFrame } from "@/components/molecules/PhotoFrame";
import { StatItem } from "@/components/molecules/StatItem";
import type { ImageAsset, Stat } from "@/data/types";

export interface HeroProps {
  badge: string;
  titleLine1: string;
  titleLine2: HeadingParts;
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  photo: Omit<ImageAsset, "alt"> & { alt: string };
  photoTag: string;
  stats: Stat[];
  comingSoonLabel: string;
  newTabLabel: string;
}

/** First viewport: graph-paper ground, masked headline, photo, measurements. */
export function Hero(props: HeroProps) {
  const { titleLine2 } = props;

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+clamp(28px,6vw,72px))] pb-[clamp(56px,8vw,112px)]"
    >
      <div aria-hidden="true" className="hero-grid hero-grid-drift absolute inset-x-0 top-0 -z-10 h-[min(100%,920px)]" />

      <div className="container-page grid items-center gap-y-12 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
        <div className="hero-photo-drift mx-auto w-full max-w-[min(72vw,380px)] md:order-2 md:col-span-5 md:max-w-none">
          <PhotoFrame
            src={props.photo.src}
            alt={props.photo.alt}
            width={props.photo.width}
            height={props.photo.height}
            tag={props.photoTag}
            priority
            sizes="(min-width: 1200px) 440px, (min-width: 900px) 38vw, 72vw"
          />
        </div>

        <div className="hero-copy-drift md:order-1 md:col-span-7">
          <Badge live className="enter-badge">
            {props.badge}
          </Badge>

          <h1 id="home-title" className="text-display mt-7 text-ink">
            <span className="enter-mask">
              <span className="enter-line enter-line-1">{props.titleLine1}</span>
            </span>
            <span className="enter-mask">
              <span className="enter-line enter-line-2">
                {titleLine2.before}
                {titleLine2.emphasis && <em className="serif-em serif-em-ruled enter-unblur">{titleLine2.emphasis}</em>}
                {titleLine2.after}
              </span>
            </span>
          </h1>

          <p className="enter-lede mt-7 max-w-[52ch] text-[clamp(17px,0.45vw+15.5px,20px)] leading-[1.55] text-pretty text-ink-soft">
            {props.lede}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <span className="enter-cta-1">
              <Button href={props.primaryCta.href} icon="arrow-right" comingSoonLabel={props.comingSoonLabel}>
                {props.primaryCta.label}
              </Button>
            </span>
            <span className="enter-cta-2">
              <Button
                href={props.secondaryCta.href}
                external
                variant="secondary"
                icon="download"
                comingSoonLabel={props.comingSoonLabel}
                newTabLabel={props.newTabLabel}
              >
                {props.secondaryCta.label}
              </Button>
            </span>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-7 sm:grid-cols-3 md:mt-14">
            {props.stats.map((stat, index) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} index={index} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
