import type { L10n } from "@/lib/types";

/**
 * UI chrome strings. Course *content* is bilingual inline (see
 * `useI18n().pick`) so that a lesson's prose and its JSX stay in one place.
 */
export const UI = {
  // ── brand / shell ─────────────────────────────────────────────
  appName: { ru: "Статистика 572", en: "Statistics 572" },
  courseLine: {
    ru: "UIUC iMBA · BADM 572 · Осень 2026",
    en: "UIUC iMBA · BADM 572 · Fall 2026",
  },
  courseTitle: {
    ru: "Статистика для управленческих решений",
    en: "Statistics for Management Decision Making",
  },
  visualLearner: { ru: "Режим визуального обучения", en: "Visual Learner mode" },

  // ── nav ───────────────────────────────────────────────────────
  navHome: { ru: "Главная", en: "Home" },
  navModules: { ru: "Модули", en: "Modules" },
  navGlossary: { ru: "Глоссарий", en: "Glossary" },
  navQuiz: { ru: "Тесты", en: "Quizzes" },
  navLab: { ru: "Песочница", en: "Data lab" },
  navExcel: { ru: "Excel", en: "Excel" },
  navAbout: { ru: "О проекте", en: "About" },

  // ── home ──────────────────────────────────────────────────────
  homeKicker: { ru: "Визуальный компаньон курса", en: "Visual course companion" },
  homeTitle: {
    ru: "Изучайте статистику глазами, а не только формулами",
    en: "Learn statistics with your eyes, not only formulas",
  },
  homeLead: {
    ru: "Полный конспект модулей, интерактивные графики, пошаговые Excel-практикумы, песочница с данными, глоссарий и тесты. Переключайте язык в правом верхнем углу.",
    en: "Full module notes, interactive charts, step-by-step Excel walkthroughs, a data sandbox, a glossary and quizzes. Switch language in the top-right corner.",
  },
  statModules: { ru: "Модулей готово", en: "Modules ready" },
  statTerms: { ru: "Терминов", en: "Glossary terms" },
  statQuestions: { ru: "Вопросов", en: "Quiz questions" },
  statViz: { ru: "Интерактивов", en: "Interactives" },
  startModule: { ru: "Начать с Модуля 1", en: "Start with Module 1" },
  openLab: { ru: "Открыть песочницу", en: "Open the data lab" },
  moduleList: { ru: "Модули курса", en: "Course modules" },

  // ── module page ───────────────────────────────────────────────
  allModules: { ru: "Все модули", en: "All modules" },
  moduleOf: { ru: "Модуль {n} из {total}", en: "Module {n} of {total}" },
  contentReady: { ru: "Контент готов", en: "Content ready" },
  comingSoon: { ru: "Скоро", en: "Coming soon" },
  whatYouLearn: { ru: "Что вы изучите", en: "What you'll learn" },
  topicChecklist: {
    ru: "Список тем по программе модуля.",
    en: "Topic checklist drawn from the module outline.",
  },
  prev: { ru: "Назад", en: "Prev" },
  next: { ru: "Далее", en: "Next" },
  glossaryTerms: { ru: "терминов", en: "glossary terms" },
  quizQuestions: { ru: "вопросов теста", en: "quiz questions" },
  loadingContent: { ru: "Загружаем контент модуля…", en: "Loading module content…" },
  moduleSoonTitle: { ru: "Контент модуля скоро появится", en: "Module content coming soon" },
  moduleSoonBody: {
    ru: "Здесь будут конспект, визуализации и Excel-практикумы этого модуля. Добавьте материалы модуля — и страница заполнится.",
    en: "Notes, visualizations and Excel walkthroughs for this module will live here. Add the module material and this page fills in.",
  },
  moduleNotFound: { ru: "Модуль не найден", en: "Module not found" },
  backToDashboard: { ru: "Вернуться на главную", en: "Back to dashboard" },

  // ── glossary ──────────────────────────────────────────────────
  glossaryTitle: { ru: "Глоссарий", en: "Glossary" },
  glossaryLead: {
    ru: "Термины курса с определениями на двух языках и формулами.",
    en: "Course terminology with bilingual definitions and formulas.",
  },
  searchPlaceholder: { ru: "Поиск термина…", en: "Search a term…" },
  allModulesFilter: { ru: "Все модули", en: "All modules" },
  relatedTerms: { ru: "Связанные термины", en: "Related terms" },
  nothingFound: { ru: "Ничего не найдено", en: "Nothing found" },
  nothingFoundBody: {
    ru: "Попробуйте другой запрос или снимите фильтр по модулю.",
    en: "Try a different query or clear the module filter.",
  },

  // ── quiz ──────────────────────────────────────────────────────
  quizTitle: { ru: "Тренировочный тест", en: "Practice quiz" },
  quizLead: {
    ru: "Выберите модули, длину теста и режим времени.",
    en: "Pick modules, quiz length and timing mode.",
  },
  quizModules: { ru: "Модули", en: "Modules" },
  quizLength: { ru: "Число вопросов", en: "Number of questions" },
  quizTimed: { ru: "На время", en: "Timed" },
  quizTimedHint: {
    ru: "60 секунд на вопрос. Время вышло — вопрос засчитывается как пропущенный.",
    en: "60 seconds per question. When the clock runs out the question counts as skipped.",
  },
  quizStart: { ru: "Начать тест", en: "Start quiz" },
  quizNoQuestions: {
    ru: "Для выбранных модулей пока нет вопросов.",
    en: "No questions yet for the selected modules.",
  },
  question: { ru: "Вопрос", en: "Question" },
  of: { ru: "из", en: "of" },
  check: { ru: "Проверить", en: "Check" },
  nextQuestion: { ru: "Следующий", en: "Next" },
  finish: { ru: "Завершить", en: "Finish" },
  correct: { ru: "Верно", en: "Correct" },
  incorrect: { ru: "Неверно", en: "Incorrect" },
  skipped: { ru: "Пропущено", en: "Skipped" },
  yourScore: { ru: "Ваш результат", en: "Your score" },
  timeSpent: { ru: "Затрачено времени", en: "Time spent" },
  reviewAnswers: { ru: "Разбор ответов", en: "Answer review" },
  retake: { ru: "Пройти заново", en: "Retake" },
  backToQuizSetup: { ru: "К настройкам теста", en: "Back to quiz setup" },
  noActiveQuiz: { ru: "Активного теста нет", en: "No active quiz" },
  noResult: { ru: "Результатов пока нет", en: "No results yet" },
  difficulty: { ru: "Сложность", en: "Difficulty" },
  easy: { ru: "лёгкий", en: "easy" },
  medium: { ru: "средний", en: "medium" },
  hard: { ru: "сложный", en: "hard" },

  // ── data lab ──────────────────────────────────────────────────
  labTitle: { ru: "Песочница с данными", en: "Data lab" },
  labLead: {
    ru: "Загрузите свои числа (или возьмите датасет из лекции) и постройте частотную таблицу, гистограмму, столбчатую или круговую диаграмму — прямо в браузере.",
    en: "Paste your own numbers (or load a dataset from the lecture) and build a frequency table, histogram, bar chart or pie chart right in the browser.",
  },
  labDataset: { ru: "Датасет", en: "Dataset" },
  labPaste: { ru: "Свои данные", en: "Your data" },
  labPasteHint: {
    ru: "Числа через запятую, пробел или с новой строки. Для категорий — по одной метке на строку.",
    en: "Numbers separated by commas, spaces or new lines. For categories — one label per line.",
  },
  labChartType: { ru: "Тип графика", en: "Chart type" },
  labBins: { ru: "Число интервалов (bins)", en: "Number of bins" },
  labSummary: { ru: "Сводка", en: "Summary" },
  labCount: { ru: "Наблюдений", en: "Observations" },
  labMin: { ru: "Минимум", en: "Minimum" },
  labMax: { ru: "Максимум", en: "Maximum" },
  labMean: { ru: "Среднее", en: "Mean" },
  labBinWidth: { ru: "Ширина интервала", en: "Bin width" },
  labFreqTable: { ru: "Частотная таблица", en: "Frequency table" },
  labInvalid: {
    ru: "Не удалось разобрать данные — проверьте формат.",
    en: "Could not parse the data — check the format.",
  },
  labDownloadCsv: { ru: "Скачать CSV", en: "Download CSV" },

  // ── excel ─────────────────────────────────────────────────────
  excelTitle: { ru: "Excel-практикумы", en: "Excel walkthroughs" },
  excelLead: {
    ru: "Пошаговые сценарии из видео-иллюстраций курса: частотные таблицы, гистограммы, круговые и точечные диаграммы.",
    en: "Step-by-step scripts from the course's Excel illustration videos: frequency tables, histograms, pie charts and scatter plots.",
  },
  step: { ru: "Шаг", en: "Step" },
  formulaLabel: { ru: "Формула", en: "Formula" },
  shortcutLabel: { ru: "Горячие клавиши", en: "Shortcut" },
  restart: { ru: "Сначала", en: "Restart" },

  // ── shared table / chart labels ───────────────────────────────
  category: { ru: "Категория", en: "Category" },
  frequency: { ru: "Частота", en: "Frequency" },
  relativeFrequency: { ru: "Отн. частота", en: "Relative frequency" },
  cumulative: { ru: "Накопленная", en: "Cumulative" },
  interval: { ru: "Интервал", en: "Interval" },
  total: { ru: "Итого", en: "Total" },
  value: { ru: "Значение", en: "Value" },
  count: { ru: "Количество", en: "Count" },
  share: { ru: "Доля", en: "Share" },
  reset: { ru: "Сбросить", en: "Reset" },
  show: { ru: "Показать", en: "Show" },
  hide: { ru: "Скрыть", en: "Hide" },
  answer: { ru: "Ответ", en: "Answer" },
  yourAnswer: { ru: "Ваш ответ", en: "Your answer" },
  tryAgain: { ru: "Ещё раз", en: "Try again" },
  source: { ru: "Источник", en: "Source" },

  // ── about ─────────────────────────────────────────────────────
  aboutTitle: { ru: "О приложении", en: "About" },
} satisfies Record<string, L10n>;

export type UiKey = keyof typeof UI;
