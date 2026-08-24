import { useMemo, useState } from "react";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { normalPdf } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";

/**
 * Lesson 2-5.1, slides 98–100 — μ moves the curve, σ reshapes it. The lecture
 * shows three fixed pairs; here both are on sliders, with the reference curve
 * (μ = 500, σ = 15) held behind for comparison.
 */
export default function NormalShapeExplorer() {
  const { pick } = useI18n();
  const [mu, setMu] = useState(500);
  const [sigma, setSigma] = useState(15);

  const data = useMemo(() => {
    const points = [];
    for (let x = 250; x <= 560; x += 1) {
      points.push({
        x,
        reference: normalPdf(x, 500, 15),
        curve: normalPdf(x, mu, sigma),
      });
    }
    return points;
  }, [mu, sigma]);

  const peak = normalPdf(mu, mu, sigma);
  const referencePeak = normalPdf(500, 500, 15);

  const verdict = (() => {
    const moved = Math.abs(mu - 500) > 5;
    const reshaped = Math.abs(sigma - 15) > 0.6;
    if (!moved && !reshaped) {
      return pick(
        "Обе кривые совпадают. Меняйте μ и σ по одному, чтобы увидеть, что делает каждый параметр.",
        "The two curves coincide. Move μ and σ one at a time to see what each parameter does.",
      );
    }
    if (moved && !reshaped) {
      return pick(
        "Форма не изменилась — изменилось только положение. Так и должно быть: σ прежнее, значит кривая просто сдвинулась по оси.",
        "The shape has not changed, only the position. That is exactly right: σ is unchanged, so the curve merely slid along the axis.",
      );
    }
    if (!moved && reshaped) {
      return sigma < 15
        ? pick(
            "Кривая стала уже и выше. Площадь под любой нормальной кривой равна единице, поэтому сжатие по горизонтали обязано компенсироваться ростом по вертикали.",
            "The curve got narrower and taller. The area under any normal curve is one, so squeezing it horizontally must be paid for vertically.",
          )
        : pick(
            "Кривая стала шире и ниже: разброс вырос, и среднее хуже представляет типичное наблюдение.",
            "The curve got wider and flatter: the spread grew, and the mean now represents a typical observation less well.",
          );
    }
    return pick(
      "Изменились оба параметра: μ передвинул пик, σ переопределил ширину и высоту.",
      "Both parameters moved: μ shifted the peak, σ redefined the width and the height.",
    );
  })();

  const presets = [
    { label: "μ = 500 · σ = 15", mu: 500, sigma: 15 },
    { label: "μ = 300 · σ = 15", mu: 300, sigma: 15 },
    { label: "μ = 500 · σ = 5", mu: 500, sigma: 5 },
  ];

  return (
    <div className="card p-5">
      <div className="text-[11px] uppercase tracking-widest text-ink-dim">
        {pick("Lesson 2-5.1 · два параметра", "Lesson 2-5.1 · two parameters")}
      </div>
      <h4 className="mt-1 font-display text-base font-semibold">
        {pick(
          "μ задаёт положение, σ задаёт форму",
          "μ sets the position, σ sets the shape",
        )}
      </h4>
      <p className="mt-1 text-xs text-ink-dim">
        {pick(
          "Нормальное распределение полностью определяется двумя числами. Больше о нём знать ничего не нужно.",
          "A normal distribution is defined completely by two numbers. There is nothing else to know about it.",
        )}
      </p>

      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-3 text-xs">
          <span className="w-24 whitespace-nowrap text-ink-dim">
            {pick("Среднее μ", "Mean μ")}
          </span>
          <input
            type="range"
            min={280}
            max={520}
            step={5}
            value={mu}
            onChange={(e) => setMu(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
          />
          <span className="w-12 text-right font-mono font-semibold">{mu}</span>
        </label>
        <label className="flex items-center gap-3 text-xs">
          <span className="w-24 whitespace-nowrap text-ink-dim">
            {pick("Ст. откл. σ", "Std dev σ")}
          </span>
          <input
            type="range"
            min={4}
            max={40}
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
          />
          <span className="w-12 text-right font-mono font-semibold">{sigma}</span>
        </label>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setMu(p.mu);
              setSigma(p.sigma);
            }}
            className="chip hover:text-ink"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 24, right: 8, left: 0, bottom: 4 }}>
            <XAxis
              dataKey="x"
              type="number"
              domain={[250, 560]}
              ticks={[300, 350, 400, 450, 500, 550]}
              tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
            />
            <YAxis hide domain={[0, Math.max(peak, referencePeak) * 1.12]} />
            <Line
              type="monotone"
              dataKey="reference"
              stroke="rgb(var(--ink-dim))"
              strokeWidth={1.25}
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="curve"
              stroke="rgb(var(--m2))"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
            <ReferenceLine
              x={mu}
              stroke="rgb(var(--m2))"
              strokeDasharray="3 3"
              label={{
                value: `μ = ${mu}`,
                position: "top",
                fontSize: 10,
                fill: "rgb(var(--m2))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-4 text-[11px] text-ink-dim">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-6" style={{ background: "rgb(var(--m2))" }} />
          {pick("ваша кривая", "your curve")}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-6"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgb(var(--ink-dim)) 0 4px, transparent 4px 8px)",
            }}
          />
          {pick("эталон: μ = 500, σ = 15", "reference: μ = 500, σ = 15")}
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-dim">{verdict}</p>
    </div>
  );
}
