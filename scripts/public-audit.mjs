import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const trackedFiles = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

const blockedPathPatterns = [
  /^HANDOFF(?:_TO_.*)?\.md$/i,
  /(^|\/)(?:\.private|private|private-notes|internal|drafts?|raw-feedback|handoff)(\/|$)/i,
  /^docs\/.*application.*\.md$/i,
  /^docs\/codex-oss-growth-plan\.md$/i,
  /^docs\/launch-kit\.md$/i,
  /^docs\/publication-checklist\.md$/i,
  /^docs\/zenn-launch-draft\.md$/i,
  /^docs\/zenn-launch-preview\.html$/i,
  /^docs\/zenn-profile\.md$/i,
  /^examples\/chintai-kakumei-/i,
  /^examples\/rental-management-/i,
  /^examples\/.*\.xlsx$/i,
  /(^|\/)\.env($|\.)/i,
  /(^|\/).*(secret|credential|token|private-key).*/i
];

const textFilePattern =
  /\.(cjs|csv|html|js|json|md|mjs|ts|tsx|txt|yml|yaml)$/i;

const secretPattern = new RegExp(
  [
    "sk-[A-Za-z0-9_-]{20,}",
    "github_pat_[A-Za-z0-9_]+",
    "gh[pousr]_[A-Za-z0-9_]{20,}",
    "AKIA[0-9A-Z]{16}",
    "AIza[0-9A-Za-z_-]{20,}",
    "client[_-]secret",
    "refresh[_-]token",
    "access[_-]token",
    "private\\s+key"
  ].join("|"),
  "i"
);

const internalNotePattern = new RegExp(
  [
    ["OpenAI", "organization", "ID"].join(" "),
    ["Codex", "for", "Open", "Source", "Application"].join(" "),
    "\\u7533\\u8acb\\u30e1\\u30e2",
    "\\u5fdc\\u52df\\u524d",
    ["S", "tar"].join("") + "\\u3092\\u304a\\u9858\\u3044",
    "\\u5927\\u91cfDM"
  ].join("|"),
  "i"
);

const riskyContentPatterns = [
  {
    name: "local machine path",
    pattern: /\/Users\/[^/\s]+|C:\\Users\\[^\\\s]+/i
  },
  {
    name: "email address",
    pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  },
  {
    name: "secret-looking token",
    pattern: secretPattern
  },
  {
    name: "internal publication or application note",
    pattern: internalNotePattern
  },
  {
    name: "real-looking Japanese phone number",
    pattern:
      /\b(?:0[1-9]\d?-(?!0000-\d{4})\d{4}-\d{4}|0[789]0-(?!0000-\d{4})\d{4}-\d{4}|0120-(?!000-000)\d{3}-\d{3})\b/
  }
];

const findings = [];

for (const file of trackedFiles) {
  for (const pattern of blockedPathPatterns) {
    if (pattern.test(file)) {
      findings.push(`${file}: blocked public path`);
    }
  }

  if (!textFilePattern.test(file)) {
    continue;
  }

  const content = readFileSync(file, "utf8");
  for (const { name, pattern } of riskyContentPatterns) {
    const match = content.match(pattern);
    if (match) {
      findings.push(`${file}: ${name}: ${match[0]}`);
    }
  }
}

if (findings.length > 0) {
  console.error("Public audit failed. Review these items before publishing:");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log("Public audit passed.");
