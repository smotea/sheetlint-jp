# Maintenance Plan

sheetlint-jp is maintained as a small, practical CLI.

## Release flow

1. Update code, tests, examples, and docs together.
2. Run `npm run check`.
3. Run `node dist/cli.js examples/bad-sample.csv --format markdown --output report.md`.
4. Update `CHANGELOG.md`.
5. Create a GitHub release.
6. Publish to npm when credentials are available.

## Triage flow

- Confirm whether the report uses anonymized CSV data.
- Reproduce the issue with a minimal CSV sample.
- Add or update a Vitest case.
- Keep output messages understandable for non-engineers.
- Avoid rules that silently modify user data. sheetlint-jp should report issues first.

## Good first issues

- Add more Japanese address examples.
- Add config file support.
- Add safer CSV encoding hints.
- Add XLSX parsing behind the existing parser boundary.
- Improve Markdown report readability for large files.
