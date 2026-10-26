import { MotionConfig } from "motion/react";
import { RevealObserver } from "@/components/atoms/RevealObserver";
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
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-pill bg-accent-600 px-4 py-2.5 text-[14px] font-medium text-surface transition-transform duration-200 focus-visible:translate-y-0"
      >
        {props.skipLabel}
      </a>
      <Navbar {...props.navbar} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero {...props.hero} />
        <About {...props.about} />
        <Projects {...props.projects} />
        <Testimonials {...props.testimonials} />
        <Experience {...props.experience} />
        <NowLearning {...props.learning} />
        <Contact {...props.contact} />
      </main>
      <Footer {...props.footer} />
      <RevealObserver />
    </MotionConfig>
  );
}
