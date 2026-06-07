# AIにCSVを渡す前に、日本語業務データの壊れ方を検出するCLIを作った

## はじめに

Google SheetsやExcelで作ったCSVを、AI、Google Apps Script、社内ツール、自動化スクリプトに渡す前にチェックするCLIを作りました。

名前は `sheetlint-jp` です。

```bash
npx sheetlint-jp data.csv
```

GitHub:

<https://github.com/smotea/sheetlint-jp>

npm:

<https://www.npmjs.com/package/sheetlint-jp>

## なぜ作ったか

AIにCSV処理を頼むとき、AIのコードが間違う以前に、入力CSVそのものが壊れていることがあります。

たとえば:

- 半角スペースと全角スペースが混ざっている
- ゼロ幅スペースが入っている
- ヘッダーが重複している
- 行ごとの列数がずれている
- 郵便番号や電話番号の形式が崩れている
- 金額列に `確認中` や `三千円` が入っている
- キー列が重複している

人間が見ると何となく読めても、AIやスクリプトに渡すと別データとして扱われたり、インポート処理が壊れたりします。

## sheetlint-jpでできること

MVPでは次のチェックに対応しています。

- 空白セル検出
- ヘッダー重複検出
- 行ごとの列数不一致検出
- 全角・半角スペース混在検出
- 不可視文字検出
- 重複行検出
- 郵便番号形式チェック
- 電話番号形式チェック
- 金額列らしき列の数値チェック
- キー列の重複チェック

## 使い方

```bash
npx sheetlint-jp examples/bad-sample.csv
```

Markdownレポートにする場合:

```bash
npx sheetlint-jp examples/bad-sample.csv --format markdown --output report.md
```

キー列の重複を見たい場合:

```bash
npx sheetlint-jp data.csv --key 駐車場名,区画番号
```

schema JSONも使えます。

```bash
npx sheetlint-jp data.csv --schema schema.json
```

## AIに渡す前の使い方

まずCSVをチェックします。

```bash
npx sheetlint-jp customer-import.csv --schema schema.json --format markdown --output report.md
```

そのあと、CodexやClaude Codeにこう依頼します。

```text
まず report.md を読んでください。
CSVの危ない行を確認してから、インポート処理を書いてください。
```

AIに直接CSV処理を頼むより、壊れている前提を先に共有できるので安全です。

## ローカルファースト

`sheetlint-jp` はローカルで動きます。

CSVの中身を外部サービスには送信しません。

業務CSVには顧客情報や社内情報が入りやすいので、ここは大事にしています。

## 今後やりたいこと

- XLSX読み込み
- CSV文字コードのヒント
- 設定ファイル
- 住所や法人番号など日本向けチェック
- GitHub ActionsでのCSV品質チェック例

## おわりに

AIに仕事を頼む前に、入力データが壊れていないかを見る。

地味ですが、AI時代の業務自動化では大事な前処理だと思っています。

もし面白いと思ったら、StarやIssueをもらえると嬉しいです。

<https://github.com/smotea/sheetlint-jp>
