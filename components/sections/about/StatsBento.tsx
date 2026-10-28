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
      <StaggerItem className="relative isolate flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl bg-navy p-5 text-white md:min-h-80 md:p-8 lg:row-span-2">
        <span
          aria-hidden="true"
          dir="ltr"
          className="pointer-events-none absolute -end-4 -bottom-12 -z-10 text-[6rem] leading-none font-semibold text-white/5 select-none md:text-[12rem]"
        >
          {years}
        </span>
        <Trophy
          aria-hidden="true"
          className="size-8 text-amber-400 md:size-10"
        />
        <div>
          <p className="text-4xl font-semibold md:text-7xl">
            <CountUp value={years} prefix="+" prefixClassName="text-red-300" />
          </p>
          <p className="mt-2 text-lg font-semibold md:mt-3 md:text-xl">
            {labels.years}
          </p>
          <p className="mt-1 text-sm text-sky-200/90 md:text-base">
            {labels.yearsNote}
          </p>
        </div>
      </StaggerItem>

      {/* 2) Services */}
      <StaggerItem className="flex flex-col justify-between gap-4 rounded-3xl bg-snow p-5 md:gap-6 md:p-8">
        <div>
          <p className="text-3xl font-semibold text-navy md:text-6xl">
            <CountUp value={services.length} />
          </p>
          <p className="mt-1 text-base font-semibold text-navy md:mt-2 md:text-lg">
            {labels.services}
          </p>
        </div>
        <ul className="flex flex-wrap gap-1.5 md:gap-2">
          {services.map(({ slug, title }) => {
            const Icon = serviceIcons[slug] ?? Sparkles;
            return (
              <li
                key={slug}
                title={title}
                className="flex size-9 items-center justify-center rounded-full bg-sky-100 text-navy md:size-11"
              >
                <Icon aria-hidden="true" className="size-4 md:size-5" />
                <span className="sr-only">{title}</span>
              </li>
            );
          })}
        </ul>
      </StaggerItem>

      {/* 3) Destinations */}
      <StaggerItem className="flex flex-col justify-between gap-4 rounded-3xl bg-snow p-5 md:gap-6 md:p-8">
        <div>
          <p className="text-3xl font-semibold text-navy md:text-6xl">
            <CountUp value={cities.length} />
          </p>
          <p className="mt-1 text-base font-semibold text-navy md:mt-2 md:text-lg">
            {labels.destinations}
          </p>
        </div>
        <ul className="flex flex-wrap gap-1.5 md:gap-2">
          {cities.map((city) => (
            <li
              key={city}
              className="rounded-full bg-red/10 px-3 py-1 text-xs font-medium text-red md:px-3.5 md:py-1.5 md:text-sm"
            >
              {city}
            </li>
          ))}
        </ul>
      </StaggerItem>

      {/* 4) Activities — wide red card */}
      <StaggerItem className="flex flex-col gap-4 rounded-3xl bg-red p-5 text-white sm:flex-row sm:items-center sm:justify-between md:gap-6 md:p-8 lg:col-span-2">
        <div className="flex items-center gap-4 md:gap-5">
          <p className="text-3xl font-semibold md:text-6xl">
            <CountUp value={activities} />
          </p>
          <p className="text-base font-semibold md:text-lg">
            {labels.activities}
          </p>
        </div>
        <Link
          href="/events"
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-red md:px-6 md:py-3 transition-colors hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
        >
          {labels.activitiesCta}
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </Link>
      </StaggerItem>
    </Stagger>
  );
}
