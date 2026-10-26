import { NextResponse } from "next/server";
import { validateContact, type ContactValues } from "@/lib/validators";

/**
 * Contact form endpoint. Re-validates with the same regexes as the
 * client. TODO: connect an email provider (e.g. Resend) and send the
 * message; until then it answers 503 so the form falls back to mailto.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const input = (body ?? {}) as Partial<Record<keyof ContactValues, unknown>>;
  const values: ContactValues = {
    name: typeof input.name === "string" ? input.name.trim() : "",
    email: typeof input.email === "string" ? input.email.trim() : "",
    message: typeof input.message === "string" ? input.message.trim() : "",
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: send `values` with the chosen email provider and return { ok: true }.
  return NextResponse.json({ ok: false, error: "provider_not_configured" }, { status: 503 });
}
