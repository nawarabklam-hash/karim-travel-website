import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { breadcrumbJsonLd, ogImage, pageMetadata, pageUrl } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import { Link, routing, type AppLocale } from "@/i18n/routing";
import { events, eventTypes, type EventType } from "@/content/events";
import { destinations } from "@/content/destinations";
import EventCard from "@/components/events/EventCard";
import MotionProvider from "@/components/motion/MotionProvider";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { heroFollowDelay } from "@/lib/motion/presets";
import {
  siteContainer,
  siteGutter,
  siteInset,
} from "@/components/layout/container";

const isEventType = (v: unknown): v is EventType =>
  typeof v === "string" && eventTypes.some((t) => t.id === v);

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/events">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "/events",
    title: t("events.title"),
    description: t("events.description"),
    image: ogImage(locale, "events"),
  });
}

export default async function EventsPage({
  params,
  searchParams,
}: PageProps<"/[locale]/events">) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  setRequestLocale(locale);

  // The filter lives in the URL (?type=winter) so shared links keep it.
  const { type } = await searchParams;
  const active = isEventType(type) ? type : null;
  const shown = active ? events.filter((e) => e.type === active) : events;

  const t = await getTranslations("eventsPage");
  const tm = await getTranslations("meta");
  const cityName = (slug: string) =>
    destinations.find((d) => d.slug === slug)?.name[locale] ?? "";
  const te = await getTranslations("event");

  const chip = (selected: boolean) =>
    `inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-red/40 focus-visible:outline-none ${
      selected
        ? "border-navy bg-navy text-white"
        : "border-navy/15 bg-white text-navy hover:border-navy/40"
    }`;

  // All events (not only the filtered ones), linked to their type filter.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: tm("events.title"),
    itemListElement: events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.title[locale],
      url: pageUrl(locale, `/events?type=${e.type}`),
      image: `${siteUrl}${e.image}`,
    })),
  };

  return (
    <MotionProvider>
      <JsonLd data={itemList} />
      <JsonLd
        data={breadcrumbJsonLd(locale, tm("breadcrumbHome"), [
          { name: tm("events.title"), path: "/events" },
        ])}
      />
      <section className={`${siteGutter} py-14 sm:py-20`}>
        <div className={`${siteContainer} ${siteInset}`}>
          <p className="flex items-center gap-3 font-calligraphy text-xl text-red">
            <span
              aria-hidden="true"
              className="h-0.5 w-8 rounded-full bg-red"
            />
            {t("eyebrow")}
          </p>
          <WordReveal
            as="h1"
            text={t("title")}
            className="mt-3 font-calligraphy text-4xl leading-[1.5] font-bold text-navy sm:text-5xl"
          />
          <Reveal
            as="p"
            variant="liftIn"
            trigger="mount"
            delay={heroFollowDelay}
            className="mt-3 max-w-2xl text-base text-navy/70 sm:text-lg"
          >
            {t("subtitle")}
          </Reveal>

          {/* Filter by type — scrolls sideways on mobile, wraps on larger screens */}
          <Reveal
            variant="liftIn"
            trigger="mount"
            delay={heroFollowDelay + 0.1}
            className="mt-10"
          >
            <nav aria-label={t("filterLabel")}>
              <ul className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
                <li>
                  <Link
                    href="/events"
                    scroll={false}
                    aria-current={active === null ? "page" : undefined}
                    className={chip(active === null)}
                  >
                    {t("all")}
                    <span className="text-xs opacity-70">{events.length}</span>
                  </Link>
                </li>
                {eventTypes.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <Link
                      href={{ pathname: "/events", query: { type: id } }}
                      scroll={false}
                      aria-current={active === id ? "page" : undefined}
                      className={chip(active === id)}
                    >
                      <Icon aria-hidden="true" className="size-4 shrink-0" />
                      {label[locale]}
                      <span className="text-xs opacity-70">
                        {events.filter((e) => e.type === id).length}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Keyed by filter: changing the type remounts the cards so they animate again */}
          <ul
            key={active ?? "all"}
            className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10"
          >
            {shown.map((event, i) => (
              <li key={event.slug}>
                {/* One card after another along each row */}
                <Reveal variant="fadeUp" delay={(i % 4) * 0.15}>
                  <EventCard
                    event={event}
                    locale={locale}
                    priority={i === 0}
                    labels={{
                      duration: te("duration"),
                      distance: te("distance", { city: cityName(event.city) }),
                    }}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MotionProvider>
  );
}
