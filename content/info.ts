// Source: old site https://www.russia-4u.com/info/ and the "important info" section on https://www.russia-4u.com/
// Page: /[locale]/info. Every visible string on that page comes from here or messages/*.json.
// TODO: ask the client to confirm the figures from the old site (parks, sports
// facilities, library, residents) and the cash-in-dollars advice before launch.
import {
  Banknote,
  BookOpen,
  GraduationCap,
  HandCoins,
  Landmark,
  Plug,
  Thermometer,
  TrainFront,
  Trees,
  Trophy,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type Localized = { ar: string; en: string };
type IconText = { icon: LucideIcon; text: Localized };

/** Section A — four quick-fact tiles. */
export const quickFacts: {
  id: string;
  icon: LucideIcon;
  value: Localized;
  label: Localized;
  /** Explanation points under the label. */
  points: Localized[];
  /** Keep the value left-to-right (numbers with signs, units). */
  ltr?: boolean;
}[] = [
  {
    id: "climate",
    icon: Thermometer,
    value: { ar: "−20° / 35°", en: "−20° / 35°" },
    label: { ar: "أدنى وأعلى حرارة تقريباً", en: "Typical low / high" },
    points: [
      {
        ar: "الصيف من يونيو إلى أغسطس دافئ ورطب، وقد تصل الحرارة إلى 35 درجة في موجات الحر.",
        en: "Summer (June–August) is warm and humid, with heatwaves reaching 35°C.",
      },
      {
        ar: "الشتاء طويل وبارد مع ثلوج كثيفة، وقد تنخفض الحرارة إلى 20 تحت الصفر، ويمتد البرد حت\u200dى أواخر أبريل.",
        en: "Winter is long and snowy, can drop to −20°C, and the cold lasts until late April.",
      },
      {
        ar: "الربيع والخريف قصيران ومتقلّبان، فاحمل ملابس على طبقات ومظلة.",
        en: "Spring and autumn are short and changeable — pack layers and an umbrella.",
      },
      {
        ar: "في الشتاء: معطف ثقيل وقفازات وحذاء مقاوم للانزلاق.",
        en: "In winter: a heavy coat, gloves and non-slip shoes.",
      },
    ],
    ltr: true,
  },
  {
    id: "currency",
    icon: Banknote,
    value: { ar: "الروبل", en: "Ruble" },
    label: { ar: "العملة الرسمية", en: "Official currency" },
    points: [
      {
        ar: "العملة الرسمية الروبل (₽)، والروبل الواحد يساوي 100 كوبيك.",
        en: "The official currency is the ruble (₽); 1 ruble = 100 kopecks.",
      },
      {
        ar: "صرّف نقودك في البنوك أو مكاتب الصرافة الرسمية، وتجنّب الصرف في الشارع.",
        en: "Exchange money at banks or official exchange offices, never on the street.",
      },
      {
        ar: "اسأل عن سعر الصرف قبل التبديل، واحتفظ بالإيصال.",
        en: "Check the rate before exchanging and keep the receipt.",
      },
      {
        ar: "أمّن كمية كافية بالروبل للمواصلات والمشتريات اليومية.",
        en: "Keep enough rubles for transport and everyday purchases.",
      },
    ],
  },
  {
    id: "payment",
    icon: HandCoins,
    value: { ar: "نقداً $", en: "Cash USD" },
    label: { ar: "طريقة الدفع المنصوح بها", en: "Recommended payment" },
    points: [
      {
        ar: "بطاقات Visa وMastercard الأجنبية وApple Pay لا تعمل، ولا يمكن السحب بها من الصرّافات الآلية.",
        en: "Foreign Visa and Mastercard cards and Apple Pay don't work, and ATMs won't accept them.",
      },
      {
        ar: "قدّر مصاريف رحلتك كاملة قبل السفر، وأحضرها نقداً بالدولار الأمريكي.",
        en: "Estimate your whole trip budget before you travel and bring it in US dollars.",
      },
      {
        ar: "أحضر دولارات من الإصدار الجديد خالية من الأختام والعلامات، فمكاتب الصرافة قد ترفض الأوراق القديمة أو الممزقة.",
        en: "Bring new-design bills free of stamps or marks — exchange offices may refuse old or torn ones.",
      },
      {
        ar: "وزّع نقودك بين المحفظة والحقيبة، ولا تحملها كلها في مكان واحد.",
        en: "Split your cash between your wallet and bag — never all in one place.",
      },
    ],
  },
  {
    id: "electricity",
    icon: Plug,
    value: { ar: "230V · C/F", en: "230V · C/F" },
    label: { ar: "الكهرباء ونوع المقبس", en: "Voltage and plug type" },
    points: [
      {
        ar: "الجهد الكهربائي 230 فولت والتردد 50 هرتز.",
        en: "The supply is 230 V at 50 Hz.",
      },
      {
        ar: "المقابس من نوع C وF بفتحتين دائريتين، مثل معظم الدول الأوروبية.",
        en: "Sockets are type C and F (two round pins), as in most of Europe.",
      },
      {
        ar: "شواحن الهاتف واللابتوب الحديثة تعمل مباشرة، وتحتاج فقط إلى محوّل لشكل المقبس.",
        en: "Modern phone and laptop chargers work as-is; you only need a plug adapter.",
      },
      {
        ar: "أحضر محوّلاً عالمياً إن كانت أجهزتك بمقبس بريطاني أو أمريكي.",
        en: "Bring a universal adapter if your devices use UK or US plugs.",
      },
    ],
    ltr: true,
  },
];

/** Section D — Moscow in numbers (animated count-up). */
export const moscowStats: {
  value: number;
  decimals?: number;
  prefix?: string;
  /** Unit after the number, e.g. "million". */
  suffix?: Localized;
  label: Localized;
}[] = [
  {
    value: 120,
    prefix: "+",
    label: { ar: "متنزه وساحة", en: "Parks and squares" },
  },
  {
    value: 9500,
    prefix: "+",
    label: { ar: "مرفق رياضي", en: "Sports facilities" },
  },
  {
    value: 45.5,
    decimals: 1,
    suffix: { ar: "مليون", en: "M" },
    label: {
      ar: "وثيقة في المكتبة الحكومية",
      en: "Items in the State Library",
    },
  },
  {
    value: 300,
    suffix: { ar: "ألف", en: "K" },
    label: { ar: "مقيم أجنبي", en: "Foreign residents" },
  },
];

/** Short Moscow facts (old-site text, condensed). Activities live in Section E only.
 * Dropped from the old text: the "only 2% are native Muscovites" claim (unverified). */
export const moscowFacts: IconText[] = [
  {
    icon: Landmark,
    text: {
      ar: "عاصمة روسيا ومركزها السياسي والاقتصادي والثقافي.",
      en: "Russia's capital and its political, economic and cultural center.",
    },
  },
  {
    icon: GraduationCap,
    text: {
      ar: "وردت في تصنيف QS لأفضل المدن الطلابية.",
      en: "Featured in the QS Best Student Cities ranking.",
    },
  },
  {
    icon: UtensilsCrossed,
    text: {
      ar: "مطاعم عالمية وروسية متنوعة، مع خيارات بأسعار مناسبة.",
      en: "A wide range of international and Russian restaurants, including affordable options.",
    },
  },
  {
    icon: Trophy,
    text: {
      ar: "تستضيف سباقات الماراثون ومسابقات رياضية وطنية ودولية على مدار العام.",
      en: "Hosts marathons and national and international sports events all year.",
    },
  },
  {
    icon: Trees,
    text: {
      ar: "حدائقها مجهزة بمقاعد وواي فاي مجاني ومقاهٍ وملاعب رياضية.",
      en: "Its parks have benches, free Wi-Fi, cafés and sports grounds.",
    },
  },
  {
    icon: TrainFront,
    text: {
      ar: "محطات مترو مزينة بالرخام والفسيفساء، من الأجمل في العالم.",
      en: "Metro stations decorated with marble and mosaics — among the world's most beautiful.",
    },
  },
  {
    icon: BookOpen,
    text: {
      ar: "المكتبة الحكومية الروسية مفتوحة للجميع بجواز السفر، وفيها منشورات بـ367 لغة.",
      en: "The Russian State Library is open to all with a passport and holds works in 367 languages.",
    },
  },
  {
    icon: Users,
    text: {
      ar: "مدينة متعددة الثقافات، فيها مساجد وكنائس ومعابد يهودية ومراكز بوذية.",
      en: "A multicultural city with mosques, churches, synagogues and Buddhist centers.",
    },
  },
];

/** Section E — things to do: photo with title underneath, three per row, in this order.
 * TODO: photos not from Moscow — marathon (Portuguese half marathon, single
 * runner, blurred background) and museum (Catherine Palace, Tsarskoye Selo,
 * near St Petersburg). Bunker is a generic stone tunnel. */
export const thingsToDo: {
  title: Localized;
  /** One or two short lines. */
  description: Localized;
  image: string;
}[] = [
  {
    title: { ar: "مترو موسكو", en: "Moscow Metro" },
    description: {
      ar: "محطات كالقصور تحت الأرض.",
      en: "Palace-like stations deep underground.",
    },
    image: "/images/info/things/metro.webp",
  },
  {
    title: { ar: "مسرح البولشوي", en: "Bolshoi Theatre" },
    description: {
      ar: "جولات ليلية مشياً أو بالحافلة، وعروض مسرحية.",
      en: "Night tours on foot or by bus, and theater shows.",
    },
    image: "/images/info/things/bolshoi-theatre.webp",
  },
  {
    title: { ar: "رحلات بالقارب", en: "River Boat Trips" },
    description: {
      ar: "جولات على نهر موسكو.",
      en: "Cruises along the Moscow River.",
    },
    image: "/images/info/things/boat-trips.webp",
  },
  {
    title: { ar: "مخابئ الحرب الباردة", en: "Cold War Bunker" },
    description: {
      ar: "على عمق يصل إلى 65 متراً تحت الأرض.",
      en: "Up to 65 meters underground.",
    },
    image: "/images/info/things/bunker.webp",
  },
  {
    title: { ar: "التزلج على الجليد", en: "Ice Skating" },
    description: {
      ar: "حلبات في الحدائق خلال الشتاء.",
      en: "Open-air rinks in the parks all winter.",
    },
    image: "/images/info/things/ice-skating.webp",
  },
  {
    title: { ar: "ليلة المتاحف", en: "Night of Museums" },
    description: {
      ar: "دخول مجاني مع عروض موسيقية وورش عمل.",
      en: "Free entry with live music and workshops.",
    },
    image: "/images/info/things/museum-palace.webp",
  },
  {
    title: { ar: "الماراثون", en: "Marathon" },
    description: {
      ar: "سباقات ومسابقات رياضية على مدار العام.",
      en: "Races and sports events through the year.",
    },
    image: "/images/info/things/marathon-runner.webp",
  },
  {
    title: { ar: "رسم وموسيقى", en: "Art & Music" },
    description: {
      ar: "دروس في الرسم والموسيقى.",
      en: "Painting and music classes.",
    },
    image: "/images/info/things/music-art.webp",
  },
];
