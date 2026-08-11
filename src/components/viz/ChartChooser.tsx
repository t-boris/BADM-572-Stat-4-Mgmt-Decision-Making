import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  PieChart,
  LineChart,
  ScatterChart,
  Table2,
  RotateCcw,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Answer = "qual" | "quant" | "two" | "time" | "counts" | "shares";

interface Recommendation {
  icon: typeof BarChart3;
  name: { ru: string; en: string };
  why: { ru: string; en: string };
  watch: { ru: string; en: string };
}

const RECS: Record<string, Recommendation> = {
  bar: {
    icon: BarChart3,
    name: { ru: "Столбчатая диаграмма", en: "Bar chart" },
    why: {
      ru: "Категории на оси X, частоты на оси Y. Легко читать абсолютные значения и сравнивать порядок.",
      en: "Categories on X, frequencies on Y. Easy to read absolute values and compare rank order.",
    },
    watch: {
      ru: "Не соединяйте вершины столбцов линией: у категорий нет естественного порядка.",
      en: "Do not join the bar tops with a line: categories have no natural ordering.",
    },
  },
  pie: {
    icon: PieChart,
    name: { ru: "Круговая диаграмма", en: "Pie chart" },
    why: {
      ru: "Показывает долю каждой категории от целого; вместе сектора дают 100 %.",
      en: "Shows each category's share of the whole; the slices sum to 100%.",
    },
    watch: {
      ru: "Плохо работает при большом числе категорий и при сравнении двух опросов. Малая выборка — подписывайте частоты, а не проценты.",
      en: "Breaks down with many categories and when comparing two surveys. With a small sample, label frequencies, not percentages.",
    },
  },
  hist: {
    icon: BarChart3,
    name: { ru: "Гистограмма", en: "Histogram" },
    why: {
      ru: "Количественные данные группируются в интервалы (bins), высота столбца — частота интервала.",
      en: "Quantitative data grouped into bins; bar height is the bin's frequency.",
    },
    watch: {
      ru: "Столбцы стоят вплотную — ось X непрерывна. Ширина интервала полностью меняет картину.",
      en: "Bars touch — the X axis is continuous. Bin width completely changes the picture.",
    },
  },
  scatter: {
    icon: ScatterChart,
    name: { ru: "Диаграмма рассеяния", en: "Scatter plot" },
    why: {
      ru: "Каждая точка — пара значений двух переменных. X — независимая, Y — зависимая.",
      en: "Each point is a pair of values. X is the independent variable, Y the dependent one.",
    },
    watch: {
      ru: "Видимая связь — ещё не причинность (вспомните «церкви и преступность»).",
      en: "A visible relationship is not causation (remember 'churches and crime').",
    },
  },
  line: {
    icon: LineChart,
    name: { ru: "Линейный график / временной ряд", en: "Line graph / time series" },
    why: {
      ru: "Ось X упорядочена (обычно время); линия подчёркивает изменение от периода к периоду.",
      en: "The X axis is ordered (usually time); the line emphasizes period-to-period change.",
    },
    watch: {
      ru: "Только для упорядоченных осей. Несколько линий на одном графике сравнивать легче, чем несколько круговых.",
      en: "Ordered axes only. Several lines on one chart compare far better than several pie charts.",
    },
  },
  table: {
    icon: Table2,
    name: { ru: "Частотная таблица", en: "Frequency table" },
    why: {
      ru: "Основа всех остальных графиков: категория (или интервал) → частота → относительная частота.",
      en: "The basis of every chart above: category (or interval) → frequency → relative frequency.",
    },
    watch: {
      ru: "Всегда смотрите, по какому знаменателю считались проценты: «% от всех водителей» и «% от отвлёкшихся» — разные числа.",
      en: "Always check the denominator: '% of all drivers' and '% of distracted drivers' are different numbers.",
    },
  },
};

