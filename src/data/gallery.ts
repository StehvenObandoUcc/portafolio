import type { GalleryImage } from "./types";

/** About-me gallery (3–5 images): hobbies outside tech. */
export const gallery: GalleryImage[] = [
  {
    id: "reading",
    shape: "tall",
    image: {
      src: "/images/gallery-frankenstein.jpg",
      width: 800,
      height: 1200,
      alt: {
        es: "Grabado de la edición de 1831 de Frankenstein, de Mary Shelley",
        en: "Engraving from the 1831 edition of Mary Shelley's Frankenstein",
      },
    },
    caption: { es: "Lectura · Frankenstein", en: "Reading · Frankenstein" },
  },
  {
    id: "blender-1",
    shape: "square",
    image: {
      src: "/images/gallery-blender-1.jpg",
      width: 1200,
      height: 900,
      alt: {
        es: "Mi primer render en Blender: una mesa de sushi en estilo low poly",
        en: "My first Blender render: a low-poly sushi table",
      },
    },
    caption: { es: "Blender · primer render", en: "Blender · first render" },
  },
  {
    id: "games",
    shape: "square",
    image: {
      src: "/images/gallery-voxel.svg",
      width: 1000,
      height: 1000,
      alt: {
        es: "Ilustración de una isla de bloques con un árbol",
        en: "Illustration of a block island with a tree",
      },
    },
    caption: { es: "Videojuegos de construcción", en: "Building games" },
  },
  {
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
    caption: { es: "Blender · local de ramen", en: "Blender · ramen shop" },
  },
];
