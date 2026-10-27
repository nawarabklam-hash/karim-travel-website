import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { trips } from "@/content/trips";
import TripCard from "@/components/trips/TripCard";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import {
  siteContainer,
  siteGutter,
  siteInset,
} from "@/components/layout/container";

export default async function Trips() {
  const t = await getTranslations("home.trips");
  const locale = (await getLocale()) as AppLocale;

  return (
    <section
      id="trips"
      aria-labelledby="trips-title"
      className={`${siteGutter} scroll-mt-24 bg-snow py-20 sm:py-24`}
    >
      <div className={`${siteContainer} ${siteInset}`}>
        <p className="flex items-center gap-3 font-calligraphy text-xl text-red">
          <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-red" />
          {t("eyebrow")}
        </p>
        <WordReveal
          as="h2"
          id="trips-title"
          trigger="view"
          text={t("title")}
          className="mt-3 font-calligraphy text-4xl leading-[1.5] font-bold text-navy sm:text-5xl"
        />
        <Reveal>
          <p className="mt-3 max-w-xl text-base text-navy/70 sm:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        <Stagger
          as="ul"
          stagger={0.12}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trips.map((trip) => (
            <StaggerItem as="li" key={trip.slug}>
              <TripCard
                trip={trip}
                locale={locale}
                seeMoreLabel={t("seeMore")}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
