# @apollo-elements/core

## 3.0.0

### Major Changes

- 1f59160: **BREAKING CHANGE**: Apollo Client 4 and Node.js 24

  This release updates from Apollo Client 3.x to Apollo Client 4.x.

  ## Installing Apollo Client 4

  **Before:**

  ```bash
  npm install @apollo/client@^3.0.0
  ```

  **After:**

  ```bash
  npm install @apollo/client@^4.0.6
  ```

  ## Requirements

  - **Node.js**: Minimum version is now 24.x (previously 18.x)
  - **TypeScript**: Minimum version is now 4.7 (if using TypeScript)

  ## Cache API Changes

  The deprecated `writeData` method has been removed. Use `writeQuery`, `writeFragment`, or `cache.modify` instead:

  **Before:**

  ```typescript
  cache.writeData({
    data: { user: { id: "1", name: "Alice" } },
  });
  ```

  **After:**

  ```typescript
  cache.writeQuery({
    query: gql`
      query GetUser {
        user {
          id
          name
        }
      }
    `,
    data: { user: { id: "1", name: "Alice" } },
  });
  ```

  ## Error Handling

  Error handling is more consistent in Apollo Client 4:

  ```typescript
  const { data, error, errors } = await client.query({ query });

  if (error) {
    // Network error or single GraphQL error
  }
  if (errors) {
    // Multiple GraphQL errors
  }
  ```

  ## Migration

  See the full migration guides for detailed instructions:

  - [Apollo Elements Migration Guide](https://apolloelements.dev/guides/getting-started/migrating/apollo-client-3/)
  - [Apollo Client 4 Migration Guide](https://www.apollographql.com/docs/react/migration/3.x-to-4.x)

- 51875e6: **BREAKING CHANGE**: Removed `errors` array from subscriptions

  Subscription controllers no longer maintain an `errors` array. Subscriptions now only use the `error` (singular) field, matching Apollo Client's `useSubscription` behavior.

  **Before:**

  ```typescript
  subscription.errors; // readonly GraphQLFormattedError[]
  ```

  **After:**

  ```typescript
  subscription.error; // Error | null
  ```

  This change aligns apollo-elements subscriptions with Apollo Client v4's subscription API, where subscription results include only `error` (singular), not `errors` (plural).

  **Migration:** If you were reading `subscription.errors`, use `subscription.error` instead.

### Patch Changes

- 875228a: `ApolloQueryController`: default to `notifyOnNetworkStatusChange`

## 2.1.2

### Patch Changes

- 1bb1428: Compiles away [class static blocks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_static_initialization_blocks)

## 2.1.1

### Patch Changes

- 607f8e7: Refactor internal notification mechanism

  removes internal `update` symbol. changes internal `notify` method signature
  from a list of property names to a record of property name to old value.

## 2.1.0

### Minor Changes

- 309c477: Adds `ReactiveVariableController`, a wrapper around
  [apollo reactive variables](https://www.apollographql.com/docs/react/local-state/reactive-variables/)
  which makes them easier to work with outside of React apps.

  For example, use it to create a simple SPA router with the [pwa-helpers](https://github.com/Polymer/pwa-helpers) package and `URLPattern`.

  Create the reactive variable and attach it to the SPA router:

  ```ts
  import "urlpattern-polyfill";

  import { installRouter } from "pwa-helpers/router";

  import { makeVar } from "@apollo/client/core";

  const pattern = new URLPattern({ pathname: "/users/:username" });

  const getLocation = (loc = window.location) => ({
    ...window.location,
    groups: pattern.exec(location.pathname)?.pathname?.groups,
  });

  export const locationVar = makeVar(getLocation());

  installRouter((loc) => locationVar(getLocation(loc)));
  ```

  Then use it in your components:

  ```ts
  export class PageViewer extends LitElement {
    router = new ReactiveVariableController(this, locationVar);

    render() {
      const { username } = this.router.value?.groups ?? {};
      return html`
        <section ?hidden=${!username}>
          <h2>User ${username}</h2>
        </section>
      `;
    }
  }
  ```

## 2.0.1

### Patch Changes

- bc9ebd8: Fix build scripts
- 987c2cd: Update TypeScript to 4.6

  Note, previous major versions did not generate github releases
  due to problems with changesets. Their breaking change was to no longer
  transpile class private fields, so if you use webpack or other bundlers
  which don't support private fields, you'll need to use babel.

## 2.0.0

### Major Changes

- 68670e5a: No longer transpiles class private fields

### Patch Changes

- 5b77eb2f: Source linting
- 4345e6a2: Improvements to the internal type system makes working with query data easier

  This release makes some breaking changes to internal types. If for some reason you were importing
  those types from core, your code may break. However, normal usage should not be affected.

- 5b77eb2f: Fix a potentially unsafe optional chaining opearation

## 2.0.0-next.1

### Major Changes

- 68670e5: No longer transpiles class private fields

### Patch Changes

- 5b77eb2: Source linting
- 5b77eb2: Fix a potentially unsafe optional chaining opearation

## 1.1.1-next.0

### Patch Changes

- 4345e6a: Improvements to the internal type system makes working with query data easier

  This release makes some breaking changes to internal types. If for some reason you were importing
  those types from core, your code may break. However, normal usage should not be affected.

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
