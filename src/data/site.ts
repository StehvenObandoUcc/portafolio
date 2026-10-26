import { TODO, type ImageAsset } from "./types";

/**
 * Production URL used by metadata, sitemap, robots and Open Graph.
 * TODO: set NEXT_PUBLIC_SITE_URL in Vercel once the deployment URL exists.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Locale-independent identity, contact and link data. */
export const site = {
  url: siteUrl,
  fullName: "Stehven Obando Córdoba",
  shortName: "Stehven Obando",
  monogram: "SO",
  email: "stehven.obando@campusucc.edu.co",
  github: "https://github.com/StehvenObandoUcc",
  githubHandle: "@StehvenObandoUcc",
  /** TODO: LinkedIn profile URL. */
  linkedin: TODO as string,
  linkedinHandle: TODO as string,
  /** TODO: public Google Drive link to the CV (PDF). */
  cvUrl: TODO as string,
  location: "Pasto, Nariño, Colombia",
  locationShort: "Pasto, Nariño · CO",
  whatsapp: {
    /** Optional channel, off by default. */
    enabled: false,
    /** International format without "+", e.g. "57300...". */
    number: TODO as string,
  },
  /**
   * Hero photo. TODO: add /public/images/profile.webp (4:5, ≤ 180 KB)
   * and change src to "/images/profile.webp".
   */
  profilePhoto: {
    src: "/images/profile.svg",
    width: 800,
    height: 1000,
    alt: {
      es: "Retrato de Stehven Obando Córdoba",
      en: "Portrait of Stehven Obando Córdoba",
    },
  } satisfies ImageAsset,
};

export type Site = typeof site;
