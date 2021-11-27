# @apollo-elements/fast

## 2.1.0

### Minor Changes

- da301f4: Update `@apollo/client` to support `grahpql` v16

### Patch Changes

- Updated dependencies [da301f4]
  - @apollo-elements/core@1.1.0
  - @apollo-elements/mixins@4.1.0

## 2.0.0

### Major Changes

- be4306e7: Implements Apollo Behaviors for FASTElement

  Behaviors are reusable pieces of code that you can share between FAST elements. Like the core controllers they are stackable and reusable, and let you add multiple operations to a single element.

  This release adds `ApolloQueryBehavior`, `ApolloMutationBehavior`, and `ApolloSubscriptionBehavior`. [See the docs](https://next.apolloelements.dev/api/libraries/fast/) for usage examples and API docs.

  The previous single-operation base classes are still available, but they have moved to `/bases/`.

  **OLD**:

  ```js
  import { ApolloQuery } from "@apollo-elements/fast/apollo-query";
  ```

  **NEW**:

  ```js
  import { ApolloQuery } from "@apollo-elements/fast/bases/apollo-query";
  ```

  If you previously imported from `@apollo-elements/fast`, you can continue to do so. We recommend moving your code to behaviours though as a later version may remove the base classes.

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
- 6daed850: Fix context property on base classes
- fa75511d: Removed references to deprecated interfaces package
- 0a6152e6: fix homepage link in package.json
- 5e59f87d: Fix TS types for cross-compatibility with client 3.3 and 3.4
- Updated dependencies [620341dc]
- Updated dependencies [bf812f89]
- Updated dependencies [7665aba5]
- Updated dependencies [fa75511d]
- Updated dependencies [6321c8b2]
- Updated dependencies [0a6152e6]
- Updated dependencies [4cb497a4]
- Updated dependencies [undefined]
- Updated dependencies [ea45702b]
- Updated dependencies [abb2e5ec]
- Updated dependencies [5e59f87d]
- Updated dependencies [792008ea]
  - @apollo-elements/core@1.0.0
  - @apollo-elements/mixins@4.0.0

## 2.0.0-next.8

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
  - @apollo-elements/mixins@4.0.0-next.7

## 2.0.0-next.7

### Patch Changes

- 30a31ea: Fix TS types for cross-compatibility with client 3.3 and 3.4
- Updated dependencies [30a31ea]
  - @apollo-elements/core@0.0.1-next.6
  - @apollo-elements/mixins@4.0.0-next.6

## 2.0.0-next.6

### Patch Changes

- 3297d05: Fix context property on base classes
- Updated dependencies [cd972e5]
  - @apollo-elements/core@0.0.1-next.5
  - @apollo-elements/mixins@4.0.0-next.5

## 2.0.0-next.5

### Major Changes

- a8769cf9: Implements Apollo Behaviors for FASTElement

  Behaviors are reusable pieces of code that you can share between FAST elements. Like the core controllers they are stackable and reusable, and let you add multiple operations to a single element.

  This release adds `ApolloQueryBehavior`, `ApolloMutationBehavior`, and `ApolloSubscriptionBehavior`. [See the docs](https://next.apolloelements.dev/api/libraries/fast/) for usage examples and API docs.

  The previous single-operation base classes are still available, but they have moved to `/bases/`.

  **OLD**:

  ```js
  import { ApolloQuery } from "@apollo-elements/fast/apollo-query";
  ```

  **NEW**:

  ```js
  import { ApolloQuery } from "@apollo-elements/fast/bases/apollo-query";
  ```

  If you previously imported from `@apollo-elements/fast`, you can continue to do so. We recommend moving your code to behaviours though as a later version may remove the base classes.

### Patch Changes

- Updated dependencies [bf3279ce]
  - @apollo-elements/core@0.0.1-next.4

## 2.0.0-next.4

### Patch Changes

- 41bc768c: fix homepage link in package.json
- Updated dependencies [41bc768c]
  - @apollo-elements/mixins@4.0.0-next.4

## 2.0.0-next.3

### Patch Changes

- 87a0e907: Update manifests
- Updated dependencies [87a0e907]
  - @apollo-elements/core@0.0.1-next.3
  - @apollo-elements/mixins@4.0.0-next.3

## 2.0.0-next.2

### Patch Changes

- 91d03c60: Removed references to deprecated interfaces package
- Updated dependencies [91d03c60]
  - @apollo-elements/core@0.0.1-next.2
  - @apollo-elements/mixins@4.0.0-next.2

## 2.0.0-next.1

### Patch Changes

- 55990659: Add missing custom-elements.json to package file manifest
- Updated dependencies [55990659]
  - @apollo-elements/core@0.0.1-next.0
  - @apollo-elements/mixins@4.0.0-next.1

## 2.0.0-next.0

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

- Updated dependencies [0ccd5682]
- Updated dependencies [b5f2502f]
  - @apollo-elements/mixins@4.0.0-next.0
