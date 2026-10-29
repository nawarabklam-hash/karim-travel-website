import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { breadcrumbJsonLd, ogImage, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import MotionProvider from "@/components/motion/MotionProvider";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  aboutHeroAlt,
  aboutHeroImage,
  aboutHeroPosition,
  foundedYear,
  storyImages,
  whyBadges,
  whyImage,
  whyImageAlt,
  whyImagePosition,
  whyIntro,
  whyUs,
} from "@/content/about";
import { faq, faqCategories, faqIntro } from "@/content/faq";
import { services } from "@/content/services";
import { destinations } from "@/content/destinations";
import { events } from "@/content/events";
import {
  siteContainer,
  siteGutter,
  siteInset,
} from "@/components/layout/container";
import StatsBento from "@/components/sections/about/StatsBento";
import Faq from "@/components/sections/about/Faq";
import KenBurns from "@/components/motion/KenBurns";
import WordReveal from "@/components/motion/WordReveal";
import {
  faqSequence,
  heroFollowDelay,
  whySequence,
} from "@/lib/motion/presets";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Float from "@/components/motion/Float";
import Sequence from "@/components/motion/Sequence";
import StaggerItem from "@/components/motion/StaggerItem";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { ShieldCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("about.title"),
    description: t("about.description"),
    image: ogImage(locale, "about"),
  });
}

