# @apollo-elements/hybrids

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
    query: query(MyQuery)
  });
  ```

  #### After:

  ```js
  define("my-query", {
    query: query(MyQuery, { client: someClient })
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
    query: query(MyQuery)
  });
  ```

  #### After:

  ```js
  define("my-query", {
    query: query(MyQuery, { client: someClient })
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
