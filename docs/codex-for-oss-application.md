# Codex for Open Source Application Notes

This file prepares the short application answers for the Codex for Open Source program.

Official program page: <https://developers.openai.com/community/codex-for-oss>

## Repository

<https://github.com/smotea/sheetlint-jp>

## Role

Primary maintainer

## Why this repository is eligible

sheetlint-jp helps Japanese office workers and developers validate business CSV files before passing them to AI agents, GAS, or automation scripts. It focuses on Japan-specific spreadsheet issues such as full-width/half-width spaces, invisible characters, postal codes, phone numbers, amount columns, duplicate keys, and schema drift. It makes AI-assisted data workflows safer for non-engineers.

Character count: 395

## How API credits would be used

API credits would support maintainer automation: generating anonymized test cases from reported CSV patterns, triaging issues, drafting rule documentation in English and Japanese, and experimenting with Codex-based PR review workflows that check parser safety, CLI output clarity, and regression coverage before release.

Character count: 320

## Anything else OpenAI should know

The project is designed around a practical "before AI" workflow: users run a local CLI, generate a report, and give that report to Codex, Claude Code, Gemini, or GAS developers before data transformation. It is local-first and does not upload CSV contents, which matters for business spreadsheets.

Character count: 297

## Evidence to strengthen before applying

- Public GitHub repository
- Passing GitHub Actions CI
- If workflow permissions block CI upload, enable the workflow from `docs/github-actions-ci.yml` after refreshing GitHub auth
- `v0.1.0` release
- npm package, if npm login is available
- README with English and Japanese usage examples
- Realistic anonymized CSV sample and generated report
- At least one issue or roadmap item showing active maintenance
