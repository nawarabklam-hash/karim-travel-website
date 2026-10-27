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
      {/* TODO: replace with the client's logo from public/logo/ */}
      <Link
        href="/"
        className="justify-self-start text-lg font-bold text-white sm:text-xl"
      >
        {t("site.name")}
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
