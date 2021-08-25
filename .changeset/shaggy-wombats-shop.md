---
"@apollo-elements/create": major
---

Changes `--yes` flag to `--overwrite` and `--package-defaults`
Changes `--skip-codegen` flag to `--no-codegen`
Adds `--silent` flag
Adds `--editor` and `--no-editor` flags (replaces `--fields` and `--variables` in most cases)
Uses `near-operation-file` graphql-codegen preset instead of importing types from `schema.ts`
Adds tests for app and component generators
