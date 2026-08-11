import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownWideNarrow, ArrowUpDown, Percent, Hash } from "lucide-react";
import { TRUCK_SALES, TRUCK_TOTAL } from "@/data/datasets";
import { toPercent } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

/**
 * Lesson 1-2: the categorical frequency table. Same numbers the professor
 * builds in Excel with COUNTIF + a locked (F4) denominator — here the table and
 * the bar chart update together so the link between them is visible.
 */
export default function FrequencyTableBuilder() {
  const { pick, t } = useI18n();
  const [sorted, setSorted] = useState(true);
  const [showRelative, setShowRelative] = useState(false);

  const rows = useMemo(() => {
    const base = TRUCK_SALES.map((r) => ({
      ...r,
      relative: r.count / TRUCK_TOTAL,
    }));
    return sorted
      ? [...base].sort((a, b) => b.count - a.count)
      : [...base].sort((a, b) => a.model.localeCompare(b.model));
  }, [sorted]);

  const top3 = rows
    .slice()
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .reduce((acc, r) => acc + r.relative, 0);

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lesson 1-2 · качественные данные", "Lesson 1-2 · qualitative data")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick(
              "Частотная таблица: 233 601 проданный пикап → 11 строк",
              "Frequency table: 233,601 pickup trucks sold → 11 rows",
            )}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSorted((s) => !s)}
            className="btn-secondary h-9 px-3 text-xs"
          >
            {sorted ? <ArrowDownWideNarrow size={14} /> : <ArrowUpDown size={14} />}
            {sorted
              ? pick("По убыванию", "Largest → smallest")
              : pick("По алфавиту", "Alphabetical")}
          </button>
          <button
            type="button"
            onClick={() => setShowRelative((s) => !s)}
            className="btn-secondary h-9 px-3 text-xs"
          >
            {showRelative ? <Percent size={14} /> : <Hash size={14} />}
            {showRelative
              ? pick("Отн. частота", "Relative frequency")
              : pick("Количество", "Count")}
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 60 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgb(var(--border))"
              />
              <XAxis
                dataKey="model"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={70}
                tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
                stroke="rgb(var(--border))"
              />
              <YAxis
                tick={{ fontSize: 11, fill: "rgb(var(--ink-dim))" }}
                stroke="rgb(var(--border))"
                tickFormatter={(v: number) =>
                  showRelative ? `${Math.round(v * 100)}%` : v.toLocaleString()
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
                  showRelative ? toPercent(v, 2) : v.toLocaleString()
                }
              />
              <Bar
                dataKey={showRelative ? "relative" : "count"}
                radius={[6, 6, 0, 0]}
                isAnimationActive
              >
                {rows.map((r, i) => (
                  <Cell
                    key={r.model}
                    fill={`rgb(var(--m1) / ${1 - Math.min(i, 8) * 0.08})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-xs">
            <thead className="bg-muted/60 text-left uppercase tracking-wider text-ink-dim">
              <tr>
                <th className="px-2.5 py-2 font-medium">{t("category")}</th>
                <th className="px-2.5 py-2 text-right font-medium">{t("frequency")}</th>
                <th className="px-2.5 py-2 text-right font-medium">
                  {t("relativeFrequency")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.model} className="border-t border-border">
                  <td className="px-2.5 py-1.5">{r.model}</td>
                  <td className="px-2.5 py-1.5 text-right font-mono">
                    {r.count.toLocaleString()}
                  </td>
                  <td
                    className={cn(
                      "px-2.5 py-1.5 text-right font-mono",
                      showRelative && "font-semibold text-accent",
                    )}
                  >
                    {toPercent(r.relative, 1)}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-border bg-muted/40 font-semibold">
                <td className="px-2.5 py-2">{t("total")}</td>
                <td className="px-2.5 py-2 text-right font-mono">
                  {TRUCK_TOTAL.toLocaleString()}
                </td>
                <td className="px-2.5 py-2 text-right font-mono">100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink-dim">
        {pick(
          `Отн. частота = число наблюдений ÷ общее число наблюдений. Для Ford F-Series: 71 332 ÷ 233 601 = 0,3054, то есть 30,5 % рынка. Три лидера вместе занимают ${toPercent(top3, 1)} — вывод, который невозможно увидеть в 233 601 исходной строке.`,
          `Relative frequency = observations in the category ÷ total observations. For the Ford F-Series: 71,332 ÷ 233,601 = 0.3054, i.e. 30.5% of the market. The top three together hold ${toPercent(top3, 1)} — a conclusion invisible in the 233,601 raw rows.`,
        )}
      </p>
      <p className="mt-1.5 text-[11px] text-ink-dim">
        {pick("Источник данных", "Data source")}: Cain, T. (2015), goodcarbadcar.net —
        {pick(" продажи пикапов в США, август 2015.", " US pickup truck sales, August 2015.")}
      </p>
    </div>
  );
}
