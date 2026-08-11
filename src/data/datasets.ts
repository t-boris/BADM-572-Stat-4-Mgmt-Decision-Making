import { seededRandom } from "@/lib/statUtils";

/* -------------------------------------------------------------------------- */
/*  Datasets used across Module 1.                                            */
/*  Everything marked SOURCE is taken verbatim from the course materials.      */
/*  Everything marked RECONSTRUCTED is a raw sample rebuilt so that it         */
/*  reproduces the published frequency table exactly (the lecture only ships   */
/*  the summary, not the 500/642 raw rows).                                    */
/* -------------------------------------------------------------------------- */

/**
 * SOURCE: Cain, T. (2015). Top 13 best-selling pickup trucks in America,
 * August 2015. Counts as used in Lesson 1-2. Total = 233,601.
 */
export const TRUCK_SALES: { model: string; count: number }[] = [
  { model: "Ford F-Series", count: 71332 },
  { model: "Chevrolet Silverado", count: 54977 },
  { model: "Ram P/U", count: 45310 },
  { model: "GMC Sierra", count: 21241 },
  { model: "Toyota Tacoma", count: 16230 },
  { model: "Toyota Tundra", count: 10057 },
  { model: "Chevrolet Colorado", count: 7114 },
  { model: "Nissan Frontier", count: 3645 },
  { model: "GMC Canyon", count: 2423 },
  { model: "Nissan Titan", count: 1268 },
  { model: "Honda Ridgeline", count: 4 },
];

export const TRUCK_TOTAL = TRUCK_SALES.reduce((a, b) => a + b.count, 0); // 233,601

/**
 * SOURCE: Lesson 1-2.1 / 1-2.2 — call-centre waiting time, 500 observations,
 * min 0 s, max 300 s. Published 30-second frequency table:
 */
export const WAITING_TIME_FREQ_30: { upper: number; frequency: number }[] = [
  { upper: 30, frequency: 30 },
  { upper: 60, frequency: 49 },
  { upper: 90, frequency: 40 },
  { upper: 120, frequency: 40 },
  { upper: 150, frequency: 37 },
  { upper: 180, frequency: 45 },
  { upper: 210, frequency: 66 },
  { upper: 240, frequency: 62 },
  { upper: 270, frequency: 71 },
  { upper: 300, frequency: 60 },
];

/** SOURCE: first ten rows shown on the slide, in seconds. */
export const WAITING_TIME_SAMPLE_10 = [51, 95, 68, 243, 167, 288, 108, 83, 48, 251];

/**
 * RECONSTRUCTED: 500 waiting times that reproduce WAITING_TIME_FREQ_30 exactly
 * and hit the published min (0) and max (300).
 */
export const WAITING_TIMES: number[] = (() => {
  const rand = seededRandom(20260811);
  const out: number[] = [];
  WAITING_TIME_FREQ_30.forEach((bin, i) => {
    const lower = i === 0 ? 0 : WAITING_TIME_FREQ_30[i - 1].upper;
    for (let k = 0; k < bin.frequency; k++) {
      // keep strictly inside (lower, upper] so Excel-style binning agrees
      const v = lower + Math.max(1, Math.ceil(rand() * (bin.upper - lower)));
      out.push(v);
    }
  });
  out[0] = 0; // the lecture's MIN
  out[out.length - 1] = 300; // the lecture's MAX
  return out;
})();

/**
 * SOURCE: OnlineStatBook, "Histograms" — grouped frequency distribution of a
 * 197-item psychology test taken by 642 students (scores 46–167).
 */
export const PSYCH_TEST_GROUPED: { lower: number; upper: number; frequency: number }[] = [
  { lower: 39.5, upper: 49.5, frequency: 3 },
  { lower: 49.5, upper: 59.5, frequency: 10 },
  { lower: 59.5, upper: 69.5, frequency: 53 },
  { lower: 69.5, upper: 79.5, frequency: 107 },
  { lower: 79.5, upper: 89.5, frequency: 147 },
  { lower: 89.5, upper: 99.5, frequency: 130 },
  { lower: 99.5, upper: 109.5, frequency: 78 },
  { lower: 109.5, upper: 119.5, frequency: 59 },
  { lower: 119.5, upper: 129.5, frequency: 36 },
  { lower: 129.5, upper: 139.5, frequency: 11 },
  { lower: 139.5, upper: 149.5, frequency: 6 },
  { lower: 149.5, upper: 159.5, frequency: 1 },
  { lower: 159.5, upper: 169.5, frequency: 1 },
];

