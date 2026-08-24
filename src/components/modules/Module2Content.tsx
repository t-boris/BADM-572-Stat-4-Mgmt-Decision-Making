import {
  Sigma,
  Gauge,
  Crosshair,
  Dice5,
  BellRing,
  TableProperties,
  Compass,
  GraduationCap,
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
import MeanMedianOutlier from "@/components/viz/MeanMedianOutlier";
import SkewExplorer from "@/components/viz/SkewExplorer";
import DispersionCompare from "@/components/viz/DispersionCompare";
import DiscreteDistribution from "@/components/viz/DiscreteDistribution";
import EmpiricalRule from "@/components/viz/EmpiricalRule";
import NormalShapeExplorer from "@/components/viz/NormalShapeExplorer";
import NormalAreaCalculator from "@/components/viz/NormalAreaCalculator";
import ZTableLookup from "@/components/viz/ZTableLookup";
import ExcelWalkthrough from "@/components/viz/ExcelWalkthrough";
import { EXCEL_GUIDES } from "@/data/excelGuides";
import { useI18n } from "@/i18n/I18nContext";

const guide = (id: string) => EXCEL_GUIDES.find((g) => g.id === id)!;

export default function Module2Content() {
  const { pick } = useI18n();

  return (
    <div className="space-y-10">
      {/* ══════════════ 0. Где мы находимся ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<GraduationCap size={18} />}
          eyebrow={pick("Введение в модуль", "Module introduction")}
          title={pick("От картинок к числам", "From pictures to numbers")}
        />

        <LessonBlock
          eyebrow={pick("Мостик от Модуля 1", "The bridge from Module 1")}
          title={pick(
            "Тот же объект, другой язык описания",
            "The same object, a different descriptive language",
          )}
        >
          <p>
            {pick(
              "Модуль 1 отвечал на вопрос «как увидеть данные»: частотные таблицы, гистограммы, круговые и столбчатые диаграммы, диаграммы рассеяния. Модуль 2 описывает те же характеристики распределения одним числом — числом, которое можно положить в отчёт, в презентацию, в модель.",
              "Module 1 answered the question of how to see the data: frequency tables, histograms, pie and bar charts, scatter plots. Module 2 describes the same features of a distribution in a single number — a number you can put in a report, a deck, a model.",
            )}
          </p>
          <Definition
            term={pick("Зачем резюмировать данные", "Why we summarize data")}
            en="Why do we summarize data?"
          >
            {pick(
              "«Резюмирование данных позволяет эффективнее о них говорить: (1) графические методы, (2) численные методы». Модуль 1 — целиком первое. Модуль 2 — второе.",
              "'Summarizing the data allows us to communicate about the data more effectively: (1) graphical methods, (2) numerical methods.' Module 1 was entirely the first. Module 2 is the second.",
            )}
          </Definition>
          <p>
            {pick(
              "Логика модуля выстроена как одна цепочка, и каждое следующее звено чинит слабое место предыдущего. Среднее без разброса лжёт; разброс без стандартизации несравним между переменными; стандартизация без модели распределения не даёт вероятностей.",
              "The module runs as a single chain, and each link repairs the weakness of the one before it. A mean without a spread lies; a spread without standardizing cannot be compared across variables; standardizing without a distribution model yields no probabilities.",
            )}
          </p>
          <CompareTable
            headers={[
              pick("Шаг", "Step"),
              pick("Вопрос", "Question"),
              pick("Инструмент", "Tool"),
            ]}
            rows={[
              ["1", pick("Где центр данных?", "Where is the centre of the data?"), "mean, median · Lesson 2-1"],
              ["2", pick("Насколько типичен этот центр?", "How typical is that centre?"), "range, variance, σ · Lesson 2-2"],
              ["3", pick("Где конкретное наблюдение среди остальных?", "Where does one observation sit among the rest?"), "percentile, z-score · Lesson 2-3"],
              ["4", pick("Как описать ещё не наступивший исход?", "How do we describe an outcome that has not happened yet?"), "random variable, E(X) · Lesson 2-4"],
              ["5", pick("Какая модель описывает большинство больших наборов?", "Which model describes most large data sets?"), pick("нормальное распределение · Lesson 2-5", "the normal distribution · Lesson 2-5")],
              ["6", pick("Как считать вероятности без компьютера?", "How do we get probabilities without a computer?"), pick("z-таблица · Lesson 2-6", "the z-table · Lesson 2-6")],
            ]}
          />
        </LessonBlock>

        <LessonBlock
          eyebrow={pick("Обозначения", "Notation")}
          title={pick(
            "Греческие буквы для совокупности, латинские для выборки",
            "Greek letters for the population, English ones for the sample",
          )}
        >
          <p>
            {pick(
              "В Модуле 1 это соглашение только вводилось. Здесь оно начинает работать: у каждой меры разброса появляется пара «параметр — статистика», и различие между ними определяет выбор функции в Excel.",
              "Module 1 merely introduced this convention. Here it starts doing work: every measure of dispersion acquires a parameter/statistic pair, and telling them apart decides which Excel function you reach for.",
            )}
          </p>
          <CompareTable
            headers={[
              pick("Характеристика", "Quantity"),
              pick("Совокупность — параметр", "Population — parameter"),
              pick("Выборка — статистика", "Sample — statistic"),
            ]}
            rows={[
              [pick("Размер", "Size"), "N", "n"],
              [pick("Среднее", "Mean"), "μ", "x̄"],
              [pick("Дисперсия", "Variance"), "σ²", "s²"],
              [pick("Стандартное отклонение", "Standard deviation"), "σ", "s"],
              [pick("Медиана", "Median"), "M_d", "M_d"],
            ]}
            caption={pick(
              "Медиана — единственная мера модуля без раздельных обозначений.",
              "The median is the module's only measure with no separate notation.",
            )}
          />
          <Pitfall>
            {pick(
              "Вопрос «параметр или статистика?» решается не размером набора, а определением исследуемого множества. 26 770 наблюдений температуры Нью-Йорка — это выборка, потому что совокупность включает все дни, которые были и будут.",
              "Whether something is a parameter or a statistic is decided by how the set of interest is defined, not by how big it is. The 26,770 New York temperature records are a sample, because the population is every day past and future.",
            )}
          </Pitfall>
        </LessonBlock>
      </section>

      {/* ══════════════ 1. Меры центра ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<Sigma size={18} />}
          eyebrow="Lesson 2-1"
          title={pick("Меры центральной тенденции", "Measures of central tendency")}
        />

        <LessonBlock
          eyebrow={pick("Определения", "Definitions")}
          title={pick(
            "Среднее, медиана и оговорка, которую все пропускают",
            "Mean, median and the caveat everyone skips",
          )}
        >
          <Definition
            term={pick("Мера центральной тенденции", "Measure of central tendency")}
            en="Measure of central tendency"
          >
            {pick(
              "Представляет центр или середину данных. Может быть, а может и не быть типичным значением.",
              "Represents the centre or middle of the data. May or may not be a typical value.",
            )}
          </Definition>
          <p>
            {pick(
              "Вторая половина этой фразы — самая недооценённая строчка модуля. Оговорка «may or may not be a typical value» стоит в самом определении, а не в примечании: мера центра ничего не обещает. Весь урок 2-2 существует ровно для того, чтобы это обещание проверить.",
              "The second half of that sentence is the module's most underrated line. The caveat 'may or may not be a typical value' sits inside the definition rather than in a footnote: a measure of centre promises nothing. Lesson 2-2 exists precisely to audit that promise.",
            )}
          </p>
          <Definition term={pick("Среднее", "Mean")} en="Mean">
            {pick(
              "Среднее арифметическое, оно же ожидаемое значение. Сумма всех значений, делённая на их количество.",
              "The average, also known as the expected value. The sum of all values divided by how many there are.",
            )}
          </Definition>
          <Formula
            caption={pick(
              "Слева — по совокупности, справа — по выборке. Выборочное среднее используется как точечная оценка (point estimator) генерального.",
              "Population on the left, sample on the right. The sample mean serves as a point estimator of the population mean.",
            )}
          >
            {"μ = Σ Xᵢ / N            x̄ = Σ xᵢ / n"}
          </Formula>
          <Definition term={pick("Медиана", "Median")} en="Median">
            {pick(
              "Значение, выше и ниже которого лежит по 50 % отсортированных наблюдений. При нечётном числе измерений — центральное наблюдение; при чётном — среднее двух центральных.",
              "A value such that 50 % of all measurements, once arranged in numerical order, lie above it and 50 % below. With an odd number of measurements it is the middlemost; with an even number it is the average of the two middlemost.",
            )}
          </Definition>
          <CaseStudy
            title={pick(
              "Средний чек на сайте: семь клиентов",
              "Average spend on a website: seven customers",
            )}
          >
            <p>
              {pick(
                "Данные о потраченных долларах: 85,68 · 67,21 · 98,08 · 34,78 · 56,98 · 27,93 · 40,72.",
                "Dollars spent: 85.68 · 67.21 · 98.08 · 34.78 · 56.98 · 27.93 · 40.72.",
              )}
            </p>
            <p>
              <strong>{pick("Среднее:", "Mean:")}</strong> 411,38 ÷ 7 = <strong>$58.77</strong>.{" "}
              <strong>{pick("Медиана:", "Median:")}</strong>{" "}
              {pick(
                "сортируем — 27,93 · 34,78 · 40,72 · 56,98 · 67,21 · 85,68 · 98,08; n нечётное, центр четвёртый:",
                "sorted — 27.93 · 34.78 · 40.72 · 56.98 · 67.21 · 85.68 · 98.08; n is odd and the centre is fourth:",
              )}{" "}
              <strong>$56.98</strong>.
            </p>
            <p>
              {pick(
                "Числа близки, но не совпадают — и эта разница сама по себе уже диагностический сигнал.",
                "The two are close but not equal — and that gap is itself a diagnostic signal.",
              )}
            </p>
          </CaseStudy>
          <p className="text-ink-dim">
            {pick(
              "Лектор сразу оговаривается: «in this class, I don't expect you to calculate anything manually». Формулы нужны не для счёта, а чтобы понимать, что делает функция в софте.",
              "The lecturer says up front: 'in this class, I don't expect you to calculate anything manually'. The formulas are there so you understand what the software's function is doing, not so you can do it by hand.",
            )}
          </p>
        </LessonBlock>

        <MeanMedianOutlier />

        <LessonBlock
          eyebrow={pick("Почему это важно", "Why it matters")}
          title={pick(
            "Выбросы и устойчивость медианы",
            "Outliers and the robustness of the median",
          )}
        >
          <Definition term={pick("Выброс", "Outlier")} en="Outlier">
            {pick(
              "Одно-два экстремальных значения в наборе. При их наличии среднее менее репрезентативно, а медиана более устойчива (robust).",
              "One or two extreme values in a data set. When they are present the mean is less representative and the median is more robust.",
            )}
          </Definition>
          <p>
            {pick(
              "В кейсе выше одно наблюдение увеличило среднее в 12 раз и стандартное отклонение в 346 раз, сдвинув медиану ровно на один шаг по отсортированному списку. Формально это свойство называется точкой отказа (breakdown point): у среднего она равна нулю — одно испорченное наблюдение уводит его куда угодно, — у медианы 50 %.",
              "In the case above, one observation multiplied the mean twelvefold and the standard deviation 346-fold while moving the median exactly one step along the sorted list. Formally this property is the breakdown point: the mean's is zero — a single corrupted observation takes it anywhere — while the median's is 50 %.",
            )}
          </p>
          <CaseStudy
            title={pick(
              "Почему риелторы публикуют медианную цену",
              "Why real-estate listings publish the median price",
            )}
          >
            <p>
              {pick(
                "Откройте любой сайт недвижимости по любому городу — публикуется median price, а не mean price. Если медианная цена на верхней границе вашего бюджета, вы точно знаете: 50 % домов дешевле. Это операционально полезное знание.",
                "Open any property site for any city and you get the median price, not the mean. If the median sits at the top of your budget you know for certain that half the homes are cheaper. That is operationally useful.",
              )}
            </p>
            <p>
              {pick(
                "Со средним такой гарантии нет, и ошибиться можно в обе стороны: несколько ветхих домов тянут среднее вниз и рынок выглядит доступнее, чем он есть; несколько особняков тянут его вверх и рынок выглядит недоступным, хотя дома в бюджете существуют.",
                "The mean offers no such guarantee, and it misleads in both directions: a few dilapidated houses drag it down and the market looks cheaper than it is; a few mansions drag it up and the market looks out of reach although homes in budget exist.",
              )}
            </p>
          </CaseStudy>
        </LessonBlock>

        <SkewExplorer />

        <LessonBlock
          eyebrow={pick("Диагностика формы", "Shape diagnostics")}
          title={pick(
            "Соотношение среднего и медианы читается как форма",
            "The mean-median gap reads as a shape",
          )}
        >
          <CompareTable
            headers={[
              pick("Форма", "Shape"),
              pick("Соотношение", "Relationship"),
              pick("Что происходит", "What is going on"),
            ]}
            rows={[
              [
                pick("Симметричная", "Symmetrical"),
                "mean ≈ median",
                pick("Красная и зелёная отметки лежат друг на друге", "The red and green markers sit on top of one another"),
              ],
              [
                pick("Скос вправо", "Right-skewed"),
                "mean > median",
                pick("Длинный правый хвост тянет среднее вправо", "The long right tail drags the mean right"),
              ],
              [
                pick("Скос влево", "Left-skewed"),
                "mean < median",
                pick("Длинный левый хвост тянет среднее влево", "The long left tail drags the mean left"),
              ],
            ]}
          />
          <KeyTakeaway>
            {pick(
              "Это самая дешёвая диагностика, которая у вас есть. Посчитайте =AVERAGE и =MEDIAN и сравните. Если среднее заметно выше медианы — ищите правый хвост: зарплаты, цены, доходы, время обслуживания. Никакого графика для этого не нужно.",
              "This is the cheapest diagnostic you own. Compute =AVERAGE and =MEDIAN and compare them. If the mean sits well above the median, go looking for a right tail: salaries, prices, incomes, service times. No chart required.",
            )}
          </KeyTakeaway>
        </LessonBlock>

        <ExcelWalkthrough guide={guide("m2-mean-median")} />
      </section>

      {/* ══════════════ 2. Меры разброса ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<Gauge size={18} />}
          eyebrow="Lesson 2-2"
          title={pick("Меры разброса", "Measures of dispersion")}
        />

        <LessonBlock
          eyebrow={pick("Постановка вопроса", "Framing")}
          title={pick(
            "«Средняя замена масла — 30 минут». Вы уложитесь?",
            "'The average oil change takes 30 minutes.' Will you make it?",
          )}
        >
          <p>
            {pick(
              "Вам называют среднее. Вы ожидаете уложиться в 20 минут? В 30? В 40? Как оценить свои шансы уехать через полчаса? Из одного среднего это не следует никак — и здесь начинается урок о разбросе.",
              "You are handed an average. Do you expect to be out in 20 minutes? 30? 40? How would you rate your chances of being gone in half an hour? The average alone tells you nothing — which is where the dispersion lesson begins.",
            )}
          </p>
          <Definition term={pick("Мера разброса", "Measure of dispersion")} en="Measure of dispersion (variation)">
            {pick(
              "Показывает, насколько данные растянуты или компактны, и тем самым отвечает на вопрос «насколько репрезентативна мера центра?». Три меры: размах, дисперсия, стандартное отклонение.",
              "Tells us how spread out or compact the data tends to be, and so answers the question 'how representative is the measure of central tendency?'. Three measures: range, variance, standard deviation.",
            )}
          </Definition>
          <Definition term={pick("Размах", "Range")} en="Range">
            {pick(
              "Наибольшее наблюдение минус наименьшее.",
              "Largest minus smallest.",
            )}
          </Definition>
          <Pitfall>
            {pick(
              "Размах опирается ровно на два наблюдения, и оба — экстремальные. Один выброс полностью определяет размах, а остальные наблюдения на него не влияют. Поэтому на больших наборах он ненадёжен: «it's not very accurate, especially when the data set gets large».",
              "The range rests on exactly two observations, both of them extreme. A single outlier determines it entirely while the rest of the data have no say. That is why it fails on large data sets: 'it's not very accurate, especially when the data set gets large'.",
            )}
          </Pitfall>
        </LessonBlock>

        <DispersionCompare />

        <LessonBlock
          eyebrow={pick("Дисперсия и стандартное отклонение", "Variance and standard deviation")}
          title={pick(
            "Почему квадрат, почему n − 1 и почему потом корень",
            "Why the square, why n − 1, and why the root afterwards",
          )}
        >
          <Formula
            caption={pick(
              "Слева — дисперсия совокупности, справа — выборочная. Различие в знаменателе принципиально.",
              "Population variance on the left, sample variance on the right. The difference in the denominator is not cosmetic.",
            )}
          >
            {"σ² = Σ(xᵢ − μ)² / N            s² = Σ(xᵢ − x̄)² / (n − 1)"}
          </Formula>
          <CompareTable
            headers={[pick("Шаг", "Step"), pick("Что делаем", "What we do"), pick("Зачем", "Why")]}
            rows={[
              [
                "1",
                pick("Вычитаем среднее из каждого наблюдения", "Subtract the mean from each observation"),
                pick("Получаем отклонение", "This gives the deviation"),
              ],
              [
                "2",
                pick("Возводим в квадрат", "Square it"),
                pick("Без квадрата сумма отклонений от среднего всегда равна нулю — по определению среднего", "Unsquared, the deviations from the mean always sum to zero — by the definition of the mean"),
              ],
              [
                "3",
                pick("Складываем", "Add them up"),
                pick("Получаем суммарную «энергию» разброса", "This accumulates the total spread"),
              ],
              [
                "4",
                pick("Делим на N или на n − 1", "Divide by N or by n − 1"),
                pick("Совокупность или выборка", "Population or sample"),
              ],
              [
                "5",
                pick("Извлекаем корень", "Take the square root"),
                pick("Возвращаем величину в исходные единицы", "This returns the quantity to its original units"),
              ],
            ]}
          />
          <Definition term={pick("Поправка n − 1", "The n − 1 correction")} en="Degrees of freedom">
            {pick(
              "Выборочные отклонения считаются от x̄, а не от неизвестного μ, а x̄ по построению лежит ближе к своим точкам, чем настоящее μ. Поэтому сумма квадратов систематически занижена, и деление на меньшее число компенсирует это, делая s² несмещённой оценкой σ².",
              "Sample deviations are taken from x̄ rather than the unknown μ, and by construction x̄ lies closer to its own points than the true μ does. The sum of squares is therefore systematically too small, and dividing by a smaller number compensates, making s² an unbiased estimator of σ².",
            )}
          </Definition>
          <p>
            {pick(
              "Число n − 1 называют числом степеней свободы: из n отклонений независимы только n − 1, потому что последнее восстанавливается из условия «сумма отклонений равна нулю». Практически при n = 10 разница между делением на 9 и на 10 составляет около 11 %, а при n = 26 000 исчезающе мала.",
              "The quantity n − 1 is called the degrees of freedom: of n deviations only n − 1 are independent, because the last one is recoverable from the fact that they sum to zero. In practice the choice matters by about 11 % at n = 10 and vanishingly little at n = 26,000.",
            )}
          </p>
          <Formula caption={pick("Стандартное отклонение — всегда положительный корень из дисперсии.", "The standard deviation is always the positive square root of the variance.")}>
            {"σ = √σ²            s = √s²"}
          </Formula>
          <KeyTakeaway>
            {pick(
              "Дисперсия измеряется в квадратах единиц — долларах в квадрате, минутах в квадрате, — и потому непригодна ни для отчёта, ни для сравнения со средним. Корень возвращает величину в исходные единицы, и только после этого σ можно прибавлять к среднему. На этом построено эмпирическое правило.",
              "Variance is measured in squared units — dollars squared, minutes squared — and so is useless both in a report and against the mean. The root returns it to the original units, and only then can σ be added to the mean. The Empirical Rule is built on exactly that.",
            )}
          </KeyTakeaway>
          <CaseStudy title={pick("Что выброс делает со стандартным отклонением", "What an outlier does to the standard deviation")}>
            <CompareTable
              headers={[pick("Группа", "Group"), "n", "x̄", "s²", "s"]}
              rows={[
                [pick("Десять однокурсников", "Ten classmates"), "10", "$65,000", "47,777,778", "$6,912.15"],
                [pick("Плюс баскетболист", "Plus the basketball player"), "11", "$786,363.64", "5,724,063,454,545.46", "$2,392,501.51"],
              ]}
            />
            <p>
              {pick(
                "Стандартное отклонение выросло в 346 раз, дисперсия — примерно в 120 000, потому что квадрат отклонения выброса доминирует над всей остальной суммой. Именно так σ и работает: это индикатор доверия к среднему.",
                "The standard deviation grew 346-fold and the variance roughly 120,000-fold, because the outlier's squared deviation dominates the entire sum. That is exactly what σ is for: it is a confidence gauge on the mean.",
              )}
            </p>
          </CaseStudy>
          <Pitfall>
            {pick(
              "Среднее без стандартного отклонения — неполный отчёт. Лектор формулирует прямо: «Knowing the average as a single summary point for an entire data set has little value if the average is not a very good representative for our data». Всегда сообщайте пару.",
              "A mean without a standard deviation is an incomplete report. The lecturer puts it bluntly: 'Knowing the average as a single summary point for an entire data set has little value if the average is not a very good representative for our data'. Always report the pair.",
            )}
          </Pitfall>
        </LessonBlock>

        <ExcelWalkthrough guide={guide("m2-stdev")} />
      </section>

      {/* ══════════════ 3. Позиция ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<Crosshair size={18} />}
          eyebrow="Lesson 2-3"
          title={pick("Процентили и z-оценка", "Percentiles and the z-score")}
        />

        <LessonBlock
          eyebrow={pick("Зачем нужна относительная позиция", "Why relative position matters")}
          title={pick(
            "$100 000 — это ничто. 95-й процентиль — это решение",
            "$100,000 is nothing. The 95th percentile is a decision",
          )}
        >
          <p>
            {pick(
              "Вам предложили зарплату $100 000. Хорошее предложение? Абсолютное число не отвечает на вопрос. А относительная позиция отвечает: 95-й процентиль — вам платят больше, чем 95 % людей с той же должностью, отличная оферта. 25-й процентиль — 75 % получают больше, повод торговаться. Одно и то же число, два противоположных решения.",
              "You are offered a salary of $100,000. Is that good? The absolute figure does not answer. The relative position does: at the 95th percentile you are paid better than 95 % of people with the same title — an excellent offer. At the 25th, three quarters earn more — grounds to negotiate. One number, two opposite decisions.",
            )}
          </p>
          <Definition term={pick("Процентиль", "Percentile")} en="Percentile">
            {pick(
              "Приблизительная доля значений набора, лежащих ниже данного значения. P-й процентиль — значение, ниже которого находится не менее p % наблюдений.",
              "The approximate percentage of values in a data set that are below a certain value. The pth percentile is the value below which at least p percent of the observations fall.",
            )}
          </Definition>
          <p>
            {pick(
              "Механика та же, что у медианы: отсортировать данные и найти точку, ниже которой лежит нужная доля. Медиана — это ровно 50-й процентиль, частный случай одного и того же понятия.",
              "The mechanics match the median's: sort the data and find the point below which the required share falls. The median is exactly the 50th percentile, a special case of the same idea.",
            )}
          </p>
          <SourceNote>
            {pick(
              "Лектор оговаривается: «There are different ways of calculating percentiles, but all methods will give you results that are close». В Excel PERCENTILE.INC и PERCENTILE.EXC дают слегка разные ответы, и оба правильные — для экзамена важен смысл, а не алгоритм интерполяции.",
              "The lecturer notes that 'there are different ways of calculating percentiles, but all methods will give you results that are close'. Excel's PERCENTILE.INC and PERCENTILE.EXC differ slightly and both are correct — the exam cares about the meaning, not the interpolation rule.",
            )}
          </SourceNote>
          <Definition term={pick("Z-оценка", "Z-score")} en="Z-score / standard score">
            {pick(
              "На сколько стандартных отклонений наблюдение отстоит от среднего.",
              "How many standard deviations an observation is from the mean.",
            )}
          </Definition>
          <Formula caption={pick("x — интересующее значение, μ — среднее, σ — стандартное отклонение.", "x is the value of interest, μ the mean, σ the standard deviation.")}>
            {"z = (x − μ) / σ"}
          </Formula>
          <CompareTable
            headers={[pick("Значение", "Value"), pick("Что означает", "What it means")]}
            rows={[
              ["z > 0", pick("Наблюдение выше среднего", "The observation is above the mean")],
              ["z < 0", pick("Наблюдение ниже среднего", "The observation is below the mean")],
              ["|z|", pick("На сколько стандартных отклонений отстоит", "How many standard deviations away it lies")],
              ["|z| > 3", pick("Редкое наблюдение — в этом модуле это и есть определение выброса", "A rare observation — in this module, the definition of an outlier")],
            ]}
          />
          <KeyTakeaway>
            {pick(
              "Z-оценка безразмерна: единицы сокращаются, потому что доллары делятся на доллары. Поэтому z-оценки сравнимы между совершенно разными переменными — z = 1,5 по зарплате и z = 1,5 по расходу топлива означают одинаковую относительную позицию.",
              "A z-score is dimensionless: the units cancel, because dollars are divided by dollars. That is what makes z-scores comparable across entirely different variables — z = 1.5 on salary and z = 1.5 on fuel economy mean the same relative position.",
            )}
          </KeyTakeaway>
        </LessonBlock>

        <EmpiricalRule />

        <LessonBlock
          eyebrow={pick("Эмпирическое правило", "The Empirical Rule")}
          title={pick(
            "Счётный инструмент для устного разговора",
            "A calculating tool for a conversation with no computer",
          )}
        >
          <Definition term={pick("Эмпирическое правило", "Empirical Rule")} en="Empirical Rule">
            {pick(
              "Для колоколообразного распределения 68 % наблюдений лежат в пределах одного стандартного отклонения от среднего, 95 % — двух, 99,7 % — трёх.",
              "For a bell-shaped distribution, 68 % of observations fall within one standard deviation of the mean, 95 % within two and 99.7 % within three.",
            )}
          </Definition>
          <p>
            {pick(
              "Лектор даёт прямой карьерный аргумент за то, чтобы выучить это наизусть: «Many times you are in a meeting where you are being shown a lot of statistics, and if you want to use your judgment to evaluate the validity of what is being recommended… and don't have access to a computer or calculator, using this understanding… can provide you with a quick insight».",
              "The lecturer gives a straight career argument for memorizing it: 'Many times you are in a meeting where you are being shown a lot of statistics, and if you want to use your judgment to evaluate the validity of what is being recommended… and don't have access to a computer or calculator, using this understanding… can provide you with a quick insight.'",
            )}
          </p>
          <CaseStudy title={pick("Оферта бизнес-аналитика", "The business analyst's offer")}>
            <p>
              {pick(
                "Данные salary.com: медиана $54 030, стандартное отклонение ≈ $8 600. Ваша оферта — $65 000.",
                "salary.com figures: median $54,030, standard deviation ≈ $8,600. Your offer is $65,000.",
              )}
            </p>
            <Formula>{"z = (65 000 − 54 030) / 8 600 = 1,27"}</Formula>
            <p>
              {pick(
                "Оценка вслух: ниже среднего 50 %, между μ и μ + 1σ ещё 34 %, значит на z = +1 накоплено 84 %, а на z = +2 — 97,5 %. Наш 1,27 лежит между ними, ближе к нижней границе. Excel уточняет: NORM.DIST даёт 0,8989 — 90-й процентиль.",
                "Reasoning aloud: 50 % lies below the mean, another 34 % between μ and μ + 1σ, so z = +1 accumulates 84 % and z = +2 reaches 97.5 %. Our 1.27 sits between them, nearer the lower end. Excel sharpens it: NORM.DIST returns 0.8989 — the 90th percentile.",
              )}
            </p>
            <p>
              {pick(
                "Проверка по реальным данным payscale.com для той же профессии: 10 % — $43 406, 25 % — $48 469, медиана — $54 030, 75 % — $61 346, 90 % — $68 008. Оферта в $65 000 действительно между 75-м и 90-м процентилями.",
                "Cross-checked against payscale.com for the same job: 10 % $43,406, 25 % $48,469, median $54,030, 75 % $61,346, 90 % $68,008. The $65,000 offer really does fall between the 75th and 90th percentiles.",
              )}
            </p>
          </CaseStudy>
          <CaseStudy title={pick("TrueCar: эмпирическое правило в рекламе", "TrueCar: the Empirical Rule in an advert")}>
            <p>
              {pick(
                "Запрос по Toyota Camry XLE V6, 201 продажа в районе. Столбцы — фактическая гистограмма цен, поверх наложена нормальная кривая.",
                "A query on a Toyota Camry XLE V6, 201 sales in the area. The bars are the actual price histogram with a normal curve superimposed.",
              )}
            </p>
            <CompareTable
              headers={[pick("Ориентир", "Marker"), pick("Значение", "Value")]}
              rows={[
                ["Exceptional price", "< $27,545"],
                ["Great price", "< $29,272"],
                [pick("Средняя цена продажи", "Average price paid"), "$29,510"],
                ["Factory invoice", "$30,494"],
                ["Above market", "$30,505+"],
                ["MSRP", "$32,904"],
              ]}
            />
            <p>
              {pick(
                "Категории «exceptional / great / above market» — это зоны эмпирического правила, переименованные в маркетинговые ярлыки. Покупка примерно на 2σ ниже среднего и есть «exceptional price».",
                "The 'exceptional / great / above market' bands are the Empirical Rule's zones renamed as marketing labels. A purchase about 2σ below the mean is exactly what 'exceptional price' means.",
              )}
            </p>
            <p className="text-ink-dim">
              {pick(
                "Вывод лектора: «Oftentimes in business, the absolute values, such as the price you paid for your car, has a lot less meaning than how did the price you paid stack up against others».",
                "The lecturer's conclusion: 'Oftentimes in business, the absolute values, such as the price you paid for your car, has a lot less meaning than how did the price you paid stack up against others.'",
              )}
            </p>
          </CaseStudy>
          <CaseStudy title={pick("Практика: наклейка расхода топлива", "Practice: the fuel-economy label")}>
            <p>
              {pick(
                "Наклейка EPA: 26 миль на галлон. Диапазон класса small SUV — от 16 до 32. Как эта машина выглядит на фоне класса?",
                "The EPA label reads 26 MPG. The small-SUV class ranges from 16 to 32. How does this car stack up?",
              )}
            </p>
            <Formula>
              {"μ ≈ (16 + 32) / 2 = 24 MPG\nσ ≈ (32 − 16) / 6 = 2,67 MPG\nz = (26 − 24) / 2,67 = 0,75"}
            </Formula>
            <p>
              {pick(
                "На z = +1 накоплено 84 %; наш 0,75 чуть меньше единицы, значит примерно 80-й процентиль. Машина экономичнее примерно 80 % автомобилей класса.",
                "z = +1 accumulates 84 %; our 0.75 falls a little short of one, so roughly the 80th percentile. The car beats about 80 % of its class on economy.",
              )}
            </p>
            <p>
              {pick(
                "Здесь важнее ответа то, что мы получили осмысленную оценку позиции, имея только два числа с наклейки — без выборки, компьютера и таблицы.",
                "What matters more than the answer is that a meaningful estimate of position came out of two numbers on a sticker — no sample, no computer, no table.",
              )}
            </p>
          </CaseStudy>
          <Pitfall>
            {pick(
              "Делитель 6 или 3? Если дан полный диапазон от минимума до максимума — делите на 6 (три сигмы влево плюс три вправо). Если дано расстояние от среднего до края — делите на 3. Это классическая ловушка: всегда спрашивайте себя, полуширина у вас или полная ширина.",
              "Divide by 6 or by 3? Given the full min-to-max range, divide by 6 — three sigmas each way. Given the distance from the mean out to the edge, divide by 3. This is a classic trap: always ask whether you are holding a half-width or a full width.",
            )}
          </Pitfall>
        </LessonBlock>

        <ExcelWalkthrough guide={guide("m2-zscore")} />
      </section>

      {/* ══════════════ 4. Случайные величины ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<Dice5 size={18} />}
          eyebrow="Lesson 2-4"
          title={pick(
            "Дискретные и непрерывные случайные величины",
            "Discrete and continuous random variables",
          )}
        />

        <LessonBlock
          eyebrow={pick("Смена рамки", "A change of frame")}
          title={pick(
            "От описания прошлого к исходу, который ещё не наступил",
            "From describing the past to an outcome that has not happened",
          )}
        >
          <Definition term={pick("Случайная величина", "Random variable")} en="Random variable">
            {pick(
              "Переменная X, возможные значения которой — числовые исходы случайного процесса.",
              "A variable, written as X, whose possible values are numerical outcomes of a random process.",
            )}
          </Definition>
          <p>
            {pick(
              "Лектор объясняет через вопрос: «How much will my stock value change in a year?» Ответ на этот вопрос и есть случайная величина. Почему «случайная»? Не потому, что она бессмысленна, а потому, что случаен процесс: «we don't fully understand why stock prices go up or down by the amounts that they do». Случайность — признание неполноты знания о механизме, а не отсутствия механизма.",
              "The lecturer frames it through a question: 'How much will my stock value change in a year?' The answer to that question is the random variable. Why 'random'? Not because it is meaningless, but because the process is: 'we don't fully understand why stock prices go up or down by the amounts that they do'. Randomness admits incomplete knowledge of a mechanism, not the absence of one.",
            )}
          </p>
          <CompareTable
            headers={[
              pick("Признак", "Feature"),
              pick("Дискретная", "Discrete"),
              pick("Непрерывная", "Continuous"),
            ]}
            rows={[
              [pick("Множество значений", "Set of values"), pick("Конечное", "Finite"), pick("Несчётно бесконечное", "Uncountably infinite")],
              [pick("Задаётся", "Defined by"), pick("Перечислением значений", "Listing its values"), pick("Интервалом", "An interval")],
              [pick("Как получается", "Where it comes from"), pick("Обычно счёт", "Usually counting"), pick("Обычно измерение", "Usually measurement")],
              [pick("Вероятность одного значения", "Probability of one value"), pick("Может быть больше нуля", "Can exceed zero"), pick("Всегда ноль", "Always zero")],
              [
                pick("Примеры из лекции", "Lecture examples"),
                pick("Число детей в семье, клиентов в очереди", "Children in a family, customers in line"),
                pick("Вес банки газировки, срок службы лампочки", "Weight of a soda can, life of a light bulb"),
              ],
            ]}
          />
          <p>
            {pick(
              "Разбор непрерывности на примере лектора: если взвесить каждую банку газировки и записать истинное значение, вы всегда получите разные числа. Но можно сказать, что вес лежит в интервале 11,5–12,5 унции. То же с лампочкой: «the life of a properly functioning light bulb is between 100 to 1,000 hours».",
              "The lecturer's take on continuity: weigh every soda can and record its true value and you will always get different numbers. But you can say the weight lies between 11.5 and 12.5 ounces. Same with the bulb: 'the life of a properly functioning light bulb is between 100 to 1,000 hours'.",
            )}
          </p>
          <CaseStudy title={pick("Практика: классифицировать четыре величины", "Practice: classify four variables")}>
            <CompareTable
              headers={[pick("Величина", "Variable"), pick("Тип", "Type"), pick("Почему", "Why")]}
              rows={[
                [pick("Дневная доходность акции", "Daily return on a stock"), pick("Непрерывная", "Continuous"), pick("Измерение", "Measurement")],
                [pick("Число клиентов в очереди", "Customers waiting in line"), pick("Дискретная", "Discrete"), pick("Счёт: половины клиента не бывает", "Counting: there is no half a customer")],
                [pick("Время ожидания оператора", "Time waiting for an agent"), pick("Непрерывная", "Continuous"), pick("Измерение времени", "Measuring time")],
                [
                  pick("Число калорий в батончике", "Calories in a chocolate bar"),
                  pick("Непрерывная, но записывается как дискретная", "Continuous, but recorded as discrete"),
                  pick("Округление не меняет природу величины", "Rounding does not change the variable's nature"),
                ],
              ]}
            />
            <p>
              {pick(
                "Последний пункт самый содержательный: «we may not be interested in absolute accuracy and thus round the numbers». На экзамене отвечайте по природе процесса — измерение или счёт, — а не по тому, как выглядят цифры в таблице.",
                "The last row carries the lesson: 'we may not be interested in absolute accuracy and thus round the numbers'. In an exam answer by the nature of the process — measuring or counting — not by how the digits look in the table.",
              )}
            </p>
          </CaseStudy>
        </LessonBlock>

        <DiscreteDistribution />

        <LessonBlock
          eyebrow={pick("Распределения и ожидание", "Distributions and expectation")}
          title={pick(
            "Таблица относительных частот из Модуля 1 — это и есть распределение вероятностей",
            "The relative-frequency table from Module 1 is a probability distribution",
          )}
        >
          <p>
            {pick(
              "Лектор проговаривает связь явно: «We actually did this when we learned about histograms and relative frequencies. What we were displaying was the probability distribution». Ничего нового не изобретается — меняется интерпретация: относительная частота, наблюдённая в прошлом, читается как вероятность будущего исхода.",
              "The lecturer states the link outright: 'We actually did this when we learned about histograms and relative frequencies. What we were displaying was the probability distribution.' Nothing new is invented — the interpretation changes: a relative frequency observed in the past is read as the probability of a future outcome.",
            )}
          </p>
          <Definition term={pick("Распределение вероятностей", "Probability distribution")} en="Probability distribution">
            {pick(
              "Таблица, график или формула, сопоставляющая каждому возможному значению вероятность, с которой оно наступает.",
              "A table, graph or formula that gives the probability associated with each possible value the variable can assume.",
            )}
          </Definition>
          <Formula caption={pick("Два обязательных свойства. Второе — ещё и бесплатная проверка вашей работы в Excel.", "Two required properties. The second doubles as a free correctness check in Excel.")}>
            {"p(x) ≥ 0 для каждого x            Σ p(x) = 1"}
          </Formula>
          <Definition term={pick("Кумулятивная функция", "Cumulative distribution function")} en="Cumulative distribution function">
            {pick(
              "Функция, дающая вероятность того, что случайная величина не превосходит x. Для дискретной величины считается накоплением вероятностей.",
              "A function with the probability that the random variable X is less than or equal to x. For a discrete variable it is computed by summing the probabilities.",
            )}
          </Definition>
          <p>
            {pick(
              "CDF есть у всех случайных величин, дискретных и непрерывных. Именно её возвращает NORM.DIST(…; 1) в уроке 2-5 — и именно поэтому последний аргумент называется cumulative.",
              "Every random variable has a CDF, discrete or continuous. It is exactly what NORM.DIST(…, 1) returns in Lesson 2-5 — and exactly why that last argument is called cumulative.",
            )}
          </p>
          <Definition term={pick("Математическое ожидание", "Expected value")} en="Expected value">
            {pick(
              "Среднее дискретной случайной величины, взвешенное вероятностями.",
              "The mean of a discrete random variable, weighted by probabilities.",
            )}
          </Definition>
          <Formula>{"E(X) = μ = Σ x·p(x)            σ = √Σ(x − μ)²·p(x)"}</Formula>
          <KeyTakeaway>
            {pick(
              "1,8 брата/сестры не может быть ни у кого. Математическое ожидание — это долгосрочное среднее, а не предсказание одного исхода: «the value expected to occur in the long run and on average».",
              "Nobody can have 1.8 siblings. An expected value is a long-run average, not a prediction of a single outcome: 'the value expected to occur in the long run and on average'.",
            )}
          </KeyTakeaway>
          <p>
            {pick(
              "Формула σ повторяет логику урока 2-2 с одной заменой: вместо деления на n каждый квадрат отклонения взвешивается вероятностью своего исхода. Это и есть переход от «данных, которые у меня есть» к «исходам, которые могут случиться».",
              "The σ formula repeats Lesson 2-2's logic with one substitution: instead of dividing by n, each squared deviation is weighted by its outcome's probability. That substitution is the step from 'data I have' to 'outcomes that may occur'.",
            )}
          </p>
          <SourceNote>
            {pick(
              "Мостик к уроку 2-5: строить таблицу вручную можно для пяти исходов, для тысячи — нельзя. Поэтому статистика пользуется семейством известных распределений. В этом курсе разбирается одно — нормальное, — и оно же используется как приближение для дискретных случаев.",
              "The bridge to Lesson 2-5: a table by hand works for five outcomes and fails at a thousand. Statistics therefore leans on a family of well-known distributions. This course covers one — the normal — and uses it as an approximation for discrete cases too.",
            )}
          </SourceNote>
        </LessonBlock>

        <ExcelWalkthrough guide={guide("m2-expected-value")} />
      </section>

      {/* ══════════════ 5. Нормальное распределение ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<BellRing size={18} />}
          eyebrow="Lesson 2-5"
          title={pick("Нормальное распределение", "The normal distribution")}
        />

        <LessonBlock
          eyebrow={pick("Непрерывные распределения", "Continuous distributions")}
          title={pick("Площадь вместо столбцов", "Area instead of bars")}
        >
          <Definition term={pick("Непрерывное распределение", "Continuous probability distribution")} en="Continuous probability distribution">
            {pick(
              "Непрерывная величина не определена в конкретных точках: она задана на интервале и представлена площадью под кривой. Вероятность наблюдать любое отдельное значение равна нулю, потому что значений бесконечно много.",
              "A continuous random variable is not defined at specific values. Instead it is defined over an interval and represented by the area under a curve. The probability of observing any single value is zero, since the number of values is infinite.",
            )}
          </Definition>
          <p>
            {pick(
              "Это самый неинтуитивный тезис модуля. Вопрос «какова вероятность, что температура ровно 72,0000000 °F?» не имеет содержательного ответа: значений в интервале несчётно много. Ненулевую вероятность имеют только интервалы — «от 71,5 до 72,5» уже осмысленный вопрос.",
              "This is the module's least intuitive claim. 'What is the probability the temperature is exactly 72.0000000 °F?' has no meaningful answer: the interval holds uncountably many values. Only intervals carry non-zero probability — 'between 71.5 and 72.5' is a real question.",
            )}
          </p>
          <Pitfall>
            {pick(
              "Практическое следствие для экзамена: для непрерывной величины P(X ≤ 1005) и P(X < 1005) — одно и то же число, потому что вероятность самой границы равна нулю. Для дискретной величины это не так: там строгое и нестрогое неравенство различаются на целое слагаемое.",
              "The exam consequence: for a continuous variable P(X ≤ 1005) and P(X < 1005) are the same number, because the boundary itself carries zero probability. For a discrete variable they are not: there, strict and non-strict inequalities differ by a whole term.",
            )}
          </Pitfall>
          <p>
            {pick(
              "Пример лектора: температура воды. Вода замерзает при 0 °C и кипит при 100 °C, значит X ∈ [0, 100]. Плотность нигде не отрицательна, полная площадь равна единице — «collectively all possibilities are accounted for».",
              "The lecturer's example: water temperature. Water freezes at 0 °C and boils at 100 °C, so X ∈ [0, 100]. The density is nowhere negative and the total area equals one — 'collectively all possibilities are accounted for'.",
            )}
          </p>
        </LessonBlock>

        <NormalShapeExplorer />

        <LessonBlock
          eyebrow={pick("Свойства и стандартизация", "Properties and standardizing")}
          title={pick(
            "Бесконечно много кривых сводятся к одной",
            "Infinitely many curves collapse into one",
          )}
        >
          <Definition term={pick("Нормальное распределение", "Normal distribution")} en="Normal distribution">
            {pick(
              "Колоколообразная кривая, заданная (1) своим средним μ, вокруг которого она симметрична, и (2) своим стандартным отклонением σ, которое определяет её форму.",
              "A bell-shaped curve defined by (1) its mean μ, about which it is symmetrical, and (2) its standard deviation σ, which determines its shape.",
            )}
          </Definition>
          <CompareTable
            headers={[pick("Свойство", "Property"), pick("Формулировка", "Statement"), pick("Следствие", "Consequence")]}
            rows={[
              [
                pick("Симметрия", "Symmetry"),
                pick("Левая и правая половины — зеркальные отражения", "The left and right halves mirror each other"),
                pick("mean = median (и мода); именно это оправдывает эмпирическое правило", "mean = median (and the mode); this is what justifies the Empirical Rule"),
              ],
              [
                pick("Бесконечные хвосты", "Infinite tails"),
                pick("Уходят к ±∞, приближаясь к оси, но не касаясь её", "They extend to ±∞, approaching the axis but never touching it"),
                pick("Формально возможно любое значение; практически за 3σ почти ничего нет", "Formally any value is possible; practically almost nothing lies beyond 3σ"),
              ],
              [
                pick("Половины по 0,5", "Halves of 0.5"),
                pick("Слева от μ ровно 50 %, справа ровно 50 %", "Exactly 50 % lies left of μ and 50 % right"),
                pick("Опорная точка любого расчёта: P(X ≤ μ) = 0,5", "The anchor of every calculation: P(X ≤ μ) = 0.5"),
              ],
            ]}
          />
          <Definition term={pick("Стандартное нормальное распределение", "Standard normal distribution")} en="Standard normal distribution">
            {pick(
              "Частный случай нормального распределения со средним 0 и стандартным отклонением 1. Его случайная величина называется стандартной оценкой, или z-оценкой.",
              "A special case of the normal distribution with a mean of zero and a standard deviation of one. Its random variable is called a standard score, or z-score.",
            )}
          </Definition>
          <p>
            {pick(
              "Зачем это нужно, лектор объясняет прямо: нормальных кривых бесконечно много — по одной на каждую пару (μ, σ), — и затабулировать их все невозможно. Но все они приводятся к одной заменой переменной. Затабулировали одну кривую — умеете считать вероятности для любой.",
              "The lecturer explains the point directly: there are infinitely many normal curves, one per (μ, σ) pair, and tabulating them all is impossible. But a single change of variable reduces them all to one. Tabulate that one curve and you can price any of them.",
            )}
          </p>
          <CaseStudy title={pick("Стандартизация в действии: μ = 1000, σ = 10", "Standardizing in action: μ = 1000, σ = 10")}>
            <Formula>
              {"x = 995  → z = (995 − 1000) / 10 = −0,5\nx = 1005 → z = (1005 − 1000) / 10 = +0,5\nP(995 ≤ X ≤ 1005) = P(−0,5 ≤ Z ≤ 0,5) = 0,3829"}
            </Formula>
            <p>
              {pick(
                "Для нормальной совокупности со средним 1000 и стандартным отклонением 10 вероятность наблюдать значение между 995 и 1005 равна 38,29 %. Согласуется с эмпирическим правилом: ±0,5σ должно давать заметно меньше 68 %.",
                "For a normal population with a mean of 1000 and a standard deviation of 10, the probability of observing a value between 995 and 1005 is 38.29 %. Consistent with the Empirical Rule: ±0.5σ must come in well under 68 %.",
              )}
            </p>
          </CaseStudy>
          <Definition term={pick("Нормальное распределение как модель", "Normal distribution as a model")} en="Normal distribution as a model">
            {pick(
              "Идеально симметричных кривых в реальности не бывает, но многие явления близки к нормальным, и это позволяет использовать кривую как модель для оценки вероятностей.",
              "Perfectly symmetrical curves may not exist in the real world, but many phenomena follow at least a near-normal distribution, which lets the curve serve as a model for assessing probabilities.",
            )}
          </Definition>
          <p>
            {pick(
              "Три причины, по которым это самое важное распределение в статистике: множество реальных явлений приближённо нормальны; оно позволяет по выборке судить о совокупности (Модули 3–4); оно хорошо приближает некоторые дискретные распределения.",
              "Three reasons it is the most important distribution in statistics: many real phenomena are approximately normal; it lets sample information speak about a population (Modules 3–4); and it approximates some discrete distributions well.",
            )}
          </p>
          <Pitfall>
            {pick(
              "Ключевое слово — модель. Нормальная кривая не «есть» в данных, она к ним прикладывается. Micceri (1989) проверил 440 реальных наборов данных и не нашёл ни одного нормального; Mandelbrot (1963) показал, что у финансовых доходностей хвосты существенно тяжелее нормальных, так что применение эмпирического правила к доходностям портфеля систематически недооценивает риск.",
              "The operative word is model. The normal curve is not present in the data; it is laid over them. Micceri (1989) tested 440 real data sets and found none normal, and Mandelbrot (1963) showed that financial returns have substantially heavier tails than the normal allows — so applying the Empirical Rule to portfolio returns systematically understates risk.",
            )}
          </Pitfall>
        </LessonBlock>

        <NormalAreaCalculator />

        <LessonBlock
          eyebrow={pick("Excel: карта функций", "Excel: a map of the functions")}
          title={pick(
            "Четыре функции NORM по двум осям",
            "Four NORM functions along two axes",
          )}
        >
          <p>
            {pick(
              "Разница между четырьмя функциями — постоянный источник ошибок. Разбирайте их по двум признакам. Есть ли «.S» в имени? Без неё функция работает с вашим распределением и требует μ и σ; с ней — со стандартным (μ = 0, σ = 1) и не требует ничего. Что дано и что ищем? DIST идёт от значения к вероятности, INV — обратно.",
              "The difference between the four is a permanent source of error. Sort them on two axes. Is there a '.S' in the name? Without it the function works on your distribution and needs μ and σ; with it the standard one (μ = 0, σ = 1), and it needs neither. What is given and what is sought? DIST goes value to probability, INV goes back.",
            )}
          </p>
          <CompareTable
            headers={[
              pick("Функция", "Function"),
              pick("Аргументы", "Arguments"),
              pick("Дано → найти", "Given → find"),
            ]}
            rows={[
              ["NORM.DIST(x; mean; sd; 1)", "x, μ, σ, cumulative", pick("Значение → вероятность", "Value → probability")],
              ["NORM.S.DIST(z; 1)", "z, cumulative", pick("Z-оценка → вероятность", "Z-score → probability")],
              ["NORM.INV(prob; mean; sd)", pick("вероятность, μ, σ", "probability, μ, σ"), pick("Вероятность → значение", "Probability → value")],
              ["NORM.S.INV(prob)", pick("вероятность", "probability"), pick("Вероятность → z-оценка", "Probability → z-score")],
            ]}
          />
          <Pitfall>
            {pick(
              "Аргумент cumulative всегда 1. Единица трактуется как TRUE (функция распределения — площадь слева), ноль как FALSE (функция плотности — высота кривой). Указание лектора однозначно: «you're not ever going to use probability mass function in this class».",
              "The cumulative argument is always 1. One reads as TRUE (the distribution function — the area to the left) and zero as FALSE (the density function — the height of the curve). The lecturer is unambiguous: 'you're not ever going to use probability mass function in this class'.",
            )}
          </Pitfall>
          <KeyTakeaway>
            {pick(
              "x = μ + zσ — формула z-оценки, решённая относительно значения. Знайте её наизусть: она нужна в любой задаче «найти значение по процентилю» и станет x̄ ± z·(σ/√n) в доверительных интервалах Модулей 4–6. Запомните и z = 1,645 для 95-го процентиля: вместе с 1,96 и 2,576 оно будет встречаться до конца курса.",
              "x = μ + zσ is the z formula solved for the value. Know it cold: every 'find the value from a percentile' problem needs it, and it becomes x̄ ± z·(σ/√n) in the confidence intervals of Modules 4–6. Memorize z = 1.645 for the 95th percentile too — along with 1.96 and 2.576 it recurs to the end of the course.",
            )}
          </KeyTakeaway>
        </LessonBlock>

        <ExcelWalkthrough guide={guide("m2-normal-areas")} />
        <ExcelWalkthrough guide={guide("m2-norm-inv")} />
      </section>

      {/* ══════════════ 6. Z-таблица ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<TableProperties size={18} />}
          eyebrow="Lesson 2-6"
          title={pick(
            "Таблица стандартного нормального распределения",
            "The standard normal table",
          )}
        />

        <LessonBlock
          eyebrow={pick("Откуда берётся таблица", "Where the table comes from")}
          title={pick("Интеграл, который не берётся", "An integral that cannot be taken")}
        >
          <Formula caption={pick("Для стандартного нормального μ = 0 и σ = 1, e = 2,71828, π = 3,14159.", "For the standard normal, μ = 0 and σ = 1, with e = 2.71828 and π = 3.14159.")}>
            {"p(x) = e^(−(x − μ)² / 2σ²) / (σ√2π)"}
          </Formula>
          <p>
            {pick(
              "Формулу не требуется применять — её показывают, чтобы объяснить происхождение таблицы. Площадь под этой кривой не выражается через элементарные функции: первообразной в привычном виде не существует. Поэтому значения вычислили численно один раз и затабулировали.",
              "You are not asked to use the formula — it is shown to explain where the table came from. The area under this curve has no expression in elementary functions: there is no antiderivative in the usual sense. So the values were computed numerically once and tabulated.",
            )}
          </p>
          <Pitfall>
            {pick(
              "Первое правило работы с любой z-таблицей — прочитать легенду. Бывают кумулятивные таблицы, таблицы «от 0 до z» и таблицы одного хвоста, и ответы у них разные. В таблице курса значение — это P(Z ≤ z), площадь слева.",
              "The first rule with any z-table is to read the legend. There are cumulative tables, '0 to z' tables and one-tail tables, and they give different answers. In the course's table the entry is P(Z ≤ z), the area to the left.",
            )}
          </Pitfall>
        </LessonBlock>

        <ZTableLookup />

        <LessonBlock
          eyebrow={pick("Четыре типа задач", "Four question types")}
          title={pick("SAT: μ = 500, σ = 100", "The SAT: μ = 500, σ = 100")}
        >
          <CompareTable
            headers={[
              pick("Тип", "Type"),
              pick("Вопрос", "Question"),
              pick("Решение", "Working"),
              pick("Ответ", "Answer"),
            ]}
            rows={[
              [
                pick("Положительный z", "Positive z"),
                pick("Балл 635 — как человек справился?", "A score of 635 — how did they do?"),
                "z = 1,35 → 0,9115",
                pick("91-й процентиль", "91st percentile"),
              ],
              [
                pick("«Больше чем»", "'Greater than'"),
                pick("Вероятность набрать больше 635?", "Probability of scoring above 635?"),
                "1 − 0,9115",
                "0,0885",
              ],
              [
                pick("Отрицательный z", "Negative z"),
                pick("Балл 458 — какой процентиль?", "A score of 458 — which percentile?"),
                "z = −0,42 → 1 − 0,6628",
                pick("0,3372 — 34-й процентиль", "0.3372 — 34th percentile"),
              ],
              [
                pick("«Между»", "'Between'"),
                pick("Балл между 490 и 550?", "A score between 490 and 550?"),
                "0,6915 − 0,4602",
                "0,2313",
              ],
            ]}
          />
          <Definition term={pick("Приём симметрии", "The symmetry trick")} en="Symmetry trick for negative z">
            {pick(
              "Таблица курса содержит только положительные z. Из-за симметрии кривой площадь слева от −a равна площади справа от +a. Возьмите модуль, прочитайте таблицу и вычтите результат из единицы.",
              "The course table holds positive z only. Because the curve is symmetrical, the area left of −a equals the area right of +a. Take the absolute value, read the table and subtract the result from one.",
            )}
          </Definition>
          <Formula>{"P(Z ≤ −a) = P(Z ≥ +a) = 1 − P(Z ≤ +a)"}</Formula>
          <CaseStudy title={pick("Обратная задача: 95-й процентиль по таблице", "The inverse problem: the 95th percentile from the table")}>
            <p>
              {pick(
                "Ищем в теле таблицы значение, ближайшее к 0,9500. Точного нет: 0,9495 даёт z = 1,64, а 0,9505 — z = 1,65. Наше 0,95 стоит ровно посередине, поэтому интерполируем до z = 1,645.",
                "Hunt through the table's body for the value nearest 0.9500. There is no exact entry: 0.9495 gives z = 1.64 and 0.9505 gives z = 1.65. Ours sits exactly between them, so interpolate to z = 1.645.",
              )}
            </p>
            <Formula>{"x = μ + zσ = 500 + 1,645 × 100 = 664,5  →  нужен балл 665"}</Formula>
            <p>
              {pick(
                "Совпадает с NORM.INV(0,95; 500; 100) = 664,4854. В транскрипте лекции здесь произносится «644,5» — оговорка; на слайде и во всех расчётах правильное значение 664,5.",
                "This matches NORM.INV(0.95, 500, 100) = 664.4854. The lecture transcript says '644.5' at this point — a slip of the tongue; the slide and every calculation give 664.5.",
              )}
            </p>
          </CaseStudy>
          <p>
            {pick(
              "Зачем учить таблицу, если есть Excel? Экзамены и собеседования часто проходят без компьютера; таблица делает видимым то, что NORM.DIST прячет — вы физически видите, что ищете площадь; приём симметрии понадобится в Модулях 5–6 при работе с двусторонними критериями; и, умея прикинуть ответ, вы заметите, если формула вернула чушь.",
              "Why learn the table when Excel exists? Exams and interviews often happen without a computer; the table makes visible what NORM.DIST hides — you physically see that you are hunting for an area; the symmetry trick returns in Modules 5–6 with two-tailed tests; and being able to estimate the answer is how you catch a formula that returned nonsense.",
            )}
          </p>
        </LessonBlock>
      </section>

      {/* ══════════════ 7. Сводка ══════════════ */}
      <section className="space-y-4">
        <SectionHeader
          icon={<Compass size={18} />}
          eyebrow={pick("Сводка модуля", "Module summary")}
          title={pick("Как выбрать инструмент", "Choosing the tool")}
        />

        <LessonBlock
          eyebrow={pick("Матрица решений", "Decision matrix")}
          title={pick("Что дано → что делать", "What is given → what to do")}
        >
          <CompareTable
            headers={[pick("Дано", "Given"), pick("Ищем", "Wanted"), pick("Инструмент", "Tool")]}
            rows={[
              [pick("Сырые данные", "Raw data"), pick("Центр", "Centre"), "=AVERAGE · =MEDIAN"],
              [pick("Сырые данные", "Raw data"), pick("Разброс", "Spread"), "=STDEV.S"],
              [pick("μ, σ, значение x", "μ, σ and a value x"), pick("Вероятность / процентиль", "Probability / percentile"), "=NORM.DIST(x; μ; σ; 1)"],
              [pick("μ, σ, вероятность", "μ, σ and a probability"), pick("Значение x", "The value x"), "=NORM.INV(p; μ; σ)"],
              ["z", pick("Вероятность", "Probability"), pick("=NORM.S.DIST(z; 1) или z-таблица", "=NORM.S.DIST(z, 1) or the z-table")],
              [pick("Вероятность", "A probability"), "z", pick("=NORM.S.INV(p) или z-таблица наоборот", "=NORM.S.INV(p) or the z-table backwards")],
              [pick("Диапазон min–max", "A min-to-max range"), pick("Оценка σ", "An estimate of σ"), "(max − min) ÷ 6"],
              [pick("Расстояние от μ до края", "Distance from μ to the edge"), pick("Оценка σ", "An estimate of σ"), pick("расстояние ÷ 3", "distance ÷ 3")],
              [pick("Таблица исход-частота", "An outcome/frequency table"), "E(X)", "=SUMPRODUCT(x; p)"],
              [pick("Таблица исход-частота", "An outcome/frequency table"), "σ", "=SQRT(SUMPRODUCT((x−μ)²; p))"],
            ]}
          />
          <KeyTakeaway>
            {pick(
              "Три сквозные идеи модуля. Первая: одно число никогда не описывает данные — отчитывайтесь парой «центр + разброс». Вторая: относительная позиция чаще важнее абсолютного значения — $65 000 это ничто, 90-й процентиль это решение. Третья: стандартизация делает несравнимое сравнимым, сводя любую нормальную кривую к единственной затабулированной.",
              "Three ideas run through the module. One: a single number never describes data — report the pair, centre and spread. Two: relative position usually beats absolute value — $65,000 is nothing, the 90th percentile is a decision. Three: standardizing makes the incomparable comparable, reducing any normal curve to the single tabulated one.",
            )}
          </KeyTakeaway>
          <SourceNote>
            {pick(
              "Gies eBook «Exploring and Producing Data for Business Decision Making», Module 2 (© 2019 Fataneh Taghaboni-Dutta, Gies College of Business, University of Illinois at Urbana-Champaign), плюс дополнительное чтение Lane, D. M. et al., «Online Statistics Education» (onlinestatbook.com).",
              "Gies eBook 'Exploring and Producing Data for Business Decision Making', Module 2 (© 2019 Fataneh Taghaboni-Dutta, Gies College of Business, University of Illinois at Urbana-Champaign), plus the assigned reading in Lane, D. M. et al., 'Online Statistics Education' (onlinestatbook.com).",
            )}
          </SourceNote>
        </LessonBlock>
      </section>
    </div>
  );
}
