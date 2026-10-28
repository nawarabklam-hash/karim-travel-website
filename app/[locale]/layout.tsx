import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { directionOf, routing, type AppLocale } from "@/i18n/routing";
import { brandName, isProduction, siteUrl } from "@/lib/site";
import { ogImage, ogLocale } from "@/lib/seo";
import { contact } from "@/content/contact";
import JsonLd from "@/components/seo/JsonLd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { seenScript } from "@/lib/motion/seen";
import { fontVariables } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#0B2A5B" };

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    // Makes relative image paths absolute (share images, trip covers).
    metadataBase: new URL(siteUrl),
    title: { default: t("home.title"), template: `%s | ${brandName}` },
    description: t("home.description"),
    applicationName: brandName,
    openGraph: {
      type: "website",
      siteName: brandName,
      locale: ogLocale[locale],
      images: [ogImage(locale, "home")],
    },
    twitter: { card: "summary_large_image" },
    // Only the production domain is indexed; previews/staging are hidden.
    robots: isProduction
      ? { index: true, follow: true }
      : { index: false, follow: false },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

/** Site-wide TravelAgency (the Ajman office). */
function organizationJsonLd(locale: AppLocale) {
  const o = contact.office;
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${siteUrl}/#organization`,
    name: brandName,
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}${ogImage(locale, "home")}`,
    telephone: contact.phone,
    email: contact.email,
    foundingDate: "2018",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${o.building.en}, ${o.floor.en}, Office ${o.unit}, ${o.street.en}`,
      addressLocality: o.city.en,
      addressCountry: "AE",
    },
  };
}

function websiteJsonLd(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandName,
    url: `${siteUrl}/${locale}`,
    inLanguage: locale,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={directionOf(locale)}
      className={`${fontVariables} h-full scroll-smooth antialiased`}
      // Smooth scrolling stays for in-page links, but a page change starts at the top at once
      // (otherwise the new page "slides up" from the old scroll position).
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* Without JavaScript nothing can animate in: show everything */}
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
        {/* Runs before the first paint: a page already seen this session skips its entrance */}
        <script dangerouslySetInnerHTML={{ __html: seenScript }} />
        <JsonLd data={organizationJsonLd(locale)} />
        <JsonLd data={websiteJsonLd(locale)} />
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
      {/* GA4 loads only when an ID is configured */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