/** RECONSTRUCTED: 642 integer scores matching PSYCH_TEST_GROUPED. */
export const PSYCH_TEST_SCORES: number[] = (() => {
  const rand = seededRandom(642642);
  const out: number[] = [];
  for (const g of PSYCH_TEST_GROUPED) {
    for (let k = 0; k < g.frequency; k++) {
      const lo = Math.ceil(g.lower);
      const hi = Math.floor(g.upper);
      out.push(lo + Math.floor(rand() * (hi - lo + 1)));
    }
  }
  return out;
})();

/**
 * SOURCE: OnlineStatBook, "Graphing Qualitative Variables" — 500 iMac buyers
 * interviewed by Apple in 1998, grouped by the computer they owned before.
 */
export const IMAC_PURCHASES = [
  { category: "None (first computer)", categoryRu: "Нет (первый компьютер)", count: 85 },
  { category: "Windows", categoryRu: "Windows", count: 60 },
  { category: "Macintosh", categoryRu: "Macintosh", count: 355 },
];

/**
 * SOURCE: American Pie Council / Crisco 2008 survey, quoted in Lesson 1-4.1.
 */
export const DESSERT_PREFERENCE = [
  { category: "Pie", categoryRu: "Пирог (pie)", share: 0.29 },
  { category: "Cake", categoryRu: "Торт", share: 0.17 },
  { category: "Cookies", categoryRu: "Печенье", share: 0.15 },
  { category: "All other desserts", categoryRu: "Все остальные десерты", share: 0.39 },
];

export const PIE_FLAVOR_PREFERENCE = [
  { category: "Apple", categoryRu: "Яблочный", share: 0.19 },
  { category: "Pumpkin", categoryRu: "Тыквенный", share: 0.13 },
  { category: "Pecan", categoryRu: "Ореховый (pecan)", share: 0.12 },
  { category: "Banana cream", categoryRu: "Банановый крем", share: 0.1 },
  { category: "Cherry", categoryRu: "Вишнёвый", share: 0.09 },
  { category: "All other flavours", categoryRu: "Прочие вкусы", share: 0.37 },
];

/**
 * SOURCE: NHTSA / NCSA FARS 2011, "Distracted Driving 2011" — the frequency
 * table read in Lesson 1-2.1. Counts are drivers involved in fatal crashes.
 */
export const DISTRACTED_DRIVING_2011 = [
  { age: "15–19", total: 3212, distracted: 344, cellPhone: 72 },
  { age: "20–29", total: 10160, distracted: 790, cellPhone: 117 },
  { age: "30–39", total: 7401, distracted: 505, cellPhone: 79 },
  { age: "40–49", total: 7376, distracted: 464, cellPhone: 49 },
  { age: "50–59", total: 6783, distracted: 434, cellPhone: 34 },
  { age: "60–69", total: 4144, distracted: 251, cellPhone: 12 },
  { age: "70+", total: 3815, distracted: 270, cellPhone: 5 },
];

export const DISTRACTED_DRIVING_TOTALS = {
  total: 43658,
  distracted: 3085,
  cellPhone: 368,
};

/**
 * ILLUSTRATIVE: advertising spend vs sales, the Lesson 1-5 example. The MOOC
 * does not publish the underlying rows, so this is a synthetic but realistic
 * sample with a positive linear relationship plus noise.
 */
export const ADVERTISING_SALES: { advertising: number; sales: number }[] = (() => {
  const rand = seededRandom(1505);
  const rows: { advertising: number; sales: number }[] = [];
  for (let i = 0; i < 40; i++) {
    const advertising = Math.round(20 + rand() * 180); // $k
    const noise = (rand() - 0.5) * 220;
    const sales = Math.round(180 + 4.2 * advertising + noise); // $k
    rows.push({ advertising, sales });
  }
  return rows.sort((a, b) => a.advertising - b.advertising);
})();

