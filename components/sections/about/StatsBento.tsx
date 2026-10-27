import {
  ArrowRight,
  BedDouble,
  Car,
  GraduationCap,
  IdCard,
  Map,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import CountUp from "@/components/motion/CountUp";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";

/** Icon per service slug (content/services.ts); unknown slugs fall back to Sparkles. */
const serviceIcons: Record<string, LucideIcon> = {
  "car-rental": Car,
  "hotel-bookings": BedDouble,
  "tour-programs": Map,
  visa: IdCard,
  study: GraduationCap,
};

type Props = {
  years: number;
  services: { slug: string; title: string }[];
  cities: string[];
  activities: number;
  labels: {
    years: string;
    yearsNote: string;
    services: string;
    destinations: string;
    activities: string;
    activitiesCta: string;
  };
};

/**
 * About page stats as a bento grid (server component): experience (tall, navy),
 * services and destinations (snow), activities (wide, red). Cards reveal one
 * after another and the numbers count up once, via components/motion.
 */
export default function StatsBento({
  years,
  services,
  cities,
  activities,
  labels,
}: Props) {
  return (
    <Stagger className="grid gap-3 font-readex lg:grid-cols-3 lg:grid-rows-[auto_auto]">
      {/* 1) Experience — tall navy card */}
      <StaggerItem className="relative isolate flex min-h-80 flex-col justify-between overflow-hidden rounded-3xl bg-navy p-8 text-white lg:row-span-2">
        <span
          aria-hidden="true"
          dir="ltr"
          className="pointer-events-none absolute -end-4 -bottom-12 -z-10 text-[12rem] leading-none font-semibold text-white/5 select-none"
        >
          {years}
        </span>
        <Trophy aria-hidden="true" className="size-10 text-amber-400" />
        <div>
          <p className="text-7xl font-semibold">
            <CountUp value={years} prefix="+" prefixClassName="text-red-300" />
          </p>
          <p className="mt-3 text-xl font-semibold">{labels.years}</p>
          <p className="mt-1 text-base text-sky-200/90">{labels.yearsNote}</p>
        </div>
      </StaggerItem>

      {/* 2) Services */}
      <StaggerItem className="flex flex-col justify-between gap-6 rounded-3xl bg-snow p-8">
        <div>
          <p className="text-6xl font-semibold text-navy">
            <CountUp value={services.length} />
          </p>
          <p className="mt-2 text-lg font-semibold text-navy">
            {labels.services}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {services.map(({ slug, title }) => {
            const Icon = serviceIcons[slug] ?? Sparkles;
            return (
              <li
                key={slug}
                title={title}
                className="flex size-11 items-center justify-center rounded-full bg-sky-100 text-navy"
              >
                <Icon aria-hidden="true" className="size-5" />
                <span className="sr-only">{title}</span>
              </li>
            );
          })}
        </ul>
      </StaggerItem>

      {/* 3) Destinations */}
      <StaggerItem className="flex flex-col justify-between gap-6 rounded-3xl bg-snow p-8">
        <div>
          <p className="text-6xl font-semibold text-navy">
            <CountUp value={cities.length} />
          </p>
          <p className="mt-2 text-lg font-semibold text-navy">
            {labels.destinations}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <li
              key={city}
              className="rounded-full bg-red/10 px-3.5 py-1.5 text-sm font-medium text-red"
            >
              {city}
            </li>
          ))}
        </ul>
      </StaggerItem>

      {/* 4) Activities — wide red card */}
      <StaggerItem className="flex flex-col gap-6 rounded-3xl bg-red p-8 text-white sm:flex-row sm:items-center sm:justify-between lg:col-span-2">
        <div className="flex items-center gap-5">
          <p className="text-6xl font-semibold">
            <CountUp value={activities} />
          </p>
          <p className="text-lg font-semibold">{labels.activities}</p>
        </div>
        <Link
          href="/events"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-red transition-colors hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
        >
          {labels.activitiesCta}
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </Link>
      </StaggerItem>
    </Stagger>
  );
}
