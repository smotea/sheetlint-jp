import type { LintResult, OutputFormat } from "../types.js";
import { formatConsole } from "./console.js";
import { formatJson } from "./json.js";
import { formatMarkdown } from "./markdown.js";

export function formatResult(result: LintResult, format: OutputFormat): string {
  switch (format) {
    case "console":
      return formatConsole(result);
    case "json":
      return formatJson(result);
    case "markdown":
      return formatMarkdown(result);
  }
}
