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

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <apollo-client>
    <apollo-query no-auto-subscribe>
      <template>
        <template type="if" if="{%raw%}{{ data }}{%endraw%}">
          <h1>👋 {%raw%}{{ data.userSession.name }}{%endraw%}!</h1>
          <p>
            <span>Your last activity was</span>
            <time>{%raw%}{{ getTime(data) }}{%endraw%}</time>
          </p>
        </template>
      </template>
    <apollo-query>
  </apollo-client>

  <script>
    (async function() {
      const { formatDistance } = await import('date-fns/esm');
      const { getClient } = await import('./client');
      const { UserSessionQuery } = await import('./UserSession.query.graphql.js');

      const root = document.currentScript.getRootNode();
      const queryEl = root.querySelector('apollo-query');
      const clientEl = root.querySelector('apollo-client');

      clientEl.client = await getClient();

      queryEl.extras = {
        getTime(data) {
          if (!data || !data.userSession.lastActive)
            return ''
          else {
            return formatDistance(
              data.userSession.lastActive,
              Date.now(), {
                addSuffix: true
            });
          }
        },
      };

      queryEl.query = UserSessionQuery;
      queryEl.subscribe();

    })();
  </script>

  ```

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
  import { ApolloQueryController } from '@apollo-elements/core';
  import { LitElement, html } from 'lit';
  import { customElement } from 'lit/decorators.js';
  import { UserSessionQuery } from './UserSession.query.graphql';
  import { getClient } from './client';
  import { formatDistance } from 'date-fns/esm';

  @customElement('async-element')
  class AsyncElement extends LitElement {
    query = new ApolloQueryController(this, UserSessionQuery);

    async connectedCallback() {
      super.connectedCallback();
      // asynchronously get a reference to the client
      // setting the client will automatically subscribe.
      this.query.client = await getClient();
    }

    render() {
      const name = this.query.data?.userSession?.name ?? '';
      const lastActive = this.query.data?.userSession?.lastActive;

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

  import { UserSessionQuery } from './UserSession.query.graphql';

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
  class AsyncElement extends ApolloQuery<typeof UserSessionQuery> {
    noAutoSubscribe = true;

    query = UserSessionQuery;

    async connectedCallback() {
      super.connectedCallback();
      // asynchronously get a reference to the client
      // setting the client will start fetching the query
      this.client = await getClient();
    }
  };
  ```

  ```ts tab haunted
  import { useQuery, component, html } from '@apollo-elements/haunted';

  import { UserSessionQuery } from './UserSession.query.graphql';

  import { getClient } from './client';
  import { formatDistance } from 'date-fns/esm';

  function AsyncElement(el) {
    const query =
      useQuery(UserSessionQuery, { noAutoSubscribe: true });

    useEffect(async () => {
      // asynchronously get a reference to the client
      query.client = await getClient();
      // only then start fetching data
      query.subscribe();
    }, []);

    const name = query.data?.userSession.name ?? ''
    const lastActive = query.data?.userSession.lastActive;

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
  import { query, define, property, html } from '@apollo-elements/hybrids';

  import { getClient } from './client';
  import { formatDistance } from 'date-fns/esm';

  import { UserSessionQuery } from './UserSession.query.graphql';

  function getTime(userSession): string {
    const lastActive = userSession?.lastActive;
    return (
        !lastActive ? ''
      : formatDistance(new Date(lastActive), Date.now(), { addSuffix: true })
    );
  }

  async function connect(host) {
    // asynchronously get a reference to the client.
    // setting the client will automatically start querying.
    host.query.client = await getClient();
  }

  define('async-element', {
    // use 'connect' to gain access to connectedCallback
    __asyncClient: { connect },
    query: query(UserSessionQuery),
    render: ({ query }) => html`
      <h1>👋 ${query.data?.userSession.name}!</h1>
      <p>
        <span>Your last activity was</span>
        <time>${getTime(query.data?.userSession)}</time>
      </p>
    `
  })
  ```

</code-tabs>
