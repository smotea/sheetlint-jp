import { readFile } from "node:fs/promises";
import type { SheetlintSchema, SchemaColumnType } from "../types.js";

const allowedTypes = new Set<SchemaColumnType>([
  "string",
  "number",
  "amount",
  "postalCode",
  "phone"
]);

export async function loadSchema(path: string): Promise<SheetlintSchema> {
  const raw = await readFile(path, "utf8");
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `schema JSONを読み込めませんでした。JSON形式を確認してください。詳細: ${detail}`
    );
  }

  if (!isRecord(parsed)) {
    throw new Error("schema JSONのルートはオブジェクトにしてください。");
  }

  const schema: SheetlintSchema = {};

  if ("key" in parsed) {
    if (
      !Array.isArray(parsed.key) ||
      !parsed.key.every((item) => typeof item === "string")
    ) {
      throw new Error(
        'schema.key は文字列配列にしてください。例: ["駐車場名", "区画番号"]'
      );
    }
    schema.key = parsed.key;
  }

  if ("columns" in parsed) {
    if (!Array.isArray(parsed.columns)) {
      throw new Error("schema.columns は配列にしてください。");
    }

    schema.columns = parsed.columns.map((column, index) => {
      if (!isRecord(column) || typeof column.name !== "string") {
        throw new Error(
          `schema.columns[${index}] には name 文字列が必要です。`
        );
      }

      if (
        column.type !== undefined &&
        (typeof column.type !== "string" ||
          !allowedTypes.has(column.type as SchemaColumnType))
      ) {
        throw new Error(
          `schema.columns[${index}].type は string / number / amount / postalCode / phone のいずれかにしてください。`
        );
      }

      return {
        name: column.name,
        required:
          typeof column.required === "boolean" ? column.required : undefined,
        type: column.type as SchemaColumnType | undefined
      };
    });
  }

  return schema;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
