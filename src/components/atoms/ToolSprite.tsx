import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  siNestjs,
  siNodedotjs,
  siFastapi,
  siPython,
  siFlask,
  siOpenjdk,
  siTauri,
  siRust,
  siKotlin,
  siJetpackcompose,
  siExpo,
  siGodotengine,
  siPostgresql,
  siSupabase,
  siSqlite,
  siDocker,
  siGithub,
  siReactquery,
  siReacthookform,
  siZod,
  siVite,
  siVitest,
  siGsap,
  siHtml5,
  siCss,
  siJavascript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";
import { BRAND_SLUGS } from "./ToolIcon";

const MARKS: SimpleIcon[] = [siNextdotjs, siReact, siTailwindcss, siTypescript, siNestjs, siNodedotjs, siFastapi, siPython, siFlask, siOpenjdk, siTauri, siRust, siKotlin, siJetpackcompose, siExpo, siGodotengine, siPostgresql, siSupabase, siSqlite, siDocker, siGithub, siReactquery, siReacthookform, siZod, siVite, siVitest, siGsap, siHtml5, siCss, siJavascript, siVercel];

/**
 * Server-only sprite of the brand marks <ToolIcon /> points at. Only the marks
 * of the tools the page names are written, each once.
 */
export function ToolSprite({ tools }: { tools: string[] }) {
  const used = new Set(tools.map((name) => BRAND_SLUGS[name]).filter(Boolean));
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      {MARKS.filter((mark) => used.has(mark.slug)).map((mark) => (
        <symbol key={mark.slug} id={`si-${mark.slug}`} viewBox="0 0 24 24">
          <path d={mark.path} />
        </symbol>
      ))}
    </svg>
  );
}
