# Publication Checklist

Use this checklist before submitting sheetlint-jp to the Codex for Open Source program.

## Local quality

- [ ] `npm install`
- [ ] `npm run build`
- [ ] `npm test`
- [ ] `npm run lint`
- [ ] `node dist/cli.js examples/bad-sample.csv --format markdown --output report.md`
- [ ] `npm pack --dry-run`

## GitHub

- [ ] Repository is public
- [ ] Default branch is `main`
- [ ] README renders correctly
- [ ] GitHub Actions CI passes
- [ ] If `gh` cannot push workflows, refresh auth with `gh auth refresh -h github.com -s workflow`, then copy `docs/github-actions-ci.yml` to `.github/workflows/ci.yml`
- [ ] Topics are set: `csv`, `data-quality`, `japanese`, `spreadsheet`, `cli`, `typescript`, `ai`, `codex`
- [ ] Release `v0.1.0` exists
- [ ] Issue templates and PR template are visible
- [ ] Security policy is visible

## npm

- [ ] `npm whoami` succeeds
- [ ] `npm publish --access public` succeeds
- [ ] `npx sheetlint-jp examples/bad-sample.csv` works from a clean folder

## Application

- [ ] GitHub profile visibility is public
- [ ] GitHub repository visibility is public
- [ ] OpenAI organization ID is ready
- [ ] Application answers are copied from `docs/codex-for-oss-application.md`
- [ ] The application explains why Japanese business CSV quality matters before AI workflows
