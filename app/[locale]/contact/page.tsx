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
import {
  siteContainer,
  siteGutter,
  siteInset,
} from "@/components/layout/container";
import ContactForm from "@/components/sections/contact/ContactForm";
import CopyAddress from "@/components/sections/contact/CopyAddress";
import KenBurns from "@/components/motion/KenBurns";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import WordReveal from "@/components/motion/WordReveal";
import { heroFollowDelay } from "@/lib/motion/presets";
import Reveal from "@/components/motion/Reveal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";

/** Airplane in a sunset sky (sky left clear for the text). */
const HERO_IMAGE = "/images/contact/hero.webp";
/** Red Square at night: Spasskaya and Nikolskaya towers in the snow (info panel background). */
const INFO_BG_IMAGE: string | null = "/images/contact/red-square-night.webp";

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

  const circle =
    "flex size-10 shrink-0 items-center justify-center rounded-full";
  const row = "flex items-center gap-3.5";

  return (
    <MotionProvider>
      <JsonLd
        data={breadcrumbJsonLd(locale, tm("breadcrumbHome"), [
          { name: tm("contact.title"), path: "/contact" },
        ])}
      />

      <div className={`${siteGutter} pt-4 pb-16 font-plex sm:pb-20`}>
        <div className={`${siteContainer} ${siteInset}`}>
          {/* 1) Hero image with text on the start side */}
          <header className="relative isolate flex h-[45vh] min-h-80 items-end overflow-hidden rounded-3xl md:h-[50vh]">
            <KenBurns className="absolute inset-0 -z-20">
              <Image
                src={HERO_IMAGE}
                alt={t("heroAlt")}
                fill
                priority
                sizes="(min-width: 1440px) 1360px, 100vw"
                style={{ objectPosition: "62% 50%" }}
                className="object-cover"
              />
            </KenBurns>
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-navy/40"
            />
            <div className="max-w-xl p-6 pb-24 sm:p-10 sm:pb-32 md:pb-36">
              <p className="flex items-center gap-3 text-sm font-semibold text-white">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-8 rounded-full bg-red"
                />
                {t("eyebrow")}
              </p>
              <WordReveal
                as="h1"
                text={t("title")}
                className="mt-3 font-calligraphy text-4xl leading-[1.5] font-bold text-white drop-shadow-sm sm:text-5xl"
              />
              <Reveal
                as="p"
                variant="fadeIn"
                trigger="mount"
                delay={heroFollowDelay}
                className="mt-2 text-base text-sky-100 sm:text-lg"
              >
                {t("subtitle")}
              </Reveal>
            </div>
          </header>

          {/* 2) Main card overlapping the hero: info panel + form */}
          <Reveal className="relative z-10 mx-2 -mt-16 sm:mx-6 md:-mt-24">
            <div className="grid gap-2 rounded-3xl border border-navy/10 bg-white p-2 shadow-xl shadow-navy/10 lg:grid-cols-[0.85fr_1.25fr]">
              {/* Info panel */}
              <section
                aria-labelledby="info-title"
                className="relative isolate flex min-h-[26rem] flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-navy p-6 text-white sm:p-8"
              >
                {INFO_BG_IMAGE && (
                  <>
                    <Image
                      src={INFO_BG_IMAGE}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      style={{ objectPosition: "45% 40%" }}
                      className="-z-20 object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 bg-linear-to-b from-navy/80 via-navy/35 to-navy/60"
                    />
                  </>
                )}

                <div>
                  <WordReveal
                    as="h2"
                    id="info-title"
                    trigger="view"
                    text={t("info.title")}
                    className="text-2xl font-semibold"
                  />
                  <Reveal>
                    <p className="mt-1 text-base text-sky-200">
                      {t("info.subtitle")}
                    </p>
                  </Reveal>

                  <Stagger
                    as="ul"
                    stagger={0.12}
                    delay={0.3}
                    className="mt-7 space-y-5 text-base"
                  >
                    <StaggerItem as="li">
                      <WhatsAppLink
                        message={t("whatsappMessage")}
                        location="contact_info"
                        className={`${row} hover:text-white/85`}
                      >
                        <span className={`${circle} bg-whatsapp text-white`}>
                          <WhatsAppIcon className="size-5" />
                        </span>
                        <span className="sr-only">{t("info.whatsapp")}</span>
                        <span dir="ltr" className="tabular-nums">
                          {contact.phoneDisplay}
                        </span>
                      </WhatsAppLink>
                    </StaggerItem>
                    <StaggerItem as="li">
                      <a
                        href={emailLink()}
                        className={`${row} hover:text-white/85`}
                      >
                        <span className={`${circle} bg-white/15`}>
                          <Mail aria-hidden="true" className="size-5" />
                        </span>
                        <span className="sr-only">{t("info.email")}</span>
                        <span dir="ltr" className="break-all">
                          {contact.email}
                        </span>
                      </a>
                    </StaggerItem>
                    <StaggerItem as="li" className="flex items-start gap-3.5">
                      <span className={`${circle} bg-white/15`}>
                        <Building2 aria-hidden="true" className="size-5" />
                      </span>
                      <div>
                        <span className="sr-only">{t("info.office")}</span>
                        <address className="not-italic">
                          {shortAddress(locale)}
                        </address>
                        <div className="mt-2">
                          <CopyAddress
                            address={fullAddress}
                            label={t("info.copy")}
                            copiedLabel={t("info.copied")}
                          />
                        </div>
                      </div>
                    </StaggerItem>
                  </Stagger>
                </div>

                <WhatsAppLink
                  message={t("whatsappMessage")}
                  location="contact_info_button"
                  className="inline-flex w-fit items-center gap-2.5 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-emerald-950 transition-[filter] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
                >
                  <WhatsAppIcon className="size-5" />
                  {t("info.cta")}
                </WhatsAppLink>
              </section>

              {/* Form panel */}
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
    </MotionProvider>
  );
}
