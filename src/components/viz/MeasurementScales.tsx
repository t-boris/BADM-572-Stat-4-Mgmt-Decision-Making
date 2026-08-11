import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

interface Scale {
  id: string;
  name: { ru: string; en: string };
  tone: string;
  /** ordered, equal intervals, true zero */
  props: [boolean, boolean, boolean];
  example: { ru: string; en: string };
  allowed: { ru: string; en: string };
}

const SCALES: Scale[] = [
  {
    id: "nominal",
    name: { ru: "Номинальная", en: "Nominal" },
    tone: "m7",
    props: [false, false, false],
    example: {
      ru: "Пол, цвет волос, штат проживания, почтовый индекс, номер игрока",
      en: "Gender, hair colour, state of residence, zip code, jersey number",
    },
    allowed: {
      ru: "Мода, частоты, доли. Среднее бессмысленно.",
      en: "Mode, counts, proportions. A mean is meaningless.",
    },
  },
  {
    id: "ordinal",
    name: { ru: "Порядковая", en: "Ordinal" },
    tone: "m5",
    props: [true, false, false],
    example: {
      ru: "Уровень удовлетворённости (отлично → неудовлетворительно), высший диплом, места в рейтинге",
      en: "Satisfaction level (excellent → unsatisfactory), highest degree, rank positions",
    },
    allowed: {
      ru: "Мода, медиана, перцентили. Среднее — спорно: расстояния между категориями не равны.",
      en: "Mode, median, percentiles. A mean is debatable: gaps between categories are not equal.",
    },
  },
  {
    id: "interval",
    name: { ru: "Интервальная", en: "Interval" },
    tone: "m2",
    props: [true, true, false],
    example: {
      ru: "Температура в °C и °F, календарные годы, IQ",
      en: "Temperature in °C and °F, calendar years, IQ",
    },
    allowed: {
      ru: "Среднее, стандартное отклонение, разности. Отношения — нет: 20 °C не «вдвое теплее» 10 °C.",
      en: "Mean, standard deviation, differences. Ratios — no: 20 °C is not 'twice as warm' as 10 °C.",
    },
  },
  {
    id: "ratio",
    name: { ru: "Шкала отношений", en: "Ratio" },
    tone: "m3",
    props: [true, true, true],
    example: {
      ru: "Зарплата, время ожидания в секундах, объём продаж, число проданных грузовиков",
      en: "Salary, waiting time in seconds, sales volume, number of trucks sold",
    },
    allowed: {
      ru: "Всё вышеперечисленное плюс отношения: 300 секунд действительно вдвое дольше 150.",
      en: "Everything above, plus ratios: 300 seconds really is twice as long as 150.",
    },
  },
];

const PROP_LABELS = [
  { ru: "Есть порядок", en: "Ordered" },
  { ru: "Равные интервалы", en: "Equal intervals" },
  { ru: "Истинный ноль", en: "True zero" },
];

/**
 * The four levels of measurement (OnlineStatBook, ch. 1) as a ladder: each step
 * up adds one property and unlocks one more class of statistics.
 */
export default function MeasurementScales() {
  const { pick } = useI18n();
  const [active, setActive] = useState<string>("nominal");
  const current = SCALES.find((s) => s.id === active)!;

  return (
    <div className="card p-5">
      <div className="text-[11px] uppercase tracking-widest text-ink-dim">
        {pick("Шкалы измерения", "Levels of measurement")}
      </div>
      <h4 className="mt-1 font-display text-base font-semibold">
        {pick(
          "Каждая ступень добавляет одно свойство",
          "Each step up adds one property",
        )}
      </h4>

      <div className="mt-4 grid gap-2 sm:grid-cols-4">
        {SCALES.map((s, i) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "relative overflow-hidden rounded-xl border p-3 text-left transition-all",
                isActive
                  ? "border-transparent shadow-glow"
                  : "border-border bg-surface hover:bg-muted",
              )}
              style={
                isActive
                  ? { background: `rgb(var(--${s.tone}) / 0.14)` }
                  : undefined
              }
            >
              <div
                className="absolute inset-x-0 bottom-0 h-1"
                style={{ background: `rgb(var(--${s.tone}))` }}
              />
              <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-dim">
                {pick("Уровень", "Level")} {i + 1}
              </div>
              <div className="mt-0.5 text-sm font-semibold">
                {pick(s.name.ru, s.name.en)}
              </div>
              <div className="mt-2 flex gap-1">
                {s.props.map((p, pi) => (
                  <span
                    key={pi}
                    title={pick(PROP_LABELS[pi].ru, PROP_LABELS[pi].en)}
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-md text-[10px]",
                      p ? "bg-success/20 text-success" : "bg-muted text-ink-dim",
                    )}
                  >
                    {p ? <Check size={11} /> : <Minus size={11} />}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-4 space-y-2 rounded-xl border border-border bg-muted/40 p-4 text-sm"
      >
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-dim">
          {PROP_LABELS.map((p, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              {current.props[i] ? (
                <Check size={12} className="text-success" />
              ) : (
                <Minus size={12} />
              )}
              {pick(p.ru, p.en)}
            </span>
          ))}
        </div>
        <p>
          <b>{pick("Примеры: ", "Examples: ")}</b>
          {pick(current.example.ru, current.example.en)}
        </p>
        <p>
          <b>{pick("Что можно считать: ", "What you may compute: ")}</b>
          {pick(current.allowed.ru, current.allowed.en)}
        </p>
      </motion.div>

      <p className="mt-3 text-[11px] text-ink-dim">
        {pick(
          "Как это ложится на терминологию лекции: номинальная и порядковая — качественные (категориальные) переменные; интервальная и шкала отношений — количественные.",
          "Mapping onto the lecture's vocabulary: nominal and ordinal are qualitative (categorical) variables; interval and ratio are quantitative.",
        )}
      </p>
    </div>
  );
}
