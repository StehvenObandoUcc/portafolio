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
  linkedin: "https://www.linkedin.com/in/stehven-obando-399760407/" as string,
  linkedinHandle: "Stehven Obando" as string,
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
  /** Hero photo, shown in a 4:5 frame (cropped to fit). A larger original (800×1000) would look sharper. */
  profilePhoto: {
    src: "/images/profile.jpg",
    width: 400,
    height: 400,
    alt: {
      es: "Retrato de Stehven Obando Córdoba",
      en: "Portrait of Stehven Obando Córdoba",
    },
  } satisfies ImageAsset,
};

export type Site = typeof site;
