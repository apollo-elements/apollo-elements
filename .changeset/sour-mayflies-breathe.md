---
"@apollo-elements/hybrids": major
---

Upgrades hybrids dependency to version 5.3.3 and use `ApolloController`

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
