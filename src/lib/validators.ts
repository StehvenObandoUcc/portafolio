/**
 * Contact form validation. Shared by the client form and the
 * /api/contact route handler so both enforce the same rules.
 */
export const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]{2,60}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 1000;
/** 20–1000 characters of anything, newlines included. */
export const MESSAGE_PATTERN = /^[\s\S]{20,1000}$/;

export type ContactField = "name" | "email" | "message";

export type ContactErrorCode =
  | "nameRequired"
  | "nameInvalid"
  | "emailRequired"
  | "emailInvalid"
  | "messageRequired"
  | "messageTooShort"
  | "messageTooLong";

export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export function validateField(field: ContactField, raw: string): ContactErrorCode | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "nameRequired";
      return NAME_PATTERN.test(value) ? undefined : "nameInvalid";
    case "email":
      if (!value) return "emailRequired";
      return EMAIL_PATTERN.test(value) ? undefined : "emailInvalid";
    case "message":
      if (!value) return "messageRequired";
      if (MESSAGE_PATTERN.test(value)) return undefined;
      return value.length < MESSAGE_MIN ? "messageTooShort" : "messageTooLong";
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(values) as ContactField[]).forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

export function isTodo(value: string | undefined | null): boolean {
  return !value || value.trim() === "TODO";
}
