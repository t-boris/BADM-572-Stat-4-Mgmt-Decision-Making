import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, FlaskConical } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import {
  WAITING_TIMES,
  PSYCH_TEST_SCORES,
  TRUCK_SALES,
  IMAC_PURCHASES,
} from "@/data/datasets";
import {
  countCategories,
  makeBins,
  max as vMax,
  mean as vMean,
  min as vMin,
  parseLabels,
  parseNumbers,
  riceBins,
  sturgesBins,
  toPercent,
} from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Preset = "waiting" | "psych" | "trucks" | "imac" | "custom";
type ChartKind = "histogram" | "bar" | "pie";

const PALETTE = [
  "rgb(var(--m1))",
  "rgb(var(--m2))",
  "rgb(var(--m3))",
  "rgb(var(--m4))",
  "rgb(var(--accent))",
  "rgb(var(--warning))",
  "rgb(var(--danger))",
  "rgb(var(--success))",
  "rgb(var(--ink-dim))",
];

const PRESETS: { id: Preset; ru: string; en: string; numeric: boolean }[] = [
  { id: "waiting", ru: "Время ожидания, 500 набл.", en: "Waiting time, 500 obs.", numeric: true },
  { id: "psych", ru: "Баллы теста, 642 набл.", en: "Test scores, 642 obs.", numeric: true },
  { id: "trucks", ru: "Продажи пикапов, 11 категорий", en: "Pickup sales, 11 categories", numeric: false },
  { id: "imac", ru: "Покупатели iMac, 3 категории", en: "iMac buyers, 3 categories", numeric: false },
  { id: "custom", ru: "Свои данные", en: "Your data", numeric: true },
];

