import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { WAITING_TIMES, PSYCH_TEST_SCORES } from "@/data/datasets";
import {
  makeBins,
  max as vMax,
  mean as vMean,
  min as vMin,
  riceBins,
  sturgesBins,
  toPercent,
} from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type DatasetKey = "waiting" | "psych";

const DATASETS: Record<
  DatasetKey,
  {
    values: number[];
    label: { ru: string; en: string };
    unit: { ru: string; en: string };
    note: { ru: string; en: string };
  }
> = {
  waiting: {
    values: WAITING_TIMES,
    label: {
      ru: "Время ожидания в колл-центре (n = 500)",
      en: "Call-centre waiting time (n = 500)",
    },
    unit: { ru: "секунды", en: "seconds" },
    note: {
      ru: "Реконструировано так, чтобы точно воспроизводить частотную таблицу с 30-секундными интервалами из Lesson 1-2.2 (min 0, max 300).",
      en: "Reconstructed to reproduce exactly the 30-second frequency table from Lesson 1-2.2 (min 0, max 300).",
    },
  },
  psych: {
    values: PSYCH_TEST_SCORES,
    label: {
      ru: "Баллы за психологический тест (n = 642)",
      en: "Psychology test scores (n = 642)",
    },
    unit: { ru: "баллы", en: "points" },
    note: {
      ru: "Реконструировано по сгруппированному распределению из главы «Histograms» OnlineStatBook (642 студента, 197 заданий).",
      en: "Reconstructed from the grouped distribution in OnlineStatBook's 'Histograms' chapter (642 students, 197 items).",
    },
  },
};

/**
 * Lesson 1-3: the whole point of a histogram is the bin width. Slide it and
 * watch the same data look "bunched up", informative, or "choppy".
 */
export default function HistogramExplorer() {
  const { pick, t } = useI18n();
  const [dataset, setDataset] = useState<DatasetKey>("waiting");
  const [binCount, setBinCount] = useState(10);
  const [relative, setRelative] = useState(false);

  const values = DATASETS[dataset].values;
  const bins = useMemo(() => makeBins(values, binCount), [values, binCount]);

  const n = values.length;
  const lo = vMin(values);
  const hi = vMax(values);
  const avg = vMean(values);
  const width = (hi - lo) / binCount;
  const sturges = sturgesBins(n);
  const rice = riceBins(n);

  const verdict =
    binCount <= Math.max(3, Math.round(sturges * 0.6))
      ? pick(
          "Слишком грубо: интервалы широкие, детали формы распределения потеряны.",
          "Too coarse: wide intervals hide the shape of the distribution.",
        )
      : binCount >= rice * 2
        ? pick(
            "Слишком дробно: график «рвётся» на шум, обобщения не получается.",
            "Too fine: the chart breaks up into noise and stops summarizing.",
          )
        : pick(
            "Разумный диапазон: между правилом Стёрджеса и правилом Райса.",
            "A sensible range: between Sturges' rule and the Rice rule.",
          );

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lesson 1-3 · гистограммы", "Lesson 1-3 · histograms")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick("Ширина интервала решает всё", "The bin width decides everything")}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(DATASETS) as DatasetKey[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setDataset(k)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                dataset === k
                  ? "border-transparent bg-accent text-white"
                  : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
              )}
            >
              {pick(DATASETS[k].label.ru, DATASETS[k].label.en)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="flex min-w-[240px] flex-1 items-center gap-3 text-xs">
          <span className="whitespace-nowrap text-ink-dim">{t("labBins")}</span>
          <input
            type="range"
            min={2}
            max={40}
            value={binCount}
            onChange={(e) => setBinCount(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
          />
          <span className="w-8 text-right font-mono font-semibold">{binCount}</span>
        </label>
        <button
          type="button"
          onClick={() => setRelative((r) => !r)}
          className="btn-secondary h-9 px-3 text-xs"
        >
          {relative ? t("relativeFrequency") : t("frequency")}
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
        <button
          type="button"
          onClick={() => setBinCount(sturges)}
          className="chip hover:text-ink"
        >
          {pick("Правило Стёрджеса", "Sturges' rule")}: {sturges}
        </button>
        <button
          type="button"
          onClick={() => setBinCount(rice)}
          className="chip hover:text-ink"
        >
          {pick("Правило Райса", "Rice rule")}: {rice}
        </button>
        {dataset === "waiting" && (
          <button
            type="button"
            onClick={() => setBinCount(10)}
            className="chip hover:text-ink"
          >
            {pick("Как в лекции (30 сек)", "As in the lecture (30 s)")}: 10
          </button>
        )}
      </div>

      <div className="mt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bins} barCategoryGap={1} margin={{ top: 8, right: 8, left: 0, bottom: 34 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgb(var(--border))"
            />
            <XAxis
              dataKey="label"
              angle={-30}
              textAnchor="end"
              interval={binCount > 20 ? 1 : 0}
              height={48}
              tick={{ fontSize: 9, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
              tickFormatter={(v: number) =>
                relative ? `${Math.round(v * 100)}%` : String(v)
              }
            />
            <Tooltip
              cursor={{ fill: "rgb(var(--muted) / 0.5)" }}
              contentStyle={{
                background: "rgb(var(--surface))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 12,
                fontSize: 12,
                color: "rgb(var(--ink))",
              }}
              formatter={(v: number) =>
                relative ? toPercent(v, 2) : v.toLocaleString()
              }
            />
            <ReferenceLine
              x={bins.find((b) => avg > b.lower && avg <= b.upper)?.label}
              stroke="rgb(var(--warning))"
              strokeDasharray="4 3"
              label={{
                value: pick("среднее", "mean"),
                position: "top",
                fontSize: 10,
                fill: "rgb(var(--warning))",
              }}
            />
            <Bar
              dataKey={relative ? "relative" : "frequency"}
              fill="rgb(var(--m2))"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-5">
        <Metric label={t("labCount")} value={n.toLocaleString()} />
        <Metric label={t("labMin")} value={lo.toFixed(0)} />
        <Metric label={t("labMax")} value={hi.toFixed(0)} />
        <Metric label={t("labMean")} value={avg.toFixed(1)} />
        <Metric label={t("labBinWidth")} value={width.toFixed(1)} />
      </div>

      <motion.p
        key={verdict}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-3 text-xs text-ink-dim"
      >
        {verdict}{" "}
        {pick(
          "Единица измерения по оси X — ",
          "The X axis is measured in ",
        )}
        {pick(DATASETS[dataset].unit.ru, DATASETS[dataset].unit.en)}.
      </motion.p>
      <p className="mt-1.5 text-[11px] text-ink-dim">
        {pick(DATASETS[dataset].note.ru, DATASETS[dataset].note.en)}
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-ink-dim">{label}</div>
      <div className="font-mono text-sm font-semibold">{value}</div>
    </div>
  );
}
