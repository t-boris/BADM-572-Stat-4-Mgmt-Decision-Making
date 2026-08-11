import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { ADVERTISING_SALES, EXPORT_TREND_INDEX } from "@/data/datasets";
import { correlation, linearFit } from "@/lib/statUtils";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/cn";

/**
 * Lesson 1-5: two paired variables → scatter plot; when X is time the same
 * chart is called a time series. The trendline toggle mirrors Excel's
 * "Chart elements → Trendline" checkbox.
 */
export default function ScatterExplorer() {
  const { pick } = useI18n();
  const [swapAxes, setSwapAxes] = useState(false);
  const [trend, setTrend] = useState(false);

  const xs = ADVERTISING_SALES.map((d) => d.advertising);
  const ys = ADVERTISING_SALES.map((d) => d.sales);
  const r = useMemo(() => correlation(xs, ys), [xs, ys]);
  const fit = useMemo(() => linearFit(xs, ys), [xs, ys]);

  const points = ADVERTISING_SALES.map((d) => ({
    x: swapAxes ? d.sales : d.advertising,
    y: swapAxes ? d.advertising : d.sales,
  }));

  const trendPoints = useMemo(() => {
    const lo = Math.min(...xs);
    const hi = Math.max(...xs);
    return [
      { x: lo, y: fit.intercept + fit.slope * lo },
      { x: hi, y: fit.intercept + fit.slope * hi },
    ];
  }, [xs, fit]);

  const tooltipStyle = {
    background: "rgb(var(--surface))",
    border: "1px solid rgb(var(--border))",
    borderRadius: 12,
    fontSize: 12,
    color: "rgb(var(--ink))",
  };

  return (
    <div className="card p-5">
      <div className="text-[11px] uppercase tracking-widest text-ink-dim">
        {pick("Lesson 1-5 · диаграмма рассеяния", "Lesson 1-5 · scatter plot")}
      </div>
      <h4 className="mt-1 font-display text-base font-semibold">
        {pick(
          "Две переменные, одна пара точек",
          "Two variables, one paired point",
        )}
      </h4>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setSwapAxes((s) => !s)}
          className={cn("btn-secondary h-9 px-3 text-xs", swapAxes && "border-warning/60")}
        >
          {swapAxes
            ? pick("Оси перепутаны — вернуть", "Axes swapped — put them back")
            : pick("Поменять оси местами", "Swap the axes")}
        </button>
        <button
          type="button"
          onClick={() => setTrend((t) => !t)}
          className="btn-secondary h-9 px-3 text-xs"
        >
          {trend
            ? pick("Скрыть линию тренда", "Hide trendline")
            : pick("Показать линию тренда", "Show trendline")}
        </button>
        <span className="chip">r = {r.toFixed(3)}</span>
      </div>

      <div className="mt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 16, bottom: 34, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
            <XAxis
              type="number"
              dataKey="x"
              name={swapAxes ? "Sales" : "Advertising"}
              tick={{ fontSize: 11, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
              label={{
                value: swapAxes
                  ? pick("Продажи, тыс. $ (зависимая!)", "Sales, $k (the dependent one!)")
                  : pick("Бюджет на рекламу, тыс. $", "Advertising budget, $k"),
                position: "insideBottom",
                offset: -20,
                fontSize: 11,
                fill: "rgb(var(--ink-dim))",
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              tick={{ fontSize: 11, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
              label={{
                value: swapAxes
                  ? pick("Реклама, тыс. $", "Advertising, $k")
                  : pick("Продажи, тыс. $", "Sales, $k"),
                angle: -90,
                position: "insideLeft",
                fontSize: 11,
                fill: "rgb(var(--ink-dim))",
              }}
            />
            <ZAxis range={[45, 45]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={tooltipStyle} />
            <Scatter data={points} fill="rgb(var(--m3))" isAnimationActive />
            {trend && !swapAxes && (
              <Scatter
                data={trendPoints}
                line={{ stroke: "rgb(var(--warning))", strokeWidth: 2 }}
                shape={() => <g />}
                legendType="none"
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs text-ink-dim">
        {swapAxes
          ? pick(
              "Ось X должна нести независимую переменную (то, чем управляет менеджер — бюджет), ось Y — зависимую (продажи). Перепутанные оси не «ломают» математику, но ломают смысл: график начинает утверждать, что продажи объясняют рекламу.",
              "The X axis carries the independent variable (what the manager controls — the budget); Y carries the dependent one (sales). Swapping them does not break the maths, it breaks the meaning: the chart now claims sales explain advertising.",
            )
          : pick(
              `Точки идут снизу-слева вверх-вправо: с ростом рекламного бюджета продажи растут. Коэффициент корреляции r = ${r.toFixed(2)}. Но корреляция — это ещё не причинно-следственная связь; проверка значимости связи — тема следующего курса (регрессия).`,
              `The cloud runs from bottom-left to top-right: as the advertising budget grows, sales grow. The correlation is r = ${r.toFixed(2)}. Correlation is not causation, though; testing the significance of the relationship is the next course's topic (regression).`,
            )}
      </p>

      <hr className="my-5 border-border" />

      <div className="text-[11px] uppercase tracking-widest text-ink-dim">
        {pick("Тот же график, но X — время", "The same chart, but X is time")}
      </div>
      <h5 className="mt-1 text-sm font-semibold">
        {pick("Временной ряд (time series)", "Time series")}
      </h5>
      <div className="mt-3 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={EXPORT_TREND_INDEX} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
            />
            <YAxis
              tick={{ fontSize: 10, fill: "rgb(var(--ink-dim))" }}
              stroke="rgb(var(--border))"
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="index"
              stroke="rgb(var(--m6))"
              strokeWidth={2}
              dot={{ r: 2.5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-ink-dim">
        {pick(
          "Форма как в лекции: 1992–1999 рост почти плоский, с 2000 года — устойчивый, близкий к линейному. Линейный график уместен именно потому, что ось X упорядочена (годы). Для категорий (виды карточных игр, модели пикапов) линия создаёт ложное впечатление порядка.",
          "The shape from the lecture: 1992–1999 growth is nearly flat, from 2000 it is steady and close to linear. A line graph is appropriate precisely because the X axis is ordered (years). For categories (card games, truck models) a line falsely implies an ordering.",
        )}
      </p>
      <p className="mt-1.5 text-[11px] text-ink-dim">
        {pick(
          "Данные обоих графиков иллюстративные: MOOC показывает форму зависимости, но не публикует исходные строки. Индекс: 1992 = 100.",
          "Both datasets here are illustrative: the MOOC shows the shape but does not publish the underlying rows. Index: 1992 = 100.",
        )}
      </p>
    </div>
  );
}
