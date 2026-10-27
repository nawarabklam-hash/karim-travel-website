import {
  CableCar,
  Car,
  CardSim,
  Headset,
  Ship,
  Tent,
  TrainFront,
  UserRound,
  Van,
  type LucideIcon,
} from "lucide-react";

type Localized = { ar: string; en: string };

export type TripImage = {
  src: string;
  alt: Localized;
  /** CSS object-position: the part that must stay visible when cropped. */
  position?: string;
};

export type TripHotel = {
  /** Omit for stays that aren't a named hotel (e.g. cabins); `city` is shown alone. */
  name?: string;
  city: Localized;
  stars?: number;
  /** Meal plan, e.g. breakfast included. Omit when the offer doesn't state it. */
  board?: Localized;
};

export type TripService = { icon: LucideIcon; label: Localized };

export type Trip = {
  slug: string;
  /** As written on the client's poster. */
  title: Localized;
  city: Localized;
  /** One sentence, used on the detail page and in search/share metadata. */
  summary: Localized;
  coverImage: TripImage;
  /** 3–4 photos related to the trip. */
  gallery: TripImage[];
  hotels: TripHotel[];
  included: TripService[];
  extras: TripService[];
};

// ---------------------------------------------------------------------------
// Shared building blocks, worded once.

const img = {
  stBasil: {
    src: "/images/hero/moscow-st-basil.webp",
    alt: {
      ar: "كاتدرائية القديس باسيل في الساحة الحمراء، موسكو",
      en: "Saint Basil's Cathedral on Red Square, Moscow",
    },
    position: "30% 45%",
  },
  kremlin: {
    src: "/images/hero/moscow-kremlin.webp",
    alt: {
      ar: "برج سباسكايا في الكرملين، موسكو",
      en: "The Spasskaya Tower of the Kremlin, Moscow",
    },
    position: "60% 35%",
  },
  christSaviour: {
    src: "/images/hero/moscow-christ-saviour.webp",
    alt: {
      ar: "كاتدرائية المسيح المخلّص، موسكو",
      en: "Cathedral of Christ the Saviour, Moscow",
    },
    position: "40% 45%",
  },
  moscowCity: {
    src: "/images/hero/moscow-city.webp",
    alt: {
      ar: "أبراج موسكو سيتي وقت الغروب",
      en: "Moscow City skyline at sunset",
    },
    position: "50% 55%",
  },
  historicalMuseum: {
    src: "/images/hero/moscow-historical-museum.webp",
    alt: {
      ar: "المتحف التاريخي في الساحة الحمراء، موسكو",
      en: "The State Historical Museum on Red Square, Moscow",
    },
    position: "50% 35%",
  },
  kremlinNight: {
    src: "/images/hero/moscow-kremlin-night.webp",
    alt: {
      ar: "الكرملين ليلاً من ضفاف نهر موسكو",
      en: "The Kremlin at night from the Moscow River",
    },
    position: "60% 55%",
  },
  sapsan: {
    src: "/images/services/sapsan-train.webp",
    alt: {
      ar: "قطار سابسان السريع بين موسكو وسانت بطرسبرغ",
      en: "The Sapsan high-speed train between Moscow and Saint Petersburg",
    },
    position: "65% 60%",
  },
  // Illustrative only (a coupé, not the actual transfer car); licence plate blurred.
  mercedes: {
    src: "/images/services/mercedes-black.webp",
    alt: {
      ar: "سيارة مرسيدس سوداء فاخرة",
      en: "A black luxury Mercedes",
    },
    position: "55% 55%",
  },
  // Generic room photo — not one of the trips' named hotels, so never label it as one.
  hotelRoom: {
    src: "/images/hotels/hotel-room-oriental.webp",
    alt: {
      ar: "غرفة فندقية بتصميم شرقي",
      en: "A hotel room with oriental-style decor",
    },
    position: "45% 55%",
  },
  cableCar: {
    src: "/images/hero/moscow-cable-car.webp",
    alt: {
      ar: "تلفريك موسكو فوق النهر عند تلال سبارو",
      en: "The Moscow cable car over the river at Sparrow Hills",
    },
    position: "65% 45%",
  },
  moscowRiver: {
    src: "/images/hero/moscow-river-sunset.webp",
    alt: {
      ar: "رحلة نهرية على نهر موسكو وقت الغروب",
      en: "A river cruise on the Moscow River at sunset",
    },
    position: "40% 70%",
  },
  palaceSquare: {
    src: "/images/saint-petersburg/palace-square.webp",
    alt: {
      ar: "ساحة القصر وقصر الشتاء (الأرميتاج)، سانت بطرسبرغ",
      en: "Palace Square and the Winter Palace (Hermitage), Saint Petersburg",
    },
    position: "40% 65%",
  },
  winterPalace: {
    src: "/images/saint-petersburg/winter-palace-embankment.webp",
    alt: {
      ar: "قصر الشتاء على ضفاف نهر نيفا، سانت بطرسبرغ",
      en: "The Winter Palace on the Neva embankment, Saint Petersburg",
    },
    position: "60% 50%",
  },
  // The Hotel Astoria sign is on the right: keep the crop on the cathedral and
  // never present this as one of the trips' hotels.
  isaacsNight: {
    src: "/images/saint-petersburg/st-isaacs-night.webp",
    alt: {
      ar: "كاتدرائية القديس إسحاق ليلاً، سانت بطرسبرغ",
      en: "Saint Isaac's Cathedral at night, Saint Petersburg",
    },
    position: "30% 50%",
  },
  moikaWinter: {
    src: "/images/saint-petersburg/moika-winter.webp",
    alt: {
      ar: "قناة مويكا في الشتاء وقبة كاتدرائية إسحاق، سانت بطرسبرغ",
      en: "The Moika canal in winter with Saint Isaac's dome, Saint Petersburg",
    },
    position: "45% 40%",
  },
  cabinInterior: {
    src: "/images/cabins/cabin-interior.webp",
    alt: {
      ar: "غرفة نوم دافئة داخل كوخ خشبي",
      en: "A cosy bedroom inside a wooden cabin",
    },
    position: "50% 55%",
  },
  cabinValley: {
    src: "/images/cabins/wooden-house-winter-valley.webp",
    alt: {
      ar: "كوخ خشبي في وادٍ مغطّى بالثلج",
      en: "A wooden cabin in a snow-covered valley",
    },
    position: "55% 55%",
  },
  cabinForest: {
    src: "/images/cabins/log-cabin-forest.webp",
    alt: {
      ar: "كوخ خشبي وسط غابة الصنوبر",
      en: "A log cabin in a pine forest",
    },
    position: "50% 55%",
  },
  cabinSnowfall: {
    src: "/images/cabins/log-cabin-snowfall.webp",
    alt: {
      ar: "كوخ خشبي في الغابة تحت تساقط الثلج",
      en: "A log cabin in the forest under falling snow",
    },
    position: "40% 45%",
  },
  cabinHillside: {
    src: "/images/cabins/cabin-snowy-hillside.webp",
    alt: {
      ar: "كوخ ريفي على تلة مغطّاة بالثلج",
      en: "A rustic cabin on a snowy hillside",
    },
    position: "60% 65%",
  },
} satisfies Record<string, TripImage>;

