import { Suspense } from "react";
import { IntroCurtain } from "@/components/atoms/IntroCurtain";
import { MotionRoot } from "@/components/atoms/MotionRoot";
import { PointerEffects } from "@/components/atoms/PointerEffects";
import { RevealObserver } from "@/components/atoms/RevealObserver";
import { KineticBand } from "@/components/molecules/KineticBand";
import { About, type AboutProps } from "@/components/organisms/About";
import { Contact, type ContactProps } from "@/components/organisms/Contact";
import { Experience, type ExperienceProps } from "@/components/organisms/Experience";
import { Footer, type FooterProps } from "@/components/organisms/Footer";
import { Hero, type HeroProps } from "@/components/organisms/Hero";
import { Navbar, type NavbarProps } from "@/components/organisms/Navbar";
import { NowLearning, type NowLearningProps } from "@/components/organisms/NowLearning";
import { Projects, type ProjectsProps } from "@/components/organisms/Projects";
import { Testimonials, type TestimonialsProps } from "@/components/organisms/Testimonials";

export interface PortfolioTemplateProps {
  skipLabel: string;
  /** Tool names for the oversized running bands between sections. */
  bandItems: string[];
  navbar: NavbarProps;
  hero: HeroProps;
  about: AboutProps;
  projects: ProjectsProps;
  testimonials: TestimonialsProps;
  experience: ExperienceProps;
  learning: NowLearningProps;
  contact: ContactProps;
  footer: FooterProps;
}

/** Single-page layout: every section in order, data in via props. */
export function PortfolioTemplate(props: PortfolioTemplateProps) {
  return (
    <MotionRoot>
      <IntroCurtain monogram={props.navbar.monogram} wordmark={props.navbar.wordmark} />
      <a
        href="#main"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-pill bg-accent-600 px-4 py-3 text-[14px] font-medium text-on-accent transition-transform duration-200 focus-visible:translate-y-0"
      >
        {props.skipLabel}
      </a>
      <Navbar {...props.navbar} />
      {/* Each section is its own Suspense boundary so React hydrates the page
          in small pieces (selective hydration) instead of one long task.
          Nothing suspends: the HTML renders exactly the same. */}
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero {...props.hero} />
        <Suspense>
          <KineticBand items={props.bandItems} />
        </Suspense>
        <Suspense>
          <About {...props.about} />
        </Suspense>
        <Suspense>
          <Projects {...props.projects} />
        </Suspense>
        <Suspense>
          <Testimonials {...props.testimonials} />
        </Suspense>
        <Suspense>
          <Experience {...props.experience} />
        </Suspense>
        <Suspense>
          <NowLearning {...props.learning} />
        </Suspense>
        <Suspense>
          <KineticBand items={props.bandItems} direction="right" />
        </Suspense>
        <Suspense>
          <Contact {...props.contact} />
        </Suspense>
      </main>
      <Suspense>
        <Footer {...props.footer} />
      </Suspense>
      <RevealObserver />
      <PointerEffects />
    </MotionRoot>
  );
}
