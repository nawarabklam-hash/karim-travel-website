import { ArrowRight, Building2, CalendarCheck, Languages } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link, type AppLocale } from "@/i18n/routing";
import { heroSlides } from "@/content/heroSlides";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import {
  siteContainer,
  siteGutter,
  siteInset,
} from "@/components/layout/container";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { heroFollowDelay } from "@/lib/motion/presets";
import HeroSlider from "./HeroSlider";

const trustItems = [
  { key: "office", Icon: Building2 },
  { key: "since", Icon: CalendarCheck },
  { key: "team", Icon: Languages },
] as const;

export default async function Hero() {
  const t = await getTranslations("home.hero");
  const tw = await getTranslations("whatsapp");
  const locale = (await getLocale()) as AppLocale;

  const slides = heroSlides.flatMap((s) =>
    s.image
      ? [
          {
            slug: s.slug,
            image: s.image,
            position: s.position,
            alt: s.alt[locale],
          },
        ]
      : [],
  );

  return (
    <section>
      {/* Navy stays underneath the photos, so a missing image never shows white */}
      <HeroSlider
        slides={slides}
        className="relative isolate flex h-svh min-h-[36rem] items-center overflow-hidden bg-linear-to-br from-navy via-[#1f4f94] to-[#4a80c4]"
      >
        {/* Readability overlays: dark on the text side (right in Arabic, left in English)
            fading toward the other side, plus a light fade at the top and bottom. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 from-black/70 to-black/10 ltr:bg-linear-to-r rtl:bg-linear-to-l"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-black/30 via-transparent to-black/40"
        />

        <div className={`${siteGutter} w-full`}>
          <div
            className={`${siteContainer} ${siteInset} flex flex-col items-start pt-24 pb-20 text-start sm:pt-28`}
          >
            <WordReveal
              as="h1"
              lines={[t("titleLine1"), t("titleLine2")]}
              // Mobile: bigger, tighter title that may wrap (English too). From md up: unchanged.
              className="font-calligraphy text-4xl leading-[1.2] font-bold text-white drop-shadow-sm md:text-5xl md:leading-[1.5] lg:text-6xl ltr:md:text-[clamp(1.25rem,6vw,3.75rem)] ltr:md:whitespace-nowrap"
            />

            {/* Subtitle, buttons and trust line fade in after the title */}
            <Reveal
              variant="fadeIn"
              trigger="mount"
              delay={heroFollowDelay}
              className="flex w-full flex-col items-start"
            >
              <p className="mt-5 max-w-lg text-sm leading-relaxed font-medium text-white md:text-xl">
                {t("subtitle")}
              </p>

              {/* Mobile: compact buttons (44px tall), side by side when they fit, else
                  stacked at their own width. From md up: unchanged. */}
              <div className="mt-9 flex flex-wrap items-center justify-start gap-3 md:flex-nowrap md:gap-4">
                <WhatsAppLink
                  message={tw("defaultMessage")}
                  location="home_hero"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-white px-5 text-sm font-medium text-red transition-colors duration-200 hover:bg-snow focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:outline-none md:h-13 md:gap-2 md:px-7 md:text-base"
                >
                  <WhatsAppIcon className="size-4 shrink-0 md:size-5" />
                  {t("ctaWhatsapp")}
                </WhatsAppLink>
                <Link
                  href="/events"
                  className="group inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-navy px-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#123a78] focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:outline-none md:h-13 md:gap-2 md:px-7 md:text-base"
                >
                  {t("ctaEvents")}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 md:size-5 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </div>

              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
                {trustItems.map(({ key, Icon }) => (
                  <li key={key} className="inline-flex items-center gap-1.5">
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                    {t(`trust.${key}`)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </HeroSlider>
    </section>
  );
}
