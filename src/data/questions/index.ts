import type { QuizQuestion, ModuleId } from "@/lib/types";
import { module1Questions } from "./module1";
import { module2Questions } from "./module2";
import { module3Questions } from "./module3";

/**
 * Master question bank. Each module file owns its own pool with the
 * 20/60/20 easy/medium/hard mix. Add each module file as its material lands.
 */
export const QUESTIONS: QuizQuestion[] = [
  ...module1Questions,
  ...module2Questions,
  ...module3Questions,
];

export function getQuestionsByModule(moduleId: ModuleId): QuizQuestion[] {
  return QUESTIONS.filter((q) => q.moduleId === moduleId);
}

export function getQuestionCountByModule(): Record<ModuleId, number> {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 } as Record<ModuleId, number>;
  for (const q of QUESTIONS) counts[q.moduleId]++;
  return counts;
}
