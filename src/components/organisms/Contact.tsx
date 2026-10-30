import type { HeadingParts } from "@/components/atoms/Heading";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { MaskWords } from "@/components/atoms/MaskWords";
import { Reveal } from "@/components/atoms/Reveal";
import { TextLink } from "@/components/atoms/TextLink";
import { ContactForm, type ContactFormCopy } from "@/components/molecules/ContactForm";
import { CopyEmail } from "@/components/molecules/CopyEmail";
import { SectionHeader } from "@/components/molecules/SectionHeader";

export interface ContactChannel {
  id: string;
  icon: IconName;
  label: string;
  value: string;
  href: string;
  external: boolean;
}

export interface ContactProps {
  index: string;
  title: HeadingParts;
  heading: HeadingParts;
  directTitle: string;
  email: { label: string; address: string; copyLabel: string; copiedLabel: string; copyFailedLabel: string; copyAria: string };
  channels: ContactChannel[];
  form: ContactFormCopy;
  comingSoonLabel: string;
  newTabLabel: string;
}

/** Server-rendered section; the copy button and the form are client islands. */
export function Contact(props: ContactProps) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-section-y">
      <div className="container-page">
        <SectionHeader id="contact-title" index={props.index} title={props.title} />

        <Reveal motion="pop">
          <p className="text-display mb-12 max-w-[16ch] text-ink md:mb-16">
            <MaskWords parts={props.heading} />
          </p>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
          <Reveal className="md:col-span-5">
            <h3 className="text-h3 mb-6 text-ink">{props.directTitle}</h3>
            <ul className="divide-y divide-line border-y border-line">
              <li className="flex flex-wrap items-center gap-x-4 gap-y-2 py-5">
                <span className="icon-draw grid size-10 flex-none place-items-center rounded-sm bg-accent-50 text-accent-600">
                  <Icon name="mail" size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-label block text-ink-mute">{props.email.label}</span>
                  <a
                    href={`mailto:${props.email.address}`}
                    className="inline-block py-2.5 text-[16px] font-medium break-words text-ink underline decoration-transparent underline-offset-4 transition-colors hover:text-accent-600 hover:decoration-accent-300"
                  >
                    {props.email.address.split("@")[0]}
                    <wbr />@{props.email.address.split("@")[1]}
                  </a>
                </span>
                <CopyEmail
                  address={props.email.address}
                  copyLabel={props.email.copyLabel}
                  copiedLabel={props.email.copiedLabel}
                  copyFailedLabel={props.email.copyFailedLabel}
                  copyAria={props.email.copyAria}
                />
              </li>
              {props.channels.map((channel) => (
                <li key={channel.id} className="flex items-center gap-4 py-5">
                  <span className="icon-draw grid size-10 flex-none place-items-center rounded-sm bg-accent-50 text-accent-600">
                    <Icon name={channel.icon} size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-label block text-ink-mute">{channel.label}</span>
                    <TextLink
                      href={channel.href}
                      external={channel.external}
                      comingSoonLabel={props.comingSoonLabel}
                      newTabLabel={props.newTabLabel}
                      className="min-h-11 text-[16px] font-medium"
                    >
                      {channel.value}
                    </TextLink>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-7" index={1}>
            <ContactForm form={props.form} address={props.email.address} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
