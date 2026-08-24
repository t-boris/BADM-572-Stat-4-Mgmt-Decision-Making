import type { QuizQuestion } from "@/lib/types";

/**
 * Module 2 — Descriptive Statistics and Probability Distributions.
 * Difficulty mix: 4 easy · 12 medium · 4 hard (20 / 60 / 20 of 20).
 * Every number is taken from the Gies eBook transcript of Module 2.
 */
export const module2Questions: QuizQuestion[] = [
  // ───────────────────────── EASY (4) ─────────────────────────
  {
    id: "m2-e1",
    moduleId: 2,
    difficulty: "easy",
    topic: { ru: "Меры центра", en: "Central tendency" },
    prompt: {
      ru: "Как считается медиана, если число наблюдений чётное?",
      en: "How is the median computed when the number of measurements is even?",
    },
    options: [
      { id: "a", text: { ru: "Берётся большее из двух центральных значений", en: "Take the larger of the two middlemost values" } },
      { id: "b", text: { ru: "Берётся среднее двух центральных значений", en: "Take the average of the two middlemost values" } },
      { id: "c", text: { ru: "Медиана не определена", en: "The median is undefined" } },
      { id: "d", text: { ru: "Берётся среднее всего набора", en: "Take the mean of the whole data set" } },
    ],
    answerId: "b",
    explanation: {
      ru: "При нечётном n медиана — центральное наблюдение, при чётном — среднее двух центральных. Для десяти зарплат из лекции это (64 000 + 65 000)/2 = 64 500.",
      en: "With an odd n the median is the middlemost measurement; with an even n it is the average of the two middlemost. For the lecture's ten salaries that is (64,000 + 65,000)/2 = 64,500.",
    },
  },
  {
    id: "m2-e2",
    moduleId: 2,
    difficulty: "easy",
    topic: { ru: "Меры разброса", en: "Dispersion" },
    prompt: {
      ru: "Как связаны дисперсия и стандартное отклонение?",
      en: "How are the variance and the standard deviation related?",
    },
    options: [
      { id: "a", text: { ru: "Стандартное отклонение — квадратный корень из дисперсии", en: "The standard deviation is the square root of the variance" } },
      { id: "b", text: { ru: "Дисперсия — квадратный корень из стандартного отклонения", en: "The variance is the square root of the standard deviation" } },
      { id: "c", text: { ru: "Это два названия одной величины", en: "They are two names for the same quantity" } },
      { id: "d", text: { ru: "Стандартное отклонение — дисперсия, делённая на n", en: "The standard deviation is the variance divided by n" } },
    ],
    answerId: "a",
    explanation: {
      ru: "σ = √σ², s = √s². Корень нужен, чтобы вернуть величину в исходные единицы: дисперсия измеряется в квадратах единиц и потому непригодна для отчёта.",
      en: "σ = √σ² and s = √s². The root returns the quantity to the original units: the variance is in squared units and so is useless in a report.",
    },
  },
  {
    id: "m2-e3",
    moduleId: 2,
    difficulty: "easy",
    topic: { ru: "Эмпирическое правило", en: "Empirical Rule" },
    prompt: {
      ru: "Согласно эмпирическому правилу, какая доля наблюдений лежит в пределах двух стандартных отклонений от среднего?",
      en: "By the Empirical Rule, what share of observations falls within two standard deviations of the mean?",
    },
    options: [
      { id: "a", text: { ru: "68 %", en: "68 %" } },
      { id: "b", text: { ru: "95 %", en: "95 %" } },
      { id: "c", text: { ru: "99,7 %", en: "99.7 %" } },
      { id: "d", text: { ru: "50 %", en: "50 %" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Правило 68–95–99,7: одно σ — 68 %, два σ — 95 % (точнее 95,45 %), три σ — 99,7 %. Работает только для приблизительно колоколообразных распределений.",
      en: "The 68–95–99.7 rule: one σ gives 68 %, two σ give 95 % (95.45 % exactly) and three σ give 99.7 %. It holds only for roughly bell-shaped distributions.",
    },
  },
  {
    id: "m2-e4",
    moduleId: 2,
    difficulty: "easy",
    topic: { ru: "Случайные величины", en: "Random variables" },
    prompt: {
      ru: "Какая из перечисленных величин дискретная?",
      en: "Which of the following random variables is discrete?",
    },
    options: [
      { id: "a", text: { ru: "Дневная доходность акции", en: "Daily return on a stock" } },
      { id: "b", text: { ru: "Время ожидания оператора", en: "Time spent waiting for a customer service agent" } },
      { id: "c", text: { ru: "Число клиентов в очереди", en: "Number of customers waiting in line" } },
      { id: "d", text: { ru: "Вес банки газировки", en: "Weight of a soda can" } },
    ],
    answerId: "c",
    explanation: {
      ru: "Число клиентов получается счётом и принимает конечное число значений. Остальные три — результат измерения и потому непрерывны.",
      en: "The number of customers comes from counting and takes a finite number of distinct values. The other three come from measurement and so are continuous.",
    },
  },

  // ──────────────────────── MEDIUM (12) ────────────────────────
  {
    id: "m2-m1",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Выбросы", en: "Outliers" },
    prompt: {
      ru: "В группе из 10 однокурсников среднее — 65 000 $, медиана — 64 500 $. Присоединяется одиннадцатый с зарплатой 8 000 000 $. Что происходит с двумя мерами?",
      en: "Ten classmates have a mean salary of $65,000 and a median of $64,500. An eleventh joins earning $8,000,000. What happens to the two measures?",
    },
    options: [
      { id: "a", text: { ru: "Обе резко вырастают", en: "Both jump sharply" } },
      { id: "b", text: { ru: "Среднее становится 786 363,64 $, медиана — 65 000 $", en: "The mean becomes $786,363.64, the median $65,000" } },
      { id: "c", text: { ru: "Среднее не меняется, медиана растёт", en: "The mean holds, the median rises" } },
      { id: "d", text: { ru: "Обе остаются прежними", en: "Both stay where they were" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Среднее выросло более чем в 12 раз, медиана сдвинулась на один шаг по отсортированному списку — с 64 500 до 65 000. Ни один из одиннадцати не зарабатывает 786 363 $, поэтому здесь честна медиана.",
      en: "The mean grew more than twelvefold while the median moved one step along the sorted list, from 64,500 to 65,000. None of the eleven earns $786,363, so the median is the honest summary.",
    },
  },
  {
    id: "m2-m2",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Форма распределения", en: "Distribution shape" },
    prompt: {
      ru: "Среднее заметно больше медианы. Что это говорит о форме распределения?",
      en: "The mean is noticeably larger than the median. What does that say about the shape?",
    },
    options: [
      { id: "a", text: { ru: "Распределение скошено вправо — длинный правый хвост", en: "The distribution is right-skewed — a long right tail" } },
      { id: "b", text: { ru: "Распределение скошено влево — длинный левый хвост", en: "The distribution is left-skewed — a long left tail" } },
      { id: "c", text: { ru: "Распределение симметрично", en: "The distribution is symmetrical" } },
      { id: "d", text: { ru: "О форме ничего сказать нельзя", en: "Nothing can be said about the shape" } },
    ],
    answerId: "a",
    explanation: {
      ru: "Среднее убегает в хвост, медиана остаётся на месте. Значит хвост вытянут вправо. Направление скоса называют по стороне хвоста, а не горба.",
      en: "The mean runs into the tail while the median stays put, so the tail is stretched to the right. A skew is named after the side the tail is on, not the hump.",
    },
  },
  {
    id: "m2-m3",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Разброс", en: "Dispersion" },
    prompt: {
      ru: "В обоих приёмных покоях среднее время обработки — 5 минут. В ER A наблюдения от 4 до 6 минут, в ER B — от 2 до 8. Какой вывод верен?",
      en: "Both emergency rooms average 5 minutes. ER A's observations run from 4 to 6 minutes, ER B's from 2 to 8. Which conclusion holds?",
    },
    options: [
      { id: "a", text: { ru: "ER B работает лучше, потому что кого-то обслуживает за 2 минуты", en: "ER B does better because it serves someone in 2 minutes" } },
      { id: "b", text: { ru: "Приёмные покои эквивалентны — среднее одинаковое", en: "The two are equivalent — the average is the same" } },
      { id: "c", text: { ru: "У ER B размах 6 минут против 2, и для его пациентов среднее менее типично", en: "ER B's range is 6 minutes against 2, so the average is less typical for its patients" } },
      { id: "d", text: { ru: "У ER A больше стандартное отклонение", en: "ER A has the larger standard deviation" } },
    ],
    answerId: "c",
    explanation: {
      ru: "Размах ER A = 6 − 4 = 2, ER B = 8 − 2 = 6. При одинаковом среднем опыт пациента принципиально разный: в ER B «пять минут» — лотерея от двух до восьми.",
      en: "ER A's range is 6 − 4 = 2, ER B's is 8 − 2 = 6. With identical averages the patient experience differs fundamentally: in ER B 'five minutes' is a lottery between two and eight.",
    },
  },
  {
    id: "m2-m4",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Excel", en: "Excel" },
    prompt: {
      ru: "В файле 26 770 записей температуры Нью-Йорка за много лет. Какую функцию стандартного отклонения выбрать?",
      en: "A file holds 26,770 New York temperature records spanning many years. Which standard-deviation function applies?",
    },
    options: [
      { id: "a", text: { ru: "STDEV.P — набор достаточно большой, чтобы считаться совокупностью", en: "STDEV.P — the data set is large enough to count as the population" } },
      { id: "b", text: { ru: "STDEV.S — это по-прежнему выборка", en: "STDEV.S — it is still a sample" } },
      { id: "c", text: { ru: "Обе дадут одинаковый результат, так что безразлично", en: "Both return the same value, so it makes no difference" } },
      { id: "d", text: { ru: "VAR.P, а затем извлечь корень вручную", en: "VAR.P, then take the root by hand" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Размер ни при чём: совокупность — все дни, которые были и будут, а в файле лишь часть. Спросите себя, есть ли наблюдения этого типа вне таблицы. Ответ — STDEV.S = 17,37.",
      en: "Size is irrelevant: the population is every day past and future, and the file holds only some. Ask whether observations of that kind exist outside the table. The answer is STDEV.S = 17.37.",
    },
  },
  {
    id: "m2-m5",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Z-оценка", en: "Z-score" },
    prompt: {
      ru: "Медиана зарплаты бизнес-аналитика — 54 030 $, стандартное отклонение — 8 600 $. Вам предлагают 65 000 $. Какова z-оценка?",
      en: "A business analyst's median salary is $54,030 with a standard deviation of $8,600. You are offered $65,000. What is the z-score?",
    },
    options: [
      { id: "a", text: { ru: "0,79", en: "0.79" } },
      { id: "b", text: { ru: "1,27", en: "1.27" } },
      { id: "c", text: { ru: "2,13", en: "2.13" } },
      { id: "d", text: { ru: "−1,27", en: "−1.27" } },
    ],
    answerId: "b",
    explanation: {
      ru: "z = (65 000 − 54 030) / 8 600 = 10 970 / 8 600 = 1,27. Оферта на 1,27 стандартного отклонения выше среднего; NORM.DIST даёт точный процентиль 0,8989.",
      en: "z = (65,000 − 54,030) / 8,600 = 10,970 / 8,600 = 1.27. The offer sits 1.27 standard deviations above the mean; NORM.DIST puts the exact percentile at 0.8989.",
    },
  },
  {
    id: "m2-m6",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Эмпирическое правило", en: "Empirical Rule" },
    prompt: {
      ru: "Наклейка расхода топлива: 26 миль на галлон, диапазон класса от 16 до 32. Какова грубая оценка стандартного отклонения?",
      en: "A fuel-economy label reads 26 MPG and the class ranges from 16 to 32. What is the rough estimate of the standard deviation?",
    },
    options: [
      { id: "a", text: { ru: "(32 − 16) / 3 = 5,33", en: "(32 − 16) / 3 = 5.33" } },
      { id: "b", text: { ru: "(32 − 16) / 6 = 2,67", en: "(32 − 16) / 6 = 2.67" } },
      { id: "c", text: { ru: "(32 − 16) / 2 = 8", en: "(32 − 16) / 2 = 8" } },
      { id: "d", text: { ru: "(32 + 16) / 6 = 8", en: "(32 + 16) / 6 = 8" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Дан полный диапазон, а он покрывает примерно шесть сигм — три влево и три вправо от среднего. Отсюда σ ≈ 16 / 6 = 2,67 и z = (26 − 24) / 2,67 = 0,75.",
      en: "The full range is given, and it spans roughly six sigmas — three each side of the mean. Hence σ ≈ 16 / 6 = 2.67 and z = (26 − 24) / 2.67 = 0.75.",
    },
  },
  {
    id: "m2-m7",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Математическое ожидание", en: "Expected value" },
    prompt: {
      ru: "Опрошены 20 человек о числе братьев и сестёр: 0 → 3 чел., 1 → 6, 2 → 5, 3 → 4, 4 → 2. Чему равно E(X)?",
      en: "Twenty people report their number of siblings: 0 → 3 people, 1 → 6, 2 → 5, 3 → 4, 4 → 2. What is E(X)?",
    },
    options: [
      { id: "a", text: { ru: "2,0", en: "2.0" } },
      { id: "b", text: { ru: "1,8", en: "1.8" } },
      { id: "c", text: { ru: "4,0", en: "4.0" } },
      { id: "d", text: { ru: "1,21", en: "1.21" } },
    ],
    answerId: "b",
    explanation: {
      ru: "E(X) = 0(0,15) + 1(0,30) + 2(0,25) + 3(0,20) + 4(0,10) = 1,8. Значение 1,21 — это стандартное отклонение той же величины, а не ожидание.",
      en: "E(X) = 0(0.15) + 1(0.30) + 2(0.25) + 3(0.20) + 4(0.10) = 1.8. The 1.21 figure is that variable's standard deviation, not its expected value.",
    },
  },
  {
    id: "m2-m8",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Непрерывные величины", en: "Continuous variables" },
    prompt: {
      ru: "Почему для непрерывной случайной величины вероятность любого отдельного значения равна нулю?",
      en: "Why is the probability of any single value zero for a continuous random variable?",
    },
    options: [
      { id: "a", text: { ru: "Потому что такие значения физически невозможны", en: "Because such values are physically impossible" } },
      { id: "b", text: { ru: "Потому что величина принимает бесконечное число значений, и вероятность представлена площадью, а не точкой", en: "Because the variable takes infinitely many values and probability is represented by area, not by a point" } },
      { id: "c", text: { ru: "Потому что измерения всегда округляют", en: "Because measurements are always rounded" } },
      { id: "d", text: { ru: "Потому что распределение симметрично", en: "Because the distribution is symmetrical" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Непрерывная величина задаётся интервалом и представляется площадью под кривой; у отдельной точки площади нет. Практическое следствие: P(X ≤ a) и P(X < a) — одно и то же число.",
      en: "A continuous variable is defined over an interval and represented by area under a curve, and a single point has no area. Practical consequence: P(X ≤ a) and P(X < a) are the same number.",
    },
  },
  {
    id: "m2-m9",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Нормальное распределение", en: "Normal distribution" },
    prompt: {
      ru: "Две нормальные кривые имеют одинаковое среднее 500, но у первой σ = 15, а у второй σ = 5. Чем они отличаются?",
      en: "Two normal curves share a mean of 500 but the first has σ = 15 and the second σ = 5. How do they differ?",
    },
    options: [
      { id: "a", text: { ru: "Вторая уже и выше первой", en: "The second is narrower and taller" } },
      { id: "b", text: { ru: "Вторая шире и ниже первой", en: "The second is wider and flatter" } },
      { id: "c", text: { ru: "Вторая сдвинута вправо", en: "The second is shifted to the right" } },
      { id: "d", text: { ru: "Они выглядят одинаково", en: "They look identical" } },
    ],
    answerId: "a",
    explanation: {
      ru: "μ задаёт положение, σ — форму. Меньшее σ означает меньший разброс, а поскольку площадь под обеими кривыми равна единице, суженная кривая обязана стать выше.",
      en: "μ sets the position and σ the shape. A smaller σ means less spread, and since the area under both curves is one, the narrowed curve must grow taller.",
    },
  },
  {
    id: "m2-m10",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Excel", en: "Excel" },
    prompt: {
      ru: "SAT: μ = 500, σ = 100. Какая формула даёт вероятность набрать больше 635?",
      en: "SAT: μ = 500, σ = 100. Which formula gives the probability of scoring above 635?",
    },
    options: [
      { id: "a", text: { ru: "=NORM.DIST(635; 500; 100; 1)", en: "=NORM.DIST(635, 500, 100, 1)" } },
      { id: "b", text: { ru: "=1 − NORM.DIST(635; 500; 100; 1)", en: "=1 − NORM.DIST(635, 500, 100, 1)" } },
      { id: "c", text: { ru: "=NORM.INV(635; 500; 100)", en: "=NORM.INV(635, 500, 100)" } },
      { id: "d", text: { ru: "=NORM.DIST(635; 500; 100; 0)", en: "=NORM.DIST(635, 500, 100, 0)" } },
    ],
    answerId: "b",
    explanation: {
      ru: "NORM.DIST всегда возвращает площадь слева. Правый хвост — это единица минус левая площадь: 1 − 0,9115 = 0,0885. Последний аргумент всегда 1.",
      en: "NORM.DIST always returns the area to the left. The right tail is one minus that area: 1 − 0.9115 = 0.0885. The last argument is always 1.",
    },
  },
  {
    id: "m2-m11",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Z-таблица", en: "Z-table" },
    prompt: {
      ru: "По кумулятивной z-таблице P(Z ≤ 0,42) = 0,6628. Чему равно P(Z ≤ −0,42)?",
      en: "A cumulative z-table gives P(Z ≤ 0.42) = 0.6628. What is P(Z ≤ −0.42)?",
    },
    options: [
      { id: "a", text: { ru: "0,6628", en: "0.6628" } },
      { id: "b", text: { ru: "0,3372", en: "0.3372" } },
      { id: "c", text: { ru: "−0,6628", en: "−0.6628" } },
      { id: "d", text: { ru: "0,5000", en: "0.5000" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Кривая симметрична, поэтому P(Z ≤ −a) = P(Z ≥ a) = 1 − P(Z ≤ a) = 1 − 0,6628 = 0,3372. Совпадает с NORM.DIST(458; 500; 100; 1) = 0,3372.",
      en: "The curve is symmetrical, so P(Z ≤ −a) = P(Z ≥ a) = 1 − P(Z ≤ a) = 1 − 0.6628 = 0.3372. That matches NORM.DIST(458, 500, 100, 1) = 0.3372.",
    },
  },
  {
    id: "m2-m12",
    moduleId: 2,
    difficulty: "medium",
    topic: { ru: "Excel", en: "Excel" },
    prompt: {
      ru: "Что вычисляет SUMPRODUCT(значения; вероятности) для таблицы дискретного распределения?",
      en: "What does SUMPRODUCT(values, probabilities) compute for a discrete distribution table?",
    },
    options: [
      { id: "a", text: { ru: "Стандартное отклонение", en: "The standard deviation" } },
      { id: "b", text: { ru: "Математическое ожидание E(X) = Σ x·p(x)", en: "The expected value E(X) = Σ x·p(x)" } },
      { id: "c", text: { ru: "Кумулятивную вероятность", en: "The cumulative probability" } },
      { id: "d", text: { ru: "Сумму всех вероятностей", en: "The sum of all probabilities" } },
    ],
    answerId: "b",
    explanation: {
      ru: "SUMPRODUCT поэлементно перемножает массивы и складывает результаты — это буквально определение E(X). Для данных о спросе в магазине получается 11,49.",
      en: "SUMPRODUCT multiplies the arrays element by element and adds the results, which is literally the definition of E(X). For the store demand data it returns 11.49.",
    },
  },

  // ───────────────────────── HARD (4) ─────────────────────────
  {
    id: "m2-h1",
    moduleId: 2,
    difficulty: "hard",
    topic: { ru: "Нормальное распределение", en: "Normal distribution" },
    prompt: {
      ru: "Распределение с μ = 1000 и σ = 10. Известно, что P(Z ≤ 0,5) = 0,6915. Чему равно P(995 ≤ X ≤ 1005)?",
      en: "A distribution has μ = 1000 and σ = 10, and P(Z ≤ 0.5) = 0.6915. What is P(995 ≤ X ≤ 1005)?",
    },
    options: [
      { id: "a", text: { ru: "0,6915", en: "0.6915" } },
      { id: "b", text: { ru: "0,3829", en: "0.3829" } },
      { id: "c", text: { ru: "0,3085", en: "0.3085" } },
      { id: "d", text: { ru: "0,6800", en: "0.6800" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Стандартизуем: z = ±0,5. P(Z ≤ 0,5) = 0,6915, P(Z ≤ −0,5) = 1 − 0,6915 = 0,3085. Разность: 0,6915 − 0,3085 = 0,3829. Ответ 0,68 — ловушка: ±0,5σ, а не ±1σ.",
      en: "Standardize to z = ±0.5. P(Z ≤ 0.5) = 0.6915 and P(Z ≤ −0.5) = 1 − 0.6915 = 0.3085, so the strip is 0.6915 − 0.3085 = 0.3829. The 0.68 option is the trap: this is ±0.5σ, not ±1σ.",
    },
  },
  {
    id: "m2-h2",
    moduleId: 2,
    difficulty: "hard",
    topic: { ru: "Обратная задача", en: "Inverse problem" },
    prompt: {
      ru: "SAT: μ = 500, σ = 100. Какой балл соответствует 95-му процентилю, если z для 0,95 равно 1,645?",
      en: "SAT: μ = 500, σ = 100. Which score sits at the 95th percentile, given that z for 0.95 is 1.645?",
    },
    options: [
      { id: "a", text: { ru: "595", en: "595" } },
      { id: "b", text: { ru: "664,5", en: "664.5" } },
      { id: "c", text: { ru: "644,5", en: "644.5" } },
      { id: "d", text: { ru: "700", en: "700" } },
    ],
    answerId: "b",
    explanation: {
      ru: "x = μ + zσ = 500 + 1,645 × 100 = 664,5, то есть нужен балл 665. Совпадает с NORM.INV(0,95; 500; 100) = 664,4854. Вариант 644,5 — перестановка цифр из оговорки в транскрипте.",
      en: "x = μ + zσ = 500 + 1.645 × 100 = 664.5, so a score of 665 is needed. That matches NORM.INV(0.95, 500, 100) = 664.4854. The 644.5 option repeats a slip of the tongue in the transcript.",
    },
  },
  {
    id: "m2-h3",
    moduleId: 2,
    difficulty: "hard",
    topic: { ru: "Дискретные распределения", en: "Discrete distributions" },
    prompt: {
      ru: "32 наблюдения за очередью: 0 → 3 раза, 1 → 10, 2 → 8, 3 → 5, 4 → 3, 5 → 2, 6 → 1. Какова вероятность застать четырёх и более клиентов?",
      en: "32 observations of a queue: 0 → 3 times, 1 → 10, 2 → 8, 3 → 5, 4 → 3, 5 → 2, 6 → 1. What is the probability of finding four or more customers?",
    },
    options: [
      { id: "a", text: { ru: "0,094", en: "0.094" } },
      { id: "b", text: { ru: "0,188", en: "0.188" } },
      { id: "c", text: { ru: "0,344", en: "0.344" } },
      { id: "d", text: { ru: "0,812", en: "0.812" } },
    ],
    answerId: "b",
    explanation: {
      ru: "P(X ≥ 4) = P(4) + P(5) + P(6) = 3/32 + 2/32 + 1/32 = 0,094 + 0,063 + 0,031 = 0,188. Вариант 0,094 — только P(4); 0,812 — дополнение P(X ≤ 3).",
      en: "P(X ≥ 4) = P(4) + P(5) + P(6) = 3/32 + 2/32 + 1/32 = 0.094 + 0.063 + 0.031 = 0.188. The 0.094 option is P(4) alone and 0.812 is its complement P(X ≤ 3).",
    },
  },
  {
    id: "m2-h4",
    moduleId: 2,
    difficulty: "hard",
    topic: { ru: "Оценка σ", en: "Estimating σ" },
    prompt: {
      ru: "Нормальная кривая с центром в 50; хвост становится тонким примерно на 95. Какова оценка стандартного отклонения?",
      en: "A normal curve centred at 50 has its tail thinning out around 95. What is the estimated standard deviation?",
    },
    options: [
      { id: "a", text: { ru: "≈ 7,5, потому что 45 / 6", en: "≈ 7.5, because 45 / 6" } },
      { id: "b", text: { ru: "≈ 15, потому что 45 / 3", en: "≈ 15, because 45 / 3" } },
      { id: "c", text: { ru: "≈ 45, это и есть расстояние", en: "≈ 45, which is the distance itself" } },
      { id: "d", text: { ru: "≈ 22,5, потому что 45 / 2", en: "≈ 22.5, because 45 / 2" } },
    ],
    answerId: "b",
    explanation: {
      ru: "Здесь дано расстояние от среднего до края — одна сторона, то есть три сигмы: 95 − 50 = 45, σ ≈ 45 / 3 = 15. Делить на 6 нужно, когда дан полный диапазон от min до max.",
      en: "Here the distance from the mean to the edge is given — one side only, so three sigmas: 95 − 50 = 45 and σ ≈ 45 / 3 = 15. You divide by 6 only when handed the full min-to-max range.",
    },
  },
];