const moscow = { ar: "موسكو", en: "Moscow" };
const saintPetersburg = { ar: "سانت بطرسبرغ", en: "Saint Petersburg" };
const breakfast = { ar: "شامل الإفطار", en: "Breakfast included" };

const hotel = {
  mercureArbat: {
    name: "Mercure Arbat",
    city: moscow,
    stars: 4,
    board: breakfast,
  },
  expressSadovaya: {
    name: "Express Sadovaya",
    city: saintPetersburg,
    stars: 4,
    board: breakfast,
  },
} satisfies Record<string, TripHotel>;

const service = {
  tours4: {
    icon: UserRound,
    label: {
      ar: "أربع جولات سياحية مع سائق عربي",
      en: "Four sightseeing tours with an Arabic-speaking driver",
    },
  },
  tours3: {
    icon: UserRound,
    label: {
      ar: "ثلاث جولات سياحية مع سائق عربي",
      en: "Three sightseeing tours with an Arabic-speaking driver",
    },
  },
  train: {
    icon: TrainFront,
    label: {
      ar: "تذاكر القطار بين موسكو وسانت بطرسبرغ",
      en: "Train tickets between Moscow and Saint Petersburg",
    },
  },
  vip: {
    icon: Car,
    label: {
      ar: "استقبال وتوديع المطار بسيارة مرسيدس VIP",
      en: "VIP Mercedes airport pick-up and drop-off",
    },
  },
  cruise: {
    icon: Ship,
    label: {
      ar: "رحلة في كروز راديسون الملكي البانورامي",
      en: "Radisson Royal panoramic river cruise",
    },
  },
  circus: {
    icon: Tent,
    label: { ar: "تذاكر سيرك موسكو العظيم", en: "Great Moscow Circus tickets" },
  },
  cableCar: {
    icon: CableCar,
    label: {
      ar: "تذاكر التلفريك فوق نهر موسكو",
      en: "Cable car over the Moscow River",
    },
  },
  simOpen: {
    icon: CardSim,
    label: {
      ar: "شرائح اتصال وإنترنت مفتوح",
      en: "Local SIM cards with open internet",
    },
  },
  simUnlimited: {
    icon: CardSim,
    label: {
      ar: "شرائح اتصال وإنترنت لا محدود",
      en: "Local SIM cards with unlimited internet",
    },
  },
  stationTransfers: {
    icon: TrainFront,
    label: { ar: "توصيلات محطة القطار", en: "Train station transfers" },
  },
  cabinTransfers: {
    icon: Van,
    label: {
      ar: "التوصيل والعودة من الأكواخ",
      en: "Transfers to and from the cabins",
    },
  },
  support: {
    icon: Headset,
    label: { ar: "دعم على مدار 24 ساعة", en: "24/7 support" },
  },
} satisfies Record<string, TripService>;

