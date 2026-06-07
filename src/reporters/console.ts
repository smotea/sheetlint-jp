import type { LintResult } from "../types.js";

export function formatConsole(result: LintResult): string {
  const lines: string[] = [];

  lines.push(`sheetlint-jp report: ${result.sourceName}`);
  lines.push(
    `Summary: ${result.summary.errors} error(s), ${result.summary.warnings} warning(s), ${result.summary.infos} info(s)`
  );

  if (result.findings.length === 0) {
    lines.push("");
    lines.push(
      "問題は見つかりませんでした。AIやGASに渡す前の最低限のチェックは通っています。"
    );
    return lines.join("\n");
  }

  lines.push("");

  for (const finding of result.findings) {
    const location = [
      finding.row !== undefined ? `${finding.row}行目` : undefined,
      finding.column
    ]
      .filter(Boolean)
      .join(" / ");

    lines.push(`[${finding.severity.toUpperCase()}] ${finding.ruleId}`);
    lines.push(`  内容: ${finding.message}`);
    if (location) {
      lines.push(`  場所: ${location}`);
    }
    if (finding.value !== undefined) {
      lines.push(`  値: ${printableValue(finding.value)}`);
    }
    if (finding.suggestion) {
      lines.push(`  提案: ${finding.suggestion}`);
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

function printableValue(value: string): string {
  if (value === "") {
    return "(空欄)";
  }

  return value;
}
