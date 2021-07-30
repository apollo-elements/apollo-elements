# @apollo-elements/core

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
