---
description: How to set up Apollo Client for use with Apollo Elements
---

# Usage >> Apollo Client || 10

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

## `ApolloClientMixin`

Import `ApolloClientMixin` from `@apollo-elements/mixins` and apply it to your components' classes to connect them to a specific client:

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <blink>
  There is no equivalent of <code>ApolloClientMixin</code> for HTML,
  so just use the <code>&lt;apollo-client&gt;</code> element.
  </blink>
  ```

  ```ts tab mixins
  import { ApolloClientMixin, ApolloQueryMixin } from '@apollo-elements/mixins';

  import { client } from './specific-apollo-client';

  interface Data { /* ... */ }
  interface Variables { /* ... */ }

  const Base =
    ApolloClientMixin(client, ApolloQueryMixin(HTMLElement));

  export class ConnectedQuery extends Base<Data, Variables> { /* ... */ }

  customElements.define('connected-query', ConnectedQuery);
  ```

  ```ts tab lit
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

  ```ts tab fast
  import { ApolloClientMixin } from '@apollo-elements/mixins/apollo-client-mixin';
  import { ApolloQuery, customElement } from '@apollo-elements/fast';
  import { client } from './specific-apollo-client';

  interface Data { /* ... */ }
  interface Variables { /* ... */ }

  const Base =
    ApolloClientMixin(client, ApolloQuery);

  const name = 'connected-query';
  const template = html<ConnectedQuery>`...`;

  @customElement({ name, template })
  export class ConnectedQuery extends Base<Data, Variables> { /* ... */ }
  ```

  ```ts tab haunted
  import { useQuery } from '@apollo-elements/haunted';
  import { client } from './specific-apollo-client';

  // There is no ApolloClientMixin for Haunted, rather
  // the `useQuery`, `useMutation`, and `useSubscription` hooks accept a client option.

  function ConnectedQuery() {
    const { data } = useQuery(gql`query ConnectedQuery { connected }`, { client });
  }
  ```

  ```ts tab hybrids
  import { query, define, html } from '@apollo-elements/hybrids';
  import { client as apolloClient } from './specific-apollo-client';

  // There is no ApolloClientMixin for Hybrids, rather pass the client
  // to the `query`, `mutation`, or `subscription` factory.

  define('connected-query', {
    query: query(gql`query ConnectedQuery { connected }`, { client }),
  });
  ```

</code-tabs>

## Next Steps
- Learn more about [the `<apollo-client>` HTML element](./html/)
- Learn how to write [query components](../queries/)
