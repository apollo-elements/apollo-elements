# @apollo-elements/atomico

## 1.0.1-next.0

### Patch Changes

- Updated dependencies [31b95bc]
  - @apollo-elements/core@1.0.1-next.0

## 1.0.0

### Major Changes

- 6c1b0ac7: First release 🧁. Read docs at [https://apolloelements.dev/api/libraries/atomico/](https://apolloelements.dev/api/libraries/atomico/)

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

## 0.0.0-next.3

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

## 0.0.0-next.2

### Patch Changes

- 30a31ea: Fix TS types for cross-compatibility with client 3.3 and 3.4
- Updated dependencies [30a31ea]
  - @apollo-elements/core@0.0.1-next.6

## 0.0.0-next.1

### Major Changes

- ad4d124b: First release 🧁
