import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RefreshCw } from "lucide-react";
import { makeBins, mean, populationStdDev, seededRandom } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Shape = "bimodal" | "right" | "uniform";

const SHAPES: Record<Shape, { ru: string; en: string }> = {
  bimodal: { ru: "Два сезона", en: "Two seasons" },
  right: { ru: "Правый скос", en: "Right skew" },
  uniform: { ru: "Равномерное", en: "Uniform" },
};

function gaussian(rand: () => number) {
  const u = Math.max(rand(), 1e-12);
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function createPopulation(shape: Shape) {
  const rand = seededRandom(shape.length * 9037);
  return Array.from({ length: 5000 }, () => {
    if (shape === "bimodal") {
      return (rand() < 0.5 ? 34 : 74) + gaussian(rand) * 8;
    }
    if (shape === "right") {
      return 20 + -Math.log(Math.max(1 - rand(), 1e-12)) * 16;
    }
    return 15 + rand() * 75;
  });
}

export default function CentralLimitExplorer() {
  const { pick, L } = useI18n();
  const [shape, setShape] = useState<Shape>("bimodal");
  const [sampleSize, setSampleSize] = useState(5);
  const [seed, setSeed] = useState(11);

  const result = useMemo(() => {
    const population = createPopulation(shape);
    const rand = seededRandom(seed * 7919 + sampleSize);
    const sampleMeans = Array.from({ length: 1200 }, () => {
      let total = 0;
      for (let i = 0; i < sampleSize; i += 1) {
        total += population[Math.floor(rand() * population.length)];
      }
      return total / sampleSize;
    });
    return {
      population,
      sampleMeans,
      populationMean: mean(population),
      populationSd: populationStdDev(population),
      meanOfMeans: mean(sampleMeans),
      simulatedSe: populationStdDev(sampleMeans),
    };
  }, [shape, sampleSize, seed]);

  const parentBins = useMemo(
    () => makeBins(result.population, 24).map((b) => ({ label: b.label, count: b.frequency })),
    [result.population],
  );
  const meanBins = useMemo(
    () => makeBins(result.sampleMeans, 24).map((b) => ({ label: b.label, count: b.frequency })),
    [result.sampleMeans],
  );
  const theoreticalSe = result.populationSd / Math.sqrt(sampleSize);

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lesson 3-3 · симуляция ЦПТ", "Lesson 3-3 · CLT simulation")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick("Средние забывают форму исходных данных", "Means forget the shape they came from")}
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="btn-secondary h-9 px-3 text-xs"
        >
          <RefreshCw size={14} /> {pick("Ещё 1 200 выборок", "Another 1,200 samples")}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {(Object.keys(SHAPES) as Shape[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setShape(s)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              shape === s
                ? "border-transparent bg-m3 text-white"
                : "border-border bg-surface text-ink-dim hover:bg-muted",
            )}
          >
            {L(SHAPES[s])}
          </button>
        ))}
      </div>

      <label className="mt-4 flex items-center gap-3 text-xs">
        <span className="w-36 text-ink-dim">{pick("Размер каждой выборки", "Size of each sample")}</span>
        <input
          type="range"
          min={1}
          max={100}
          step={1}
          value={sampleSize}
          onChange={(event) => setSampleSize(Number(event.target.value))}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
        />
        <span className="w-12 text-right font-mono font-semibold">n = {sampleSize}</span>
      </label>
      <div className="ml-36 mt-1 flex flex-wrap gap-1.5 pl-3">
        {[1, 5, 25, 50, 100].map((n) => (
          <button key={n} type="button" onClick={() => setSampleSize(n)} className="chip hover:text-ink">
            {n}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Histogram
          title={pick("Population: отдельные X", "Population: individual X")}
          data={parentBins}
          color="rgb(var(--ink-dim))"
        />
        <Histogram
          title={pick("1 200 выборочных средних x̄", "1,200 sample means x̄")}
          data={meanBins}
          color="rgb(var(--m3))"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <Stat label="μ" value={result.populationMean.toFixed(2)} />
        <Stat label="mean(x̄)" value={result.meanOfMeans.toFixed(2)} />
        <Stat label={pick("SE по формуле", "Formula SE")} value={theoreticalSe.toFixed(3)} />
        <Stat label={pick("SE симуляции", "Simulated SE")} value={result.simulatedSe.toFixed(3)} />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-dim">
        {pick(
          `Центр почти не движется: mean(x̄) ≈ μ. При росте n правая гистограмма сужается по закону σ/√n и становится более колоколообразной. При n = 1 это ещё распределение самих наблюдений, а не эффект усреднения.`,
          `The centre barely moves: mean(x̄) ≈ μ. As n grows, the right histogram narrows according to σ/√n and becomes more bell-shaped. At n = 1 it is still the distribution of individual observations, not an averaging effect.`,
        )}
      </p>
    </div>
  );
}

function Histogram({ title, data, color }: { title: string; data: { label: string; count: number }[]; color: string }) {
  return (
    <div>
      <div className="mb-1 text-center text-[11px] font-semibold text-ink-dim">{title}</div>
      <div className="h-[210px] w-full rounded-xl border border-border bg-muted/20 p-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 14 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(var(--border))" />
            <XAxis
              dataKey="label"
              interval={5}
              tick={{ fontSize: 9, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
              angle={-20}
              textAnchor="end"
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--elevated))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 10,
                fontSize: 11,
              }}
            />
            <Bar dataKey="count" fill={color} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="text-[10px] font-semibold tracking-wide text-ink-dim">{label}</div>
      <div className="mt-1 font-mono text-lg font-semibold">{value}</div>
    </div>
  );
}
