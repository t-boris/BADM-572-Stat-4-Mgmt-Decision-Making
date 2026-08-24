import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { standardNormalCdf, standardNormalInv } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

const ROWS = Array.from({ length: 31 }, (_, i) => i / 10); // 0.0 … 3.0
const COLS = Array.from({ length: 10 }, (_, i) => i / 100); // 0.00 … 0.09

const EXAMPLES = [
  { z: 1.35, ru: "SAT 635", en: "SAT 635" },
  { z: -0.42, ru: "SAT 458", en: "SAT 458" },
  { z: 0.5, ru: "1005 при μ 1000", en: "1005 with μ 1000" },
  { z: 1.645, ru: "95-й процентиль", en: "95th percentile" },
];

/**
 * Lesson 2-6 — the standard normal table, made clickable. The course's table
 * prints P(Z ≤ z) and holds positive z only, so negative lookups have to go
 * through the symmetry trick; this panel walks that trick step by step.
 */
export default function ZTableLookup() {
  const { pick } = useI18n();
  const [z, setZ] = useState(1.35);
  const scroller = useRef<HTMLDivElement>(null);
  const activeCell = useRef<HTMLTableCellElement>(null);

  const abs = Math.abs(z);
  const clamped = Math.min(abs, 3.09);
  const row = Math.floor(clamped * 10) / 10;
  const col = Math.round((clamped - row) * 100) / 100;

  const tableValue = standardNormalCdf(row + col);
  const answer = z < 0 ? 1 - tableValue : tableValue;

  // Keep the highlighted cell in view: without this the table opens on row 0.0
  // and a lookup of z = 1.35 highlights something the reader cannot see.
  useEffect(() => {
    const box = scroller.current;
    const cell = activeCell.current;
    if (!box || !cell) return;
    const target =
      cell.offsetTop - box.clientHeight / 2 + cell.clientHeight / 2;
    box.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
  }, [row]);

  const steps = useMemo(() => {
    const rowLabel = row.toFixed(1);
    const colLabel = col.toFixed(2);
    if (z >= 0) {
      return [
        pick(
          `Разбейте z = ${z.toFixed(2)} на строку ${rowLabel} и столбец ${colLabel}.`,
          `Split z = ${z.toFixed(2)} into row ${rowLabel} and column ${colLabel}.`,
        ),
        pick(
          `На пересечении стоит ${tableValue.toFixed(4)} — это и есть P(Z ≤ ${z.toFixed(2)}), площадь слева.`,
          `Their intersection holds ${tableValue.toFixed(4)} — that is P(Z ≤ ${z.toFixed(2)}), the area to the left.`,
        ),
        pick(
          `Ответ: ${(answer * 100).toFixed(2)} % наблюдений лежат ниже этой точки.`,
          `Answer: ${(answer * 100).toFixed(2)} % of observations lie below this point.`,
        ),
      ];
    }
    return [
      pick(
        `z отрицательное, а таблица курса содержит только положительные значения. Возьмите модуль: |${z.toFixed(2)}| = ${abs.toFixed(2)}.`,
        `The z is negative and the course table holds positive values only. Take the absolute value: |${z.toFixed(2)}| = ${abs.toFixed(2)}.`,
      ),
      pick(
        `Найдите ${abs.toFixed(2)} в таблице: строка ${rowLabel}, столбец ${colLabel} → ${tableValue.toFixed(4)}. Это P(Z ≤ +${abs.toFixed(2)}), то есть НЕ то, что вам нужно.`,
        `Look up ${abs.toFixed(2)}: row ${rowLabel}, column ${colLabel} → ${tableValue.toFixed(4)}. That is P(Z ≤ +${abs.toFixed(2)}) — not what you asked for.`,
      ),
      pick(
        `Кривая симметрична, поэтому P(Z ≤ −${abs.toFixed(2)}) = P(Z ≥ +${abs.toFixed(2)}) = 1 − ${tableValue.toFixed(4)} = ${answer.toFixed(4)}.`,
        `The curve is symmetrical, so P(Z ≤ −${abs.toFixed(2)}) = P(Z ≥ +${abs.toFixed(2)}) = 1 − ${tableValue.toFixed(4)} = ${answer.toFixed(4)}.`,
      ),
    ];
  }, [z, abs, row, col, tableValue, answer, pick]);

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lesson 2-6 · z-таблица", "Lesson 2-6 · the z-table")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick(
              "Читаем таблицу стандартного нормального распределения",
              "Reading the standard normal table",
            )}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {EXAMPLES.map((e) => (
            <button
              key={e.z}
              type="button"
              onClick={() => setZ(e.z)}
              className="chip hover:text-ink"
            >
              z = {e.z} · {pick(e.ru, e.en)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="flex min-w-[260px] flex-1 items-center gap-3 text-xs">
          <span className="whitespace-nowrap text-ink-dim">z</span>
          <input
            type="range"
            min={-309}
            max={309}
            value={Math.round(z * 100)}
            onChange={(e) => setZ(Number(e.target.value) / 100)}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
          />
          <span className="w-14 text-right font-mono font-semibold">
            {z.toFixed(2)}
          </span>
        </label>
        <div className="rounded-lg border border-border bg-elevated px-3 py-1.5 font-mono text-xs">
          NORM.S.DIST({z.toFixed(2)}; 1) = {answer.toFixed(4)}
        </div>
      </div>

      <div
        ref={scroller}
        className="mt-4 max-h-[320px] overflow-auto rounded-xl border border-border"
      >
        <table className="w-full border-collapse text-[11px]">
          <thead className="sticky top-0 z-10 bg-muted text-ink-dim">
            <tr>
              <th className="sticky left-0 z-20 bg-muted px-2 py-1.5 text-left font-semibold">
                z
              </th>
              {COLS.map((c) => (
                <th
                  key={c}
                  className={cn(
                    "px-2 py-1.5 font-medium tabular-nums",
                    Math.abs(c - col) < 0.001 && "bg-accent/20 text-ink",
                  )}
                >
                  {c.toFixed(2)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => {
              const activeRow = Math.abs(r - row) < 0.001;
              return (
                <tr key={r} className="border-t border-border">
                  <th
                    className={cn(
                      "sticky left-0 z-10 bg-surface px-2 py-1 text-left font-semibold tabular-nums",
                      activeRow && "bg-accent/20",
                    )}
                  >
                    {r.toFixed(1)}
                  </th>
                  {COLS.map((c) => {
                    const hit = activeRow && Math.abs(c - col) < 0.001;
                    return (
                      <td
                        key={c}
                        ref={hit ? activeCell : undefined}
                        className={cn(
                          "px-2 py-1 text-center font-mono tabular-nums",
                          hit
                            ? "bg-accent font-bold text-white"
                            : activeRow || Math.abs(c - col) < 0.001
                              ? "bg-accent/10 text-ink"
                              : "text-ink-dim",
                        )}
                      >
                        {standardNormalCdf(r + c).toFixed(4)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ol className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <motion.li
            key={s}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-3 text-sm"
          >
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-bold text-white">
              {i + 1}
            </span>
            <span className="leading-relaxed">{s}</span>
          </motion.li>
        ))}
      </ol>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-3">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">
            P(Z ≤ {z.toFixed(2)})
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">
            {answer.toFixed(4)}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/40 p-3">
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">
            P(Z ≥ {z.toFixed(2)})
          </div>
          <div className="mt-0.5 font-mono text-lg font-semibold">
            {(1 - answer).toFixed(4)}
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-border bg-elevated p-3 text-xs leading-relaxed">
        <span className="font-semibold">
          {pick("Обратный ход: ", "Running it backwards: ")}
        </span>
        {pick(
          `чтобы найти z по вероятности, ищите в теле таблицы ближайшее значение. Для 0,9500 точного нет: 0,9495 даёт z = 1,64, а 0,9505 — z = 1,65, поэтому интерполируют до z = 1,645. NORM.S.INV(0,95) возвращает ${standardNormalInv(0.95).toFixed(6)} — практически то же.`,
          `to find z from a probability, hunt for the nearest value in the table's body. For 0.9500 there is no exact entry: 0.9495 gives z = 1.64 and 0.9505 gives z = 1.65, so you interpolate to z = 1.645. NORM.S.INV(0.95) returns ${standardNormalInv(0.95).toFixed(6)} — near enough the same.`,
        )}
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-ink-dim">
        {pick(
          "Первое правило работы с любой z-таблицей — прочитать легенду. Бывают кумулятивные таблицы, таблицы «от 0 до z» и таблицы одного хвоста; ответы у них разные. Здесь значение — это P(Z ≤ z), площадь слева.",
          "The first rule with any z-table is to read the legend. There are cumulative tables, '0 to z' tables and one-tail tables, and they give different answers. Here the entry is P(Z ≤ z), the area to the left.",
        )}
      </p>
    </div>
  );
}
