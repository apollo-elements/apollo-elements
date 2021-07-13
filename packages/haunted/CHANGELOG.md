# @apollo-elements/haunted

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
