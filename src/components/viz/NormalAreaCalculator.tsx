import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Copy, Check } from "lucide-react";
import { normalCdf, normalPdf, zScore } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Mode = "less" | "greater" | "between";

const PRESETS = [
  { label: "SAT · μ 500 · σ 100", mu: 500, sigma: 100, a: 458, b: 635 },
  { label: "μ 1000 · σ 10", mu: 1000, sigma: 10, a: 995, b: 1005 },
  { label: "Salary · μ 54 030 · σ 8 600", mu: 54030, sigma: 8600, a: 65000, b: 68008 },
];

const num = (v: number) =>
  Math.abs(v) >= 1000 ? Math.round(v).toString() : String(v);

/**
 * Lessons 2-5.4…2-5.6 — the one trick behind all three question types.
 * Excel only ever returns the area to the LEFT of a value; "greater than"
 * and "between" are arithmetic on top of that, and the panel shows the exact
 * formula it would take to reproduce each answer in a spreadsheet.
 */
export default function NormalAreaCalculator() {
  const { pick } = useI18n();
  const [mode, setMode] = useState<Mode>("less");
  const [mu, setMu] = useState(500);
  const [sigma, setSigma] = useState(100);
  const [a, setA] = useState(458);
  const [b, setB] = useState(635);
  const [copied, setCopied] = useState(false);

  const lo = Math.min(a, b);
  const hi = Math.max(a, b);

  const data = useMemo(() => {
    const points = [];
    for (let z = -4; z <= 4.0001; z += 0.04) {
      const x = mu + z * sigma;
      const density = normalPdf(x, mu, sigma);
      let shaded: number | null = null;
      if (mode === "less") shaded = x <= a ? density : null;
      else if (mode === "greater") shaded = x >= a ? density : null;
      else shaded = x >= lo && x <= hi ? density : null;
      points.push({ x, density, shaded });
    }
    return points;
  }, [mu, sigma, a, lo, hi, mode]);

  const { result, formula, reading } = useMemo(() => {
    if (mode === "less") {
      const p = normalCdf(a, mu, sigma);
      return {
        result: p,
        formula: `=NORM.DIST(${num(a)}; ${num(mu)}; ${num(sigma)}; 1)`,
        reading: pick(
          `${(p * 100).toFixed(1)} % наблюдений лежат ниже ${num(a)} — это ${Math.round(p * 100)}-й процентиль.`,
          `${(p * 100).toFixed(1)} % of observations fall below ${num(a)} — the ${Math.round(p * 100)}th percentile.`,
        ),
      };
    }
    if (mode === "greater") {
      const left = normalCdf(a, mu, sigma);
      const p = 1 - left;
      return {
        result: p,
        formula: `=1 − NORM.DIST(${num(a)}; ${num(mu)}; ${num(sigma)}; 1)`,
        reading: pick(
          `Excel вернул левую площадь ${left.toFixed(4)}; правый хвост — это единица минус она, потому что полная площадь под кривой равна 1.`,
          `Excel returned the left area ${left.toFixed(4)}; the right tail is one minus that, because the total area under the curve is 1.`,
        ),
      };
    }
    const upper = normalCdf(hi, mu, sigma);
    const lower = normalCdf(lo, mu, sigma);
    return {
      result: upper - lower,
      formula: `=NORM.DIST(${num(hi)}; ${num(mu)}; ${num(sigma)}; 1) − NORM.DIST(${num(lo)}; ${num(mu)}; ${num(sigma)}; 1)`,
      reading: pick(
        `«Всё слева от ${num(hi)}» (${upper.toFixed(4)}) минус «всё слева от ${num(lo)}» (${lower.toFixed(4)}) оставляет ровно полосу между ними. Из большего вычитаем меньшее — иначе получится отрицательная вероятность.`,
        `'Everything left of ${num(hi)}' (${upper.toFixed(4)}) minus 'everything left of ${num(lo)}' (${lower.toFixed(4)}) leaves exactly the strip between them. Larger minus smaller — otherwise you get a negative probability.`,
      ),
    };
  }, [mode, a, lo, hi, mu, sigma, pick]);

  const copy = () => {
    navigator.clipboard?.writeText(formula.replace(/−/g, "-").replace(/;/g, ","));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const modes: [Mode, string][] = [
    ["less", pick("Меньше чем", "Less than")],
    ["greater", pick("Больше чем", "Greater than")],
    ["between", pick("Между значениями", "Between values")],
  ];

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lessons 2-5.4–2-5.6 · площади", "Lessons 2-5.4–2-5.6 · areas")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick(
              "Excel умеет одно: площадь слева",
              "Excel does one thing: the area to the left",
            )}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setMu(p.mu);
                setSigma(p.sigma);
                setA(p.a);
                setB(p.b);
              }}
              className="chip hover:text-ink"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {modes.map(([m, label]) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              mode === m
                ? "border-transparent bg-accent text-white"
                : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        {[
          { label: "μ", value: mu, set: setMu },
          { label: "σ", value: sigma, set: setSigma },
          {
            label: mode === "between" ? pick("нижняя", "lower") : "x",
            value: a,
            set: setA,
          },
        ].map((f) => (
          <label key={f.label} className="text-xs">
            <span className="text-ink-dim">{f.label}</span>
            <input
              type="number"
              value={f.value}
              onChange={(e) => f.set(Number(e.target.value))}
              className="mt-0.5 w-full rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-sm text-ink outline-none focus:border-accent"
            />
          </label>
        ))}
        {mode === "between" && (
          <label className="text-xs">
            <span className="text-ink-dim">{pick("верхняя", "upper")}</span>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="mt-0.5 w-full rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-sm text-ink outline-none focus:border-accent"
            />
          </label>
        )}
      </div>

      <div className="mt-4 h-[230px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="nac-shade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(var(--m2))" stopOpacity={0.7} />
                <stop offset="100%" stopColor="rgb(var(--m2))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              ticks={[-3, -2, -1, 0, 1, 2, 3].map((z) => mu + z * sigma)}
              tickFormatter={(v: number) => num(v)}
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
              dataKey="shaded"
              stroke="rgb(var(--m2))"
              strokeWidth={2}
              fill="url(#nac-shade)"
              connectNulls={false}
              isAnimationActive={false}
            />
            <ReferenceLine x={mu} stroke="rgb(var(--ink-dim))" strokeDasharray="3 3" />
            <ReferenceLine
              x={mode === "between" ? lo : a}
              stroke="rgb(var(--danger))"
              strokeWidth={1.5}
            />
            {mode === "between" && (
              <ReferenceLine x={hi} stroke="rgb(var(--danger))" strokeWidth={1.5} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-m2/40 bg-muted/40 p-3">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">
            {pick("Вероятность", "Probability")}
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">
            {result.toFixed(5)}
          </div>
          <div className="text-[11px] text-ink-dim">{(result * 100).toFixed(2)} %</div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="font-mono text-[11px] tracking-wide text-ink-dim">
            {mode === "between"
              ? pick("z нижней / верхней", "z lower / upper")
              : "z = (x − μ) / σ"}
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">
            {mode === "between"
              ? `${zScore(lo, mu, sigma).toFixed(2)} … ${zScore(hi, mu, sigma).toFixed(2)}`
              : zScore(a, mu, sigma).toFixed(4)}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">
            {pick("Сколько сигм", "How many sigmas")}
          </div>
          <div className="mt-0.5 text-sm">
            {Math.abs(zScore(mode === "between" ? hi : a, mu, sigma)) > 3
              ? pick("Более 3σ — по определению модуля это выброс.", "Beyond 3σ — an outlier by this module's definition.")
              : pick("В пределах 3σ — обычное наблюдение.", "Within 3σ — an ordinary observation.")}
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-border bg-elevated p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-ink-dim">
              {pick("Формула в Excel", "The Excel formula")}
            </div>
            <pre className="m-0 mt-1 whitespace-pre-wrap break-words font-mono text-[13px] text-ink">
              {formula}
            </pre>
          </div>
          <button
            type="button"
            onClick={copy}
            className="btn-secondary h-8 shrink-0 px-2.5 text-xs"
            aria-label={pick("Скопировать формулу", "Copy the formula")}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-ink-dim">{reading}</p>
      <p className="mt-2 text-[11px] leading-relaxed text-ink-dim">
        {pick(
          "Последний аргумент cumulative всегда 1: единица трактуется как TRUE, ноль как FALSE, а функция плотности в этом курсе не используется никогда.",
          "The final cumulative argument is always 1: one reads as TRUE, zero as FALSE, and the probability-density option is never used in this course.",
        )}
      </p>
    </div>
  );
}
