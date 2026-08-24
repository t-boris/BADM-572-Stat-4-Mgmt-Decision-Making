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

/* ========================================================================== */
/*  Module 2 — Descriptive Statistics and Probability Distributions.          */
/*  Every figure below is SOURCE: taken verbatim from the Gies eBook          */
/*  transcript of Module 2 unless marked otherwise.                           */
/* ========================================================================== */

/** SOURCE: Lesson 2-1.1, Slide 5 — dollars spent by 7 website customers. */
export const WEBSITE_SPEND = [85.68, 67.21, 98.08, 34.78, 56.98, 27.93, 40.72];

/**
 * SOURCE: Lesson 2-1.1, Slide 9 — ten classmates' salaries three years after
 * graduation. Mean $65,000 · median $64,500 · s = $6,912.15.
 */
export const CLASSMATE_SALARIES = [
  57000, 58000, 59000, 62000, 64000, 65000, 66000, 68000, 71000, 80000,
];

/** SOURCE: the eleventh classmate — drafted by a pro basketball team. */
export const BASKETBALL_SALARY = 8000000;

/** SOURCE: Lesson 2-1.1, Slide 10 — five candidate sites, annual rent. */
export const SITE_RENTALS: { site: string; rent: number }[] = [
  { site: "A", rent: 84000 },
  { site: "B", rent: 78000 },
  { site: "C", rent: 114000 },
  { site: "D", rent: 103200 },
  { site: "E", rent: 93600 },
];

/** SOURCE: Lesson 2-1.1, Slide 12 — stocks that closed up, a symmetric shape. */
export const STOCKS_UP: { value: number; frequency: number }[] = [
  { value: 30, frequency: 1500 },
  { value: 31, frequency: 2000 },
  { value: 35, frequency: 6000 },
  { value: 40, frequency: 8200 },
  { value: 45, frequency: 4000 },
  { value: 50, frequency: 1000 },
];

/**
 * SOURCE: Lesson 2-2.1, Slide 26 — processing time in two emergency rooms.
 * Both average 5 minutes; ER A has a range of 2, ER B a range of 6.
 */
export const ER_A: { minutes: number; frequency: number }[] = [
  { minutes: 4, frequency: 8 },
  { minutes: 5, frequency: 14 },
  { minutes: 6, frequency: 6 },
];

export const ER_B: { minutes: number; frequency: number }[] = [
  { minutes: 2, frequency: 2 },
  { minutes: 3, frequency: 3 },
  { minutes: 4, frequency: 5 },
  { minutes: 5, frequency: 11 },
  { minutes: 6, frequency: 5 },
  { minutes: 7, frequency: 3 },
  { minutes: 8, frequency: 2 },
];

/** SOURCE: Lesson 2-2.1, Slide 33 — the tight sample and the spread-out one. */
export const HISTOGRAM_A: { value: number; frequency: number }[] = [
  { value: 0, frequency: 1 },
  { value: 1, frequency: 3 },
  { value: 2, frequency: 5 },
  { value: 3, frequency: 7 },
  { value: 4, frequency: 9 },
  { value: 5, frequency: 11 },
  { value: 6, frequency: 10 },
  { value: 7, frequency: 8 },
  { value: 8, frequency: 6 },
  { value: 9, frequency: 4 },
  { value: 10, frequency: 2 },
];

export const HISTOGRAM_B: { value: number; frequency: number }[] = [
  { value: 0, frequency: 2 },
  { value: 1, frequency: 3 },
  { value: 2, frequency: 4 },
  { value: 3, frequency: 5 },
  { value: 4, frequency: 6 },
  { value: 5, frequency: 7 },
  { value: 6, frequency: 6 },
  { value: 7, frequency: 5 },
  { value: 8, frequency: 4 },
  { value: 9, frequency: 3 },
  { value: 10, frequency: 2 },
];

/** SOURCE: Lesson 2-1.2 / 2-2.2 — New York daily temperature, 26,770 rows. */
export const NY_TEMPERATURE = {
  count: 26770,
  mean: 55.2,
  median: 55.9,
  stdevS: 17.37,
  unit: "°F",
} as const;

