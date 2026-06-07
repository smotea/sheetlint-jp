import { readFile } from "node:fs/promises";
import { parseCsvText } from "./parser/csv.js";
import { createLintResult } from "./reporters/summary.js";
import { runBuiltinRules } from "./rules/builtinRules.js";
import type { LintOptions, LintResult } from "./types.js";

export async function lintCsvFile(
  path: string,
  options: LintOptions = {}
): Promise<LintResult> {
  const text = await readCsvFile(path);
  return lintCsvText(text, path, options);
}

export function lintCsvText(
  text: string,
  sourceName = "<input>",
  options: LintOptions = {}
): LintResult {
  const table = parseCsvText(text, sourceName);
  const findings = runBuiltinRules(table, options);
  return createLintResult(sourceName, findings);
}

export type {
  Finding,
  LintOptions,
  LintResult,
  OutputFormat,
  ParsedTable,
  Severity,
  SheetlintSchema
} from "./types.js";

async function readCsvFile(path: string): Promise<string> {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (isNodeFileError(error)) {
      if (error.code === "ENOENT") {
        throw new Error(`CSVファイルが見つかりません: ${path}`);
      }
      if (error.code === "EACCES") {
        throw new Error(`CSVファイルを読む権限がありません: ${path}`);
      }
      if (error.code === "EISDIR") {
        throw new Error(
          `CSVファイルではなくフォルダが指定されています: ${path}`
        );
      }
    }

    throw error;
  }
}

function isNodeFileError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
