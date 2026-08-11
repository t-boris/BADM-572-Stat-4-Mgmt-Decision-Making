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
import { IMAC_PURCHASES, TRUCK_SALES, TRUCK_TOTAL, DESSERT_PREFERENCE } from "@/data/datasets";
import { toPercent } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

type Source = "imac" | "trucks" | "dessert";

const PALETTE = [
  "rgb(var(--m1))",
  "rgb(var(--m2))",
  "rgb(var(--m3))",
  "rgb(var(--m4))",
  "rgb(var(--accent))",
  "rgb(var(--m5))",
  "rgb(var(--m6))",
  "rgb(var(--m7))",
  "rgb(var(--m8))",
  "rgb(var(--ink-dim))",
  "rgb(var(--warning))",
];

/**
 * Lesson 1-4: pie vs bar for the same categorical data, plus the "pie of pie"
 * idea — collapse everything below a threshold into one "all other" slice so
 * the chart stops being crowded.
 */
export default function PieVsBar() {
  const { pick, t } = useI18n();
  const [source, setSource] = useState<Source>("imac");
  const [collapse, setCollapse] = useState(false);

  const data = useMemo(() => {
    if (source === "imac") {
      const total = IMAC_PURCHASES.reduce((a, b) => a + b.count, 0);
      return IMAC_PURCHASES.map((r) => ({
        name: pick(r.categoryRu, r.category),
        value: r.count,
        share: r.count / total,
      }));
    }
    if (source === "dessert") {
      return DESSERT_PREFERENCE.map((r) => ({
        name: pick(r.categoryRu, r.category),
        value: Math.round(r.share * 1000),
        share: r.share,
      }));
    }
    const rows = TRUCK_SALES.map((r) => ({
      name: r.model,
      value: r.count,
      share: r.count / TRUCK_TOTAL,
    }));
    if (!collapse) return rows;
    const big = rows.filter((r) => r.share >= 0.1);
    const smallShare = rows
      .filter((r) => r.share < 0.1)
      .reduce((a, b) => a + b.share, 0);
    const smallValue = rows
      .filter((r) => r.share < 0.1)
      .reduce((a, b) => a + b.value, 0);
    return [
      ...big,
      {
        name: pick("Все остальные модели", "All other models"),
        value: smallValue,
        share: smallShare,
      },
    ];
  }, [source, collapse, pick]);

  const tooltipStyle = {
    background: "rgb(var(--surface))",
    border: "1px solid rgb(var(--border))",
    borderRadius: 12,
    fontSize: 12,
    color: "rgb(var(--ink))",
  };

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-dim">
            {pick("Lesson 1-4 · круговая vs столбчатая", "Lesson 1-4 · pie vs bar")}
          </div>
          <h4 className="mt-1 font-display text-base font-semibold">
            {pick(
              "Одни и те же данные, два разных сообщения",
              "The same data, two different messages",
            )}
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <SrcBtn active={source === "imac"} onClick={() => setSource("imac")}>
            {pick("Покупатели iMac (1998)", "iMac buyers (1998)")}
          </SrcBtn>
          <SrcBtn active={source === "dessert"} onClick={() => setSource("dessert")}>
            {pick("Десерты (2008)", "Desserts (2008)")}
          </SrcBtn>
          <SrcBtn active={source === "trucks"} onClick={() => setSource("trucks")}>
            {pick("Пикапы (2015)", "Pickups (2015)")}
          </SrcBtn>
        </div>
      </div>

      {source === "trucks" && (
        <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-ink-dim">
          <input
            type="checkbox"
            checked={collapse}
            onChange={(e) => setCollapse(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          {pick(
            "«Pie of pie»: свернуть всё, что меньше 10 %, в одну категорию",
            "'Pie of pie': collapse everything below 10% into one slice",
          )}
        </label>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border p-3">
          <div className="mb-1 text-xs font-medium text-ink-dim">
            {pick("Круговая диаграмма", "Pie chart")}
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={90}
                  paddingAngle={1}
                  isAnimationActive
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{ fontSize: 10, color: "rgb(var(--ink-dim))" }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number, _n, entry) =>
                    `${v.toLocaleString()} · ${toPercent(
                      (entry?.payload as { share: number }).share,
                      1,
                    )}`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border p-3">
          <div className="mb-1 text-xs font-medium text-ink-dim">
            {pick("Столбчатая диаграмма", "Bar chart")}
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 56 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgb(var(--border))"
                />
                <XAxis
                  dataKey="name"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={64}
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
                  formatter={(v: number) => v.toLocaleString()}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted/60 text-left uppercase tracking-wider text-ink-dim">
            <tr>
              <th className="px-3 py-2 font-medium">{t("category")}</th>
              <th className="px-3 py-2 text-right font-medium">{t("frequency")}</th>
              <th className="px-3 py-2 text-right font-medium">{t("share")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.name} className="border-t border-border">
                <td className="px-3 py-1.5">{r.name}</td>
                <td className="px-3 py-1.5 text-right font-mono">
                  {r.value.toLocaleString()}
                </td>
                <td className="px-3 py-1.5 text-right font-mono">
                  {toPercent(r.share, 1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-ink-dim">
        {pick(
          "Круговая диаграмма отвечает на вопрос «какая доля от целого?» — все категории вместе дают 100 %. Столбчатая отвечает на вопрос «сколько именно?» и позволяет читать абсолютные значения и порядок. Выбирайте по тому, что хотите сообщить.",
          "A pie chart answers 'what share of the whole?' — the categories together are 100%. A bar chart answers 'how many exactly?' and lets you read absolute values and rank order. Choose by what you want to communicate.",
        )}
      </p>
      <p className="mt-1.5 text-[11px] text-ink-dim">
        {source === "imac" &&
          pick(
            "Источник: OnlineStatBook, опрос 500 покупателей iMac (Apple, 1998).",
            "Source: OnlineStatBook, survey of 500 iMac buyers (Apple, 1998).",
          )}
        {source === "dessert" &&
          pick(
            "Источник: опрос Crisco / American Pie Council, 2008.",
            "Source: Crisco / American Pie Council survey, 2008.",
          )}
        {source === "trucks" &&
          pick(
            "Источник: Cain, T. (2015) — продажи пикапов в США, август 2015.",
            "Source: Cain, T. (2015) — US pickup truck sales, August 2015.",
          )}
      </p>
    </div>
  );
}

function SrcBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-transparent bg-accent text-white"
          : "border-border bg-surface text-ink-dim hover:bg-muted hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
