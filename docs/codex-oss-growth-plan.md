# Codex for Open Source Growth Plan

Goal: improve the odds of Codex for Open Source selection by turning `sheetlint-jp` from a freshly published repository into a small but credible OSS project with visible maintenance, a clear use case, and early adoption signals.

Official program page: <https://developers.openai.com/community/codex-for-oss>

## Current Evidence

- GitHub repository: <https://github.com/smotea/sheetlint-jp>
- npm package: <https://www.npmjs.com/package/sheetlint-jp>
- Release: `v0.1.0`
- CI: passing on Node.js 22 and 24
- Maintainer role: primary maintainer
- Security: npm 2FA restored
- Differentiation: Japanese business CSV quality checks before AI, GAS, and automation workflows

## Selection Hypothesis

Stars help, but the stronger case is:

1. The project solves a specific, real workflow problem.
2. It is already usable from npm.
3. It has CI, release, docs, examples, and a maintainer plan.
4. It shows early external interest or at least active maintenance.
5. It explains how Codex would be used in ongoing OSS maintenance.

## Target Signals Before Applying

Minimum target before submitting:

- 5 to 10 GitHub stars
- 1 public launch article or note
- 3 to 5 roadmap issues
- 1 small follow-up release, ideally `v0.1.1`
- CI badge green
- npm package page live
- README clearly says "before AI agents"

Stronger target:

- 20 GitHub stars
- 1 to 3 external users trying `npx sheetlint-jp`
- 1 user feedback issue
- 1 demo screenshot or Markdown report shared publicly
- 2 release tags within the first two weeks

## 14-Day Schedule

### Day 0: Already Completed

- Published GitHub repository.
- Published npm package.
- Created `v0.1.0` release.
- Enabled GitHub Actions CI.
- Added roadmap issues.
- Restored npm 2FA.

### Day 1: Launch Visibility

- Publish a Zenn article using `docs/zenn-launch-draft.md`.
- Post the first X announcement from `docs/launch-kit.md`.
- Ask 5 trusted people to star or try the project if they find it useful.
- Add any first feedback as GitHub issues.

Success target: 3 to 5 stars, 1 article, 1 to 2 comments or replies.

### Day 2: Practical Demo

- Post a short demo showing `npx sheetlint-jp examples/bad-sample.csv`.
- Share the realistic rental-management sample report.
- Open an issue for any unclear README step found by readers.

Success target: at least one person understands the "before AI" workflow.

### Day 3: Small Maintenance Release Planning

- Pick one small improvement issue.
- Best candidate: CSV encoding detection hints, because it is Japan-specific and easy to explain.
- Add tests before implementation.

Success target: one scoped implementation plan for `v0.1.1`.

### Day 4: Implement `v0.1.1`

- Implement a small improvement.
- Update README, docs, tests, and changelog.
- Confirm CI.

Success target: merged release-ready commit.

### Day 5: Release `v0.1.1`

- Publish npm `0.1.1`.
- Create GitHub release `v0.1.1`.
- Post "small maintenance release" update.

Success target: visible maintenance after initial launch.

### Day 6: Feedback Collection

- Ask for one realistic anonymized CSV edge case.
- Convert feedback into an issue, even if not implemented yet.
- Keep public communication low-volume and useful.

Success target: one user-driven issue or discussion.

### Day 7: Application Readiness Review

- Review `docs/codex-for-oss-application.md`.
- Update evidence list with star count, npm version, CI status, and release count.
- Decide whether to submit now or wait one more week.

Success target: application packet ready.

### Days 8-10: Second Exposure Window

- Share a follow-up post focused on "AI agents fail when CSV assumptions are wrong."
- Mention local-first privacy.
- Share sample Markdown report.

Success target: a second wave of impressions without spamming.

### Days 11-13: Second Small Improvement

- If time allows, implement config file support or a tiny README/demo improvement.
- If not, improve docs and examples instead.

Success target: another proof of active maintenance.

### Day 14: Submit

- Submit Codex for Open Source application.
- Use `docs/codex-for-oss-application.md`.
- Include GitHub, npm, CI, releases, article, and roadmap links.

## Weekly Task Board

| Priority | Task                                  | Owner                              | Status                 |
| -------- | ------------------------------------- | ---------------------------------- | ---------------------- |
| P0       | Publish launch article                | Human posts, AI prepared draft     | Ready                  |
| P0       | Share X launch posts                  | Human posts, AI prepared copy      | Ready                  |
| P0       | Gather first stars ethically          | Human network, AI prepared message | Ready                  |
| P1       | Implement `v0.1.1` CSV encoding hints | AI can implement                   | Planned                |
| P1       | Add first user feedback issue         | Human + AI triage                  | Planned                |
| P1       | Submit application                    | Human submits, AI prepared answers | Ready after visibility |
| P2       | Add demo GIF or screenshot            | AI can prepare if needed           | Optional               |
| P2       | Add config file support               | AI can implement                   | Optional               |

## What Not To Do

- Do not buy stars.
- Do not mass-DM strangers.
- Do not overclaim adoption.
- Do not imply OpenAI endorsed the project before acceptance.
- Do not upload private business CSV files as examples.

## Application Timing Recommendation

Best practical path:

1. Spend 7 days collecting lightweight public signals.
2. Ship one small maintenance release.
3. Submit with honest evidence.

If speed matters more than odds, submit now. If the goal is maximizing acceptance probability, wait until Day 7 or Day 14.
