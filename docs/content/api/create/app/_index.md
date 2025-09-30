---
title: "App"
weight: 00
sidebar: api
---

Generate an Apollo Elements skeleton app.

## Example

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}{{<include app-npm.sh>}}{{</code-tab>}}
  {{<code-tab package="yarn">}}{{<include app-yarn.sh>}}{{</code-tab>}}
  {{<code-tab package="pnpm">}}{{<include app-pnpm.sh>}}{{</code-tab>}}
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
