---
title: Component
eleventyNavigation:
  order: 10
---

Generate an Apollo Element

## Example

<code-copy>

```sh
npm init @apollo-elements -- \
  component \
    --type mutation \
    --name x-user-profile \
    --operation-name UpdateProfile
    --variables '$input: UpdateProfileInput!' \
    --fields 'updateProfile(input: $input) { id }' \
    --subdir user \
    --schema-path '#schema' \
    --shared-css-path '#components/shared.css' \
    --no-codegen
    --overwrite
```

</code-copy>

## Options

| Flag                | Description                                               | Type                                 | Default |
| ------------------- | --------------------------------------------------------- | ------------------------------------ | ------- |
| `--help`            | Show help                                                 | boolean                              |         |
| `--version`         | Show version number                                       | boolean                              |         |
| `--pkg-manager`     | Preferred package manager                                 | `npm`\|`yarn`                        | `npm`   |
| `--type`, `-t`      | Element type                                              | `query`\|`mutation`\| `subscription` | `query` |
| `--name`, `-n`      | Custom element tag name                                   | string                               |         |
| `--subdir`, `-d`    | Optional subdir under src/components                      | string                               |         |
| `--overwrite`       | Overwrite existing files                                  | boolean                              | false   |
| `--codegen`         | Run codegen after scaffolding files                       | boolean                              | true    |
| `--schema-path`     | Optional custom path to schema types file                 | string                               |         |
| `--shared-css-path` | Optional custom path to shared component styles file      | string                               |         |
| `--variables`       | Optional custom variables e.g. `input: $UpdateUserInput`  | string                               |         |
| `--fields`          | Optional custom fields e.g. `id name picture { alt url }` | string                               |         |
