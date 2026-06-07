import type { LintResult } from "../types.js";

export function formatMarkdown(result: LintResult): string {
  const lines: string[] = [];

  lines.push(`# sheetlint-jp report`);
  lines.push("");
  lines.push(`- Source: \`${escapeInline(result.sourceName)}\``);
  lines.push(`- Errors: ${result.summary.errors}`);
  lines.push(`- Warnings: ${result.summary.warnings}`);
  lines.push(`- Info: ${result.summary.infos}`);
  lines.push(`- Total findings: ${result.summary.total}`);
  lines.push("");

  if (result.findings.length === 0) {
    lines.push("No issues found.");
    lines.push("");
    return lines.join("\n");
  }

  lines.push(
    "| severity | ruleId | row | column | value | message | suggestion |"
  );
  lines.push("| --- | --- | ---: | --- | --- | --- | --- |");

  for (const finding of result.findings) {
    const cells = [
      finding.severity,
      finding.ruleId,
      finding.row?.toString() ?? "",
      finding.column ?? "",
      finding.value ?? "",
      finding.message,
      finding.suggestion ?? ""
    ].map(escapeTableCell);

    lines.push(`| ${cells.join(" | ")} |`);
  }

  lines.push("");
  return lines.join("\n");
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
}

function escapeInline(value: string): string {
  return value.replace(/`/g, "\\`");
}