/**
 * ILLUSTRATIVE time series in the shape described in Lesson 1-5.1: flat growth
 * 1992–1999, then steady near-linear growth from 2000 on. Values are indexed
 * (1992 = 100), not dollars, because the MOOC slide does not publish figures.
 */
export const EXPORT_TREND_INDEX: { year: number; index: number }[] = (() => {
  const out: { year: number; index: number }[] = [];
  for (let year = 1992; year <= 2014; year++) {
    const t = year - 1992;
    const index = year < 2000 ? 100 + t * 9 : 172 + (year - 2000) * 68;
    out.push({ year, index });
  }
  return out;
})();

/** Variables used in the Lesson 1-1 "Let's practice" classification drill. */
export type VarKind = "quantitative" | "nominal" | "ordinal";

export const VARIABLE_DRILL: {
  id: string;
  label: { ru: string; en: string };
  kind: VarKind;
  why: { ru: string; en: string };
}[] = [
  {
    id: "zip",
    label: { ru: "Почтовый индекс", en: "Postal zip code" },
    kind: "nominal",
    why: {
      ru: "61820 — это метка территории, а не величина: складывать и усреднять индексы бессмысленно, естественного порядка нет.",
      en: "61820 labels a place, it does not measure one. Averaging zip codes is meaningless and there is no natural order.",
    },
  },
  {
    id: "siblings",
    label: { ru: "Число братьев и сестёр", en: "Number of siblings" },
    kind: "quantitative",
    why: {
      ru: "Это счётная величина с единицей измерения «человек»; разности и среднее осмысленны.",
      en: "A count with a unit (people); differences and a mean are meaningful.",
    },
  },
  {
    id: "degree",
    label: { ru: "Высший полученный диплом", en: "Highest degree earned" },
    kind: "ordinal",
    why: {
      ru: "Категории упорядочены (школа → бакалавр → магистр → PhD), но «расстояния» между ними не равны.",
      en: "Categories are ordered (high school → bachelor's → master's → PhD) but the gaps between them are not equal.",
    },
  },
  {
    id: "salary",
    label: { ru: "Годовая зарплата", en: "Annual salary" },
    kind: "quantitative",
    why: {
      ru: "Числовая величина с единицей измерения (доллары); есть истинный ноль — это шкала отношений.",
      en: "A numeric quantity with a unit (dollars) and a true zero — a ratio scale.",
    },
  },
  {
    id: "hair",
    label: { ru: "Цвет волос", en: "Hair colour" },
    kind: "nominal",
    why: {
      ru: "Чистая категория без порядка: «блондин» не больше и не меньше «брюнета».",
      en: "A pure category with no order: blonde is neither more nor less than brunette.",
    },
  },
  {
    id: "satisfaction",
    label: {
      ru: "Оценка сервиса по шкале 1–5",
      en: "Service rating on a 1–5 scale",
    },
    kind: "ordinal",
    why: {
      ru: "Цифры здесь кодируют категории удовлетворённости, а не количество: единицы измерения нет, но порядок есть.",
      en: "The digits encode satisfaction categories, not quantities: no unit of measure, but a clear ordering.",
    },
  },
  {
    id: "temp",
    label: { ru: "Температура в цехе, °C", en: "Shop-floor temperature, °C" },
    kind: "quantitative",
    why: {
      ru: "Числовая величина с единицей измерения. Внимание: это интервальная шкала — 20 °C не «вдвое теплее», чем 10 °C.",
      en: "A numeric quantity with a unit. Note it is an interval scale — 20 °C is not 'twice as warm' as 10 °C.",
    },
  },
  {
    id: "state",
    label: { ru: "Штат проживания", en: "State of residence" },
    kind: "nominal",
    why: {
      ru: "Категория без естественного порядка — типичная номинативная переменная из лекции.",
      en: "A category with no natural ordering — the lecture's canonical nominative variable.",
    },
  },
];
