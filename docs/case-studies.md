# Case Studies

These anonymized examples explain why `sheetlint-jp` matters before AI-assisted automation.

## Case 1: Duplicate Business Keys

Workflow:

1. A spreadsheet contains parking lot data.
2. The intended unique key is `駐車場名 + 区画番号`.
3. Two rows accidentally share the same key.
4. An AI agent or GAS import script would overwrite or duplicate records.

sheetlint-jp catches this with `duplicate-key`.

Command:

```bash
npx sheetlint-jp examples/bad-sample.csv --key 駐車場名,区画番号
```

## Case 2: Invisible Characters

Workflow:

1. A value copied from another system contains a zero-width space.
2. It looks normal in the spreadsheet.
3. Matching, grouping, or lookup logic fails because the string is not identical.

sheetlint-jp catches this with `invisible-character`.

## Case 3: Amount Columns That Are Not Numeric

Workflow:

1. A column named `月額料金` or `請求金額` should be numeric.
2. Some rows contain `不明`, `確認中`, or kanji numerals.
3. AI-generated import scripts may assume the column is safe and fail later.

sheetlint-jp catches this with `amount-number`.

## Case 4: AI Prompt Guardrail

Instead of asking an AI agent to process a CSV directly, generate a report first:

```bash
npx sheetlint-jp customer-import.csv --schema schema.json --format markdown --output report.md
```

Then ask:

```text
Read report.md first. Explain unsafe rows before writing import code.
```

This turns hidden spreadsheet issues into explicit context for Codex, Claude Code, Gemini, or GAS developers.
