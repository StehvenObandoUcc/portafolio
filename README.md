# Stehven Obando — Portfolio

Personal software-engineering portfolio of **Stehven Obando Córdoba**. Bilingual (`/es`, `/en`), single page, built with Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4 and `motion`. Deployed on Vercel.

## Setup

```bash
npm install
cp .env.example .env.local   # optional: set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000 → redirects to /es or /en
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (static `/es` and `/en`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run typecheck` | Generate route types and run `tsc --noEmit` |

**Environment:** `NEXT_PUBLIC_SITE_URL` is the production URL used by metadata, Open Graph, `sitemap.xml` and `robots.txt`. On Vercel it falls back to `VERCEL_PROJECT_PRODUCTION_URL`.

## Folder structure (Atomic Design)

```
src/
  app/
    layout.tsx               root (imports globals.css)
    [lang]/layout.tsx        <html lang>, fonts, metadata per locale
    [lang]/page.tsx          the ONLY file that reads /data; maps it into props
    [lang]/opengraph-image.tsx
    api/contact/route.ts     re-validates the form (email provider: TODO)
    global-not-found.tsx, sitemap.ts, robots.ts, icon.svg, globals.css (tokens)
  components/
    atoms/      Button, IconButton (+IconLink), Badge, Tag, Heading, Text, TextLink,
                Icon, Divider, Input, Textarea, Logo, Reveal, CurrentYear
    molecules/  NavLink, LanguageToggle, SectionHeader, StatItem, ProjectCard,
                TestimonialCard, TimelineItem, SkillGroup, SocialLinks, FormField,
                PhotoFrame, GalleryItem, CourseCard, LearningCard
    organisms/  Navbar, MobileMenu, Hero, About, Projects, Testimonials,
                Experience, NowLearning, Contact, Footer
    templates/  PortfolioTemplate
  data/         types.ts, site.ts, projects.ts, experience.ts, testimonials.ts,
                skills.ts, learning.ts, gallery.ts, i18n/es.ts, i18n/en.ts
  hooks/        useActiveSection, useReducedMotion, useScrolled
  lib/          i18n.ts, validators.ts, cn.ts
  proxy.ts      "/" → /es or /en (Accept-Language); unknown paths → 404
public/images/  placeholders (.svg) → replace with compressed .webp
```

Rules: atoms never import molecules, molecules never import organisms. Components only receive props; no copy is hardcoded in them.

## Editing content

Everything a visitor reads lives in `src/data`:

- **UI strings and section copy:** `src/data/i18n/es.ts` defines the shape. `en.ts` is typed against it, so a missing key fails the build. Headings use `{ before, emphasis, after }`, and `emphasis` is set in the italic serif. Keep it to one or two words.
- **Per-item text:** projects, experience, courses, skills, the learning log and the gallery use `{ es, en }` fields.
- **Unknown values:** use the literal `"TODO"`. A TODO link renders as a disabled "Próximamente / Coming soon" control, never `href="#"`.
- **Images:** drop a compressed `.webp` into `public/images/` (≤ 250 KB, hero photo ≤ 180 KB) and point the matching `src` in `/data` at it.
- **Testimonials:** only teachers, team leads or industry contacts. Never family or classmates, and never invented. Entries that are still TODO render as "pending" cards and log a warning during `npm run build`.

## CONTENT_TODO

| What to provide | File · key |
| --- | --- |
| Hero photo, 4:5, `.webp` ≤ 180 KB | `public/images/profile.webp`, then `src/data/site.ts` · `profilePhoto.src` |
| CV (public Google Drive link) | `src/data/site.ts` · `cvUrl` |
| LinkedIn URL and handle | `src/data/site.ts` · `linkedin`, `linkedinHandle` |
| WhatsApp (optional, off) | `src/data/site.ts` · `whatsapp.enabled`, `whatsapp.number` |
| Production URL | `.env` / Vercel · `NEXT_PUBLIC_SITE_URL` |
| 3 real testimonials (quote ES/EN, name, role, organization, LinkedIn, optional photo) | `src/data/testimonials.ts` · `testimonial-1..3` |
| About-me paragraph (2–3 sentences, hobbies/sports/art/interests) | `src/data/i18n/es.ts` + `en.ts` · `about.paragraph` |
| About gallery photos (3–5) + captions + alt text | `src/data/gallery.ts` + `public/images/gallery-*` |
| Pulso: role, solo/team, `.exe` download URL, screenshot | `src/data/projects.ts` · `pulso` (`role`, `collaboration`, `demo.url`, `cover`) |
| Smartwatch app: GitHub URL, `.apk` URL, screenshot | `src/data/projects.ts` · `smartwatch` |
| GeoFen API: role, solo/team, GitHub, demo, screenshot | `src/data/projects.ts` · `geofen` |
| Serverless image processing: role, solo/team, GitHub, demo, image | `src/data/projects.ts` · `serverless-images` |
| Load sizing: role, GitHub, demo (if any), image | `src/data/projects.ts` · `load-sizing` |
| Mobile app: name, description, stack, role, team, GitHub, `.apk`, screenshot | `src/data/projects.ts` · `mobile-app` |
| Video game: name, platform, description, stack, role, team, GitHub, download, screenshot | `src/data/projects.ts` · `video-game` |
| Roles and periods for the technical timeline | `src/data/experience.ts` · `technicalExperience[*].role`, `period` |
| Certificate links (Commit Academy, BIG school) | `src/data/experience.ts` · `courses[*].certificateUrl` |
| Learning log: one-line goals, JavaScript progress | `src/data/learning.ts` · `goal`, `progress` |
| Email provider for the contact form | `src/app/api/contact/route.ts` (returns 503 → mailto fallback until then) |

## Quality notes

- `--ink-mute` is `#5C6580` rather than the brief's `#7D869F`, which only reaches 3.3:1 on paper. The new value passes AA on both backgrounds.
- The hero entrance is CSS-only and every element rests visible. Scroll reveals hide only content still below the fold after hydration, so with JS off nothing stays hidden. `prefers-reduced-motion` reduces everything to short opacity fades.
- The footer year is computed in the browser with `new Date().getFullYear()`. The static HTML carries the build year as a fallback, because Cache Components forbids reading the clock during prerender.
