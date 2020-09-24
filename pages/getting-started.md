## Apollo Elements App Generator

To quickly get started with apollo-elements, run this command

```
npm init @apollo-elements app
```

## 🔋 Batteries Included

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

## 🛎 Scripts

These npm scripts help you get your work done in style:

### start
```
npm start
```
runs the code generator and the development server in watch mode

### build
```
npm run build
```
bundles the app into `/build`. The build will bundle and minify your javascript, and minify your HTML. Just upload to your static file host and you're good.

### lint
```
npm run lint
```
Lint your app with an opinionated set of rules for JavaScript and TypeScript

### test
The generator currently doesn't offer strong opinions on testing your UI components, so `npm test` currently exist with an error code. For unit testing business logic (i.e. typePolicies), we recommend [@web/test-runner](https://modern-web.dev/guides/test-runner/getting-started/)

Check out the [`@apollo-elements/create` README](../../modules/_apollo_elements_create.html) for more info.