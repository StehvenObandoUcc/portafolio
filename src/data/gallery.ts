import type { GalleryImage } from "./types";

/** About-me gallery (3–5 images): hobbies outside tech. */
export const gallery: GalleryImage[] = [
  {
    id: "games",
    shape: "tall",
    image: {
      src: "/images/gallery-stardew.webp",
      width: 860,
      height: 1290,
      alt: { es: "Portada de Stardew Valley", en: "Stardew Valley cover art" },
    },
    caption: { es: "Videojuegos · Stardew Valley", en: "Games · Stardew Valley" },
  },
  {
    id: "blender-1",
    shape: "square",
    image: {
      src: "/images/gallery-blender-1.jpg",
      width: 1200,
      height: 900,
      alt: {
        es: "Render en Blender de una mesa de sushi en estilo low poly",
        en: "Blender render of a low-poly sushi table",
      },
    },
    caption: { es: "Blender", en: "Blender" },
  },  {
    id: "reading",
    shape: "square",
    image: {
      src: "/images/gallery-frankenstein.jpg",
      width: 800,
      height: 1200,
      alt: {
        es: "Grabado de la edición de 1831 de Frankenstein, de Mary Shelley",
        en: "Engraving from the 1831 edition of Mary Shelley's Frankenstein",
      },
    },
    caption: { es: "Libro · Frankenstein", en: "Book · Frankenstein" },
  },  {
    id: "blender-2",
    shape: "wide",
    image: {
      src: "/images/gallery-blender-2.jpg",
      width: 1200,
      height: 918,
      alt: {
        es: "Render en Blender de un pequeño local de ramen isométrico",
        en: "Blender render of a small isometric ramen shop",
      },
    },
    caption: { es: "Blender", en: "Blender" },
  },];
