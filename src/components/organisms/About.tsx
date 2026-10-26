import type { HeadingParts } from "@/components/atoms/Heading";
import { Reveal } from "@/components/atoms/Reveal";
import { GalleryItem } from "@/components/molecules/GalleryItem";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { cn } from "@/lib/cn";

export interface AboutProps {
  index: string;
  title: HeadingParts;
  paragraph: string;
  gallery: {
    id: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
    shape: "tall" | "wide" | "square";
  }[];
}

/**
 * Bento cells. From 900px the gallery runs full width on four columns:
 * the wide photo takes the right half as a 2×2 block, tall ones span two
 * rows and squares fill the gaps (dense flow keeps extra photos tidy).
 */
const cell = {
  tall: "row-span-2",
  wide: "col-span-2 md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-1",
  square: "",
};

/** The personal side: an opening statement, then a full-width bento of photos. */
export function About({ index, title, paragraph, gallery }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-title" className="py-section-y">
      <div className="container-page">
        <SectionHeader id="about-title" index={index} title={title} />

        <Reveal className="mb-10 md:mb-14 md:ml-[4.25rem]">
          <p className="max-w-[40ch] text-[clamp(20px,1.1vw+15px,30px)] leading-[1.4] font-medium tracking-[-0.015em] text-pretty text-ink">
            {paragraph}
          </p>
        </Reveal>

        <div className="grid auto-rows-[150px] grid-cols-2 gap-3 xs:auto-rows-[170px] sm:auto-rows-[200px] sm:grid-cols-3 sm:gap-4 md:grid-flow-dense md:grid-cols-4 md:auto-rows-[clamp(200px,17vw,260px)]">
          {gallery.map((item, i) => (
            <Reveal key={item.id} index={i} motion="tile" className={cn(cell[item.shape])}>
              <GalleryItem
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                caption={item.caption}
                shape={item.shape}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
