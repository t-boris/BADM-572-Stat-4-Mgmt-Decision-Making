import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ER_A,
  ER_B,
  HISTOGRAM_A,
  HISTOGRAM_B,
} from "@/data/datasets";
import { mean, range, sampleStdDev } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Pair = "er" | "histograms";

/** Expand an outcome/frequency table back into raw observations. */
function expand(rows: { value: number; frequency: number }[]): number[] {
  return rows.flatMap((r) => Array.from({ length: r.frequency }, () => r.value));
}

export default function DispersionCompare() {
  const { pick } = useI18n();
  const [pair, setPair] = useState<Pair>("er");

  const config = useMemo(() => {
    if (pair === "er") {
      return {
        unit: pick("минуты", "minutes"),
        left: {
          title: "ER A",
          rows: ER_A.map((r) => ({ value: r.minutes, frequency: r.frequency })),
        },
        right: {
          title: "ER B",
          rows: ER_B.map((r) => ({ value: r.minutes, frequency: r.frequency })),
        },
        question: pick(
          "Среднее время обработки пациента в обоих приёмных покоях — 5 минут. В каком из них пациент действительно проведёт время, близкое к среднему?",
          "Both emergency rooms process a patient in 5 minutes on average. In which of them will a patient actually experience something close to that average?",
        ),
        answer: pick(
          "В ER A. Размах 2 минуты против 6: там «пять минут» — это почти обещание, здесь — лотерея от двух до восьми. Среднее одинаковое, опыт пациента принципиально разный.",
          "ER A. A range of 2 minutes against 6: there 'five minutes' is nearly a promise, here it is a lottery between two and eight. Same average, fundamentally different patient experience.",
        ),
      };
    }
    return {
      unit: pick("значение", "value"),
      left: { title: pick("Выборка A", "Sample A"), rows: HISTOGRAM_A },
      right: { title: pick("Выборка B", "Sample B"), rows: HISTOGRAM_B },
      question: pick(
        "У какой выборки среднее лучше представляет случайно выбранное наблюдение?",
        "Which sample's mean better represents a randomly drawn observation?",
      ),
      answer: pick(
        "У A. Обе имеют центр около 5 и диапазон 0–10, но A плотнее сгруппирована вокруг центра — значит, меньшее стандартное отклонение, значит, среднее ближе к типичному наблюдению.",
        "Sample A. Both centre near 5 and span 0–10, but A clusters more tightly — a smaller standard deviation, and so a mean that sits closer to the typical observation.",
      ),
    };
  }, [pair, pick]);

  const sides = [config.left, config.right].map((side) => {
    const values = expand(side.rows);
    return {
      ...side,
      values,
      mean: mean(values),
      sd: sampleStdDev(values),
      range: range(values),
      n: values.length,
    };
  });

  const maxFreq = Math.max(
    ...sides.flatMap((s) => s.rows.map((r) => r.frequency)),
  );
  const domain: [number, number] = [
    Math.min(...sides.flatMap((s) => s.rows.map((r) => r.value))) - 0.5,
    Math.max(...sides.flatMap((s) => s.rows.map((r) => r.value))) + 0.5,
  ];

  const tighter = sides[0].sd <= sides[1].sd ? 0 : 1;

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lesson 2-2.1 · разброс", "Lesson 2-2.1 · dispersion")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick(
              "Одинаковое среднее, разный опыт",
              "Same average, different experience",
            )}
          </h4>
        </div>
        <div className="flex gap-1.5">
          {(
            [
              ["er", pick("Два приёмных покоя", "Two emergency rooms")],
              ["histograms", pick("Две выборки", "Two samples")],
            ] as [Pair, string][]
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setPair(k)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                pair === k
                  ? "border-transparent bg-accent text-white"
                  : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-2 text-xs text-ink-dim">{config.question}</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {sides.map((side, i) => (
          <div
            key={side.title}
            className={cn(
              "rounded-xl border p-3",
              i === tighter
                ? "border-success/40 bg-success/5"
                : "border-border bg-muted/30",
            )}
          >
            <div className="flex items-baseline justify-between">
              <div className="font-semibold">{side.title}</div>
              <div className="text-[11px] text-ink-dim">n = {side.n}</div>
            </div>

            <div className="mt-2 h-[170px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={side.rows}
                  margin={{ top: 24, right: 6, left: 0, bottom: 2 }}
                >
                  <XAxis
                    dataKey="value"
                    type="number"
                    domain={domain}
                    tickCount={9}
                    tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
                    stroke="rgb(var(--border))"
                  />
                  <YAxis
                    domain={[0, maxFreq]}
                    tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
                    stroke="rgb(var(--border))"
                    width={26}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgb(var(--elevated))",
                      border: "1px solid rgb(var(--border))",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="frequency"
                    fill={i === tighter ? "rgb(var(--success))" : "rgb(var(--m2))"}
                    fillOpacity={0.7}
                    radius={[3, 3, 0, 0]}
                    barSize={18}
                  />
                  <ReferenceLine
                    x={side.mean}
                    stroke="rgb(var(--danger))"
                    strokeWidth={2}
                    label={{
                      value: pick("среднее", "mean"),
                      position: "top",
                      fontSize: 10,
                      fill: "rgb(var(--danger))",
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ink-dim">
                  {pick("Среднее", "Mean")}
                </div>
                <div className="font-mono text-sm font-semibold">
                  {side.mean.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ink-dim">
                  {pick("Размах", "Range")}
                </div>
                <div className="font-mono text-sm font-semibold">{side.range}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ink-dim">
                  {pick("Ст. откл.", "Std dev")}
                </div>
                <div className="font-mono text-sm font-semibold">
                  {side.sd.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-success/40 bg-success/5 p-3 text-sm">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-success">
          {pick("Ответ", "Answer")}
        </div>
        <div className="mt-1">{config.answer}</div>
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-ink-dim">
        {pick(
          "Размах опирается ровно на два наблюдения — оба экстремальные, — поэтому на больших наборах он ненадёжен. Стандартное отклонение учитывает каждое наблюдение и потому идёт в отчёт.",
          "The range rests on exactly two observations, both extreme, which is why it fails on large data sets. The standard deviation counts every observation, which is why it goes in the report.",
        )}
      </p>
    </div>
  );
}
