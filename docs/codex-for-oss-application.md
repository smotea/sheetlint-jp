# Codex for Open Source Application Notes

This file prepares the short application answers for the Codex for Open Source program.

Official program page: <https://developers.openai.com/community/codex-for-oss>

## Repository

<https://github.com/smotea/sheetlint-jp>

## Role

Primary maintainer

## Why this repository is eligible

sheetlint-jp is an early-stage OSS project, so it does not yet have large star counts, but it addresses a practical and under-served problem: validating Japanese operational CSV data before AI agents or scripts act on it. The project is already usable via npx, published on npm, tested with GitHub Actions, released as v0.1.0, and documented in English and Japanese. I am the primary maintainer and plan to use Codex for rule design, issue triage, security review, documentation, and future XLSX/schema support.

Character count: 551

## How API credits would be used

API credits would support maintainer automation: generating anonymized regression cases from reported CSV patterns, triaging issues, drafting rule documentation in English and Japanese, and experimenting with Codex-based PR review workflows that check parser safety, CLI output clarity, and test coverage before release.

Character count: 304

## Anything else OpenAI should know

The project is designed around a practical "before AI" workflow: users run a local CLI, generate a report, and give that report to Codex, Claude Code, Gemini, or GAS developers before data transformation. It is local-first and does not upload CSV contents, which matters for business spreadsheets.

Character count: 297

## Shorter 500-character version

sheetlint-jp validates Japanese business CSV files before AI agents or scripts act on them. It catches practical spreadsheet risks such as mixed full-width/half-width spaces, invisible characters, duplicate keys, broken row shapes, postal codes, phone numbers, and amount-like columns. It is early-stage but already published on GitHub and npm, tested with CI, released, bilingual, and maintained with a clear roadmap.

Character count: 422

## One sentence

sheetlint-jp makes AI-assisted spreadsheet automation safer by validating Japanese business CSV files before Codex, GAS, or other agents act on them.

## Evidence to strengthen before applying

- Public GitHub repository
- Passing GitHub Actions CI
- `v0.1.0` release
- npm package
- README with English and Japanese usage examples
- Realistic anonymized CSV sample and generated report
- At least one issue or roadmap item showing active maintenance
