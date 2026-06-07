import type {
  Finding,
  LintOptions,
  ParsedTable,
  SheetlintSchemaColumn
} from "../types.js";
import {
  headerIndexes,
  iterateCells,
  normalizeFullWidthDigits,
  normalizeKeyPart,
  schemaColumnsByType,
  uniqueIndexes
} from "./utils.js";

export function runBuiltinRules(
  table: ParsedTable,
  options: LintOptions = {}
): Finding[] {
  return [
    ...checkDuplicateHeaders(table),
    ...checkColumnCount(table),
    ...checkBlankCells(table),
    ...checkMixedSpaces(table),
    ...checkInvisibleCharacters(table),
    ...checkDuplicateRows(table),
    ...checkPostalCodes(table, options),
    ...checkPhoneNumbers(table, options),
    ...checkAmountColumns(table, options),
    ...checkDuplicateKeys(table, options),
    ...checkSchema(table, options)
  ];
}

function checkDuplicateHeaders(table: ParsedTable): Finding[] {
  const seen = new Map<string, number>();
  const findings: Finding[] = [];

  table.headers.forEach((header, index) => {
    const key = normalizeKeyPart(header);
    if (key === "") {
      return;
    }

    const firstColumn = seen.get(key);
    if (firstColumn !== undefined) {
      findings.push({
        severity: "error",
        ruleId: "duplicate-header",
        message: `ヘッダー「${header}」が重複しています。`,
        row: 1,
        column: columnLabel(header, index),
        value: header,
        suggestion: `最初の「${table.headers[firstColumn]}」と区別できる列名に変更してください。`
      });
      return;
    }

    seen.set(key, index);
  });

  return findings;
}

function checkColumnCount(table: ParsedTable): Finding[] {
  return table.rows.flatMap((row, rowIndex) => {
    if (row.length === table.headers.length) {
      return [];
    }

    return [
      {
        severity: "error",
        ruleId: "column-count-mismatch",
        message: `列数がヘッダーと一致しません。ヘッダーは${table.headers.length}列、この行は${row.length}列です。`,
        row: rowIndex + 2,
        column: `行全体`,
        value: row.join(","),
        suggestion: "カンマの数、引用符、空欄の列を確認してください。"
      } satisfies Finding
    ];
  });
}

function checkBlankCells(table: ParsedTable): Finding[] {
  const findings: Finding[] = [];

  for (const cell of iterateCells(table, false)) {
    if (cell.value.trim() === "") {
      findings.push({
        severity: "warning",
        ruleId: "blank-cell",
        message: `空白セルがあります。`,
        row: cell.rowNumber,
        column: columnLabel(cell.header, cell.columnIndex),
        value: cell.value,
        suggestion: "空欄でよい項目か確認し、必要なら値を入力してください。"
      });
    }
  }

  return findings;
}

function checkMixedSpaces(table: ParsedTable): Finding[] {
  const findings: Finding[] = [];

  for (const cell of iterateCells(table)) {
    if (cell.value.includes(" ") && cell.value.includes("　")) {
      findings.push({
        severity: "warning",
        ruleId: "mixed-space",
        message: "半角スペースと全角スペースが同じセル内に混在しています。",
        row: cell.rowNumber,
        column: columnLabel(cell.header, cell.columnIndex),
        value: cell.value,
        suggestion: "検索や突合に使う列では、スペースの種類を統一してください。"
      });
    }
  }

  return findings;
}

function checkInvisibleCharacters(table: ParsedTable): Finding[] {
  const findings: Finding[] = [];

  for (const cell of iterateCells(table)) {
    if (hasInvisibleCharacter(cell.value)) {
      findings.push({
        severity: "warning",
        ruleId: "invisible-character",
        message: "ゼロ幅スペースなどの不可視文字が含まれています。",
        row: cell.rowNumber,
        column: columnLabel(cell.header, cell.columnIndex),
        value: cell.value,
        suggestion: "見えない文字を削除してから、再度チェックしてください。"
      });
    }
  }

  return findings;
}

