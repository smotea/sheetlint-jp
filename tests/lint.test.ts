import { describe, expect, it } from "vitest";
import { lintCsvText } from "../src/index.js";
import { formatMarkdown } from "../src/reporters/markdown.js";

const badCsv = `駐車場名,区画番号,郵便番号,電話番号,月額料金,備考,月額料金
青山パーク,A-01,1070062,03-0000-0000,"12,000",通常,"12,000"
青山パーク,A-01,1070062,03-0000-0000,"12,000",通常,"12,000"
銀座\u3000パーク,B-02,104-0061,090-0000-ABCD,不明,半角 全角\u3000混在,不明
渋谷パーク,C-03,150-0002,,15000,電話なし,15000
文字化けâ€™駐車場,D-04,ABC-0000,03 1234 5678,１２OOO,ゼロ幅\u200B文字,１２OOO
列ずれ,E-05,100-0001,03-0000-0002,20000,備考だけ`;

describe("lintCsvText", () => {
  it("detects core Japanese business CSV issues", () => {
    const result = lintCsvText(badCsv, "bad.csv", {
      keyColumns: ["駐車場名", "区画番号"]
    });
    const ruleIds = new Set(result.findings.map((finding) => finding.ruleId));

    expect(ruleIds).toContain("duplicate-header");
    expect(ruleIds).toContain("column-count-mismatch");
    expect(ruleIds).toContain("blank-cell");
    expect(ruleIds).toContain("mixed-space");
    expect(ruleIds).toContain("invisible-character");
    expect(ruleIds).toContain("duplicate-row");
    expect(ruleIds).toContain("postal-code-format");
    expect(ruleIds).toContain("phone-number-format");
    expect(ruleIds).toContain("amount-number");
    expect(ruleIds).toContain("duplicate-key");
    expect(result.summary.total).toBeGreaterThanOrEqual(10);
  });

  it("returns no findings for the good sample", () => {
    const goodCsv = `駐車場名,区画番号,郵便番号,電話番号,月額料金,備考
青山パーク,A-01,107-0062,03-0000-0000,"12,000",通常
銀座パーク,B-02,104-0061,090-0000-0000,18000,屋根あり`;

    const result = lintCsvText(goodCsv, "good.csv", {
      keyColumns: ["駐車場名", "区画番号"]
    });

    expect(result.findings).toEqual([]);
  });

  it("formats markdown reports", () => {
    const result = lintCsvText(badCsv, "bad.csv", {
      keyColumns: ["駐車場名", "区画番号"]
    });
    const markdown = formatMarkdown(result);

    expect(markdown).toContain("# sheetlint-jp report");
    expect(markdown).toContain(
      "| severity | ruleId | row | column | value | message | suggestion |"
    );
    expect(markdown).toContain("duplicate-key");
  });
});
