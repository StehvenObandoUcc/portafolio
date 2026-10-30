"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { describedBy, FormField } from "@/components/molecules/FormField";
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

export interface ContactFormCopy {
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
}

interface ContactFormProps {
  form: ContactFormCopy;
  /** Recipient for the mailto fallback while no email provider is set. */
  address: string;
}

type Status = "idle" | "sending" | "success" | "fallback" | "failure";

const EMPTY: ContactValues = { name: "", email: "", message: "" };
const FIELDS: ContactField[] = ["name", "email", "message"];

/** Client island: regex-validated contact form posting to /api/contact. */
export function ContactForm(props: ContactFormProps) {
  const { form } = props;
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
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
        window.location.href = `mailto:${props.address}?subject=${encodeURIComponent(form.mailSubject)}&body=${encodeURIComponent(body)}`;
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
  );
}
