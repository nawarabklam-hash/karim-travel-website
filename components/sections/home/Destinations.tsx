import Image from "next/image";
import { MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { destinations } from "@/content/destinations";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import {
  siteContainer,
  siteGutter,
  siteInset,
} from "@/components/layout/container";

/** Grid placement per card, by position in content/destinations.ts. */
const BENTO = ["md:row-span-2", "md:col-span-2"];

export default async function Destinations() {
  const t = await getTranslations("home.destinations");
  const locale = (await getLocale()) as AppLocale;

  return (
    <section
      id="destinations"
      aria-labelledby="destinations-title"
      className={`${siteGutter} scroll-mt-24 py-20 sm:py-24`}
    >
      <div className={`${siteContainer} ${siteInset}`}>
        <p className="flex items-center gap-3 font-calligraphy text-xl text-red">
          <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-red" />
          {t("eyebrow")}
        </p>
        <WordReveal
          as="h2"
          id="destinations-title"
          trigger="view"
          text={t("title")}
          className="mt-3 font-calligraphy text-4xl leading-[1.5] font-bold text-navy sm:text-5xl"
        />
        <Reveal>
          <p className="mt-3 max-w-xl text-base text-navy/70 sm:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        {/* Bento: first card tall (2 rows), second wide (2 columns), the rest fill in */}
        <Stagger
          as="ul"
          stagger={0.15}
          className="mt-12 grid gap-4 md:h-[34rem] md:grid-cols-3 md:grid-rows-2 lg:h-[38rem]"
        >
          {destinations.map((d, i) => {
            const name = d.name[locale];
            return (
              <StaggerItem
                as="li"
                variant="clipUp"
                key={d.slug}
                className={BENTO[i] ?? ""}
              >
                <WhatsAppLink
                  message={t("whatsappMessage", { city: name })}
                  location="home_destination"
                  params={{ city: d.slug }}
                  aria-label={t("cardLabel", { city: name })}
                  className="group relative isolate flex aspect-[4/3] h-full flex-col justify-end overflow-hidden rounded-2xl bg-linear-to-br from-navy via-[#1f4f94] to-[#4a80c4] p-5 text-white shadow-sm transition-shadow duration-200 hover:shadow-xl hover:shadow-navy/20 focus-visible:ring-2 focus-visible:ring-red/50 focus-visible:outline-none md:aspect-auto"
                >
                  {d.image && (
                    <Image
                      src={d.image}
                      alt={name}
                      fill
                      sizes={
                        i < 2
                          ? "(min-width: 768px) 66vw, 100vw"
                          : "(min-width: 768px) 33vw, 100vw"
                      }
                      style={{ objectPosition: d.imagePosition }}
                      className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-linear-to-t from-black/60 via-black/5 to-transparent"
                  />

                  {/* The city name fades in after its panel has opened */}
                  <StaggerItem variant="fadeIn" delay={0.3}>
                    <span
                      aria-hidden="true"
                      className="block h-px w-10 bg-white/70"
                    />
                    <h3 className="mt-3 flex items-center gap-1.5 text-base font-bold">
                      <MapPin aria-hidden="true" className="size-4 shrink-0" />
                      {name}
                    </h3>
                    <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/80 sm:text-sm">
                      {d.tagline[locale]}
                    </p>
                  </StaggerItem>
                </WhatsAppLink>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
