import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import type { IconName } from "@/components/atoms/Icon";
import type { ProjectCardData } from "@/components/molecules/ProjectCard";
import type { TestimonialCardData } from "@/components/molecules/TestimonialCard";
import { PortfolioTemplate, type PortfolioTemplateProps } from "@/components/templates/PortfolioTemplate";
import { courses, degree, technicalExperience } from "@/data/experience";
import { gallery } from "@/data/gallery";
import type { Dictionary } from "@/data/i18n/es";
import { learningLog } from "@/data/learning";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { testimonials } from "@/data/testimonials";
import type { DemoKind, Locale, Platform, ProjectFilter, Testimonial } from "@/data/types";
import { format, getDictionary, hasLocale } from "@/lib/i18n";
import { isTodo, MESSAGE_MAX, MESSAGE_MIN } from "@/lib/validators";

/** Year at build time for the static HTML; the footer recomputes it in the browser. */
async function getBuildYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/**
 * Both locales are prerendered (generateStaticParams in the layout). The only
 * navigation into this route is the ES/EN switch, which may block on `params`.
 */
export const instant = false;

const SECTION_IDS =["home", "about", "projects", "testimonials", "experience", "learning", "contact"] as const;
const FILTERS: ProjectFilter[] = ["all", "desktop", "mobile", "wearable", "web", "backend", "cloud"];

const demoIcon: Record<DemoKind, IconName> = { demo: "play", exe: "download", apk: "download" };

function isPendingTestimonial(t: Testimonial, lang: Locale) {
  return isTodo(t.quote[lang]) || isTodo(t.name);
}

