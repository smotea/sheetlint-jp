# Rules

sheetlint-jp checks common data quality problems in Japanese business CSV files before the file is passed to AI tools, Google Apps Script, ETL scripts, or manual import jobs.

| ruleId                  | severity | What it checks                                                             |
| ----------------------- | -------- | -------------------------------------------------------------------------- |
| `blank-cell`            | warning  | Empty cells in data rows.                                                  |
| `duplicate-header`      | error    | Duplicate header names in the first row.                                   |
| `column-count-mismatch` | error    | Rows whose column count differs from the header row.                       |
| `mixed-space`           | warning  | Cells that contain both half-width and full-width spaces.                  |
| `invisible-character`   | warning  | Zero-width spaces, non-breaking spaces, and control characters.            |
| `duplicate-row`         | warning  | Completely duplicated data rows.                                           |
| `postal-code-format`    | error    | Postal code columns that are not `123-4567` or `1234567`.                  |
| `phone-number-format`   | error    | Phone number columns that do not look like Japanese phone numbers.         |
| `amount-number`         | error    | Amount-like columns that cannot be treated as numbers.                     |
| `duplicate-key`         | error    | Duplicate combinations of key columns passed with `--key` or schema `key`. |
| `schema-missing-column` | error    | Columns defined in schema JSON but missing from the CSV header.            |
| `schema-required-cell`  | error    | Empty values in schema columns marked as required.                         |

## Column detection

Postal code, phone number, and amount rules run when either condition is true:

- The header name looks like a target column, for example `郵便番号`, `電話番号`, `月額料金`.
- The column is declared in `schema.json` with `type: "postalCode"`, `type: "phone"`, or `type: "amount"`.

## Schema example

```json
{
  "key": ["駐車場名", "区画番号"],
  "columns": [
    { "name": "駐車場名", "required": true, "type": "string" },
    { "name": "区画番号", "required": true, "type": "string" },
    { "name": "郵便番号", "type": "postalCode" },
    { "name": "電話番号", "type": "phone" },
    { "name": "月額料金", "type": "amount" }
  ]
}
```
