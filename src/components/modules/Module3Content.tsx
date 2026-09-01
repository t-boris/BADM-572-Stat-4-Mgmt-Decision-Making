import {
  Beaker,
  Database,
  GraduationCap,
  Layers3,
  Network,
  Sigma,
} from "lucide-react";
import {
  CaseStudy,
  CompareTable,
  Definition,
  Formula,
  KeyTakeaway,
  LessonBlock,
  Pitfall,
  SectionHeader,
  SourceNote,
} from "./LessonBlock";
import PopulationSample from "@/components/viz/PopulationSample";
import SamplingMethodsExplorer from "@/components/viz/SamplingMethodsExplorer";
import CentralLimitExplorer from "@/components/viz/CentralLimitExplorer";
import ProportionPrecision from "@/components/viz/ProportionPrecision";
import ExcelWalkthrough from "@/components/viz/ExcelWalkthrough";
import { EXCEL_GUIDES } from "@/data/excelGuides";
import { useI18n } from "@/i18n/I18nContext";

const guide = (id: string) => EXCEL_GUIDES.find((g) => g.id === id)!;

export default function Module3Content() {
  const { pick } = useI18n();

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionHeader
          icon={<GraduationCap size={18} />}
          eyebrow={pick("Введение в модуль", "Module introduction")}
          title={pick("От описания данных к их производству", "From describing data to producing it")}
        />

        <LessonBlock
          eyebrow={pick("Мостик от Модуля 2", "The bridge from Module 2")}
          title={pick("Хорошая формула не спасает плохую выборку", "A good formula cannot rescue a bad sample")}
        >
          <p>
            {pick(
              "Первые два модуля начинались с готового набора данных. Мы строили графики, считали среднее, стандартное отклонение и вероятности. Теперь отступаем на шаг назад: кто попал в набор, кто не попал и почему этим данным вообще можно доверять?",
              "The first two modules began with a finished data set. We drew charts and computed means, standard deviations and probabilities. Now we step back: who entered the data, who did not, and why should those observations be trusted at all?",
            )}
          </p>
          <CompareTable
            headers={[pick("Шаг", "Step"), pick("Вопрос", "Question"), pick("Результат", "Output")]}
            rows={[
              ["1", pick("Что хотим узнать?", "What do we want to know?"), "response variable"],
              ["2", pick("Какие факторы могут влиять?", "Which factors may matter?"), "independent variables"],
              ["3", pick("Как получить данные?", "How will we obtain data?"), "study + sampling plan"],
              ["4", pick("Как меняется statistic от sample к sample?", "How does the statistic vary from sample to sample?"), "sampling distribution"],
              ["5", pick("Насколько точна одна оценка?", "How precise is one estimate?"), "standard error"],
            ]}
          />
          <KeyTakeaway>
            {pick(
              "Случайная ошибка уменьшается с ростом n. Систематическое смещение от плохого frame, self-selection или nonresponse — нет. Поэтому способ отбора важнее количества строк.",
              "Random error shrinks as n grows. Systematic bias from a bad frame, self-selection or nonresponse does not. That is why the sampling method matters more than the row count.",
            )}
          </KeyTakeaway>
        </LessonBlock>
      </section>

      <section className="space-y-4">
        <SectionHeader icon={<Database size={18} />} eyebrow="Lesson 3-1" title={pick("Producing Data", "Producing Data")} />

        <LessonBlock
          eyebrow={pick("Источники", "Sources")}
          title={pick("Найти готовые данные или провести исследование", "Find existing data or run a study")}
        >
          <p>
            {pick(
              "Государственные публикации, международные организации, корпоративные отчёты, библиотеки и коммерческие поставщики уже хранят огромные объёмы данных. Это быстрый путь, но данные собирались под чужую задачу: перед использованием нужно проверить определение переменной, единицу наблюдения, период и охват.",
              "Government publications, international organizations, company reports, libraries and commercial providers already hold vast stores of data. That is the fast route, but those data were gathered for someone else's question: verify the variable definition, unit of observation, time period and coverage before use.",
            )}
          </p>
          <Definition term={pick("Big data", "Big data")} en="Big data">
            {pick(
              "Массивный объём структурированных и неструктурированных данных. Большой объём уменьшает случайный шум, но не устраняет систематическое смещение механизма сбора.",
              "A massive volume of structured and unstructured data. Volume reduces random noise but does not remove systematic bias in the collection mechanism.",
            )}
          </Definition>
          <Pitfall>
            {pick(
              "Миллион добровольных отзывов — всё ещё voluntary sample. Он очень точно описывает людей, которые решили оставить отзыв, но не автоматически всех покупателей.",
              "A million voluntary reviews are still a voluntary sample. They describe people who chose to review with great precision, but not automatically every buyer.",
            )}
          </Pitfall>
        </LessonBlock>

        <LessonBlock
          eyebrow={pick("Переменные", "Variables")}
          title={pick("Y отвечает, X объясняет", "Y responds, X explains")}
        >
          <Definition term={pick("Response / dependent variable", "Response / dependent variable")} en="Response variable">
            {pick(
              "Результат, который исследователь хочет объяснить, предсказать или улучшить.",
              "The outcome the researcher wants to explain, predict or improve.",
            )}
          </Definition>
          <Definition term={pick("Independent / explanatory variable", "Independent / explanatory variable")} en="Independent variable">
            {pick(
              "Фактор, который может быть связан с результатом; в эксперименте исследователь назначает или изменяет его уровни.",
              "A factor that may be related to the outcome; in an experiment the researcher assigns or manipulates its levels.",
            )}
          </Definition>
          <CaseStudy title={pick("Производительность сотрудника", "Worker productivity")}>
            <p>
              {pick(
                "Response variable — число обслуженных клиентов в час. Возможные independent variables — объём обучения, надёжность оборудования и стаж на данной работе. Сначала задаётся измеримый результат, затем — факторы, а не наоборот.",
                "The response variable is customers served per hour. Possible independent variables are training, equipment reliability and years on the job. Define the measurable outcome first and the factors second, not the other way around.",
              )}
            </p>
          </CaseStudy>
          <CompareTable
            headers={[pick("Исследование", "Study"), "Independent X", "Dependent Y"]}
            rows={[
              [pick("Добавки и старение крыс", "Supplements and aging in rats"), "none / blueberry / strawberry / spinach", pick("память и моторика", "memory and motor tests")],
              [pick("Beta-carotene", "Beta-carotene"), "supplement / placebo", pick("возникновение рака", "cancer occurrence")],
              [pick("Яркость стоп-сигнала", "Brake-light brightness"), pick("яркость", "brightness"), pick("время до торможения", "time to brake")],
              [pick("Учёба и GPA", "Study time and GPA"), pick("часов учёбы", "hours studied"), "GPA"],
            ]}
          />
          <p className="text-ink-dim">
            {pick(
              "Уровни independent variable — это экспериментальные условия. Treatment и control дают два уровня; пять диет — пять уровней.",
              "The levels of an independent variable are the experimental conditions. Treatment and control give two levels; five diets give five levels.",
            )}
          </p>
        </LessonBlock>

        <LessonBlock
          eyebrow={pick("Дизайн исследования", "Study design")}
          title={pick("Наблюдать связь или создать сравнение", "Observe an association or create a comparison")}
        >
          <CompareTable
            headers={[pick("Дизайн", "Design"), pick("Что делает исследователь", "What the researcher does"), pick("Сила вывода", "Strength of conclusion")]}
            rows={[
              [pick("Экспериментальный", "Experimental"), pick("назначает уровни X и измеряет Y", "assigns levels of X and measures Y"), pick("причинность при хорошей рандомизации", "causality with sound randomization")],
              [pick("Наблюдательный", "Observational"), pick("измеряет существующие X и Y", "measures existing X and Y"), pick("ассоциация; причинность не гарантирована", "association; causality not guaranteed")],
            ]}
          />
          <p>
            {pick(
              "Количество удобрения можно менять между участками — это эксперимент. Количество слов, услышанных ребёнком в первый год, нельзя этично назначить семье — это наблюдательное исследование.",
              "Fertilizer can be varied across plots, making an experiment. The number of words a baby hears in the first year cannot ethically be assigned to a family, making that an observational study.",
            )}
          </p>
          <Definition term={pick("Random sampling", "Random sampling")} en="Random sampling">
            {pick("Создаёт основу для обобщения от sample к population.", "Creates the basis for generalizing from a sample to a population.")}
          </Definition>
          <Definition term={pick("Random assignment", "Random assignment")} en="Random assignment">
            {pick("Создаёт сопоставимые treatment и control groups внутри эксперимента.", "Creates comparable treatment and control groups inside an experiment.")}
          </Definition>
          <Pitfall>
            {pick(
              "Sampling и assignment — не синонимы. Можно случайно набрать людей, но плохо распределить treatment; можно набрать добровольцев, но честно рандомизировать treatment внутри этой группы.",
              "Sampling and assignment are not synonyms. You can sample people at random but assign treatment badly; you can recruit volunteers yet randomize treatment properly inside that group.",
            )}
          </Pitfall>
          <CompareTable
            headers={[pick("Временная структура", "Time structure"), pick("Определение", "Definition"), pick("Пример", "Example")]}
            rows={[
              ["cross-sectional", pick("многие единицы в один период", "many units in one period"), pick("счета всех сотрудников за май", "all employees' May phone bills")],
              ["time series", pick("одна величина во многих периодах", "one quantity across many periods"), pick("месячные продажи компании", "a company's monthly sales")],
              ["longitudinal / panel", pick("те же единицы наблюдаются повторно", "the same units are observed repeatedly"), pick("GPA одной когорты четыре года", "one cohort's GPA for four years")],
            ]}
          />
        </LessonBlock>
      </section>

      <section className="space-y-4">
        <SectionHeader icon={<Layers3 size={18} />} eyebrow="Lesson 3-2" title={pick("Sampling", "Sampling")} />

        <LessonBlock
          eyebrow={pick("Главная угроза", "The main threat")}
          title={pick("Bias рождается в момент отбора", "Bias is born at selection")}
        >
          <Definition term={pick("Bias", "Bias")} en="Bias">
            {pick(
              "Систематическая склонность процедуры отбора или измерения завышать, занижать или иначе искажать результат.",
              "A systematic tendency of a selection or measurement procedure to overstate, understate or otherwise distort the result.",
            )}
          </Definition>
          <CompareTable
            headers={[pick("Метод", "Method"), pick("Как выбирают", "How units enter"), pick("Главный риск", "Main risk")]}
            rows={[
              ["volunteer", pick("люди выбирают себя сами", "people select themselves"), "self-selection bias"],
              ["convenience", pick("берут тех, до кого проще добраться", "take whoever is easiest to reach"), "coverage bias"],
              ["probability", pick("шансы задаёт случайный механизм", "chances are set by a random mechanism"), "nonresponse bias"],
            ]}
          />
          <CaseStudy title={pick("Literary Digest, выборы 1936 года", "The Literary Digest poll of 1936")}>
            <p>
              {pick(
                "Журнал опрашивал по спискам телефонов и автомобилей, которые в годы после Великой депрессии непропорционально представляли состоятельных избирателей. Опрос предсказал победу Alfred Landon; Franklin D. Roosevelt выиграл с огромным преимуществом. Огромный n сделал смещённый ответ точнее, но не сделал его правильным.",
                "The magazine sampled telephone and automobile lists, which after the Great Depression disproportionately represented affluent voters. It predicted Alfred Landon; Franklin D. Roosevelt won in a landslide. A huge n made the biased answer more precise, not more correct.",
              )}
            </p>
          </CaseStudy>
        </LessonBlock>

        <PopulationSample />

        <LessonBlock
          eyebrow={pick("Вероятностные планы", "Probability plans")}
          title={pick("SRS, strata и clusters", "SRS, strata and clusters")}
        >
          <Definition term={pick("Простая случайная выборка", "Simple random sample")} en="Simple random sample">
            {pick(
              "Каждый элемент имеет одинаковый шанс, а в стандартной формулировке каждая возможная sample размера n имеет одинаковую вероятность.",
              "Every member has an equal chance and, in the standard formulation, every possible sample of size n is equally likely.",
            )}
          </Definition>
          <Definition term={pick("Стратифицированная выборка", "Stratified sample")} en="Stratified sampling">
            {pick(
              "Population делят на важные strata и берут случайные наблюдения из каждой. Ни одна strata не может случайно исчезнуть из sample.",
              "Split the population into important strata and sample randomly from every one. No stratum can vanish from the sample by chance.",
            )}
          </Definition>
          <Definition term={pick("Кластерная выборка", "Cluster sample")} en="Cluster sampling">
            {pick(
              "Population делят на clusters, случайно выбирают некоторые и обследуют всех или часть людей внутри выбранных clusters.",
              "Split the population into clusters, select some at random, then study all or some people inside the selected clusters.",
            )}
          </Definition>
          <CompareTable
            headers={["", "Stratified", "Cluster"]}
            rows={[
              [pick("Какие группы входят", "Groups included"), pick("все strata", "all strata"), pick("только выбранные clusters", "selected clusters only")],
              [pick("Цель", "Goal"), pick("представительство и точность", "representation and precision"), pick("стоимость и логистика", "cost and logistics")],
              [pick("Идеальная структура", "Ideal structure"), pick("внутри похожи, между strata различны", "similar within, different across strata"), pick("каждый cluster — мини-population", "each cluster is a mini-population")],
            ]}
          />
          <KeyTakeaway>
            {pick("Strata: немного из всех. Clusters: много из некоторых.", "Strata: some from all. Clusters: many from some.")}
          </KeyTakeaway>
        </LessonBlock>

        <SamplingMethodsExplorer />

        <LessonBlock
          eyebrow={pick("Размер выборки", "Sample size")}
          title={pick("Random — свойство процедуры, representative — результат", "Random describes the procedure; representative describes the result")}
        >
          <p>
            {pick(
              "Даже честная SRS размера 20 может случайно оказаться несбалансированной. В population 50/50 вероятность получить не менее 70% женщин в такой выборке — около 0,06. Выборка случайная, но конкретный состав слабее представляет population.",
              "Even an honest SRS of 20 can be unbalanced by chance. In a 50/50 population, the chance of drawing at least 70% women is about 0.06. The sample is random, yet that particular composition represents the population poorly.",
            )}
          </p>
          <p>
            {pick(
              "Большая sample уменьшает sampling variability, но не лечит selection bias. И при больших populations нужный n определяется прежде всего желаемой точностью и изменчивостью, а не численностью страны.",
              "A large sample reduces sampling variability but does not cure selection bias. And for large populations, the required n is driven mainly by desired precision and variability, not by the country's population count.",
            )}
          </p>
          <Formula caption={pick("Закон убывающей отдачи", "The law of diminishing returns")}>{"SE ∝ 1 / √n"}</Formula>
          <p className="text-ink-dim">
            {pick(
              "Чтобы уменьшить standard error вдвое, n нужно увеличить в четыре раза; чтобы уменьшить втрое — в девять раз.",
              "To halve a standard error, multiply n by four; to cut it to one third, multiply n by nine.",
            )}
          </p>
        </LessonBlock>

        <ExcelWalkthrough guide={guide("m3-sampling")} />
      </section>

      <section className="space-y-4">
        <SectionHeader icon={<Network size={18} />} eyebrow={pick("OnlineStatBook · Chapter 9", "OnlineStatBook · Chapter 9")} title={pick("Sampling distributions", "Sampling distributions")} />

        <LessonBlock
          eyebrow={pick("Три разных распределения", "Three different distributions")}
          title={pick("Распределяются не люди, а статистики", "The statistics, not the people, are distributed")}
        >
          <Definition term={pick("Выборочное распределение", "Sampling distribution")} en="Sampling distribution">
            {pick(
              "Теоретическое распределение значений statistic по всем возможным случайным samples фиксированного размера из одной population.",
              "The theoretical distribution of a statistic over every possible random sample of a fixed size from one population.",
            )}
          </Definition>
          <CompareTable
            headers={[pick("Объект", "Object"), pick("Что распределяется", "What varies"), pick("Температурный пример", "Temperature example")]}
            rows={[
              ["population distribution", pick("отдельные X", "individual X"), pick("температура каждого дня", "each day's temperature")],
              ["one-sample distribution", pick("наблюдения одной sample", "observations in one sample"), pick("72 выбранных дня", "72 selected days")],
              ["sampling distribution", pick("statistics многих samples", "statistics across many samples"), pick("100 000 значений x̄", "100,000 values of x̄")],
            ]}
          />
          <CaseStudy title={pick("Три шара: 1, 2 и 3", "Three pool balls: 1, 2 and 3")}>
            <p>
              {pick(
                "Выбираем два шара с возвращением. Девять равновероятных упорядоченных samples дают средние 1; 1,5; 2; 2,5; 3 с частотами 1; 2; 3; 2; 1. Значит вероятность x̄ = 2 равна 3/9, а крайних x̄ = 1 и 3 — по 1/9.",
                "Draw two balls with replacement. Nine equally likely ordered samples produce means 1, 1.5, 2, 2.5 and 3 with frequencies 1, 2, 3, 2 and 1. Thus P(x̄ = 2) is 3/9 while the extreme means 1 and 3 each have probability 1/9.",
              )}
            </p>
            <p>
              {pick(
                "Можно перечислить все samples или повторять случайный отбор тысячи раз: относительные частоты симуляции приближаются к theoretical sampling distribution.",
                "You can enumerate every sample or repeat random sampling thousands of times: the simulated relative frequencies approach the theoretical sampling distribution.",
              )}
            </p>
          </CaseStudy>
          <p>
            {pick(
              "Sampling distribution существует у любой statistic: mean, range, variance, median, correlation и proportion. Standard error — это стандартное отклонение соответствующего sampling distribution.",
              "Every statistic has a sampling distribution: mean, range, variance, median, correlation and proportion. A standard error is the standard deviation of the relevant sampling distribution.",
            )}
          </p>
          <SourceNote>
            Lane, D. M. et al. <i>Online Statistics Education</i>, Chapter 9, pp. 299–308.
          </SourceNote>
        </LessonBlock>
      </section>

      <section className="space-y-4">
        <SectionHeader icon={<Sigma size={18} />} eyebrow="Lesson 3-3" title={pick("Central Limit Theorem", "Central Limit Theorem")} />

        <LessonBlock
          eyebrow={pick("Три свойства", "Three properties")}
          title={pick("Центр тот же, разброс меньше, форма нормальнее", "Same centre, smaller spread, more normal shape")}
        >
          <Formula caption={pick("Центр sampling distribution", "Centre of the sampling distribution")}>{"μx̄ = μ"}</Formula>
          <p>
            {pick(
              "Среднее всех возможных sample means равно population mean. Поэтому x̄ — несмещённая point estimate μ. Одна конкретная x̄ всё равно почти наверняка отличается от μ.",
              "The mean of all possible sample means equals the population mean. That makes x̄ an unbiased point estimate of μ. One particular x̄ will still almost surely differ from μ.",
            )}
          </p>
          <Formula caption={pick("Дисперсия и standard error среднего", "Variance and standard error of the mean")}>{"Var(x̄) = σ² / n          SEx̄ = σ / √n"}</Formula>
          <CompareTable
            headers={[pick("Мера", "Measure"), pick("Что она описывает", "What it describes"), pick("Единица", "Unit")]}
            rows={[
              ["σ", pick("разброс отдельных observations", "spread of individual observations"), pick("исходная", "original")],
              ["SE(x̄)", pick("разброс sample means", "spread of sample means"), pick("исходная", "original")],
            ]}
          />
          <Definition term={pick("Центральная предельная теорема", "Central Limit Theorem")} en="Central Limit Theorem">
            {pick(
              "Для population с конечными μ и ненулевой σ² sampling distribution среднего приближается к normal distribution со средним μ и дисперсией σ²/n по мере роста n.",
              "For a population with finite μ and finite non-zero σ², the sampling distribution of the mean approaches a normal distribution with mean μ and variance σ²/n as n grows.",
            )}
          </Definition>
          <Pitfall>
            {pick(
              "ЦПТ не делает исходные данные нормальными и не говорит, что одна sample выглядит как колокол. Нормальным становится распределение статистики по повторным samples.",
              "The CLT does not make the raw data normal and does not say that one sample looks bell-shaped. It is the statistic across repeated samples that becomes normal.",
            )}
          </Pitfall>
          <p className="text-ink-dim">
            {pick(
              "n ≥ 30 — полезная учебная эвристика, не часть теоремы. Для normal parent среднее normal при любом n; сильный скос и тяжёлые хвосты могут потребовать гораздо больше наблюдений.",
              "n ≥ 30 is a useful classroom heuristic, not part of the theorem. A normal parent yields normal means at every n; severe skew and heavy tails may require far more observations.",
            )}
          </p>
        </LessonBlock>

        <CentralLimitExplorer />

        <LessonBlock
          eyebrow={pick("Кейсы лекции", "Lecture cases")}
          title={pick("Подростки, Chicago и 100 000 выборок New York", "Teenagers, Chicago and 100,000 New York samples")}
        >
          <CaseStudy title={pick("Расходы подростков на кино", "Teenagers' movie spending")}>
            <p>
              {pick(
                "Сто samples при n = 25, 50, 100 и 250 показывают один и тот же центр, но всё меньший разброс sample means. Чем больше n, тем уже и глаже histogram средних.",
                "One hundred samples at n = 25, 50, 100 and 250 keep the same centre but show progressively less spread in the sample means. Larger n produces a narrower, smoother histogram of means.",
              )}
            </p>
          </CaseStudy>
          <CaseStudy title={pick("Bimodal температуры Chicago", "Bimodal Chicago temperatures")}>
            <p>
              {pick(
                "Parent distribution имеет зимний и летний пики и совсем не похожа на normal. Однако distributions of sample means для n = 5, 25, 50 и 100 постепенно теряют два пика и приближаются к колоколу.",
                "The parent distribution has winter and summer peaks and looks nothing like a normal curve. Yet distributions of sample means for n = 5, 25, 50 and 100 gradually lose the two peaks and approach a bell.",
              )}
            </p>
          </CaseStudy>
          <CaseStudy title={pick("New York: формула встречается с симуляцией", "New York: formula meets simulation")}>
            <p>
              {pick(
                "Population: μ = 55,2°F, σ = 17,38°F. Для 100 000 samples по n = 72 теория даёт SE = 17,38/√72 = 2,048; фактическая SD sample means в Excel — 2,05.",
                "Population: μ = 55.2°F and σ = 17.38°F. For 100,000 samples of n = 72, theory gives SE = 17.38/√72 = 2.048; the actual SD of the sample means in Excel is 2.05.",
              )}
            </p>
          </CaseStudy>
          <CompareTable
            headers={[pick("Зона", "Band"), pick("Доля sample means", "Share of sample means"), pick("Интервал New York", "New York interval")]}
            rows={[
              ["μ ± 1SE", "≈ 68%", "53.15…57.25"],
              ["μ ± 2SE", "≈ 95%", "51.10…59.30"],
              ["μ ± 3SE", "≈ 99.7%", "49.05…61.35"],
            ]}
          />
          <SourceNote>
            Taghaboni-Dutta, F. (2019). <i>Exploring and Producing Data for Business Decision Making</i>, Module 3, Lessons 3-3.1–3-3.3. Lane et al., pp. 309–311.
          </SourceNote>
        </LessonBlock>

        <ExcelWalkthrough guide={guide("m3-clt-excel")} />
      </section>

      <section className="space-y-4">
        <SectionHeader icon={<Beaker size={18} />} eyebrow="Lesson 3-4" title={pick("Sampling proportion", "Sampling proportion")} />

        <LessonBlock
          eyebrow={pick("Категориальный результат", "A categorical outcome")}
          title={pick("От одного процента к распределению процентов", "From one percentage to a distribution of percentages")}
        >
          <Definition term={pick("Population proportion", "Population proportion")} en="Population proportion">
            {pick("Истинная доля интересующей категории в population; обозначается p.", "The true share of the category of interest in the population, denoted p.")}
          </Definition>
          <Definition term={pick("Sample proportion", "Sample proportion")} en="Sample proportion">
            {pick("Доля категории в sample: p̂ = x/n; служит point estimate для p.", "The category's share in a sample, p̂ = x/n; a point estimate of p.")}
          </Definition>
          <CaseStudy title={pick("Покупатели после рекламного клика", "Buyers after an advertising click")}>
            <p>
              {pick(
                "Из 400 пришедших по ссылке 118 купили товар: p̂ = 118/400 = 0,295. Другой день даст другую p̂; sampling distribution описывает этот разброс.",
                "Of 400 visitors who followed the link, 118 bought: p̂ = 118/400 = 0.295. Another day gives another p̂; the sampling distribution describes that spread.",
              )}
            </p>
          </CaseStudy>
          <Formula caption={pick("Центр и standard error доли", "Centre and standard error of a proportion")}>{"μp̂ = p          SEp̂ = √[p(1−p) / n]"}</Formula>
          <p>
            {pick(
              "При p = 0,30 десять samples размера 50 дали p̂ от 0,20 до 0,48; при n = 1000 — примерно от 0,26 до 0,34. Центр остаётся у 0,30, разброс сжимается.",
              "With p = 0.30, ten samples of 50 produced p̂ values from 0.20 to 0.48; at n = 1,000 they ran roughly from 0.26 to 0.34. The centre stays at 0.30 while the spread contracts.",
            )}
          </p>
          <Formula caption={pick("Проверка normal approximation", "Check the normal approximation")}>{"np ≥ 10          n(1−p) ≥ 10"}</Formula>
        </LessonBlock>

        <ProportionPrecision />
      </section>

      <section className="space-y-4">
        <SectionHeader icon={<Network size={18} />} eyebrow={pick("Итог", "Wrap-up")} title={pick("Одна цепочка принятия решения", "One decision chain")} />

        <LessonBlock
          eyebrow={pick("Сводная карта", "Summary map")}
          title={pick("Дизайн → statistic → sampling distribution → inference", "Design → statistic → sampling distribution → inference")}
        >
          <CompareTable
            headers={[pick("Если нужно…", "If you need to…"), pick("Используйте", "Use"), pick("Проверьте", "Check")]}
            rows={[
              [pick("случайно выбрать из общего списка", "sample from one complete list"), "SRS", pick("coverage + nonresponse", "coverage + nonresponse")],
              [pick("гарантировать каждую подгруппу", "guarantee every subgroup"), "stratified", pick("allocation + weights", "allocation + weights")],
              [pick("сократить полевые расходы", "reduce field cost"), "cluster", pick("похожи ли clusters на population", "whether clusters resemble the population")],
              [pick("оценить population mean", "estimate a population mean"), "x̄, SE = σ/√n", pick("independence + CLT", "independence + CLT")],
              [pick("оценить population proportion", "estimate a population proportion"), "p̂, SE = √[p(1−p)/n]", "np and n(1−p)"],
            ]}
          />
          <KeyTakeaway>
            {pick(
              "ЦПТ — мост между описанием одной sample и выводом о population. Она не гарантирует хороших данных; она описывает случайную изменчивость statistic после того, как sampling plan уже заслужил доверие.",
              "The CLT is the bridge from describing one sample to inferring about a population. It does not guarantee good data; it describes random variation in a statistic after the sampling plan has earned our trust.",
            )}
          </KeyTakeaway>
          <SourceNote>
            {pick(
              "Источники модуля: Gies eBook Module 3; Lane et al., Online Statistics Education, pp. 21–27 and 299–311. В приложении исправлена опечатка транскрипта «98% внутри ±1 SE»: верно 68%.",
              "Module sources: Gies eBook Module 3; Lane et al., Online Statistics Education, pp. 21–27 and 299–311. The app corrects the transcript's '98% within ±1 SE' typo: the correct share is 68%.",
            )}
          </SourceNote>
        </LessonBlock>
      </section>
    </div>
  );
}
