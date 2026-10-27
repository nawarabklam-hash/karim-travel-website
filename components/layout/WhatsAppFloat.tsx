import { getTranslations } from "next-intl/server";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";

export default async function WhatsAppFloat() {
  const t = await getTranslations("whatsapp");

  return (
    <WhatsAppLink
      message={t("defaultMessage")}
      location="floating_button"
      aria-label={t("floatLabel")}
      title={t("floatLabel")}
      className="fixed bottom-5 end-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="size-7" />
    </WhatsAppLink>
  );
}
