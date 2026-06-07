# Security Policy

## Supported versions

This project is currently an MVP. Security fixes will target the latest released version.

## Reporting a vulnerability

Please open a private security advisory on GitHub if available, or contact the maintainer directly.

Do not include sensitive business CSV data in public issues.

Before publishing public repository changes, run:

```bash
npm run audit:public
```

This check blocks private launch notes, local machine paths, secret-looking tokens, and real-looking phone numbers.

## Data handling

sheetlint-jp runs locally. It does not send CSV contents to external services.
