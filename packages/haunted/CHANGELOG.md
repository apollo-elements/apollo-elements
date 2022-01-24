# @apollo-elements/haunted

## 2.0.1-next.0

### Patch Changes

- 4345e6a: Improvements to the internal type system makes working with query data easier

  This release makes some breaking changes to internal types. If for some reason you were importing
  those types from core, your code may break. However, normal usage should not be affected.

- Updated dependencies [4345e6a]
  - @apollo-elements/core@1.1.1-next.0

## 2.0.0

### Major Changes

- 5b957d97: No longer mixes GraphQL properties into the element

  Previously, the `use(Query|Mutation|Subscription)` hooks would mix the `Apollo(Query|Mutation|Subscription)Element` interfaces into the haunted host element's prototype. This was a bad hack, and only worked if your element had a single operation in it.

  Using `Apollo(Query|Mutation|Subscription)Controller`, the hooks now keep to themselves without modifying the host prototype.

  ### Migration

  This is technically a breaking change, so if you were relying on having `this.data` available on the element, update your code.

  You also have to pass in a reference to the host element if you want to use the hooks along with `<apollo-client>`. This is because the `ReactiveControllerHost` which the hooks use behind the scenes via [`useController`]() doesn't have access to the host element. This also means that you _must_ use the `function` keyword to define components you intend to use with `<apollo-client>`.

  ##### Before:

  ```js
  customElements.define(
    "my-query",
    component(() => {
      const { data } = useQuery(MyQuery);
      const myName = data && data.myName;
      return html`
        <output>${myName}</output>
      `;
    })
  );
  ```

  ```html
  <apollo-client>
    <my-query></my-query>
  </apollo-client>
  ```

  ##### After:

  ```js
  customElements.define(
    "my-query",
    component(function Query() {
      const { data } = useQuery(MyQuery, { hostElement: this });
      const myName = data && data.myName;
      return html`
        <output>${myName}</output>
      `;
    })
  );
  ```

  ```html
  <apollo-client>
    <my-query></my-query>
  </apollo-client>
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
- 0a6152e6: fix homepage link in package.json
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

## 2.0.0-next.5

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

## 2.0.0-next.4

### Patch Changes

- 30a31ea: Fix TS types for cross-compatibility with client 3.3 and 3.4
- Updated dependencies [30a31ea]
  - @apollo-elements/core@0.0.1-next.6

## 2.0.0-next.3

### Patch Changes

- 41bc768c: fix homepage link in package.json

## 2.0.0-next.2

### Patch Changes

- 87a0e907: Update manifests
- Updated dependencies [87a0e907]
  - @apollo-elements/core@0.0.1-next.3

## 2.0.0-next.1

### Patch Changes

- 55990659: Add missing custom-elements.json to package file manifest
- Updated dependencies [55990659]
  - @apollo-elements/core@0.0.1-next.0

## 2.0.0-next.0

### Major Changes

- bb53649c: No longer mixes GraphQL properties into the element

  Previously, the `use(Query|Mutation|Subscription)` hooks would mix the `Apollo(Query|Mutation|Subscription)Element` interfaces into the haunted host element's prototype. This was a bad hack, and only worked if your element had a single operation in it.

  Using `Apollo(Query|Mutation|Subscription)Controller`, the hooks now keep to themselves without modifying the host prototype.

  ### Migration

  This is technically a breaking change, so if you were relying on having `this.data` available on the element, update your code.

  You also have to pass in a reference to the host element if you want to use the hooks along with `<apollo-client>`. This is because the `ReactiveControllerHost` which the hooks use behind the scenes via [`useController`]() doesn't have access to the host element. This also means that you _must_ use the `function` keyword to define components you intend to use with `<apollo-client>`.

  ##### Before:

  ```js
  customElements.define(
    "my-query",
    component(() => {
      const { data } = useQuery(MyQuery);
      const myName = data && data.myName;
      return html`
        <output>${myName}</output>
      `;
    })
  );
  ```

  ```html
  <apollo-client>
    <my-query></my-query>
  </apollo-client>
  ```

  ##### After:

  ```js
  customElements.define(
    "my-query",
    component(function Query() {
      const { data } = useQuery(MyQuery, { hostElement: this });
      const myName = data && data.myName;
      return html`
        <output>${myName}</output>
      `;
    })
  );
  ```

  ```html
  <apollo-client>
    <my-query></my-query>
  </apollo-client>
  ```

- b5f2502f: Makes GraphQL script children opt-in

  Removes the ability to read GraphQL documents (i.e. `query`, `mutation`, or `subscription`) and variables from the DOM via `<script type="application/graphql">` or json.

  You can opt-back in to this behaviour by applying the `GraphQLScriptChildMixin` from `@apollo-elements/mixins`.

  `<apollo-*>` components all still have this facility. Be careful when accepting user-generated HTML, as it means users can make arbitrary queries by adding HTML to the document.

  Read [the docs](https://apolloelements.dev/api/libraries/mixins/graphql-script-child-mixin/) for more info

  Deprecates `@apollo-elements/lib` and `@apollo-elements/interfaces`

  Removes the `lib` and `interfaces` packages, and moves their contents to `core`.

  If you were for some reason importing these, update your imports.
