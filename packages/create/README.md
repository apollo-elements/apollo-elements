## Apollo Elements Generator

To quickly get started with apollo-elements, generate a skeleton app with this command

```
npm init @apollo-elements
```

Which will prompt you to generate a full app, or a component thereof.

## App Generator

```
npm init @apollo-elements app
```

Generate an Apollo Elements Skeleton App

### Options
| Flag | Description | type | default |
|-----|-----|-----|-----|
| `--help`        | Show help | boolean | |
| `--version`     | Show version number | boolean | |
| `--pkgManager`  | Preferred package manager | `npm` or `yarn` | `npm` |
| `--uri`         | URI to your GraphQL endpoint |
| `--yes, -y`     | Use default package.json fields (e.g. author, license) | boolean |
| `--install`     | Automatically install dependencies | boolean |
| `--start`       | Launch the dev server after scaffolding | boolean |

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
```
```
yarn start
```
runs the code generator and the development server in watch mode

```
npm run build
```
```
yarn build
```
bundles the app into `/build`. The build will bundle and minify your javascript, and minify your HTML. Just upload to your static file host and you're good.

```
npm run lint
```
```
yarn lint
```
Lint your app with an opinionated set of rules for JavaScript and TypeScript

```
npm test
```
```
yarn test
```
The generator currently doesn't offer strong opinions on testing your UI components, so `npm test` currently exist with an error code. For unit testing business logic (i.e. typePolicies), we recommend [@web/test-runner](https://modern-web.dev/guides/test-runner/getting-started/)

## Component Generator

```
npm init @apollo-elements component
```

Generate an Apollo Element

### Options
| Flag | Description | type | default |
|-----|-----|-----|-----|
| `--help`        | Show help | boolean |
| `--version`     | Show version number | boolean |
| `--pkgManager`  | Preferred package manager | `npm` or `yarn` | `npm` |
| `--type`        | Element type | `query`, `mutation`, or `subscription` | `query` |
| `--name, -n`    | Custom element tag name | string |
| `--subdir, -d`  | Optional subdir under src/components | string |