import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { NY_TEMPERATURE, ANALYST_OFFER, SAT } from "@/data/datasets";
import { normalPdf, standardNormalCdf } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Preset = "temperature" | "salary" | "sat";

const PRESETS: Record<
  Preset,
  {
    mu: number;
    sigma: number;
    label: { ru: string; en: string };
    unit: string;
    decimals: number;
  }
> = {
  temperature: {
    mu: NY_TEMPERATURE.mean,
    sigma: NY_TEMPERATURE.stdevS,
    label: { ru: "Температура в Нью-Йорке", en: "New York temperature" },
    unit: "°F",
    decimals: 1,
  },
  salary: {
    mu: ANALYST_OFFER.median,
    sigma: ANALYST_OFFER.stdev,
    label: { ru: "Зарплата бизнес-аналитика", en: "Business analyst salary" },
    unit: "$",
    decimals: 0,
  },
  sat: {
    mu: SAT.mean,
    sigma: SAT.stdev,
    label: { ru: "Секция SAT", en: "SAT section" },
    unit: "",
    decimals: 0,
  },
};

const BANDS = [
  { k: 1, share: 0.6827, color: "var(--m2)" },
  { k: 2, share: 0.9545, color: "var(--m3)" },
  { k: 3, share: 0.9973, color: "var(--m4)" },
] as const;

/**
 * Lesson 2-3.1 — the 68–95–99.7 rule, shown as the areas it actually names.
 * Pick a band and the curve fills to ±kσ, with the interval spelled out in
 * the preset's own units so σ stops being an abstraction.
 */
export default function EmpiricalRule() {
  const { pick, L } = useI18n();
  const [preset, setPreset] = useState<Preset>("temperature");
  const [k, setK] = useState<1 | 2 | 3>(1);

  const { mu, sigma, unit, decimals } = PRESETS[preset];

  const data = useMemo(() => {
    const points = [];
    for (let z = -4; z <= 4.0001; z += 0.05) {
      const x = mu + z * sigma;
      const density = normalPdf(x, mu, sigma);
      points.push({
        x,
        z,
        density,
        band: Math.abs(z) <= k ? density : null,
      });
    }
    return points;
  }, [mu, sigma, k]);

  const lower = mu - k * sigma;
  const upper = mu + k * sigma;
  const inside = standardNormalCdf(k) - standardNormalCdf(-k);
  const oneTail = (1 - inside) / 2;

  const fmt = (v: number) =>
    unit === "$"
      ? `$${Math.round(v).toLocaleString("en-US")}`
      : `${v.toFixed(decimals)}${unit ? ` ${unit}` : ""}`;

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lesson 2-3.1 · эмпирическое правило", "Lesson 2-3.1 · the Empirical Rule")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick("68 — 95 — 99,7", "68 — 95 — 99.7")}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(PRESETS) as Preset[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPreset(p)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                preset === p
                  ? "border-transparent bg-accent text-white"
                  : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
              )}
            >
              {L(PRESETS[p].label)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {BANDS.map((b) => (
          <button
            key={b.k}
            type="button"
            onClick={() => setK(b.k as 1 | 2 | 3)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              k === b.k
                ? "border-transparent text-white"
                : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
            )}
            style={k === b.k ? { background: `rgb(${b.color})` } : undefined}
          >
            μ ± {b.k}σ → {(b.share * 100).toFixed(b.k === 1 ? 0 : b.k === 2 ? 0 : 1)} %
          </button>
        ))}
      </div>

      <div className="mt-4 h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 22, right: 8, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="er-band" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`rgb(${BANDS[k - 1].color})`} stopOpacity={0.65} />
                <stop offset="100%" stopColor={`rgb(${BANDS[k - 1].color})`} stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              ticks={[-3, -2, -1, 0, 1, 2, 3].map((z) => mu + z * sigma)}
              tickFormatter={(v: number) => fmt(v)}
              tick={{ fontSize: 9, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
            />
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="density"
              stroke="rgb(var(--ink-dim))"
              strokeWidth={1.5}
              fill="rgb(var(--muted))"
              fillOpacity={0.5}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="band"
              stroke={`rgb(${BANDS[k - 1].color})`}
              strokeWidth={2}
              fill="url(#er-band)"
              connectNulls={false}
              isAnimationActive={false}
            />
            <ReferenceLine
              x={mu}
              stroke="rgb(var(--ink))"
              strokeDasharray="3 3"
              label={{
                value: "μ",
                position: "top",
                fontSize: 11,
                fill: "rgb(var(--ink))",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <motion.div
        key={`${preset}-${k}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 grid gap-3 sm:grid-cols-3"
      >
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">
            {pick("Интервал", "Interval")}
          </div>
          <div className="mt-0.5 font-mono text-sm font-semibold">
            {fmt(lower)} … {fmt(upper)}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">
            {pick("Внутри", "Inside")}
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">
            {(inside * 100).toFixed(2)} %
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">
            {pick("В каждом хвосте", "In each tail")}
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">
            {(oneTail * 100).toFixed(2)} %
          </div>
        </div>
      </motion.div>

      <div className="mt-3 rounded-xl border border-border bg-elevated p-3 text-xs leading-relaxed">
        <span className="font-semibold">
          {pick("Приём для переговорной: ", "The meeting-room trick: ")}
        </span>
        {pick(
          "правило работает и в обратную сторону. Если у вас есть только диапазон без чисел, практическая ширина колокола — примерно шесть сигм, откуда σ ≈ (max − min) / 6. Если дано расстояние от среднего до края — делите на 3, а не на 6.",
          "the rule runs backwards too. Given only a range and no figures, the practical width of a bell is about six sigmas, so σ ≈ (max − min) / 6. If you are handed the distance from the mean to the edge instead, divide by 3, not by 6.",
        )}
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-ink-dim">
        {pick(
          "Правило требует приблизительно колоколообразного распределения. Для произвольной формы работает более слабая, но универсальная граница Чебышёва: за пределами ±kσ лежит не более 1/k² наблюдений — то есть внутри ±2σ не менее 75 %, а не 95 %.",
          "The rule needs a roughly bell-shaped distribution. For an arbitrary shape the weaker but universal Chebyshev bound applies: no more than 1/k² of observations lie beyond ±kσ — meaning at least 75 % inside ±2σ, not 95 %.",
        )}
      </p>
    </div>
  );
}
