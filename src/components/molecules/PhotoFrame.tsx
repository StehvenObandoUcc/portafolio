import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/cn";

interface PhotoFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Small floating tag, e.g. "Pasto, Nariño · CO". */
  tag: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}

/** 4:5 photo with an offset accent block behind it and a location tag. */
export function PhotoFrame({ src, alt, width, height, tag, priority = false, sizes, className }: PhotoFrameProps) {
  return (
    <figure className={cn("relative isolate", className)}>
      <span
        aria-hidden="true"
        className="enter-offset absolute inset-0 -z-10 translate-x-[14px] translate-y-[14px] rounded-lg bg-accent-100"
      />
      <div className="enter-photo relative aspect-[4/5] overflow-hidden rounded-lg border border-line-strong bg-paper-2">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="size-full object-cover"
        />
      </div>
      <figcaption className="text-label absolute bottom-5 -left-3 inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-3 py-2 text-ink shadow-card sm:-left-5">
        <Icon name="map-pin" size={14} className="text-accent-600" />
        {tag}
      </figcaption>
    </figure>
  );
}
