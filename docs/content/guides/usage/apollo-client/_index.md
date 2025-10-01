---
title: "Apollo Client"
sidebar: guides
weight: 10
description: "How to set up Apollo Client for use with Apollo Elements"
---

Before your components can interact with your graph, they need to connect to an `ApolloClient` instance. The easiest and simplest way to do that is with `<apollo-client>`.

## &lt;apollo-client&gt;

Import `@apollo-elements/components/apollo-client` and set it up on your page. If you set the `uri` attribute, `<apollo-client>` will create its own client instance for you. If you use `uri`, you can also set the `validate-variables` boolean attribute to prevent the client from fetching any operation (e.g. query) that does not have all its non-nullable variables set.

```html copy
<apollo-client uri="/graphql" validate-variables>
  <app-root></app-root>
</apollo-client>
```

Nested instances of `<apollo-client>` will control their own decendents

```html copy
<apollo-client uri="/server-a">
  <query-element>
    <!-- This element queries from /server-a -->
  </query-element>

  <apollo-client uri="/server-b">
    <query-element>
      <!-- This element queries from /server-b -->
    </query-element>
  </apollo-client>

</apollo-client>
```

See [`<apollo-client>` guide](./html/) for more info and examples.

## Global Client

If you assign your client to the global variable `window.__APOLLO_CLIENT__`, all the apollo elements in your app will connect to it. This is also the variable that Apollo Client Developer Tools use to connect to the client.

```ts copy
import { client } from './global-apollo-client';
window.__APOLLO_CLIENT__ = client;
```

If you'd prefer to avoid assigning to the `window`, you have more options...

## Controllers' `client` Parameter

Pass the `client` param to controllers to specify the client instance

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}{{<include "controller-client-html.html">}}{{</code-tab>}}
  {{<code-tab package="mixins">}}{{<include "controller-client-mixins.ts">}}{{</code-tab>}}
  {{<code-tab package="lit">}}{{<include "controller-client-lit.ts">}}{{</code-tab>}}
  {{<code-tab package="fast">}}{{<include "controller-client-fast.ts">}}{{</code-tab>}}
  {{<code-tab package="haunted">}}{{<include "controller-client-haunted.ts">}}{{</code-tab>}}
  {{<code-tab package="atomico">}}{{<include "controller-client-atomico.tsx">}}{{</code-tab>}}
  {{<code-tab package="hybrids">}}{{<include "controller-client-hybrids.ts">}}{{</code-tab>}}
</code-tabs>

## Elements' `ApolloClientMixin`

Import `ApolloClientMixin` from `@apollo-elements/mixins` and apply it to your components' classes to connect them to a specific client:

<code-tabs collection="libraries" default-tab="lit">
  {{<code-tab package="html">}}{{<include "client-mixin-html.html">}}{{</code-tab>}}
  {{<code-tab package="mixins">}}{{<include "client-mixin-mixins.ts">}}{{</code-tab>}}
  {{<code-tab package="lit">}}{{<include "client-mixin-lit.ts">}}{{</code-tab>}}
  {{<code-tab package="fast">}}{{<include "client-mixin-fast.ts">}}{{</code-tab>}}
  {{<code-tab package="haunted">}}{{<include "client-mixin-haunted.ts">}}{{</code-tab>}}
  {{<code-tab package="atomico">}}{{<include "client-mixin-atomico.tsx">}}{{</code-tab>}}
  {{<code-tab package="hybrids">}}{{<include "client-mixin-hybrids.ts">}}{{</code-tab>}}
</code-tabs>

## Next Steps
- Learn more about [the `<apollo-client>` HTML element](./html/)
- Learn how to write [query components](../queries/)
