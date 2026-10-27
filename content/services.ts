type Localized = { ar: string; en: string };

export type Service = {
  slug: string;
  title: Localized;
  description: Localized;
  /** Circular photo next to the service (public/images/services/<slug>.webp). */
  image: string;
  /** CSS object-position: the part of the photo that must stay visible when cropped. */
  imagePosition?: string;
};

// Adding or editing a service = editing this list; no component changes needed.
// Order here is the order shown on the page.
// TODO: confirm the short descriptions with the client.
export const services: Service[] = [
  {
    slug: "car-rental",
    title: { ar: "تأجير السيارات", en: "Car rental" },
    description: {
      ar: "سيارات لتنقّلاتك داخل المدينة وبين المدن، حسب برنامج رحلتك.",
      en: "Cars for getting around town and between cities, matched to your itinerary.",
    },
    image: "/images/services/car-rental.webp",
    imagePosition: "60% 55%",
  },
  {
    slug: "hotel-bookings",
    title: { ar: "حجز الفنادق", en: "Hotel bookings" },
    description: {
      ar: "نحجز لك فندقاً يناسب ميزانيتك وقريباً من الأماكن التي تريد زيارتها.",
      en: "Hotels that fit your budget, close to the places you want to see.",
    },
    image: "/images/services/hotel-bookings.webp",
    imagePosition: "55% 60%",
  },
  {
    slug: "visa",
    title: { ar: "إصدار الفيزا", en: "Visa issuance" },
    description: {
      ar: "نساعدك في تجهيز أوراق الفيزا الروسية ومتابعة طلبك خطوة بخطوة.",
      en: "Help preparing your Russian visa documents and following up on your application.",
    },
    image: "/images/services/visa.webp",
    imagePosition: "45% 50%",
  },
  {
    slug: "tour-programs",
    title: { ar: "البرامج السياحية", en: "Tour programs" },
    description: {
      ar: "برامج مرتّبة يوماً بيوم لأجمل المدن الروسية، تناسب العائلات والأفراد.",
      en: "Day-by-day programs through Russia's finest cities, for families and solo travellers.",
    },
    image: "/images/services/tour-programs.webp",
    imagePosition: "50% 60%",
  },
  {
    slug: "study",
    title: { ar: "خدمات الدراسة", en: "Study services" },
    description: {
      ar: "نرافقك من اختيار الجامعة حتى التسجيل والوصول إلى روسيا.",
      en: "Support from choosing a university through enrolment and arriving in Russia.",
    },
    image: "/images/services/study.webp",
    imagePosition: "50% 45%",
  },
];
