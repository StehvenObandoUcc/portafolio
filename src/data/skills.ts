import type { CoreTech, SkillGroup } from "./types";

/**
 * The ten tools shown on the logo wall and the running band. Each one stands
 * for the related names in `includes`, which is also how a project's stack
 * is matched to it.
 */
export const coreStack: CoreTech[] = [
  { id: "typescript", name: "TypeScript", icon: "TypeScript", includes: ["TypeScript"] },
  { id: "react", name: "React · Next.js", icon: "React", includes: ["React", "Next.js", "Tailwind CSS"], note: { es: "con Tailwind CSS", en: "with Tailwind CSS" } },
  { id: "nestjs", name: "NestJS", icon: "NestJS", includes: ["NestJS", "Node.js"], note: { es: "Node.js", en: "Node.js" } },
  { id: "python", name: "Python", icon: "Python", includes: ["FastAPI", "Flask"], note: { es: "FastAPI · Flask", en: "FastAPI · Flask" } },
  { id: "tauri", name: "Tauri", icon: "Tauri", includes: ["Tauri", "Rust"], note: { es: "con Rust", en: "with Rust" } },
  { id: "kotlin", name: "Kotlin", icon: "Kotlin", includes: ["Kotlin", "Jetpack Compose (Wear OS)"], note: { es: "Wear OS · Compose", en: "Wear OS · Compose" } },
  { id: "react-native", name: "React Native", icon: "React Native", includes: ["React Native", "Expo", "Expo Router"], note: { es: "con Expo", en: "with Expo" } },
  { id: "postgresql", name: "PostgreSQL", icon: "PostgreSQL", includes: ["PostgreSQL", "Supabase", "SQLite", "SQL"], note: { es: "Supabase · SQLite", en: "Supabase · SQLite" } },
  { id: "aws", name: "AWS", icon: "AWS (Lambda, S3, IAM)", includes: ["AWS (Lambda, S3, IAM)"], note: { es: "Lambda · S3 · IAM", en: "Lambda · S3 · IAM" } },
  { id: "docker", name: "Docker", icon: "Docker", includes: ["Docker", "Heroku"], note: { es: "despliegue en Heroku", en: "deploys to Heroku" } },
];

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
    items: ["NestJS", "Node.js", "FastAPI", "Flask", "Java"],
  },
  {
    id: "desktop-mobile",
    icon: "devices",
    title: { es: "Escritorio y móvil", en: "Desktop & mobile" },
    items: ["Tauri", "Rust", "Kotlin", "Jetpack Compose (Wear OS)", "React Native", "Expo", "Godot"],
  },
  {
    id: "data",
    icon: "database",
    title: { es: "Datos", en: "Data" },
    items: ["PostgreSQL", "Supabase", "SQLite", "SQL"],
  },
  {
    id: "cloud",
    icon: "cloud",
    title: { es: "Cloud y DevOps", en: "Cloud & DevOps" },
    items: ["AWS (Lambda, S3, IAM)", "Heroku", "Docker", "Git & GitHub"],
  },
];
