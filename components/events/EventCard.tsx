import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import type { AppLocale } from "@/i18n/routing";
import { eventTypes, type Event } from "@/content/events";

type Props = {
  event: Event;
  locale: AppLocale;
  /** Screen-reader labels for the meta line. */
  labels: { duration: string; distance: string };
};

/**
 * Display-only event card: tall photo with a navy info card floating over its
 * bottom edge. No link and no hover — booking goes through the floating WhatsApp button.
 */
export default function EventCard({ event, locale, labels }: Props) {
  const type = eventTypes.find((t) => t.id === event.type)!;
  const TypeIcon = type.icon;

  return (
    <article>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-snow">
        <Image
          src={event.image}
          alt={event.title[locale]}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-navy shadow-sm">
          <TypeIcon aria-hidden="true" className="size-3.5 shrink-0" />
          {type.label[locale]}
        </span>
      </div>

      {/* Negative margin is a % of the card width: the image is 1.25× its width tall,
          so -27% covers roughly the last 22% of the photo. */}
      <div className="relative z-10 mx-3 -mt-[27%] rounded-xl bg-navy p-5 shadow-md shadow-navy/20">
        <h3 className="truncate text-lg font-semibold text-white">
          {event.title[locale]}
        </h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/75">
          <Clock aria-hidden="true" className="size-4 shrink-0 text-red" />
          <span className="sr-only">{labels.duration}:</span>
          {event.duration[locale]}
          <span aria-hidden="true">·</span>
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-red" />
          <span className="sr-only">{labels.distance}:</span>
          {event.distance[locale]}
        </p>
      </div>
    </article>
  );
}
