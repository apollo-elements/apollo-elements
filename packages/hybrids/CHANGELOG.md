# @apollo-elements/hybrids

## 6.0.0

### Major Changes

- 1f59160: **BREAKING CHANGE**: Apollo Client 4 and Node.js 24

  This release updates from Apollo Client 3.x to Apollo Client 4.x.

  ## Installing Apollo Client 4

  **Before:**

  ```bash
  npm install @apollo/client@^3.0.0
  ```

  **After:**

  ```bash
  npm install @apollo/client@^4.0.6
  ```

  ## Requirements

  - **Node.js**: Minimum version is now 24.x (previously 18.x)
  - **TypeScript**: Minimum version is now 4.7 (if using TypeScript)

  ## Cache API Changes

  The deprecated `writeData` method has been removed. Use `writeQuery`, `writeFragment`, or `cache.modify` instead:

  **Before:**

  ```typescript
  cache.writeData({
    data: { user: { id: "1", name: "Alice" } },
  });
  ```

  **After:**

  ```typescript
  cache.writeQuery({
    query: gql`
      query GetUser {
        user {
          id
          name
        }
      }
    `,
    data: { user: { id: "1", name: "Alice" } },
  });
  ```

  ## Error Handling

  Error handling is more consistent in Apollo Client 4:

  ```typescript
  const { data, error, errors } = await client.query({ query });

  if (error) {
    // Network error or single GraphQL error
  }
  if (errors) {
    // Multiple GraphQL errors
  }
  ```

  ## Migration

  See the full migration guides for detailed instructions:

  - [Apollo Elements Migration Guide](https://apolloelements.dev/guides/getting-started/migrating/apollo-client-3/)
  - [Apollo Client 4 Migration Guide](https://www.apollographql.com/docs/react/migration/3.x-to-4.x)

- 4693ebe: Update dependencies to latest versions

  ## Breaking Changes

  ### @apollo-elements/atomico

  - Requires `atomico@^1.80.3` (updated from previous versions)
  - Internal implementation updated to use `useHost` + `useMemo` instead of removed `@atomico/hooks/use-controller`

  ### @apollo-elements/fast

  - Requires `@microsoft/fast-element@^2.7.0` (updated from v1.x)
  - Internal implementation updated for FAST Element v2 API changes

  ### @apollo-elements/hybrids

  - Requires `hybrids@^9.1.19` (updated from v7.x)
  - **User Action Required**: When using hybrids factories, you must now explicitly enable shadow DOM in your component definitions:

  ```javascript
  // Before (hybrids v7)
  define({
    tag: "my-element",
    query: query(MyQuery),
    render: (host) => html`...`,
  });

  // After (hybrids v9)
  define({
    tag: "my-element",
    query: query(MyQuery),
    render: {
      value: (host) => html`...`,
      shadow: true, // Required for shadow DOM
    },
  });
  ```

  ### @apollo-elements/create

  - Updated `execa` (v6→v9), `inquirer` (v8→v12), and `mkdirp` (v1→v3)
  - No user-facing changes to CLI behavior

  ## Non-Breaking Changes

  All packages updated to latest compatible dependency versions:

  - `@changesets/cli@^2.29.7`
  - `@rollup/plugin-commonjs@^28.0.6`
  - `@typescript-eslint/eslint-plugin@^8.45.0`
  - `eslint@^9.37.0`
  - `graphql@^16.11.0`
  - `mocha@^11.7.4`
  - `rollup@^4.52.4`
  - `typescript@^5.9.3`
  - And many more...

### Patch Changes

- Updated dependencies [875228a]
- Updated dependencies [1f59160]
- Updated dependencies [51875e6]
  - @apollo-elements/core@3.0.0

## 5.0.3

### Patch Changes

- 1bb1428: Compiles away [class static blocks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_static_initialization_blocks)
- Updated dependencies [1bb1428]
  - @apollo-elements/core@2.1.2

## 5.0.2

### Patch Changes

- 468912b: Update dependencies

## 5.0.1

### Patch Changes

- bc9ebd8: Fix build scripts
- 987c2cd: Update TypeScript to 4.6

  Note, previous major versions did not generate github releases
  due to problems with changesets. Their breaking change was to no longer
  transpile class private fields, so if you use webpack or other bundlers
  which don't support private fields, you'll need to use babel.

- Updated dependencies [bc9ebd8]
- Updated dependencies [987c2cd]
  - @apollo-elements/core@2.0.1

## 5.0.0

### Major Changes

- 68670e5a: No longer transpiles class private fields

### Patch Changes

- 4345e6a2: Improvements to the internal type system makes working with query data easier

  This release makes some breaking changes to internal types. If for some reason you were importing
  those types from core, your code may break. However, normal usage should not be affected.

- Updated dependencies [5b77eb2f]
- Updated dependencies [4345e6a2]
- Updated dependencies [5b77eb2f]
- Updated dependencies [68670e5a]
  - @apollo-elements/core@2.0.0

## 5.0.0-next.1

### Major Changes

- 68670e5: No longer transpiles class private fields

### Patch Changes

- Updated dependencies [5b77eb2]
- Updated dependencies [5b77eb2]
- Updated dependencies [68670e5]
  - @apollo-elements/core@2.0.0-next.1

## 4.0.1-next.0

### Patch Changes

- 4345e6a: Improvements to the internal type system makes working with query data easier

  This release makes some breaking changes to internal types. If for some reason you were importing
  those types from core, your code may break. However, normal usage should not be affected.

- Updated dependencies [4345e6a]
  - @apollo-elements/core@1.1.1-next.0

## 4.0.0

### Major Changes

- fed2e0c6: Upgrades hybrids dependency to version 5.3.3 and use `ApolloController`

  Now, `query`, `mutation`, and `subscription` factories use `ApolloController` under the hood. This removes the need to hack into hybrids' reactivity system, deletes bad prototype hacking, and decreseases bundle sizes.

  We also removed the `client` factory. Instead, pass a `client` instance in to the factory's options (or don't, to fallback to the default `window.__APOLLO_CLIENT__`).

  #### Before:

  ```js
  define("my-query", {
    client: client(someClient),
    query: query(MyQuery),
  });
  ```

  #### After:

  ```js
  define("my-query", {
    query: query(MyQuery, { client: someClient }),
  });
  ```

- 4cb497a4: Makes GraphQL script children opt-in

  Removes the ability to read GraphQL documents (i.e. `query`, `mutation`, or `subscription`) and variables from the DOM via `<script type="application/graphql">` or json.

  You can opt-back in to this behaviour by applying the `GraphQLScriptChildMixin` from `@apollo-elements/mixins`.

  `<apollo-*>` components and the Polymer components all still have this facility. Be careful when accepting user-generated HTML, as it means users can make arbitrary queries by adding HTML to the document.

  Read [the docs](https://apolloelements.dev/api/libraries/mixins/graphql-script-child-mixin/) for more info

  Deprecates `@apollo-elements/lib` and `@apollo-elements/interfaces`

  Removes the `lib` and `interfaces` packages, and moves their contents to `core`.

  If you were for some reason importing these, update your imports.

### Minor Changes

- ea45702b: Adds `optionsChanged` callback. This protected, optional callback allows for setting the `options` property on an ApolloQueryController to set options on the internal `ObservableQuery`. Use it by setting the options property. Setting internal properties will not initiate side effects.

  ```js
  class QueryElement extends ReactiveElement {
    query = new ApolloQueryController(this, SomeQuery);
  }

  const el = new QueryElement();
  el.query.options = { refetchWritePolicy: "merge" }; // will trigger `setOptions`
  el.query.options.refetchWritePolicy = "merge"; // will *not* trigger `setOptions`
  ```

### Patch Changes

- 620341dc: Update manifests
- 7665aba5: Add missing custom-elements.json to package file manifest
- fa75511d: Removed references to deprecated interfaces package
- 5e59f87d: Fix TS types for cross-compatibility with client 3.3 and 3.4
- Updated dependencies [620341dc]
- Updated dependencies [bf812f89]
- Updated dependencies [7665aba5]
- Updated dependencies [fa75511d]
- Updated dependencies [undefined]
- Updated dependencies [ea45702b]
- Updated dependencies [abb2e5ec]
- Updated dependencies [5e59f87d]
- Updated dependencies [792008ea]
  - @apollo-elements/core@1.0.0

## 4.0.0-next.5

### Minor Changes

- 702a304: Adds `optionsChanged` callback. This protected, optional callback allows for setting the `options` property on an ApolloQueryController to set options on the internal `ObservableQuery`. Use it by setting the options property. Setting internal properties will not initiate side effects.

  ```js
  class QueryElement extends ReactiveElement {
    query = new ApolloQueryController(this, SomeQuery);
  }

  const el = new QueryElement();
  el.query.options = { refetchWritePolicy: "merge" }; // will trigger `setOptions`
  el.query.options.refetchWritePolicy = "merge"; // will *not* trigger `setOptions`
  ```

### Patch Changes

- Updated dependencies [702a304]
  - @apollo-elements/core@0.1.0-next.7

## 4.0.0-next.4

### Patch Changes

- 30a31ea: Fix TS types for cross-compatibility with client 3.3 and 3.4
- Updated dependencies [30a31ea]
  - @apollo-elements/core@0.0.1-next.6

## 4.0.0-next.3

### Patch Changes

- 87a0e907: Update manifests
- Updated dependencies [87a0e907]
  - @apollo-elements/core@0.0.1-next.3

## 4.0.0-next.2

### Patch Changes

- 91d03c60: Removed references to deprecated interfaces package
- Updated dependencies [91d03c60]
  - @apollo-elements/core@0.0.1-next.2

## 4.0.0-next.1

### Patch Changes

- 55990659: Add missing custom-elements.json to package file manifest
- Updated dependencies [55990659]
  - @apollo-elements/core@0.0.1-next.0

## 4.0.0-next.0

### Major Changes

- df602f22: Upgrades hybrids dependency to version 5.3.3 and use `ApolloController`

  Now, `query`, `mutation`, and `subscription` factories use `ApolloController` under the hood. This removes the need to hack into hybrids' reactivity system, deletes bad prototype hacking, and decreseases bundle sizes.

  We also removed the `client` factory. Instead, pass a `client` instance in to the factory's options (or don't, to fallback to the default `window.__APOLLO_CLIENT__`).

  #### Before:

  ```js
  define("my-query", {
    client: client(someClient),
    query: query(MyQuery),
  });
  ```

  #### After:

  ```js
  define("my-query", {
    query: query(MyQuery, { client: someClient }),
  });
  ```

- b5f2502f: Makes GraphQL script children opt-in

  Removes the ability to read GraphQL documents (i.e. `query`, `mutation`, or `subscription`) and variables from the DOM via `<script type="application/graphql">` or json.

  You can opt-back in to this behaviour by applying the `GraphQLScriptChildMixin` from `@apollo-elements/mixins`.

  `<apollo-*>` components all still have this facility. Be careful when accepting user-generated HTML, as it means users can make arbitrary queries by adding HTML to the document.

  Read [the docs](https://apolloelements.dev/api/libraries/mixins/graphql-script-child-mixin/) for more info

  Deprecates `@apollo-elements/lib` and `@apollo-elements/interfaces`

  Removes the `lib` and `interfaces` packages, and moves their contents to `core`.

  If you were for some reason importing these, update your imports.
