/* -------- Shared types for the BADM 572 bilingual visual-learning app ------- */

export type Lang = "ru" | "en";

/** A piece of copy that exists in both languages. */
export interface L10n {
  ru: string;
  en: string;
}

export type ModuleId = 1 | 2 | 3 | 4;

export type ModuleColorKey = "m1" | "m2" | "m3" | "m4";

export interface ModuleMeta {
  id: ModuleId;
  slug: string;
  title: L10n;
  subtitle: L10n;
  topics: L10n[];
  colorKey: ModuleColorKey;
  /** Lucide icon name (resolved at render time). */
  iconName: string;
  status: "ready" | "coming-soon";
}

export interface GlossaryTerm {
  id: string;
  term: L10n;
  definition: L10n;
  moduleId: ModuleId;
  /** Formula or shorthand, language-neutral where possible. */
  formula?: string;
  /** Related-term ids for cross-linking. */
  related?: string[];
  tags?: string[];
}

export type Difficulty = "easy" | "medium" | "hard";

export interface QuizOption {
  id: string;
  text: L10n;
}

export interface QuizQuestion {
  id: string;
  moduleId: ModuleId;
  difficulty: Difficulty;
  topic: L10n;
  prompt: L10n;
  options: QuizOption[];
  /** Id of the correct option. */
  answerId: string;
  explanation: L10n;
}

export interface QuizConfig {
  moduleIds: ModuleId[] | "all";
  count: 5 | 10 | 20;
  timed: boolean;
  /** Seconds per question when timed; 0 = no per-question cap. */
  secondsPerQuestion?: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string | null;
  timeSpentMs: number;
}

export interface QuizResult {
  config: QuizConfig;
  answers: QuizAnswer[];
  totalMs: number;
  startedAt: number;
  endedAt: number;
}
