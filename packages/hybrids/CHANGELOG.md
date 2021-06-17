# @apollo-elements/hybrids

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
    query: query(MyQuery, { client: someClient }),
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
