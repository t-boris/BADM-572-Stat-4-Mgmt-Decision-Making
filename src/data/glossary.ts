import type { GlossaryTerm } from "@/lib/types";

/**
 * Bilingual glossary. Module 1 covers the vocabulary of Lesson 1-1 plus the
 * four summarization tools of Lessons 1-2…1-5 and the assigned OnlineStatBook
 * readings. Module 2 covers centre, spread, relative position, random
 * variables and the normal distribution (Lessons 2-1…2-6).
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
  // ═════════════════ Module 2 · centre and spread ═════════════════
  {
    id: "m2-central-tendency",
    term: { ru: "Мера центральной тенденции", en: "Measure of central tendency" },
    definition: {
      ru: "Число, представляющее центр или середину данных. Лекция специально оговаривает: оно может и не быть типичным значением — проверка этого и есть смысл мер разброса.",
      en: "A number representing the centre or middle of the data. The lecture is explicit that it may or may not be a typical value — checking that is what the measures of dispersion are for.",
    },
    moduleId: 2,
    related: ["m2-mean", "m2-median", "m2-std-dev"],
    tags: ["central-tendency"],
  },
  {
    id: "m2-mean",
    term: { ru: "Среднее (математическое ожидание)", en: "Mean" },
    definition: {
      ru: "Сумма всех значений, делённая на их количество. Также называется средним арифметическим или ожидаемым значением. Чувствительно к выбросам: одно экстремальное наблюдение способно увести его куда угодно.",
      en: "The sum of all values divided by how many there are. Also called the average or the expected value. Sensitive to outliers: a single extreme observation can drag it anywhere.",
    },
    moduleId: 2,
    formula: "μ = Σxᵢ / N   ·   x̄ = Σxᵢ / n",
    related: ["m2-median", "m2-outlier", "m2-expected-value"],
    tags: ["central-tendency", "formula"],
  },
  {
    id: "m2-median",
    term: { ru: "Медиана", en: "Median" },
    definition: {
      ru: "Значение, выше и ниже которого лежит по 50 % отсортированных наблюдений. При нечётном n — центральное наблюдение, при чётном — среднее двух центральных. Устойчива к выбросам.",
      en: "The value with 50 % of the sorted measurements above it and 50 % below. With an odd n it is the middlemost measurement; with an even n it is the average of the two middlemost. Robust to outliers.",
    },
    moduleId: 2,
    formula: "M_d = 50-й процентиль",
    related: ["m2-mean", "m2-percentile", "m2-skewness"],
    tags: ["central-tendency"],
  },
  {
    id: "m2-outlier",
    term: { ru: "Выброс", en: "Outlier" },
    definition: {
      ru: "Экстремальное значение, далеко отстоящее от остальных данных. В контексте нормального распределения — наблюдение за пределами трёх стандартных отклонений от среднего. Делает среднее менее репрезентативным.",
      en: "An extreme value lying far from the rest of the data. In the normal-distribution context, an observation outside three standard deviations from the mean. It makes the mean less representative.",
    },
    moduleId: 2,
    formula: "|z| > 3",
    related: ["m2-mean", "m2-median", "m2-z-score", "m2-empirical-rule"],
    tags: ["central-tendency", "dispersion"],
  },
  {
    id: "m2-skewness",
    term: { ru: "Скошенность (асимметрия)", en: "Skewness" },
    definition: {
      ru: "Асимметрия распределения, вызванная вытянутым хвостом. При правом скосе среднее больше медианы, при левом — меньше. Направление называют по стороне хвоста, а не горба.",
      en: "The asymmetry of a distribution caused by an elongated tail. With a right skew the mean exceeds the median; with a left skew it falls below. The direction is named after the tail, not the hump.",
    },
    moduleId: 2,
    formula: "правый скос: mean > median · левый: mean < median",
    related: ["m2-mean", "m2-median", "m2-symmetrical"],
    tags: ["central-tendency"],
  },
  {
    id: "m2-symmetrical",
    term: { ru: "Симметричное распределение", en: "Symmetrical distribution" },
    definition: {
      ru: "Распределение, у которого левая и правая половины — зеркальные отражения. Среднее и медиана примерно совпадают, что даёт самую дешёвую диагностику формы: посчитайте оба и сравните.",
      en: "A distribution whose left and right halves mirror each other. Mean and median roughly coincide, which gives the cheapest shape diagnostic there is: compute both and compare.",
    },
    moduleId: 2,
    related: ["m2-skewness", "m2-normal-distribution"],
    tags: ["central-tendency"],
  },
  {
    id: "m2-dispersion",
    term: { ru: "Мера разброса (вариации)", en: "Measure of dispersion (variation)" },
    definition: {
      ru: "Характеристика того, насколько данные растянуты или компактны. Отвечает на вопрос «насколько репрезентативна мера центра?». Три меры курса: размах, дисперсия, стандартное отклонение.",
      en: "How spread out or compact the data tends to be. It answers the question 'how representative is the measure of central tendency?'. The course covers three: range, variance and standard deviation.",
    },
    moduleId: 2,
    related: ["m2-range", "m2-variance", "m2-std-dev"],
    tags: ["dispersion"],
  },
  {
    id: "m2-range",
    term: { ru: "Размах", en: "Range" },
    definition: {
      ru: "Наибольшее значение минус наименьшее. Самая быстрая мера разброса и самая неточная: опирается ровно на два экстремальных наблюдения, поэтому на больших наборах данных ненадёжна.",
      en: "The largest observation minus the smallest. The quickest measure of dispersion and the least accurate: it rests on exactly two extreme observations, so it is unreliable once the data set grows.",
    },
    moduleId: 2,
    formula: "Range = x_max − x_min",
    related: ["m2-dispersion", "m2-std-dev"],
    tags: ["dispersion", "formula"],
  },
  {
    id: "m2-variance",
    term: { ru: "Дисперсия", en: "Variance" },
    definition: {
      ru: "Средний квадрат отклонения от среднего. Квадрат нужен, чтобы положительные и отрицательные отклонения не сократились: их сумма без возведения в квадрат всегда равна нулю. Измеряется в квадратах единиц.",
      en: "The average squared deviation from the mean. The square keeps positive and negative deviations from cancelling — their unsquared sum is always zero. It is measured in squared units.",
    },
    moduleId: 2,
    formula: "σ² = Σ(xᵢ − μ)² / N   ·   s² = Σ(xᵢ − x̄)² / (n − 1)",
    related: ["m2-std-dev", "m2-n-minus-one"],
    tags: ["dispersion", "formula"],
  },
  {
    id: "m2-std-dev",
    term: { ru: "Стандартное отклонение", en: "Standard deviation" },
    definition: {
      ru: "Положительный квадратный корень из дисперсии. Малые значения означают, что точки лежат близко к среднему. Корень возвращает величину в исходные единицы, поэтому σ можно прибавлять к среднему и вычитать из него.",
      en: "The positive square root of the variance. Small values mean the data points all lie close to the mean. The root returns the quantity to the original units, which is what lets you add σ to the mean and subtract it.",
    },
    moduleId: 2,
    formula: "σ = √σ²   ·   s = √s²",
    related: ["m2-variance", "m2-empirical-rule", "m2-excel-stdev-s"],
    tags: ["dispersion", "formula"],
  },
  {
    id: "m2-n-minus-one",
    term: { ru: "Поправка n − 1 (степени свободы)", en: "n − 1 (degrees of freedom)" },
    definition: {
      ru: "Знаменатель выборочной дисперсии. Отклонения считаются от x̄, а не от неизвестного μ, поэтому сумма квадратов систематически занижена; деление на n − 1 компенсирует это и делает s² несмещённой оценкой σ².",
      en: "The denominator of the sample variance. Deviations are taken from x̄ rather than the unknown μ, so the sum of squares is systematically too small; dividing by n − 1 corrects that and makes s² an unbiased estimator of σ².",
    },
    moduleId: 2,
    formula: "s² = Σ(xᵢ − x̄)² / (n − 1)",
    related: ["m2-variance", "m2-excel-stdev-s", "m1-parameter"],
    tags: ["dispersion"],
  },

  // ═════════════════ Module 2 · relative position ═════════════════
  {
    id: "m2-percentile",
    term: { ru: "Процентиль", en: "Percentile" },
    definition: {
      ru: "Приблизительная доля значений набора, лежащих ниже данного значения. P-й процентиль — значение, ниже которого находится не менее p % наблюдений. Медиана — 50-й процентиль.",
      en: "The approximate percentage of values in a data set that fall below a certain value. The pth percentile is the value below which at least p percent of the observations fall. The median is the 50th percentile.",
    },
    moduleId: 2,
    related: ["m2-median", "m2-z-score", "m2-excel-norm-dist"],
    tags: ["position"],
  },
  {
    id: "m2-z-score",
    term: { ru: "Z-оценка (стандартная оценка)", en: "Z-score (standard score)" },
    definition: {
      ru: "На сколько стандартных отклонений наблюдение отстоит от среднего. Знак показывает сторону, модуль — расстояние. Величина безразмерна, поэтому z-оценки сравнимы между совершенно разными переменными.",
      en: "How many standard deviations an observation lies from the mean. The sign gives the side, the magnitude the distance. It is dimensionless, which is what makes z-scores comparable across completely different variables.",
    },
    moduleId: 2,
    formula: "z = (x − μ) / σ",
    related: ["m2-standardizing", "m2-percentile", "m2-value-from-z"],
    tags: ["position", "formula"],
  },
  {
    id: "m2-value-from-z",
    term: { ru: "Обратная формула z", en: "Value from a z-score" },
    definition: {
      ru: "Формула z-оценки, решённая относительно значения. Нужна всякий раз, когда известен процентиль и требуется найти само значение — например, какой балл соответствует 95-му процентилю.",
      en: "The z-score formula solved for the value. Needed whenever the percentile is known and the value is not — for instance, which test score corresponds to the 95th percentile.",
    },
    moduleId: 2,
    formula: "x = μ + zσ",
    related: ["m2-z-score", "m2-excel-norm-inv"],
    tags: ["position", "formula"],
  },
  {
    id: "m2-standardizing",
    term: { ru: "Стандартизация", en: "Standardizing" },
    definition: {
      ru: "Перевод произвольной нормальной кривой в стандартную нормальную заменой x на z. Нормальных кривых бесконечно много — по одной на каждую пару (μ, σ), — и все они сводятся к единственной затабулированной.",
      en: "Converting an arbitrary normal curve into the standard normal one by replacing x with z. There are infinitely many normal curves — one per (μ, σ) pair — and standardizing reduces them all to the single tabulated one.",
    },
    moduleId: 2,
    formula: "z = (x − μ) / σ",
    related: ["m2-z-score", "m2-standard-normal", "m2-z-table"],
    tags: ["position", "normal"],
  },
  {
    id: "m2-empirical-rule",
    term: { ru: "Эмпирическое правило (68–95–99,7)", en: "Empirical Rule (68–95–99.7)" },
    definition: {
      ru: "Для колоколообразного распределения 68 % наблюдений лежат в пределах одного стандартного отклонения от среднего, 95 % — двух, 99,7 % — трёх. Работает и в обратную сторону: σ ≈ (max − min) / 6.",
      en: "For a bell-shaped distribution, 68 % of observations fall within one standard deviation of the mean, 95 % within two and 99.7 % within three. It also runs backwards: σ ≈ (max − min) / 6.",
    },
    moduleId: 2,
    formula: "μ ± 1σ → 68 % · μ ± 2σ → 95 % · μ ± 3σ → 99,7 %",
    related: ["m2-std-dev", "m2-normal-distribution", "m2-outlier"],
    tags: ["position", "normal"],
  },

  // ═════════════════ Module 2 · random variables ═════════════════
  {
    id: "m2-random-variable",
    term: { ru: "Случайная величина", en: "Random variable" },
    definition: {
      ru: "Переменная X, возможные значения которой — числовые исходы случайного процесса. Случайность отражает неполноту нашего знания о механизме, а не отсутствие механизма.",
      en: "A variable X whose possible values are numerical outcomes of a random process. The randomness reflects the incompleteness of our knowledge about the mechanism, not the absence of one.",
    },
    moduleId: 2,
    related: ["m2-discrete", "m2-continuous", "m2-probability-distribution"],
    tags: ["random-variables"],
  },
  {
    id: "m2-discrete",
    term: { ru: "Дискретная случайная величина", en: "Discrete random variable" },
    definition: {
      ru: "Величина, принимающая только конечное число различных значений. Обычно возникает из счёта: число детей в семье, число клиентов в очереди, число откликов «удовлетворительно».",
      en: "A variable that may take on only a finite number of distinct values. It usually arises from counting: number of children in a family, customers waiting in line, respondents who rated the service satisfactory.",
    },
    moduleId: 2,
    related: ["m2-continuous", "m2-probability-distribution", "m2-expected-value"],
    tags: ["random-variables"],
  },
  {
    id: "m2-continuous",
    term: { ru: "Непрерывная случайная величина", en: "Continuous random variable" },
    definition: {
      ru: "Величина, принимающая бесконечное число значений в заданном интервале. Задаётся не точкой, а интервалом, и представляется площадью под кривой. Вероятность любого отдельного значения равна нулю.",
      en: "A variable taking on an infinite number of possible values in a defined interval. It is defined over an interval rather than at specific values and is represented by the area under a curve. The probability of any single value is zero.",
    },
    moduleId: 2,
    formula: "P(X = a) = 0",
    related: ["m2-discrete", "m2-normal-distribution", "m2-area-under-curve"],
    tags: ["random-variables"],
  },
  {
    id: "m2-probability-distribution",
    term: { ru: "Распределение вероятностей", en: "Probability distribution" },
    definition: {
      ru: "Таблица, график или формула, сопоставляющая каждому возможному значению его вероятность. Для дискретной величины это ровно та же таблица относительных частот, что строилась в Модуле 1.",
      en: "A table, graph or formula giving the probability associated with every value the variable can assume. For a discrete variable it is exactly the relative-frequency table built back in Module 1.",
    },
    moduleId: 2,
    formula: "p(x) ≥ 0 для всех x · Σ p(x) = 1",
    related: ["m2-random-variable", "m2-cdf", "m1-relative-frequency"],
    tags: ["random-variables", "formula"],
  },
  {
    id: "m2-cdf",
    term: { ru: "Кумулятивная функция распределения", en: "Cumulative distribution function (CDF)" },
    definition: {
      ru: "Функция, дающая вероятность того, что случайная величина не превосходит x. Для дискретной величины считается накоплением вероятностей и рисуется ступенчатым графиком, последняя ступень которого всегда на 1,00.",
      en: "The function giving the probability that the random variable is less than or equal to x. For a discrete variable it is computed by summing probabilities and drawn as a step function whose last step always sits at 1.00.",
    },
    moduleId: 2,
    formula: "P(X ≤ x) = Σ_{k ≤ x} p(k)",
    related: ["m2-probability-distribution", "m2-excel-norm-dist"],
    tags: ["random-variables", "formula"],
  },
  {
    id: "m2-expected-value",
    term: { ru: "Математическое ожидание", en: "Expected value" },
    definition: {
      ru: "Среднее дискретной случайной величины, взвешенное вероятностями. Это долгосрочное среднее, а не предсказание одного исхода: 1,8 брата/сестры не может быть ни у кого, но именно к 1,8 сойдётся среднее.",
      en: "The mean of a discrete random variable, weighted by probabilities. It is a long-run average, not a prediction of one outcome: nobody can have 1.8 siblings, yet 1.8 is what the average converges to.",
    },
    moduleId: 2,
    formula: "E(X) = μ = Σ x·p(x)",
    related: ["m2-discrete", "m2-discrete-sd", "m2-excel-sumproduct"],
    tags: ["random-variables", "formula"],
  },
  {
    id: "m2-discrete-sd",
    term: { ru: "Стандартное отклонение дискретной величины", en: "Standard deviation of a discrete variable" },
    definition: {
      ru: "Корень из суммы квадратов отклонений от E(X), взвешенных вероятностями. Та же логика, что в уроке о разбросе, но вместо деления на n каждое отклонение взвешивается вероятностью своего исхода.",
      en: "The root of the probability-weighted sum of squared deviations from E(X). The same logic as in the dispersion lesson, except that instead of dividing by n each squared deviation is weighted by its outcome's probability.",
    },
    moduleId: 2,
    formula: "σ = √Σ(x − μ)²·p(x)",
    related: ["m2-expected-value", "m2-std-dev"],
    tags: ["random-variables", "formula"],
  },

  // ═════════════════ Module 2 · the normal distribution ═════════════════
  {
    id: "m2-normal-distribution",
    term: { ru: "Нормальное распределение", en: "Normal distribution" },
    definition: {
      ru: "Колоколообразная кривая, полностью заданная двумя числами: средним μ, задающим положение, и стандартным отклонением σ, задающим форму. Симметрична относительно среднего, которое совпадает с медианой.",
      en: "A bell-shaped curve defined completely by two numbers: the mean μ, which sets its position, and the standard deviation σ, which sets its shape. It is symmetrical about its mean, which is also its median.",
    },
    moduleId: 2,
    formula: "p(x) = e^(−(x−μ)²/2σ²) / (σ√2π)",
    related: ["m2-standard-normal", "m2-empirical-rule", "m2-normal-as-model"],
    tags: ["normal", "formula"],
  },
  {
    id: "m2-standard-normal",
    term: { ru: "Стандартное нормальное распределение", en: "Standard normal distribution" },
    definition: {
      ru: "Частный случай нормального распределения со средним 0 и стандартным отклонением 1. Его случайная величина и есть z-оценка. Площади под ним затабулированы раз и навсегда — отсюда z-таблица.",
      en: "The special case of the normal distribution with a mean of zero and a standard deviation of one. Its random variable is the z-score. Its areas were computed once and for all — hence the z-table.",
    },
    moduleId: 2,
    formula: "μ = 0 · σ = 1",
    related: ["m2-z-score", "m2-standardizing", "m2-z-table"],
    tags: ["normal"],
  },
  {
    id: "m2-area-under-curve",
    term: { ru: "Площадь под кривой", en: "Area under the curve" },
    definition: {
      ru: "Способ представления вероятности для непрерывной величины. Полная площадь равна единице; слева и справа от среднего нормальной кривой — ровно по 0,5. Все задачи модуля сводятся к сложению и вычитанию площадей.",
      en: "How probability is represented for a continuous variable. The total area equals one; the normal curve has exactly 0.5 on each side of its mean. Every problem in the module reduces to adding and subtracting areas.",
    },
    moduleId: 2,
    formula: "P(X ≤ μ) = 0,5",
    related: ["m2-continuous", "m2-normal-distribution", "m2-excel-norm-dist"],
    tags: ["normal"],
  },
  {
    id: "m2-normal-as-model",
    term: { ru: "Нормальное распределение как модель", en: "Normal distribution as a model" },
    definition: {
      ru: "Идеально симметричных кривых в реальности не бывает, но многие явления близки к нормальным, что позволяет использовать кривую как модель для оценки вероятностей. Слово «модель» здесь принципиально.",
      en: "Perfectly symmetrical curves do not exist in the real world, but many phenomena are at least near-normal, which lets the curve be used as a model for assessing probabilities. The word 'model' is doing real work here.",
    },
    moduleId: 2,
    related: ["m2-normal-distribution", "m2-empirical-rule"],
    tags: ["normal"],
  },
  {
    id: "m2-z-table",
    term: { ru: "Таблица стандартного нормального распределения", en: "Standard normal (z) table" },
    definition: {
      ru: "Таблица площадей под стандартной нормальной кривой. В версии курса значение — это P(Z ≤ z), площадь слева. Строка задаёт целую часть и первый знак после запятой, столбец — второй знак.",
      en: "A table of areas under the standard normal curve. In the course's version the entry is P(Z ≤ z), the area to the left. The row gives the integer part and first decimal, the column the second decimal.",
    },
    moduleId: 2,
    formula: "z = 1,35 → строка 1,3 + столбец 0,05 → 0,9115",
    related: ["m2-standard-normal", "m2-symmetry-trick"],
    tags: ["normal"],
  },
  {
    id: "m2-symmetry-trick",
    term: { ru: "Приём симметрии для отрицательных z", en: "Symmetry trick for negative z" },
    definition: {
      ru: "Таблица курса содержит только положительные z. Из-за симметрии кривой площадь слева от −a равна площади справа от +a, поэтому берут модуль, читают таблицу и вычитают результат из единицы.",
      en: "The course table holds positive z only. Because the curve is symmetrical, the area left of −a equals the area right of +a, so you take the absolute value, read the table and subtract the result from one.",
    },
    moduleId: 2,
    formula: "P(Z ≤ −a) = 1 − P(Z ≤ a)",
    related: ["m2-z-table", "m2-normal-distribution"],
    tags: ["normal", "formula"],
  },

  // ═════════════════ Module 2 · Excel ═════════════════
  {
    id: "m2-excel-average",
    term: { ru: "AVERAGE / MEDIAN", en: "AVERAGE / MEDIAN" },
    definition: {
      ru: "Функции среднего и медианы. Считать оба и сравнивать — самый дешёвый способ определить форму распределения. Осторожно: AVERAGE пропускает пустые ячейки и текст, но считает нули.",
      en: "The mean and median functions. Computing both and comparing them is the cheapest way to read a distribution's shape. Careful: AVERAGE skips blanks and text but counts zeros.",
    },
    moduleId: 2,
    formula: "=AVERAGE(C7:C26776) → 55,2   =MEDIAN(C7:C26776) → 55,9",
    related: ["m2-mean", "m2-median", "m1-excel-frequency"],
    tags: ["excel"],
  },
  {
    id: "m2-excel-stdev-s",
    term: { ru: "STDEV.S против STDEV.P", en: "STDEV.S vs STDEV.P" },
    definition: {
      ru: "STDEV.S делит на n − 1 и применяется к выборкам — то есть почти всегда. STDEV.P делит на N и уместна, только когда данные охватывают всю совокупность. 26 770 наблюдений остаются выборкой.",
      en: "STDEV.S divides by n − 1 and applies to samples — which is nearly always. STDEV.P divides by N and fits only when the data cover the entire population. 26,770 observations are still a sample.",
    },
    moduleId: 2,
    formula: "=STDEV.S(C7:C26776) → 17,37",
    related: ["m2-std-dev", "m2-n-minus-one"],
    tags: ["excel"],
  },
  {
    id: "m2-excel-sumproduct",
    term: { ru: "SUMPRODUCT", en: "SUMPRODUCT" },
    definition: {
      ru: "Поэлементно перемножает два массива и складывает результаты — то есть буквально вычисляет Σx·p(x). Определение математического ожидания и определение SUMPRODUCT — одно и то же выражение.",
      en: "Multiplies two arrays element by element and adds the results — which is literally Σx·p(x). The definition of expected value and the definition of SUMPRODUCT are the same expression.",
    },
    moduleId: 2,
    formula: "=SUMPRODUCT(A2:A21; C2:C21) → 11,49",
    related: ["m2-expected-value", "m2-discrete-sd"],
    tags: ["excel"],
  },
  {
    id: "m2-excel-norm-dist",
    term: { ru: "NORM.DIST", en: "NORM.DIST" },
    definition: {
      ru: "Возвращает площадь СЛЕВА от x для распределения с заданными μ и σ. Последний аргумент cumulative всегда 1 (TRUE): функция плотности в этом курсе не используется.",
      en: "Returns the area to the LEFT of x for a distribution with the given μ and σ. The last argument, cumulative, is always 1 (TRUE): the probability-density option is never used in this course.",
    },
    moduleId: 2,
    formula: "=NORM.DIST(65000; 54030; 8600; 1) → 0,8989",
    related: ["m2-excel-norm-s-dist", "m2-excel-norm-inv", "m2-area-under-curve"],
    tags: ["excel"],
  },
  {
    id: "m2-excel-norm-s-dist",
    term: { ru: "NORM.S.DIST", en: "NORM.S.DIST" },
    definition: {
      ru: "То же, что NORM.DIST, но для стандартного нормального распределения: μ и σ передавать не нужно, функция принимает только z. Удобна, когда z уже посчитан или дан в задаче.",
      en: "The same as NORM.DIST but for the standard normal distribution: no μ or σ needed, the function takes only z. Handy when z is already computed or supplied by the problem.",
    },
    moduleId: 2,
    formula: "=NORM.S.DIST(0,5; 1) → 0,6915",
    related: ["m2-excel-norm-dist", "m2-standard-normal"],
    tags: ["excel"],
  },
  {
    id: "m2-excel-norm-inv",
    term: { ru: "NORM.INV / NORM.S.INV", en: "NORM.INV / NORM.S.INV" },
    definition: {
      ru: "Обратные функции: на входе вероятность, на выходе значение. NORM.INV возвращает само значение и требует μ и σ; NORM.S.INV возвращает z и не требует ничего, кроме вероятности.",
      en: "The inverse functions: probability in, value out. NORM.INV returns the value itself and needs μ and σ; NORM.S.INV returns the z-score and needs nothing but the probability.",
    },
    moduleId: 2,
    formula: "=NORM.INV(0,95; 500; 100) → 664,49   =NORM.S.INV(0,95) → 1,6449",
    related: ["m2-excel-norm-dist", "m2-value-from-z"],
    tags: ["excel"],
  },
  {
    id: "m2-excel-absolute-ref",
    term: { ru: "Абсолютная ссылка (F4)", en: "Absolute reference (F4)" },
    definition: {
      ru: "Клавиша F4 расставляет знаки доллара и закрепляет ссылку. Нужна везде, где формула протягивается вниз, а один из операндов должен остаться прежним: итог наблюдений, среднее, знаменатель вероятности.",
      en: "F4 inserts the dollar signs that lock a reference. Needed wherever a formula is filled down while one operand must stay put: the total of observations, the mean, the denominator of a probability.",
    },
    moduleId: 2,
    formula: "=B2/$I$1   =(A2−$I$4)^2",
    related: ["m2-excel-sumproduct", "m1-excel-absolute"],
    tags: ["excel"],
  },
];

export function getGlossaryByModule(moduleId: number): GlossaryTerm[] {
  return GLOSSARY.filter((g) => g.moduleId === moduleId);
}
