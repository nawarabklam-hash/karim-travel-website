"use server";

import { Resend } from "resend";
import { brandName } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  error?: "invalid" | "send";
};

/** Service chips on the form (ids are sent with the form). */
const SERVICE_LABELS: Record<string, string> = {
  visa: "Visa",
  hotel: "Hotel",
  tour: "Tour program",
  car: "Car",
  study: "Study",
};

/** Local number without the country code: 7–12 digits. */
const LOCAL_NUMBER = /^\d{7,12}$/;
const COUNTRY_CODE = /^\+\d{1,4}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form Server Action: validates on the server and emails the message
 * to the company via Resend. Secrets come from env vars only.
 */
export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // Honeypot: real users never fill this hidden field. Pretend success, send nothing.
  if (get("company")) return { status: "success" };

  const name = get("name");
  const countryCode = get("countryCode");
  const phone = get("phone").replace(/\s+/g, "");
  const email = get("email");
  const message = get("message");
  const service = get("service");

  const valid =
    name.length >= 2 &&
    name.length <= 100 &&
    COUNTRY_CODE.test(countryCode) &&
    LOCAL_NUMBER.test(phone) &&
    (email === "" || (EMAIL.test(email) && email.length <= 200)) &&
    message.length >= 2 &&
    message.length <= 3000 &&
    (service === "" || Object.hasOwn(SERVICE_LABELS, service));
  if (!valid) return { status: "error", error: "invalid" };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "Contact form: RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL not set",
    );
    return { status: "error", error: "send" };
  }

  const serviceLabel = service ? SERVICE_LABELS[service] : "General";
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email || undefined,
      subject: `[${brandName}] ${serviceLabel} — ${name}`,
      // Plain text only, so nothing the visitor types is rendered as HTML.
      text: [
        `Name: ${name}`,
        `WhatsApp: ${countryCode} ${phone}`,
        `Email: ${email || "-"}`,
        `Service: ${serviceLabel}`,
        "",
        message,
      ].join("\n"),
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("Contact form: send failed", err);
    return { status: "error", error: "send" };
  }

  return { status: "success" };
}
