import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { es } from "@/data/i18n/es";
import { en } from "@/data/i18n/en";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: `404 — ${es.notFound.title}`,
};

/** 404 for any URL outside /es and /en. Bilingual, since the locale is unknown. */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={geist.variable}>
      <body>
        <main className="container-page grid min-h-dvh place-content-center gap-10 py-20">
          <p className="text-label text-accent-600">404</p>
          {[
            { dict: es, href: "/es", lang: "es" },
            { dict: en, href: "/en", lang: "en" },
          ].map(({ dict, href, lang }) => (
            <section key={lang} lang={lang} className="max-w-xl">
              <h1 className="text-h2 text-ink">{dict.notFound.title}</h1>
              <p className="mt-3 text-ink-soft">{dict.notFound.body}</p>
              <a href={href} className="btn btn-secondary btn-sm mt-5">
                <span>{dict.notFound.back}</span>
              </a>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}
