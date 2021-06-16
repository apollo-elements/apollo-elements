## @apollo-elements/create

<div align="center">
  <img src="./create-screenshot.png" alt="command output in terminal"/>
</div>

[![Published on npm](https://img.shields.io/npm/v/@apollo-elements/create.svg)](https://www.npmjs.com/package/@apollo-elements/create)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@apollo-elements/create)
[![ISC License](https://img.shields.io/npm/l/@apollo-elements/create)](https://github.com/apollo-elements/apollo-elements/blob/main/LICENCE.md)
[![Release](https://github.com/apollo-elements/apollo-elements/workflows/Release/badge.svg)](https://github.com/apollo-elements/apollo-elements/actions)

<strong>⚡️ App and Component Generator for Apollo Elements 🚀</strong>

> 🔎 Read the [Full API Docs](https://apolloelements.dev/api/libraries/create/) 🔎

To quickly get started with apollo-elements, generate a skeleton app with this command

```
npm init @apollo-elements
```

Which will prompt you to generate a full app, or a component thereof.

## App Generator

```
npm init @apollo-elements -- app
```

Generate an Apollo Elements Skeleton App

### Example
```bash
npm init @apollo-elements -- \
  app \
    --pkg-manager yarn \
    --uri '/graphql' \
    --install \
    --start \
    --yes
```

### Options
| Flag | Description | type | default |
|-----|-----|-----|-----|
| `--help`         | Show help | boolean | |
| `--version`       | Show version number | boolean | |
| `--pkg-manager`   | Preferred package manager | `npm` or `yarn` | `npm` |
| `--uri`, `-u`     | URI to your GraphQL endpoint | string |
| `--yes`, `-y`     | Use default package.json fields (e.g. author, license) | boolean |
| `--skip-codegen`  | Skip the codegen phase | string | false |
| `--install`, `-i` | Automatically install dependencies | boolean |
| `--start`, `-s`   | Launch the dev server after scaffolding | boolean |

### 🔋 Batteries Included

The generated app comes with plenty of bells-and-whistles:

- TypeScript
- Linting with eslint and an opinionated ruleset
- Buildless development workflow with `@web/dev-server`
- Minified production bundle
- A basic Apollo Client instance
- Simple, unopinionated SPA routing
- Code-generated TypeScript typings for GraphQL documents
- `import MyQuery from './My.query.graphql'`
- `import styles from './my-element.css'`

### 🛎 Scripts

These npm scripts help you get your work done in style:

```
npm start
yarn start
```

runs the code generator and the development server in watch mode

```
npm run build
yarn build
```

bundles the app into `/build`. The build will bundle and minify your javascript, and minify your HTML. Just upload to your static file host and you're good.

```
npm run lint
yarn lint
```

Lint your app with an opinionated set of rules for JavaScript and TypeScript

```
npm test
yarn test
```

The generator currently doesn't offer strong opinions on testing your UI components, so `npm test` currently exist with an error code. For unit testing business logic (i.e. typePolicies), we recommend [@web/test-runner](https://modern-web.dev/guides/test-runner/getting-started/)

## Component Generator

```
npm init @apollo-elements -- component
```

Generate an Apollo Element

### Example
```bash
npm init @apollo-elements -- \
  component \
    --type mutation \
    --name x-user-profile \
    --subdir user \
    --schema-path '#schema' \
    --shared-css-path '#components/shared.css' \
    --variables '$input: UpdateProfileInput!' \
    --fields 'updateProfile(input: $input) { id }' \
    --skip-codegen
    --yes
```

### Options
| Flag | Description | type | default |
|-----|-----|-----|-----|
| `--help`             | Show help | boolean |
| `--version`          | Show version number | boolean |
| `--pkg-manager`      | Preferred package manager | `npm` or `yarn` | `npm` |
| `--type`, `-t`       | Element type | `query`, `mutation`, or `subscription` | `query` |
| `--name`, `-n`       | Custom element tag name | string |
| `--subdir`, `-d`     | Optional subdir under src/components | string |
| `--yes`, `-y`        | Optional subdir under src/components | boolean | false |
| `--skip-codegen`     | Skip the codegen phase | boolean | false |
| `--schema-path`      | Optional custom path to schema types file | string |
| `--shared-css-path`  | Optional custom path to shared component styles file | string |
| `--variables`        | Optional custom variables e.g. `input: $UpdateUserInput` | string |
| `--fields`           | Optional custom fields e.g. `id name picture { alt url }` | string |
