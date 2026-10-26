import type { SkillGroup } from "./types";

/**
 * Frameworks, libraries, databases, cloud and tools only.
 * No HTML, CSS or JavaScript, and never levels or percentages.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    icon: "layout",
    title: { es: "Frontend", en: "Frontend" },
    items: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "backend",
    icon: "server",
    title: { es: "Backend", en: "Backend" },
    items: ["NestJS", "Node.js", "Flask", "Java"],
  },
  {
    id: "desktop-mobile",
    icon: "devices",
    title: { es: "Escritorio y móvil", en: "Desktop & mobile" },
    items: ["Tauri", "Rust", "Kotlin", "Jetpack Compose (Wear OS)"],
  },
  {
    id: "data",
    icon: "database",
    title: { es: "Datos", en: "Data" },
    items: ["SQLite", "SQL"],
  },
  {
    id: "cloud",
    icon: "cloud",
    title: { es: "Cloud y DevOps", en: "Cloud & DevOps" },
    items: ["AWS (Lambda, S3, IAM)", "Heroku", "Docker", "Git & GitHub"],
  },
];
