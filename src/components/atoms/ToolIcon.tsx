import { Icon, type IconName } from "./Icon";

/**
 * Brand marks from Simple Icons (CC0), drawn in the current text colour. The paths live once in
 * <ToolSprite /> (server-rendered); each icon here is a <use> of its symbol, so neither the HTML
 * nor the client bundle repeats them.
 */
export const BRAND_SLUGS: Record<string, string> = {
  "Next.js": "nextdotjs",
  React: "react",
  "Tailwind CSS": "tailwindcss",
  TypeScript: "typescript",
  NestJS: "nestjs",
  "Node.js": "nodedotjs",
  FastAPI: "fastapi",
  Python: "python",
  Flask: "flask",
  Java: "openjdk",
  Tauri: "tauri",
  Rust: "rust",
  Kotlin: "kotlin",
  "Jetpack Compose (Wear OS)": "jetpackcompose",
  "React Native": "react",
  Expo: "expo",
  Godot: "godotengine",
  PostgreSQL: "postgresql",
  Supabase: "supabase",
  SQLite: "sqlite",
  Docker: "docker",
  "Git & GitHub": "github",
  "Expo Router": "expo",
  "React Query": "reactquery",
  "React Hook Form": "reacthookform",
  Zod: "zod",
  Vite: "vite",
  Vitest: "vitest",
  GSAP: "gsap",
  HTML: "html5",
  CSS: "css",
  JavaScript: "javascript",
  Vercel: "vercel",
  GDScript: "godotengine",
};

/** Tools with no mark in Simple Icons use a line icon instead. */
const fallbacks: Record<string, IconName> = {
  "AWS (Lambda, S3, IAM)": "cloud",
  Heroku: "server",
  SQL: "database",
};

export function ToolIcon({ name, size = 16 }: { name: string; size?: number }) {
  const slug = BRAND_SLUGS[name];
  if (slug) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className="flex-none">
        <use href={`#si-${slug}`} />
      </svg>
    );
  }
  const fallback = fallbacks[name];
  return fallback ? <Icon name={fallback} size={size} /> : null;
}
