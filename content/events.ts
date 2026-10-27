// Source: old site https://www.russia-4u.com/activities/
// Images were copied from the old site into /public/images/events/ (same names, converted to .webp).
import {
  Binoculars,
  Mountain,
  PawPrint,
  Snowflake,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Localized = { ar: string; en: string };

/** Used for the events filter (`/events?type=winter`) — keep these ids stable. */
export type EventType =
  "adventure" | "winter" | "animals" | "sightseeing" | "family";

export type City = "moscow" | "saint-petersburg" | "sochi" | "murmansk";

export type Event = {
  /** Stable id, so detail pages can be added later without restructuring. */
  slug: string;
  type: EventType;
  city: City;
  title: Localized;
  description: Localized;
  duration: Localized;
  /** Distance from the city centre (and travel time). */
  distance: Localized;
  image: string;
};

/** Filter order, labels and icons for each event type. */
export const eventTypes: {
  id: EventType;
  label: Localized;
  icon: LucideIcon;
}[] = [
  {
    id: "adventure",
    label: { ar: "مغامرات", en: "Adventure" },
    icon: Mountain,
  },
  { id: "winter", label: { ar: "شتوية", en: "Winter" }, icon: Snowflake },
  { id: "animals", label: { ar: "حيوانات", en: "Animals" }, icon: PawPrint },
  {
    id: "sightseeing",
    label: { ar: "إطلالات وجولات", en: "Sightseeing" },
    icon: Binoculars,
  },
  { id: "family", label: { ar: "عائلية", en: "Family" }, icon: Users },
];


// Adding an event = adding one entry here; no component changes needed.
export const events: Event[] = [
  {
    slug: "giant-buggy",
    type: "adventure",
    city: "moscow",
    title: { ar: "البقي العملاق", en: "Giant Buggy" },
    description: {
      ar: "قيادة مركبة ضخمة عبر الأنهار والسهول والثلوج والجبال.",
      en: "Drive a giant off-road vehicle across rivers, plains, snow and hills.",
    },
    duration: { ar: "ساعة واحدة", en: "1 hour" },
    distance: { ar: "45 كم (ساعة وربع)", en: "45 km (1 h 15 min)" },
    image: "/images/events/large_4wheeler_1.webp",
  },
  {
    slug: "snowmobile",
    type: "winter",
    city: "moscow",
    title: { ar: "ركوب دبّاب الثلج", en: "Snowmobile Ride" },
    description: {
      ar: "قيادة دبّاب الثلج تجربة جديدة ومشوّقة في المناطق الجبلية المغطاة بالثلوج.",
      en: "A thrilling snowmobile ride through snow-covered hills.",
    },
    duration: { ar: "ساعة واحدة", en: "1 hour" },
    distance: { ar: "45 كم (ساعة وربع)", en: "45 km (1 h 15 min)" },
    image: "/images/events/snowmobile_1.webp",
  },
  {
    slug: "great-moscow-circus",
    type: "family",
    city: "moscow",
    title: { ar: "سيرك موسكو الكبير", en: "Great Moscow Circus" },
    description: {
      ar: "عرض سيرك جريء ومميز.",
      en: "A bold and spectacular circus show.",
    },
    duration: { ar: "ساعتان ونصف", en: "2.5 hours" },
    distance: { ar: "12 كم (30 دقيقة)", en: "12 km (30 min)" },
    image: "/images/events/moscow_circus.webp",
  },
  {
    slug: "royal-panoramic-cruise",
    type: "sightseeing",
    city: "moscow",
    title: { ar: "الكروز الملكي البانورامي", en: "Royal Panoramic Cruise" },
    description: {
      ar: "رحلة بانورامية على نهر موسكو تمر بمعالم المدينة، مع مطعم على متن اليخت.",
      en: "A panoramic cruise on the Moscow River past the city's landmarks, with a restaurant on board.",
    },
    duration: { ar: "ساعتان ونصف", en: "2.5 hours" },
    distance: { ar: "5 كم (20 دقيقة)", en: "5 km (20 min)" },
    image: "/images/events/royal_cruse.webp",
  },
  {
    slug: "military-experience",
    type: "adventure",
    city: "moscow",
    title: { ar: "التجربة العسكرية", en: "Military Experience" },
    description: {
      ar: "قيادة دبابة وإطلاق الرصاص من رشاش وارتداء الزي العسكري وتناول فطور عسكري.",
      en: "Drive a tank, fire a machine gun, wear a military uniform and enjoy a military breakfast.",
    },
    duration: { ar: "ساعتان ونصف", en: "2.5 hours" },
    distance: { ar: "45 كم (ساعة وربع)", en: "45 km (1 h 15 min)" },
    image: "/images/events/military_exp.webp",
  },
  {
    slug: "reindeer-farm",
    type: "animals",
    city: "moscow",
    title: { ar: "اللعب مع غزلان الرنّة", en: "Reindeer Farm" },
    description: {
      ar: "تعرّف على غزلان الرنّة والأحصنة الروسية وحمار الوحش والثعالب والأرانب والحملان والسناجب.",
      en: "Meet reindeer, Russian horses, zebras, foxes, rabbits, lambs and squirrels.",
    },
    duration: { ar: "مفتوحة", en: "Flexible" },
    distance: { ar: "30 كم (ساعة)", en: "30 km (1 hour)" },
    image: "/images/events/dears.webp",
  },
  {
    slug: "bear-encounter",
    type: "animals",
    city: "moscow",
    title: { ar: "اللعب مع الدب", en: "Bear Encounter" },
    description: {
      // The old site said "polar bear"; the photo shows a brown bear.
      ar: "لعشّاق المغامرة: نصف ساعة من التشويق والإثارة واللعب مع الدب الروسي اللطيف.",
      en: "For adventure lovers: half an hour of excitement with a friendly Russian bear.",
    },
    duration: { ar: "30 دقيقة", en: "30 min" },
    distance: { ar: "30 كم (ساعة)", en: "30 km (1 hour)" },
    image: "/images/events/bear.webp",
  },
  {
    slug: "helicopter-tour",
    type: "sightseeing",
    city: "moscow",
    title: { ar: "ركوب طائرة الهليكوبتر", en: "Helicopter Tour" },
    description: {
      ar: "رحلة بانورامية بالهليكوبتر فوق المدينة.",
      en: "A panoramic helicopter flight over the city.",
    },
    duration: { ar: "20 دقيقة", en: "20 min" },
    distance: { ar: "40 كم (ساعة)", en: "40 km (1 hour)" },
    image: "/images/events/heli.webp",
  },
  {
    slug: "paintball",
    type: "adventure",
    city: "moscow",
    title: { ar: "حرب الألوان", en: "Paintball" },
    description: {
      ar: "لعبة إطلاق كرات الطلاء بأسلحة خاصة مع بدلات عسكرية وخوذات.",
      en: "A paintball battle with special markers, military suits and helmets.",
    },
    duration: { ar: "ساعتان", en: "2 hours" },
    distance: { ar: "45 كم (ساعة ونصف)", en: "45 km (1 h 30 min)" },
    image: "/images/events/paint_ball.webp",
  },
  {
    slug: "moscow-river-cable-car",
    type: "sightseeing",
    city: "moscow",
    title: { ar: "تلفريك فوق نهر موسكو", en: "Moscow River Cable Car" },
    description: {
      ar: "تلفريك فوق النهر مع إطلالة على جامعة موسكو الحكومية.",
      en: "A cable car ride over the river with views of Moscow State University.",
    },
    duration: { ar: "15 دقيقة", en: "15 min" },
    distance: { ar: "9 كم (15 دقيقة)", en: "9 km (15 min)" },
    image: "/images/events/tel_frik.webp",
  },
  {
    slug: "hot-air-balloon",
    type: "sightseeing",
    city: "moscow",
    title: { ar: "المنطاد في سماء موسكو", en: "Hot Air Balloon" },
    description: {
      ar: "التحليق بالمنطاد فوق الغيوم.",
      en: "Fly above the clouds in a hot air balloon.",
    },
    duration: { ar: "60 دقيقة", en: "60 min" },
    distance: { ar: "35 كم (ساعة ونصف)", en: "35 km (1 h 30 min)" },
    // TODO: only 550px wide on the old site — a larger photo would look sharper.
    image: "/images/events/air_balloon.webp",
  },
  {
    slug: "river-zipline",
    type: "adventure",
    city: "moscow",
    title: { ar: "زيب لاين فوق نهر موسكو", en: "Moscow River Zipline" },
    description: {
      ar: "التزلّج على خط معلّق فوق نهر موسكو.",
      en: "Zip across the Moscow River on a suspended line.",
    },
    duration: { ar: "20 دقيقة", en: "20 min" },
    distance: { ar: "9 كم (15 دقيقة)", en: "9 km (15 min)" },
    image: "/images/events/zip_line.webp",
  },
  {
    slug: "husky-sled",
    type: "winter",
    city: "moscow",
    title: { ar: "عربة الهاسكي في الثلوج", en: "Husky Sled Ride" },
    description: {
      ar: "عش تجربة ملؤها التشويق بعربة تجرّها كلاب الهاسكي القطبية في الثلوج.",
      en: "An exciting ride through the snow on a sled pulled by husky dogs.",
    },
    duration: { ar: "30 دقيقة", en: "30 min" },
    distance: { ar: "40 كم (45 دقيقة)", en: "40 km (45 min)" },
    image: "/images/events/haski.webp",
  },
  {
    slug: "aquarium",
    type: "family",
    city: "moscow",
    title: { ar: "عالم البحار", en: "Aquarium" },
    description: {
      ar: "حوض أسماك كبير مع نفق بانورامي يضم مئات الأنواع.",
      en: "A large aquarium with a panoramic tunnel and hundreds of species.",
    },
    duration: { ar: "مفتوحة", en: "Flexible" },
    distance: { ar: "12 كم (30 دقيقة)", en: "12 km (30 min)" },
    image: "/images/events/water_land.webp",
  },
  {
    slug: "dream-island",
    type: "family",
    city: "moscow",
    title: { ar: "أرض الأحلام", en: "Dream Island" },
    description: {
      ar: "أكبر منتزه داخلي في أوروبا، يضم مجمعاً تجارياً وترفيهياً وحديقة مناظر طبيعية.",
      en: "Europe's largest indoor theme park, with a shopping and entertainment complex and a landscaped park.",
    },
    duration: { ar: "مفتوحة", en: "Flexible" },
    distance: { ar: "14 كم (35 دقيقة)", en: "14 km (35 min)" },
    image: "/images/events/dream_land.webp",
  },
  {
    slug: "panorama-360",
    type: "sightseeing",
    city: "moscow",
    title: { ar: "بانوراما 360", en: "Panorama 360" },
    description: {
      ar: "إطلالة على المدينة من الطابق 89 في أبراج موسكو سيتي، مع معمل للآيس كريم.",
      en: "City views from the 89th floor of Moscow City towers, with an ice cream factory.",
    },
    duration: { ar: "ساعة ونصف", en: "1.5 hours" },
    distance: { ar: "3 كم (15 دقيقة)", en: "3 km (15 min)" },
    image: "/images/events/panorama.webp",
  },
  {
    slug: "nuclear-bunker-museum",
    type: "sightseeing",
    city: "moscow",
    title: { ar: "المتحف والملجأ النووي", en: "Nuclear Bunker Museum" },
    description: {
      ar: "زيارة أحد الملاجئ السوفيتية للحماية من الأسلحة النووية.",
      en: "Visit a Soviet-era shelter built to withstand nuclear attack.",
    },
    duration: { ar: "ساعة ونصف", en: "1.5 hours" },
    distance: { ar: "6 كم (15 دقيقة)", en: "6 km (15 min)" },
    image: "/images/events/neculear_museum.webp",
  },
  {
    slug: "dolphinarium",
    type: "family",
    city: "moscow",
    title: { ar: "عالم الحيوانات البحرية", en: "Dolphinarium" },
    description: {
      ar: "مجمع حمامات سباحة يضم الفقمات والدلافين، مع عروض مميزة.",
      en: "A pool complex with seals and dolphins and live shows.",
    },
    duration: { ar: "ساعة ونصف", en: "1.5 hours" },
    distance: { ar: "5 كم (25 دقيقة)", en: "5 km (25 min)" },
    image: "/images/events/sea_world.webp",
  },
  {
    slug: "ice-drifting",
    type: "adventure",
    city: "moscow",
    title: {
      ar: "درفت بسيارات BMW وPorsche",
      en: "Ice Drifting (BMW & Porsche)",
    },
    description: {
      ar: "قيادة السيارات الحديثة بانزلاق متحكّم به على الجليد.",
      en: "Controlled drifting on ice in modern sports cars.",
    },
    duration: { ar: "ساعة", en: "1 hour" },
    distance: { ar: "5 كم (25 دقيقة)", en: "5 km (25 min)" },
    // Licence plates blurred. TODO: photo shows a dry track, not ice — ask the client for a real one.
    image: "/images/events/drifting.webp",
  },
  {
    slug: "snow-karting",
    type: "adventure",
    city: "moscow",
    title: { ar: "كارتنج على الثلج", en: "Snow Karting" },
    description: {
      ar: "قيادة سيارة الكارتنج ومتعة التفحيط على الثلوج.",
      en: "Go-karting and drifting on snow.",
    },
    duration: { ar: "20 دقيقة", en: "20 min" },
    distance: { ar: "45 كم (ساعة وربع)", en: "45 km (1 h 15 min)" },
    image: "/images/events/carting.webp",
  },
  {
    slug: "reindeer-sleigh",
    type: "winter",
    city: "moscow",
    title: { ar: "ركوب عربة الغزلان", en: "Reindeer Sleigh Ride" },
    description: {
      // The old site reused the reindeer-farm text here; rewritten from the title and photo.
      ar: "جولة في الثلوج على مزلجة تجرّها غزلان الرنّة.",
      en: "A ride through the snow on a sleigh pulled by reindeer.",
    },
    duration: { ar: "مفتوحة", en: "Flexible" },
    distance: { ar: "30 كم (55 دقيقة)", en: "30 km (55 min)" },
    image: "/images/events/ski_2.webp",
  },
];
