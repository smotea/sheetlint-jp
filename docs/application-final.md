# Codex for Open Source Application Packet

Use this when submitting the Codex for Open Source application.

Official page: <https://developers.openai.com/community/codex-for-oss>

## Links

- GitHub: <https://github.com/smotea/sheetlint-jp>
- npm: <https://www.npmjs.com/package/sheetlint-jp>
- CI: <https://github.com/smotea/sheetlint-jp/actions/workflows/ci.yml>
- Release: <https://github.com/smotea/sheetlint-jp/releases/tag/v0.1.0>
- Roadmap issues: <https://github.com/smotea/sheetlint-jp/issues>

## Role

Primary maintainer with write access.

## Short Project Description

sheetlint-jp is a local-first TypeScript CLI that checks Japanese business CSV files before users pass them to AI agents, Google Apps Script, or automation workflows.

## Why This Repository Is Eligible

sheetlint-jp is an early-stage OSS project, so it does not yet have large star counts, but it addresses a practical and under-served problem: validating Japanese operational CSV data before AI agents or scripts act on it. The project is already usable via npx, published on npm, tested with GitHub Actions, released as v0.1.0, and documented in English and Japanese. I am the primary maintainer and plan to use Codex for rule design, issue triage, security review, documentation, and future XLSX/schema support.

## How API Credits Would Be Used

API credits would support maintainer automation: generating anonymized regression cases from reported CSV patterns, triaging issues, drafting rule documentation in English and Japanese, and experimenting with Codex-based PR review workflows that check parser safety, CLI output clarity, and test coverage before release.

## Anything Else OpenAI Should Know

The project is built around a practical "before AI" workflow: users run a local CLI, generate a report, and give that report to Codex, Claude Code, Gemini, or GAS developers before data transformation. It is local-first and does not upload CSV contents, which matters for business spreadsheets.

## Strongest Framing

This is not a general CSV linter. It is a safety layer for Japanese business spreadsheets before AI-assisted automation.

## 500-Character Version

sheetlint-jp validates Japanese business CSV files before AI agents or scripts act on them. It catches practical spreadsheet risks such as mixed full-width/half-width spaces, invisible characters, duplicate keys, broken row shapes, postal codes, phone numbers, and amount-like columns. It is early-stage but already published on GitHub and npm, tested with CI, released, bilingual, and maintained with a clear roadmap.

## Avoid Saying

- "This is a new project, so it does not have users yet."
- "I mainly want the subscription benefit."
- "Stars are the goal."

Better phrasing:

- "The project is newly launched, but already has npm distribution, CI, examples, roadmap issues, and a maintenance plan."
- "The benefit would help maintain and expand a local-first OSS tool for AI-assisted business data workflows."
- "Early adoption work is underway through documentation, launch posts, and feedback issues."
