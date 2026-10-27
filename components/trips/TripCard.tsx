import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Link, type AppLocale } from "@/i18n/routing";
import type { Trip } from "@/content/trips";

type Props = { trip: Trip; locale: AppLocale; seeMoreLabel: string };

/** Same card for every trip: cover, city, title and a link to the detail page. */
export default function TripCard({ trip, locale, seeMoreLabel }: Props) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-shadow duration-200 hover:shadow-xl hover:shadow-navy/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={trip.coverImage.src}
          alt={trip.coverImage.alt[locale]}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          style={{ objectPosition: trip.coverImage.position }}
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-navy shadow-sm">
          <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-red" />
          {trip.city[locale]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-bold text-navy">
          {/* The stretched link makes the whole card clickable */}
          <Link
            href={`/trips/${trip.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {trip.title[locale]}
          </Link>
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-medium text-red">
          {seeMoreLabel}
          <ArrowRight
            aria-hidden="true"
            className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </span>
      </div>
      {/* Keyboard focus ring for the stretched link */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-red/50 group-has-[a:focus-visible]:ring-2"
      />
    </article>
  );
}