function checkDuplicateRows(table: ParsedTable): Finding[] {
  const seen = new Map<string, number>();
  const findings: Finding[] = [];

  table.rows.forEach((row, rowIndex) => {
    const normalized = JSON.stringify(row.map(normalizeKeyPart));
    const firstRow = seen.get(normalized);

    if (firstRow !== undefined) {
      findings.push({
        severity: "warning",
        ruleId: "duplicate-row",
        message: `同じ内容の行が重複しています。`,
        row: rowIndex + 2,
        column: "行全体",
        value: row.join(","),
        suggestion: `${firstRow}行目と同じ内容です。どちらか一方でよいか確認してください。`
      });
      return;
    }

    seen.set(normalized, rowIndex + 2);
  });

  return findings;
}

function checkPostalCodes(table: ParsedTable, options: LintOptions): Finding[] {
  const indexes = getRuleTargetIndexes(
    table,
    options.schema?.columns,
    "postalCode",
    /郵便番号|郵便|zip|postal/i
  );
  const findings: Finding[] = [];

  for (const rowEntry of table.rows.entries()) {
    const [rowIndex, row] = rowEntry;
    for (const index of indexes) {
      const value = row[index] ?? "";
      if (value.trim() === "") {
        continue;
      }

      const normalized = normalizeFullWidthDigits(value).trim();
      if (!/^\d{3}-?\d{4}$/.test(normalized)) {
        findings.push({
          severity: "error",
          ruleId: "postal-code-format",
          message: "郵便番号の形式が正しくありません。",
          row: rowIndex + 2,
          column: columnLabel(table.headers[index] ?? `列${index + 1}`, index),
          value,
          suggestion: "例: 100-0001 または 1000001 の形式にしてください。"
        });
      }
    }
  }

  return findings;
}

function checkPhoneNumbers(
  table: ParsedTable,
  options: LintOptions
): Finding[] {
  const indexes = getRuleTargetIndexes(
    table,
    options.schema?.columns,
    "phone",
    /電話|tel|phone|携帯|fax/i
  );
  const findings: Finding[] = [];

  for (const rowEntry of table.rows.entries()) {
    const [rowIndex, row] = rowEntry;
    for (const index of indexes) {
      const value = row[index] ?? "";
      if (value.trim() === "") {
        continue;
      }

      if (!isLikelyJapanesePhoneNumber(value)) {
        findings.push({
          severity: "error",
          ruleId: "phone-number-format",
          message: "電話番号の形式が正しくありません。",
          row: rowIndex + 2,
          column: columnLabel(table.headers[index] ?? `列${index + 1}`, index),
          value,
          suggestion:
            "例: 03-0000-0000、090-0000-0000、0120-000-000 の形式にしてください。"
        });
      }
    }
  }

  return findings;
}

function checkAmountColumns(
  table: ParsedTable,
  options: LintOptions
): Finding[] {
  const indexes = getRuleTargetIndexes(
    table,
    options.schema?.columns,
    "amount",
    /金額|料金|価格|費用|売上|単価|合計|請求|支払|amount|price|cost|total|円/i
  );
  const findings: Finding[] = [];

  for (const rowEntry of table.rows.entries()) {
    const [rowIndex, row] = rowEntry;
    for (const index of indexes) {
      const value = row[index] ?? "";
      if (value.trim() === "") {
        continue;
      }

      if (!isAmountLike(value)) {
        findings.push({
          severity: "error",
          ruleId: "amount-number",
          message: "金額列らしき列に、数値として扱いにくい値があります。",
          row: rowIndex + 2,
          column: columnLabel(table.headers[index] ?? `列${index + 1}`, index),
          value,
          suggestion:
            "例: 12000、12,000、12000円 のように数値で表してください。"
        });
      }
    }
  }

  return findings;
}

