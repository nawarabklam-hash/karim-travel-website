import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";

type Props = {
  title: string;
  subtitle: string;
  /** Pre-filled WhatsApp message. */
  message: string;
  buttonLabel: string;
  /** GA event location, e.g. "info_cta". */
  location: string;
};

/** Closing navy block with a WhatsApp button. Reusable on any page. */
export default function AskUsCta({
  title,
  subtitle,
  message,
  buttonLabel,
  location,
}: Props) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-navy p-8 md:flex-row md:items-center md:justify-between md:p-12">
      <div>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-base text-white/70 sm:text-lg">{subtitle}</p>
      </div>
      <WhatsAppLink
        message={message}
        location={location}
        className="inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-whatsapp px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition-[filter] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none md:w-auto"
      >
        <WhatsAppIcon className="size-5" />
        {buttonLabel}
      </WhatsAppLink>
    </div>
  );
}
