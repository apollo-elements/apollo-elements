---
"@apollo-elements/create": major
---

BREAKING: requires Node 24.

- Replaced `mkdirp` with `fs.promises.mkdir`
- Replaced `ncp` with `fs.promises.cp`
- Removed unused `globby` dependency
