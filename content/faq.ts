// FAQ on /[locale]/about (all questions are also emitted as FAQPage JSON-LD).
// Answers follow the old site, the services list and the info page — keep them factual.
type Localized = { ar: string; en: string };

/** Tab ids are used in the URL (`?faq=visa`) — keep them stable. */
export type FaqCategory = "general" | "visa" | "trip" | "payment";

/** Tab order and labels. The first one is the default tab. */
export const faqCategories: { id: FaqCategory; label: Localized }[] = [
  { id: "general", label: { ar: "عام", en: "General" } },
  { id: "visa", label: { ar: "الفيزا والدراسة", en: "Visa & study" } },
  { id: "trip", label: { ar: "الرحلة والإقامة", en: "Trip & stay" } },
  {
    id: "payment",
    label: { ar: "الدفع ومعلومات السفر", en: "Payment & travel info" },
  },
];

/** Navy side card next to the questions. */
// "\u200d" (zero-width joiner) in "الت\u200dي" / "حت\u200dى" / "مت\u200dى": IBM Plex Sans
// Arabic draws a word-final تي/تى as a ligature that reads like "الق"/"حق".
// The joiner keeps the letters connected and stops that ligature. Keep it in
// Arabic text shown in Plex (about, info, contact pages).
export const faqIntro = {
  eyebrow: { ar: "الأسئلة الشائعة", en: "FAQ" },
  title: { ar: "لديك سؤال؟", en: "Have a question?" },
  text: {
    ar: "جمعنا أكثر الأسئلة الت\u200dي تصلنا، وإذا لم تجد إجابتك تواصل معنا مباشرة.",
    en: "Here are the questions we hear most. If yours isn't here, message us directly.",
  },
  button: { ar: "اسألنا على واتساب", en: "Ask us on WhatsApp" },
  whatsappMessage: { ar: "مرحباً، عندي سؤال", en: "Hi, I have a question" },
};

export const faq: {
  category: FaqCategory;
  question: Localized;
  answer: Localized;
}[] = [
  // General
  {
    category: "general",
    question: { ar: "هل شركتكم مرخّصة؟", en: "Are you a licensed company?" },
    answer: {
      ar: "نعم، نحن شركة سياحية مرخّصة ومسجّلة رسمياً في روسيا.",
      en: "Yes, we are a licensed travel company officially registered in Russia.",
    },
  },
  {
    category: "general",
    question: { ar: "أين يقع مكتبكم؟", en: "Where is your office?" },
    answer: {
      ar: "مكتبنا في برج امبرجم، شارع الشيخ خليفة، عجمان، الإمارات العربية المتحدة.",
      en: "Our office is in Amberjem Tower, Sheikh Khalifa Street, Ajman, UAE.",
    },
  },
  {
    category: "general",
    question: {
      ar: "منذ مت\u200dى تعملون؟",
      en: "How long have you been operating?",
    },
    answer: {
      ar: "منذ بداية عام 2018، مع استضافة روسيا لكأس العالم.",
      en: "Since early 2018, when Russia hosted the FIFA World Cup.",
    },
  },
  {
    category: "general",
    question: { ar: "كيف أحجز معكم؟", en: "How do I book with you?" },
    answer: {
      ar: "راسلنا عبر واتساب، ونرتّب لك كل التفاصيل.",
      en: "Message us on WhatsApp and we'll arrange every detail.",
    },
  },

  // Visa & study
  {
    category: "visa",
    question: {
      ar: "هل تساعدون في استخراج الفيزا الروسية؟",
      en: "Do you help with Russian visas?",
    },
    answer: {
      ar: "نعم، نصدر التأشيرات السياحية والدراسية وتأشيرات العمل والتأشيرات التجارية.",
      en: "Yes, we issue tourist, student, work and business visas.",
    },
  },
  {
    category: "visa",
    question: {
      ar: "هل تساعدونني في تعبئة نماذج الفيزا؟",
      en: "Can you help me fill in the visa forms?",
    },
    answer: {
      ar: "نعم، نساعدك في تعبئة النماذج، ونستقبلك في المطار عند وصولك.",
      en: "Yes, we help you fill in the forms and meet you at the airport when you arrive.",
    },
  },
  {
    category: "visa",
    question: {
      ar: "هل تساعدون في الدراسة بالجامعات الروسية؟",
      en: "Do you help with studying at Russian universities?",
    },
    answer: {
      ar: "نعم، ننسّق القبول في البكالوريوس والدراسات العليا في الجامعات الروسية.",
      en: "Yes, we arrange admission to bachelor's and postgraduate programs at Russian universities.",
    },
  },

  // Trip & stay
  {
    category: "trip",
    question: {
      ar: "هل تقدمون الاستقبال والتوديع من المطار؟",
      en: "Do you offer airport pickup and drop-off?",
    },
    answer: {
      ar: "نعم، ونوفر أيضاً سيارات مع سائق وحافلات، مع أسعار خاصة للمجموعات.",
      en: "Yes, and we also provide cars with a driver and buses, with special rates for groups.",
    },
  },
  {
    category: "trip",
    question: {
      ar: "ما أنواع الإقامة الت\u200dي تحجزونها؟",
      en: "What kinds of accommodation do you book?",
    },
    answer: {
      ar: "فنادق ومنتجعات وشقق فندقية وفلل، حسب ميزانيتك.",
      en: "Hotels, resorts, serviced apartments and villas, to suit your budget.",
    },
  },
  {
    category: "trip",
    question: { ar: "هل توفرون شرائح اتصال؟", en: "Do you provide SIM cards?" },
    answer: {
      ar: "نعم، نوفر شرائح جوال دولية، ونساعد في إصدار رخصة القيادة الدولية.",
      en: "Yes, we provide international SIM cards and help with international driving permits.",
    },
  },
  {
    category: "trip",
    question: {
      ar: "هل تحجزون تذاكر القطارات؟",
      en: "Do you book train tickets?",
    },
    answer: {
      ar: "نعم، تذاكر القطارات المحلية والدولية، ومنها القطار بين موسكو وسانت بطرسبرغ.",
      en: "Yes, domestic and international train tickets, including the train between Moscow and Saint Petersburg.",
    },
  },

  // Payment & travel info
  {
    category: "payment",
    question: {
      ar: "هل تعمل بطاقات Visa وMastercard في روسيا؟",
      en: "Do Visa and Mastercard work in Russia?",
    },
    answer: {
      ar: "لا تعمل حالياً، لذلك ننصح بحمل دولارات نقدية من الإصدار الجديد وخالية من الأختام.",
      en: "Not at the moment, so we recommend bringing new, unstamped US dollar bills.",
    },
  },
  {
    category: "payment",
    question: {
      ar: "ما العملة المستخدمة في روسيا؟",
      en: "What currency is used in Russia?",
    },
    answer: {
      ar: "الروبل الروسي، ويساوي 100 كوبيك.",
      en: "The Russian ruble, divided into 100 kopecks.",
    },
  },
  {
    category: "payment",
    question: {
      ar: "ما نوع القابس الكهربائي في روسيا؟",
      en: "What type of power plug is used in Russia?",
    },
    answer: {
      ar: "الجهد 230 فولت، والمقابس من النوع الأوروبي ذي الشقّين الدائريين، لذلك ننصح بمحوّل سفر عالمي.",
      en: "230 V, with European round two-pin sockets, so we recommend a universal travel adapter.",
    },
  },
];
