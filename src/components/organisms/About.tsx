import type { HeadingParts } from "@/components/atoms/Heading";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { GalleryItem } from "@/components/molecules/GalleryItem";
import { SectionHeader } from "@/components/molecules/SectionHeader";

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

/** The personal side: a short paragraph and a bento of photos. */
export function About({ index, title, paragraph, gallery }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-title" className="py-section-y">
      <div className="container-page">
        <SectionHeader id="about-title" index={index} title={title} />

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-4">
            <Text size="lead" tone="ink" className="max-w-[46ch]">
              {paragraph}
            </Text>
          </Reveal>

          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 xs:auto-rows-[170px] sm:auto-rows-[200px] sm:grid-cols-3 sm:gap-4 md:col-span-8 lg:auto-rows-[230px]">
            {gallery.map((item, i) => (
              <Reveal
                key={item.id}
                index={i}
                motion="tile"
                className={
                  item.shape === "tall" ? "row-span-2" : item.shape === "wide" ? "col-span-2" : undefined
                }
              >
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
      </div>
    </section>
  );
}
