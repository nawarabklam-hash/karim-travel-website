import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Mail } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { breadcrumbJsonLd, ogImage, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import MotionProvider from "@/components/motion/MotionProvider";
import { routing, type AppLocale } from "@/i18n/routing";
import { emailLink } from "@/lib/links";
import { contact, shortAddress } from "@/content/contact";
import { siteGutter } from "@/components/layout/container";
import ContactForm from "@/components/sections/contact/ContactForm";
import CopyAddress from "@/components/sections/contact/CopyAddress";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import WordReveal from "@/components/motion/WordReveal";
import { heroFollowDelay } from "@/lib/motion/presets";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("contact.title"),
    description: t("contact.description"),
    image: ogImage(locale, "contact"),
  });
}

const SERVICE_IDS = ["visa", "hotel", "tour", "car", "study"] as const;

/** Gulf skyline at sunset (Dubai, Unsplash License) — decorative, covers the office card. */
const OFFICE_PHOTO = "/images/contact/gulf-skyline.webp";

/** Shared look of every card on this page (white, 1px border). */
const card = "rounded-2xl border border-line bg-white";
/** A clickable channel card: lifts on hover, visible keyboard focus. */
const channel =
  "flex min-h-24 items-center gap-4 rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none";

/**
 * Contact — clean white, no images. A centered header, two channel cards
 * (WhatsApp, email), then the office card and the form (form first on mobile).
 */
export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const tm = await getTranslations("meta");
  const o = contact.office;
  const sep = locale === "ar" ? "، " : ", ";

  const fullAddress = [
    `${o.building[locale]} — ${o.floor[locale]}`,
    `${t("officeUnit")} ${o.unit}`,
    `${o.street[locale]}${sep}${o.city[locale]}`,
    o.country[locale],
  ].join(sep);

  return (
    <MotionProvider>
      <JsonLd
        data={breadcrumbJsonLd(locale, tm("breadcrumbHome"), [
          { name: tm("contact.title"), path: "/contact" },
        ])}
      />

      {/* overflow-x-clip: the cards slide in from the sides without a sideways scroll */}
      <div
        className={`${siteGutter} overflow-x-clip pt-32 pb-24 font-plex sm:pt-40`}
      >
        <div className="mx-auto w-full max-w-5xl px-1 sm:px-4">
          {/* 1) Header: no image, no colored block */}
          <header className="text-center">
            <Reveal
              variant="liftIn"
              trigger="mount"
              delay={heroFollowDelay}
              className="flex justify-center"
            >
              <p className="flex items-center gap-3 text-sm font-semibold text-red">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-8 rounded-full bg-red"
                />
                {t("eyebrow")}
              </p>
            </Reveal>
            <WordReveal
              as="h1"
              text={t("title")}
              className="mt-4 font-calligraphy text-4xl leading-[1.5] font-bold text-navy sm:text-5xl"
            />
            <Reveal
              as="p"
              variant="liftIn"
              trigger="mount"
              delay={heroFollowDelay}
              className="mx-auto mt-3 max-w-xl text-base text-navy/70 sm:text-lg"
            >
              {t("subtitle")}
            </Reveal>
          </header>

          {/* 2) Channel cards: the whole card is the link */}
          <Stagger
            as="ul"
            stagger={0.1}
            className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <StaggerItem as="li" variant="popIn">
              <WhatsAppLink
                message={t("whatsappMessage")}
                location="contact_card"
                className={`${channel} bg-navy text-white`}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <WhatsAppIcon className="size-6 text-whatsapp" />
                </span>
                <span>
                  <span className="block text-lg font-semibold">
                    {t("channels.whatsapp.title")}
                  </span>
                  <span className="block text-sm text-white/80">
                    {t("channels.whatsapp.text")}
                  </span>
                </span>
              </WhatsAppLink>
            </StaggerItem>
            <StaggerItem as="li" variant="popIn">
              <a
                href={emailLink()}
                className={`${channel} border border-line bg-white text-navy`}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-snow">
                  <Mail aria-hidden="true" className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-semibold">
                    {t("channels.email.title")}
                  </span>
                  <span
                    dir="ltr"
                    className="block text-start text-sm break-all"
                  >
                    {contact.email}
                  </span>
                </span>
              </a>
            </StaggerItem>
          </Stagger>

          {/* 3) Office + form. On mobile the form comes first. */}
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
            <Reveal variant="slideStart" className="order-2 md:order-none">
              <section
                aria-labelledby="office-title"
                className="relative isolate flex h-full min-h-[22rem] flex-col justify-between gap-8 overflow-hidden rounded-2xl p-6 text-white"
              >
                {/* Photo over the whole card; a navy overlay keeps the text readable */}
                <Image
                  src={OFFICE_PHOTO}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  style={{ objectPosition: "50% 50%" }}
                  className="-z-20 object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-linear-to-t from-navy/95 via-navy/40 to-navy/5"
                />
                <span className="flex size-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                  <Building2 aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <h2 id="office-title" className="text-lg font-semibold">
                    {t("office.title")}
                  </h2>
                  <address className="mt-1 text-base text-white/90 not-italic">
                    {shortAddress(locale)}
                  </address>
                  <div className="mt-5">
                    <CopyAddress
                      onDark
                      address={fullAddress}
                      label={t("office.copy")}
                      copiedLabel={t("office.copied")}
                    />
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal variant="slideEnd" className="order-1 md:order-none">
              <div className={`${card} h-full`}>
                <ContactForm
                  services={SERVICE_IDS.map((id) => ({
                    id,
                    label: t(`form.services.${id}`),
                  }))}
                  labels={{
                    title: t("form.title"),
                    name: t("form.name"),
                    phone: t("form.phone"),
                    countryCode: t("form.countryCode"),
                    otherCountry: t("form.otherCountry"),
                    countries: Object.fromEntries(
                      ["sa", "ae", "kw", "qa", "bh", "om"].map((id) => [
                        id,
                        t(`form.countries.${id}`),
                      ]),
                    ),
                    otherCodePlaceholder: t("form.otherCodePlaceholder"),
                    email: t("form.email"),
                    optional: t("form.optional"),
                    message: t("form.message"),
                    service: t("form.service"),
                    submit: t("form.submit"),
                    sending: t("form.sending"),
                    successTitle: t("form.successTitle"),
                    successCta: t("form.successCta"),
                    whatsappMessage: t("whatsappMessage"),
                    errorInvalid: t("form.errorInvalid"),
                    errorSend: t("form.errorSend"),
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </MotionProvider>
  );
}
