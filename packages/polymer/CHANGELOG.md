# @apollo-elements/polymer

## 4.0.0-next.1

### Patch Changes

- 55990659: Add missing custom-elements.json to package file manifest
- Updated dependencies [55990659]
  - @apollo-elements/core@0.0.1-next.0
  - @apollo-elements/mixins@4.0.0-next.1

## 4.0.0-next.0

### Major Changes

- 496415d4: Rename Polymer Elements to `<polymer-apollo-*>`

  In order to avoid conflict with `@apollo-elements/components`, the Polymer elements all now have a `polymer-` prefix, and their files are renamed to reflect that.

  ### Migrating

  Add the `polymer-` prefix to your templates and imports.

  ##### Before:

  ```js
  import "@apollo-elements/polymer/apollo-query";
  ```

  ```html
  <apollo-query query="[[ MyQuery ]]" data="{{ queryData }}"></apollo-query>
  ```

  ##### After:

  ```js
  import "@apollo-elements/polymer/polymer-apollo-query";
  ```

  ```html
  <polymer-apollo-query
    query="[[ MyQuery ]]"
    data="{{ queryData }}"
  ></polymer-apollo-query>
  ```

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
