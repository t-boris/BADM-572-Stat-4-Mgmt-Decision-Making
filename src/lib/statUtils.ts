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

/* -------------------------------------------------------------------------- */
/*  Module 2 — descriptive statistics and the normal distribution.            */
/*  Mirrors the Excel functions the course uses: MEDIAN, STDEV.S, STDEV.P,    */
/*  SUMPRODUCT, NORM.DIST, NORM.S.DIST, NORM.INV, NORM.S.INV.                 */
/* -------------------------------------------------------------------------- */

/** Excel MEDIAN: middle value, or the average of the two middle values. */
export function median(values: number[]): number {
  const clean = values.filter((v) => Number.isFinite(v)).sort((a, b) => a - b);
  if (!clean.length) return 0;
  const mid = Math.floor(clean.length / 2);
  return clean.length % 2 === 1
    ? clean[mid]
    : (clean[mid - 1] + clean[mid]) / 2;
}

/** Excel VAR.S — divides by n − 1 (the lecture's sample variance s²). */
export function sampleVariance(values: number[]): number {
  const clean = values.filter((v) => Number.isFinite(v));
  if (clean.length < 2) return 0;
  const m = mean(clean);
  return clean.reduce((a, v) => a + (v - m) ** 2, 0) / (clean.length - 1);
}

/** Excel VAR.P — divides by N (the lecture's population variance σ²). */
export function populationVariance(values: number[]): number {
  const clean = values.filter((v) => Number.isFinite(v));
  if (!clean.length) return 0;
  const m = mean(clean);
  return clean.reduce((a, v) => a + (v - m) ** 2, 0) / clean.length;
}

/** Excel STDEV.S. */
export function sampleStdDev(values: number[]): number {
  return Math.sqrt(sampleVariance(values));
}

/** Excel STDEV.P. */
export function populationStdDev(values: number[]): number {
  return Math.sqrt(populationVariance(values));
}

/** Largest minus smallest — the lecture's crudest measure of dispersion. */
export function range(values: number[]): number {
  const clean = values.filter((v) => Number.isFinite(v));
  if (!clean.length) return 0;
  return max(clean) - min(clean);
}

/** z = (x − μ) / σ. Returns 0 when σ is 0 so the UI never shows NaN. */
export function zScore(x: number, mu: number, sigma: number): number {
  return sigma === 0 ? 0 : (x - mu) / sigma;
}

/** x = μ + zσ — the z formula solved for the value (Lesson 2-5.7). */
export function valueFromZ(z: number, mu: number, sigma: number): number {
  return mu + z * sigma;
}

/**
 * Standard normal CDF Φ(z) = P(Z ≤ z), i.e. Excel's NORM.S.DIST(z, 1).
 * Uses an Abramowitz & Stegun 7.1.26 error-function approximation; the
 * absolute error stays below 1.5e-7, well past the four decimals the
 * course's z-table prints.
 */
export function standardNormalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

/** Excel NORM.DIST(x, mean, sd, 1). */
export function normalCdf(x: number, mu: number, sigma: number): number {
  return standardNormalCdf(zScore(x, mu, sigma));
}

/** Standard normal density φ(z) — used to draw the bell curve. */
export function standardNormalPdf(z: number): number {
  return Math.exp(-(z * z) / 2) / Math.sqrt(2 * Math.PI);
}

/** Normal density with an arbitrary μ and σ. */
export function normalPdf(x: number, mu: number, sigma: number): number {
  if (sigma <= 0) return 0;
  return standardNormalPdf(zScore(x, mu, sigma)) / sigma;
}

/**
 * Inverse standard normal Φ⁻¹(p), i.e. Excel's NORM.S.INV(p).
 * Acklam's rational approximation, refined by one Halley step against
 * standardNormalCdf so NORM.S.INV(0.95) lands on 1.6449 exactly enough.
 */
export function standardNormalInv(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;

  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.38357751867269e2, -3.066479806614716e1, 2.506628277459239,
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838,
    -2.549732539343734, 4.374664141464968, 2.938163982698783,
  ];
  const d = [
    7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996,
    3.754408661907416,
  ];

  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  let x: number;

  if (p < pLow) {
    const q = Math.sqrt(-2 * Math.log(p));
    x =
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else if (p <= pHigh) {
    const q = p - 0.5;
    const r = q * q;
    x =
      ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) *
        q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    x = -(
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }

  // One Halley refinement against the CDF above.
  const e = standardNormalCdf(x) - p;
  const u = e * Math.sqrt(2 * Math.PI) * Math.exp((x * x) / 2);
  return x - u / (1 + (x * u) / 2);
}

/** Excel NORM.INV(p, mean, sd). */
export function normalInv(p: number, mu: number, sigma: number): number {
  return mu + sigma * standardNormalInv(p);
}

/** One row of a discrete probability distribution (Lesson 2-4). */
export interface DiscreteOutcome {
  value: number;
  frequency: number;
  probability: number;
  cumulative: number;
}

/** Turn an outcome/frequency table into probabilities and a CDF. */
export function discreteDistribution(
  rows: { value: number; frequency: number }[],
): DiscreteOutcome[] {
  const total = rows.reduce((a, r) => a + r.frequency, 0) || 1;
  let running = 0;
  return rows.map((r) => {
    const probability = r.frequency / total;
    running += probability;
    return {
      value: r.value,
      frequency: r.frequency,
      probability,
      cumulative: running,
    };
  });
}

/** E(X) = Σ x·p(x) — exactly Excel's SUMPRODUCT of the two columns. */
export function expectedValue(rows: DiscreteOutcome[]): number {
  return rows.reduce((a, r) => a + r.value * r.probability, 0);
}

/** σ = √Σ(x − μ)²·p(x) for a discrete random variable. */
export function discreteStdDev(rows: DiscreteOutcome[]): number {
  const mu = expectedValue(rows);
  return Math.sqrt(
    rows.reduce((a, r) => a + (r.value - mu) ** 2 * r.probability, 0),
  );
}

/**
 * Percentile rank: the share of observations strictly below `x`, which is
 * what the lecture means by "the approximate percentage of values below".
 */
export function percentileRank(values: number[], x: number): number {
  const clean = values.filter((v) => Number.isFinite(v));
  if (!clean.length) return 0;
  return clean.filter((v) => v < x).length / clean.length;
}

/** Format a probability the way the course's z-table prints it. */
export function toProbability(value: number, digits = 4): string {
  return value.toFixed(digits);
}