export default function DataLabPage() {
  const { t, pick } = useI18n();
  const [preset, setPreset] = useState<Preset>("waiting");
  const [raw, setRaw] = useState("12, 15, 15, 18, 21, 23, 23, 24, 27, 31, 33, 34, 39, 42, 47");
  const [chart, setChart] = useState<ChartKind>("histogram");
  const [bins, setBins] = useState(10);

  const numericPreset = PRESETS.find((p) => p.id === preset)!.numeric;

  const numbers = useMemo(() => {
    if (preset === "waiting") return WAITING_TIMES;
    if (preset === "psych") return PSYCH_TEST_SCORES;
    if (preset === "custom") return parseNumbers(raw);
    return [];
  }, [preset, raw]);

  const categories = useMemo(() => {
    if (preset === "trucks")
      return TRUCK_SALES.flatMap((r) => Array<string>(1).fill(r.model)).map((m) => m);
    if (preset === "imac") return IMAC_PURCHASES.map((r) => pick(r.categoryRu, r.category));
    if (preset === "custom" && numbers.length === 0) return parseLabels(raw);
    return [];
  }, [preset, raw, numbers.length, pick]);

  /** For the two categorical presets the counts are already aggregated. */
  const categoryRows = useMemo(() => {
    if (preset === "trucks") {
      const total = TRUCK_SALES.reduce((a, b) => a + b.count, 0);
      return TRUCK_SALES.map((r) => ({
        category: r.model,
        count: r.count,
        relative: r.count / total,
      }));
    }
    if (preset === "imac") {
      const total = IMAC_PURCHASES.reduce((a, b) => a + b.count, 0);
      return IMAC_PURCHASES.map((r) => ({
        category: pick(r.categoryRu, r.category),
        count: r.count,
        relative: r.count / total,
      }));
    }
    return countCategories(categories);
  }, [preset, categories, pick]);

  const isNumeric = numericPreset && numbers.length > 0;
  const binned = useMemo(
    () => (isNumeric ? makeBins(numbers, bins) : []),
    [isNumeric, numbers, bins],
  );

  const effectiveChart: ChartKind = isNumeric
    ? chart === "histogram"
      ? "histogram"
      : chart
    : chart === "histogram"
      ? "bar"
      : chart;

  const chartData = isNumeric
    ? binned.map((b) => ({ name: b.label, value: b.frequency, share: b.relative }))
    : categoryRows.map((r) => ({
        name: r.category,
        value: r.count,
        share: r.relative,
      }));

  const invalid =
    preset === "custom" && numbers.length === 0 && categoryRows.length === 0;

  const downloadCsv = () => {
    const header = isNumeric
      ? "interval,frequency,relative_frequency,cumulative\n"
      : "category,frequency,relative_frequency\n";
    const body = isNumeric
      ? binned
          .map((b) => `"${b.label}",${b.frequency},${b.relative.toFixed(4)},${b.cumulative}`)
          .join("\n")
      : categoryRows
          .map((r) => `"${r.category}",${r.count},${r.relative.toFixed(4)}`)
          .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frequency-table.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const tooltipStyle = {
    background: "rgb(var(--surface))",
    border: "1px solid rgb(var(--border))",
    borderRadius: 12,
    fontSize: 12,
    color: "rgb(var(--ink))",
  };

  return (
    <PageTransition>
      <header>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <FlaskConical size={26} className="text-accent" /> {t("labTitle")}
        </h1>
        <p className="mt-1.5 max-w-3xl text-sm text-ink-dim">{t("labLead")}</p>
      </header>

      <section className="card mt-6 p-5">
        <div className="text-sm font-semibold">{t("labDataset")}</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPreset(p.id)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                preset === p.id
                  ? "border-transparent bg-accent text-white"
                  : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
              )}
            >
              {pick(p.ru, p.en)}
            </button>
          ))}
        </div>

        {preset === "custom" && (
          <div className="mt-4">
            <label className="text-xs font-medium text-ink-dim" htmlFor="lab-input">
              {t("labPaste")}
            </label>
            <textarea
              id="lab-input"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              rows={5}
              className="input mt-1.5 font-mono text-xs"
            />
            <p className="mt-1 text-[11px] text-ink-dim">{t("labPasteHint")}</p>
          </div>
        )}
      </section>

      {invalid ? (
        <div className="card mt-4 p-5 text-sm text-danger">{t("labInvalid")}</div>
      ) : (
        <>
          <section className="card mt-4 p-5">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-1.5">
                {(["histogram", "bar", "pie"] as ChartKind[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={c === "histogram" && !isNumeric}
                    onClick={() => setChart(c)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-40",
                      effectiveChart === c
                        ? "border-transparent bg-accent text-white"
                        : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
                    )}
                  >
                    {c === "histogram"
                      ? pick("Гистограмма", "Histogram")
                      : c === "bar"
                        ? pick("Столбчатая", "Bar")
                        : pick("Круговая", "Pie")}
                  </button>
                ))}
              </div>

              {isNumeric && effectiveChart === "histogram" && (
                <label className="flex min-w-[220px] flex-1 items-center gap-3 text-xs">
                  <span className="whitespace-nowrap text-ink-dim">{t("labBins")}</span>
                  <input
                    type="range"
                    min={2}
                    max={40}
                    value={bins}
                    onChange={(e) => setBins(Number(e.target.value))}
                    className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-accent"
                  />
                  <span className="w-8 text-right font-mono font-semibold">{bins}</span>
                </label>
              )}

              <button
                type="button"
                onClick={downloadCsv}
                className="btn-secondary h-9 px-3 text-xs"
              >
                <Download size={14} /> {t("labDownloadCsv")}
              </button>
            </div>

            {isNumeric && (
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                <button
                  type="button"
                  className="chip hover:text-ink"
                  onClick={() => setBins(sturgesBins(numbers.length))}
                >
                  Sturges: {sturgesBins(numbers.length)}
                </button>
                <button
                  type="button"
                  className="chip hover:text-ink"
                  onClick={() => setBins(riceBins(numbers.length))}
                >
                  Rice: {riceBins(numbers.length)}
                </button>
              </div>
            )}

            <div className="mt-4 h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {effectiveChart === "pie" ? (
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={110}
                      paddingAngle={1}
                    >
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                      ))}
                    </Pie>
                    <Legend wrapperStyle={{ fontSize: 10, color: "rgb(var(--ink-dim))" }} />
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                ) : (
                  <BarChart
                    data={chartData}
                    barCategoryGap={effectiveChart === "histogram" ? 1 : "10%"}
                    margin={{ top: 8, right: 8, left: 0, bottom: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgb(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      angle={-35}
                      textAnchor="end"
                      interval={chartData.length > 20 ? 1 : 0}
                      height={70}
                      tick={{ fontSize: 9, fill: "rgb(var(--ink-dim))" }}
                      stroke="rgb(var(--border))"
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "rgb(var(--ink-dim))" }}
                      stroke="rgb(var(--border))"
                    />
                    <Tooltip
                      cursor={{ fill: "rgb(var(--muted) / 0.5)" }}
                      contentStyle={tooltipStyle}
                    />
                    <Bar
                      dataKey="value"
                      radius={effectiveChart === "histogram" ? [2, 2, 0, 0] : [6, 6, 0, 0]}
                    >
                      {chartData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={
                            effectiveChart === "histogram"
                              ? "rgb(var(--m2))"
                              : PALETTE[i % PALETTE.length]
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="card p-5">
              <div className="text-sm font-semibold">{t("labSummary")}</div>
              <dl className="mt-3 space-y-2 text-xs">
                <Row label={t("labCount")} value={(isNumeric ? numbers.length : categoryRows.reduce((a, b) => a + b.count, 0)).toLocaleString()} />
                {isNumeric && (
                  <>
                    <Row label={t("labMin")} value={vMin(numbers).toFixed(2)} />
                    <Row label={t("labMax")} value={vMax(numbers).toFixed(2)} />
                    <Row label={t("labMean")} value={vMean(numbers).toFixed(2)} />
                    <Row
                      label={t("labBinWidth")}
                      value={((vMax(numbers) - vMin(numbers)) / bins).toFixed(2)}
                    />
                  </>
                )}
                {!isNumeric && (
                  <Row label={t("category")} value={String(categoryRows.length)} />
                )}
              </dl>
            </div>

            <div className="card overflow-hidden">
              <div className="border-b border-border px-5 py-3 text-sm font-semibold">
                {t("labFreqTable")}
              </div>
              <div className="max-h-[420px] overflow-auto">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-muted/90 text-left uppercase tracking-wider text-ink-dim backdrop-blur">
                    <tr>
                      <th className="px-4 py-2 font-medium">
                        {isNumeric ? t("interval") : t("category")}
                      </th>
                      <th className="px-4 py-2 text-right font-medium">{t("frequency")}</th>
                      <th className="px-4 py-2 text-right font-medium">
                        {t("relativeFrequency")}
                      </th>
                      {isNumeric && (
                        <th className="px-4 py-2 text-right font-medium">
                          {t("cumulative")}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {isNumeric
                      ? binned.map((b) => (
                          <tr key={b.label} className="border-t border-border">
                            <td className="px-4 py-1.5 font-mono">{b.label}</td>
                            <td className="px-4 py-1.5 text-right font-mono">
                              {b.frequency}
                            </td>
                            <td className="px-4 py-1.5 text-right font-mono">
                              {toPercent(b.relative, 1)}
                            </td>
                            <td className="px-4 py-1.5 text-right font-mono text-ink-dim">
                              {b.cumulative}
                            </td>
                          </tr>
                        ))
                      : categoryRows.map((r) => (
                          <tr key={r.category} className="border-t border-border">
                            <td className="px-4 py-1.5">{r.category}</td>
                            <td className="px-4 py-1.5 text-right font-mono">{r.count}</td>
                            <td className="px-4 py-1.5 text-right font-mono">
                              {toPercent(r.relative, 1)}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      )}
    </PageTransition>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-1.5 last:border-0">
      <dt className="text-ink-dim">{label}</dt>
      <dd className="font-mono font-semibold">{value}</dd>
    </div>
  );
}
