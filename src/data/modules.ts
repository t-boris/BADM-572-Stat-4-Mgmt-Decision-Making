import type { ModuleMeta } from "@/lib/types";

/**
 * UIUC iMBA · BADM 572 — Statistics for Management Decision Making.
 * Content follows the Gies eBook of Prof. Fataneh Taghaboni-Dutta's MOOC
 * "Exploring and Producing Data for Business Decision Making" plus the
 * assigned OnlineStatBook readings (onlinestatbook.com).
 *
 * Module 4 remains a placeholder; its page fills in when the material lands.
 */
export const MODULES: ModuleMeta[] = [
  {
    id: 1,
    slug: "describing-data",
    title: {
      ru: "Описание данных: таблицы и графики",
      en: "Describing Data: Tables and Charts",
    },
    subtitle: {
      ru: "Язык статистики и четыре способа увидеть данные глазами.",
      en: "The vocabulary of statistics and four ways to see data with your eyes.",
    },
    topics: [
      { ru: "Зачем менеджеру статистика и что может пойти не так", en: "Why managers need statistics — and what can go wrong" },
      { ru: "Базовая терминология: данные, переменная, датасет", en: "Basic terminology: data, variable, data set" },
      { ru: "Типы переменных и шкалы измерения", en: "Types of variables and levels of measurement" },
      { ru: "Генеральная совокупность, выборка, параметр и статистика", en: "Population, sample, parameter and statistic" },
      { ru: "Частотные таблицы и относительная частота", en: "Frequency tables and relative frequency" },
      { ru: "Гистограммы и выбор ширины интервала", en: "Histograms and choosing the bin width" },
      { ru: "Круговые и столбчатые диаграммы", en: "Pie charts and bar charts" },
      { ru: "Диаграммы рассеяния, временные ряды и линейные графики", en: "Scatter plots, time series and line graphs" },
    ],
    colorKey: "m1",
    iconName: "BarChart3",
    status: "ready",
  },
  {
    id: 2,
    slug: "descriptive-statistics",
    title: {
      ru: "Описательная статистика и распределения вероятностей",
      en: "Descriptive Statistics and Probability Distributions",
    },
    subtitle: {
      ru: "Центр, разброс, позиция — и нормальная кривая, которая переводит всё это в вероятности.",
      en: "Centre, spread, position — and the normal curve that turns all three into probabilities.",
    },
    topics: [
      { ru: "Среднее и медиана: какая мера центра когда честнее", en: "Mean and median: which measure of centre is honest when" },
      { ru: "Выбросы, скошенность и устойчивость медианы", en: "Outliers, skewness and why the median is robust" },
      { ru: "Размах, дисперсия и стандартное отклонение", en: "Range, variance and standard deviation" },
      { ru: "Почему выборочная дисперсия делится на n − 1", en: "Why the sample variance divides by n − 1" },
      { ru: "Процентили, z-оценка и эмпирическое правило 68–95–99,7", en: "Percentiles, the z-score and the 68–95–99.7 rule" },
      { ru: "Дискретные и непрерывные случайные величины", en: "Discrete and continuous random variables" },
      { ru: "Распределение вероятностей, E(X) и σ дискретной величины", en: "Probability distributions, E(X) and σ of a discrete variable" },
      { ru: "Нормальное распределение и стандартизация", en: "The normal distribution and standardizing" },
      { ru: "Задачи «меньше», «больше» и «между» в Excel", en: "'Less than', 'greater than' and 'between' in Excel" },
      { ru: "Таблица стандартного нормального распределения", en: "The standard normal (z) table" },
    ],
    colorKey: "m2",
    iconName: "Sigma",
    status: "ready",
  },
  {
    id: 3,
    slug: "sampling-and-clt",
    title: {
      ru: "Выборка и центральная предельная теорема",
      en: "Sampling and the Central Limit Theorem",
    },
    subtitle: {
      ru: "Как получить честные данные и почему средние больших выборок образуют нормальную кривую.",
      en: "How to produce trustworthy data and why large-sample means form a normal curve.",
    },
    topics: [
      { ru: "Response и independent variables; experimental и observational studies", en: "Response and independent variables; experimental and observational studies" },
      { ru: "Cross-sectional, time-series и longitudinal data", en: "Cross-sectional, time-series and longitudinal data" },
      { ru: "Volunteer и convenience sampling; bias и nonresponse", en: "Volunteer and convenience sampling; bias and nonresponse" },
      { ru: "Simple random, stratified и cluster sampling", en: "Simple random, stratified and cluster sampling" },
      { ru: "Размер выборки и закон убывающей отдачи", en: "Sample size and diminishing returns" },
      { ru: "Sampling в Excel и повторные случайные выборки", en: "Sampling in Excel and repeated random samples" },
      { ru: "Sampling distribution и standard error", en: "Sampling distributions and standard error" },
      { ru: "Центральная предельная теорема для выборочного среднего", en: "The Central Limit Theorem for the sample mean" },
      { ru: "Выборочная доля p̂ и её standard error", en: "The sample proportion p̂ and its standard error" },
    ],
    colorKey: "m3",
    iconName: "Network",
    status: "ready",
  },
  {
    id: 4,
    slug: "module-4",
    title: { ru: "Модуль 4", en: "Module 4" },
    subtitle: {
      ru: "Материал будет добавлен, когда появится модуль.",
      en: "Material will be added once the module is supplied.",
    },
    topics: [],
    colorKey: "m4",
    iconName: "Target",
    status: "coming-soon",
  },
];

export function getModule(id: number): ModuleMeta | undefined {
  return MODULES.find((m) => m.id === id);
}
