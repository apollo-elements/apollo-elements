# @apollo-elements/create

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
  npm i -S @apollo-elements/lit-apollo@next
  ```

  ```bash
  yarn remove lit-element lit-html
  yarn add @apollo-elements/lit-apollo@next
  ```
