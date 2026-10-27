import { contact } from "@/content/contact";

/** The only place WhatsApp links are built. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function phoneLink() {
  return `tel:${contact.phone}`;
}

export function emailLink() {
  return `mailto:${contact.email}`;
}