/** Shared width and vertical rhythm for each section. */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={title ? `${id}-title` : undefined}
      className={`${siteGutter} py-10 sm:py-14`}
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

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const tm = await getTranslations("meta");

  // Counted from content/ so they stay in sync; years are computed, not typed.
  // (Static page: the year count updates on each rebuild.)
  const years = new Date().getFullYear() - foundedYear;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question[locale],
      acceptedAnswer: { "@type": "Answer", text: answer[locale] },
    })),
  };

  return (
    <MotionProvider>
      <JsonLd data={faqJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd(locale, tm("breadcrumbHome"), [
          { name: tm("about.title"), path: "/about" },
        ])}
      />

      {/* 1) Hero — same style as /info; pulled up behind the floating header */}
      <header className="relative isolate -mt-[4.75rem] flex min-h-[50vh] items-end overflow-hidden pt-28 sm:-mt-[5.5rem] sm:min-h-[30rem]">
        <KenBurns className="absolute inset-0 -z-20">
          <Image
            src={aboutHeroImage}
            alt={aboutHeroAlt[locale]}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: aboutHeroPosition }}
            className="object-cover"
          />
        </KenBurns>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 via-black/30 to-black/30"
        />
        <div className={`${siteGutter} w-full pb-10 sm:pb-14`}>
          <div className={`${siteContainer} ${siteInset}`}>
            <p className="flex items-center gap-3 font-plex text-sm text-white/90 sm:text-base">
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
              variant="liftIn"
              trigger="mount"
              delay={heroFollowDelay}
              className="mt-3 max-w-2xl font-plex text-base text-white/90 sm:text-lg"
            >
              {t("subtitle")}
            </Reveal>
          </div>
        </div>
      </header>

      {/* Everything below the hero uses IBM Plex Sans Arabic */}
      <div className="py-8 font-plex sm:py-10">
        {/* 2) Our story */}
        <Section id="story">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-14">
            <div>
              <Reveal>
                <p className="text-sm font-semibold text-red">
                  {t("story.label")}
                </p>
              </Reveal>
              <WordReveal
                as="h2"
                trigger="view"
                text={t("story.title")}
                className="mt-2 font-calligraphy text-4xl leading-[1.5] font-bold text-navy sm:text-5xl"
              />
              <Reveal delay={0.3}>
                <p className="mt-5 max-w-xl text-base leading-loose text-navy/70 sm:text-lg">
                  {t("story.text")}
                </p>
                <p className="mt-4 max-w-xl text-base leading-loose text-navy/70 sm:text-lg">
                  {t("story.text2")}
                </p>
              </Reveal>
            </div>

            {/* Two overlapping photos: large at the top/start, small at the bottom/end */}
            <div className="relative mx-auto w-full max-w-2xl pb-24 lg:max-w-none">
              {/* The two photos drift against each other while scrolling (desktop) */}
              <Reveal variant="scaleIn" delay={0.6} className="w-[82%]">
                <Parallax
                  from={40}
                  to={-40}
                  className="w-full"
                  innerClassName="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={storyImages.large}
                    alt={storyImages.largeAlt[locale]}
                    fill
                    sizes="(min-width: 1024px) 48vw, 82vw"
                    style={{ objectPosition: storyImages.largePosition }}
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
              <Reveal
                variant="scaleIn"
                delay={0.9}
                className="absolute end-0 bottom-0 w-[52%]"
              >
                <Parallax
                  from={-40}
                  to={40}
                  className="w-full"
                  innerClassName="relative aspect-[4/3] overflow-hidden rounded-2xl border-8 border-white shadow-lg"
                >
                  <Image
                    src={storyImages.small}
                    alt={storyImages.smallAlt[locale]}
                    fill
                    sizes="(min-width: 1024px) 30vw, 52vw"
                    style={{ objectPosition: storyImages.smallPosition }}
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* 3) Stats bento */}
        <Section id="numbers">
          <StatsBento
            years={years}
            services={services.map((s) => ({
              slug: s.slug,
              title: s.title[locale],
            }))}
            cities={destinations.map((d) => d.name[locale])}
            activities={events.length}
            labels={{
              years: t("bento.years"),
              yearsNote: t("bento.yearsNote"),
              services: t("bento.services"),
              destinations: t("bento.destinations"),
              activities: t("bento.activities"),
              activitiesCta: t("bento.activitiesCta"),
            }}
          />
        </Section>

        {/* 4) Why choose us — text + features | image with floating badges */}
        <section
          aria-labelledby="why-title"
          className={`${siteGutter} py-10 sm:py-14`}
        >
          <div className={`${siteContainer} ${siteInset}`}>
            {/* One timeline, in reading order: eyebrow → title → subtitle →
                features one by one → image → badges (then they float) */}
            <Sequence className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <StaggerItem
                  variant="fadeIn"
                  delay={whySequence.eyebrow}
                  duration={whySequence.eyebrowDuration}
                >
                  <p className="flex items-center gap-3 text-sm font-semibold text-red">
                    <span
                      aria-hidden="true"
                      className="h-0.5 w-8 rounded-full bg-red"
                    />
                    {whyIntro.eyebrow[locale]}
                  </p>
                </StaggerItem>
                <WordReveal
                  as="h2"
                  id="why-title"
                  trigger="parent"
                  delay={whySequence.title}
                  text={whyIntro.title[locale]}
                  className="mt-3 font-calligraphy text-4xl leading-[1.5] font-bold text-navy sm:text-5xl"
                />
                <StaggerItem variant="riseIn" delay={whySequence.subtitle}>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-navy/65 sm:text-lg">
                    {whyIntro.text[locale]}
                  </p>
                </StaggerItem>

                {/* DOM order = reading order (RTL fills the grid right to left) */}
                <ul className="mt-8 grid gap-2 min-[480px]:grid-cols-2">
                  {whyUs.map(({ icon: Icon, title, text }, i) => (
                    <StaggerItem
                      as="li"
                      key={title.en}
                      delay={whySequence.features + i * whySequence.featureGap}
                      duration={whySequence.featureDuration}
                      className="group flex items-start gap-4 rounded-2xl p-4 transition-colors duration-300 hover:bg-snow"
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-navy transition duration-300 group-hover:bg-navy group-hover:text-white motion-safe:group-hover:scale-105 motion-safe:group-hover:-rotate-[8deg]">
                        <Icon aria-hidden="true" className="size-6" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-navy sm:text-lg">
                          {title[locale]}
                        </h3>
                        <p className="mt-0.5 text-sm text-navy/65 sm:text-base">
                          {text[locale]}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </ul>
              </div>

              {/* Image; badges overlap its edges on desktop, stay inside on mobile */}
              <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                {/* Revealed from the start side, after the last feature */}
                <StaggerItem variant="clipStart" delay={whySequence.image}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-square">
                    <Image
                      src={whyImage}
                      alt={whyImageAlt[locale]}
                      fill
                      style={{ objectPosition: whyImagePosition }}
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </StaggerItem>

                <StaggerItem
                  variant="popBadge"
                  delay={whySequence.badges[0]}
                  className="absolute end-3 top-3 lg:-end-6 lg:top-10"
                >
                  <Float
                    delay={whySequence.badges[0] + whySequence.floatAfter}
                    className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3 shadow-lg"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <ShieldCheck aria-hidden="true" className="size-5" />
                    </span>
                    <p className="text-sm leading-tight">
                      <span className="block font-semibold text-navy">
                        {whyBadges.licensed.title[locale]}
                      </span>
                      <span className="text-navy/60">
                        {whyBadges.licensed.text[locale]}
                      </span>
                    </p>
                  </Float>
                </StaggerItem>

                <StaggerItem
                  variant="popBadge"
                  delay={whySequence.badges[1]}
                  className="absolute start-3 bottom-3 lg:-start-6 lg:bottom-12"
                >
                  <Float
                    delay={
                      whySequence.badges[0] +
                      whySequence.floatAfter +
                      whySequence.floatOffset
                    }
                    className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3 shadow-lg"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                      <WhatsAppIcon className="size-5" />
                    </span>
                    <p className="text-sm leading-tight">
                      <span className="block font-semibold text-navy">
                        {whyBadges.team.title[locale]}
                      </span>
                      <span className="text-navy/60">
                        {whyBadges.team.text[locale]}
                      </span>
                    </p>
                  </Float>
                </StaggerItem>
              </div>
            </Sequence>
          </div>
        </section>

        {/* 5) FAQ — sticky navy card + tabs and questions */}
        <section
          aria-labelledby="faq-title"
          className={`${siteGutter} py-10 sm:py-14`}
        >
          <div className={`${siteContainer} ${siteInset}`}>
            {/* One timeline: navy card → its contents → tabs → questions
                (timings in faqSequence; the tabs and questions live in <Faq>) */}
            {/* grid-cols-1 = minmax(0, 1fr): the scrolling tab row must not widen the phone layout */}
            <Sequence className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.8fr_1.4fr]">
              {/* Stretch the column so the card can stick while the questions scroll */}
              <div className="lg:self-stretch">
                <StaggerItem
                  variant="slideStart"
                  delay={faqSequence.card}
                  duration={faqSequence.cardDuration}
                  className="rounded-3xl bg-navy p-8 text-white lg:sticky lg:top-28"
                >
                  <StaggerItem variant="riseIn" delay={faqSequence.inner}>
                    <p className="flex items-center gap-3 text-sm font-semibold text-red-300">
                      <span
                        aria-hidden="true"
                        className="h-0.5 w-8 rounded-full bg-red-300"
                      />
                      {faqIntro.eyebrow[locale]}
                    </p>
                  </StaggerItem>
                  <WordReveal
                    as="h2"
                    id="faq-title"
                    trigger="parent"
                    delay={faqSequence.inner + faqSequence.innerGap}
                    text={faqIntro.title[locale]}
                    className="mt-3 font-calligraphy text-4xl leading-[1.5] font-bold sm:text-5xl"
                  />
                  <StaggerItem
                    variant="riseIn"
                    delay={faqSequence.inner + 2 * faqSequence.innerGap}
                  >
                    <p className="mt-3 text-base leading-relaxed text-sky-200/90">
                      {faqIntro.text[locale]}
                    </p>
                  </StaggerItem>
                  <StaggerItem
                    variant="riseIn"
                    delay={faqSequence.inner + 3 * faqSequence.innerGap}
                  >
                    <WhatsAppLink
                      message={faqIntro.whatsappMessage[locale]}
                      location="about_faq"
                      className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-navy transition-[filter] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
                    >
                      <WhatsAppIcon className="size-5" />
                      {faqIntro.button[locale]}
                    </WhatsAppLink>
                  </StaggerItem>
                </StaggerItem>
              </div>

              <Faq
                tabs={faqCategories.map(({ id, label }) => ({
                  id,
                  label: label[locale],
                }))}
                items={faq.map(({ category, question, answer }) => ({
                  category,
                  question: question[locale],
                  answer: answer[locale],
                }))}
              />
            </Sequence>
          </div>
        </section>
      </div>
    </MotionProvider>
  );
}
