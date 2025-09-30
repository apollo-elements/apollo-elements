---
title: "Asynchronous Client"
weight: 10
description: "Use Apollo Elements to asynchronously create your apollo client before loading your views, e.g. to fetch an auth token"
sidebar: guides
---

In some cases, you may want to wait for your Apollo client to do some initial asynchronous setup (for example reloading a persistent cache or getting a user token) before you can make your client available to your app.

```js copy
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: 'https://api.spacex.land/graphql',
})

let client;

export async function getClient() {
  if (client)
    return client;

  // Wait for the cache to be restored
  await persistCache({ cache, storage: localStorage });

  // Create the Apollo Client
  client =
    new ApolloClient({ cache, link });

  return client;
};
```

The most straightforward way to do this is first instantiate your client, and only afterwards load your components using dynamic `import()`:

```ts copy
import { getClient } from './client';
(async function init() {
  window.__APOLLO_CLIENT__ = await getClient();
  await Promise.all([
    import('./components/connected-element.js'),
    import('./components/connected-input.js'),
  ]);
})();
```

If for whatever reason you'd like to load your component files eagerly, set the `noAutoSubscribe` property on your components, then you can import a promise of a client and wait for it in `connectedCallback`, calling `subscribe` when ready.

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}} {{<include async-client-html.html>}} {{</code-tab>}}
  {{<code-tab package="mixins">}} {{<include async-client-mixins.ts>}} {{</code-tab>}}
  {{<code-tab package="lit">}} {{<include async-client-lit.ts>}} {{</code-tab>}}
  {{<code-tab package="fast">}} {{<include async-client-fast.ts>}} {{</code-tab>}}
  {{<code-tab package="haunted">}} {{<include async-client-haunted.ts>}} {{</code-tab>}}
  {{<code-tab package="atomico">}} {{<include async-client-atomico.tsx>}} {{</code-tab>}}
  {{<code-tab package="hybrids">}} {{<include async-client-hybrids.ts>}} {{</code-tab>}}
</code-tabs>
