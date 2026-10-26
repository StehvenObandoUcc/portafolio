import { TODO, type LearningItem } from "./types";

/**
 * "Now learning" log. Progress is text only, never a percentage.
 * TODO: write each one-line goal and the current progress.
 */
export const learningLog: LearningItem[] = [
  {
    id: "javascript",
    title: { es: "JavaScript a fondo", en: "JavaScript in depth" },
    source: "javascript.info",
    status: "inProgress",
    goal: { es: TODO, en: TODO },
    progress: { es: TODO, en: TODO },
  },
  {
    id: "english",
    title: { es: "Inglés hacia B2", en: "English toward B2" },
    status: "inProgress",
    goal: { es: TODO, en: TODO },
    progress: { es: "Nivel actual: A2", en: "Current level: A2" },
  },
  {
    id: "java",
    title: { es: "Java Foundations", en: "Java Foundations" },
    status: "next",
    goal: { es: TODO, en: TODO },
  },
  {
    id: "cloud-engineering",
    title: { es: "Cloud Engineering", en: "Cloud Engineering" },
    status: "next",
    goal: { es: TODO, en: TODO },
  },
];
