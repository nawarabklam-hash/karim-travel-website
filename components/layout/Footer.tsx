import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { contact, shortAddress } from "@/content/contact";
import { navItems } from "./navItems";
import { Mail } from "lucide-react";
import { emailLink } from "@/lib/links";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";

const contactRow =
  "inline-flex items-center gap-2.5 text-white/75 transition-colors hover:text-white";
const contactIcon =
  "flex size-7 shrink-0 items-center justify-center rounded-full text-white";

export default async function Footer() {
  const t = await getTranslations();
  const locale = (await getLocale()) as "ar" | "en";

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Image
            src="/logo/karim-emblem.webp"
            alt={t("site.name")}
            width={800}
            height={750}
            sizes="120px"
            className="h-auto w-[120px]"
          />
          <p className="mt-2 text-sm text-white/70">{t("site.tagline")}</p>
          <p className="mt-2 text-sm text-white/70">{shortAddress(locale)}</p>
        </div>

        <nav aria-label={t("footer.quickLinks")}>
          <p className="font-semibold">{t("footer.quickLinks")}</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold">{t("footer.contact")}</p>
          {/* No phone number or Telegram by client decision: WhatsApp and email only */}
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <WhatsAppLink
                message={t("whatsapp.defaultMessage")}
                location="footer"
                className={contactRow}
              >
                <span className={`${contactIcon} bg-whatsapp`}>
                  <WhatsAppIcon className="size-4" />
                </span>
                <span className="sr-only">{t("footer.whatsapp")}</span>
                <span dir="ltr" className="tabular-nums">
                  {contact.phoneDisplay}
                </span>
              </WhatsAppLink>
            </li>
            <li>
              <a href={emailLink()} className={contactRow}>
                <span className={`${contactIcon} bg-white/10`}>
                  <Mail aria-hidden="true" className="size-4" />
                </span>
                <span className="sr-only">{t("footer.email")}</span>
                <span dir="ltr">{contact.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/60">
          © {new Date().getFullYear()} {t("site.name")}. {t("footer.rights")}
          {contact.showLegalInfo && (
            <span className="mt-1 block">
              {t("footer.legal", {
                name: contact.legal.name,
                inn: contact.legal.inn,
              })}
            </span>
          )}
        </p>
      </div>
    </footer>
  );
}
