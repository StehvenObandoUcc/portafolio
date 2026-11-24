import { CurrentYear } from "@/components/atoms/CurrentYear";
import { Icon } from "@/components/atoms/Icon";
import { Logo } from "@/components/atoms/Logo";
import { SocialLinks, type SocialLinkData } from "@/components/molecules/SocialLinks";

export interface FooterProps {
  monogram: string;
  wordmark: string;
  homeLabel: string;
  builtWith: string;
  fullName: string;
  location: string;
  /** Build-time year for the static HTML; the browser recomputes it. */
  buildYear: number;
  socials: SocialLinkData[];
  socialLabel: string;
  backToTop: string;
  comingSoonLabel: string;
}

export function Footer(props: FooterProps) {
  return (
    <footer className="overflow-clip border-t border-line-strong bg-paper-2">
      <div className="container-page flex flex-col gap-10 pt-12 md:pt-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <Logo monogram={props.monogram} wordmark={props.wordmark} label={props.homeLabel} href="#home" />
            <p className="text-[14px] text-ink-soft">{props.builtWith}</p>
          </div>
          <div className="flex items-center gap-3">
            <SocialLinks links={props.socials} label={props.socialLabel} comingSoonLabel={props.comingSoonLabel} />
            <a
              href="#home"
              className="btn btn-secondary btn-sm ml-1"
            >
              <Icon name="arrow-up" size={16} />
              <span>{props.backToTop}</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:justify-between">
          <p className="text-label text-ink-mute">
            © <CurrentYear fallback={props.buildYear} /> {props.fullName}
          </p>
          <p className="text-label text-ink-mute">{props.location}</p>
        </div>
      </div>
      {/* The name runs edge to edge and the bottom of the page cuts it. */}
      <div aria-hidden="true" className="footer-wordmark-cut">
        {/* suppressHydrationWarning: <RevealObserver /> may park it before this part hydrates. */}
        <p data-reveal="" data-motion="wordmark" className="footer-wordmark" suppressHydrationWarning>
          {props.wordmark}
        </p>
      </div>
    </footer>
  );
}
