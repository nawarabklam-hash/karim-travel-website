// Source: old site https://www.russia-4u.com/about_us/ — no invented licences, addresses, team or customer counts.
// Page: /[locale]/about. Section texts live in messages/*.json (aboutPage).
import {
  BadgeCheck,
  Languages,
  Building2,
  Route,
  type LucideIcon,
} from "lucide-react";

type Localized = { ar: string; en: string };

/** Saint Petersburg rooftops with the Church of the Savior on Spilled Blood
 * (central tower under scaffolding in this photo). */
export const aboutHeroImage = "/images/about/saint-petersburg-rooftops.webp";
/** CSS object-position for the hero crop: keep the domes in view. */
export const aboutHeroAlt = {
  ar: "أسطح سانت بطرسبرغ وقباب كنيسة المخلّص على الدم المسفوك",
  en: "Saint Petersburg rooftops and the domes of the Church of the Savior on Spilled Blood",
};
export const aboutHeroPosition = "50% 38%";

/** "Our story": large = Palace Bridge and the Admiralty spire, small = Gazprom Arena
 * (a 2018 World Cup stadium). Both Saint Petersburg — a destination, not the office (Ajman). */
export const storyImages = {
  large: "/images/about/saint-petersburg-palace-bridge.webp",
  largePosition: "45% 55%",
  small: "/images/about/saint-petersburg-gazprom-arena.webp",
  largeAlt: {
    ar: "جسر القصر وبرج الأميرالية على نهر نيفا في سانت بطرسبرغ",
    en: "Palace Bridge and the Admiralty spire on the Neva, Saint Petersburg",
  },
  smallAlt: {
    ar: "ملعب غازبروم أرينا في سانت بطرسبرغ، أحد ملاعب كأس العالم 2018",
    en: "Gazprom Arena in Saint Petersburg, a 2018 World Cup stadium",
  },
  smallPosition: "40% 60%",
};

/** The year shown in the numbers strip; the other figures are counted from content/. */
export const foundedYear = 2018;

/** "Why choose us" heading block. */
export const whyIntro = {
  eyebrow: { ar: "لماذا تختارنا", en: "Why choose us" },
  title: { ar: "رحلتك بأيدٍ أمينة", en: "Your trip in safe hands" },
  text: {
    ar: "فريق عربي على الأرض في روسيا، يرتّب كل تفاصيل رحلتك.",
    en: "An Arabic-speaking team on the ground in Russia, arranging every detail of your trip.",
  },
};

/** Image beside "Why choose us": a family crossing by the Singer House on Nevsky
 * Prospekt, Saint Petersburg (licence plates blurred). */
export const whyImage = "/images/about/saint-petersburg-nevsky-family.webp";
/** CSS object-position: keep the family in the portrait crop. */
export const whyImageAlt = {
  ar: "عائلة تعبر الشارع أمام بيت سينغر في شارع نيفسكي بسانت بطرسبرغ",
  en: "A family crossing the street by the Singer House on Nevsky Prospekt, Saint Petersburg",
};
export const whyImagePosition = "68% 50%";

/** Two floating badges on the image. */
export const whyBadges = {
  licensed: {
    title: { ar: "مرخّصة رسمياً", en: "Officially licensed" },
    text: { ar: "في روسيا", en: "in Russia" },
  },
  team: {
    title: { ar: "فريق عربي", en: "Arabic-speaking team" },
    text: { ar: "على واتساب", en: "on WhatsApp" },
  },
};

export const whyUs: { icon: LucideIcon; title: Localized; text: Localized }[] =
  [
    {
      icon: BadgeCheck,
      title: { ar: "شركة مرخّصة", en: "Licensed" },
      text: {
        ar: "مسجّلة رسمياً في روسيا.",
        en: "Officially registered in Russia.",
      },
    },
    {
      icon: Building2,
      title: { ar: "مكتب في الخليج", en: "Office in the Gulf" },
      text: { ar: "في عجمان، الإمارات.", en: "In Ajman, UAE." },
    },
    {
      icon: Languages,
      title: { ar: "فريق عربي", en: "Arabic-speaking team" },
      text: { ar: "نتحدث لغتك.", en: "We speak your language." },
    },
    {
      icon: Route,
      title: { ar: "معك حت\u200dى النهاية", en: "With you all the way" },
      text: {
        ar: "من أول تواصل حت\u200dى العودة.",
        en: "From first contact to your return.",
      },
    },
  ];
