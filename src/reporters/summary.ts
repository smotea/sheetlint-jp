import type { Finding, LintResult } from "../types.js";

export function createLintResult(
  sourceName: string,
  findings: Finding[]
): LintResult {
  const errors = findings.filter(
    (finding) => finding.severity === "error"
  ).length;
  const warnings = findings.filter(
    (finding) => finding.severity === "warning"
  ).length;
  const infos = findings.filter(
    (finding) => finding.severity === "info"
  ).length;

  return {
    sourceName,
    summary: {
      errors,
      warnings,
      infos,
      total: findings.length
    },
    findings
  };
}
