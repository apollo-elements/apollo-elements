In some cases, you may want to wait for your Apollo client to do some initial asynchronous setup (for example reloading a persistent cache or getting a user token) before you can make your client available to your app.

```js
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

  client = new ApolloClient({ cache, link });

  return client;
};
```

In that case, you can import a promise of a client and wait for it in `connectedCallback`:

```js
import { formatDistance } from 'date-fns/esm';
import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import { getClient } from './client';

class AsyncElement extends ApolloQuery {
  async connectedCallback() {
    super.connectedCallback();
    // first instantiate the client locally
    this.client = await clientPromise;
    // afterwards, set the query to trigger fetch-then-render
    this.query = gql`query {
      userSession {
        name
        lastActive
      }
    }`;
  }

  render() {
    const name = this.data?.userSession.name ?? ''
    const lastActive = this.data?.userSession.lastActive;

    const time =
      !lastActive ? '' : formatDistance(lastActive, Date.now(), { addSuffix: true });

    return html`
      <h1>👋 ${name}!</h1>
      <p>
        <span>Your last activity was</span>
        <time>${time}</time>
      </p>
    `;
   }
};

customElements.define('async-element', AsyncElement)
```

Alternatively, you can use the dynamic `import()` feature to wait on your client before loading element modules:

```ts
import { getClient } from './client';
(async function init() {
  window.__APOLLO_CLIENT__ = await getClient();
  await Promise.all([
    import('./components/connected-element.js'),
    import('./components/connected-input.js'),
  ]);
})();
```
