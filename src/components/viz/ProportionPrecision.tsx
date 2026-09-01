import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { normalPdf } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";

export default function ProportionPrecision() {
  const { pick } = useI18n();
  const [p, setP] = useState(0.3);
  const [n, setN] = useState(50);
  const se = Math.sqrt((p * (1 - p)) / n);
  const success = n * p;
  const failure = n * (1 - p);
  const normalOk = success >= 10 && failure >= 10;

  const data = useMemo(() => {
    const low = Math.max(0, p - 4 * se);
    const high = Math.min(1, p + 4 * se);
    return Array.from({ length: 121 }, (_, i) => {
      const x = low + ((high - low) * i) / 120;
      return { x, density: normalPdf(x, p, se) };
    });
  }, [p, se]);

  return (
    <div className="card p-5">
      <div className="text-[11px] uppercase tracking-widest text-ink-dim">
        {pick("Lesson 3-4 · выборочная доля", "Lesson 3-4 · sample proportion")}
      </div>
      <h4 className="mt-1 font-display text-base font-semibold">
        {pick("Почему большая выборка даёт более точную долю", "Why a larger sample gives a sharper proportion")}
      </h4>

      <div className="mt-4 space-y-3">
        <label className="flex items-center gap-3 text-xs">
          <span className="w-36 text-ink-dim">{pick("Истинная доля p", "True proportion p")}</span>
          <input
            type="range"
            min={0.05}
            max={0.95}
            step={0.01}
            value={p}
            onChange={(event) => setP(Number(event.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
          />
          <span className="w-14 text-right font-mono font-semibold">{p.toFixed(2)}</span>
        </label>
        <label className="flex items-center gap-3 text-xs">
          <span className="w-36 text-ink-dim">{pick("Размер выборки n", "Sample size n")}</span>
          <input
            type="range"
            min={20}
            max={1000}
            step={10}
            value={n}
            onChange={(event) => setN(Number(event.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
          />
          <span className="w-14 text-right font-mono font-semibold">{n}</span>
        </label>
      </div>

      <div className="mt-2 ml-36 flex flex-wrap gap-1.5 pl-3">
        {[50, 100, 400, 1000].map((value) => (
          <button key={value} type="button" onClick={() => setN(value)} className="chip hover:text-ink">
            n = {value}
          </button>
        ))}
      </div>

      <div className="mt-4 h-[230px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 18, right: 10, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="proportionFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(var(--m3))" stopOpacity={0.55} />
                <stop offset="100%" stopColor="rgb(var(--m3))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--border))" />
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(value: number) => value.toFixed(2)}
              tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
            />
            <YAxis hide />
            <Area type="monotone" dataKey="density" stroke="rgb(var(--m3))" strokeWidth={2.5} fill="url(#proportionFill)" />
            <ReferenceLine x={p} stroke="rgb(var(--danger))" strokeWidth={2} label={{ value: `p = ${p.toFixed(2)}`, position: "top", fontSize: 10, fill: "rgb(var(--danger))" }} />
            <ReferenceLine x={Math.max(0, p - 2 * se)} stroke="rgb(var(--ink-dim))" strokeDasharray="4 3" />
            <ReferenceLine x={Math.min(1, p + 2 * se)} stroke="rgb(var(--ink-dim))" strokeDasharray="4 3" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Stat label="SE(p̂)" value={se.toFixed(4)} />
        <Stat label={pick("Примерные 95%", "Approximate 95%")} value={`${Math.max(0, p - 2 * se).toFixed(3)}…${Math.min(1, p + 2 * se).toFixed(3)}`} />
        <Stat label="np / n(1−p)" value={`${success.toFixed(1)} / ${failure.toFixed(1)}`} tone={normalOk ? "success" : "warning"} />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-dim">
        {normalOk
          ? pick(
              "Ожидаемых успехов и неуспехов не меньше 10: нормальная аппроксимация разумна. Увеличьте n в четыре раза — SE уменьшится примерно вдвое.",
              "Expected successes and failures are both at least 10, so the normal approximation is reasonable. Quadruple n and SE falls by about half.",
            )
          : pick(
              "Одно из условий np ≥ 10 и n(1−p) ≥ 10 нарушено. Колокол здесь может плохо описывать sampling distribution — увеличьте n или используйте точный биномиальный метод.",
              "One of np ≥ 10 and n(1−p) ≥ 10 fails. The bell curve may describe this sampling distribution poorly — increase n or use an exact binomial method.",
            )}
      </p>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "success" | "warning" }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="text-[10px] font-semibold tracking-wide text-ink-dim">{label}</div>
      <div className={`mt-1 font-mono text-lg font-semibold ${tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : ""}`}>
        {value}
      </div>
    </div>
  );
}
