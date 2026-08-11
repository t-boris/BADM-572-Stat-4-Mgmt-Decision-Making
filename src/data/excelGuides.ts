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
 * (Lessons 1-2.2, 1-2.3, 1-2.4, 1-3.2, 1-4.2, 1-5.2).
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
];
