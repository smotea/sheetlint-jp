# sheetlint-jp

[![CI](https://github.com/smotea/sheetlint-jp/actions/workflows/ci.yml/badge.svg)](https://github.com/smotea/sheetlint-jp/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/sheetlint-jp.svg)](https://www.npmjs.com/package/sheetlint-jp)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

AI、Google Apps Script、自動化スクリプトに渡す前に、日本の業務CSVをチェックするためのCLIです。

`sheetlint-jp` は、業務スプレッドシートでよく起きる「見た目では気づきにくいデータ崩れ」を検出します。たとえば、ヘッダー重複、列ずれ、不可視文字、全角・半角スペース混在、キー重複、郵便番号や電話番号の形式不正、金額列なのに数値として扱えない値などです。

> ローカルファーストです。CSVの中身を外部サービスに送信せず、手元のPC上でチェックします。

[English README](README.md)

## 何を解決するOSSか

AIやGASにCSVを渡す前に、入力データの危ない箇所を見つけます。

AIに「このCSVを処理して」と頼む前にCSV自体を確認しておくと、AIが壊れた前提でコードを書いてしまうリスクを減らせます。

## なぜ日本の業務CSVに特化しているか

日本の業務CSVでは、次のような問題がよくあります。

- 半角スペースと全角スペースが混ざる
- 見えないゼロ幅スペースが入る
- 郵便番号、電話番号、金額の表記が人によって変わる
- ExcelやGoogle Sheetsで編集するうちに列数がずれる
- 「駐車場名 + 区画番号」のような業務キーが重複する

見た目では普通に見えても、AI、GAS、集計スクリプトでは別データとして扱われることがあります。

## 想定ユーザー

- Google SheetsやExcelのCSVを書き出して扱う事務職・業務改善担当者
- 日本語CSVを社内ツールに取り込む開発者
- Codex、Claude Code、Gemini、GASにデータ処理を頼む前に入力データを確認したい人

## インストール方法

インストールせずに使う場合:

```bash
npx sheetlint-jp examples/bad-sample.csv
```

グローバルにインストールする場合:

```bash
npm install -g sheetlint-jp
sheetlint-jp examples/bad-sample.csv
```

開発用に動かす場合:

```bash
npm install
npm run build
node dist/cli.js examples/bad-sample.csv
```

## 使い方

```bash
sheetlint-jp <file.csv> [options]
```

オプション:

```bash
--format json
--format markdown
--key 駐車場名,区画番号
--schema examples/schema.json
--output report.md
```

例:

```bash
npx sheetlint-jp examples/bad-sample.csv
npx sheetlint-jp examples/bad-sample.csv --format json
npx sheetlint-jp examples/bad-sample.csv --format markdown --output report.md
npx sheetlint-jp examples/bad-sample.csv --key 駐車場名,区画番号
npx sheetlint-jp examples/bad-sample.csv --schema examples/schema.json
```

## 実務寄りデモ

匿名化した賃貸管理データ風のサンプルも入れています。

```bash
node dist/cli.js examples/chintai-kakumei-sample.csv \
  --schema examples/chintai-kakumei-schema.json \
  --format markdown \
  --output examples/chintai-kakumei-report.md
```

まずレポートを作り、そのレポートをAIや開発者に渡してから、取り込み・整形・自動化コードを書く流れを想定しています。

## サンプル入力

```csv
駐車場名,区画番号,郵便番号,電話番号,月額料金,備考,月額料金
青山パーク,A-01,1070062,03-1234-5678,"12,000",通常,"12,000"
青山パーク,A-01,1070062,03-1234-5678,"12,000",通常,"12,000"
銀座　パーク,B-02,104-0061,090-1234-ABCD,不明,半角 全角　混在,不明
```

## サンプル出力

```text
sheetlint-jp report: examples/bad-sample.csv
Summary: 8 error(s), 5 warning(s), 0 info(s)

[ERROR] duplicate-header
  内容: ヘッダー「月額料金」が重複しています。
  場所: 1行目 / 月額料金 (7列目)
  値: 月額料金
  提案: 最初の「月額料金」と区別できる列名に変更してください。
```

JSONとMarkdown出力には、次の項目が入ります。

- `severity`: `error` / `warning` / `info`
- `ruleId`
- `message`
- `row`
- `column`
- `value`
- `suggestion`

## Codex / Claude Code での活用例

AIにCSV処理を依頼する前に、まずチェックレポートを作ります。

```bash
npx sheetlint-jp customer-import.csv --schema schema.json --format markdown --output report.md
```

そのうえで、AIに次のように頼みます。

```text
まず report.md を読んでください。CSVの危ない行を確認してから、インポート処理を書いてください。
```

これにより、AIが壊れたCSVを正しいものとして扱ってしまうリスクを減らせます。

## OSSメンテナンス

公開OSSとして運用しやすいように、次の準備を入れています。

- GitHub Actionsでbuild、test、lint、CLIサンプル実行、npm package内容確認を実行
- Issueテンプレートで、業務データを匿名化して投稿するよう案内
- `docs/maintenance.md` にリリースとトリアージの流れを記載
- `docs/publication-checklist.md` にGitHub公開、npm公開、応募前チェックを整理

## Roadmap

- XLSX読み込み対応
- 設定ファイル対応
- 住所、法人番号など日本向けチェックの追加
- severityのカスタマイズ
- 文字コード検出のヒント表示
- GitHub ActionsでのCSV品質チェック例

## Contributing

IssueやPull Requestを歓迎します。最初のMVPでは、非エンジニアでも使いやすく、開発者が拡張しやすい小さな設計を重視します。

PR前に確認するコマンド:

```bash
npm run check
```

詳しくは [CONTRIBUTING.md](CONTRIBUTING.md) を見てください。

## Security

公開Issueに、実データのCSV、顧客情報、認証情報を貼らないでください。詳しくは [SECURITY.md](SECURITY.md) を見てください。

## License

MIT
