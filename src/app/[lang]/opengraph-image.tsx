import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Stehven Obando — Software Engineer / Ingeniero de Software";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(hasLocale(lang) ? lang : "es");

  const grid =
    "linear-gradient(to right, rgba(20,33,61,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,33,61,.08) 1px, transparent 1px)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F5F3EE",
          backgroundImage: grid,
          backgroundSize: "48px 48px",
          color: "#14213D",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#2448D8",
              color: "#FBFAF7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            {site.monogram}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#4A5578" }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#FF9A57" }} />
            {dict.hero.badge}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{site.fullName}</div>
          <div style={{ fontSize: 40, color: "#2448D8", letterSpacing: "-0.02em" }}>{dict.meta.ogSubtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#5C6580" }}>
          <span>{site.location}</span>
          <span>{site.githubHandle}</span>
        </div>
      </div>
    ),
    size,
  );
}
