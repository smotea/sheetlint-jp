#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { Command, InvalidArgumentError } from "commander";
import { lintCsvFile } from "./index.js";
import { formatResult } from "./reporters/index.js";
import { loadSchema } from "./schema/loadSchema.js";
import type { OutputFormat } from "./types.js";

interface CliOptions {
  format: OutputFormat;
  key?: string;
  schema?: string;
  output?: string;
}

const program = new Command();

program
  .name("sheetlint-jp")
  .description("日本の業務CSVを、AIやGASに渡す前にチェックするCLI")
  .argument("<file>", "チェックするCSVファイル")
  .option(
    "--format <format>",
    "出力形式: console / json / markdown",
    parseFormat,
    "console"
  )
  .option("--key <columns>", "重複チェックに使うキー列。例: 駐車場名,区画番号")
  .option("--schema <path>", "schema JSONのパス")
  .option("--output <path>", "結果を書き出すファイル。未指定なら標準出力")
  .showHelpAfterError()
  .action(async (file: string, options: CliOptions) => {
    try {
      const schema = options.schema
        ? await loadSchema(options.schema)
        : undefined;
      const keyColumns = options.key
        ? options.key
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean)
        : undefined;

      const result = await lintCsvFile(file, {
        keyColumns,
        schema
      });
      const output = formatResult(result, options.format);

      if (options.output) {
        await mkdir(dirname(options.output), { recursive: true });
        await writeFile(options.output, output, "utf8");
        console.log(`レポートを書き出しました: ${options.output}`);
        console.log(
          `検出結果: error ${result.summary.errors} / warning ${result.summary.warnings} / info ${result.summary.infos}`
        );
        return;
      }

      console.log(output);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`sheetlint-jp: ${message}`);
      process.exitCode = 1;
    }
  });

program.parseAsync();

function parseFormat(value: string): OutputFormat {
  if (value === "console" || value === "json" || value === "markdown") {
    return value;
  }

  throw new InvalidArgumentError(
    "--format は console / json / markdown のいずれかを指定してください。"
  );
}
