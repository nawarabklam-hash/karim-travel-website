// Single source of truth for contact details and the office address.
// Every WhatsApp / email / address on the site reads from here. No Telegram, no Instagram.
// The company has one office only: Ajman, UAE (no office in Russia).
type Localized = { ar: string; en: string };

export const contact = {
  /** E.164, used for tel: links. */
  phone: "+79939611100",
  /** How the phone is shown (always render LTR). */
  phoneDisplay: "+7 993 961-11-00",
  /** International format, digits only (wa.me). */
  whatsapp: "79939611100",
  /** TODO: will change with the new domain. */
  email: "info@russia-4u.com",
  website: "https://www.russia-4u.com",
  office: {
    unit: "CWS-1V-226859",
    floor: { ar: "الطابق السادس والعشرون", en: "26th floor" },
    building: { ar: "برج امبرجم", en: "Amberjem Tower" },
    street: { ar: "شارع الشيخ خليفة", en: "Sheikh Khalifa Street" },
    city: { ar: "عجمان", en: "Ajman" },
    country: { ar: "الإمارات العربية المتحدة", en: "United Arab Emirates" },
  } satisfies Record<string, Localized | string>,
  /**
   * Legal line in the footer (from the old about page). Keep `false` until the
   * client confirms it may be shown on the new site.
   */
  showLegalInfo: false,
  legal: {
    name: "Alahmad Alkoussa Majd",
    inn: "312348594626",
  },
} as const;

/** Short address for the footer: building, city, country. */
export function shortAddress(locale: "ar" | "en") {
  const o = contact.office;
  return [o.building[locale], o.city[locale], o.country[locale]].join(
    locale === "ar" ? "، " : ", ",
  );
}
