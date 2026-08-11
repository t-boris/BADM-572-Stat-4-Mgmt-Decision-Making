/**
 * Small, dependency-free statistics helpers used by the Module 1
 * visualizations and the data lab. Everything here mirrors what the course
 * does in Excel (MIN / MAX / COUNT / FREQUENCY / COUNTIF).
 */

export interface Bin {
  /** Lower edge (exclusive for every bin except the first). */
  lower: number;
  /** Upper edge (inclusive) — Excel's FREQUENCY treats bins this way. */
  upper: number;
  label: string;
  frequency: number;
  relative: number;
  cumulative: number;
}

export function mean(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function min(values: number[]): number {
  return values.reduce((a, b) => (b < a ? b : a), Infinity);
}

export function max(values: number[]): number {
  return values.reduce((a, b) => (b > a ? b : a), -Infinity);
}

/** Sturges' rule: k ≈ 1 + log2(N). */
export function sturgesBins(n: number): number {
  if (n <= 1) return 1;
  return Math.max(1, Math.round(1 + Math.log2(n)));
}

/** Rice rule: k = 2 · N^(1/3). Recommended by OnlineStatBook over Sturges. */
export function riceBins(n: number): number {
  if (n <= 1) return 1;
  return Math.max(1, Math.round(2 * Math.cbrt(n)));
}

function roundTo(value: number, decimals: number): number {
  const p = 10 ** decimals;
  return Math.round(value * p) / p;
}

/** Format a bin edge with just enough precision to stay readable. */
export function formatEdge(value: number, width: number): string {
  if (width >= 10) return String(Math.round(value));
  if (width >= 1) return String(roundTo(value, 1));
  if (width >= 0.1) return String(roundTo(value, 2));
  return String(roundTo(value, 4));
}

/**
 * Excel-style binning: bin k holds observations with
 * `lower < x ≤ upper` (the first bin also includes its lower edge).
 */
export function makeBins(values: number[], binCount: number): Bin[] {
  const clean = values.filter((v) => Number.isFinite(v));
  if (!clean.length || binCount < 1) return [];

  const lo = min(clean);
  const hi = max(clean);
  const span = hi - lo || 1;
  const width = span / binCount;

  const bins: Bin[] = Array.from({ length: binCount }, (_, i) => {
    const lower = lo + i * width;
    const upper = i === binCount - 1 ? hi : lo + (i + 1) * width;
    return {
      lower,
      upper,
      label: `${formatEdge(lower, width)}–${formatEdge(upper, width)}`,
      frequency: 0,
      relative: 0,
      cumulative: 0,
    };
  });

  for (const v of clean) {
    let idx = Math.ceil((v - lo) / width) - 1;
    if (v === lo) idx = 0;
    if (idx < 0) idx = 0;
    if (idx > binCount - 1) idx = binCount - 1;
    bins[idx].frequency += 1;
  }

  let running = 0;
  for (const b of bins) {
    running += b.frequency;
    b.relative = b.frequency / clean.length;
    b.cumulative = running;
  }
  return bins;
}

/** Bins with a fixed width starting at 0 — the lecture's "30-second bins". */
export function makeFixedBins(values: number[], width: number, start = 0): Bin[] {
  const clean = values.filter((v) => Number.isFinite(v));
  if (!clean.length || width <= 0) return [];
  const hi = max(clean);
  const count = Math.max(1, Math.ceil((hi - start) / width));

  const bins: Bin[] = Array.from({ length: count }, (_, i) => {
    const lower = start + i * width;
    const upper = start + (i + 1) * width;
    return {
      lower,
      upper,
      label: formatEdge(upper, width),
      frequency: 0,
      relative: 0,
      cumulative: 0,
    };
  });

  for (const v of clean) {
    let idx = Math.ceil((v - start) / width) - 1;
    if (v <= start) idx = 0;
    if (idx < 0) idx = 0;
    if (idx > count - 1) idx = count - 1;
    bins[idx].frequency += 1;
  }

  let running = 0;
  for (const b of bins) {
    running += b.frequency;
    b.relative = b.frequency / clean.length;
    b.cumulative = running;
  }
  return bins;
}

export interface CategoryCount {
  category: string;
  count: number;
  relative: number;
}

/** The COUNTIF + relative-frequency table for qualitative data. */
export function countCategories(labels: string[]): CategoryCount[] {
  const map = new Map<string, number>();
  for (const raw of labels) {
    const key = raw.trim();
    if (!key) continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  const total = Array.from(map.values()).reduce((a, b) => a + b, 0) || 1;
  return Array.from(map.entries())
    .map(([category, count]) => ({ category, count, relative: count / total }))
    .sort((a, b) => b.count - a.count);
}

/** Parse a free-form textarea into numbers (comma / space / newline separated). */
export function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,;]+/)
    .map((s) => s.replace(",", "."))
    .filter(Boolean)
    .map(Number)
    .filter((v) => Number.isFinite(v));
}

/** Parse a free-form textarea into category labels (one per line). */
export function parseLabels(text: string): string[] {
  return text
    .split(/[\n;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Pearson correlation — used to annotate the scatter-plot explorer. */
export function correlation(xs: number[], ys: number[]): number {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return 0;
  const mx = mean(xs.slice(0, n));
  const my = mean(ys.slice(0, n));
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < n; i++) {
    const a = xs[i] - mx;
    const b = ys[i] - my;
    num += a * b;
    dx += a * a;
    dy += b * b;
  }
  const den = Math.sqrt(dx * dy);
  return den === 0 ? 0 : num / den;
}

/** Least-squares line, for the optional Excel "trendline" toggle. */
export function linearFit(
  xs: number[],
  ys: number[],
): { slope: number; intercept: number } {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return { slope: 0, intercept: 0 };
  const mx = mean(xs.slice(0, n));
  const my = mean(ys.slice(0, n));
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    den += (xs[i] - mx) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  return { slope, intercept: my - slope * mx };
}

export function toPercent(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

/**
 * Deterministic pseudo-random generator (mulberry32). Used to rebuild the
 * lecture datasets from their published frequency tables without pulling in a
 * dependency and without changing on every render.
 */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
