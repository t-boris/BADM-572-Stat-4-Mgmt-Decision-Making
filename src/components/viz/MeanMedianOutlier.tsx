import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { UserPlus, UserMinus } from "lucide-react";
import { CLASSMATE_SALARIES, BASKETBALL_SALARY } from "@/data/datasets";
import { mean, median, sampleStdDev } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";

const usd = (v: number) =>
  `$${Math.round(v).toLocaleString("en-US")}`;

/**
 * Lesson 2-1.1 — the classmate drafted by a basketball team. Add him to the
 * group and watch the mean leave the building while the median barely moves.
 */
export default function MeanMedianOutlier() {
  const { pick } = useI18n();
  const [withOutlier, setWithOutlier] = useState(false);

  const values = useMemo(
    () =>
      withOutlier
        ? [...CLASSMATE_SALARIES, BASKETBALL_SALARY]
        : CLASSMATE_SALARIES,
    [withOutlier],
  );

  const m = mean(values);
  const md = median(values);
  const sd = sampleStdDev(values);

  // The outlier is 100× the others, so plot the ten on their own scale and
  // let the badge carry the eleventh — otherwise every bar collapses to zero.
  const chartData = CLASSMATE_SALARIES.map((salary, i) => ({
    name: `#${i + 1}`,
    salary,
  }));

  const baseline = {
    mean: mean(CLASSMATE_SALARIES),
    median: median(CLASSMATE_SALARIES),
    sd: sampleStdDev(CLASSMATE_SALARIES),
  };

  const stats = [
    {
      label: pick("Среднее", "Mean"),
      value: m,
      base: baseline.mean,
      tone: "text-danger",
      note: pick("убегает в хвост", "runs into the tail"),
    },
    {
      label: pick("Медиана", "Median"),
      value: md,
      base: baseline.median,
      tone: "text-success",
      note: pick("остаётся на месте", "stays put"),
    },
    {
      label: pick("Ст. отклонение", "Std deviation"),
      value: sd,
      base: baseline.sd,
      tone: "text-warning",
      note: pick("взрывается", "explodes"),
    },
  ];

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lesson 2-1.1 · выбросы", "Lesson 2-1.1 · outliers")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick(
              "Один одноклассник против всей группы",
              "One classmate against the whole group",
            )}
          </h4>
          <p className="mt-1 text-xs text-ink-dim">
            {pick(
              "Десять однокурсников, один колледж, одна степень, три года после выпуска. Затем входит одиннадцатый — его задрафтовала профессиональная баскетбольная команда.",
              "Ten classmates, one college, one degree, three years out. Then an eleventh walks in — he was drafted by a pro basketball team.",
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setWithOutlier((v) => !v)}
          className={withOutlier ? "btn-secondary h-9 px-3 text-xs" : "btn-primary h-9 px-3 text-xs"}
        >
          {withOutlier ? <UserMinus size={14} /> : <UserPlus size={14} />}
          {withOutlier
            ? pick("Убрать баскетболиста", "Remove the basketball player")
            : pick("Добавить баскетболиста ($8 млн)", "Add the basketball player ($8M)")}
        </button>
      </div>

      <div className="mt-4 h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
            />
            <YAxis
              domain={[50000, 85000]}
              tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
              tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--elevated))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(v: number) => [usd(v), pick("Зарплата", "Salary")]}
            />
            <Bar dataKey="salary" radius={[4, 4, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill="rgb(var(--m2))" fillOpacity={0.75} />
              ))}
            </Bar>
            <ReferenceLine
              y={baseline.median}
              stroke="rgb(var(--success))"
              strokeDasharray="4 3"
              label={{
                value: pick("медиана", "median"),
                position: "insideTopLeft",
                fontSize: 10,
                fill: "rgb(var(--success))",
              }}
            />
            {!withOutlier && (
              <ReferenceLine
                y={baseline.mean}
                stroke="rgb(var(--danger))"
                strokeDasharray="4 3"
                label={{
                  value: pick("среднее", "mean"),
                  position: "insideBottomLeft",
                  fontSize: 10,
                  fill: "rgb(var(--danger))",
                }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {withOutlier && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-xl border border-danger/40 bg-danger/5 px-3 py-2 text-xs"
        >
          <span className="font-semibold text-danger">#11 — $8,000,000.</span>{" "}
          {pick(
            "Он не помещается на график: его столбец был бы в сто раз выше остальных. Среднее теперь лежит далеко за пределами этой оси.",
            "He does not fit on the chart — his bar would be a hundred times the others. The mean now sits far off the top of this axis.",
          )}
        </motion.div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {stats.map((s) => {
          const changed = withOutlier && Math.abs(s.value - s.base) > 1;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-muted/40 p-3">
              <div className="text-[11px] uppercase tracking-wider text-ink-dim">
                {s.label}
              </div>
              <motion.div
                key={`${s.label}-${s.value}`}
                initial={{ opacity: 0.4, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-0.5 font-mono text-lg font-semibold ${changed ? s.tone : "text-ink"}`}
              >
                {usd(s.value)}
              </motion.div>
              {changed && (
                <div className="mt-0.5 text-[11px] text-ink-dim">
                  {pick("было", "was")} {usd(s.base)} · {s.note}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-dim">
        {withOutlier
          ? pick(
              "Ни один из одиннадцати человек не зарабатывает $786 364. Среднее превратилось в число, которое не описывает никого — а стандартное отклонение выросло в 346 раз и честно об этом сообщает.",
              "Not one of the eleven earns $786,364. The mean has become a number that describes nobody — and the standard deviation, up 346-fold, says so plainly.",
            )
          : pick(
              "Пока группа однородна, среднее и медиана почти совпадают, а стандартное отклонение около $6 900 подтверждает: среднее здесь честная сводка.",
              "While the group is homogeneous the mean and median nearly coincide, and a standard deviation near $6,900 confirms it: here the mean is an honest summary.",
            )}
      </p>
    </div>
  );
}