// ---------------------------------------------------------------------------
// Adding a trip = adding one entry below; the card and detail page pick it up.
// Content rebuilt from the client's 4 RUSSIA4U posters. No prices given yet.
// TODO: photos of the cruise, the circus and the cable car are still needed.
// The cabin photos are representative, not the client's actual cabins — swap them
// for real ones if the client has them.

export const trips: Trip[] = [
  {
    slug: "moscow-saint-petersburg",
    title: {
      ar: "عرض شامل في موسكو وسانت بطرسبرغ",
      en: "All-inclusive offer: Moscow & Saint Petersburg",
    },
    city: { ar: "موسكو · سانت بطرسبرغ", en: "Moscow · Saint Petersburg" },
    summary: {
      ar: "مدينتان في رحلة واحدة: فنادق أربع نجوم مع الإفطار، وجولات مع سائق عربي، وتذاكر القطار بينهما.",
      en: "Two cities in one trip: 4-star hotels with breakfast, tours with an Arabic-speaking driver and train tickets between them.",
    },
    coverImage: img.palaceSquare,
    gallery: [img.palaceSquare, img.stBasil, img.sapsan, img.hotelRoom],
    hotels: [hotel.mercureArbat, hotel.expressSadovaya],
    included: [service.tours4, service.train, service.vip],
    extras: [
      service.circus,
      service.simOpen,
      service.cableCar,
      service.cruise,
      service.stationTransfers,
    ],
  },
  {
    slug: "moscow-cabins",
    title: { ar: "عرض موسكو والأكواخ", en: "Moscow & the forest cabins" },
    city: { ar: "موسكو · الأكواخ", en: "Moscow · Forest cabins" },
    summary: {
      ar: "رحلة تجمع بين رفاهية المدينة وسحر الطبيعة.",
      en: "A trip that brings together city comfort and the magic of nature.",
    },
    coverImage: img.cabinSnowfall,
    gallery: [
      img.cabinSnowfall,
      img.cabinInterior,
      img.moscowRiver,
      img.cabinValley,
    ],
    hotels: [
      {
        city: { ar: "الأكواخ وسط الطبيعة", en: "Cabins in the forest" },
        board: breakfast,
      },
      { name: "Mercure Arbat", city: moscow, stars: 4 },
    ],
    included: [
      service.cabinTransfers,
      service.vip,
      service.tours3,
      service.cruise,
      service.circus,
      service.simUnlimited,
      service.cableCar,
      service.support,
    ],
    extras: [],
  },
  {
    slug: "moscow-saint-petersburg-cabins",
    title: {
      ar: "عرض موسكو وسانت بطرسبرغ والأكواخ",
      en: "Moscow, Saint Petersburg & the cabins",
    },
    city: {
      ar: "موسكو · سانت بطرسبرغ · الأكواخ",
      en: "Moscow · Saint Petersburg · Cabins",
    },
    summary: {
      ar: "العاصمة وسانت بطرسبرغ وإقامة مميزة في الأكواخ، مع الجولات والتنقلات كلها مرتّبة.",
      en: "The capital, Saint Petersburg and a special stay in the cabins, with tours and transfers all arranged.",
    },
    coverImage: img.stBasil,
    gallery: [
      img.stBasil,
      img.winterPalace,
      img.cabinInterior,
      img.mercedes,
    ],
    hotels: [
      hotel.mercureArbat,
      hotel.expressSadovaya,
      {
        city: {
          ar: "إقامة مميزة في الأكواخ",
          en: "A special stay in the cabins",
        },
      },
    ],
    included: [
      service.cruise,
      service.cableCar,
      service.circus,
      service.vip,
      service.train,
      service.tours4,
      service.simOpen,
      service.stationTransfers,
      service.cabinTransfers,
    ],
    extras: [],
  },
  {
    slug: "moscow",
    title: { ar: "عرض موسكو", en: "Moscow offer" },
    city: moscow,
    summary: {
      ar: "رحلة استثنائية إلى قلب روسيا.",
      en: "An exceptional trip to the heart of Russia.",
    },
    coverImage: img.historicalMuseum,
    gallery: [
      img.historicalMuseum,
      img.kremlinNight,
      img.moscowRiver,
      img.cableCar,
    ],
    hotels: [hotel.mercureArbat],
    included: [
      service.vip,
      {
        icon: UserRound,
        label: {
          ar: "ثلاث جولات سياحية مع سائق، كل جولة 8 ساعات",
          en: "Three 8-hour sightseeing tours with a driver",
        },
      },
      service.cruise,
      service.circus,
      service.cableCar,
      service.simUnlimited,
      service.support,
    ],
    extras: [],
  },
];

export const getTrip = (slug: string) => trips.find((t) => t.slug === slug);
