import type { ModuleMeta } from "@/lib/types";

/**
 * UIUC iMBA · BADM 572 — Statistics for Management Decision Making.
 * Content follows the Gies eBook of Prof. Fataneh Taghaboni-Dutta's MOOC
 * "Exploring and Producing Data for Business Decision Making" plus the
 * assigned OnlineStatBook readings (onlinestatbook.com).
 *
 * Modules 2–4 are placeholders: their titles come from the course roadmap and
 * their pages fill in as each module's material is added.
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
    slug: "module-2",
    title: { ru: "Модуль 2", en: "Module 2" },
    subtitle: {
      ru: "Материал будет добавлен, когда появится модуль.",
      en: "Material will be added once the module is supplied.",
    },
    topics: [],
    colorKey: "m2",
    iconName: "Sigma",
    status: "coming-soon",
  },
  {
    id: 3,
    slug: "module-3",
    title: { ru: "Модуль 3", en: "Module 3" },
    subtitle: {
      ru: "Материал будет добавлен, когда появится модуль.",
      en: "Material will be added once the module is supplied.",
    },
    topics: [],
    colorKey: "m3",
    iconName: "Dice5",
    status: "coming-soon",
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
