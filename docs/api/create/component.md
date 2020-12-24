---
socialMediaImage: https://res.cloudinary.com/apolloelements/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_200,l_text:open sans_128_bold:Generator/w_1200,h_630,c_fill,q_auto,f_auto/w_600,c_fit,co_rgb:eee,g_south_west,x_60,y_100,l_text:open sans_78:Apollo Elements/social-template.svg
---
# Generator >> Component || 10

Generate an Apollo Element

## Example
```bash copy
npm init @apollo-elements -- \
  component \
    --type mutation \
    --name x-user-profile \
    --subdir user \
    --schema-path '#schema' \
    --shared-css-path '#components/shared.css' \
    --operation-params '$input: UpdateProfileInput!' \
    --fields 'updateProfile(input: $input) { id }' \
    --skip-codegen
    --yes
```

## Options
| Flag | Description | type | default |
|-----|-----|-----|-----|
| `--help`             | Show help | boolean |
| `--version`          | Show version number | boolean |
| `--pkg-manager`      | Preferred package manager | `npm` or `yarn` | `npm` |
| `--type`, `-t`       | Element type | `query`&vert;`mutation`&vert;or `subscription` | `query` |
| `--name`, `-n`       | Custom element tag name | string |
| `--subdir`, `-d`     | Optional subdir under src/components | string |
| `--yes`, `-y`        | Optional subdir under src/components | boolean | false |
| `--skip-codegen`     | Skip the codegen phase | boolean | false |
| `--schema-path`      | Optional custom path to schema types file | string |
| `--shared-css-path`  | Optional custom path to shared component styles file | string |
| `--variables`        | Optional custom variables e.g. `input: $UpdateUserInput` | string |
| `--fields`           | Optional custom fields e.g. `id name picture { alt url }` | string |
