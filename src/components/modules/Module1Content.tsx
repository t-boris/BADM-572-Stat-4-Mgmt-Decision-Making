import {
  BookOpen,
  Table2,
  BarChart3,
  PieChart,
  ScatterChart,
  Compass,
  GraduationCap,
  Users,
} from "lucide-react";
import {
  LessonBlock,
  Definition,
  Formula,
  KeyTakeaway,
  Pitfall,
  CaseStudy,
  CompareTable,
  SectionHeader,
  SourceNote,
} from "./LessonBlock";
import VariableClassifier from "@/components/viz/VariableClassifier";
import MeasurementScales from "@/components/viz/MeasurementScales";
import PopulationSample from "@/components/viz/PopulationSample";
import FrequencyTableBuilder from "@/components/viz/FrequencyTableBuilder";
import FrequencyTableReader from "@/components/viz/FrequencyTableReader";
import HistogramExplorer from "@/components/viz/HistogramExplorer";
import PieVsBar from "@/components/viz/PieVsBar";
import ScatterExplorer from "@/components/viz/ScatterExplorer";
import ChartChooser from "@/components/viz/ChartChooser";
import ExcelWalkthrough from "@/components/viz/ExcelWalkthrough";
import { EXCEL_GUIDES } from "@/data/excelGuides";
import { WAITING_TIME_SAMPLE_10 } from "@/data/datasets";
import { useI18n } from "@/i18n/I18nContext";

const guide = (id: string) => EXCEL_GUIDES.find((g) => g.id === id)!;