function checkDuplicateKeys(
  table: ParsedTable,
  options: LintOptions
): Finding[] {
  const keyColumns = options.keyColumns?.length
    ? options.keyColumns
    : (options.schema?.key ?? []);
  if (keyColumns.length === 0) {
    return [];
  }

  const findings: Finding[] = [];
  const keyIndexes = keyColumns.map((key) => ({
    key,
    indexes: headerIndexes(table, key)
  }));

  for (const keyIndex of keyIndexes) {
    if (keyIndex.indexes.length === 0) {
      findings.push({
        severity: "error",
        ruleId: "duplicate-key",
        message: `キー列「${keyIndex.key}」がCSV内に見つかりません。`,
        row: 1,
        column: keyIndex.key,
        suggestion: "キー列名とCSVヘッダーの表記を確認してください。"
      });
    }
  }

  const usableIndexes = keyIndexes.flatMap((entry) =>
    entry.indexes.slice(0, 1)
  );
  if (usableIndexes.length !== keyColumns.length) {
    return findings;
  }

  const seen = new Map<string, number>();
  table.rows.forEach((row, rowIndex) => {
    const key = usableIndexes
      .map((index) => normalizeKeyPart(row[index] ?? ""))
      .join("\u001F");
    if (key.replaceAll("\u001F", "") === "") {
      return;
    }

    const firstRow = seen.get(key);
    if (firstRow !== undefined) {
      findings.push({
        severity: "error",
        ruleId: "duplicate-key",
        message: `キー列（${keyColumns.join(", ")}）の組み合わせが重複しています。`,
        row: rowIndex + 2,
        column: keyColumns.join(", "),
        value: usableIndexes.map((index) => row[index] ?? "").join(" / "),
        suggestion: `${firstRow}行目と同じキーです。一意になるように修正してください。`
      });
      return;
    }

    seen.set(key, rowIndex + 2);
  });

  return findings;
}

function checkSchema(table: ParsedTable, options: LintOptions): Finding[] {
  const columns = options.schema?.columns ?? [];
  const findings: Finding[] = [];

  for (const column of columns) {
    const indexes = headerIndexes(table, column.name);
    if (indexes.length === 0) {
      findings.push({
        severity: "error",
        ruleId: "schema-missing-column",
        message: `schemaで定義された列「${column.name}」がCSVにありません。`,
        row: 1,
        column: column.name,
        suggestion:
          "CSVのヘッダー名、またはschema.jsonの列名を確認してください。"
      });
      continue;
    }

    if (column.required) {
      const targetIndex = indexes[0] ?? 0;
      table.rows.forEach((row, rowIndex) => {
        const value = row[targetIndex] ?? "";
        if (value.trim() === "") {
          findings.push({
            severity: "error",
            ruleId: "schema-required-cell",
            message: `必須列「${column.name}」が空です。`,
            row: rowIndex + 2,
            column: columnLabel(column.name, targetIndex),
            value,
            suggestion: "必須項目なので値を入力してください。"
          });
        }
      });
    }
  }

  return findings;
}

function getRuleTargetIndexes(
  table: ParsedTable,
  schemaColumns: SheetlintSchemaColumn[] | undefined,
  schemaType: "amount" | "postalCode" | "phone",
  headerPattern: RegExp
): number[] {
  const schemaTargets = schemaColumnsByType(
    { columns: schemaColumns },
    schemaType
  ).flatMap((name) => headerIndexes(table, name));
  const headerTargets = table.headers
    .map((header, index) => ({ header, index }))
    .filter(({ header }) => headerPattern.test(header))
    .map(({ index }) => index);

  return uniqueIndexes([...schemaTargets, ...headerTargets]);
}

function isLikelyJapanesePhoneNumber(value: string): boolean {
  const normalized = normalizeFullWidthDigits(value).trim();
  if (!/^\+?[0-9()\-\s]+$/.test(normalized)) {
    return false;
  }

  const digits = normalized.replace(/\D/g, "");
  if (normalized.startsWith("+81")) {
    return digits.length === 11 || digits.length === 12;
  }

  return digits.length === 10 || digits.length === 11;
}

function isAmountLike(value: string): boolean {
  const normalized = normalizeFullWidthDigits(value)
    .replace(/[,\s\u3000]/g, "")
    .replace(/^[-+]?¥/, (match) => match.replace("¥", ""))
    .replace(/円$/u, "");

  return /^[-+]?\d+(\.\d+)?$/.test(normalized);
}

function hasInvisibleCharacter(value: string): boolean {
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    if (
      (code >= 0x00 && code <= 0x08) ||
      code === 0x0b ||
      code === 0x0c ||
      (code >= 0x0e && code <= 0x1f) ||
      code === 0x7f ||
      code === 0x00a0 ||
      (code >= 0x200b && code <= 0x200d) ||
      code === 0x2060 ||
      code === 0xfeff
    ) {
      return true;
    }
  }

  return false;
}

function columnLabel(header: string, index: number): string {
  const safeHeader = header.trim() === "" ? "(空のヘッダー)" : header;
  return `${safeHeader} (${index + 1}列目)`;
}
