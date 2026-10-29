import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { navItems } from "./navItems";
import HeaderShell from "./HeaderShell";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  const t = await getTranslations();

  return (
    <HeaderShell>
      {/* The client's full emblem (public/logo/, made by scripts/make-logo.mjs). It is taller
          than the bar and rises a few px above it; the bottom edge sits just inside the bar.
          The header's top padding (pt-3 / sm:pt-4) keeps it fully on screen. */}
      <Link
        href="/"
        className="relative h-full w-[75px] justify-self-start sm:w-[86px]"
      >
        <Image
          src="/logo/karim-emblem.webp"
          alt={t("site.name")}
          width={800}
          height={750}
          priority
          sizes="86px"
          className="absolute start-0 bottom-[3px] h-[70px] w-auto max-w-none sm:bottom-1 sm:h-20"
        />
      </Link>

      <nav aria-label={t("nav.label")} className="hidden md:block">
        <ul className="flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="rounded-full px-3 py-2 text-[0.95rem] text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {t(`nav.${item.key}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-1 justify-self-end sm:gap-2">
        <LanguageSwitcher />
        <MobileMenu />
      </div>
    </HeaderShell>
  );
}
