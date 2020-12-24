---
description: Use Apollo Elements to asynchronously create your apollo client before loading your views, e.g. to fetch an auth token
---

# Cool Tricks >> Asynchronous Client || 10

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

<code-tabs collection="libraries">

  ```ts tab mixins
  import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

  import UserSessionQuery from './UserSession.query.graphql';

  import type {
    UserSessionQueryData as Data,
    UserSessionQueryVariables as Variables,
  } from '../schema';

  import { getClient } from './client';
  import { formatDistance } from 'date-fns/esm';

  const template = document.createElement('template');
  template.innerHTML = `
    <h1>👋 </h1>
    <p>
      <span>Your last activity was</span>
      <time></time>
    </p>
  `;

  template.content.querySelector('h1').append(new Text(''));
  template.content.querySelector('h1').append(new Text('!'));
  template.content.querySelector('time').append(new Text(''));

  class AsyncElement extends ApolloQueryMixin(HTMLElement)<Data, Variables> {
    noAutoSubscribe = true;

    query = UserSessionQuery;

    get data() {
      return this.#data;
    }

    set data(value: Data) {
      this.#data = value;
      this.render();
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
    }

    async connectedCallback() {
      super.connectedCallback();
      // asynchronously get a reference to the client
      this.client = await getClient();
      // only then start fetching data
      this.subscribe();
    }

    render() {
      const lastActive = this.data?.userSession.lastActive;

      const [waveNode, nameNode] =
        this.shadowRoot.querySelector('h1').childNodes;
      const [timeNode] =
        this.shadowRoot.querySelector('time').childNodes;

      nameNode.data = this.data?.userSession.name ?? '';
      timeNode.data =
        !lastActive ? '' : formatDistance(lastActive, Date.now(), { addSuffix: true });
    }
  };

  customElements.define('async-element', AsyncElement);
  ```

  ```ts tab lit
  import { ApolloQuery, customElement, html } from '@apollo-elements/lit-apollo';

  import UserSessionQuery from './UserSession.query.graphql';

  import type {
    UserSessionQueryData as Data,
    UserSessionQueryVariables as Variables,
  } from '../schema';

  import { getClient } from './client';
  import { formatDistance } from 'date-fns/esm';

  @customElement('async-element')
  class AsyncElement extends ApolloQuery<Data, Variables> {
    noAutoSubscribe = true;

    query = UserSessionQuery;

    async connectedCallback() {
      super.connectedCallback();
      // asynchronously get a reference to the client
      this.client = await getClient();
      // only then start fetching data
      this.subscribe();
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
  ```

  ```ts tab fast
  import { ApolloQuery, customElement, html } from '@apollo-elements/fast';

  import UserSessionQuery from './UserSession.query.graphql';

  import type {
    UserSessionQueryData as Data,
    UserSessionQueryVariables as Variables,
  } from '../schema';

  import { getClient } from './client';
  import { formatDistance } from 'date-fns/esm';

  function getTime(userSession): string {
    const lastActive = userSession?.lastActive;
    return (
        !lastActive ? ''
      : formatDistance(new Date(lastActive), Date.now(), { addSuffix: true })
    );
  }

  @customElement({
    name: 'async-element',
    template: html<AsyncElement>`
      <h1>👋 ${x => x.data?.userSession.name}!</h1>
      <p>
        <span>Your last activity was</span>
        <time>${x => getTime(x.data?.userSession)}</time>
      </p>
    `
  })
  class AsyncElement extends ApolloQuery<Data, Variables> {
    noAutoSubscribe = true;

    query = UserSessionQuery;

    async connectedCallback() {
      super.connectedCallback();
      // asynchronously get a reference to the client
      this.client = await getClient();
      // only then start fetching data
      this.subscribe();
    }
  };
  ```

  ```ts tab haunted
  import { useQuery, component, html } from '@apollo-elements/haunted';

  import UserSessionQuery from './UserSession.query.graphql';

  import type {
    UserSessionQueryData as Data,
    UserSessionQueryVariables as Variables,
  } from '../schema';

  import { getClient } from './client';
  import { formatDistance } from 'date-fns/esm';

  function AsyncElement(el) {
    const { client, data } =
      useQuery<Data, Variables>(UserSessionQuery, { noAutoSubscribe: true });

    useEffect(async ({ host }) => {
      if (host.client) return;
      // asynchronously get a reference to the client
      host.client = await getClient();
      // only then start fetching data
      host.subscribe();
    }, [client]);

    const name = data?.userSession.name ?? ''
    const lastActive = data?.userSession.lastActive;

    const time =
      !lastActive ? '' : formatDistance(lastActive, Date.now(), { addSuffix: true });

    return html`
      <h1>👋 ${name}!</h1>
      <p>
        <span>Your last activity was</span>
        <time>${time}</time>
      </p>
    `;
  };

  customElements.define('async-element', component(AsyncElement));
  ```

  ```ts tab hybrids
  import { client, query, define, property, html } from '@apollo-elements/hybrids';

  import { getClient } from './client';
  import { formatDistance } from 'date-fns/esm';

  import UserSessionQuery from './UserSession.query.graphql';

  import type {
    UserSessionQueryData as Data,
    UserSessionQueryVariables as Variables,
  } from '../schema';

  function getTime(userSession): string {
    const lastActive = userSession?.lastActive;
    return (
        !lastActive ? ''
      : formatDistance(new Date(lastActive), Date.now(), { addSuffix: true })
    );
  }

  async function connect(host) {
    // asynchronously get a reference to the client
    host.client = await getClient();
    // only then start fetching data
    host.subscribe();
  }

  define('async-element', {
    // use 'connect' to gain access to connectedCallback
    // because of how Hybrids queues connectedCallbacks,
    // set this before you set `query`
    noAutoSubscribe: property(true, connect),
    client: client(null),
    query: query<Data, Variables>(UserSessionQuery),
    render: ({ data }) => html`
      <h1>👋 ${data?.userSession.name}!</h1>
      <p>
        <span>Your last activity was</span>
        <time>${getTime(data?.userSession)}</time>
      </p>
    `
  })
  ```

</code-tabs>
