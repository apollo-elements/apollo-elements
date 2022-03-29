# @apollo-elements/mixins

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

- 5b77eb2f: Source linting
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

- 5b77eb2: Source linting
- Updated dependencies [5b77eb2]
- Updated dependencies [5b77eb2]
- Updated dependencies [68670e5]
  - @apollo-elements/core@2.0.0-next.1

## 4.1.1-next.0

### Patch Changes

- 4345e6a: Improvements to the internal type system makes working with query data easier

  This release makes some breaking changes to internal types. If for some reason you were importing
  those types from core, your code may break. However, normal usage should not be affected.

- Updated dependencies [4345e6a]
  - @apollo-elements/core@1.1.1-next.0

## 4.1.0

### Minor Changes

- da301f4: Update `@apollo/client` to support `grahpql` v16

### Patch Changes

- Updated dependencies [da301f4]
  - @apollo-elements/core@1.1.0

## 4.0.0

### Major Changes

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
- 6321c8b2: Removes unused "private" properties `__options` and `__networkStatus` from the apollo-query-mixin class
- 0a6152e6: fix homepage link in package.json
- abb2e5ec: Allow for 3.4.0-rc clients
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

## 4.0.0-next.7

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

## 4.0.0-next.6

### Patch Changes

- 30a31ea: Fix TS types for cross-compatibility with client 3.3 and 3.4
- Updated dependencies [30a31ea]
  - @apollo-elements/core@0.0.1-next.6

## 4.0.0-next.5

### Patch Changes

- cd972e5: Allow for 3.4.0-rc clients
- Updated dependencies [cd972e5]
  - @apollo-elements/core@0.0.1-next.5

## 4.0.0-next.4

### Patch Changes

- 41bc768c: fix homepage link in package.json

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

- b5f2502f: Makes GraphQL script children opt-in

  Removes the ability to read GraphQL documents (i.e. `query`, `mutation`, or `subscription`) and variables from the DOM via `<script type="application/graphql">` or json.

  You can opt-back in to this behaviour by applying the `GraphQLScriptChildMixin` from `@apollo-elements/mixins`.

  `<apollo-*>` components all still have this facility. Be careful when accepting user-generated HTML, as it means users can make arbitrary queries by adding HTML to the document.

  Read [the docs](https://apolloelements.dev/api/libraries/mixins/graphql-script-child-mixin/) for more info

  Deprecates `@apollo-elements/lib` and `@apollo-elements/interfaces`

  Removes the `lib` and `interfaces` packages, and moves their contents to `core`.

  If you were for some reason importing these, update your imports.

### Patch Changes

- 0ccd5682: Removes unused "private" properties `__options` and `__networkStatus` from the apollo-query-mixin class
