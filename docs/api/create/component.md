# Generator >> Component || 10

Generate an Apollo Element

## Example

```bash copy
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
    --skip-codegen
    --yes
```

## Options

| Flag | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| `--help`             | Show help | boolean |
| `--version`          | Show version number | boolean |
| `--pkg-manager`      | Preferred package manager | `npm`&vert;`yarn` | `npm` |
| `--type`, `-t`       | Element type | `query`&vert;`mutation`&vert; `subscription` | `query` |
| `--name`, `-n`       | Custom element tag name | string |
| `--subdir`, `-d`     | Optional subdir under src/components | string |
| `--yes`, `-y`        | Optional subdir under src/components | boolean | false |
| `--skip-codegen`     | Skip the codegen phase | boolean | false |
| `--schema-path`      | Optional custom path to schema types file | string |
| `--shared-css-path`  | Optional custom path to shared component styles file | string |
| `--variables`        | Optional custom variables e.g. `input: $UpdateUserInput` | string |
| `--fields`           | Optional custom fields e.g. `id name picture { alt url }` | string |
