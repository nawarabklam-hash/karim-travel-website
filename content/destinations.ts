type Localized = { ar: string; en: string };

export type Destination = {
  slug: string;
  name: Localized;
  /** One short line about the city — general facts only, no prices or claims. */
  tagline: Localized;
  /** Path under public/. Omit until a photo exists; the card falls back to navy. */
  image?: string;
  /** CSS object-position: the part of the photo that must stay visible when cropped. */
  imagePosition?: string;
};

// Adding a destination = adding an entry here; no component changes needed.
// TODO: a real northern-lights photo would suit the Murmansk card best.
export const destinations: Destination[] = [
  {
    slug: "moscow",
    name: { ar: "موسكو", en: "Moscow" },
    tagline: {
      ar: "العاصمة: الساحة الحمراء والكرملين ومتاحف عالمية.",
      en: "The capital: Red Square, the Kremlin and world-class museums.",
    },
    image: "/images/destinations/moscow-st-basil-day.webp",
    imagePosition: "50% 40%",
  },
  {
    slug: "saint-petersburg",
    name: { ar: "سانت بطرسبرغ", en: "Saint Petersburg" },
    tagline: {
      ar: "مدينة القصور والقنوات ومتحف الأرميتاج.",
      en: "A city of palaces, canals and the Hermitage.",
    },
    image: "/images/destinations/saint-petersburg-winter-palace.webp",
    imagePosition: "60% 55%",
  },
  {
    slug: "sochi",
    name: { ar: "سوتشي", en: "Sochi" },
    tagline: {
      ar: "شواطئ البحر الأسود صيفاً، وجبال التزلج شتاءً.",
      en: "Black Sea beaches in summer, ski slopes in winter.",
    },
    // Bolshoy Ice Dome, Olympic Park; licence plate blurred.
    image: "/images/destinations/sochi-ice-dome.webp",
    imagePosition: "45% 50%",
  },
  {
    slug: "murmansk",
    name: { ar: "مورمانسك", en: "Murmansk" },
    tagline: {
      ar: "بوابة القطب الشمالي ومكان مشاهدة الشفق القطبي.",
      en: "Gateway to the Arctic and a place to see the northern lights.",
    },
    // Khibiny mountains (Kirovsk area), Murmansk region — not Murmansk city itself.
    image: "/images/destinations/murmansk-region-khibiny.webp",
    imagePosition: "50% 40%",
  },
];
