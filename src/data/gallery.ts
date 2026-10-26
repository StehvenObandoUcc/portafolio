import type { GalleryImage } from "./types";

/**
 * About-me gallery (3–5 images). Topics: hobbies, sports, art, interests.
 * TODO: replace the placeholders with real photos (.webp, ≤ 250 KB),
 * update `src`, `alt` and `caption`.
 */
export const gallery: GalleryImage[] = [
  {
    id: "hobbies",
    shape: "tall",
    image: {
      src: "/images/gallery-hobbies.svg",
      width: 800,
      height: 1000,
      alt: { es: "Foto pendiente: pasatiempos", en: "Photo pending: hobbies" },
    },
    caption: { es: "Pasatiempos", en: "Hobbies" },
  },
  {
    id: "sports",
    shape: "square",
    image: {
      src: "/images/gallery-sports.svg",
      width: 1000,
      height: 1000,
      alt: { es: "Foto pendiente: deporte", en: "Photo pending: sports" },
    },
    caption: { es: "Deporte", en: "Sports" },
  },
  {
    id: "art",
    shape: "square",
    image: {
      src: "/images/gallery-art.svg",
      width: 1000,
      height: 1000,
      alt: { es: "Foto pendiente: arte", en: "Photo pending: art" },
    },
    caption: { es: "Arte", en: "Art" },
  },
  {
    id: "interests",
    shape: "wide",
    image: {
      src: "/images/gallery-interests.svg",
      width: 1600,
      height: 1000,
      alt: { es: "Foto pendiente: intereses", en: "Photo pending: interests" },
    },
    caption: { es: "Intereses", en: "Interests" },
  },
];
