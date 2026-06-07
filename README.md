# sheetlint-jp

[![CI](https://github.com/smotea/sheetlint-jp/actions/workflows/ci.yml/badge.svg)](https://github.com/smotea/sheetlint-jp/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/sheetlint-jp.svg)](https://www.npmjs.com/package/sheetlint-jp)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Data quality checks for Japanese business CSV files before you send them to AI, Google Apps Script, or automation workflows.

`sheetlint-jp` is a small TypeScript CLI for finding spreadsheet problems that often break downstream work: inconsistent headers, broken rows, invisible characters, Japanese full-width and half-width space issues, duplicate keys, invalid postal codes, invalid phone numbers, and amount columns that are not actually numeric.

> Local-first: sheetlint-jp reads files on your machine and does not upload business CSV contents to external services.

[日本語READMEはこちら](README.ja.md)

## Why Japanese business CSV?

Japanese operational spreadsheets often contain data that looks fine to humans but fails when a script or AI agent processes it:

- `東京都 港区` and `東京都　港区` are different strings.
- Zero-width spaces are invisible but break matching.
- Shifted CSV rows can silently move values into the wrong columns.
- Postal codes, phone numbers, and amount columns need practical Japanese defaults.
- AI coding tools such as Codex, Claude Code, and Gemini work better when the input data is checked first.

This project focuses on the "before AI" step: catch spreadsheet quality issues before asking an agent to transform, import, or summarize the data.

## Who it is for

- Office workers and operations teams who manage CSV exports from Google Sheets or Excel.
- Developers who import Japanese CSV files into internal tools.
- AI-assisted coding users who want to validate data before asking Codex, Claude Code, Gemini, or Google Apps Script to process it.

## Installation

Run without installing:

```bash
npx sheetlint-jp examples/bad-sample.csv
```

Install globally:

```bash
npm install -g sheetlint-jp
sheetlint-jp examples/bad-sample.csv
```

For local development:

```bash
npm install
npm run build
node dist/cli.js examples/bad-sample.csv
```

## Usage

```bash
sheetlint-jp <file.csv> [options]
```

Options:

```bash
--format json
--format markdown
--key 駐車場名,区画番号
--schema examples/schema.json
--output report.md
```

Examples:

```bash
npx sheetlint-jp examples/bad-sample.csv
npx sheetlint-jp examples/bad-sample.csv --format json
npx sheetlint-jp examples/bad-sample.csv --format markdown --output report.md
npx sheetlint-jp examples/bad-sample.csv --key 駐車場名,区画番号
npx sheetlint-jp examples/bad-sample.csv --schema examples/schema.json
```

## Realistic Demo

The repository includes a larger anonymized rental-management style sample:

```bash
node dist/cli.js examples/chintai-kakumei-sample.csv \
  --schema examples/chintai-kakumei-schema.json \
  --format markdown \
  --output examples/chintai-kakumei-report.md
```

It demonstrates the intended workflow: generate a report first, then give the report to an AI agent or developer before writing import, cleanup, or automation code.

## Sample Input

```csv
駐車場名,区画番号,郵便番号,電話番号,月額料金,備考,月額料金
青山パーク,A-01,1070062,03-1234-5678,"12,000",通常,"12,000"
青山パーク,A-01,1070062,03-1234-5678,"12,000",通常,"12,000"
銀座　パーク,B-02,104-0061,090-1234-ABCD,不明,半角 全角　混在,不明
```

## Sample Output

```text
sheetlint-jp report: examples/bad-sample.csv
Summary: 8 error(s), 5 warning(s), 0 info(s)

[ERROR] duplicate-header
  内容: ヘッダー「月額料金」が重複しています。
  場所: 1行目 / 月額料金 (7列目)
  値: 月額料金
  提案: 最初の「月額料金」と区別できる列名に変更してください。
```

JSON and Markdown output include:

- `severity`: `error`, `warning`, or `info`
- `ruleId`
- `message`
- `row`
- `column`
- `value`
- `suggestion`

## Schema

You can pass a schema file to define key columns, required columns, and basic column types.

```json
{
  "key": ["駐車場名", "区画番号"],
  "columns": [
    { "name": "駐車場名", "required": true, "type": "string" },
    { "name": "区画番号", "required": true, "type": "string" },
    { "name": "郵便番号", "type": "postalCode" },
    { "name": "電話番号", "type": "phone" },
    { "name": "月額料金", "type": "amount" }
  ]
}
```

## Using with Codex / Claude Code

Run sheetlint before asking an AI coding agent to process a CSV:

```bash
npx sheetlint-jp customer-import.csv --schema schema.json --format markdown --output report.md
```

Then give the AI agent a clear instruction:

```text
Read report.md first. Fix the CSV issues or explain which rows are unsafe before writing any import script.
```

This helps prevent agents from building scripts around broken assumptions.

## Maintainer Workflows

This project is prepared for public OSS maintenance:

- GitHub Actions verifies build, tests, lint, CLI sample execution, and npm package checks.
- Issue templates ask users to anonymize business CSV data before posting.
- `docs/maintenance.md` describes release and triage workflows.
- `docs/publication-checklist.md` tracks the GitHub, npm, and application readiness steps.

## Rules

See [docs/rules.md](docs/rules.md) for the rule list.

MVP rules include:

- Empty cell detection
- Duplicate header detection
- Row column count mismatch detection
- Full-width and half-width space mix detection
- Invisible character detection
- Duplicate row detection
- Postal code format checks
- Phone number format checks
- Amount-like column numeric checks
- Duplicate key checks

## Roadmap

- XLSX parser support
- Config file support
- More Japanese address and corporate number checks
- Severity customization
- CSV encoding detection hints
- GitHub Actions examples for data quality checks

## Contributing

Issues and pull requests are welcome. Please keep the first version small and practical: this tool should be easy for non-engineers to run and easy for developers to extend.

Before opening a PR:

```bash
npm run check
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Security

Do not post private CSV files, customer data, or credentials in public issues. See [SECURITY.md](SECURITY.md).

## License

MIT
