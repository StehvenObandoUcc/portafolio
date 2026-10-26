import Image from "next/image";
import { cn } from "@/lib/cn";

interface GalleryItemProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  shape: "tall" | "wide" | "square";
  className?: string;
}

const sizes = {
  tall: "(min-width: 900px) 22vw, 50vw",
  wide: "(min-width: 900px) 44vw, 100vw",
  square: "(min-width: 900px) 22vw, 50vw",
};

/** A bento cell: photo that zooms gently on hover, caption in the corner. */
export function GalleryItem({ src, alt, width, height, caption, shape, className }: GalleryItemProps) {
  return (
    <figure data-tilt className={cn("group relative size-full overflow-clip rounded-lg border border-line bg-paper-2", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes[shape]}
        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <figcaption className="text-label absolute bottom-3 left-3 rounded-pill bg-surface/90 px-2.5 py-1.5 text-ink backdrop-blur-sm">
        {caption}
      </figcaption>
    </figure>
  );
}
