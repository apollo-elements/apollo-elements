---
title: "Getting Started"
weight: 10
description: "Build a high-performance GraphQL web app with Apollo Elements"
sidebar: guides
---

Apollo Elements apps use GraphQL and Apollo Client to manage their state. Each component in your app reads it's data from the graph with a [query](../usage/queries/), and can change the state of the app with [mutations](../usage/mutations/) or through one of the [local state](../usage/local-state/) techniques.

<figure id="apollo-elements-cycle-diagram">
  {{<include "cycle.svg">}}
  <figcaption>
    Circular flow chart showing the essential UI loop for Apollo Elements apps: <a href="../usage/queries/">Queries</a> fetch data from the server, render them via component templates to the DOM, where <a href="../usage/mutations/">mutation components</a> fire in response to user events, and update the Apollo cache, which in turn notifies connected query elements.
  </figcaption>
</figure>

## App Generator

Apollo Elements comes with an app and component generator. Start the generator with this command:

<code-tabs collection="package-managers" default-tab="npm">
  {{<code-tab package="npm">}}{{<include "init-npm.sh">}}{{</code-tab>}}
  {{<code-tab package="yarn">}}{{<include "init-yarn.sh">}}{{</code-tab>}}
  {{<code-tab package="pnpm">}}{{<include "init-pnpm.sh">}}{{</code-tab>}}
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

```bash
npm start
```

### build

Bundles the app into `/build`. The production bundle is tree-shaken and code-split, and it minifies your javascript and HTML. Upload the `/build` directory to a static file host and you're good.

```bash
npm run build
```

### lint

Lints your app with an opinionated set of rules for JavaScript and TypeScript

```bash
npm run lint
```

### test

The generator doesn't currently offer strong opinions on testing your UI components, so `npm test` exits with an error code. For unit testing business logic (i.e. typePolicies), we recommend [@web/test-runner](https://modern-web.dev/guides/test-runner/getting-started/)