function formatMonth(value: string | null, lang: Locale): string | undefined {
  if (!value) return undefined;
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

function buildProps(lang: Locale, dict: Dictionary, buildYear: number): PortfolioTemplateProps {
  const comingSoon = dict.a11y.comingSoon;
  const newTab = dict.a11y.opensInNewTab;
  const platformLabel = (platform: Platform | undefined) =>
    platform ? dict.projects.filters[platform] : dict.projects.platformPending;

  const projectCards: (ProjectCardData & { platforms: Platform[] })[] = projects.map((project) => ({
    id: project.id,
    title: project.title[lang],
    platforms: project.platforms,
    platformLabel: platformLabel(project.platforms[0]),
    description: project.description[lang],
    stack: project.stack,
    roleLabel: dict.projects.roleLabel,
    role: project.role[lang],
    collaborationLabel:
      project.collaboration === "team"
        ? dict.projects.team
        : project.collaboration === "pair"
          ? dict.projects.pair
          : undefined,
    context: project.context?.[lang],
    featured: Boolean(project.featured),
    featuredLabel: dict.projects.featured,
    cover: { ...project.cover, alt: project.cover.alt[lang] },
    codeLabel: dict.projects.code,
    githubUrl: project.githubUrl,
    demoLabel:
      project.demo.kind === "exe"
        ? dict.projects.downloadExe
        : project.demo.kind === "apk"
          ? dict.projects.downloadApk
          : dict.projects.demo,
    demoIcon: demoIcon[project.demo.kind],
    demoUrl: project.demo.url,
  }));

  const testimonialCards: TestimonialCardData[] = testimonials.map((t) =>
    isPendingTestimonial(t, lang)
      ? { pending: true, id: t.id, title: dict.testimonials.pendingTitle, body: dict.testimonials.pendingBody, author: dict.testimonials.pendingAuthor }
      : {
          pending: false,
          id: t.id,
          quote: t.quote[lang],
          name: t.name,
          role: t.role[lang],
          organization: t.organization,
          linkedinUrl: t.linkedinUrl,
          photo: t.photo ? { src: t.photo.src, alt: t.photo.alt[lang] } : undefined,
        },
  );

  const socials = [
    { id: "github", icon: "github" as const, label: dict.contact.githubLabel, href: site.github, external: true },
    { id: "linkedin", icon: "linkedin" as const, label: dict.contact.linkedinLabel, href: site.linkedin, external: true },
    { id: "email", icon: "mail" as const, label: dict.contact.emailLabel, href: `mailto:${site.email}`, external: false },
  ];

  const errors = dict.contact.form.errors;

  return {
    skipLabel: dict.a11y.skipToContent,
    bandItems: skillGroups.flatMap((group) => group.items),
    navbar: {
      locale: lang,
      items: SECTION_IDS.map((id) => ({ id, label: dict.nav[id] })),
      monogram: site.monogram,
      wordmark: site.shortName,
      homeLabel: dict.a11y.homeLink,
      cvLabel: dict.nav.cv,
      cvUrl: site.cvUrl,
      languages: [
        { locale: "es", label: "ES", name: "Español" },
        { locale: "en", label: "EN", name: "English" },
      ],
      labels: {
        mainNav: dict.a11y.mainNav,
        languageSwitch: dict.a11y.languageSwitch,
        openMenu: dict.a11y.openMenu,
        closeMenu: dict.a11y.closeMenu,
        comingSoon,
        opensInNewTab: newTab,
      },
    },
    hero: {
      badge: dict.hero.badge,
      titleLine1: dict.hero.titleLine1,
      titleLine2: dict.hero.titleLine2,
      lede: dict.hero.lede,
      primaryCta: { label: dict.hero.primaryCta, href: "#projects" },
      secondaryCta: { label: dict.hero.secondaryCta, href: site.cvUrl },
      photo: { ...site.profilePhoto, alt: site.profilePhoto.alt[lang] },
      photoTag: site.locationShort,
      stats: dict.hero.stats,
      comingSoonLabel: comingSoon,
      newTabLabel: newTab,
    },
    about: {
      index: dict.about.index,
      title: dict.about.title,
      paragraph: dict.about.paragraph,
      gallery: gallery.map((item) => ({
        id: item.id,
        src: item.image.src,
        alt: item.image.alt[lang],
        width: item.image.width,
        height: item.image.height,
        caption: item.caption[lang],
        shape: item.shape,
      })),
    },
    projects: {
      index: dict.projects.index,
      title: dict.projects.title,
      subtitle: dict.projects.subtitle,
      filters: FILTERS.map((id) => ({ id, label: dict.projects.filters[id] })),
      filtersLabel: dict.a11y.projectFilters,
      emptyLabel: dict.projects.empty,
      projects: projectCards,
      comingSoonLabel: comingSoon,
      newTabLabel: newTab,
    },
    testimonials: {
      index: dict.testimonials.index,
      title: dict.testimonials.title,
      subtitle: dict.testimonials.subtitle,
      testimonials: testimonialCards,
      linkedinLabel: dict.testimonials.linkedin,
      comingSoonLabel: comingSoon,
    },
    experience: {
      index: dict.experience.index,
      title: dict.experience.title,
      tabsLabel: dict.a11y.experienceTabs,
      tabs: dict.experience.tabs,
      stackLabel: dict.experience.stackLabel,
      timeline: technicalExperience.map((item) => ({
        id: item.id,
        period: isTodo(item.period[lang]) ? dict.experience.periodPending : item.period[lang],
        role: item.role[lang],
        organization: item.organization[lang],
        outcomes: item.outcomes[lang],
        stack: item.stack,
      })),
      degree: {
        title: degree.title[lang],
        institution: degree.institution[lang],
        campus: degree.campus[lang],
        status: format(dict.experience.degreeStatus, {
          current: degree.currentSemester,
          total: degree.totalSemesters,
        }),
      },
      coursesTitle: dict.experience.coursesTitle,
      courses: courses.map((course) => ({
        id: course.id,
        title: course.title[lang],
        issuer: course.issuer,
        completed: course.status === "completed",
        statusLabel: course.status === "completed" ? dict.experience.courseCompleted : dict.experience.courseInProgress,
        date: formatMonth(course.date, lang),
        certificateUrl: course.certificateUrl,
      })),
      certificateLabel: dict.experience.certificate,
      english: { title: dict.experience.englishTitle, level: dict.experience.englishLevel },
      skillsTitle: dict.experience.skillsTitle,
      skills: skillGroups.map((group) => ({
        id: group.id,
        icon: group.icon,
        title: group.title[lang],
        items: group.items,
      })),
      comingSoonLabel: comingSoon,
      newTabLabel: newTab,
    },
    learning: {
      index: dict.learning.index,
      title: dict.learning.title,
      subtitle: dict.learning.subtitle,
      goalLabel: dict.learning.goalLabel,
      progressLabel: dict.learning.progressLabel,
      items: learningLog.map((item) => ({
        id: item.id,
        title: item.title[lang],
        source: item.source,
        inProgress: item.status === "inProgress",
        statusLabel: item.status === "inProgress" ? dict.learning.statusInProgress : dict.learning.statusNext,
        goal: item.goal[lang],
        progress: item.progress?.[lang],
      })),
    },
    contact: {
      index: dict.contact.index,
      title: dict.contact.title,
      heading: dict.contact.heading,
      directTitle: dict.contact.directTitle,
      email: {
        label: dict.contact.emailLabel,
        address: site.email,
        copyLabel: dict.contact.copy,
        copiedLabel: dict.contact.copied,
        copyFailedLabel: dict.contact.copyFailed,
        copyAria: dict.a11y.copyEmail,
      },
      channels: [
        {
          id: "linkedin",
          icon: "linkedin",
          label: dict.contact.linkedinLabel,
          value: isTodo(site.linkedinHandle) ? dict.contact.linkedinLabel : site.linkedinHandle,
          href: site.linkedin,
          external: true,
        },
        {
          id: "github",
          icon: "github",
          label: dict.contact.githubLabel,
          value: site.githubHandle,
          href: site.github,
          external: true,
        },
        ...(site.whatsapp.enabled
          ? [
              {
                id: "whatsapp",
                icon: "whatsapp" as const,
                label: dict.contact.whatsappLabel,
                value: `+${site.whatsapp.number}`,
                href: isTodo(site.whatsapp.number) ? "TODO" : `https://wa.me/${site.whatsapp.number}`,
                external: true,
              },
            ]
          : []),
      ],
      form: {
        ...dict.contact.form,
        charCount: dict.contact.form.charCount.replace("{max}", String(MESSAGE_MAX)),
        errors: {
          ...errors,
          messageTooShort: format(errors.messageTooShort, { min: MESSAGE_MIN }),
          messageTooLong: format(errors.messageTooLong, { max: MESSAGE_MAX }),
        },
      },
      comingSoonLabel: comingSoon,
      newTabLabel: newTab,
    },
    footer: {
      monogram: site.monogram,
      wordmark: site.shortName,
      homeLabel: dict.a11y.homeLink,
      builtWith: dict.footer.builtWith,
      fullName: site.fullName,
      location: site.location,
      buildYear,
      socials,
      socialLabel: dict.a11y.socialLinks,
      backToTop: dict.footer.backToTop,
      comingSoonLabel: comingSoon,
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, buildYear] = await Promise.all([getDictionary(lang), getBuildYear()]);

  const pending = testimonials.filter((t) => isPendingTestimonial(t, lang)).length;
  if (pending > 0) {
    console.warn(
      `[portfolio] ${pending} of ${testimonials.length} testimonials are still "TODO" (${lang}). Add real ones in src/data/testimonials.ts.`,
    );
  }

  return <PortfolioTemplate {...buildProps(lang, dict, buildYear)} />;
}
