import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, BedDouble, Coffee, MapPin, Star } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, routing, type AppLocale } from "@/i18n/routing";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { getTrip, trips, type TripService } from "@/content/trips";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import {
  siteContainer,
  siteGutter,
  siteInset,
} from "@/components/layout/container";

// Only the trips listed in content/trips.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/trips/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const trip = getTrip(slug);
  if (!trip || !hasLocale(routing.locales, locale)) return {};
  const summary = trip.summary[locale];
  return pageMetadata({
    locale,
    path: `/trips/${trip.slug}`,
    title: trip.title[locale],
    // Search snippets are ~155 characters.
    description:
      summary.length > 155 ? summary.slice(0, 154).trimEnd() + "…" : summary,
    // Share image = the trip cover photo.
    image: trip.coverImage.src,
  });
}

function ServiceList({
  items,
  locale,
  tone,
}: {
  items: TripService[];
  locale: AppLocale;
  tone: "red" | "navy";
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label.en}
          className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white p-4"
        >
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
              tone === "red" ? "bg-red/10 text-red" : "bg-navy/10 text-navy"
            }`}
          >
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <span className="text-sm leading-relaxed text-navy sm:text-base">
            {label[locale]}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function TripPage({
  params,
}: PageProps<"/[locale]/trips/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as AppLocale;
  setRequestLocale(locale);

  const trip = getTrip(slug);
  if (!trip) notFound();

  const t = await getTranslations("trip");
  const tm = await getTranslations("meta");
  const title = trip.title[locale];
  const bookMessage = t("whatsappMessage", { trip: title });
  const threeUp = trip.gallery.length === 3;

  return (
    <article>
      <JsonLd
        data={breadcrumbJsonLd(locale, tm("breadcrumbHome"), [
          { name: title, path: "/trips/" + trip.slug },
        ])}
      />
      {/* Cover — pulled up by the header's height so the photo sits behind the floating bar */}
      <header className="relative isolate -mt-[4.75rem] flex min-h-[26rem] items-end overflow-hidden pt-28 sm:-mt-[5.5rem] sm:min-h-[30rem]">
        <Image
          src={trip.coverImage.src}
          alt={trip.coverImage.alt[locale]}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: trip.coverImage.position }}
          className="-z-20 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-black/75 via-black/35 to-black/30"
        />
        <div className={`${siteGutter} w-full pb-10 sm:pb-14`}>
          <div className={`${siteContainer} ${siteInset}`}>
            <Link
              href="/#trips"
              className="group inline-flex items-center gap-1.5 text-sm text-white/85 transition-colors hover:text-white"
            >
              <ArrowRight
                aria-hidden="true"
                className="size-4 rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:rotate-0 rtl:group-hover:translate-x-0.5"
              />
              {t("backToTrips")}
            </Link>
            <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm text-white backdrop-blur-md">
              <MapPin aria-hidden="true" className="size-4 shrink-0" />
              {trip.city[locale]}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight font-bold text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              {trip.summary[locale]}
            </p>
          </div>
        </div>
      </header>

      <div className={`${siteGutter} py-14 sm:py-20`}>
        <div className={`${siteContainer} ${siteInset}`}>
          {/* Gallery */}
          <section aria-labelledby="gallery-title">
            <h2 id="gallery-title" className="sr-only">
              {t("gallery")}
            </h2>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
              {trip.gallery.map((photo, i) => (
                <li
                  key={photo.src}
                  className={`relative overflow-hidden rounded-2xl ${
                    i === 0
                      ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto"
                      : `aspect-[4/3] ${threeUp ? "md:col-span-2 md:aspect-[2/1]" : ""}`
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt[locale]}
                    fill
                    sizes={
                      i === 0
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 768px) 25vw, 50vw"
                    }
                    style={{ objectPosition: photo.position }}
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-12 lg:col-span-2">
              {/* Accommodation */}
              <section aria-labelledby="stay-title">
                <h2
                  id="stay-title"
                  className="font-display text-2xl font-bold text-navy"
                >
                  {t("accommodation")}
                </h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {trip.hotels.map((hotel) => (
                    <li
                      key={hotel.name ?? hotel.city.en}
                      className="rounded-2xl border border-navy/10 bg-snow p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-red">
                          <BedDouble aria-hidden="true" className="size-5" />
                        </span>
                        <div>
                          <p
                            className="font-bold text-navy"
                            dir={hotel.name ? "ltr" : undefined}
                          >
                            {hotel.name ?? hotel.city[locale]}
                          </p>
                          {hotel.name && (
                            <p className="mt-0.5 text-sm text-navy/70">
                              {hotel.city[locale]}
                            </p>
                          )}
                        </div>
                      </div>
                      {(hotel.stars || hotel.board) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {hotel.stars && (
                            <span
                              role="img"
                              aria-label={t("stars", { count: hotel.stars })}
                              className="inline-flex gap-0.5"
                            >
                              {Array.from({ length: hotel.stars }, (_, i) => (
                                <Star
                                  key={i}
                                  aria-hidden="true"
                                  className="size-4 fill-red text-red"
                                />
                              ))}
                            </span>
                          )}
                          {hotel.board && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-navy">
                              <Coffee aria-hidden="true" className="size-3.5" />
                              {hotel.board[locale]}
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Included */}
              <section aria-labelledby="included-title">
                <h2
                  id="included-title"
                  className="font-display text-2xl font-bold text-navy"
                >
                  {t("included")}
                </h2>
                <div className="mt-5">
                  <ServiceList
                    items={trip.included}
                    locale={locale}
                    tone="red"
                  />
                </div>
              </section>

              {/* Extras (only when the offer lists some) */}
              {trip.extras.length > 0 && (
                <section aria-labelledby="extras-title">
                  <h2
                    id="extras-title"
                    className="font-display text-2xl font-bold text-navy"
                  >
                    {t("extras")}
                  </h2>
                  <div className="mt-5">
                    <ServiceList
                      items={trip.extras}
                      locale={locale}
                      tone="navy"
                    />
                  </div>
                </section>
              )}
            </div>

            {/* Booking */}
            <aside className="lg:col-span-1">
              <div className="rounded-2xl bg-navy p-6 text-white lg:sticky lg:top-28">
                <p className="text-lg font-bold">{t("bookTitle")}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {t("bookText")}
                </p>
                <WhatsAppLink
                  message={bookMessage}
                  location="trip_page"
                  params={{ trip: trip.slug }}
                  className="mt-6 flex h-13 items-center justify-center gap-2 rounded-xl bg-red px-5 font-medium text-white transition-colors hover:bg-[#b01c29] focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none"
                >
                  <WhatsAppIcon className="size-5 shrink-0" />
                  {t("cta")}
                </WhatsAppLink>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}
