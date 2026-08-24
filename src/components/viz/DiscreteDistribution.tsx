import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SIBLINGS, BANK_QUEUE, STORE_DEMAND } from "@/data/datasets";
import {
  discreteDistribution,
  discreteStdDev,
  expectedValue,
} from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Key = "siblings" | "queue" | "demand";
type View = "pmf" | "cdf";

const SETS: Record<
  Key,
  {
    rows: { value: number; frequency: number }[];
    label: { ru: string; en: string };
    variable: { ru: string; en: string };
    unit: { ru: string; en: string };
    note: { ru: string; en: string };
  }
> = {
  siblings: {
    rows: SIBLINGS,
    label: { ru: "Братья и сёстры (n = 20)", en: "Siblings (n = 20)" },
    variable: { ru: "Число братьев и сестёр", en: "Number of siblings" },
    unit: { ru: "чел.", en: "siblings" },
    note: {
      ru: "Опрошены 20 человек. E(X) = 1,8 — значение, недостижимое ни для кого лично: математическое ожидание есть долгосрочное среднее, а не предсказание одного исхода.",
      en: "Twenty people surveyed. E(X) = 1.8 — a value nobody can personally have: an expected value is a long-run average, not a prediction of one outcome.",
    },
  },
  queue: {
    rows: BANK_QUEUE,
    label: { ru: "Очередь в банке (n = 32)", en: "Bank queue (n = 32)" },
    variable: { ru: "Клиентов в очереди", en: "Customers waiting in line" },
    unit: { ru: "чел.", en: "customers" },
    note: {
      ru: "P(X ≥ 4) = 0,094 + 0,063 + 0,031 = 0,188. Если сервисный стандарт — «не более трёх в очереди», он нарушается почти каждый пятый раз: пора ставить второго операциониста в пиковые часы.",
      en: "P(X ≥ 4) = 0.094 + 0.063 + 0.031 = 0.188. If the service standard is 'no more than three waiting', it breaks nearly one visit in five — time for a second teller at peak hours.",
    },
  },
  demand: {
    rows: STORE_DEMAND,
    label: { ru: "Спрос в магазине (n = 140)", en: "Store demand (n = 140)" },
    variable: { ru: "Дневной спрос", en: "Daily demand" },
    unit: { ru: "шт.", en: "units" },
    note: {
      ru: "E(X) = 11,49 при σ = 6,205: 68 % дней спрос лежит между 5,28 и 17,69. Держать на полке 11–12 штук — значит примерно в половине дней терять продажи. Решение о запасе принимается по верхней границе, а не по среднему.",
      en: "E(X) = 11.49 with σ = 6.205: on 68 % of days demand falls between 5.28 and 17.69. Stocking 11 or 12 units means losing sales on roughly half of them. A stocking decision follows the upper bound, not the average.",
    },
  },
};

/**
 * Lesson 2-4 — a discrete probability distribution is the relative-frequency
 * table from Module 1, reread as probabilities. Toggle to the CDF to see the
 * step function, and watch E(X) and σ fall out of the same two columns.
 */
