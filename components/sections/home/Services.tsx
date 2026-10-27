import Image from "next/image";
import { Mail, Plane } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { emailLink } from "@/lib/links";
import { contact } from "@/content/contact";
import { services } from "@/content/services";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";

/**
 * Brochure-style layout: a navy contact panel (one third) and a wide white panel
 * listing the services with circular photos (two thirds).
 * On mobile the panels stack with the services first.
 */
export default async function Services() {
  const t = await getTranslations("home.services");
  const locale = (await getLocale()) as AppLocale;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24"
    >
      {/* Full-bleed band: the panels run edge to edge of the screen */}
      <div className="grid lg:min-h-[32rem] lg:grid-cols-3">
        {/* 1 — Contact (navy) — desktop only; mobile has the floating WhatsApp button */}
        <Reveal
          variant="popIn"
          className="hidden flex-col items-center justify-center bg-navy p-8 text-center text-white sm:p-10 lg:flex"
        >
          <Plane
            aria-hidden="true"
            className="mb-6 size-12 text-red rtl:-scale-x-100"
            strokeWidth={1.75}
          />
          <p className="font-display text-3xl font-bold sm:text-4xl">
            {t("ctaTitle")}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/85 sm:text-base">
            {t("ctaText")}
          </p>

          <ul className="mt-8 space-y-3 text-sm sm:text-base">
            <li>
              <a
                href={emailLink()}
                className="inline-flex items-center gap-2 transition-colors hover:text-white/80"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0" />
                <span dir="ltr">{contact.email}</span>
              </a>
            </li>
          </ul>

          <WhatsAppLink
            message={t("ctaMessage")}
            location="home_services_panel"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-medium text-red transition-colors hover:bg-snow focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none"
          >
            <WhatsAppIcon className="size-5 shrink-0" />
            {t("ctaButton")}
          </WhatsAppLink>
        </Reveal>

        {/* 2 — Services (white, two thirds) — first on mobile */}
        <div className="relative isolate order-first overflow-hidden bg-white p-8 sm:p-10 lg:order-none lg:col-span-2 lg:px-16 lg:py-14">
          {/* Decorative soft circle, like the brochure */}
          <span
            aria-hidden="true"
            className="absolute -end-16 -bottom-16 -z-10 size-56 rounded-full bg-red/10"
          />

          <WordReveal
            as="h2"
            id="services-title"
            trigger="view"
            text={t("eyebrow")}
            className="font-calligraphy text-4xl leading-[1.5] font-bold text-navy sm:text-5xl"
          />
          <Reveal>
            <p className="mt-2 text-sm text-navy/60">{t("tagline")}</p>
          </Reveal>

          <Stagger
            as="ul"
            stagger={0.1}
            delay={0.4}
            className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2"
          >
            {services.map((service, i) => {
              const title = service.title[locale];
              return (
                <StaggerItem as="li" variant="popIn" key={service.slug}>
                  <WhatsAppLink
                    message={t("whatsappMessage", { service: title })}
                    location="home_service"
                    params={{ service: service.slug }}
                    aria-label={t("cardLabel", { service: title })}
                    className="group flex items-center gap-5 rounded-2xl p-4 transition-colors hover:bg-snow focus-visible:ring-2 focus-visible:ring-red/40 focus-visible:outline-none"
                  >
                    {/* Coloured border + white gap are part of the circle's own box,
                          so the frame never spills outside the item */}
                    <span
                      className={`size-24 shrink-0 rounded-full border-4 bg-white p-1 sm:size-32 ${
                        i % 2 === 0 ? "border-navy" : "border-red/70"
                      }`}
                    >
                      <span className="relative block size-full overflow-hidden rounded-full">
                        <Image
                          src={service.image}
                          alt={title}
                          fill
                          sizes="(min-width: 640px) 128px, 96px"
                          style={{ objectPosition: service.imagePosition }}
                          className="object-cover transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                        />
                      </span>
                    </span>
                    <span>
                      <span className="block font-bold text-navy group-hover:text-red">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-navy/65">
                        {service.description[locale]}
                      </span>
                    </span>
                  </WhatsAppLink>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
