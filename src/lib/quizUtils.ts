import type {
  Difficulty,
  ModuleId,
  QuizConfig,
  QuizQuestion,
} from "@/lib/types";

/** Fisher-Yates in-place shuffle. */
export function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Sample a question set honoring the 20% easy / 60% medium / 20% hard mix as
 * closely as possible given the available pool.
 */
export function sampleQuestions(pool: QuizQuestion[], count: number): QuizQuestion[] {
  if (pool.length === 0 || count <= 0) return [];
  const wantEasy = Math.round(count * 0.2);
  const wantHard = Math.round(count * 0.2);
  const wantMedium = count - wantEasy - wantHard;

  const buckets: Record<Difficulty, QuizQuestion[]> = {
    easy: shuffle(pool.filter((q) => q.difficulty === "easy")),
    medium: shuffle(pool.filter((q) => q.difficulty === "medium")),
    hard: shuffle(pool.filter((q) => q.difficulty === "hard")),
  };

  const chosen: QuizQuestion[] = [];
  const take = (bucket: Difficulty, n: number) => {
    const taken = buckets[bucket].splice(0, n);
    chosen.push(...taken);
    return n - taken.length; // shortfall
  };

  let shortfall = 0;
  shortfall += take("easy", wantEasy);
  shortfall += take("medium", wantMedium);
  shortfall += take("hard", wantHard);

  // Backfill from any remaining bucket if we came up short.
  if (shortfall > 0) {
    const remaining = shuffle([
      ...buckets.easy,
      ...buckets.medium,
      ...buckets.hard,
    ]);
    chosen.push(...remaining.slice(0, shortfall));
  }

  return shuffle(chosen);
}

export function filterByModules(
  pool: QuizQuestion[],
  moduleIds: QuizConfig["moduleIds"],
): QuizQuestion[] {
  if (moduleIds === "all") return pool;
  const set = new Set<ModuleId>(moduleIds);
  return pool.filter((q) => set.has(q.moduleId));
}

export function formatMs(ms: number): string {
  const totalSec = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