export default function DiscreteDistribution() {
  const { pick, L } = useI18n();
  const [key, setKey] = useState<Key>("siblings");
  const [view, setView] = useState<View>("pmf");

  const set = SETS[key];
  const dist = useMemo(() => discreteDistribution(set.rows), [set.rows]);
  const mu = expectedValue(dist);
  const sigma = discreteStdDev(dist);
  const total = set.rows.reduce((a, r) => a + r.frequency, 0);

  const wide = dist.length > 10;

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lesson 2-4 · дискретные распределения", "Lesson 2-4 · discrete distributions")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick(
              "Таблица частот, прочитанная как вероятности",
              "A frequency table reread as probabilities",
            )}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(SETS) as Key[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKey(k)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                key === k
                  ? "border-transparent bg-accent text-white"
                  : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
              )}
            >
              {L(SETS[k].label)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {(
          [
            ["pmf", pick("P(X = x) — вероятности", "P(X = x) — probabilities")],
            ["cdf", pick("P(X ≤ x) — накопленные", "P(X ≤ x) — cumulative")],
          ] as [View, string][]
        ).map(([v, label]) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              view === v
                ? "border-transparent bg-m2 text-white"
                : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
            )}
            style={view === v ? { background: "rgb(var(--m2))" } : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {view === "pmf" ? (
            <BarChart data={dist} margin={{ top: 22, right: 8, left: 0, bottom: 18 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--border))" />
              <XAxis
                dataKey="value"
                tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
                stroke="rgb(var(--border))"
                label={{
                  value: L(set.variable),
                  position: "insideBottom",
                  offset: -12,
                  fontSize: 10,
                  fill: "rgb(var(--ink-dim))",
                }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
                stroke="rgb(var(--border))"
                tickFormatter={(v: number) => v.toFixed(2)}
                width={44}
              />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--elevated))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(v: number) => [v.toFixed(4), "P(X = x)"]}
              />
              <Bar dataKey="probability" radius={[3, 3, 0, 0]}>
                {dist.map((d) => (
                  <Cell
                    key={d.value}
                    fill="rgb(var(--m2))"
                    fillOpacity={Math.abs(d.value - mu) <= sigma ? 0.9 : 0.4}
                  />
                ))}
              </Bar>
              <ReferenceLine
                x={dist.reduce(
                  (best, d) => (Math.abs(d.value - mu) < Math.abs(best - mu) ? d.value : best),
                  dist[0].value,
                )}
                stroke="rgb(var(--danger))"
                strokeWidth={2}
                label={{
                  value: `E(X) = ${mu.toFixed(2)}`,
                  position: "top",
                  fontSize: 10,
                  fill: "rgb(var(--danger))",
                }}
              />
            </BarChart>
          ) : (
            <LineChart data={dist} margin={{ top: 8, right: 8, left: 0, bottom: 18 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis
                dataKey="value"
                tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
                stroke="rgb(var(--border))"
                label={{
                  value: L(set.variable),
                  position: "insideBottom",
                  offset: -12,
                  fontSize: 10,
                  fill: "rgb(var(--ink-dim))",
                }}
              />
              <YAxis
                domain={[0, 1]}
                tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
                stroke="rgb(var(--border))"
                tickFormatter={(v: number) => v.toFixed(2)}
                width={44}
              />
              <Tooltip
                contentStyle={{
                  background: "rgb(var(--elevated))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(v: number) => [v.toFixed(4), "P(X ≤ x)"]}
              />
              <Line
                type="stepAfter"
                dataKey="cumulative"
                stroke="rgb(var(--m2))"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "rgb(var(--m2))" }}
              />
              <ReferenceLine
                y={1}
                stroke="rgb(var(--success))"
                strokeDasharray="4 3"
                label={{
                  value: pick("всегда 1,00", "always 1.00"),
                  position: "insideTopLeft",
                  fontSize: 10,
                  fill: "rgb(var(--success))",
                }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-danger/40 bg-danger/5 p-3">
          <div className="font-mono text-[11px] tracking-wide text-danger">
            E(X) = Σ x·p(x)
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">
            {mu.toFixed(2)} <span className="text-xs font-normal text-ink-dim">{L(set.unit)}</span>
          </div>
        </div>
        <div className="rounded-xl border border-warning/40 bg-warning/5 p-3">
          <div className="font-mono text-[11px] tracking-wide text-warning">
            σ = √Σ(x−μ)²·p(x)
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">{sigma.toFixed(2)}</div>
        </div>
        <div className="rounded-xl border border-success/40 bg-success/5 p-3">
          <div className="font-mono text-[11px] tracking-wide text-success">
            Σ p(x)
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">
            {dist[dist.length - 1].cumulative.toFixed(3)}
          </div>
          <div className="text-[10px] text-ink-dim">
            {pick("проверка: должно быть 1", "check: must be 1")}
          </div>
        </div>
      </div>

      {!wide && (
        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-[11px] tracking-wider text-ink-dim">
              <tr>
                <th className="px-3 py-2 font-mono font-medium">x</th>
                <th className="px-3 py-2 font-medium uppercase">
                  {pick("Наблюдений", "Observations")}
                </th>
                <th className="px-3 py-2 font-mono font-medium">P(X = x)</th>
                <th className="px-3 py-2 font-mono font-medium">P(X ≤ x)</th>
                <th className="px-3 py-2 font-mono font-medium">x·p(x)</th>
              </tr>
            </thead>
            <tbody>
              {dist.map((d) => (
                <tr key={d.value} className="border-t border-border">
                  <td className="px-3 py-1.5 font-mono">{d.value}</td>
                  <td className="px-3 py-1.5 text-ink-dim">
                    {d.frequency} / {total}
                  </td>
                  <td className="px-3 py-1.5 font-mono">{d.probability.toFixed(3)}</td>
                  <td className="px-3 py-1.5 font-mono text-ink-dim">
                    {d.cumulative.toFixed(3)}
                  </td>
                  <td className="px-3 py-1.5 font-mono">
                    {(d.value * d.probability).toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-xs leading-relaxed text-ink-dim">{L(set.note)}</p>
    </div>
  );
}
