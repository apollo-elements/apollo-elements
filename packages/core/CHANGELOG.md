# @apollo-elements/core

## 1.1.0

### Minor Changes

- da301f4: Update `@apollo/client` to support `grahpql` v16

## 1.0.0

### Major Changes

- First major release. Read docs at [https://apolloelements.dev/api/core/](https://apolloelements.dev/api/core/)

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
- bf812f89: Fix generated custom elements manifest
- 7665aba5: Add missing custom-elements.json to package file manifest
- fa75511d: Removed references to deprecated interfaces package
- abb2e5ec: Allow for 3.4.0-rc clients
- 5e59f87d: Fix TS types for cross-compatibility with client 3.3 and 3.4
- 792008ea: Refactor and update docs

## 0.1.0-next.7

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

## 0.0.1-next.6

### Patch Changes

- 30a31ea: Fix TS types for cross-compatibility with client 3.3 and 3.4

## 0.0.1-next.5

### Patch Changes

- cd972e5: Allow for 3.4.0-rc clients

## 0.0.1-next.4

### Patch Changes

- bf3279ce: Refactor and update docs

## 0.0.1-next.3

### Patch Changes

- 87a0e907: Update manifests

## 0.0.1-next.2

### Patch Changes

- 91d03c60: Removed references to deprecated interfaces package

## 0.0.1-next.1

### Patch Changes

- 408641da: Fix generated custom elements manifest

## 0.0.1-next.0

### Patch Changes

- 55990659: Add missing custom-elements.json to package file manifest
