import type { L10n } from "@/lib/types";

export interface ExcelStep {
  title: L10n;
  body: L10n;
  formula?: string;
  shortcut?: string;
}

export interface ExcelGuide {
  id: string;
  lesson: string;
  title: L10n;
  goal: L10n;
  dataset: L10n;
  steps: ExcelStep[];
  takeaway: L10n;
}

/**
 * Transcribed from the Excel illustration videos of Module 1
 * (Lessons 1-2.2, 1-2.3, 1-2.4, 1-3.2, 1-4.2, 1-5.2) and Module 2
 * (Lessons 2-1.2, 2-2.2, 2-3.2, 2-4.2, 2-5.2…2-5.7).
 */
export const EXCEL_GUIDES: ExcelGuide[] = [
  {
    id: "freq-quant",
    lesson: "Lesson 1-2.2",
    title: {
      ru: "Частотная таблица для количественных данных",
      en: "Frequency table for quantitative data",
    },
    goal: {
      ru: "500 значений времени ожидания превратить в таблицу из 10 строк.",
      en: "Turn 500 waiting-time values into a 10-row table.",
    },
    dataset: {
      ru: "Customer Waiting Time.xlsx — столбец A, 500 наблюдений в секундах",
      en: "Customer Waiting Time.xlsx — column A, 500 observations in seconds",
    },
    steps: [
      {
        title: { ru: "Узнайте границы данных", en: "Find the limits of the data" },
        body: {
          ru: "Прежде чем строить интервалы, нужно знать минимум, максимум и число наблюдений. Встаньте в A2, зажмите Ctrl+Shift+↓ — выделится весь столбец разом.",
          en: "Before you build intervals you need the minimum, the maximum and the count. Click A2 and hold Ctrl+Shift+↓ to select the whole column at once.",
        },
        formula: "=MIN(A2:A501)   =MAX(A2:A501)   =COUNT(A2:A501)",
        shortcut: "Ctrl + Shift + ↓",
      },
      {
        title: { ru: "Постройте столбец bin", en: "Build the bin column" },
        body: {
          ru: "Минимум 0, максимум 300 → берём шаг 30 секунд. Напишите 30, затем 60, выделите обе ячейки и протяните маркером заполнения до 300. Значение в bin — это ВЕРХНЯЯ граница интервала: 60 означает «больше 30 и до 60 включительно».",
          en: "Minimum 0, maximum 300 → use a 30-second step. Type 30, then 60, select both cells and drag the fill handle down to 300. A bin value is the UPPER limit of the interval: 60 means 'above 30 and up to 60 inclusive'.",
        },
      },
      {
        title: { ru: "Выделите место под массив", en: "Reserve room for the array" },
        body: {
          ru: "FREQUENCY — это функция массива: она возвращает не одно число, а столбец. Выделите диапазон рядом с bin — ровно столько ячеек, сколько интервалов, плюс одну запасную (на случай значений выше последней границы).",
          en: "FREQUENCY is an array function: it returns a column, not a single number. Select the range next to the bins — as many cells as intervals, plus one spare (for values above the last limit).",
        },
      },
      {
        title: { ru: "Введите FREQUENCY", en: "Enter FREQUENCY" },
        body: {
          ru: "data_array — все 500 наблюдений, bins_array — столбец границ. Завершите ввод Ctrl+Shift+Enter, иначе вы получите только первое число.",
          en: "data_array is all 500 observations, bins_array is the column of limits. Finish with Ctrl+Shift+Enter or you will only get the first number.",
        },
        formula: "=FREQUENCY(A2:A501, D2:D11)",
        shortcut: "Ctrl + Shift + Enter",
      },
      {
        title: { ru: "Добавьте относительную частоту", en: "Add relative frequency" },
        body: {
          ru: "Каждую частоту делим на общее число наблюдений. Ссылку на ячейку с итогом закрепите клавишей F4 ($E$4) — тогда при протягивании знаменатель не «уедет».",
          en: "Divide each frequency by the total number of observations. Lock the reference to the total with F4 ($E$4) so the denominator does not drift when you fill down.",
        },
        formula: "=E11/$E$4",
        shortcut: "F4",
      },
      {
        title: { ru: "Переведите в проценты", en: "Format as percentages" },
        body: {
          ru: "Формат ячеек → Процентный. Итог: 13 % клиентов ждали от 181 до 210 секунд, и основная масса скапливается в верхних интервалах — плохая новость для клиентского сервиса.",
          en: "Number format → Percentage. Result: 13% of customers waited between 181 and 210 seconds, and the mass piles up in the upper bins — bad news for customer service.",
        },
      },
    ],
    takeaway: {
      ru: "Значение bin — верхняя граница интервала; FREQUENCY вводится как формула массива; знаменатель относительной частоты всегда закрепляется через F4.",
      en: "A bin value is the interval's upper limit; FREQUENCY is entered as an array formula; the relative-frequency denominator is always locked with F4.",
    },
  },
  {
    id: "freq-qual",
    lesson: "Lesson 1-2.3",
    title: {
      ru: "Частотная таблица для качественных данных",
      en: "Frequency table for qualitative data",
    },
    goal: {
      ru: "233 601 строку с названиями моделей свернуть в таблицу из 11 категорий.",
      en: "Collapse 233,601 rows of model names into an 11-category table.",
    },
    dataset: {
      ru: "Best-selling Trucks.xlsx — столбец A, название проданного пикапа в каждой строке",
      en: "Best-selling Trucks.xlsx — column A, the model of every truck sold",
    },
    steps: [
      {
        title: { ru: "Выделите весь столбец", en: "Select the whole column" },
        body: {
          ru: "Встаньте в A1 и нажмите Ctrl+Shift+↓ — выделятся все 233 602 строки за одно нажатие.",
          en: "Click A1 and press Ctrl+Shift+↓ — all 233,602 rows are selected in one keystroke.",
        },
        shortcut: "Ctrl + Shift + ↓",
      },
      {
        title: { ru: "Получите список уникальных значений", en: "Extract the unique values" },
        body: {
          ru: "Данные → Сортировка и фильтр → Дополнительно (Advanced). Выберите «скопировать результат в другое место», укажите ячейку назначения и поставьте флажок «Только уникальные записи». Excel вернёт 11 названий моделей.",
          en: "Data → Sort & Filter → Advanced. Choose 'Copy to another location', pick the destination cell and tick 'Unique records only'. Excel returns the 11 model names.",
        },
      },
      {
        title: { ru: "Посчитайте вхождения через COUNTIF", en: "Count occurrences with COUNTIF" },
        body: {
          ru: "range — весь столбец исходных данных, обязательно закреплённый через F4; criteria — ячейка с названием модели. Затем двойной клик по маркеру заполнения — формула размножится на все категории.",
          en: "range is the whole raw-data column, locked with F4; criteria is the cell holding the model name. Then double-click the fill handle to copy the formula down all categories.",
        },
        formula: "=COUNTIF($A$2:$A$233602, E2)",
        shortcut: "F4",
      },
      {
        title: { ru: "Отсортируйте по убыванию", en: "Sort largest to smallest" },
        body: {
          ru: "Главная → Сортировка и фильтр → Настраиваемая сортировка. Сортируйте по столбцу Count, порядок «от максимального к минимальному». Сразу видно: Ford F-Series — лидер, за ним Chevrolet Silverado.",
          en: "Home → Sort & Filter → Custom Sort. Sort by the Count column, largest to smallest. Immediately visible: Ford F-Series leads, Chevrolet Silverado follows.",
        },
      },
      {
        title: { ru: "Итог и относительная частота", en: "Total and relative frequency" },
        body: {
          ru: "Сумма всех категорий = 233 601. Отн. частота = количество ÷ итог, знаменатель снова закрепляем через F4. Ford F-Series = 0,305 → 30,5 % рынка.",
          en: "The categories sum to 233,601. Relative frequency = count ÷ total, with the denominator locked by F4 again. Ford F-Series = 0.305 → 30.5% of the market.",
        },
        formula: "=SUM(F2:F12)      =F2/$F$13",
      },
    ],
    takeaway: {
      ru: "Для категорий последовательность такая: уникальные значения (Advanced Filter) → COUNTIF → сортировка → относительная частота.",
      en: "For categories the sequence is: unique values (Advanced Filter) → COUNTIF → sort → relative frequency.",
    },
  },
  {
    id: "bar",
    lesson: "Lesson 1-2.4",
    title: {
      ru: "Столбчатая диаграмма из частотной таблицы",
      en: "A bar graph from the frequency table",
    },
    goal: {
      ru: "Показать ту же таблицу графически — по количеству и по доле рынка.",
      en: "Show the same table graphically — by count and by market share.",
    },
    dataset: {
      ru: "Готовая частотная таблица из предыдущего практикума",
      en: "The finished frequency table from the previous walkthrough",
    },
    steps: [
      {
        title: { ru: "Выделите две колонки", en: "Select two columns" },
        body: {
          ru: "Модель + количество. Вставка → Гистограмма → Гистограмма с группировкой (2-D Bar).",
          en: "Model + count. Insert → Bar → 2-D Bar.",
        },
      },
      {
        title: { ru: "Уберите лишнее", en: "Remove the clutter" },
        body: {
          ru: "Кликните по линиям сетки и нажмите Delete. Двойной клик по оси X → Линия → цвет темнее (со светло-серого на чёрный), толщину чуть больше — ось становится читаемой.",
          en: "Click the gridlines and press Delete. Double-click the X axis → Line → make the colour darker (light grey to black) and the width slightly larger — the axis becomes readable.",
        },
      },
      {
        title: { ru: "График по относительной частоте", en: "Chart the relative frequency" },
        body: {
          ru: "Колонки «Модель» и «Отн. частота» не соседние: выделите первую, зажмите Ctrl и выделите вторую. Вставка → 2-D Bar. Теперь ось Y — доли рынка: Ford ≈ 30,5 %.",
          en: "The 'Model' and 'Relative frequency' columns are not adjacent: select the first, hold Ctrl and select the second. Insert → 2-D Bar. The Y axis now shows market share: Ford ≈ 30.5%.",
        },
        shortcut: "Ctrl + " + "click",
      },
    ],
    takeaway: {
      ru: "Форма графика одинакова для количества и доли — меняется только шкала оси Y и то, о чём вы говорите: «сколько продано» либо «какая доля рынка».",
      en: "The shape is identical for counts and shares — only the Y scale changes, and with it what you are claiming: 'how many sold' versus 'what share of the market'.",
    },
  },
  {
    id: "hist",
    lesson: "Lesson 1-3.2",
    title: { ru: "Гистограмма через Data Analysis", en: "Histogram via Data Analysis" },
    goal: {
      ru: "Построить гистограмму и сравнить автоматические интервалы со своими.",
      en: "Build a histogram and compare Excel's automatic bins with your own.",
    },
    dataset: {
      ru: "Customer Waiting Time.xlsx — 500 наблюдений",
      en: "Customer Waiting Time.xlsx — 500 observations",
    },
    steps: [
      {
        title: { ru: "Подключите пакет анализа", en: "Enable the Analysis ToolPak" },
        body: {
          ru: "Данные → Анализ данных. Если пункта нет: Файл → Параметры → Надстройки → Пакет анализа → Перейти → отметить галочкой.",
          en: "Data → Data Analysis. If the item is missing: File → Options → Add-ins → Analysis ToolPak → Go → tick the box.",
        },
      },
      {
        title: { ru: "Histogram с автоматическими интервалами", en: "Histogram with automatic bins" },
        body: {
          ru: "Input Range — A1:A501 (с меткой), поставьте флажок Labels, поле Bin Range оставьте пустым, отметьте Chart Output. Excel сам подберёт интервалы — здесь шаг вышел ≈ 13,63 секунды.",
          en: "Input Range A1:A501 (label included), tick Labels, leave Bin Range empty, tick Chart Output. Excel picks the bins itself — here the step came out at ≈ 13.63 seconds.",
        },
      },
      {
        title: { ru: "Histogram со своими интервалами", en: "Histogram with your own bins" },
        body: {
          ru: "Повторите, но в Bin Range укажите свой столбец с шагом 30. Если вы включили Labels, метки должны быть и у данных, и у интервалов, иначе первое число будет прочитано как наблюдение.",
          en: "Repeat, but point Bin Range at your own 30-step column. If you ticked Labels, both the data and the bins need a header row, otherwise the first number is read as an observation.",
        },
      },
      {
        title: { ru: "Сравните два результата", en: "Compare the two results" },
        body: {
          ru: "Узкие интервалы (13,63 с) показывают «качели» внутри распределения; широкие (30 с) сглаживают их, но чётче показывают главное: большинство клиентов ждут долго. Ширина интервала выбирается под решение, которое вы принимаете.",
          en: "Narrow bins (13.63 s) reveal the swings inside the distribution; wide bins (30 s) smooth them but state the headline more clearly: most customers wait a long time. Bin width is chosen for the decision you are making.",
        },
      },
    ],
    takeaway: {
      ru: "Хорошая практика: сначала дать Excel подобрать интервалы автоматически, затем попробовать пару своих вариантов и выбрать самый выразительный.",
      en: "Good practice: let Excel pick the bins first, then try a couple of your own and keep the most expressive one.",
    },
  },
  {
    id: "pie",
    lesson: "Lesson 1-4.2",
    title: { ru: "Круговая диаграмма и «pie of pie»", en: "Pie chart and 'pie of pie'" },
    goal: {
      ru: "Показать доли рынка так, чтобы диаграмма не превратилась в кашу.",
      en: "Show market shares without the chart turning into mush.",
    },
    dataset: {
      ru: "Частотная таблица продаж пикапов",
      en: "The pickup-truck frequency table",
    },
    steps: [
      {
        title: { ru: "Вставьте круговую диаграмму", en: "Insert the pie chart" },
        body: {
          ru: "Выделите категории и значения → Вставка → Круговая → 2-D Pie. Не важно, брать количество или относительную частоту: диаграмма всё равно покажет доли.",
          en: "Select categories and values → Insert → Pie → 2-D Pie. It does not matter whether you use counts or relative frequency: the chart shows shares either way.",
        },
      },
      {
        title: { ru: "Подписи данных", en: "Data labels" },
        body: {
          ru: "Плюс справа от диаграммы → Подписи данных → Дополнительные параметры → Имя категории. С 11 категориями подписи наползают друг на друга — это сигнал сменить тип.",
          en: "The plus button beside the chart → Data Labels → More options → Category Name. With 11 categories the labels collide — a signal to change the chart type.",
        },
      },
      {
        title: { ru: "Переключитесь на Pie of Pie", en: "Switch to Pie of Pie" },
        body: {
          ru: "Изменить тип диаграммы → Pie of Pie. По умолчанию во вторичную диаграмму уходят четыре последних значения — поэтому данные должны быть отсортированы по убыванию.",
          en: "Change Chart Type → Pie of Pie. By default the last four values move to the secondary chart — which is why the data must be sorted descending.",
        },
      },
      {
        title: { ru: "Задайте порог по проценту", en: "Split by percentage value" },
        body: {
          ru: "Двойной клик по диаграмме → Параметры ряда → «Разделить ряд по» → Значение процента → 10 %. Теперь во вторичном круге всё, что меньше 10 % рынка. В подписях выберите «Доли», а значения уберите.",
          en: "Double-click the chart → Series Options → 'Split series by' → Percentage value → 10%. The secondary pie now holds everything under 10% of the market. In the labels choose 'Percentage' and drop the values.",
        },
      },
    ],
    takeaway: {
      ru: "Итог читается за секунду: Ford 31 %, Silverado 23 %, Ram 19 %, все остальные вместе 27 %.",
      en: "The result reads in a second: Ford 31%, Silverado 23%, Ram 19%, everything else together 27%.",
    },
  },
  {
    id: "scatter",
    lesson: "Lesson 1-5.2",
    title: { ru: "Диаграмма рассеяния", en: "Scatter plot" },
    goal: {
      ru: "Проверить визуально, связаны ли расходы на рекламу и продажи.",
      en: "Check visually whether advertising spend and sales are related.",
    },
    dataset: {
      ru: "Scatter Plot.xlsx — столбец A: реклама, столбец B: продажи",
      en: "Scatter Plot.xlsx — column A: advertising, column B: sales",
    },
    steps: [
      {
        title: { ru: "Расположите переменные правильно", en: "Lay the variables out correctly" },
        body: {
          ru: "X и Y должны стоять в соседних столбцах, причём независимая переменная (реклама — ею управляет менеджер) слева. Зависимая (продажи) — справа, она попадёт на ось Y.",
          en: "X and Y must sit in adjacent columns, with the independent variable (advertising — the manager sets it) on the left. The dependent one (sales) goes right and lands on the Y axis.",
        },
      },
      {
        title: { ru: "Вставьте точечную диаграмму", en: "Insert the scatter chart" },
        body: {
          ru: "Выделите оба столбца вместе с заголовками → Вставка → Точечная → «Только маркеры» (не линии).",
          en: "Select both columns including headers → Insert → Scatter → 'Markers only' (not lines).",
        },
      },
      {
        title: { ru: "Подпишите оси", en: "Label the axes" },
        body: {
          ru: "Кликните по диаграмме, нажмите «плюс» → Названия осей. Впишите «Advertising $» и «Sales $». График без подписанных осей нельзя показывать никому.",
          en: "Click the chart, press the plus button → Axis Titles. Type 'Advertising $' and 'Sales $'. A chart with unlabelled axes should never leave your screen.",
        },
      },
      {
        title: { ru: "Уберите сетку, тренд пока не добавляйте", en: "Drop the gridlines, hold the trendline" },
        body: {
          ru: "Снимите флажок Gridlines, чтобы точки читались лучше. Линию тренда (Trendline) в этом модуле сознательно не включаем — регрессия и проверка значимости связи будут во втором курсе.",
          en: "Untick Gridlines so the points read better. The trendline is deliberately left off in this module — regression and testing the significance of the relationship belong to the second course.",
        },
      },
    ],
    takeaway: {
      ru: "Если ось X — время, та же диаграмма называется временным рядом (time series).",
      en: "When the X axis is time, the very same chart is called a time series.",
    },
  },

  /* ══════════════════════ Module 2 ══════════════════════ */
  {
    id: "m2-mean-median",
    lesson: "Lesson 2-1.2",
    title: {
      ru: "Среднее и медиана на 26 770 наблюдениях",
      en: "Mean and median across 26,770 observations",
    },
    goal: {
      ru: "Описать климат Нью-Йорка двумя числами и заодно определить форму распределения.",
      en: "Describe New York's climate in two numbers and read the distribution's shape while you are at it.",
    },
    dataset: {
      ru: "Daily Temperature.xlsx — лист Data, столбец C, 26 770 записей (°F)",
      en: "Daily Temperature.xlsx — Data sheet, column C, 26,770 records (°F)",
    },
    steps: [
      {
        title: { ru: "Начните набирать имя функции", en: "Start typing the function name" },
        body: {
          ru: "Наберите «=av» — Excel покажет AVERAGE, AVERAGEA, AVERAGEIF, AVERAGEIFS и подскажет, что вернёт каждая. Нам нужна первая: среднее арифметическое аргументов. Нажмите Tab.",
          en: "Type '=av' and Excel lists AVERAGE, AVERAGEA, AVERAGEIF and AVERAGEIFS, telling you what each returns. We want the first — the arithmetic mean of its arguments. Press Tab.",
        },
        formula: "=AV…",
      },
      {
        title: { ru: "Выделите столбец одним движением", en: "Grab the column in one move" },
        body: {
          ru: "Перечислять C1, C2, C3 бессмысленно, тянуть мышью по 26 тысячам строк — тоже. Кликните первую ячейку с данными и зажмите Ctrl+Shift+↓: выделится весь непрерывный диапазон.",
          en: "Listing C1, C2, C3 is pointless and dragging through 26,000 rows is worse. Click the first data cell and hold Ctrl+Shift+↓ — the entire contiguous range selects at once.",
        },
        formula: "=AVERAGE(C7:C26776)",
        shortcut: "Ctrl + Shift + ↓",
      },
      {
        title: { ru: "Прочитайте среднее", en: "Read the mean" },
        body: {
          ru: "Закройте скобку, Enter — получится 55,2 °F. Кликните по ячейке и проверьте в строке формул, что диапазон захвачен правильно: C7:C26776.",
          en: "Close the parenthesis, press Enter and you get 55.2 °F. Click the cell and check in the formula bar that the range was picked up correctly: C7:C26776.",
        },
        formula: "=AVERAGE(C7:C26776) → 55,2",
      },
      {
        title: { ru: "Повторите с медианой", en: "Repeat for the median" },
        body: {
          ru: "Та же механика: =MEDIAN, Tab, первая ячейка, Ctrl+Shift+↓, Enter. Медиана — точка, выше и ниже которой температура оказывается в 50 % случаев.",
          en: "Same mechanics: =MEDIAN, Tab, first cell, Ctrl+Shift+↓, Enter. The median is the point above and below which the temperature lands half the time.",
        },
        formula: "=MEDIAN(C7:C26776) → 55,9",
        shortcut: "Ctrl + Shift + ↓",
      },
      {
        title: { ru: "Сравните два числа", en: "Compare the two numbers" },
        body: {
          ru: "55,2 против 55,9 — почти совпадают, значит распределение практически симметрично. Если бы среднее оказалось заметно выше медианы, стоило бы искать длинный правый хвост.",
          en: "55.2 against 55.9 — near enough identical, so the distribution is practically symmetrical. Had the mean come out well above the median you would go looking for a long right tail.",
        },
      },
    ],
    takeaway: {
      ru: "Пара AVERAGE + MEDIAN — самая дешёвая диагностика формы распределения: никакого графика для неё не нужно.",
      en: "AVERAGE plus MEDIAN is the cheapest shape diagnostic there is — and it needs no chart at all.",
    },
  },
  {
    id: "m2-stdev",
    lesson: "Lesson 2-2.2",
    title: {
      ru: "Стандартное отклонение: STDEV.S или STDEV.P",
      en: "Standard deviation: STDEV.S or STDEV.P",
    },
    goal: {
      ru: "Узнать, насколько типична средняя температура 55,2 °F, и не перепутать выборку с совокупностью.",
      en: "Find out how typical that 55.2 °F average really is — without confusing a sample for a population.",
    },
    dataset: {
      ru: "Daily Temperature.xlsx — лист Mean_Median",
      en: "Daily Temperature.xlsx — Mean_Median sheet",
    },
    steps: [
      {
        title: { ru: "Найдите функцию", en: "Find the function" },
        body: {
          ru: "Наберите «=st» — выпадет восемь функций: STANDARDIZE, STDEV.P, STDEV.S, STDEVA, STDEVPA и другие. Читайте подсказку под каждой, а не выбирайте первую попавшуюся.",
          en: "Type '=st' and eight functions drop down: STANDARDIZE, STDEV.P, STDEV.S, STDEVA, STDEVPA and more. Read the hint under each rather than grabbing the first.",
        },
        formula: "=ST…",
      },
      {
        title: { ru: "Выберите .S, а не .P", en: "Pick .S, not .P" },
        body: {
          ru: "STDEV.P считает по всей совокупности (делит на N). Но 26 770 записей о погоде — это выборка: совокупность включает все дни, которые были и будут. Значит STDEV.S, которая делит на n − 1.",
          en: "STDEV.P assumes the entire population and divides by N. But 26,770 weather records are a sample — the population is every day past and future. So STDEV.S it is, dividing by n − 1.",
        },
        formula: "=STDEV.S(…)",
      },
      {
        title: { ru: "Выделите данные и получите ответ", en: "Select the data and read the answer" },
        body: {
          ru: "Tab, первая ячейка, Ctrl+Shift+↓, закрыть скобку, Enter. Получается 17,37 °F. По мере роста выборки STDEV.S и STDEV.P сходятся, но выбирать всё равно нужно осознанно.",
          en: "Tab, first cell, Ctrl+Shift+↓, close the parenthesis, Enter. Out comes 17.37 °F. STDEV.S and STDEV.P converge as the sample grows, but the choice still has to be deliberate.",
        },
        formula: "=STDEV.S(C7:C26776) → 17,37",
        shortcut: "Ctrl + Shift + ↓",
      },
      {
        title: { ru: "Переведите σ в утверждение о погоде", en: "Turn σ into a statement about weather" },
        body: {
          ru: "Если температура распределена приблизительно нормально, то 68 % дней укладываются в 55 ± 17 °F, то есть примерно от 38 до 73 °F, а 95 % дней — в 55 ± 34 °F. Вот ради чего мы извлекали корень: σ в градусах прибавляется к среднему в градусах.",
          en: "If the temperature is roughly normal, 68 % of days fall inside 55 ± 17 °F — about 38 to 73 °F — and 95 % inside 55 ± 34 °F. This is what the square root was for: σ in degrees adds to a mean in degrees.",
        },
        formula: "x̄ ± 1s = 37,8 … 72,6 °F",
      },
    ],
    takeaway: {
      ru: "Размер набора не превращает выборку в совокупность. Спросите себя: существуют ли наблюдения этого типа за пределами таблицы?",
      en: "Size never turns a sample into a population. Ask yourself whether observations of that kind exist outside your table.",
    },
  },
  {
    id: "m2-zscore",
    lesson: "Lesson 2-3.2",
    title: {
      ru: "Z-оценка и процентиль вашей оферты",
      en: "The z-score and the percentile of your job offer",
    },
    goal: {
      ru: "Перевести абсолютную сумму 65 000 $ в позицию среди всех, кто получает похожие предложения.",
      en: "Turn an absolute $65,000 into a position among everyone receiving comparable offers.",
    },
    dataset: {
      ru: "Данные salary.com: медиана 54 030 $, стандартное отклонение 8 600 $",
      en: "salary.com figures: median $54,030, standard deviation $8,600",
    },
    steps: [
      {
        title: { ru: "Посчитайте z вручную", en: "Compute z by hand first" },
        body: {
          ru: "z = (65 000 − 54 030) / 8 600 = 1,27. Оферта на 1,27 стандартного отклонения выше среднего. По эмпирическому правилу это между 84-м и 97,5-м процентилем — уже полезная прикидка.",
          en: "z = (65,000 − 54,030) / 8,600 = 1.27. The offer sits 1.27 standard deviations above the mean. By the Empirical Rule that lands between the 84th and 97.5th percentile — already a useful estimate.",
        },
        formula: "z = (x − μ) / σ = 1,27",
      },
      {
        title: { ru: "Разберитесь в семействе NORM", en: "Sort out the NORM family" },
        body: {
          ru: "Наберите «=nor» — появятся NORM.DIST, NORM.INV, NORM.S.DIST, NORM.S.INV. Точка S означает стандартное нормальное распределение (μ = 0, σ = 1): такой функции не нужны μ и σ. DIST идёт от значения к вероятности, INV — обратно.",
          en: "Type '=nor' and up come NORM.DIST, NORM.INV, NORM.S.DIST and NORM.S.INV. The .S marks the standard normal (μ = 0, σ = 1), which needs no μ or σ. DIST goes from value to probability, INV goes back.",
        },
        formula: "=NOR…",
      },
      {
        title: { ru: "Получите точный процентиль", en: "Get the exact percentile" },
        body: {
          ru: "Четыре аргумента: x, среднее, стандартное отклонение и cumulative. Последний всегда 1 — единица трактуется как TRUE, ноль как FALSE, а функция плотности в этом курсе не нужна.",
          en: "Four arguments: x, mean, standard deviation and cumulative. The last is always 1 — one reads as TRUE, zero as FALSE, and the density option is never needed in this course.",
        },
        formula: "=NORM.DIST(65000; 54030; 8600; 1) → 0,898948",
      },
      {
        title: { ru: "Проверьте себя обратной функцией", en: "Check yourself with the inverse" },
        body: {
          ru: "NORM.S.INV принимает вероятность и возвращает z. Подайте на вход полученные 0,8989 — вернётся 1,2756, то есть тот же 1,27, что вы посчитали руками. Круг замкнулся.",
          en: "NORM.S.INV takes a probability and returns a z. Feed it the 0.8989 you just got and it hands back 1.2756 — the same 1.27 you worked out by hand. The circle closes.",
        },
        formula: "=NORM.S.INV(0,898948) → 1,275581",
      },
    ],
    takeaway: {
      ru: "NORM.DIST за один шаг делает то, что вручную требовало двух: стандартизацию и поиск площади. Excel считает z за вас.",
      en: "NORM.DIST does in one step what took two by hand — standardizing and looking up the area. Excel computes the z for you.",
    },
  },
  {
    id: "m2-expected-value",
    lesson: "Lesson 2-4.2",
    title: {
      ru: "Ожидаемый спрос и его разброс через SUMPRODUCT",
      en: "Expected demand and its spread with SUMPRODUCT",
    },
    goal: {
      ru: "По журналу наблюдений понять, сколько товара держать на полке.",
      en: "Turn a log of observations into a decision about how much stock to keep on the shelf.",
    },
    dataset: {
      ru: "Expected Value.xlsx — дневной спрос 1…20 и число дней, всего 140 наблюдений",
      en: "Expected Value.xlsx — daily demand 1…20 with the number of days, 140 observations in all",
    },
    steps: [
      {
        title: { ru: "Найдите итог наблюдений", en: "Total the observations" },
        body: {
          ru: "Вероятность каждого уровня спроса — это его частота, делённая на общее число наблюдений. Сначала посчитайте знаменатель: =SUM по столбцу Occurrences даёт 140.",
          en: "Each demand level's probability is its frequency over the total number of observations, so compute the denominator first: =SUM down the Occurrences column returns 140.",
        },
        formula: "=SUM(B2:B21) → 140",
        shortcut: "Ctrl + Shift + ↓",
      },
      {
        title: { ru: "Закрепите знаменатель клавишей F4", en: "Lock the denominator with F4" },
        body: {
          ru: "Введите =B2/I1 и нажмите F4 — появятся знаки доллара, $I$1. Теперь при протягивании числитель поедет вниз (B3, B4…), а знаменатель останется 140. Без F4 формула через две строки начнёт делить на пустую ячейку.",
          en: "Enter =B2/I1 and press F4 — dollar signs appear, $I$1. Now the numerator walks down (B3, B4…) while the denominator stays on 140. Without F4 the formula starts dividing by an empty cell two rows later.",
        },
        formula: "=B2/$I$1 → 0,0214",
        shortcut: "F4",
      },
      {
        title: { ru: "Заполните столбец и проверьте себя", en: "Fill the column and check yourself" },
        body: {
          ru: "Наведите курсор на правый нижний угол ячейки и дважды кликните по «крестику» — столбец заполнится до конца данных. Затем просуммируйте вероятности: должно получиться ровно 1. Если нет — что-то потеряно.",
          en: "Hover over the cell's bottom-right corner and double-click the crosshair — the column fills to the end of the data. Then sum the probabilities: the answer must be exactly 1. If it is not, something was left out.",
        },
        formula: "=SUM(C2:C21) → 1,000",
      },
      {
        title: { ru: "E(X) одной функцией", en: "E(X) in a single function" },
        body: {
          ru: "SUMPRODUCT берёт два массива, перемножает их поэлементно и складывает результаты. Это буквально Σ x·p(x) — определение математического ожидания и определение функции совпадают.",
          en: "SUMPRODUCT takes two arrays, multiplies them element by element and adds the results. That is literally Σ x·p(x) — the definition of expected value and the definition of the function are the same expression.",
        },
        formula: "=SUMPRODUCT(A2:A21; C2:C21) → 11,49",
      },
      {
        title: { ru: "Столбец квадратов отклонений", en: "The column of squared deviations" },
        body: {
          ru: "Для стандартного отклонения нужен промежуточный столбец (x − μ)². Ссылку на ячейку со средним снова закрепите через F4, иначе при протягивании μ «уедет» вниз вместе с формулой.",
          en: "The standard deviation needs an intermediate (x − μ)² column. Lock the reference to the mean with F4 again, or μ will drift down the sheet along with the formula.",
        },
        formula: "=(A2−$I$4)^2 → 109,95",
        shortcut: "F4",
      },
      {
        title: { ru: "Стандартное отклонение", en: "The standard deviation" },
        body: {
          ru: "σ = √Σ(x − μ)²·p(x): тот же SUMPRODUCT, только теперь по столбцу квадратов и столбцу вероятностей, и всё под корнем.",
          en: "σ = √Σ(x − μ)²·p(x): the same SUMPRODUCT, this time over the squared-deviation column and the probability column, with the whole thing under a root.",
        },
        formula: "=SQRT(SUMPRODUCT(D2:D21; C2:C21)) → 6,205",
      },
      {
        title: { ru: "Превратите числа в решение о запасе", en: "Turn the numbers into a stocking decision" },
        body: {
          ru: "Ожидание 11,49 при σ = 6,205 означает, что 68 % дней спрос лежит между 5,28 и 17,69. Держать на полке 11–12 штук — значит примерно в половине дней терять продажи. Решение принимается по верхней границе, а не по среднему.",
          en: "An expectation of 11.49 with σ = 6.205 means 68 % of days see demand between 5.28 and 17.69. Stocking 11 or 12 units means losing sales on roughly half the days. The decision follows the upper bound, not the average.",
        },
        formula: "11,49 ± 6,205 → 5,28 … 17,69",
      },
    ],
    takeaway: {
      ru: "Проверка «сумма вероятностей равна 1» — единственный встроенный контроль правильности в этом расчёте. Не пропускайте её.",
      en: "The 'probabilities sum to 1' check is the only built-in correctness test in this calculation. Never skip it.",
    },
  },
  {
    id: "m2-normal-areas",
    lesson: "Lessons 2-5.4–2-5.6",
    title: {
      ru: "«Меньше», «больше» и «между» на примере SAT",
      en: "'Less than', 'greater than' and 'between' on the SAT",
    },
    goal: {
      ru: "Освоить единственный приём, покрывающий все три типа вопросов о нормальном распределении.",
      en: "Master the single trick that covers all three kinds of normal-distribution question.",
    },
    dataset: {
      ru: "SAT Example 1–3.xlsx — секция SAT со средним 500 и стандартным отклонением 100",
      en: "SAT Example 1–3.xlsx — an SAT section with a mean of 500 and a standard deviation of 100",
    },
    steps: [
      {
        title: { ru: "Сначала нарисуйте", en: "Draw it first" },
        body: {
          ru: "Совет, который лектор повторяет в каждом видео: набросайте колокол, отметьте среднее, отметьте границы из вопроса и заштрихуйте нужную площадь. Excel умеет ровно одно — возвращать площадь СЛЕВА от значения. Всё остальное вы выражаете через неё.",
          en: "The advice the lecturer repeats in every video: sketch the bell, mark the mean, mark the bounds from the question and shade the area you want. Excel does exactly one thing — return the area to the LEFT of a value. Everything else you express through that.",
        },
      },
      {
        title: { ru: "«Меньше чем» — прямой случай", en: "'Less than' — the direct case" },
        body: {
          ru: "Балл 458 при среднем 500. Ещё до расчёта ясно: результат ниже среднего, значит процентиль точно меньше 50. Такую проверку стоит делать всегда — она ловит ошибки в аргументах.",
          en: "A score of 458 against a mean of 500. Before computing anything you know the result is below average, so the percentile must be under 50. Always run that sanity check — it catches argument mix-ups.",
        },
        formula: "=NORM.DIST(458; 500; 100; 1) → 0,337243",
      },
      {
        title: { ru: "«Больше чем» — дополнение до единицы", en: "'Greater than' — the complement" },
        body: {
          ru: "Вопрос про балл выше 635. Excel даёт левую площадь, нам нужна правая, а полная площадь под кривой равна единице. Значит вычитаем: 1 − 0,9115 = 0,0885.",
          en: "The question asks about scores above 635. Excel hands you the left area, you want the right, and the total area under the curve is one. So subtract: 1 − 0.9115 = 0.0885.",
        },
        formula: "=1 − NORM.DIST(635; 500; 100; 1) → 0,088508",
      },
      {
        title: { ru: "«Между» — разность двух площадей", en: "'Between' — one area minus another" },
        body: {
          ru: "Баллы от 490 до 550: «всё слева от 550» минус «всё слева от 490» оставляет ровно полосу между ними. Порядок принципиален: из большего вычитаем меньшее, иначе получится отрицательная вероятность.",
          en: "Scores from 490 to 550: 'everything left of 550' minus 'everything left of 490' leaves exactly the strip between them. Order matters: larger minus smaller, or you get a negative probability.",
        },
        formula: "=NORM.DIST(550;500;100;1) − NORM.DIST(490;500;100;1) → 0,23129",
      },
      {
        title: { ru: "Когда пригодится NORM.S.DIST", en: "When NORM.S.DIST earns its keep" },
        body: {
          ru: "Если z уже посчитан или дан в задаче, обращайтесь к стандартной кривой напрямую: NORM.S.DIST(z; 1). Она не спрашивает μ и σ, потому что знает их — ноль и единица.",
          en: "When z is already computed or handed to you, address the standard curve directly: NORM.S.DIST(z, 1). It never asks for μ and σ because it knows them — zero and one.",
        },
        formula: "=NORM.S.DIST(0,5; 1) → 0,6915",
      },
    ],
    takeaway: {
      ru: "Три задачи — один приём: выразите заштрихованную площадь через площади слева, которые умеет считать Excel.",
      en: "Three questions, one trick: express the shaded area through the left-hand areas Excel knows how to compute.",
    },
  },
  {
    id: "m2-norm-inv",
    lesson: "Lesson 2-5.7",
    title: {
      ru: "Обратная задача: балл по заданному процентилю",
      en: "The inverse problem: a score from a required percentile",
    },
    goal: {
      ru: "Вуз принимает верхние 5 %. Какой балл нужен, чтобы попасть в 95-й процентиль?",
      en: "A school takes the top 5 %. Which score puts you at the 95th percentile?",
    },
    dataset: {
      ru: "SAT Example 4.xlsx — среднее 500, стандартное отклонение 100",
      en: "SAT Example 4.xlsx — mean 500, standard deviation 100",
    },
    steps: [
      {
        title: { ru: "Поймите, что изменилось", en: "See what flipped" },
        body: {
          ru: "Раньше вы знали значение и искали вероятность. Теперь наоборот: вероятность известна (0,95), нужно само значение. Это работа для функций с INV в имени.",
          en: "Until now you knew the value and wanted the probability. It is the other way round here: the probability is given (0.95) and the value is missing. That is a job for the INV functions.",
        },
      },
      {
        title: { ru: "Способ первый — за один шаг", en: "Route one — a single step" },
        body: {
          ru: "NORM.INV принимает вероятность, среднее и стандартное отклонение и сразу возвращает значение. Получается 664,4854, а поскольку балл SAT целый — нужно набрать 665.",
          en: "NORM.INV takes the probability, the mean and the standard deviation and returns the value outright. It gives 664.4854, and since SAT scores are integers you need 665.",
        },
        formula: "=NORM.INV(0,95; 500; 100) → 664,4854",
      },
      {
        title: { ru: "Способ второй — сначала z", en: "Route two — get the z first" },
        body: {
          ru: "NORM.S.INV просит только вероятность: ни среднее, ни стандартное отклонение ей не нужны, потому что она работает со стандартной кривой. Возвращает 1,644854 — то самое 1,645, которое в таблице приходится получать интерполяцией.",
          en: "NORM.S.INV asks for the probability alone — no mean, no standard deviation, because it works on the standard curve. It returns 1.644854, the very 1.645 that the table only yields by interpolation.",
        },
        formula: "=NORM.S.INV(0,95) → 1,644854",
      },
      {
        title: { ru: "Переведите z обратно в баллы", en: "Convert the z back into a score" },
        body: {
          ru: "Формула z-оценки, решённая относительно x: x = μ + zσ. Здесь 500 + 1,645 × 100 = 664,49 — тот же ответ. Эту перевёрнутую формулу нужно знать наизусть: она понадобится в доверительных интервалах Модулей 4–6.",
          en: "The z formula solved for x: x = μ + zσ. Here 500 + 1.645 × 100 = 664.49 — the same answer. Know this inverted form by heart: it returns in the confidence intervals of Modules 4–6.",
        },
        formula: "=500 + (H6 * 100) → 664,4854",
      },
      {
        title: { ru: "Какой способ выбирать", en: "Which route to take" },
        body: {
          ru: "Ответы совпадают, но NORM.INV даёт результат сразу, а NORM.S.INV требует второго шага. Знать нужно оба: иногда в задаче уже фигурирует z, и тогда стандартная версия оказывается короче.",
          en: "The answers agree, but NORM.INV gets there at once while NORM.S.INV needs a second step. Know both: sometimes the problem already speaks in z, and then the standard version is the shorter road.",
        },
      },
    ],
    takeaway: {
      ru: "Запомните z = 1,645 для 95-го процентиля. Вместе с 1,96 и 2,576 оно будет встречаться до конца курса.",
      en: "Commit z = 1.645 for the 95th percentile to memory. Along with 1.96 and 2.576 it recurs to the end of the course.",
    },
  },
];
