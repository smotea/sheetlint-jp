import type { ParsedTable, SheetlintSchema } from "../types.js";

export interface CellRef {
  rowNumber: number;
  columnIndex: number;
  header: string;
  value: string;
}

export function* iterateCells(
  table: ParsedTable,
  includeHeaders = true
): Generator<CellRef> {
  if (includeHeaders) {
    for (
      let columnIndex = 0;
      columnIndex < table.headers.length;
      columnIndex += 1
    ) {
      yield {
        rowNumber: 1,
        columnIndex,
        header: table.headers[columnIndex] ?? `列${columnIndex + 1}`,
        value: table.headers[columnIndex] ?? ""
      };
    }
  }

  for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex += 1) {
    const row = table.rows[rowIndex] ?? [];
    for (
      let columnIndex = 0;
      columnIndex < Math.max(table.headers.length, row.length);
      columnIndex += 1
    ) {
      yield {
        rowNumber: rowIndex + 2,
        columnIndex,
        header: table.headers[columnIndex] ?? `列${columnIndex + 1}`,
        value: row[columnIndex] ?? ""
      };
    }
  }
}

export function headerIndexes(
  table: ParsedTable,
  headerName: string
): number[] {
  const normalized = normalizeKeyPart(headerName);
  return table.headers
    .map((header, index) => ({ header, index }))
    .filter(({ header }) => normalizeKeyPart(header) === normalized)
    .map(({ index }) => index);
}

export function normalizeKeyPart(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeFullWidthDigits(value: string): string {
  return value.replace(/[０-９]/g, (char) =>
    String(char.charCodeAt(0) - "０".charCodeAt(0))
  );
}

export function schemaColumnsByType(
  schema: SheetlintSchema | undefined,
  type: string
): string[] {
  return (
    schema?.columns
      ?.filter((column) => column.type === type)
      .map((column) => column.name) ?? []
  );
}

export function uniqueIndexes(indexes: number[]): number[] {
  return [...new Set(indexes)].sort((a, b) => a - b);
}
