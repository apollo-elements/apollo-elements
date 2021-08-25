# Generator >> App || 00

Generate an Apollo Elements skeleton app.

## Example

<code-tabs collection="package-managers" default-tab="npm" align="end">

```bash tab npm
npm init @apollo-elements -- \
  app \
    --uri '/graphql' \
    --install \
    --start \
    --overwrite
```

```bash tab yarn
npm init @apollo-elements -- \
  app \
    --pkg-manager yarn \
    --uri '/graphql' \
    --install \
    --start \
    --overwrite
```

```bash tab pnpm
pnpm init @apollo-elements -- \
  app \
    --pkg-manager pnpm \
    --uri '/graphql' \
    --install \
    --start \
    --overwrite
```

</code-tabs>

## Options

| Flag              | Description                             | Type                  | Default |
| ----------------- | --------------------------------------- | --------------------- | ------- |
| `--help`          | Show help                               | boolean               |         |
| `--version`       | Show version number                     | boolean               |         |
| `--pkg-manager`   | Preferred package manager               | `npm`\|`yarn`\|`pnpm` | `npm`   |
| `--uri`, `-u`     | URI to your GraphQL endpoint            | string                |         |
| `--overwrite`     | Overwrite existing files                | boolean               | false   |
| `--codegen`       | Run codegen after scaffolding files     | string                | true    |
| `--install`, `-i` | Automatically install dependencies      | boolean               | false   |
| `--start`, `-s`   | Launch the dev server after scaffolding | boolean               | false   |
