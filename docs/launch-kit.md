# Launch Kit

Use these drafts to create early, honest adoption signals for `sheetlint-jp`.

GitHub: <https://github.com/smotea/sheetlint-jp>

npm: <https://www.npmjs.com/package/sheetlint-jp>

## One-Line Pitch

sheetlint-jp is a local-first CLI that checks Japanese business CSV files before you hand them to AI agents, GAS, or automation scripts.

## X Posts

### Post 1: Launch

日本の業務CSVをAIに渡す前にチェックするCLIを作りました。

`sheetlint-jp`

- 全角/半角スペース混在
- 不可視文字
- 郵便番号/電話番号
- 金額列
- キー重複
- 列ずれ

を検出します。

```bash
npx sheetlint-jp data.csv
```

GitHub: https://github.com/smotea/sheetlint-jp

### Post 2: Before AI Angle

AIにCSV処理を頼む前に、CSV自体が壊れていることがけっこうあります。

見えないゼロ幅スペース、全角スペース、列ずれ、重複キー。

AIに「正しい前提」でコードを書かせる前に、まず入力データを検査するためのCLIを作りました。

https://github.com/smotea/sheetlint-jp

### Post 3: Local-First Privacy

`sheetlint-jp` はローカルで動きます。

業務CSVを外部サービスに送らず、手元で品質チェックしてMarkdown/JSONレポートを出せます。

そのレポートをCodex / Claude Code / Geminiに渡す、という使い方を想定しています。

https://www.npmjs.com/package/sheetlint-jp

### Post 4: Demo

壊れたCSVをチェックすると、こういうレポートが出ます。

- duplicate-header
- column-count-mismatch
- invisible-character
- phone-number-format
- duplicate-key

```bash
npx sheetlint-jp examples/bad-sample.csv --format markdown --output report.md
```

https://github.com/smotea/sheetlint-jp

### Post 5: Feedback Request

日本語CSVで「これ地味に困る」というデータ崩れがあれば教えてください。

住所、電話番号、金額、法人番号、Excel由来の文字化けなど、業務データ寄りのチェックを増やしていきたいです。

Issue歓迎です。

https://github.com/smotea/sheetlint-jp/issues

## Zenn / Qiita Intro

タイトル案:

AIにCSVを渡す前に、日本語業務データの壊れ方を検出するCLIを作った

短い概要:

Google SheetsやExcelで作ったCSVをAIやGASに渡す前に、表記ゆれ、不可視文字、列ずれ、重複キー、郵便番号・電話番号・金額列の形式不正をチェックするCLI `sheetlint-jp` を作りました。日本の業務CSVでよく起きる「見た目では分からない崩れ」を、ローカルで検出するための小さなOSSです。

## Community Post

日本語CSVやスプレッドシートをAI/GASに渡す前の品質チェックCLIを作りました。

まだ小さいMVPですが、全角/半角スペース混在、不可視文字、列ずれ、重複キー、郵便番号・電話番号・金額列チェックに対応しています。

業務改善やCSV取り込みで似た困りごとがある方に試してもらえると嬉しいです。

GitHub: https://github.com/smotea/sheetlint-jp

npm: https://www.npmjs.com/package/sheetlint-jp

## Direct Ask To Friends

日本語CSVをAIやGASに渡す前にチェックするCLIを作りました。

もしテーマが面白いと思ったら、GitHubでStarをもらえると助かります。実際にCSVまわりで困った経験があれば、Issueで「こういうチェックが欲しい」と書いてもらえるとさらに嬉しいです。

https://github.com/smotea/sheetlint-jp

## Polite Star Request

Starをお願いするときは、次の言い方までに留める。

「もし役に立ちそう・テーマが面白いと思ったらStarをもらえると助かります」

避ける言い方:

- 「応募に必要なのでStarしてください」
- 「使わなくてもStarしてください」
- 大量DM
- 関係ないコミュニティへの投稿

## Launch Checklist

- [ ] Pin GitHub repo on profile
- [ ] Post X launch message
- [ ] Publish Zenn article
- [ ] Share npm link
- [ ] Ask 5 trusted people for feedback
- [ ] Convert feedback into issues
- [ ] Ship one small follow-up release
