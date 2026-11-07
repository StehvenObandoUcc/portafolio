import {
  siDocker,
  siExpo,
  siFastapi,
  siFlask,
  siGithub,
  siGodotengine,
  siJetpackcompose,
  siKotlin,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siReact,
  siRust,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTauri,
  siTypescript,
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
