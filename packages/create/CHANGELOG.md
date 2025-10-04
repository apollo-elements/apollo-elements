# @apollo-elements/create

## 5.0.0

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

### Patch Changes

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

## 4.0.3

### Patch Changes

- 468912b: Update dependencies

## 4.0.2

### Patch Changes

- 6da2693: Update generated build script, dependencies

## 4.0.1

### Patch Changes

- 987c2cd: Update TypeScript to 4.6

  Note, previous major versions did not generate github releases
  due to problems with changesets. Their breaking change was to no longer
  transpile class private fields, so if you use webpack or other bundlers
  which don't support private fields, you'll need to use babel.

## 4.0.0

### Major Changes

- 68670e5a: No longer transpiles class private fields

### Patch Changes

- 5b77eb2f: Source linting
- 4345e6a2: Improvements to the internal type system makes working with query data easier

  This release makes some breaking changes to internal types. If for some reason you were importing
  those types from core, your code may break. However, normal usage should not be affected.

- dbf304ab: Remove `@rollup/plugin-graphql` dependency

## 4.0.0-next.1

### Major Changes

- 68670e5: No longer transpiles class private fields

### Patch Changes

- 5b77eb2: Source linting
- dbf304a: Remove `@rollup/plugin-graphql` dependency

## 3.1.4-next.0

### Patch Changes

- 4345e6a: Improvements to the internal type system makes working with query data easier

  This release makes some breaking changes to internal types. If for some reason you were importing
  those types from core, your code may break. However, normal usage should not be affected.

## 3.1.3

### Patch Changes

- 2690f02: Improves help messaging

## 3.1.2

### Patch Changes

- 1cefb64: Fixes the generated app so that it imports the app component's query from the correct file

## 3.1.1

### Patch Changes

- a9f697e: Fixes a bug which prevented the generator from progressing if certain options were not set

## 3.1.0

### Minor Changes

- da301f4: Update `@apollo/client` to support `grahpql` v16

## 3.0.3

### Patch Changes

- 127d9b8: update app template dependencies

## 3.0.2

### Patch Changes

- 46c6439: safer error handling
- 5746761: Uses confirm prompt for boolean generator options

## 3.0.1

### Patch Changes

- 10af788: Add back missing helpers.js file

## 3.0.0

### Major Changes

- bd0f528: Changes `--yes` flag to `--overwrite` and `--package-defaults`
  Changes `--skip-codegen` flag to `--no-codegen`
  Adds `--silent` flag
  Adds `--editor` and `--no-editor` flags (replaces `--fields` and `--variables` in most cases)
  Uses `near-operation-file` graphql-codegen preset instead of importing types from `schema.ts`
  Adds tests for app and component generators

## 2.0.1

### Patch Changes

- d8b7e52: Workaround for an [npm bug](https://github.com/npm/cli/issues/2632)
- f802cdf: Better error logging
- 4249e3a: Fixes for Windows users

## 2.0.1-next.2

### Patch Changes

- dc9235b2: Better error logging

## 2.0.1-next.1

### Patch Changes

- b5cb790: Workaround for an [npm bug](https://github.com/npm/cli/issues/2632)

## 2.0.1-next.0

### Patch Changes

- 821a0ec8: Workaround for an [npm bug](https://github.com/npm/cli/issues/2632)
- 38c1b3a4: Fixes for Windows users

## 2.0.0

### Major Changes

- 3b9b2123: Moves to ESM, so add

  ```json
  "type": "module"
  ```

  to you package.json

  Updates component and app templates to use controllers and TypedDocumentNode

### Minor Changes

- 8c747beb: Mocks the node `process` global in the browser, accounting for a problem in the `graphql` npm package, which is a dependency of Apollo client.

  See https://github.com/graphql/graphql-js/pull/2409

### Patch Changes

- d6eb894c: Update docs
- 620341dc: Update manifests
- 713637cd: Updates to `lit` npm package.

  To migrate,

  ```bash
  npm r -S lit-element lit-html
  npm i -S @apollo-elements/lit-apollo@next
  ```

  ```bash
  yarn remove lit-element lit-html
  yarn add @apollo-elements/lit-apollo@next
  ```

- 44396ea4: Fix GraphQL codegen config and other dotfiles
- ec684918: Add missing dev dependency
- abb2e5ec: Allow for 3.4.0-rc clients

## 2.0.0-next.6

### Patch Changes

- ff3eadd: Update docs

## 2.0.0-next.5

### Patch Changes

- 553d305: Fix GraphQL codegen config and other dotfiles

## 2.0.0-next.4

### Patch Changes

- a7875be: Add missing dev dependency

## 2.0.0-next.3

### Patch Changes

- cd972e5: Allow for 3.4.0-rc clients

## 2.0.0-next.2

### Major Changes

- db4d9bfa: Moves to ESM, so add

  ```json
  "type": "module"
  ```

  to you package.json

  Updates component and app templates to use controllers and TypedDocumentNode

## 1.5.0-next.1

### Patch Changes

- 87a0e907: Update manifests

## 1.5.0-next.0

### Minor Changes

- 3b3e5215: Mocks the node `process` global in the browser, accounting for a problem in the `graphql` npm package, which is a dependency of Apollo client.

  See https://github.com/graphql/graphql-js/pull/2409

### Patch Changes

- bc48777f: Updates to `lit` npm package.

  To migrate,

  ```bash
  npm r -S lit-element lit-html
  npm i -S @apollo-elements/lit-apollo
  ```

  ```bash
  yarn remove lit-element lit-html
  yarn add @apollo-elements/lit-apollo
  ```
