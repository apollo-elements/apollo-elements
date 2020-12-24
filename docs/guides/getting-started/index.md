---
description: Build a high-performance GraphQL web app with Apollo Elements
---

# Getting Started || 10

Apollo Elements comes with an app and component generator.

## Generator

Start the generator with this command:

<code-tabs collection="package-managers">

```bash tab npm
npm init @apollo-elements
```

```bash tab yarn
npm init @apollo-elements -- app --pkg-manager yarn
```

```bash tab pnpm
pnpm init @apollo-elements
```

</code-tabs>

This starts a CLI wizard that asks you some questions about your app, then scaffold the project for you. The generated app comes with plenty of bells-and-whistles:

- TypeScript
- Linting with eslint and an opinionated ruleset
- [Buildless development](./buildless-development.md) workflow with `@web/dev-server`
  - support for importing GraphQL files with `import MyQuery from './My.query.graphql'`
  - support for importing CSS with `import styles from './my-element.css'`
- Optimized [production bundle](./building-for-production.md)
- A basic Apollo Client instance
- Simple, unopinionated SPA routing
- Code-generated TypeScript typings for GraphQL documents

Check out the [`@apollo-elements/create` documentation](/api/create/) for more info.

### `package.json` Scripts

These npm scripts help you get your work done in style:

### start

Runs the code generator, the type checker, and the development server in watch mode

```bash copy
npm start
```

### build

Bundles the app into `/build`. The production bundle is tree-shaken and code-split, and it minifies your javascript and HTML. Upload the `/build` directory to a static file host and you're good.

```bash copy
npm run build
```

### lint

Lints your app with an opinionated set of rules for JavaScript and TypeScript

```bash copy
npm run lint
```

### test

The generator doesn't currently offer strong opinions on testing your UI components, so `npm test` exits with an error code. For unit testing business logic (i.e. typePolicies), we recommend [@web/test-runner](https://modern-web.dev/guides/test-runner/getting-started/)
