export type Severity = "error" | "warning" | "info";

export type OutputFormat = "console" | "json" | "markdown";

export interface Finding {
  severity: Severity;
  ruleId: string;
  message: string;
  row?: number;
  column?: string;
  value?: string;
  suggestion?: string;
}

export interface ParsedTable {
  sourceName: string;
  headers: string[];
  rows: string[][];
}

export type SchemaColumnType =
  | "string"
  | "number"
  | "amount"
  | "postalCode"
  | "phone";

export interface SheetlintSchemaColumn {
  name: string;
  required?: boolean;
  type?: SchemaColumnType;
}

export interface SheetlintSchema {
  key?: string[];
  columns?: SheetlintSchemaColumn[];
}

export interface LintOptions {
  keyColumns?: string[];
  schema?: SheetlintSchema;
}

export interface LintResult {
  sourceName: string;
  summary: {
    errors: number;
    warnings: number;
    infos: number;
    total: number;
  };
  findings: Finding[];
}
