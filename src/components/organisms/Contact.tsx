"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/atoms/Button";
import type { HeadingParts } from "@/components/atoms/Heading";
import { MaskWords } from "@/components/atoms/MaskWords";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { Reveal } from "@/components/atoms/Reveal";
import { Textarea } from "@/components/atoms/Textarea";
import { TextLink } from "@/components/atoms/TextLink";
import { describedBy, FormField } from "@/components/molecules/FormField";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { cn } from "@/lib/cn";
import {
  MESSAGE_MAX,
  MESSAGE_MIN,
  validateContact,
  validateField,
  type ContactErrorCode,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/validators";

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
  form: {
    title: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    fallback: string;
    failure: string;
    /** Already formatted with {max}; {count} is replaced live. */
    charCount: string;
    mailSubject: string;
    /** Error messages with {min}/{max} already filled in. */
    errors: Record<ContactErrorCode | "summary", string>;
  };
  comingSoonLabel: string;
  newTabLabel: string;
}

type Status = "idle" | "sending" | "success" | "fallback" | "failure";

const EMPTY: ContactValues = { name: "", email: "", message: "" };
const FIELDS: ContactField[] = ["name", "email", "message"];

export function Contact(props: ContactProps) {
  const { form } = props;
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(props.email.address);
      setToast(props.email.copiedLabel);
    } catch {
      setToast(props.email.copyFailedLabel);
    }
  };

  const update = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Once a field shows an error, re-check it as the visitor types.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
  };

  const blur = (field: ContactField) => {
    if (!values[field]) return;
    setErrors((current) => ({ ...current, [field]: validateField(field, values[field]) }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = FIELDS.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus("success");
        setValues(EMPTY);
        return;
      }
      if (response.status === 503) {
        // No email provider yet: hand the message to the visitor's mail app.
        const body = `${payload.message}\n\n— ${payload.name} <${payload.email}>`;
        window.location.href = `mailto:${props.email.address}?subject=${encodeURIComponent(form.mailSubject)}&body=${encodeURIComponent(body)}`;
        setStatus("fallback");
        return;
      }
      setStatus("failure");
    } catch {
      setStatus("failure");
    }
  };

  const messageLength = values.message.trim().length;
  const statusText =
    status === "success" ? form.success : status === "fallback" ? form.fallback : status === "failure" ? form.failure : "";

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
                    className="text-[16px] font-medium break-words text-ink underline decoration-transparent underline-offset-4 transition-colors hover:text-accent-600 hover:decoration-accent-300"
                  >
                    {props.email.address.split("@")[0]}
                    <wbr />@{props.email.address.split("@")[1]}
                  </a>
                </span>
                <span className="relative">
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={props.email.copyAria}
                    className="btn btn-secondary btn-sm"
                  >
                    <span key={toast === props.email.copiedLabel ? "copied" : "idle"} className={cn(toast === props.email.copiedLabel && "icon-swap")}>
                      <Icon name={toast === props.email.copiedLabel ? "check" : "copy"} size={16} />
                    </span>
                    <span>{props.email.copyLabel}</span>
                  </button>
                  <span role="status" aria-live="polite" className="pointer-events-none absolute right-0 bottom-[calc(100%+8px)]">
                    <AnimatePresence>
                      {toast && (
                        <motion.span
                          key={toast}
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2 }}
                          className="text-label inline-flex items-center gap-1.5 rounded-pill bg-ink px-3 py-1.5 whitespace-nowrap text-surface shadow-card"
                        >
                          <span className="size-1.5 rounded-full bg-accent-300" aria-hidden="true" />
                          {toast}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </span>
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
                      className="text-[16px] font-medium"
                    >
                      {channel.value}
                    </TextLink>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-7" index={1}>
            <form noValidate onSubmit={submit} className="card p-6 sm:p-8" aria-describedby="contact-form-status">
              <h3 className="text-h3 mb-6 text-ink">{form.title}</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="contact-name" label={form.name} error={errors.name && form.errors[errors.name]}>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder={form.namePlaceholder}
                    value={values.name}
                    maxLength={60}
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy("contact-name", Boolean(errors.name), false)}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => blur("name")}
                  />
                </FormField>
                <FormField id="contact-email" label={form.email} error={errors.email && form.errors[errors.email]}>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={form.emailPlaceholder}
                    value={values.email}
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy("contact-email", Boolean(errors.email), false)}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => blur("email")}
                  />
                </FormField>
                <FormField
                  id="contact-message"
                  label={form.message}
                  hint={form.charCount.replace("{count}", String(messageLength))}
                  error={errors.message && form.errors[errors.message]}
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder={form.messagePlaceholder}
                    value={values.message}
                    minLength={MESSAGE_MIN}
                    maxLength={MESSAGE_MAX}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={describedBy("contact-message", Boolean(errors.message), true)}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => blur("message")}
                  />
                </FormField>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p
                  id="contact-form-status"
                  role="status"
                  aria-live="polite"
                  className={cn(
                    "min-h-6 text-[14px]",
                    statusText && "message-enter",
                    status === "failure" ? "text-danger" : status === "idle" || status === "sending" ? "text-ink-soft" : "text-success",
                  )}
                >
                  {statusText}
                </p>
                <Button type="submit" icon="arrow-right" disabled={status === "sending"} className="sm:flex-none">
                  {status === "sending" ? form.sending : form.submit}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
