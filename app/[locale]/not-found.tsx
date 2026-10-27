import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-7xl font-bold text-red">404</p>
      <h1 className="mt-4 text-2xl font-bold">{t("title")}</h1>
      <p className="mt-3 text-navy/70">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-red px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
