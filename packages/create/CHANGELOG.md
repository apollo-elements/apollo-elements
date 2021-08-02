# @apollo-elements/create

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
