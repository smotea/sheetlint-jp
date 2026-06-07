import type { LintResult } from "../types.js";

export function formatJson(result: LintResult): string {
  return JSON.stringify(result, null, 2);
}