/** A tiny decision aid: data type → chart type, with the trap to avoid. */
export default function ChartChooser() {
  const { pick } = useI18n();
  const [step1, setStep1] = useState<Answer | null>(null);
  const [step2, setStep2] = useState<Answer | null>(null);

  let recKey: string | null = null;
  if (step1 === "qual" && step2 === "counts") recKey = "bar";
  if (step1 === "qual" && step2 === "shares") recKey = "pie";
  if (step1 === "quant") recKey = "hist";
  if (step1 === "two" && step2 === "time") recKey = "line";
  if (step1 === "two" && step2 === "counts") recKey = "scatter";

  const reset = () => {
    setStep1(null);
    setStep2(null);
  };

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Выбор графика", "Choosing a chart")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick("Какой график здесь уместен?", "Which chart fits here?")}
          </h4>
        </div>
        {(step1 || step2) && (
          <button type="button" onClick={reset} className="btn-ghost h-9 px-3 text-xs">
            <RotateCcw size={14} /> {pick("Заново", "Restart")}
          </button>
        )}
      </div>

      <div className="mt-4 space-y-3">
        <Question label={pick("1. Сколько переменных и какого типа?", "1. How many variables, and of what type?")}>
          <Choice active={step1 === "qual"} onClick={() => { setStep1("qual"); setStep2(null); }}>
            {pick("Одна качественная (категории)", "One qualitative (categories)")}
          </Choice>
          <Choice active={step1 === "quant"} onClick={() => { setStep1("quant"); setStep2(null); }}>
            {pick("Одна количественная (числа)", "One quantitative (numbers)")}
          </Choice>
          <Choice active={step1 === "two"} onClick={() => { setStep1("two"); setStep2(null); }}>
            {pick("Две переменные в паре", "Two paired variables")}
          </Choice>
        </Question>

        <AnimatePresence initial={false}>
          {step1 === "qual" && (
            <Reveal>
              <Question label={pick("2. Что важнее сообщить?", "2. What matters more?")}>
                <Choice active={step2 === "counts"} onClick={() => setStep2("counts")}>
                  {pick("Точные количества и ранжирование", "Exact counts and ranking")}
                </Choice>
                <Choice active={step2 === "shares"} onClick={() => setStep2("shares")}>
                  {pick("Доли от целого", "Shares of the whole")}
                </Choice>
              </Question>
            </Reveal>
          )}
          {step1 === "two" && (
            <Reveal>
              <Question label={pick("2. Что стоит по оси X?", "2. What is on the X axis?")}>
                <Choice active={step2 === "time"} onClick={() => setStep2("time")}>
                  {pick("Время (годы, месяцы)", "Time (years, months)")}
                </Choice>
                <Choice active={step2 === "counts"} onClick={() => setStep2("counts")}>
                  {pick("Другая числовая переменная", "Another numeric variable")}
                </Choice>
              </Question>
            </Reveal>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {recKey && (
            <Reveal>
              <Result recKey={recKey} />
            </Reveal>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3 text-[11px] text-ink-dim">
        {pick(
          "Под любым из этих графиков всегда лежит частотная таблица — начинайте с неё.",
          "A frequency table sits underneath every one of these charts — start there.",
        )}
      </div>
    </div>
  );
}

function Result({ recKey }: { recKey: string }) {
  const { pick } = useI18n();
  const rec = RECS[recKey];
  const Icon = rec.icon;
  return (
    <div className="rounded-xl border border-accent/40 bg-accent-soft/20 p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-white">
          <Icon size={18} />
        </span>
        <div className="font-semibold">{pick(rec.name.ru, rec.name.en)}</div>
      </div>
      <p className="mt-2 text-sm">{pick(rec.why.ru, rec.why.en)}</p>
      <p className="mt-1.5 text-xs text-warning">
        <b>{pick("Осторожно: ", "Watch out: ")}</b>
        {pick(rec.watch.ru, rec.watch.en)}
      </p>
    </div>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-medium text-ink-dim">{label}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-transparent bg-accent text-white"
          : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="pt-1">{children}</div>
    </motion.div>
  );
}
