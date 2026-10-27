export type HeroSlide = {
  slug: string;
  /** Path under public/. Slides without an image are skipped. */
  image?: string;
  /** CSS object-position: the part of the photo that must stay visible when cropped. */
  position?: string;
  alt: { ar: string; en: string };
};

// Adding a photo to the hero = adding an entry here; no component changes needed.
// Only photos the user picked for the hero go here — trip photos stay in content/trips.ts.
export const heroSlides: HeroSlide[] = [
  {
    slug: "moscow-st-basil",
    image: "/images/hero/moscow-st-basil.webp",
    position: "30% 45%",
    alt: {
      ar: "كاتدرائية القديس باسيل في الساحة الحمراء، موسكو",
      en: "Saint Basil's Cathedral on Red Square, Moscow",
    },
  },
  {
    slug: "moscow-kremlin",
    image: "/images/hero/moscow-kremlin.webp",
    position: "60% 35%",
    alt: {
      ar: "برج سباسكايا في الكرملين، موسكو",
      en: "The Spasskaya Tower of the Kremlin, Moscow",
    },
  },
  {
    slug: "moscow-christ-saviour",
    image: "/images/hero/moscow-christ-saviour.webp",
    position: "40% 45%",
    alt: {
      ar: "كاتدرائية المسيح المخلّص، موسكو",
      en: "Cathedral of Christ the Saviour, Moscow",
    },
  },
  {
    slug: "moscow-city",
    image: "/images/hero/moscow-city.webp",
    position: "50% 55%",
    alt: {
      ar: "أبراج موسكو سيتي وقت الغروب",
      en: "Moscow City skyline at sunset",
    },
  },
  {
    slug: "moscow-historical-museum",
    image: "/images/hero/moscow-historical-museum.webp",
    position: "50% 35%",
    alt: {
      ar: "المتحف التاريخي في الساحة الحمراء، موسكو",
      en: "The State Historical Museum on Red Square, Moscow",
    },
  },
  {
    slug: "sochi-beach",
    image: "/images/sochi/sochi-beach-olympic-park.webp",
    position: "60% 55%",
    alt: {
      ar: "شاطئ سوتشي على البحر الأسود والحديقة الأولمبية",
      en: "Sochi's Black Sea beach and the Olympic Park",
    },
  },
  {
    slug: "sochi-mountains",
    image: "/images/sochi/sochi-mountains-ski.webp",
    position: "45% 40%",
    alt: {
      ar: "جبال كراسنايا بوليانا المثلجة ومنحدرات التزلج، سوتشي",
      en: "The snowy Krasnaya Polyana mountains and ski slopes, Sochi",
    },
  },
  {
    slug: "kazan-kul-sharif",
    image: "/images/hero/kazan-kul-sharif.webp",
    position: "60% 40%",
    alt: {
      ar: "مسجد قول شريف في كرملين قازان",
      en: "Kul Sharif Mosque in the Kazan Kremlin",
    },
  },
];
