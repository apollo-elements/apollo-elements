<meta name="description" content="How to set up Apollo Client for use with Apollo Elements"/>

Before your components can interact with your graph, they need to connect to an `ApolloClient` instance. The easiest and simplest way to do that is with `<apollo-client>`.

## `<apollo-client>` Element

Import `@apollo-elements/components/apollo-client` and set it up on your page. If you set the `uri` attribute, `<apollo-client>` will create its own client instance for you. If you use `uri`, you can also set the `validate-variables` boolean attribute to prevent the client from fetching any operation (e.g. query) that does not have all of its non-nullable variables set.

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

`<apollo-client>` uses the `createApolloClient` helper from `@apollo-elements/lib/create-apollo-client` under the hood:

<code-copy>

```ts
import { createApolloClient } from '@apollo-elements/lib/create-apollo-client';

const client = createApolloClient({
  uri: '/graphql',
  validateVariables: true,
  typePolicies: {
    User: {
      fields: {
        fullName(_, { readField }) {
          return `${readField('firstName')} ${readField('lastName')}`;
        }
      }
    }
  }
});
```

</code-copy>

If you need more control over the client, for example to pass in type policies or to configure the links, you need to construct an instance by importing from `@apollo/client/core` (*note*: `@apollo/client` exports a bunch of react code, so if you leave off the `/core`, you might experience TypeScript compilation errors, or larger bundle sizes)

<code-copy>

```ts
// fancy-apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, } from '@apollo/client/core';
import { CustomLink } from './my-custom-link';

const cache =
  new InMemoryCache();

// Configure with a URL to your GraphQL endpoint
const link = ApolloLink.from([
  new CustomLink(),
  new HttpLink({ uri: '/graphql' }),
])

export const client =
  new ApolloClient({ cache, link });
```

</code-copy>

Now that your client is ready, you need a way to connect your components to it. There are several options. You can use `<apollo-client>` without a `uri` attribute:

<code-copy>

```ts
import { client } from './fancy-apollo-client';
document
  .querySelector('apollo-client#fancy-client')
  .client = client;
```

</code-copy>

Or you can use one of the following methods.

## Global Client

If you assign your client to the global variable `window.__APOLLO_CLIENT__`, all the apollo elements in your app will connect to it. This is also the variable that Apollo Client Developer Tools use to connect to the client.

<code-copy>

```ts
import { client } from './global-apollo-client';
window.__APOLLO_CLIENT__ = client;
```

</code-copy>

If you'd prefer to avoid assigning to the `window`, you have several other options, as follows...

## `ApolloClientMixin`

Import `ApolloClientMixin` from `@apollo-elements/mixins` and apply it to your components' classes to connect them to a specific client:

<code-tabs>
<code-tab library="mixins">

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

<code-tab library="lit-apollo">

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

<code-tab library="fast">

```ts
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

</code-tab>

<code-tab library="hybrids">

```ts
import { client, query, define, html } from '@apollo-elements/hybrids';
import { client as apolloClient } from './specific-apollo-client';

interface Data { /* ... */ }
interface Variables { /* ... */ }

// There is no ApolloClientMixin for Hybrids, rather
// the `client` factory accepts a client instance.

define('connected-query', {
  client: client(apolloClient),
  query: query(gql`query ConnectedQuery {
    # ...
  }`),
});
```

</code-tab>
</code-tabs>