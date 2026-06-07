# AGENTS.md

このリポジトリでは、すべて日本語で、非エンジニアにも伝わる説明をしてください。

## プロジェクト概要

`sheetlint-jp` は、日本の業務CSVをAI、GAS、自動化スクリプトに渡す前にチェックするCLIです。

主な目的は、表記ゆれ、不可視文字、重複、形式不正、スキーマ崩れを早めに見つけることです。

## コーディング規約

- Node.js + TypeScriptで実装します。
- ESM構成を維持します。
- 公開APIの型は `src/types.ts` に寄せます。
- CSV読み込みは `src/parser/` に置き、将来XLSXを追加しやすくします。
- ルールは `src/rules/` に置き、出力整形は `src/reporters/` に置きます。
- エラーメッセージは、事務職の人にも原因と次の行動がわかる文章にします。
- 最初のMVPでは、過剰な抽象化や大きな依存追加を避けます。

## テスト実行方法

```bash
npm test
```

## 変更時に必ず確認するコマンド

```bash
npm run build
npm test
npm run lint
node dist/cli.js examples/bad-sample.csv --format markdown --output report.md
```

## 破壊的変更を避ける注意点

- `Finding` の出力項目 `severity`, `ruleId`, `message`, `row`, `column`, `value`, `suggestion` は互換性を意識してください。
- CLIオプション `--format`, `--key`, `--schema`, `--output` の挙動を変える場合はREADMEも更新してください。
- 既存ruleIdは、利用者が自動処理で参照する可能性があるため安易に変更しないでください。
- サンプルCSVはREADMEやテストと連動しているため、変更時は関連ファイルも確認してください。

## README更新ルール

- 使い方が変わったら `README.md` と `README.ja.md` の両方を更新してください。
- ルールを追加・変更したら `docs/rules.md` を更新してください。
- AIに渡す前のスプレッドシート品質チェック、という切り口が伝わるようにしてください。
