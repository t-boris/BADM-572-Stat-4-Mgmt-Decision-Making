import type { QuizQuestion } from "@/lib/types";

/**
 * Module 1 — Describing Data: Tables and Charts.
 * Difficulty mix: 4 easy · 12 medium · 4 hard (20 / 60 / 20 of 20).
 */
export const module1Questions: QuizQuestion[] = [
  // ───────────────────────── EASY (4) ─────────────────────────
  {
    id: "m1-e1",
    moduleId: 1,
    difficulty: "easy",
    topic: { ru: "Терминология", en: "Terminology" },
    prompt: {
      ru: "Что в лекции называется «переменной» (variable)?",
      en: "What does the lecture call a 'variable'?",
    },
    options: [
      { id: "a", text: { ru: "Факты и цифры, из которых делают вывод", en: "Facts and figures from which conclusions are drawn" } },
      { id: "b", text: { ru: "Любая характеристика элемента исследования", en: "Any characteristic of an element" } },
      { id: "c", text: { ru: "Данные, собранные для конкретного исследования", en: "The data collected for a particular study" } },
      { id: "d", text: { ru: "Подмножество генеральной совокупности", en: "A subset of the population" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Данные — это факты и цифры, датасет — собранные данные исследования, выборка — подмножество совокупности. Переменная — характеристика элемента.",
      en: "Data are facts and figures, a data set is the study's collected data, a sample is a subset of the population. A variable is a characteristic of an element.",
    },
  },
  {
    id: "m1-e2",
    moduleId: 1,
    difficulty: "easy",
    topic: { ru: "Относительная частота", en: "Relative frequency" },
    prompt: {
      ru: "Как считается относительная частота?",
      en: "How is relative frequency computed?",
    },
    options: [
      { id: "a", text: { ru: "Число наблюдений в категории ÷ общее число наблюдений", en: "Observations in the category ÷ total observations" } },
      { id: "b", text: { ru: "Общее число наблюдений ÷ число категорий", en: "Total observations ÷ number of categories" } },
      { id: "c", text: { ru: "Число наблюдений в категории ÷ число категорий", en: "Observations in the category ÷ number of categories" } },
      { id: "d", text: { ru: "Верхняя граница интервала ÷ ширина интервала", en: "The bin's upper limit ÷ the bin width" } },
    ],
    answerId: "a",
    explanation: {
      ru: "rf = n_категории ÷ n_всего. Для Ford F-Series: 71 332 ÷ 233 601 = 0,3054.",
      en: "rf = n_category ÷ n_total. For the Ford F-Series: 71,332 ÷ 233,601 = 0.3054.",
    },
  },
  {
    id: "m1-e3",
    moduleId: 1,
    difficulty: "easy",
    topic: { ru: "Гистограммы", en: "Histograms" },
    prompt: {
      ru: "Для какого типа данных предназначена гистограмма?",
      en: "Which type of data is a histogram built for?",
    },
    options: [
      { id: "a", text: { ru: "Только для номинативных переменных", en: "Nominative variables only" } },
      { id: "b", text: { ru: "Для количественных переменных", en: "Quantitative variables" } },
      { id: "c", text: { ru: "Для любых категориальных переменных", en: "Any categorical variable" } },
      { id: "d", text: { ru: "Только для пар переменных", en: "Paired variables only" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Гистограмма — особый вид столбчатой диаграммы для количественных данных: значения группируются в интервалы. Для категорий используют bar chart.",
      en: "A histogram is a special form of bar graph for quantitative data, where values are grouped into intervals. Categories get a bar chart.",
    },
  },
  {
    id: "m1-e4",
    moduleId: 1,
    difficulty: "easy",
    topic: { ru: "Диаграмма рассеяния", en: "Scatter plot" },
    prompt: {
      ru: "Какая переменная откладывается по оси X диаграммы рассеяния?",
      en: "Which variable goes on the X axis of a scatter plot?",
    },
    options: [
      { id: "a", text: { ru: "Зависимая", en: "The dependent one" } },
      { id: "b", text: { ru: "Независимая", en: "The independent one" } },
      { id: "c", text: { ru: "Та, у которой больше разброс", en: "Whichever has the larger spread" } },
      { id: "d", text: { ru: "Всегда время", en: "Always time" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Ось X — независимая переменная (например, рекламный бюджет), ось Y — зависимая (продажи). Когда по X отложено время, график называется временным рядом.",
      en: "X carries the independent variable (e.g. the advertising budget), Y the dependent one (sales). When X is time, the chart is called a time series.",
    },
  },

  // ──────────────────────── MEDIUM (12) ────────────────────────
  {
    id: "m1-m1",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Типы переменных", en: "Types of variables" },
    prompt: {
      ru: "Университет Иллинойса имеет почтовый индекс 61820. К какому типу относится переменная «почтовый индекс»?",
      en: "The University of Illinois has zip code 61820. What type of variable is 'postal zip code'?",
    },
    options: [
      { id: "a", text: { ru: "Количественная, поскольку записана числом", en: "Quantitative, because it is written as a number" } },
      { id: "b", text: { ru: "Категориальная, номинативная", en: "Categorical, nominative" } },
      { id: "c", text: { ru: "Категориальная, порядковая", en: "Categorical, ordinal" } },
      { id: "d", text: { ru: "Количественная непрерывная", en: "Quantitative continuous" } },
    ],
    answerId: "b",
    explanation: {
      ru: "61820 не выражает количество и не имеет единицы измерения — это метка территории. Естественного порядка между индексами нет, значит переменная номинативная.",
      en: "61820 expresses no quantity and carries no unit — it labels a place. There is no natural ordering between zip codes, so the variable is nominative.",
    },
  },
  {
    id: "m1-m2",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Типы переменных", en: "Types of variables" },
    prompt: {
      ru: "Клиентов просят оценить сервис по шкале от 1 (крайне не удовлетворён) до 5 (крайне доволен). Какой это тип переменной?",
      en: "Customers rate a service from 1 (extremely dissatisfied) to 5 (extremely satisfied). What type of variable is this?",
    },
    options: [
      { id: "a", text: { ru: "Количественная — значения числовые", en: "Quantitative — the values are numeric" } },
      { id: "b", text: { ru: "Качественная порядковая", en: "Qualitative ordinal" } },
      { id: "c", text: { ru: "Качественная номинативная", en: "Qualitative nominative" } },
      { id: "d", text: { ru: "Количественная в шкале отношений", en: "Quantitative on a ratio scale" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Цифры кодируют категории удовлетворённости, а не количество: единицы измерения нет. Порядок категорий осмыслен, поэтому переменная порядковая.",
      en: "The digits encode satisfaction categories, not a quantity: there is no unit of measure. The categories are meaningfully ordered, so the variable is ordinal.",
    },
  },
  {
    id: "m1-m3",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Расчёт · относительная частота", en: "Calculation · relative frequency" },
    prompt: {
      ru: "В августе 2015 года в США продано 233 601 пикап, из них 54 977 — Chevrolet Silverado. Какова относительная частота этой модели?",
      en: "233,601 pickup trucks were sold in the US in August 2015; 54,977 of them were Chevrolet Silverados. What is that model's relative frequency?",
    },
    options: [
      { id: "a", text: { ru: "≈ 30,5 %", en: "≈ 30.5%" } },
      { id: "b", text: { ru: "≈ 23,5 %", en: "≈ 23.5%" } },
      { id: "c", text: { ru: "≈ 19,4 %", en: "≈ 19.4%" } },
      { id: "d", text: { ru: "≈ 9,1 %", en: "≈ 9.1%" } },
    ],
    answerId: "b",
    explanation: {
      ru: "54 977 ÷ 233 601 = 0,2353 → 23,5 %. 30,5 % — это Ford F-Series, 19,4 % — Ram P/U, 9,1 % — GMC Sierra.",
      en: "54,977 ÷ 233,601 = 0.2353 → 23.5%. 30.5% is the Ford F-Series, 19.4% the Ram P/U, 9.1% the GMC Sierra.",
    },
  },
  {
    id: "m1-m4",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Расчёт · частотная таблица", en: "Calculation · frequency table" },
    prompt: {
      ru: "В таблице ожидания колл-центра (500 наблюдений) в первый интервал «до 30 секунд» попали 30 клиентов. Какова относительная частота этого интервала?",
      en: "In the call-centre waiting table (500 observations) the first bin, 'up to 30 seconds', holds 30 customers. What is that bin's relative frequency?",
    },
    options: [
      { id: "a", text: { ru: "0,030", en: "0.030" } },
      { id: "b", text: { ru: "0,060", en: "0.060" } },
      { id: "c", text: { ru: "0,120", en: "0.120" } },
      { id: "d", text: { ru: "0,300", en: "0.300" } },
    ],
    answerId: "b",
    explanation: {
      ru: "30 ÷ 500 = 0,06, то есть 6 % клиентов дозвонились до оператора не более чем за полминуты.",
      en: "30 ÷ 500 = 0.06 — 6% of customers reached an agent within half a minute.",
    },
  },
  {
    id: "m1-m5",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Интервалы", en: "Bins" },
    prompt: {
      ru: "В частотной таблице времени ожидания строка «210» имеет частоту 66. Как это правильно прочитать?",
      en: "In the waiting-time frequency table the row '210' has a frequency of 66. How should that be read?",
    },
    options: [
      { id: "a", text: { ru: "66 клиентов ждали ровно 210 секунд", en: "66 customers waited exactly 210 seconds" } },
      { id: "b", text: { ru: "66 клиентов ждали от 181 до 210 секунд", en: "66 customers waited between 181 and 210 seconds" } },
      { id: "c", text: { ru: "66 клиентов ждали от 210 до 240 секунд", en: "66 customers waited between 210 and 240 seconds" } },
      { id: "d", text: { ru: "66 клиентов ждали 210 секунд или больше", en: "66 customers waited 210 seconds or more" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Значение bin — верхняя граница интервала. При шаге 30 секунд строка «210» охватывает интервал от 181 до 210 секунд включительно (13 % клиентов).",
      en: "A bin value is the interval's upper limit. With a 30-second step, row '210' covers 181 to 210 seconds inclusive (13% of customers).",
    },
  },
  {
    id: "m1-m6",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Параметр и статистика", en: "Parameter and statistic" },
    prompt: {
      ru: "Среднее время ожидания посчитано по 500 клиентам из миллиона обращений за год. Как называется это число?",
      en: "The mean waiting time is computed from 500 customers out of a million calls in a year. What is that number called?",
    },
    options: [
      { id: "a", text: { ru: "Параметр совокупности", en: "A population parameter" } },
      { id: "b", text: { ru: "Выборочная статистика", en: "A sample statistic" } },
      { id: "c", text: { ru: "Перепись", en: "A census" } },
      { id: "d", text: { ru: "Относительная частота", en: "A relative frequency" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Величина посчитана по выборке (n = 500), значит это выборочная статистика x̄. Параметром μ она стала бы, только если бы охватывала все обращения.",
      en: "The measure comes from a sample (n = 500), so it is a sample statistic x̄. It would be the parameter μ only if it covered every call.",
    },
  },
  {
    id: "m1-m7",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Смещение выборки", en: "Sampling bias" },
    prompt: {
      ru: "Замещающий учитель спрашивает оценки за последний тест у 10 учеников с первого ряда и заключает, что класс справился отлично. В чём главная проблема?",
      en: "A substitute teacher asks the 10 students in the front row for their last test score and concludes the class did extremely well. What is the main problem?",
    },
    options: [
      { id: "a", text: { ru: "Выборка слишком мала, но в остальном корректна", en: "The sample is too small but otherwise sound" } },
      { id: "b", text: { ru: "Выборка непредставительна: сидящие впереди обычно вовлечённее", en: "The sample is unrepresentative: front-row students tend to be more engaged" } },
      { id: "c", text: { ru: "Оценки — качественная переменная, среднее считать нельзя", en: "Scores are qualitative, so a mean cannot be computed" } },
      { id: "d", text: { ru: "Нужно было построить круговую диаграмму", en: "A pie chart should have been used" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Совокупность — весь класс, выборка — 10 человек с первого ряда. Отбор не случайный и систематически смещён вверх, поэтому вывод завышен.",
      en: "The population is the whole class, the sample is the 10 front-row students. Selection is not random and is systematically skewed upward, so the conclusion overstates performance.",
    },
  },
  {
    id: "m1-m8",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Простая случайная выборка", en: "Simple random sampling" },
    prompt: {
      ru: "Какое условие обязательно для простой случайной выборки?",
      en: "Which condition is required for a simple random sample?",
    },
    options: [
      { id: "a", text: { ru: "Выборка должна быть не меньше 10 % совокупности", en: "The sample must be at least 10% of the population" } },
      { id: "b", text: { ru: "Каждый элемент имеет равный шанс попасть в выборку, и отборы независимы", en: "Every member has an equal chance of selection and selections are independent" } },
      { id: "c", text: { ru: "Совокупность должна быть распределена нормально", en: "The population must be normally distributed" } },
      { id: "d", text: { ru: "Отбор должен идти по всем подгруппам пропорционально", en: "Selection must be proportional across all subgroups" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Два требования: равный шанс для каждого элемента и независимость отборов. Пропорциональный отбор по подгруппам — это уже стратифицированная выборка.",
      en: "Two requirements: an equal chance for every member and independence of selections. Proportional selection across subgroups is stratified sampling, a different design.",
    },
  },
  {
    id: "m1-m9",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Выбор графика", en: "Choosing a chart" },
    prompt: {
      ru: "Нужно показать руководству, что пять категорий экспорта дают три четверти всей стоимости. Какой график уместнее?",
      en: "You need to show the leadership team that five export categories account for three quarters of total value. Which chart fits better?",
    },
    options: [
      { id: "a", text: { ru: "Столбчатая — она показывает точные долларовые значения", en: "A bar chart — it shows exact dollar values" } },
      { id: "b", text: { ru: "Круговая — она показывает отношение частей к целому", en: "A pie chart — it shows the parts against the whole" } },
      { id: "c", text: { ru: "Гистограмма — данных много", en: "A histogram — there is a lot of data" } },
      { id: "d", text: { ru: "Диаграмма рассеяния — переменных две", en: "A scatter plot — there are two variables" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Вопрос звучит как «какая доля от целого», а это сильная сторона круговой диаграммы: категории вместе дают 100 %. Столбчатая лучше, когда нужны абсолютные значения и ранжирование.",
      en: "The question is 'what share of the whole', which is the pie chart's strength: the categories sum to 100%. A bar chart is better when absolute values and ranking matter.",
    },
  },
  {
    id: "m1-m10",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Ошибки визуализации", en: "Charting mistakes" },
    prompt: {
      ru: "Аналитик соединил линией число игроков в блэкджек, бридж, канасту, покер и другие игры. Что не так?",
      en: "An analyst joined with a line the number of players of blackjack, bridge, canasta, poker and other games. What is wrong?",
    },
    options: [
      { id: "a", text: { ru: "Ничего, линейный график всегда нагляднее столбчатого", en: "Nothing, a line graph is always clearer than a bar chart" } },
      { id: "b", text: { ru: "Линия создаёт ложное впечатление, что игры естественно упорядочены", en: "The line falsely implies the games are naturally ordered" } },
      { id: "c", text: { ru: "Игры нужно было отсортировать по алфавиту", en: "The games should have been sorted alphabetically" } },
      { id: "d", text: { ru: "На оси Y должна быть относительная частота", en: "The Y axis should carry relative frequency" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Линейный график допустим, только когда обе оси несут упорядоченные величины. Названия игр — номинативная переменная, поэтому нужна столбчатая диаграмма.",
      en: "A line graph is appropriate only when both axes display ordered variables. Game names are a nominative variable, so a bar chart is required.",
    },
  },
  {
    id: "m1-m11",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Шкалы измерения", en: "Levels of measurement" },
    prompt: {
      ru: "Температура в цехе выросла с 10 °C до 20 °C. Почему нельзя сказать «стало вдвое теплее»?",
      en: "The shop-floor temperature rose from 10 °C to 20 °C. Why can we not say 'it became twice as warm'?",
    },
    options: [
      { id: "a", text: { ru: "Температура — качественная переменная", en: "Temperature is a qualitative variable" } },
      { id: "b", text: { ru: "Шкала Цельсия интервальная: у неё нет истинного нуля, поэтому отношения бессмысленны", en: "Celsius is an interval scale: it has no true zero, so ratios are meaningless" } },
      { id: "c", text: { ru: "Нужно было измерять в Фаренгейтах", en: "The measurement should have been in Fahrenheit" } },
      { id: "d", text: { ru: "Разность 10 градусов слишком мала для вывода", en: "A 10-degree difference is too small to conclude anything" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Интервальная шкала даёт равные интервалы, но её ноль условен. Отношения корректны только в шкале отношений — например, для времени ожидания: 300 секунд действительно вдвое дольше 150.",
      en: "An interval scale gives equal intervals but its zero is arbitrary. Ratios hold only on a ratio scale — waiting time, for instance: 300 seconds really is twice 150.",
    },
  },
  {
    id: "m1-m12",
    moduleId: 1,
    difficulty: "medium",
    topic: { ru: "Excel", en: "Excel" },
    prompt: {
      ru: "Вы ввели =FREQUENCY(A2:A501; D2:D11) и получили одно число вместо столбца частот. Что было сделано не так?",
      en: "You entered =FREQUENCY(A2:A501, D2:D11) and got a single number instead of a column of frequencies. What went wrong?",
    },
    options: [
      { id: "a", text: { ru: "Диапазон данных нужно было закрепить через F4", en: "The data range should have been locked with F4" } },
      { id: "b", text: { ru: "Формула не введена как формула массива: нужно Ctrl+Shift+Enter при выделенном диапазоне вывода", en: "The formula was not entered as an array formula: select the output range and press Ctrl+Shift+Enter" } },
      { id: "c", text: { ru: "Границы интервалов должны идти по убыванию", en: "The bin limits must be in descending order" } },
      { id: "d", text: { ru: "Нужно было использовать COUNTIF", en: "COUNTIF should have been used instead" } },
    ],
    answerId: "b",
    explanation: {
      ru: "FREQUENCY возвращает массив: сначала выделяют диапазон под результат (число интервалов плюс одна запасная ячейка), затем вводят формулу и завершают Ctrl+Shift+Enter. COUNTIF применяют к категориям, а не к интервалам.",
      en: "FREQUENCY returns an array: first select the output range (one cell per bin plus a spare), then type the formula and finish with Ctrl+Shift+Enter. COUNTIF is for categories, not bins.",
    },
  },

  // ───────────────────────── HARD (4) ─────────────────────────
  {
    id: "m1-h1",
    moduleId: 1,
    difficulty: "hard",
    topic: { ru: "Чтение таблицы · знаменатель", en: "Reading a table · denominators" },
    prompt: {
      ru: "В отчёте NHTSA за 2011 год среди водителей 15–19 лет: 3 212 попали в смертельные ДТП, 344 из них были отвлечены, 72 из отвлёкшихся — телефоном. К чему относится показатель 21 %?",
      en: "In the 2011 NHTSA report, among drivers aged 15–19: 3,212 were in fatal crashes, 344 of them were distracted, and 72 of the distracted were on a phone. What does the 21% figure refer to?",
    },
    options: [
      { id: "a", text: { ru: "Доля отвлечённых среди всех водителей группы (344 ÷ 3 212)", en: "Distracted as a share of all drivers in the group (344 ÷ 3,212)" } },
      { id: "b", text: { ru: "Доля пользовавшихся телефоном среди отвлечённых (72 ÷ 344)", en: "Phone users as a share of the distracted (72 ÷ 344)" } },
      { id: "c", text: { ru: "Доля пользовавшихся телефоном среди всех водителей группы (72 ÷ 3 212)", en: "Phone users as a share of all drivers in the group (72 ÷ 3,212)" } },
      { id: "d", text: { ru: "Доля группы 15–19 среди всех отвлечённых водителей страны", en: "The 15–19 group's share of all distracted drivers nationwide" } },
    ],
    answerId: "b",
    explanation: {
      ru: "72 ÷ 344 = 0,209 → 21 %. Вариант (a) даёт 11 %, вариант (c) — около 2 %. Именно смена знаменателя от колонки к колонке и есть главная ловушка чтения таких таблиц.",
      en: "72 ÷ 344 = 0.209 → 21%. Option (a) gives 11%, option (c) about 2%. The shifting denominator from column to column is exactly the trap in reading such tables.",
    },
  },
  {
    id: "m1-h2",
    moduleId: 1,
    difficulty: "hard",
    topic: { ru: "Расчёт · число интервалов", en: "Calculation · number of bins" },
    prompt: {
      ru: "Тест по психологии прошли 642 студента. Сколько интервалов рекомендует правило Райса (k = 2·∛N)?",
      en: "642 students took a psychology test. How many intervals does the Rice rule (k = 2·∛N) recommend?",
    },
    options: [
      { id: "a", text: { ru: "10", en: "10" } },
      { id: "b", text: { ru: "13", en: "13" } },
      { id: "c", text: { ru: "17", en: "17" } },
      { id: "d", text: { ru: "26", en: "26" } },
    ],
    answerId: "c",
    explanation: {
      ru: "∛642 ≈ 8,63; 2 × 8,63 ≈ 17,3 → 17 интервалов. Правило Стёрджеса (1 + log₂642 ≈ 10,3) даёт 10, а в учебнике в итоге выбрано компромиссное значение 13.",
      en: "∛642 ≈ 8.63; 2 × 8.63 ≈ 17.3 → 17 intervals. Sturges' rule (1 + log₂642 ≈ 10.3) gives 10, and the textbook settled on a compromise of 13.",
    },
  },
  {
    id: "m1-h3",
    moduleId: 1,
    difficulty: "hard",
    topic: { ru: "Расчёт · доля рынка", en: "Calculation · market share" },
    prompt: {
      ru: "Ford F-Series 71 332, Chevrolet Silverado 54 977, Ram P/U 45 310 при общем объёме 233 601. Какую долю рынка занимает тройка лидеров?",
      en: "Ford F-Series 71,332, Chevrolet Silverado 54,977, Ram P/U 45,310, out of 233,601 in total. What share of the market do the top three hold?",
    },
    options: [
      { id: "a", text: { ru: "около 53 %", en: "about 53%" } },
      { id: "b", text: { ru: "около 63 %", en: "about 63%" } },
      { id: "c", text: { ru: "около 73 %", en: "about 73%" } },
      { id: "d", text: { ru: "около 83 %", en: "about 83%" } },
    ],
    answerId: "c",
    explanation: {
      ru: "71 332 + 54 977 + 45 310 = 171 619; 171 619 ÷ 233 601 = 0,7346 → около 73 %. Именно этот вывод лектор делает после построения таблицы относительных частот.",
      en: "71,332 + 54,977 + 45,310 = 171,619; 171,619 ÷ 233,601 = 0.7346 → about 73%. That is exactly the conclusion the lecturer draws after building the relative-frequency table.",
    },
  },
  {
    id: "m1-h4",
    moduleId: 1,
    difficulty: "hard",
    topic: { ru: "Интерпретация", en: "Interpretation" },
    prompt: {
      ru: "«Реклама, запущенная в конце мая, дала рост продаж мороженого на 30 % за следующие три месяца — значит, реклама сработала». Как называется этот дефект рассуждения?",
      en: "'An ad launched in late May produced a 30% rise in ice-cream sales over the next three months — so the ad worked.' What is this defect in reasoning called?",
    },
    options: [
      { id: "a", text: { ru: "Смещение выборки (sampling bias)", en: "Sampling bias" } },
      { id: "b", text: { ru: "History effect — результат объясняется течением времени, а не вмешательством", en: "A history effect — the outcome is explained by the passage of time, not the intervention" } },
      { id: "c", text: { ru: "Ошибка округления в относительной частоте", en: "A rounding error in the relative frequency" } },
      { id: "d", text: { ru: "Неверно выбранная ширина интервала", en: "A badly chosen bin width" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Потребление мороженого растёт в июне-августе независимо от рекламы: за результат отвечает третья переменная — сезон. Родственная ошибка — third-variable problem в примере «церкви и преступность».",
      en: "Ice-cream consumption rises in June–August regardless of advertising: a third variable, the season, drives the result. Its sibling is the third-variable problem in the 'churches and crime' example.",
    },
  },
];
