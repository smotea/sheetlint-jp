import { parse } from "csv-parse/sync";
import type { ParsedTable } from "../types.js";

export class CsvParseFriendlyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CsvParseFriendlyError";
  }
}

export function parseCsvText(
  text: string,
  sourceName = "<input>"
): ParsedTable {
  let records: string[][];

  try {
    records = parse(text, {
      bom: true,
      relax_column_count: true,
      skip_empty_lines: false,
      trim: false
    }) as string[][];
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new CsvParseFriendlyError(
      `CSVを読み込めませんでした。カンマ、ダブルクォート、改行の崩れを確認してください。詳細: ${detail}`
    );
  }

  if (records.length === 0 || records.every((row) => row.length === 0)) {
    throw new CsvParseFriendlyError(
      "CSVが空です。1行目にヘッダー、2行目以降にデータがあるファイルを指定してください。"
    );
  }

  const [headers = [], ...rows] = records;

  if (headers.length === 0 || headers.every((header) => header.trim() === "")) {
    throw new CsvParseFriendlyError(
      "CSVの1行目にヘッダーが見つかりませんでした。列名を入れてから再実行してください。"
    );
  }

  return {
    sourceName,
    headers,
    rows
  };
}
