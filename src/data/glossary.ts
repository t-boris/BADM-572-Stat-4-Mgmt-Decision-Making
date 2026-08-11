import type { GlossaryTerm } from "@/lib/types";

/**
 * Bilingual glossary. Module 1 covers the vocabulary of Lesson 1-1 plus the
 * four summarization tools of Lessons 1-2…1-5 and the assigned OnlineStatBook
 * readings.
 */
export const GLOSSARY: GlossaryTerm[] = [
  // ───────── Module 1 · terminology ─────────
  {
    id: "m1-statistics",
    term: { ru: "Статистика", en: "Statistics" },
    definition: {
      ru: "Наука о принятии «хороших» решений в условиях неопределённости; набор методов анализа, интерпретации и представления данных.",
      en: "The science of 'good' decision making in the face of uncertainty; a range of techniques for analyzing, interpreting and displaying data.",
    },
    moduleId: 1,
    related: ["m1-descriptive", "m1-inferential"],
    tags: ["terminology"],
  },
  {
    id: "m1-data",
    term: { ru: "Данные", en: "Data" },
    definition: {
      ru: "Факты и цифры, из которых можно сделать вывод. Множественное число; одна единица — datum.",
      en: "Facts and figures from which conclusions can be drawn. Plural; a single piece is a datum.",
    },
    moduleId: 1,
    related: ["m1-variable", "m1-dataset"],
    tags: ["terminology"],
  },
  {
    id: "m1-variable",
    term: { ru: "Переменная", en: "Variable" },
    definition: {
      ru: "Любая характеристика элемента исследования, способная принимать разные значения.",
      en: "Any characteristic of an element that can take on different values.",
    },
    moduleId: 1,
    related: ["m1-quantitative", "m1-qualitative", "m1-independent", "m1-dependent"],
    tags: ["terminology"],
  },
  {
    id: "m1-dataset",
    term: { ru: "Датасет", en: "Data set" },
    definition: {
      ru: "Данные, собранные для конкретного исследования: значения всех интересующих переменных по каждому элементу.",
      en: "The data collected for a particular study: values of every variable of interest for each element.",
    },
    moduleId: 1,
    related: ["m1-data", "m1-population", "m1-sample"],
    tags: ["terminology"],
  },
  {
    id: "m1-quantitative",
    term: { ru: "Количественная переменная", en: "Quantitative variable" },
    definition: {
      ru: "Переменная, значения которой выражают количество и измеряются в фиксированной единице: зарплата, возраст, время ожидания.",
      en: "A variable whose values express a quantity measured in a fixed unit: salary, age, waiting time.",
    },
    moduleId: 1,
    related: ["m1-qualitative", "m1-interval-scale", "m1-ratio-scale", "m1-histogram"],
    tags: ["variables"],
  },
  {
    id: "m1-qualitative",
    term: { ru: "Качественная (категориальная) переменная", en: "Qualitative (categorical) variable" },
    definition: {
      ru: "Переменная, значение которой обозначает категорию, а не количество. Может быть записана словами или числами без единицы измерения.",
      en: "A variable whose value names a category rather than a quantity. It may be recorded in words or in numbers that carry no unit.",
    },
    moduleId: 1,
    related: ["m1-nominative", "m1-ordinal", "m1-pie-chart", "m1-bar-chart"],
    tags: ["variables"],
  },
  {
    id: "m1-nominative",
    term: { ru: "Номинативная переменная", en: "Nominative variable" },
    definition: {
      ru: "Качественная переменная без осмысленного порядка категорий: пол, цвет волос, штат проживания, почтовый индекс.",
      en: "A qualitative variable with no meaningful ordering of categories: gender, hair colour, state of residence, zip code.",
    },
    moduleId: 1,
    related: ["m1-ordinal", "m1-nominal-scale"],
    tags: ["variables"],
  },
  {
    id: "m1-ordinal",
    term: { ru: "Порядковая переменная", en: "Ordinal variable" },
    definition: {
      ru: "Качественная переменная с осмысленным порядком категорий — независимо от того, записаны они словами или цифрами: уровень удовлетворённости, высший диплом.",
      en: "A qualitative variable with a meaningful ordering of categories, whether recorded numerically or not: satisfaction level, highest degree earned.",
    },
    moduleId: 1,
    related: ["m1-nominative", "m1-ordinal-scale"],
    tags: ["variables"],
  },
  {
    id: "m1-independent",
    term: { ru: "Независимая переменная", en: "Independent variable" },
    definition: {
      ru: "Переменная, которой управляет исследователь или менеджер; на графике всегда откладывается по оси X.",
      en: "The variable manipulated by the experimenter or manager; on a chart it always goes on the X axis.",
    },
    moduleId: 1,
    related: ["m1-dependent", "m1-scatter"],
    tags: ["variables"],
  },
  {
    id: "m1-dependent",
    term: { ru: "Зависимая переменная", en: "Dependent variable" },
    definition: {
      ru: "Переменная, на которой измеряют эффект независимой; откладывается по оси Y.",
      en: "The variable on which the effect of the independent variable is measured; plotted on the Y axis.",
    },
    moduleId: 1,
    related: ["m1-independent", "m1-scatter"],
    tags: ["variables"],
  },

  // ───────── scales ─────────
  {
    id: "m1-nominal-scale",
    term: { ru: "Номинальная шкала", en: "Nominal scale" },
    definition: {
      ru: "Низший уровень измерения: значения только называют категории, порядка нет. Допустимы мода и частоты.",
      en: "The lowest level of measurement: values merely name categories, with no ordering. Mode and counts are permitted.",
    },
    moduleId: 1,
    related: ["m1-ordinal-scale", "m1-nominative"],
    tags: ["scales"],
  },
  {
    id: "m1-ordinal-scale",
    term: { ru: "Порядковая шкала", en: "Ordinal scale" },
    definition: {
      ru: "Категории упорядочены, но расстояния между соседними уровнями не обязаны быть равными. Допустимы медиана и перцентили.",
      en: "Categories are ordered, but the differences between adjacent levels need not be equal. Median and percentiles are permitted.",
    },
    moduleId: 1,
    related: ["m1-nominal-scale", "m1-interval-scale", "m1-ordinal"],
    tags: ["scales"],
  },
  {
    id: "m1-interval-scale",
    term: { ru: "Интервальная шкала", en: "Interval scale" },
    definition: {
      ru: "Равные интервалы, но нет истинного нуля: температура в °C, календарные годы. Отношения бессмысленны — 20 °C не «вдвое теплее» 10 °C.",
      en: "Equal intervals but no true zero: temperature in °C, calendar years. Ratios are meaningless — 20 °C is not 'twice as warm' as 10 °C.",
    },
    moduleId: 1,
    related: ["m1-ratio-scale", "m1-ordinal-scale"],
    tags: ["scales"],
  },
  {
    id: "m1-ratio-scale",
    term: { ru: "Шкала отношений", en: "Ratio scale" },
    definition: {
      ru: "Равные интервалы плюс истинный ноль: зарплата, время ожидания, объём продаж. Отношения осмысленны.",
      en: "Equal intervals plus a true zero: salary, waiting time, sales volume. Ratios are meaningful.",
    },
    moduleId: 1,
    related: ["m1-interval-scale", "m1-quantitative"],
    tags: ["scales"],
  },

  // ───────── population / sample ─────────
  {
    id: "m1-population",
    term: { ru: "Генеральная совокупность", en: "Population" },
    definition: {
      ru: "Множество всех элементов, о которых мы хотим сделать вывод. Полное обследование совокупности — перепись (census).",
      en: "The set of all elements about which we wish to draw a conclusion. A complete enumeration of it is a census.",
    },
    moduleId: 1,
    formula: "N, μ, σ",
    related: ["m1-sample", "m1-parameter", "m1-census"],
    tags: ["sampling"],
  },
  {
    id: "m1-sample",
    term: { ru: "Выборка", en: "Sample" },
    definition: {
      ru: "Подмножество элементов совокупности, по которому судят о совокупности в целом.",
      en: "A subset of the units of a population, used to draw inferences about the whole.",
    },
    moduleId: 1,
    formula: "n, x̄, s",
    related: ["m1-population", "m1-statistic", "m1-srs", "m1-bias"],
    tags: ["sampling"],
  },
  {
    id: "m1-census",
    term: { ru: "Перепись", en: "Census" },
    definition: {
      ru: "Сбор данных по каждому элементу совокупности. В США проводится раз в 10 лет.",
      en: "Collecting data on every single element of the population. The US runs one every ten years.",
    },
    moduleId: 1,
    related: ["m1-population"],
    tags: ["sampling"],
  },
  {
    id: "m1-parameter",
    term: { ru: "Параметр совокупности", en: "Population parameter" },
    definition: {
      ru: "Сводная величина, вычисленная по данным всей совокупности, например среднее по совокупности μ.",
      en: "A summary measure computed from population data, for example the population mean μ.",
    },
    moduleId: 1,
    formula: "μ, σ, N",
    related: ["m1-statistic", "m1-population"],
    tags: ["sampling"],
  },
  {
    id: "m1-statistic",
    term: { ru: "Выборочная статистика", en: "Sample statistic" },
    definition: {
      ru: "Та же сводная величина, вычисленная по выборке. Используется для оценки параметра совокупности.",
      en: "The same summary measure computed from sample data. Used to estimate the population parameter.",
    },
    moduleId: 1,
    formula: "x̄, s, n",
    related: ["m1-parameter", "m1-inferential"],
    tags: ["sampling"],
  },
  {
    id: "m1-srs",
    term: { ru: "Простая случайная выборка", en: "Simple random sampling" },
    definition: {
      ru: "Каждый элемент совокупности имеет равный шанс попасть в выборку, и отбор одного не влияет на вероятность отбора любого другого.",
      en: "Every member of the population has an equal chance of selection, and the selection of one member is independent of every other.",
    },
    moduleId: 1,
    related: ["m1-sample", "m1-bias", "m1-inferential"],
    tags: ["sampling"],
  },
  {
    id: "m1-bias",
    term: { ru: "Смещение выборки", en: "Sampling bias" },
    definition: {
      ru: "Систематическое искажение из-за того, что выборка непредставительна: опрос только первого ряда, только добровольцев, только жителей одного штата.",
      en: "Systematic distortion because the sample is unrepresentative: polling only the front row, only volunteers, or only one state's residents.",
    },
    moduleId: 1,
    related: ["m1-srs", "m1-sample"],
    tags: ["sampling"],
  },
  {
    id: "m1-descriptive",
    term: { ru: "Описательная статистика", en: "Descriptive statistics" },
    definition: {
      ru: "Числа, которые суммируют и описывают имеющиеся данные, не делая утверждений за их пределами.",
      en: "Numbers used to summarize and describe the data at hand, without generalizing beyond it.",
    },
    moduleId: 1,
    related: ["m1-inferential", "m1-frequency-table"],
    tags: ["terminology"],
  },
  {
    id: "m1-inferential",
    term: { ru: "Индуктивная статистика", en: "Inferential statistics" },
    definition: {
      ru: "Процедуры, превращающие информацию о выборке в обоснованный вывод о совокупности.",
      en: "Procedures that convert information about a sample into an intelligent conclusion about the population.",
    },
    moduleId: 1,
    related: ["m1-descriptive", "m1-srs", "m1-statistic"],
    tags: ["terminology"],
  },

  // ───────── summarizing tools ─────────
  {
    id: "m1-frequency-table",
    term: { ru: "Частотная таблица", en: "Frequency table" },
    definition: {
      ru: "Сводка, показывающая, сколько раз встретилась каждая категория или сколько наблюдений попало в каждый интервал.",
      en: "A summary showing how often each category occurs, or how many observations fall into each interval.",
    },
    moduleId: 1,
    related: ["m1-relative-frequency", "m1-bin", "m1-bar-chart"],
    tags: ["summarizing"],
  },
  {
    id: "m1-frequency",
    term: { ru: "Частота", en: "Frequency" },
    definition: {
      ru: "Число наблюдений в категории или интервале.",
      en: "The number of observations in a category or interval.",
    },
    moduleId: 1,
    related: ["m1-relative-frequency"],
    tags: ["summarizing"],
  },
  {
    id: "m1-relative-frequency",
    term: { ru: "Относительная частота", en: "Relative frequency" },
    definition: {
      ru: "Доля наблюдений в категории от общего числа наблюдений. Ford F-Series: 71 332 ÷ 233 601 = 0,3054.",
      en: "The proportion of observations in a category out of the total. Ford F-Series: 71,332 ÷ 233,601 = 0.3054.",
    },
    moduleId: 1,
    formula: "rf = n_category ÷ n_total",
    related: ["m1-frequency", "m1-frequency-table", "m1-pie-chart"],
    tags: ["summarizing", "formula"],
  },
  {
    id: "m1-bin",
    term: { ru: "Интервал (bin, class interval)", en: "Bin (class interval)" },
    definition: {
      ru: "Диапазон значений количественной переменной. В Excel значение bin — верхняя граница интервала; наблюдение попадает в интервал, если оно больше предыдущей границы и не больше текущей.",
      en: "A range of values of a quantitative variable. In Excel a bin value is the upper limit; an observation falls in the bin if it exceeds the previous limit and does not exceed this one.",
    },
    moduleId: 1,
    related: ["m1-histogram", "m1-sturges", "m1-rice"],
    tags: ["summarizing"],
  },
  {
    id: "m1-histogram",
    term: { ru: "Гистограмма", en: "Histogram" },
    definition: {
      ru: "Особый вид столбчатой диаграммы для количественных данных: значения сгруппированы в интервалы, высота столбца — частота интервала, столбцы стоят вплотную.",
      en: "A special form of bar graph for quantitative data: values grouped into intervals, bar height is the interval's frequency, and bars touch.",
    },
    moduleId: 1,
    related: ["m1-bin", "m1-bar-chart", "m1-frequency-distribution"],
    tags: ["charts"],
  },
  {
    id: "m1-frequency-distribution",
    term: { ru: "Распределение частот", en: "Frequency distribution" },
    definition: {
      ru: "Гистограмма, у которой по оси Y отложена относительная частота, а не абсолютное количество.",
      en: "A histogram whose Y axis carries relative frequency rather than raw counts.",
    },
    moduleId: 1,
    related: ["m1-histogram", "m1-relative-frequency"],
    tags: ["charts"],
  },
  {
    id: "m1-sturges",
    term: { ru: "Правило Стёрджеса", en: "Sturges' rule" },
    definition: {
      ru: "Ориентир для числа интервалов гистограммы. Для 1000 наблюдений даёт 11 интервалов.",
      en: "A rule of thumb for the number of histogram intervals. For 1000 observations it gives 11.",
    },
    moduleId: 1,
    formula: "k ≈ 1 + log2(N) = 1 + 3.3·log10(N)",
    related: ["m1-rice", "m1-bin"],
    tags: ["formula"],
  },
  {
    id: "m1-rice",
    term: { ru: "Правило Райса", en: "Rice rule" },
    definition: {
      ru: "Альтернативный ориентир, рекомендуемый OnlineStatBook: для 1000 наблюдений даёт 20 интервалов вместо 11.",
      en: "The alternative rule preferred by OnlineStatBook: for 1000 observations it gives 20 intervals instead of 11.",
    },
    moduleId: 1,
    formula: "k = 2 · N^(1/3)",
    related: ["m1-sturges", "m1-bin"],
    tags: ["formula"],
  },
  {
    id: "m1-bar-chart",
    term: { ru: "Столбчатая диаграмма", en: "Bar chart" },
    definition: {
      ru: "График частот категориальной переменной: категории по оси X с зазорами между столбцами, частоты по оси Y.",
      en: "A chart of the frequencies of a categorical variable: categories on X with gaps between bars, frequencies on Y.",
    },
    moduleId: 1,
    related: ["m1-histogram", "m1-pie-chart", "m1-frequency-table"],
    tags: ["charts"],
  },
  {
    id: "m1-pie-chart",
    term: { ru: "Круговая диаграмма", en: "Pie chart" },
    definition: {
      ru: "График, где каждая категория — сектор, площадь которого пропорциональна её доле; вместе секторы дают 100 %.",
      en: "A chart where each category is a slice whose area is proportional to its share; together the slices make 100%.",
    },
    moduleId: 1,
    related: ["m1-bar-chart", "m1-pie-of-pie", "m1-relative-frequency"],
    tags: ["charts"],
  },
  {
    id: "m1-pie-of-pie",
    term: { ru: "Диаграмма «pie of pie»", en: "Pie of pie chart" },
    definition: {
      ru: "Круговая диаграмма, у которой мелкие категории (например, меньше 10 %) вынесены во вторичный круг, чтобы основная не была перегружена.",
      en: "A pie chart whose small categories (say, below 10%) are pulled out into a secondary circle so the main one stays readable.",
    },
    moduleId: 1,
    related: ["m1-pie-chart"],
    tags: ["charts", "excel"],
  },
  {
    id: "m1-scatter",
    term: { ru: "Диаграмма рассеяния", en: "Scatter plot" },
    definition: {
      ru: "График связи двух парных переменных: независимая по оси X, зависимая по оси Y.",
      en: "A picture of the relationship between two paired variables: the independent one on X, the dependent one on Y.",
    },
    moduleId: 1,
    related: ["m1-time-series", "m1-correlation", "m1-independent", "m1-dependent"],
    tags: ["charts"],
  },
  {
    id: "m1-time-series",
    term: { ru: "Временной ряд", en: "Time series" },
    definition: {
      ru: "Диаграмма рассеяния, у которой по оси X отложено время.",
      en: "A scatter plot whose X axis is time.",
    },
    moduleId: 1,
    related: ["m1-scatter", "m1-line-graph"],
    tags: ["charts"],
  },
  {
    id: "m1-line-graph",
    term: { ru: "Линейный график", en: "Line graph" },
    definition: {
      ru: "Столбчатая диаграмма с соединёнными вершинами столбцов и убранными столбцами. Допустим только для упорядоченных осей.",
      en: "A bar graph with the bar tops joined by lines and the bars removed. Appropriate only when both axes are ordered.",
    },
    moduleId: 1,
    related: ["m1-time-series", "m1-bar-chart"],
    tags: ["charts"],
  },
  {
    id: "m1-correlation",
    term: { ru: "Корреляция", en: "Correlation" },
    definition: {
      ru: "Наличие связи между двумя переменными, видимое на диаграмме рассеяния. Не означает причинно-следственной связи.",
      en: "A relationship between two variables, visible on a scatter plot. It does not imply causation.",
    },
    moduleId: 1,
    related: ["m1-scatter", "m1-third-variable"],
    tags: ["terminology"],
  },
  {
    id: "m1-third-variable",
    term: { ru: "Проблема третьей переменной", en: "Third-variable problem" },
    definition: {
      ru: "Две величины связаны только потому, что обе объясняются третьей: число церквей и преступность объясняются размером города.",
      en: "Two quantities are related only because a third explains both: churches and crime are both explained by city size.",
    },
    moduleId: 1,
    related: ["m1-correlation", "m1-history-effect"],
    tags: ["pitfalls"],
  },
  {
    id: "m1-history-effect",
    term: { ru: "History effect", en: "History effect" },
    definition: {
      ru: "Результат приписывают вмешательству, хотя его объясняет течение времени: рост продаж мороженого летом после запуска рекламы в конце мая.",
      en: "An outcome is attributed to an intervention when the passage of time explains it: ice-cream sales rising in summer after an ad launched in late May.",
    },
    moduleId: 1,
    related: ["m1-third-variable", "m1-correlation"],
    tags: ["pitfalls"],
  },

  // ───────── excel ─────────
  {
    id: "m1-excel-frequency",
    term: { ru: "Функция FREQUENCY", en: "FREQUENCY function" },
    definition: {
      ru: "Функция массива Excel: получает данные и границы интервалов, возвращает столбец частот. Вводится сочетанием Ctrl+Shift+Enter.",
      en: "An Excel array function: it takes the data and the bin limits and returns a column of frequencies. Entered with Ctrl+Shift+Enter.",
    },
    moduleId: 1,
    formula: "=FREQUENCY(data_array, bins_array)",
    related: ["m1-bin", "m1-frequency-table", "m1-excel-countif"],
    tags: ["excel"],
  },
  {
    id: "m1-excel-countif",
    term: { ru: "Функция COUNTIF", en: "COUNTIF function" },
    definition: {
      ru: "Считает, сколько раз значение встречается в диапазоне — рабочая лошадка частотной таблицы для категорий. Диапазон закрепляется клавишей F4.",
      en: "Counts how many times a value occurs in a range — the workhorse of the categorical frequency table. The range is locked with F4.",
    },
    moduleId: 1,
    formula: "=COUNTIF($A$2:$A$233602, E2)",
    related: ["m1-excel-frequency", "m1-frequency-table"],
    tags: ["excel"],
  },
  {
    id: "m1-excel-absolute",
    term: { ru: "Абсолютная ссылка (F4)", en: "Absolute reference (F4)" },
    definition: {
      ru: "Закрепление адреса ячейки знаками доллара, чтобы при копировании формулы знаменатель или диапазон не сдвигались.",
      en: "Locking a cell address with dollar signs so that a denominator or range does not drift when the formula is copied.",
    },
    moduleId: 1,
    formula: "$E$4",
    related: ["m1-excel-countif", "m1-relative-frequency"],
    tags: ["excel"],
  },
  {
    id: "m1-excel-toolpak",
    term: { ru: "Пакет анализа (Analysis ToolPak)", en: "Analysis ToolPak" },
    definition: {
      ru: "Надстройка Excel, добавляющая пункт «Анализ данных» с инструментом Histogram: задаются Input Range, Bin Range, Labels и Chart Output.",
      en: "The Excel add-in that adds the Data Analysis menu with the Histogram tool: you set Input Range, Bin Range, Labels and Chart Output.",
    },
    moduleId: 1,
    related: ["m1-histogram", "m1-bin"],
    tags: ["excel"],
  },
];

export function getGlossaryByModule(moduleId: number): GlossaryTerm[] {
  return GLOSSARY.filter((g) => g.moduleId === moduleId);
}
