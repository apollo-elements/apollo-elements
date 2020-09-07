Before your components can interact with your graph, you need to pass them an `ApolloClient` instance. Construct an instance by importing from `@apollo/client/core` (*note*: `@apollo/client` exports a bunch of react code, so if you leave off the `/core`, you might have TypeScript compilation errors, or larger bundle sizes)

```ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const cache =
  new InMemoryCache();

// Configure with a URL to your GraphQL endpoint
const link =
  new HttpLink({ uri: '/graphql' });

export const client =
  new ApolloClient({ cache, link });
```

Now that your client is ready, you need a way to connect your components to it. There are several options

## Global Client

If you assign your client to the global variable `window.__APOLLO_CLIENT__`, all the apollo elements in your app will connect to it. This is also the variable that Apollo Client Developer Tools use to connect to the client.

```ts
import { client } from './global-apollo-client';
window.__APOLLO_CLIENT__ = client;
```

If you'd prefer to avoid assigning to the `window`, you have several other options, as follows...

## `ApolloClientMixin`

Import `ApolloClientMixin` from `@apollo-elements/mixins` and apply it to your components' classes to connect them to a specific client:

```ts
import { ApolloClientMixin } from '@apollo-elements/mixins/apollo-client-mixin';
import { ApolloQuery, customElement } from '@apollo-elements/lit-apollo';
import { client } from './specific-apollo-client';

interface Data { /* ... */ }
interface Variables { /* ... */ }

@customElement('connected-query')
export class ConnectedQuery
  extends ApolloClientMixin(client, ApolloQuery)<Data, Variables> { /* ... */ }
```

## `<apollo-client>` Element

Import `@apollo-elements/components/apollo-client` and set it up on your page

```html
<apollo-client id="client">
  <app-root></app-root>
</apollo-client>
```
```ts
import { client } from './specific-apollo-client';
document.getElementById('client').client = client;
```

Nested instances of `<apollo-client>` will control their own decendents

```html
<apollo-client id="client-a">
  <query-element>
    <!-- This element queries from client-a's endpoint -->
  </query-element>
  <apollo-client id="client-b">
    <query-element>
      <!-- This element queries from client-b's endpoint -->
    </query-element>
  </apollo-client>
</apollo-client>
```