export default function Module1Content() {
  const { pick } = useI18n();

  return (
    <div className="space-y-10">
      {/* ══════════════ 0. Введение ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<GraduationCap size={18} />}
          eyebrow={pick("Введение в курс", "Course introduction")}
          title={pick(
            "Зачем менеджеру статистика",
            "Why a manager needs statistics",
          )}
        />

        <LessonBlock
          eyebrow={pick("Постановка задачи", "Framing")}
          title={pick(
            "Данных стало больше — решения лучше не стали",
            "We have more data — our decisions did not get better",
          )}
        >
          <p>
            {pick(
              "ВВП, инфляция, безработица, результативность спортсмена, шанс выиграть в лотерею — числа окружают нас постоянно и подаются как основание для решений. Вопрос курса прямой: стали ли мы от этого лучше принимать решения и умеем ли вообще пользоваться этими числами?",
              "GDP, inflation, unemployment, an athlete's performance numbers, the odds of winning a lottery — numbers surround us and are handed to us as a basis for decisions. The course asks a blunt question: has that made us better decision-makers, and do we even know how to use these numbers?",
            )}
          </p>
          <Definition term={pick("Статистика", "Statistics")} en="Statistics">
            {pick(
              "Наука о «хороших» решениях в условиях неопределённости. В широком смысле — набор методов и процедур для анализа, интерпретации, отображения данных и принятия решений на их основе.",
              "The science of 'good' decision making in the face of uncertainty. In the broad sense — a range of techniques and procedures for analyzing, interpreting, displaying and making decisions based on data.",
            )}
          </Definition>
          <p>
            {pick(
              "Профессор Тагхабони-Дутта раскладывает предмет на три «кусочка пазла», которые складываются в решение:",
              "Professor Taghaboni-Dutta lays the subject out as three puzzle pieces that snap together into a decision:",
            )}
          </p>
          <CompareTable
            headers={[
              pick("Кусочек пазла", "Puzzle piece"),
              pick("Что делаем", "What we do"),
              pick("Где в курсе", "Where in the course"),
            ]}
            rows={[
              [
                "Describing Data",
                pick(
                  "Ясное, компактное и конкретное резюме того, что мы хотим узнать",
                  "A clear, compact and concrete summary of what we want to know",
                ),
                pick("Модуль 1 (этот) и модуль 2", "Module 1 (this one) and module 2"),
              ],
              [
                "Producing Data",
                pick(
                  "Формулируем более точные вопросы и собираем данные ровно под них",
                  "Formulate sharper questions and gather data tailored to answer them",
                ),
                pick("Выборки, sampling", "Sampling"),
              ],
              [
                "Conclusion from Data",
                pick(
                  "Делаем вывод и оцениваем, насколько мы в нём уверены",
                  "Draw a conclusion and judge how certain we can be about it",
                ),
                pick("Вывод, inferential statistics", "Inference, inferential statistics"),
              ],
            ]}
          />
          <p>
            {pick(
              "Курс не делает из вас data scientist — и лектор говорит об этом честно. Он делает из вас менеджера, который понимает, какие вопросы задать аналитику, как читать принесённый результат и как превратить его в решение.",
              "The course will not turn you into a data scientist — the lecturer says so plainly. It turns you into a manager who understands which questions to put to the analyst, how to read the answer that comes back, and how to convert it into a decision.",
            )}
          </p>
        </LessonBlock>

        <LessonBlock
          eyebrow={pick("Что может пойти не так", "What can go wrong")}
          title={pick(
            "Три места, где статистика ломается",
            "Three places where statistics break",
          )}
        >
          <p>
            {pick(
              "Статистику легко использовать неправильно — намеренно (неэтично) или ненамеренно (по незнанию). Сломаться может любое из трёх звеньев, и любого одного достаточно, чтобы вывод стал вредным:",
              "Statistics are easy to misuse — either intentionally by the unethical, or unintentionally by the unaware. Any one of three links can break, and one is enough to make the conclusion harmful:",
            )}
          </p>
          <CompareTable
            headers={[
              pick("Звено", "Link"),
              pick("Что ломается", "What breaks"),
              pick("Пример", "Example"),
            ]}
            rows={[
              [
                pick("Данные", "The data"),
                pick("Данные плохие: смещённая выборка, пропуски, ошибки измерения", "Bad data: biased sample, missing values, measurement error"),
                pick("Опрос только жителей Флориды — и вывод обо всей стране", "Surveying only Florida residents and concluding about the whole country"),
              ],
              [
                pick("Метод", "The method"),
                pick("Метод не подходит под тип данных или под вопрос", "The method does not fit the data type or the question"),
                pick("Среднее по почтовым индексам; линейный график по категориям", "Averaging zip codes; a line graph over categories"),
              ],
              [
                pick("Интерпретация", "The interpretation"),
                pick("Числа верны, но вывод из них — нет", "The numbers are right but the conclusion drawn from them is not"),
                pick("«Корреляция → причинность»", "'Correlation → causation'"),
              ],
            ]}
          />

          <CaseStudy title={pick("Три классических подмены (OnlineStatBook)", "Three classic fallacies (OnlineStatBook)")}>
            <p>
              <b>{pick("1. Ben & Jerry's. ", "1. Ben & Jerry's. ")}</b>
              {pick(
                "Новая реклама, запущенная в конце мая, дала рост продаж мороженого на 30 % за следующие три месяца — значит, реклама сработала. Изъян: потребление мороженого и так растёт в июне-июле-августе. Это history effect — эффект третьей переменной «время года».",
                "A new ad launched in late May produced a 30% rise in ice-cream sales over the next three months — so the ad worked. The flaw: ice-cream consumption rises in June, July and August regardless. This is a history effect — the third variable is the season.",
              )}
            </p>
            <p>
              <b>{pick("2. Церкви и преступность. ", "2. Churches and crime. ")}</b>
              {pick(
                "Чем больше в городе церквей, тем выше преступность — значит, церкви порождают преступность. Изъян: и то и другое объясняется размером города. Это third-variable problem.",
                "The more churches a city has, the more crime — so churches cause crime. The flaw: both are explained by population size. This is the third-variable problem.",
              )}
            </p>
            <p>
              <b>{pick("3. Межрасовые браки. ", "3. Interracial marriages. ")}</b>
              {pick(
                "Их на 75 % больше, чем 25 лет назад — значит, общество их принимает. Изъян: не хватает базы. Если было 1 % браков, а стало 1,75 % — это едва ли доказательство принятия. Всегда спрашивайте, от какой базы посчитан рост.",
                "There are 75% more than 25 years ago — so society accepts them. The flaw: we lack the base rate. If 1% of marriages were interracial and now 1.75% are, that is hardly evidence of acceptance. Always ask what base the increase is measured from.",
              )}
            </p>
          </CaseStudy>

          <KeyTakeaway>
            {pick(
              "Первый рефлекс статистически грамотного менеджера — не принять число, а спросить: откуда данные, каким методом получены и от какой базы посчитан процент.",
              "The first reflex of a statistically literate manager is not to accept a number but to ask: where did the data come from, by what method, and what base is that percentage measured against?",
            )}
          </KeyTakeaway>
        </LessonBlock>

        <LessonBlock
          eyebrow={pick("Цели курса", "Course objectives")}
          title={pick("Пять макро-целей", "Five macro objectives")}
        >
          <ol className="ml-4 list-decimal space-y-1">
            <li>{pick("Стать статистически грамотным (statistically literate).", "Become statistically literate.")}</li>
            <li>{pick("Научиться суммировать данные (summarize data).", "Learn how to summarize data.")}</li>
            <li>{pick("Научиться извлекать смысл из этих сводок (gain insight from the summaries).", "Learn how to gain insight from the summaries.")}</li>
            <li>{pick("Понять значение выборки и выборочных статистик.", "Understand the significance of sampling and sample statistics.")}</li>
            <li>{pick("Использовать выборочные статистики для выводов о совокупности.", "Use sample statistics to make inferences about the population.")}</li>
          </ol>
          <p className="text-ink-dim">
            {pick(
              "Модуль 1 закрывает цели 1 и 2 и подступается к цели 3. Формат обучения: видео-лекции с теорией, Excel-иллюстрации с применением, тесты для самопроверки и рецензируемые задания, где нужно объяснить или раскритиковать чужой анализ.",
              "Module 1 covers objectives 1 and 2 and starts on 3. The format: video lectures for theory, Excel illustrations for application, graded quizzes for self-check, and peer-reviewed assignments where you explain or critique someone else's analysis.",
            )}
          </p>
          <SourceNote>
            Taghaboni-Dutta, F. (2019). <i>Exploring and Producing Data for Business Decision Making</i>, Module 1. Gies College of Business, University of Illinois.
          </SourceNote>
        </LessonBlock>
      </section>

      {/* ══════════════ 1. Lesson 1-1 ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<BookOpen size={18} />}
          eyebrow="Lesson 1-1.1"
          title={pick("Базовая терминология", "Basic terminology")}
        />

        <LessonBlock
          eyebrow={pick("Словарь", "Vocabulary")}
          title={pick(
            "Учить статистику — как учить иностранный язык: сначала словарь",
            "Learning statistics is like learning a language: vocabulary first",
          )}
        >
          <Definition term={pick("Данные", "Data")} en="Data">
            {pick(
              "Факты и цифры, из которых можно сделать вывод. Ваш доход, возраст, уровень образования — всё это данные. Кстати, data — множественное число; одна единица информации — datum.",
              "Facts and figures from which conclusions can be drawn. Your income, your age, your education level are all data. Note that 'data' is plural; one piece of information is a 'datum'.",
            )}
          </Definition>
          <Definition term={pick("Переменная", "Variable")} en="Variable">
            {pick(
              "Любая характеристика элемента исследования, которая может принимать разные значения. Если мы изучаем, кто пришёл на этот курс, переменными будут пол, возраст, профессия, уровень образования, география.",
              "Any characteristic of an element that can take different values. If we study who enrolled in this course, the variables are gender, age, occupation, education level and geography.",
            )}
          </Definition>
          <Definition term={pick("Датасет", "Data set")} en="Data set">
            {pick(
              "Данные, собранные для конкретного исследования: для каждого элемента — значения всех интересующих переменных. Элементом может быть человек, событие или объект.",
              "The data collected for a particular study: for each element, the values of every variable of interest. An element can be a person, an event or an object.",
            )}
          </Definition>

          <p className="pt-1">
            {pick(
              "Дальше — главная развилка модуля: тип переменной. Он определяет, какой график вы имеете право построить и какую статистику посчитать.",
              "Next comes the module's central fork: the type of variable. It determines which chart you are entitled to draw and which statistic you may compute.",
            )}
          </p>

          <CompareTable
            headers={[
              pick("Тип", "Type"),
              pick("Что это", "What it is"),
              pick("Примеры", "Examples"),
              pick("Единица измерения", "Unit of measure"),
            ]}
            rows={[
              [
                pick("Количественная (Quantitative / Numerical)", "Quantitative (numerical)"),
                pick("Число, выражающее количество, измеренное в фиксированной единице", "A number expressing a quantity, measured in a fixed unit"),
                pick("Годовая зарплата, возраст, температура, время ожидания", "Annual salary, age, temperature, waiting time"),
                pick("Есть (доллары, годы, °F, секунды)", "Yes (dollars, years, °F, seconds)"),
              ],
              [
                pick("Качественная / категориальная (Qualitative / Categorical)", "Qualitative / categorical"),
                pick("Значение обозначает категорию, а не количество", "The value names a category, not a quantity"),
                pick("Пол, этничность, модель пикапа, оценка сервиса 1–5", "Gender, ethnicity, truck model, a 1–5 service rating"),
                pick("Нет — «просто числа» или слова", "None — 'just numbers' or words"),
              ],
            ]}
          />

          <Pitfall>
            {pick(
              "Числовое значение ещё не делает переменную количественной. Оценка сервиса от 1 до 5 записана цифрами, но у этих цифр нет единицы измерения: они кодируют категории удовлетворённости. Обратный пример — почтовый индекс 61820: это метка, а не величина.",
              "A numeric value does not make a variable quantitative. A 1-to-5 service rating is written in digits, but those digits have no unit of measure: they encode satisfaction categories. The mirror case is zip code 61820: a label, not a magnitude.",
            )}
          </Pitfall>

          <p>
            {pick(
              "Качественные переменные, в свою очередь, делятся на два вида:",
              "Qualitative variables split further into two kinds:",
            )}
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <b>{pick("Номинативная (nominative). ", "Nominative. ")}</b>
              {pick(
                "Осмысленного порядка нет: пол, штат проживания, цвет волос, почтовый индекс.",
                "No meaningful ordering exists: gender, state of residence, hair colour, zip code.",
              )}
            </li>
            <li>
              <b>{pick("Порядковая (ordinal). ", "Ordinal. ")}</b>
              {pick(
                "Порядок есть — независимо от того, записаны категории словами или цифрами: «отлично / хорошо / средне / плохо / неудовлетворительно» и то же самое как 4 / 3 / 2 / 1 / 0.",
                "An ordering exists — whether the categories are recorded in words or numbers: 'excellent / good / average / poor / unsatisfactory' and the same thing as 4 / 3 / 2 / 1 / 0.",
              )}
            </li>
          </ul>
        </LessonBlock>

        <VariableClassifier />

        <LessonBlock
          eyebrow={pick("Дополнительное чтение · OnlineStatBook", "Assigned reading · OnlineStatBook")}
          title={pick(
            "Шкалы измерения и независимая/зависимая переменная",
            "Levels of measurement and independent/dependent variables",
          )}
        >
          <p>
            {pick(
              "Учебник OnlineStatBook добавляет к лекционной паре «количественная / категориальная» более тонкую классификацию из четырёх шкал. Она объясняет, почему средняя температура считать можно, а средний почтовый индекс — нет.",
              "OnlineStatBook adds a finer, four-way classification on top of the lecture's quantitative/categorical pair. It explains why an average temperature is fine while an average zip code is not.",
            )}
          </p>
          <Definition term={pick("Независимая переменная", "Independent variable")} en="Independent variable">
            {pick(
              "Та, которой управляет исследователь (или менеджер): тип антидепрессанта, вид пищевой добавки, размер рекламного бюджета. На графике всегда идёт по оси X.",
              "The one the experimenter (or manager) manipulates: the type of antidepressant, the dietary supplement, the advertising budget. On a chart it always goes on the X axis.",
            )}
          </Definition>
          <Definition term={pick("Зависимая переменная", "Dependent variable")} en="Dependent variable">
            {pick(
              "Та, на которой измеряют эффект: облегчение депрессии, результат теста памяти, объём продаж. Идёт по оси Y.",
              "The one on which the effect is measured: relief from depression, the memory-test score, sales volume. It goes on the Y axis.",
            )}
          </Definition>
          <p className="text-ink-dim">
            {pick(
              "Пример из учебника: 19-месячных крыс кормили обычным рационом либо рационом с добавкой черники, клубники или шпината, затем тестировали память и моторику. Независимая переменная — вид добавки, зависимая — результат теста.",
              "The textbook's example: 19-month-old rats were fed either a standard diet or one supplemented with blueberry, strawberry or spinach powder, then given memory and motor-skill tests. The independent variable is the supplement; the dependent variable is the test result.",
            )}
          </p>
        </LessonBlock>

        <MeasurementScales />
      </section>

      {/* ══════════════ 2. Совокупность и выборка ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<Users size={18} />}
          eyebrow={pick("Lesson 1-1.1 · продолжение", "Lesson 1-1.1 · continued")}
          title={pick(
            "Совокупность, выборка, параметр и статистика",
            "Population, sample, parameter and statistic",
          )}
        />

        <LessonBlock>
          <Definition term={pick("Генеральная совокупность", "Population")} en="Population">
            {pick(
              "Множество всех элементов, о которых мы хотим сделать вывод. Пример: все жители Иллинойса, если нас интересует их занятость. Раз в 10 лет правительство США проводит перепись (Census) — это сбор данных по всей совокупности.",
              "The set of all elements about which we wish to draw a conclusion. Example: every resident of Illinois, if employment status is the question. Every ten years the US government runs a Census — data collection over the entire population.",
            )}
          </Definition>
          <Definition term={pick("Выборка", "Sample")} en="Sample">
            {pick(
              "Подмножество элементов совокупности. Исследование всей совокупности почти всегда слишком дорого и долго, поэтому мы работаем с выборкой: например, опрашиваем несколько тысяч вероятных избирателей, чтобы предсказать исход выборов.",
              "A subset of the units of a population. Studying the whole population is almost always too expensive and too slow, so we work with a sample: polling a few thousand likely voters to predict an election, for instance.",
            )}
          </Definition>
          <Definition term={pick("Параметр и статистика", "Parameter and statistic")} en="Parameter / statistic">
            {pick(
              "Параметр совокупности (population parameter) — сводная величина, посчитанная по всей совокупности. Выборочная статистика (sample statistic) — та же величина, посчитанная по выборке. Мы используем статистику, чтобы оценить параметр.",
              "A population parameter is a summary measure computed from the whole population. A sample statistic is the same measure computed from the sample. We use statistics to estimate parameters.",
            )}
          </Definition>
          <Formula caption={pick("Обозначения, к которым стоит привыкнуть сразу", "Notation worth getting used to immediately")}>
            {pick(
              `Совокупность (population)      Выборка (sample)
-----------------------------  -----------------------------
μ   среднее                    x̄   среднее
σ   стандартное отклонение     s   стандартное отклонение
N   размер                     n   размер`,
              `Population                     Sample
-----------------------------  -----------------------------
μ   mean                       x̄   mean
σ   standard deviation         s   standard deviation
N   size                       n   size`,
            )}
          </Formula>

          <Definition term={pick("Описательная статистика", "Descriptive statistics")} en="Descriptive statistics">
            {pick(
              "Числа, которые суммируют и описывают имеющиеся данные — и ничего не утверждают за их пределами. Весь Модуль 1 — про неё.",
              "Numbers that summarize and describe the data at hand — and claim nothing beyond it. All of Module 1 lives here.",
            )}
          </Definition>
          <Definition term={pick("Индуктивная статистика", "Inferential statistics")} en="Inferential statistics">
            {pick(
              "Математические процедуры, которые превращают информацию о выборке в обоснованное предположение о совокупности. Требует случайности отбора.",
              "The mathematical procedures that convert information about the sample into an intelligent guess about the population. It requires that sampling be random.",
            )}
          </Definition>
          <Definition term={pick("Простая случайная выборка", "Simple random sampling")} en="Simple random sampling">
            {pick(
              "Каждый элемент совокупности имеет равный шанс попасть в выборку, и отбор одного элемента не меняет вероятность отбора любого другого. Отбор — «чистый случай».",
              "Every member of the population has an equal chance of being selected, and selecting one member is independent of selecting any other. Selection is by pure chance.",
            )}
          </Definition>

          <CaseStudy title={pick("Олимпийский марафон: где описательная статистика останавливается", "The Olympic marathon: where descriptive statistics stop")}>
            <p>
              {pick(
                "Средний результат победителя в первых 13 мужских марафонах (до 1952 года) — 2:44:22, в следующих 13 (с 1956) — 2:13:18. Разница больше получаса.",
                "The mean winning time of the first 13 men's marathons (through 1952) is 2:44:22; of the next 13 (from 1956) it is 2:13:18. A difference of more than half an hour.",
              )}
            </p>
            <p>
              {pick(
                "Доказывает ли это, что бегуны стали быстрее? Описательная статистика ответить не может — она лишь констатирует, что два средних «наводят на мысль». Проверка того, случайна ли разница, — задача индуктивной статистики.",
                "Does that prove the fastest men are running faster? Descriptive statistics cannot say — it can only affirm that the two means are 'suggestive'. Testing whether the difference is due to chance is the job of inferential statistics.",
              )}
            </p>
          </CaseStudy>
          <SourceNote>
            Lane, D. M. et al. <i>Online Statistics Education: An Interactive Multimedia Course of Study</i>, ch. 1 — Descriptive Statistics, Inferential Statistics, Variables, Levels of Measurement. onlinestatbook.com
          </SourceNote>
        </LessonBlock>

        <PopulationSample />
      </section>

      {/* ══════════════ 3. Lesson 1-2 ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<Table2 size={18} />}
          eyebrow="Lesson 1-2"
          title={pick("Частотные таблицы", "Frequency tables")}
        />

        <LessonBlock
          eyebrow={pick("Зачем суммировать", "Why summarize")}
          title={pick(
            "Куча данных сама по себе бесполезна",
            "A pile of data is useless on its own",
          )}
        >
          <p>
            {pick(
              "Мы собираем данные, чтобы принимать решения: как промо-акция повлияла на продажи, какова производительность персонала. Но смотреть на 233 601 строку невозможно. Модуль 1 даёт четыре визуальных инструмента резюмирования:",
              "We collect data to make better decisions: how a promotion affected sales, how productive the workforce is. But you cannot look at 233,601 rows. Module 1 gives four visual summarization tools:",
            )}
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>{pick("Частотные таблицы — Lesson 1-2", "Frequency tables — Lesson 1-2")}</li>
            <li>{pick("Гистограммы — Lesson 1-3", "Histograms — Lesson 1-3")}</li>
            <li>{pick("Круговые диаграммы — Lesson 1-4", "Pie charts — Lesson 1-4")}</li>
            <li>{pick("Диаграммы рассеяния — Lesson 1-5", "Scatter plots — Lesson 1-5")}</li>
          </ul>

          <Definition term={pick("Частотная таблица", "Frequency table")} en="Frequency table">
            {pick(
              "Таблица, показывающая, сколько раз встретилось каждое значение (для категорий) или сколько наблюдений попало в каждый интервал (для чисел).",
              "A table showing how many times each value occurs (for categories) or how many observations fall into each interval (for numbers).",
            )}
          </Definition>
          <Definition term={pick("Относительная частота", "Relative frequency")} en="Relative frequency">
            {pick(
              "Доля наблюдений в категории от общего числа наблюдений.",
              "The proportion of observations in a category out of all observations.",
            )}
          </Definition>
          <Formula caption={pick("Ключевая формула модуля", "The module's key formula")}>
            {pick(
              `Относительная частота = (наблюдений в категории) ÷ (всего наблюдений)

Ford F-Series: 71 332 ÷ 233 601 = 0,3054 → 30,5 %`,
              `Relative frequency = (observations in category) ÷ (total observations)

Ford F-Series: 71,332 ÷ 233,601 = 0.3054 → 30.5%`,
            )}
          </Formula>

          <KeyTakeaway>
            {pick(
              "Частота отвечает на вопрос «сколько?», относительная частота — на вопрос «какая доля рынка / какой процент клиентов?». Второй вопрос почти всегда полезнее для управленческого решения.",
              "Frequency answers 'how many?'; relative frequency answers 'what share of the market / what percentage of customers?'. The second question is almost always the more useful one for a decision.",
            )}
          </KeyTakeaway>
        </LessonBlock>

        <FrequencyTableBuilder />

        <LessonBlock
          eyebrow={pick("Количественные данные", "Quantitative data")}
          title={pick(
            "Здесь нельзя считать каждое значение отдельной категорией",
            "Here you cannot treat every value as its own category",
          )}
        >
          <p>
            {pick(
              "Колл-центр записал время ожидания 500 клиентов в секундах. Вот первые десять наблюдений:",
              "A call centre recorded the waiting time of 500 customers in seconds. Here are the first ten observations:",
            )}
          </p>
          <Formula caption={pick("Lesson 1-2.1, слайд 22 — секунды", "Lesson 1-2.1, slide 22 — seconds")}>
            {WAITING_TIME_SAMPLE_10.join("   ")}
          </Formula>
          <p>
            {pick(
              "У каждого клиента своё значение, поэтому категориями они быть не могут. Решение — интервалы (bins, class intervals): «0–30 секунд», «31–60», «61–90» и так далее до 300. Минимум в данных 0, максимум 300, шаг 30 → десять интервалов.",
              "Every customer has their own value, so they cannot serve as categories. The answer is intervals (bins, class intervals): '0–30 seconds', '31–60', '61–90' and so on up to 300. The data run from 0 to 300, a step of 30 gives ten intervals.",
            )}
          </p>
          <CompareTable
            caption={pick(
              "Опубликованная в лекции сводка 500 наблюдений (Lesson 1-2.1, слайд 23).",
              "The lecture's published summary of the 500 observations (Lesson 1-2.1, slide 23).",
            )}
            headers={[
              pick("Верхняя граница, с", "Upper limit, s"),
              pick("Частота", "Frequency"),
              pick("Отн. частота", "Relative frequency"),
            ]}
            rows={[
              ["30", "30", "0.060"],
              ["60", "49", "0.098"],
              ["90", "40", "0.080"],
              ["120", "40", "0.080"],
              ["150", "37", "0.074"],
              ["180", "45", "0.090"],
              ["210", "66", "0.132"],
              ["240", "62", "0.124"],
              ["270", "71", "0.142"],
              ["300", "60", "0.120"],
              [
                <b key="t">{pick("Итого", "Total")}</b>,
                <b key="f">500</b>,
                <b key="r">1.000</b>,
              ],
            ]}
          />
          <p>
            {pick(
              "Читаем: 66 клиентов ждали от 181 до 210 секунд — это 13 % всех обратившихся. Масса наблюдений смещена в верхние интервалы: большинство ждёт от трёх до пяти минут. Для менеджера клиентского сервиса это плохая новость, и увидеть её в исходных 500 строках было невозможно.",
              "Reading it: 66 customers waited between 181 and 210 seconds — 13% of all callers. The mass sits in the upper bins: most people wait between three and five minutes. For a customer-service manager that is bad news, and it was invisible in the 500 raw rows.",
            )}
          </p>
          <Pitfall>
            {pick(
              "Значение в столбце bin — это ВЕРХНЯЯ граница интервала, а не его середина и не ширина. «210» означает «от 181 до 210 секунд включительно». В отчётах разные авторы группируют по-разному — всегда проверяйте, как именно посчитаны интервалы.",
              "A bin value is the interval's UPPER limit — not its midpoint and not its width. '210' means 'from 181 to 210 seconds inclusive'. Different authors group differently, so always check how the intervals were built.",
            )}
          </Pitfall>
        </LessonBlock>

        <FrequencyTableReader />

        <div className="space-y-4">
          <h3 className="font-display text-base font-semibold">
            {pick("Excel-практикумы к Lesson 1-2", "Excel walkthroughs for Lesson 1-2")}
          </h3>
          <ExcelWalkthrough guide={guide("freq-quant")} />
          <ExcelWalkthrough guide={guide("freq-qual")} />
          <ExcelWalkthrough guide={guide("bar")} />
        </div>
      </section>

      {/* ══════════════ 4. Lesson 1-3 ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<BarChart3 size={18} />}
          eyebrow="Lesson 1-3"
          title={pick("Гистограммы", "Histograms")}
        />

        <LessonBlock>
          <Definition term={pick("Гистограмма", "Histogram")} en="Histogram">
            {pick(
              "Особый вид столбчатой диаграммы для количественных данных: числа сгруппированы в интервалы, а высота вертикального столбца показывает, сколько раз интервал встретился (частоту).",
              "A special form of bar graph for quantitative data: the numbers are grouped together and the height of each vertical bar shows how many times that range was observed (its frequency).",
            )}
          </Definition>
          <p>
            {pick(
              "Конструкция: по горизонтальной оси — данные, разбитые на интервалы (bins / class intervals); по вертикальной — частота (или относительная частота, тогда график называют распределением частот, frequency distribution).",
              "Construction: the horizontal axis carries the data broken into bins (class intervals); the vertical axis carries the frequency — or the relative frequency, in which case the chart is called a frequency distribution.",
            )}
          </p>

          <CompareTable
            headers={[
              "",
              pick("Столбчатая диаграмма (bar chart)", "Bar chart"),
              pick("Гистограмма (histogram)", "Histogram"),
            ]}
            rows={[
              [
                pick("Тип данных", "Data type"),
                pick("Качественные (категории)", "Qualitative (categories)"),
                pick("Количественные (числа)", "Quantitative (numbers)"),
              ],
              [
                pick("Ось X", "X axis"),
                pick("Названия категорий, порядок произволен", "Category names, order is arbitrary"),
                pick("Числовая шкала, порядок обязателен", "A numeric scale, the order is mandatory"),
              ],
              [
                pick("Столбцы", "Bars"),
                pick("С зазорами", "Separated by gaps"),
                pick("Вплотную друг к другу", "Touching each other"),
              ],
              [
                pick("Ключевое решение", "Key decision"),
                pick("Порядок сортировки", "Sort order"),
                pick("Ширина интервала", "Bin width"),
              ],
            ]}
          />

          <p>
            {pick(
              "Пример из лекции: годовая доходность более чем 500 хедж-фондов, значения от −0,16 % до +20 %. При интервалах шириной 0,05 почти 400 фондов проваливаются в один столбец — данные «пересуммированы», детали потеряны. При ширине 0,01 картина распределения читается: около 28,5 % фондов дали доходность от 0,01 до 0,02.",
              "The lecture's example: annual returns of more than 500 hedge funds, ranging from −0.16% to +20%. With bins of width 0.05 nearly 400 funds fall into a single bar — the data are over-summarized and the detail is gone. With width 0.01 the distribution becomes readable: about 28.5% of funds returned between 0.01 and 0.02.",
            )}
          </p>

          <Definition term={pick("Правило Стёрджеса", "Sturges' rule")} en="Sturges' rule">
            {pick(
              "Число интервалов ≈ 1 + log₂(N), то же самое, что 1 + 3,3·log₁₀(N). Для 1000 наблюдений даёт 11 интервалов.",
              "Number of intervals ≈ 1 + log₂(N), equivalently 1 + 3.3·log₁₀(N). For 1000 observations it gives 11 intervals.",
            )}
          </Definition>
          <Definition term={pick("Правило Райса", "Rice rule")} en="Rice rule">
            {pick(
              "Число интервалов = 2·∛N. Для 1000 наблюдений даёт 20 интервалов. OnlineStatBook рекомендует его как более удачное, чем правило Стёрджеса.",
              "Number of intervals = 2·∛N. For 1000 observations it gives 20 intervals. OnlineStatBook prefers it over Sturges' rule.",
            )}
          </Definition>
          <Formula caption={pick("Оба правила — отправная точка, а не закон", "Both rules are a starting point, not a law")}>
{`Sturges:  k ≈ 1 + log2(N) = 1 + 3.3 · log10(N)
Rice:     k = 2 · N^(1/3)

N = 642  →  Sturges ≈ 10,  Rice ≈ 17   (в учебнике выбрано 13)
N = 500  →  Sturges ≈ 10,  Rice ≈ 16   (в лекции выбрано 10)`}
          </Formula>
          <Pitfall>
            {pick(
              "Границы интервалов ставят посередине между возможными значениями (39,5 · 49,5 · 59,5…), чтобы ни одно наблюдение не оказалось ровно на границе. Excel решает ту же проблему иначе: интервал включает верхнюю границу и не включает нижнюю.",
              "Interval limits are placed midway between possible values (39.5 · 49.5 · 59.5…) so that no observation lands exactly on a boundary. Excel solves the same problem differently: a bin includes its upper limit and excludes its lower one.",
            )}
          </Pitfall>
          <KeyTakeaway>
            {pick(
              "Ширина интервала — это не техническая настройка, а управленческий выбор. Широкие интервалы отвечают на вопрос «есть ли проблема?», узкие — на вопрос «как именно устроена проблема?».",
              "Bin width is not a technical setting but a managerial choice. Wide bins answer 'is there a problem?'; narrow bins answer 'what exactly is the shape of the problem?'.",
            )}
          </KeyTakeaway>
        </LessonBlock>

        <HistogramExplorer />
        <ExcelWalkthrough guide={guide("hist")} />
      </section>

      {/* ══════════════ 5. Lesson 1-4 ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<PieChart size={18} />}
          eyebrow="Lesson 1-4"
          title={pick("Круговые диаграммы", "Pie charts")}
        />

        <LessonBlock>
          <Definition term={pick("Круговая диаграмма", "Pie chart")} en="Pie chart">
            {pick(
              "Инструмент визуального резюмирования категориальных данных: каждая категория — сектор, площадь которого пропорциональна доле наблюдений в этой категории (относительной частоте × 100).",
              "A graphical summary tool for categorical data: each category is a slice whose area is proportional to the percentage of responses in that category (relative frequency × 100).",
            )}
          </Definition>
          <p>
            {pick(
              "Ключевое свойство: категории вместе исчерпывают все возможности и в сумме дают 100 %. Именно поэтому круговая диаграмма хорошо отвечает на вопрос «какая доля целого?» и плохо — на вопрос «сколько именно?».",
              "The key property: the categories collectively represent all the possibilities and sum to 100%. That is why a pie chart answers 'what share of the whole?' well and 'how many exactly?' badly.",
            )}
          </p>

          <CaseStudy title={pick("Какой десерт любят американцы (Crisco / American Pie Council, 2008)", "What dessert Americans like (Crisco / American Pie Council, 2008)")}>
            <p>
              {pick(
                "На вопрос, какой десерт они хотели бы получить от гостя на праздничный ужин, американцы ответили: пирог (pie) — 29 %, торт — 17 %, печенье — 15 %. Это и есть тройка лидеров.",
                "Asked what dessert they would prefer a friend or family member to bring to a holiday dinner, Americans said: pie 29%, cake 17%, cookies 15%. That is the top three.",
              )}
            </p>
            <p>
              {pick(
                "Второй вопрос — какой именно пирог: яблочный 19 %, тыквенный 13 %, ореховый 12 %, банановый крем 10 %, вишнёвый 9 %. Обратите внимание: это разбивка внутри одного сектора первой диаграммы — приём, который стоит держать в арсенале.",
                "The follow-up question — which pie: apple 19%, pumpkin 13%, pecan 12%, banana cream 10%, cherry 9%. Note that this breaks down one slice of the first chart — a technique worth keeping in your toolkit.",
              )}
            </p>
          </CaseStudy>

          <Pitfall>
            {pick(
              "Три ограничения круговой диаграммы: (1) она разваливается при большом числе категорий; (2) сравнивать два опроса двумя «пирогами» почти невозможно — Эдвард Тафти писал, что «хуже одной круговой диаграммы только несколько круговых диаграмм»; (3) при малой выборке подписывайте секторы частотами, а не процентами: «60 % пользователей Windows» из пяти опрошенных вводит в заблуждение.",
              "Three limits of the pie chart: (1) it falls apart with many categories; (2) comparing two surveys with two pies is nearly impossible — Edward Tufte wrote that 'the only worse design than a pie chart is several of them'; (3) with a small sample, label slices with frequencies rather than percentages: '60% Windows users' out of five interviewees is misleading.",
            )}
          </Pitfall>
          <p>
            {pick(
              "Решение проблемы «слишком много категорий» из Excel-практикума — диаграмма «pie of pie»: всё, что меньше заданного порога (например, 10 % рынка), выносится во вторичный круг. Основная диаграмма остаётся читаемой: Ford 31 %, Silverado 23 %, Ram 19 %, все остальные вместе 27 %.",
              "The Excel walkthrough's answer to 'too many categories' is the pie-of-pie chart: everything below a threshold (say 10% of the market) moves into a secondary circle. The main chart stays readable: Ford 31%, Silverado 23%, Ram 19%, everything else together 27%.",
            )}
          </p>
        </LessonBlock>

        <PieVsBar />
        <ExcelWalkthrough guide={guide("pie")} />
      </section>

      {/* ══════════════ 6. Lesson 1-5 ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<ScatterChart size={18} />}
          eyebrow="Lesson 1-5"
          title={pick("Диаграммы рассеяния и линейные графики", "Scatter plots and line graphs")}
        />

        <LessonBlock>
          <p>
            {pick(
              "До этого момента мы суммировали по одной переменной: сколько ждал клиент, какой пикап продан. А если вопрос звучит иначе: влияет ли число часов подготовки на оценку? Влияют ли расходы на рекламу на продажи? Тогда наблюдение — это пара значений, и нужен другой инструмент.",
              "Until now we summarized a single variable: how long a customer waited, which truck was sold. But what if the question is different: does the number of hours studied affect the grade? Does money spent on advertising affect sales? Then an observation is a pair of values, and we need a different tool.",
            )}
          </p>
          <Definition term={pick("Диаграмма рассеяния", "Scatter plot")} en="Scatter plot">
            {pick(
              "График, показывающий связь между двумя переменными, значения которых образуют пары. По оси X откладывается независимая переменная, по оси Y — зависимая.",
              "A picture of the relationship between two data points that are paired together. The X axis carries the independent variable, the Y axis the dependent one.",
            )}
          </Definition>
          <Definition term={pick("Временной ряд", "Time series")} en="Time series">
            {pick(
              "Частный случай диаграммы рассеяния, где по оси X отложено время. Пример из лекции — стоимость экспорта США в Китай с 1992 по 2014 год: до 1999 года рост почти плоский, с 2000-го — устойчивый, близкий к линейному.",
              "A special case of the scatter plot in which time is on the X axis. The lecture's example is the value of US exports to China from 1992 to 2014: growth is nearly flat until 1999, then steady and close to linear from 2000 on.",
            )}
          </Definition>
          <Definition term={pick("Линейный график", "Line graph")} en="Line graph">
            {pick(
              "Столбчатая диаграмма, у которой вершины столбцов соединены линией, а сами столбцы убраны. Подчёркивает изменение от периода к периоду и позволяет сравнить несколько рядов на одном поле.",
              "A bar graph with the tops of the bars joined by lines and the bars themselves suppressed. It emphasizes change from period to period and lets several series share one chart.",
            )}
          </Definition>
          <Pitfall>
            {pick(
              "Линейный график допустим, только когда ОБЕ оси несут упорядоченные величины. Соединять линией число игроков в блэкджек, бридж, канасту и покер — грубая ошибка: график начинает утверждать, что игры естественным образом упорядочены. Для категорий берите столбчатую диаграмму.",
              "A line graph is appropriate only when BOTH axes display ordered variables. Joining the number of players of blackjack, bridge, canasta and poker with a line is a plain error: the chart starts claiming the games are naturally ordered. For categories, use a bar chart.",
            )}
          </Pitfall>
          <KeyTakeaway>
            {pick(
              "Из диаграммы рассеяния видно направление и силу связи, но не её причина и не её статистическая значимость. Проверка значимости — регрессия — тема следующего курса. В Модуле 1 линию тренда сознательно не строим.",
              "A scatter plot shows the direction and strength of a relationship, but not its cause and not its statistical significance. Testing significance — regression — belongs to the next course. In Module 1 we deliberately leave the trendline off.",
            )}
          </KeyTakeaway>
        </LessonBlock>

        <ScatterExplorer />
        <ExcelWalkthrough guide={guide("scatter")} />
      </section>

      {/* ══════════════ 7. Итоги ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<Compass size={18} />}
          eyebrow={pick("Сборка модуля", "Putting it together")}
          title={pick("Как выбрать график и не соврать", "How to choose a chart and not lie")}
        />

        <ChartChooser />

        <LessonBlock
          eyebrow={pick("Чек-лист", "Checklist")}
          title={pick("Что должно быть в голове после Модуля 1", "What should be in your head after Module 1")}
        >
          <CompareTable
            headers={[
              pick("Вопрос на экзамене", "Exam question"),
              pick("Короткий ответ", "Short answer"),
            ]}
            rows={[
              [
                pick("Переменная количественная или качественная?", "Is the variable quantitative or qualitative?"),
                pick("Есть единица измерения и осмысленна ли разность? Если да — количественная.", "Is there a unit of measure and are differences meaningful? If yes — quantitative."),
              ],
              [
                pick("Номинативная или порядковая?", "Nominative or ordinal?"),
                pick("Есть ли осмысленный порядок категорий? Если да — порядковая.", "Is there a meaningful ordering of the categories? If yes — ordinal."),
              ],
              [
                pick("Это параметр или статистика?", "Parameter or statistic?"),
                pick("Посчитано по всей совокупности — параметр (μ, σ, N). По выборке — статистика (x̄, s, n).", "Computed over the whole population — a parameter (μ, σ, N). Over a sample — a statistic (x̄, s, n)."),
              ],
              [
                pick("Как считается относительная частота?", "How is relative frequency computed?"),
                pick("Частота ÷ общее число наблюдений. Всегда уточняйте знаменатель.", "Frequency ÷ total observations. Always check the denominator."),
              ],
              [
                pick("Что означает значение bin?", "What does a bin value mean?"),
                pick("Верхнюю границу интервала.", "The interval's upper limit."),
              ],
              [
                pick("Сколько интервалов брать?", "How many intervals?"),
                pick("Между 1 + log₂(N) и 2·∛N; окончательный выбор — по выразительности.", "Between 1 + log₂(N) and 2·∛N; the final choice is by expressiveness."),
              ],
              [
                pick("Когда круговая, а когда столбчатая?", "Pie or bar?"),
                pick("Доли от целого — круговая. Точные значения и ранжирование — столбчатая.", "Shares of a whole — pie. Exact values and ranking — bar."),
              ],
              [
                pick("Что на оси X диаграммы рассеяния?", "What goes on the scatter plot's X axis?"),
                pick("Независимая переменная.", "The independent variable."),
              ],
              [
                pick("Когда линейный график неуместен?", "When is a line graph wrong?"),
                pick("Когда ось X — категории без естественного порядка.", "When the X axis holds categories with no natural ordering."),
              ],
            ]}
          />
          <KeyTakeaway>
            {pick(
              "Резюмирование данных — не косметика, а первый шаг анализа: оно даёт мгновенное понимание ситуации, позволяет донести её до других и подсказывает следующий вопрос, который стоит задать данным.",
              "Summarizing data is not cosmetics but the first analytical step: it gives an immediate grasp of the situation, lets you communicate it to others, and suggests the next question worth putting to the data.",
            )}
          </KeyTakeaway>
        </LessonBlock>
      </section>
    </div>
  );
}
