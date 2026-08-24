import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useI18n } from "@/i18n/I18nContext";

const STEP = 0.5;
const DOMAIN_MAX = 14;
const MODE = DOMAIN_MAX / 2;
const CENTRES = Array.from(
  { length: DOMAIN_MAX / STEP + 1 },
  (_, i) => i * STEP,
);

/**
 * A gamma density with its mode pinned at the centre of the domain. The shape
 * parameter k carries the skew: large k is an almost symmetric bell, small k
 * grows a long tail. Pinning the mode is what makes the demo readable — the
 * hump stays put while the tail, and with it the mean, moves.
 */
function shape(skew: number): { x: number; f: number }[] {
  const a = Math.abs(skew);
  const k = 1 / (0.003 + 0.115 * a);
  const theta = MODE / (k - 1);
  const logPeak = (k - 1) * Math.log(MODE) - MODE / theta;
  return CENTRES.map((x) => {
    // Mirror the domain for a left tail, so both directions look alike.
    const u = skew >= 0 ? x : DOMAIN_MAX - x;
    if (u <= 0.0001) return { x, f: 0 };
    const f = Math.exp((k - 1) * Math.log(u) - u / theta - logPeak);
    return { x, f: Math.round(f * 1000) / 1000 };
  });
}

/**
 * Lesson 2-1.1, slides 13–16 — the spinner demo. Drag the skew and watch the
 * mean run into the tail while the median stays close to the peak.
 */
export default function SkewExplorer() {
  const { pick } = useI18n();
  const [skew, setSkew] = useState(0);

  const data = useMemo(() => shape(skew), [skew]);

  const { mean, median, verdict, tone } = useMemo(() => {
    const total = data.reduce((a, d) => a + d.f, 0) || 1;
    const mu = data.reduce((a, d) => a + d.x * d.f, 0) / total;

    // Interpolate inside the bin that crosses the halfway mark, otherwise the
    // median snaps to bin centres and the mean-median gap reads as a staircase.
    let running = 0;
    let med = data[data.length - 1].x;
    for (const d of data) {
      const next = running + d.f;
      if (next >= total / 2) {
        const frac = d.f === 0 ? 0 : (total / 2 - running) / d.f;
        med = d.x - STEP / 2 + frac * STEP;
        break;
      }
      running = next;
    }

    const gap = mu - med;
    if (Math.abs(gap) < 0.03) {
      return {
        mean: mu,
        median: med,
        tone: "text-ink",
        verdict: pick(
          "Симметрично: среднее и медиана лежат друг на друге, любая из двух мер честно описывает центр.",
          "Symmetrical: mean and median sit on top of one another, and either measure describes the centre honestly.",
        ),
      };
    }
    if (gap > 0) {
      return {
        mean: mu,
        median: med,
        tone: "text-danger",
        verdict: pick(
          "Скос вправо: длинный правый хвост тянет среднее вверх, медиана почти не двигается. Значит mean > median.",
          "Right skew: the long right tail drags the mean up while the median barely moves. Hence mean > median.",
        ),
      };
    }
    return {
      mean: mu,
      median: med,
      tone: "text-danger",
      verdict: pick(
        "Скос влево: длинный левый хвост тянет среднее вниз. Значит mean < median.",
        "Left skew: the long left tail drags the mean down. Hence mean < median.",
      ),
    };
  }, [data, pick]);

  const presets = [
    { label: pick("Скос влево", "Left skew"), value: -0.9 },
    { label: pick("Симметрия", "Symmetric"), value: 0 },
    { label: pick("Скос вправо", "Right skew"), value: 0.9 },
  ];

  return (
    <div className="card p-5">
      <div className="text-[11px] uppercase tracking-widest text-ink-dim">
        {pick("Lesson 2-1.1 · форма распределения", "Lesson 2-1.1 · distribution shape")}
      </div>
      <h4 className="mt-1 font-display text-base font-semibold">
        {pick(
          "Среднее убегает в хвост, медиана остаётся дома",
          "The mean runs into the tail, the median stays home",
        )}
      </h4>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="flex min-w-[240px] flex-1 items-center gap-3 text-xs">
          <span className="whitespace-nowrap text-ink-dim">
            {pick("Скошенность", "Skewness")}
          </span>
          <input
            type="range"
            min={-100}
            max={100}
            value={skew * 100}
            onChange={(e) => setSkew(Number(e.target.value) / 100)}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
          />
          <span className="w-10 text-right font-mono font-semibold">
            {skew.toFixed(2)}
          </span>
        </label>
        <div className="flex gap-1.5">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setSkew(p.value)}
              className="chip hover:text-ink"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={1} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
            <XAxis
              dataKey="x"
              tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
              tickFormatter={(v: number) => (Number.isInteger(v) ? String(v) : "")}
              interval={1}
            />
            <YAxis hide domain={[0, 1.05]} />
            <Bar dataKey="f" radius={[3, 3, 0, 0]} isAnimationActive={false}>
              {data.map((d) => (
                <Cell
                  key={d.x}
                  fill="rgb(var(--m2))"
                  fillOpacity={Math.abs(d.x - median) < STEP / 2 ? 0.95 : 0.45}
                />
              ))}
            </Bar>
            <ReferenceLine
              x={data.reduce((best, d) => (Math.abs(d.x - mean) < Math.abs(best - mean) ? d.x : best), data[0].x)}
              stroke="rgb(var(--danger))"
              strokeWidth={2}
            />
            <ReferenceLine
              x={median}
              stroke="rgb(var(--success))"
              strokeWidth={2}
              strokeDasharray="4 3"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-4 text-[11px] text-ink-dim">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-6"
            style={{ background: "rgb(var(--danger))" }}
          />
          {pick("среднее", "mean")}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-6"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgb(var(--success)) 0 4px, transparent 4px 7px)",
            }}
          />
          {pick("медиана", "median")}
        </span>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="text-[11px] uppercase tracking-wider text-danger">
            {pick("Среднее", "Mean")}
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">{mean.toFixed(2)}</div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="text-[11px] uppercase tracking-wider text-success">
            {pick("Медиана", "Median")}
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">{median.toFixed(2)}</div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">
            {pick("Разность", "Difference")}
          </div>
          <div className={`mt-0.5 font-mono text-lg font-semibold ${tone}`}>
            {(() => {
              const gap = mean - median;
              const shown = gap.toFixed(2);
              return shown === "-0.00" || shown === "0.00"
                ? "0.00"
                : (gap > 0 ? "+" : "") + shown;
            })()}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-dim">{verdict}</p>
      <p className="mt-2 text-[11px] leading-relaxed text-ink-dim">
        {pick(
          "Направление скоса называют по стороне, куда вытянут хвост, а не по стороне, где горб. Отсюда самая дешёвая диагностика формы: посчитайте AVERAGE и MEDIAN и сравните — график для этого не нужен.",
          "A skew is named after the side the tail is on, not the side the hump is on. Hence the cheapest shape diagnostic there is: compute AVERAGE and MEDIAN, compare them, and skip the chart entirely.",
        )}
      </p>
    </div>
  );
}
