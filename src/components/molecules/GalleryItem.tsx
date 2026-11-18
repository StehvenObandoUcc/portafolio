import Image from "next/image";
import { Icon } from "@/components/atoms/Icon";
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
      {/* Lab plate: name and plate number on a dark fade, an arrow that lifts on hover. */}
      <figcaption className="lab-plate pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-3.5 pt-10 pb-3">
        <span className="text-[14px] leading-tight font-medium">{caption}</span>
        <span className="text-label tabular opacity-80">{String(index + 1).padStart(2, "0")}</span>
      </figcaption>
      <span aria-hidden="true" className="lab-arrow pointer-events-none absolute top-3 right-3 grid size-8 place-items-center rounded-pill">
        <Icon name="arrow-up-right" size={15} />
      </span>
    </figure>
  );
}
