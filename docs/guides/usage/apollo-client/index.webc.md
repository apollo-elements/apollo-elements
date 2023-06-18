---
title: Apollo Client
permalink: /guides/usage/apollo-client/index.html
eleventyNavigation:
  order: 10
templateEngineOverride: webc,md
description: How to set up Apollo Client for use with Apollo Elements
---

Before your components can interact with your graph, they need to connect to an 
`ApolloClient` instance. The easiest and simplest way to do that is with 
`<apollo-client>`.

## `<apollo-client>`

Import `@apollo-elements/components/apollo-client` and set it up on your page. 
If you set the `uri` attribute, `<apollo-client>` will create its own client 
instance for you. If you use `uri`, you can also set the `validate-variables` 
boolean attribute to prevent the client from fetching any operation (e.g. query) 
that does not have all its non-nullable variables set.

<code-copy>

```html
<apollo-client uri="/graphql" validate-variables>
  <app-root></app-root>
</apollo-client>
```

</code-copy>

Nested instances of `<apollo-client>` will control their own decendents

<code-copy>

```html
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

</code-copy>

See [`<apollo-client>` guide](./html/) for more info and examples.

## Global Client

If you assign your client to the global variable `window.__APOLLO_CLIENT__`, all the apollo elements in your app will connect to it. This is also the variable that Apollo Client Developer Tools use to connect to the client.

<code-copy>

```ts
import { client } from './global-apollo-client';
window.__APOLLO_CLIENT__ = client;
```

</code-copy>

If you'd prefer to avoid assigning to the `window`, you have more options...

## Controllers' `client` Parameter

Pass the `client` param to controllers to specify the client instance

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <blink>
  The HTML Apollo Elements use the ApolloElement interface. See the previous segments.
  </blink>
  ```

  </code-tabs>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  import { ApolloQueryController } from '@apollo-elements/core';
  import { ControllerHostMixin } from '@apollo-elements/mixins';
  import { MyQuery } from './My.query.graphql';
  import { client } from './specific-apollo-client';

  export class ConnectedQuery extends ControllerHostMixin(HTMLElement) {
    query = new ApolloQueryController(this, MyQuery, { client });
  }

  customElements.define('connected-query', ConnectedQuery);
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  import { ApolloQueryController } from '@apollo-elements/core';
  import { LitElement } from 'lit';
  import { customElement } from 'lit/decorators.js';
  import { MyQuery } from './My.query.graphql';
  import { client } from './specific-apollo-client';

  @customElement('connected-query')
  export class ConnectedQuery extends LitElement {
    query = new ApolloQueryController(this, MyQuery, { client });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import { ApolloQueryBehavior } from '@apollo-elements/fast';
  import { FASTElement, customElement } from '@microsoft/fast-element';
  import { MyQuery } from './My.query.graphql';
  import { client } from './specific-apollo-client';

  @customElement({ name: 'connected-query' })
  export class ConnectedQuery extends FASTElement {
    query = new ApolloQueryBehavior(this, MyQuery, { client });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  import { useQuery } from '@apollo-elements/haunted';
  import { client } from './specific-apollo-client';

  function ConnectedQuery() {
    const { data } = useQuery(gql`query ConnectedQuery { connected }`, { client });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  import { useQuery } from '@apollo-elements/atomico';
  import { client } from './specific-apollo-client';

  function ConnectedQuery() {
    const { data } = useQuery(gql`query ConnectedQuery { connected }`, { client });
    return <host>...</host>;
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  import { query, define, html } from '@apollo-elements/hybrids';
  import { client as apolloClient } from './specific-apollo-client';

  define('connected-query', {
    query: query(gql`query ConnectedQuery { connected }`, { client }),
  });
  ```

  </code-tab>
</code-tabs>

## Elements' `ApolloClientMixin`

Import `ApolloClientMixin` from `@apollo-elements/mixins` and apply it to your 
components' classes to connect them to a specific client:

<code-tabs collection="libraries" default-tab="lit">
  <code-tab @tab="$data.codeTabs.html">

  ```html
  <blink>
  There is no equivalent of <code>ApolloClientMixin</code> for HTML,
  so just use the <code>&lt;apollo-client&gt;</code> element.
  </blink>
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.mixins">

  ```ts
  import { ApolloClientMixin, ApolloQueryMixin } from '@apollo-elements/mixins';

  import { client } from './specific-apollo-client';

  interface Data { /* ... */ }
  interface Variables { /* ... */ }

  const Base =
    ApolloClientMixin(client, ApolloQueryMixin(HTMLElement));

  export class ConnectedQuery extends Base<Data, Variables> { /* ... */ }

  customElements.define('connected-query', ConnectedQuery);
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.lit">

  ```ts
  import { ApolloClientMixin } from '@apollo-elements/mixins/apollo-client-mixin';
  import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
  import { client } from './specific-apollo-client';

  interface Data { /* ... */ }
  interface Variables { /* ... */ }

  const Base =
    ApolloClientMixin(client, ApolloQuery);

  @customElement('connected-query')
  export class ConnectedQuery extends Base<Data, Variables> { /* ... */ }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.fast">

  ```ts
  import { ApolloClientMixin } from '@apollo-elements/mixins/apollo-client-mixin';
  import { ApolloQuery } from '@apollo-elements/fast/bases/apollo-query';
  import { customElement, ViewTemplate } from '@apollo-elements/fast';
  import { client } from './specific-apollo-client';

  const Base =
    ApolloClientMixin(client, ApolloQuery);

  const name = 'connected-query';
  const template: ViewTemplate<ConnectedQuery> = html`...`;

  @customElement({ name, template })
  export class ConnectedQuery extends Base<any> { /* ... */ }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.haunted">

  ```ts
  import { useQuery } from '@apollo-elements/haunted';
  import { client } from './specific-apollo-client';

  // There is no ApolloClientMixin for Haunted, rather
  // the `useQuery`, `useMutation`, and `useSubscription` hooks accept a client option.

  function ConnectedQuery() {
    const { data } = useQuery(gql`query ConnectedQuery { connected }`, { client });
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.atomico">

  ```tsx
  import { useQuery } from '@apollo-elements/atomico';
  import { client } from './specific-apollo-client';

  // There is no ApolloClientMixin for Haunted, rather
  // the `useQuery`, `useMutation`, and `useSubscription` hooks accept a client option.

  function ConnectedQuery() {
    const { data } = useQuery(gql`query ConnectedQuery { connected }`, { client });
    return <host>...</host>;
  }
  ```

  </code-tab>
  <code-tab @tab="$data.codeTabs.hybrids">

  ```ts
  import { query, define, html } from '@apollo-elements/hybrids';
  import { client as apolloClient } from './specific-apollo-client';

  // There is no ApolloClientMixin for Hybrids, rather pass the client
  // to the `query`, `mutation`, or `subscription` factory.

  define('connected-query', {
    query: query(gql`query ConnectedQuery { connected }`, { client }),
  });
  ```

  </code-tab>
</code-tabs>

## Next Steps
- Learn more about [the `<apollo-client>` HTML element](./html/)
- Learn how to write [query components](../queries/)
