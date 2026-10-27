import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { breadcrumbJsonLd, ogImage, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import MotionProvider from "@/components/motion/MotionProvider";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  moscowFacts,
  moscowStats,
  quickFacts,
  thingsToDo,
} from "@/content/info";
import {
  siteContainer,
  siteGutter,
  siteInset,
} from "@/components/layout/container";
import KenBurns from "@/components/motion/KenBurns";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import WordReveal from "@/components/motion/WordReveal";
import { heroFollowDelay } from "@/lib/motion/presets";
import Reveal from "@/components/motion/Reveal";
import StatsStrip from "@/components/ui/StatsStrip";
import ThingsToDo from "@/components/sections/info/ThingsToDo";
import AskUsCta from "@/components/sections/AskUsCta";

/** Moscow skyline at sunset: Foreign Ministry tower and Christ the Saviour Cathedral. */
const BANNER = "/images/info/moscow-skyline-sunset.webp";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/info">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "/info",
    title: t("info.title"),
    description: t("info.description"),
    image: ogImage(locale, "info"),
  });
}

/** Section wrapper: shared width, generous vertical rhythm, plain semibold title. */
function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={title ? `${id}-title` : undefined}
      className={`${siteGutter} py-8 sm:py-12 ${className}`}
    >
      <div className={`${siteContainer} ${siteInset}`}>
        {title && (
          <WordReveal
            as="h2"
            id={`${id}-title`}
            trigger="view"
            text={title}
            className="mb-8 font-calligraphy text-4xl leading-[1.5] font-bold text-navy sm:text-5xl"
          />
        )}
        {/* Content follows the title; sections without one animate their own children */}
        {title ? <Reveal delay={0.3}>{children}</Reveal> : children}
      </div>
    </section>
  );
}

export default async function InfoPage({
  params,
}: PageProps<"/[locale]/info">) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations("infoPage");
  const tm = await getTranslations("meta");

  return (
    <MotionProvider>
      <JsonLd
        data={breadcrumbJsonLd(locale, tm("breadcrumbHome"), [
          { name: tm("info.title"), path: "/info" },
        ])}
      />
      {/* Photo banner — pulled up by the header height so it sits behind the floating bar */}
      <header className="relative isolate -mt-[4.75rem] flex min-h-[26rem] items-end overflow-hidden pt-28 sm:-mt-[5.5rem] sm:min-h-[30rem] lg:min-h-[32rem]">
        <KenBurns className="absolute inset-0 -z-20">
          <Image
            src={BANNER}
            alt={t("bannerAlt")}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "50% 70%" }}
            className="object-cover"
          />
        </KenBurns>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 via-black/30 to-black/30"
        />
        <div className={`${siteGutter} w-full pb-10 sm:pb-14`}>
          <div className={`${siteContainer} ${siteInset}`}>
            <p className="flex items-center gap-3 font-calligraphy text-xl text-white/90">
              <span
                aria-hidden="true"
                className="h-0.5 w-8 rounded-full bg-red"
              />
              {t("eyebrow")}
            </p>
            <WordReveal
              as="h1"
              text={t("title")}
              className="mt-3 font-calligraphy text-4xl leading-[1.5] font-bold text-white drop-shadow-sm sm:text-5xl lg:text-6xl"
            />
            <Reveal
              as="p"
              variant="fadeIn"
              trigger="mount"
              delay={heroFollowDelay}
              className="mt-3 max-w-2xl font-plex text-base text-white/90 sm:text-lg"
            >
              {t("subtitle")}
            </Reveal>
          </div>
        </div>
      </header>

      {/* Everything below the banner uses IBM Plex Sans Arabic */}
      <div className="py-8 font-plex sm:py-10">
        {/* A — Quick facts */}
        <Section id="facts" title={t("factsTitle")}>
          <Stagger
            as="ul"
            stagger={0.12}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {quickFacts.map(({ id, icon: Icon, value, label, points, ltr }) => (
              <StaggerItem
                as="li"
                key={id}
                className="rounded-2xl bg-navy p-5 text-white sm:p-6"
              >
                <Icon aria-hidden="true" className="size-6 text-white" />
                <p className="mt-3 font-calligraphy text-3xl leading-[1.5] font-bold text-white sm:text-4xl">
                  {/* Numbers with signs/units stay LTR inside Arabic text */}
                  <bdi dir={ltr ? "ltr" : undefined}>{value[locale]}</bdi>
                </p>
                <p className="mt-1 text-sm font-medium text-white/85">
                  {label[locale]}
                </p>
                <ul className="mt-4 space-y-2.5 border-t border-white/15 pt-4 font-tajawal text-[0.9375rem] leading-relaxed text-white/80">
                  {points.map((point) => (
                    <li key={point.en} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-red"
                      />
                      <span>{point[locale]}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* D — Moscow in numbers */}
        <Section id="numbers" title={t("numbersTitle")}>
          <StatsStrip
            stats={moscowStats.map(
              ({ value, decimals, prefix, suffix, label }) => ({
                value,
                decimals,
                prefix,
                suffix: suffix?.[locale],
                label: label[locale],
              }),
            )}
          />
          <Stagger
            as="ul"
            stagger={0.12}
            className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {moscowFacts.map(({ icon: Icon, text }) => (
              <StaggerItem
                as="li"
                key={text.en}
                className="flex items-start gap-3 rounded-2xl bg-snow p-5"
              >
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 size-6 shrink-0 text-navy"
                />
                <p className="text-base leading-relaxed font-medium text-navy/85 sm:text-lg">
                  {text[locale]}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* E — Things to do: photo with title underneath, three per row */}
        <Section id="things" title={t("thingsTitle")}>
          <ThingsToDo
            items={thingsToDo.map((item) => ({
              title: item.title[locale],
              image: item.image,
            }))}
          />
        </Section>

        {/* Closing WhatsApp call to action */}
        <Section id="ask-us">
          <AskUsCta
            title={t("askUs.title")}
            subtitle={t("askUs.subtitle")}
            buttonLabel={t("askUs.button")}
            message={t("askUs.message")}
            location="info_cta"
          />
        </Section>
      </div>
    </MotionProvider>
  );
}
