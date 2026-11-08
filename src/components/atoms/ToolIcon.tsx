import {
  siCss,
  siDocker,
  siExpo,
  siFastapi,
  siFlask,
  siGithub,
  siGodotengine,
  siGsap,
  siHtml5,
  siJavascript,
  siJetpackcompose,
  siKotlin,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siReact,
  siReacthookform,
  siReactquery,
  siRust,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTauri,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
  siZod,
  type SimpleIcon,
} from "simple-icons";
import { Icon, type IconName } from "./Icon";

/** Brand marks from Simple Icons (CC0), drawn in the current text colour. */
const brands: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  React: siReact,
  "Tailwind CSS": siTailwindcss,
  TypeScript: siTypescript,
  NestJS: siNestjs,
  "Node.js": siNodedotjs,
  FastAPI: siFastapi,
  Flask: siFlask,
  Java: siOpenjdk,
  Tauri: siTauri,
  Rust: siRust,
  Kotlin: siKotlin,
  "Jetpack Compose (Wear OS)": siJetpackcompose,
  "React Native": siReact,
  Expo: siExpo,
  Godot: siGodotengine,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  SQLite: siSqlite,
  Docker: siDocker,
  "Git & GitHub": siGithub,
  "Expo Router": siExpo,
  "React Query": siReactquery,
  "React Hook Form": siReacthookform,
  Zod: siZod,
  Vite: siVite,
  Vitest: siVitest,
  GSAP: siGsap,
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  Vercel: siVercel,
  GDScript: siGodotengine,
};

/** Tools with no mark in Simple Icons use a line icon instead. */
const fallbacks: Record<string, IconName> = {
  "AWS (Lambda, S3, IAM)": "cloud",
  Heroku: "server",
  SQL: "database",
};

export function ToolIcon({ name, size = 16 }: { name: string; size?: number }) {
  const brand = brands[name];
  if (brand) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className="flex-none">
        <path d={brand.path} />
      </svg>
    );
  }
  const fallback = fallbacks[name];
  return fallback ? <Icon name={fallback} size={size} /> : null;
}
