# @apollo-elements/fast

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
