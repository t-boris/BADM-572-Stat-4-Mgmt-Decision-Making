import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";
import { seededRandom } from "@/lib/statUtils";

type Mode = "random" | "frontrow" | "volunteer";

const MODES: { id: Mode; ru: string; en: string }[] = [
  { id: "random", ru: "Простая случайная выборка", en: "Simple random sample" },
  { id: "frontrow", ru: "«Первый ряд»", en: "'Front row'" },
  { id: "volunteer", ru: "Добровольцы", en: "Volunteers" },
];

const COLS = 20;
const ROWS = 8;
const N = COLS * ROWS; // 160 "people" in the population

/**
 * Population vs sample, and why *how* you draw the sample decides whether the
 * inference is worth anything (OnlineStatBook, "Inferential Statistics").
 */
export default function PopulationSample() {
  const { pick } = useI18n();
  const [mode, setMode] = useState<Mode>("random");
  const [seed, setSeed] = useState(7);

  /** Latent "ability" of each unit; the population mean is what we want. */
  const population = useMemo(() => {
    const rand = seededRandom(424242);
    return Array.from({ length: N }, (_, i) => {
      const row = Math.floor(i / COLS);
      // front rows genuinely score a bit higher — that is what creates the bias
      const base = 62 + (ROWS - row) * 1.6;
      return Math.round(base + (rand() - 0.5) * 26);
    });
  }, []);

  const selected = useMemo(() => {
    const rand = seededRandom(seed * 977 + mode.length);
    const idx = new Set<number>();
    if (mode === "random") {
      while (idx.size < 16) idx.add(Math.floor(rand() * N));
    } else if (mode === "frontrow") {
      // the 10 students sitting in the front row (Example #3)
      for (let i = 0; i < 16; i++) idx.add(i);
    } else {
      // volunteers: skewed towards the high end of the latent variable
      const ranked = population
        .map((v, i) => ({ v, i }))
        .sort((a, b) => b.v - a.v)
        .slice(0, 40);
      while (idx.size < 16) idx.add(ranked[Math.floor(rand() * ranked.length)].i);
    }
    return idx;
  }, [mode, seed, population]);

  const popMean =
    population.reduce((a, b) => a + b, 0) / population.length;
  const sampleValues = Array.from(selected).map((i) => population[i]);
  const sampleMean =
    sampleValues.reduce((a, b) => a + b, 0) / (sampleValues.length || 1);
  const bias = sampleMean - popMean;

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Совокупность и выборка", "Population and sample")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick(
              "Смещение рождается в момент отбора",
              "Bias is born at the moment of selection",
            )}
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="btn-secondary h-9 px-3 text-xs"
        >
          <Shuffle size={14} /> {pick("Пересобрать", "Redraw")}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              mode === m.id
                ? "border-transparent bg-accent text-white"
                : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
            )}
          >
            {pick(m.ru, m.en)}
          </button>
        ))}
      </div>

      <div
        className="mt-4 grid gap-1 rounded-xl border border-border bg-muted/30 p-3"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        aria-hidden
      >
        {population.map((_, i) => {
          const isIn = selected.has(i);
          return (
            <motion.span
              key={i}
              layout
              animate={{ scale: isIn ? 1 : 0.72, opacity: isIn ? 1 : 0.32 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "aspect-square rounded-[3px]",
                isIn ? "bg-accent" : "bg-ink/40",
              )}
            />
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat
          label={pick("Параметр совокупности μ", "Population parameter μ")}
          value={popMean.toFixed(1)}
          hint={pick(`N = ${N}`, `N = ${N}`)}
        />
        <Stat
          label={pick("Статистика выборки x̄", "Sample statistic x̄")}
          value={sampleMean.toFixed(1)}
          hint={pick(`n = ${selected.size}`, `n = ${selected.size}`)}
        />
        <Stat
          label={pick("Смещение x̄ − μ", "Bias x̄ − μ")}
          value={`${bias > 0 ? "+" : ""}${bias.toFixed(1)}`}
          tone={Math.abs(bias) < 1.5 ? "success" : "danger"}
          hint={
            Math.abs(bias) < 1.5
              ? pick("выборка репрезентативна", "sample is representative")
              : pick("выборка смещена", "sample is biased")
          }
        />
      </div>

      <p className="mt-3 text-xs text-ink-dim">
        {mode === "random" &&
          pick(
            "Простая случайная выборка: каждый элемент имеет равный шанс попасть в выборку, а отбор одного не влияет на отбор другого. Только тогда x̄ — честная оценка μ.",
            "Simple random sampling: every member has an equal chance of selection and picking one does not change the odds for anyone else. Only then is x̄ an honest estimate of μ.",
          )}
        {mode === "frontrow" &&
          pick(
            "Пример #3 из учебника: заместитель учителя спрашивает 10 человек с первого ряда. Те, кто сидит впереди, обычно вовлечённее — и оценка класса завышена.",
            "Textbook Example #3: the substitute teacher asks the 10 students in the front row. Front-row students tend to be more engaged — so the class looks better than it is.",
          )}
        {mode === "volunteer" &&
          pick(
            "Пример #4: восемь добровольцев показывают, сколько «колёс» может сделать первокурсник. Те, кто не умеет, просто не вызвались — self-selection bias.",
            "Example #4: eight volunteers show how many cartwheels a freshman can do. Those who can't simply did not step forward — self-selection bias.",
          )}
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "success" | "danger";
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="text-[10px] font-semibold tracking-wide text-ink-dim">{label}</div>
      <div
        className={cn(
          "mt-1 font-mono text-xl font-semibold",
          tone === "success" && "text-success",
          tone === "danger" && "text-danger",
        )}
      >
        {value}
      </div>
      {hint ? <div className="text-[11px] text-ink-dim">{hint}</div> : null}
    </div>
  );
}
