# Contributing

Thank you for your interest in sheetlint-jp.

This project is an MVP, so contributions should stay practical and easy to review.

## Development

```bash
npm install
npm run build
npm test
npm run lint
```

## Pull request checklist

- Add or update tests when changing rules, parser behavior, CLI options, or reporters.
- Update `README.md`, `README.ja.md`, or `docs/rules.md` when behavior changes.
- Keep error messages friendly for non-engineers.
- Avoid adding large dependencies unless they clearly reduce maintenance risk.
- Preserve ESM and npm package compatibility.

## Design principles

- Make the CLI useful before it is clever.
- Prefer clear rule output over hidden magic.
- Keep parser boundaries clean so XLSX support can be added later.
- Treat Japanese business CSV quirks as first-class use cases.
