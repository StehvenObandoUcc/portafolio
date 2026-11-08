import Image from "next/image";
import { ProjectGallery, type GalleryShot, type ProjectGalleryLabels } from "@/components/molecules/ProjectGallery";
import { cn } from "@/lib/cn";

interface GalleryItemProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  shape: "tall" | "wide" | "square";
  /** Every photo of the gallery, so the viewer can page through them. */
  shots: GalleryShot[];
  /** This photo's place in `shots`. */
  index: number;
  title: string;
  labels: ProjectGalleryLabels;
  className?: string;
}

const sizes = {
  tall: "(min-width: 900px) 24vw, 50vw",
  wide: "(min-width: 900px) 50vw, 100vw",
  square: "(min-width: 900px) 24vw, 50vw",
};

/** A bento cell, cropped to fit; clicking it opens the whole photo. */
export function GalleryItem({ src, alt, width, height, caption, shape, shots, index, title, labels, className }: GalleryItemProps) {
  return (
    <figure data-tilt className={cn("group relative size-full overflow-clip rounded-lg border border-line bg-paper-2", className)}>
      <ProjectGallery title={title} shots={shots} labels={labels} startIndex={index}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes[shape]}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </ProjectGallery>
      <figcaption className="text-label pointer-events-none absolute bottom-3 left-3 rounded-pill bg-surface/90 px-2.5 py-1.5 text-ink backdrop-blur-sm">
        {caption}
      </figcaption>
    </figure>
  );
}