/** SOURCE: Lesson 2-3.1, Slide 42 — ten salaries for a comparable job title. */
export const PEER_SALARIES = [
  115472, 105845, 105582, 102551, 98188, 94220, 91380, 89828, 89697, 89519,
];

/** SOURCE: Lesson 2-3.1, Slide 48 — payscale.com percentiles, business analyst. */
export const ANALYST_PERCENTILES: { percentile: number; salary: number }[] = [
  { percentile: 10, salary: 43406 },
  { percentile: 25, salary: 48469 },
  { percentile: 50, salary: 54030 },
  { percentile: 75, salary: 61346 },
  { percentile: 90, salary: 68008 },
];

/**
 * SOURCE: Lesson 2-3.1 — the job-offer case. The slide prints σ ≈ $8,900 once
 * but every calculation, and the Excel result 0.898948, uses $8,600.
 */
export const ANALYST_OFFER = {
  median: 54030,
  stdev: 8600,
  offer: 65000,
  z: 1.27,
  percentile: 0.898948,
} as const;

/** SOURCE: Lesson 2-3.1, Slide 50 — TrueCar price bands for a Camry XLE V6. */
export const CAMRY_PRICES = {
  sales: 201,
  exceptionalBelow: 27545,
  trueCarEstimate: 27513,
  greatBelow: 29272,
  averagePaid: 29510,
  factoryInvoice: 30494,
  aboveMarketFrom: 30505,
  msrp: 32904,
  priceCertainty: 0.9769,
} as const;

/** SOURCE: Lesson 2-3.1, Slide 51 — EPA fuel-economy label, small SUV class. */
export const MPG_LABEL = { vehicle: 26, classMin: 16, classMax: 32 } as const;

/** SOURCE: Lesson 2-4.1, Slide 71 — number of siblings among 20 respondents. */
export const SIBLINGS: { value: number; frequency: number }[] = [
  { value: 0, frequency: 3 },
  { value: 1, frequency: 6 },
  { value: 2, frequency: 5 },
  { value: 3, frequency: 4 },
  { value: 4, frequency: 2 },
];

/**
 * SOURCE: Lesson 2-4.1, Slide 77 — customers waiting for a bank teller,
 * 32 observations. E(X) = 2.16 · P(X ≥ 4) = 0.188.
 */
export const BANK_QUEUE: { value: number; frequency: number }[] = [
  { value: 0, frequency: 3 },
  { value: 1, frequency: 10 },
  { value: 2, frequency: 8 },
  { value: 3, frequency: 5 },
  { value: 4, frequency: 3 },
  { value: 5, frequency: 2 },
  { value: 6, frequency: 1 },
];

/**
 * RECONSTRUCTED: Lesson 2-4.2 — daily demand 1…20 at a convenience store.
 * The video shows only the first rows (3 and 10) plus the totals, so the
 * remaining occurrences were rebuilt to hit the published SUM = 140,
 * SUMPRODUCT mean = 11.49 and σ = 6.205 to two decimals.
 */
export const STORE_DEMAND: { value: number; frequency: number }[] = [
  { value: 1, frequency: 3 },
  { value: 2, frequency: 10 },
  { value: 3, frequency: 8 },
  { value: 4, frequency: 9 },
  { value: 5, frequency: 7 },
  { value: 6, frequency: 7 },
  { value: 7, frequency: 3 },
  { value: 8, frequency: 2 },
  { value: 9, frequency: 5 },
  { value: 10, frequency: 5 },
  { value: 11, frequency: 5 },
  { value: 12, frequency: 5 },
  { value: 13, frequency: 6 },
  { value: 14, frequency: 6 },
  { value: 15, frequency: 7 },
  { value: 16, frequency: 12 },
  { value: 17, frequency: 10 },
  { value: 18, frequency: 9 },
  { value: 19, frequency: 9 },
  { value: 20, frequency: 12 },
];

/** SOURCE: Lesson 2-4.2 — the numbers the video reports for the demand data. */
export const STORE_DEMAND_PUBLISHED = {
  total: 140,
  expectedValue: 11.49,
  stdev: 6.205,
  lower: 5.28,
  upper: 17.69,
} as const;

/** SOURCE: Lessons 2-5.4…2-5.7 and 2-6 — the SAT section scale. */
export const SAT = { mean: 500, stdev: 100 } as const;
