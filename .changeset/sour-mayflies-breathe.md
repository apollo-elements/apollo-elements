---
"@apollo-elements/hybrids": major
---

Upgrades hybrids dependency to version 5.

`query`, `mutation`, and `subscription` factories now return a spread of properties. This was done to avoid the need to hack into hybrids' reactivity system.

To migrate, remove your `client` calls and replace your `query` etc with spreads:

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
  ...query(MyQuery, { client: someClient }),
});
```
