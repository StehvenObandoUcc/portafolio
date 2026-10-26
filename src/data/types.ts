/**
 * Content types for the portfolio. Every user-facing string lives in
 * /data and is typed here. Unknown values use the literal "TODO".
 */

export type Locale = "es" | "en";

/** A value written once per locale. */
export type Localized<T = string> = Record<Locale, T>;

/** Marker for content still to be provided. */
export const TODO = "TODO" as const;
export type Todo = typeof TODO;

export type Platform = "desktop" | "mobile" | "wearable" | "web" | "backend" | "cloud";

export type ProjectFilter = "all" | Platform;

/** Decides the label of the demo/download button. */
export type DemoKind = "demo" | "exe" | "apk";

/** Who built it. "TODO" renders no tag until it is confirmed. */
export type Collaboration = "solo" | "pair" | "team" | Todo;

export interface ImageAsset {
  /** Path under /public, e.g. "/images/profile.webp". */
  src: string;
  width: number;
  height: number;
  alt: Localized;
}

export interface Project {
  id: string;
  title: Localized;
  /** First entry is the platform shown on the card tag. Empty means TODO. */
  platforms: Platform[];
  description: Localized;
  /** Shown as tags, max 5 rendered. */
  stack: string[];
  role: Localized;
  collaboration: Collaboration;
  /** Course or context line, e.g. "Computer Architecture course". */
  context?: Localized;
  featured?: boolean;
  cover: ImageAsset;
  /** GitHub URL or "TODO". */
  githubUrl: string;
  demo: { kind: DemoKind; url: string };
}

export interface ExperienceItem {
  id: string;
  /** Links to a project when the item is derived from one. */
  projectId?: string;
  role: Localized;
  organization: Localized;
  /** Free text period, e.g. "2025 — 2026", or "TODO". */
  period: Localized;
  stack: string[];
  /** One or two outcomes. */
  outcomes: Localized<string[]>;
}

export type CourseStatus = "completed" | "inProgress";

export interface Course {
  id: string;
  title: Localized;
  issuer: string;
  status: CourseStatus;
  /** "YYYY-MM" when known, null when in progress or unknown. */
  date: string | null;
  /** Certificate URL, "TODO", or undefined when none exists. */
  certificateUrl?: string;
}

export interface Degree {
  title: Localized;
  institution: Localized;
  campus: Localized;
  currentSemester: number;
  totalSemesters: number;
}

export type SkillIcon = "layout" | "server" | "devices" | "database" | "cloud";

export interface SkillGroup {
  id: string;
  icon: SkillIcon;
  title: Localized;
  items: string[];
}

export type LearningStatus = "inProgress" | "next";

export interface LearningItem {
  id: string;
  title: Localized;
  /** Where it is being studied, e.g. "javascript.info". */
  source?: string;
  status: LearningStatus;
  goal: Localized;
  /** Text-only progress, e.g. "Unit 1 done". Never a percentage. */
  progress?: Localized;
}

/**
 * Testimonials: ONLY teachers, team leads or industry contacts.
 * Never family or classmates. Never invented.
 */
export interface Testimonial {
  id: string;
  quote: Localized;
  name: string;
  role: Localized;
  organization: string;
  /** LinkedIn URL, "TODO", or undefined. */
  linkedinUrl?: string;
  /** Optional photo; falls back to an initials circle. */
  photo?: ImageAsset;
}

export interface GalleryImage {
  id: string;
  image: ImageAsset;
  caption: Localized;
  /** Bento cell shape. */
  shape: "tall" | "wide" | "square";
}

export type SocialId = "github" | "linkedin" | "email" | "whatsapp";

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
  /** Visible handle, e.g. "@StehvenObandoUcc". */
  handle: string;
}

export interface Stat {
  value: string;
  label: string;
}
