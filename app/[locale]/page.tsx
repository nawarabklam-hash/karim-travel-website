import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { ogImage, pageMetadata } from "@/lib/seo";
import { brandName } from "@/lib/site";
import MotionProvider from "@/components/motion/MotionProvider";
import Hero from "@/components/sections/home/Hero";
import Trips from "@/components/sections/home/Trips";
import Services from "@/components/sections/home/Services";
import Destinations from "@/components/sections/home/Destinations";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "",
    // The layout title template does not apply to its own page, so add the brand here.
    title: t("home.title") + " | " + brandName,
    description: t("home.description"),
    image: ogImage(locale, "home"),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  return (
    <MotionProvider>
      <Hero />
      <Trips />
      <Services />
      <Destinations />
    </MotionProvider>
  );
}
