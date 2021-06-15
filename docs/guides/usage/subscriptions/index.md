---
description: Use Apollo Elements to write high-performance realtime GraphQL subscription components
---

# Usage >> Subscriptions || 40

Subscription components fetch data in real time via GraphQL subscriptions, which usually use websockets under the hood.

## Example: Chat App

A chat app queries for a list of messages, then initiates a subscription for all incoming messages. When a new message comes in, we want to notify the users, as well as add the message to the bottom of the existing on-screen list.

Consider this query and subscription:

<style data-helmet>
#gql-documents {
  display: grid;
  gap: 12px 6px;
  grid-template: auto auto / auto;
}

#gql-documents pre {
  height: 100%;
}

@media (min-width: 600px) {
  #gql-documents {
    grid-template: auto / auto auto;
  }
}
</style>

<div id="gql-documents">

```graphql
query MessagesQuery {
  messages {
    date
    message
    user
  }
}
```

```graphql
subscription MessageSentSubscription {
  messageSent {
    date
    message
    user
  }
}
```

</div>

Let's define a component which performs the following tasks:
1. queries for messages
2. subscribes to any new messages
3. when new messages arrive, integrate them with the cached messages from the query.

We'll accomplish this by calling `subscribeToMore` on our element once it's connected to the DOM, passing in an `updateQuery` function to define the merge for new data:

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <apollo-client id="messages-client">
    <apollo-query id="messages-query">
      <script type="application/graphql" src="Messages.query.graphql"></script>
      <template>
        <link rel="stylesheet" href="messages.css"/>
        <ol>
          <template type="repeat" repeat="{%raw%}{{ data.messages ?? [] }}{%endraw%}">
            <li>
              <h4>
                <time datetime="{%raw%}{{ date }}{%endraw%}">{%raw%}{{ formatDate(item.date) }}{%endraw%}</time>
                <span class="user">{%raw%}{{ item.user }}{%endraw%} said:</span>
              </h4>
              <p>{%raw%}{{ item.message }}{%endraw%}</p>
            </li>
          </template>
        </ol>
      </template>
    </apollo-query>
  </apollo-client>
  <script type="module">
    import '@apollo-elements/components';
    import { client } from './client';
    import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';

    const element = document.getElementById('messages-query');

    element.formatDate = function formatDate(iso) {
      try { return new Date(iso).toDateString(); }
      catch { return ''; }
    };

    element.subscribeToMore({
      document: MessageSentSubscription
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.messageSent]
        };
      },
    }) = subscribeToMore;

    document.getElementById('messages-client').client = client;
  </script>
  ```

  ```js tab mixins
  import { ApolloQueryMixin } from '@apollo-elements/mixins'
  import { client } from './client';
  import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
  import { MessagesQuery } from './Messages.query.graphql.js';

  const template = document.createElement('template');
        template.innerHTML = `
        <link rel="stylesheet" href="messages.css"/>
        <ol></ol>`;

  const msgTpl = document.createElement('template');
        msgTpl.innerHTML = `
        <li>
          <h4>
            <time>{%raw%}{{ formatDate(item.date) }}{%endraw%}</time>
            <span class="user">{%raw%}{{ item.user }}{%endraw%} said:</span>
          </h4>
          <p>{%raw%}{{ item.message }}{%endraw%}</p>
        </li>`;

  class Messages extends ApolloQueryMixin(HTMLElement) {
    client = client;

    query = MessagesQuery;

    $ = selector => this.shadowRoot.querySelector(selector);

    constructor() {
      super();
      this
        .attachShadow({ mode: 'open' })
        .append(template.content.cloneNode(true))
    }

    connectedCallback() {
      super.connectedCallback();
      this.subscribeToMore({
        document: MessageSentSubscription
        updateQuery(prev, { subscriptionData }) {
          if (!subscriptionData.data) return prev;
          return {
            ...prev,
            messages: [...prev.messages, subscriptionData.data.messageSent]
          };
        },
      });
    }

    onData(data) {
      if (!data) return;
      for (const message of data.messages) {
        if (!this.$(`[datetime="${message.date}"]`))
          this.$('ol').append(Messages.stampMessage(message))
      }
    }

    static stampMessage({ date, message, user }) {
      const node = msgTpl.content.cloneNode(true);
      const time = node.querySelector('time')
            time.setAttribute('datetime', date);
            time.textContent = Messages.formatDate(date);
      const user = node.querySelector('.user');
            user.textContent = user;
      const p = node.querySelector('p');
            p.textContent = message;
      return node;
    }

    static formatDate(iso) {
      try { return new Date(iso).toDateString(); }
      catch { return ''; }
    }
  }

  customElements.define('messages-query', MessagesQuery);
  ```

  ```ts tab lit
  import { ApolloQueryController } from '@apollo-elements/core';
  import { LitElement, html } from 'lit';
  import { customElement } from 'lit/decorators.js';

  import { client } from './client';
  import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
  import { MessagesQuery } from './Messages.query.graphql.js';

  import style from './messages.css.js';

  @customElement('messages-query')
  class Messages extends LitElement {
    static styles = [style];

    query = new ApolloQueryController(this, MessagesQuery);

    static formatDate(iso) {
      try { return new Date(iso).toDateString(); }
      catch { return ''; }
    }

    connectedCallback() {
      super.connectedCallback();
      this.query.subscribeToMore({
        document: MessageSentSubscription,
        updateQuery(prev, { subscriptionData }) {
          if (!subscriptionData.data) return prev;
          return {
            ...prev,
            messages: [...prev.messages, subscriptionData.data.messageSent]
          };
        },
      });
    }

    render() {
      const messages = this.query.data || [];
      return html`
        <ol>
          ${messages.map(({ date, user, message }) => html`
          <li>
            <h4>
              <time datetime="${date}">${Messages.formatDate(date)}</time>
              <span class="user">${user} said:</span>
            </h4>
            <p>${message}</p>
          </li>
          `)}
        </ol>
      `;
    }
  }
  ```

  ```ts tab fast
  import { ApolloQuery, customElement, html, repeat } from '@apollo-elements/fast';

  import { client } from './client';
  import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
  import { MessagesQuery } from './Messages.query.graphql.js';

  import style from './messages.css.js';

  @customElement({
    name: 'messages-query',
    style
    template: html<Messages>`
      <ol>
        ${repeat(x => x.data?.messages ?? [], ({ date, user, message }) => html<Message>`
        <li>
          <h4>
            <time datetime="${date}">${Message.formatDate(date)}</time>
            <span class="user">${user} said:</span>
          </h4>
          <p>${message}</p>
        </li>
        `)}
      </ol>
    `,
  })
  class Messages extends ApolloQuery<typeof MessagesQuery> {
    query = MessagesQuery;

    static formatDate(iso) {
      try { return new Date(iso).toDateString(); }
      catch { return ''; }
    }

    connectedCallback() {
      super.connectedCallback();
      this.subscribeToMore({
        document: MessageSentSubscription,
        updateQuery(prev, { subscriptionData }) {
          if (!subscriptionData.data) return prev;
          return {
            ...prev,
            messages: [...prev.messages, subscriptionData.data.messageSent]
          };
        },
      });
    }
  }
  ```

  ```js tab haunted
  import { useQuery, component, html } from '@apollo-elements/haunted';

  import { client } from './client';
  import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
  import { MessagesQuery } from './Messages.query.graphql.js';

  function formatDate(iso) {
    try { return new Date(iso).toDateString(); }
    catch { return ''; }
  }

  function Messages() {
    const { data, subscribeToMore } = useQuery(MessagesQuery, { client });

    useEffect(() => {
      subscribeToMore({
        document: MessageSentSubscription,
        updateQuery(prev, { subscriptionData }) {
          if (!subscriptionData.data) return prev;
          return {
            ...prev,
            messages: [...prev.messages, subscriptionData.data.messageSent]
          };
        },
      });
    }, []);

    const messages = this.query.data || [];

    return html`
      <ol>
        ${messages.map(({ date, user, message }) => html`
        <li>
          <h4>
            <time datetime="${date}">${formatDate(date)}</time>
            <span class="user">${user} said:</span>
          </h4>
          <p>${message}</p>
        </li>
        `)}
      </ol>
    `;
  }

  customElements.define('messages-query', component(Messages));
  ```

  ```js tab hybrids
  import { define, query, html } from '@apollo-elements/hybrids';

  import { client } from './client';

  import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
  import { MessagesQuery } from './Messages.query.graphql.js';

  function formatDate(iso) {
    try { return new Date(iso).toDateString(); }
    catch { return ''; }
  }

  function connect(host) {
    host.query.subscribeToMore({
      document: MessageSentSubscription,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.messageSent]
        };
      },
    });
  }

  define('chat-query', {
    query: query(MessagesQuery, { client }),
    _subscribeToMore: { connect },
    render: host => {
      const messages = host.query.data || [];
      return html`
        <ol>
          ${messages.map(({ date, user, message }) => html`
          <li>
            <h4>
              <time datetime="${date}">${formatDate(date)}</time>
              <span class="user">${user} said:</span>
            </h4>
            <p>${message}</p>
          </li>
          `)}
        </ol>
      `;
    },
  });
  ```

</code-tabs>

## ApolloSubscriptionController

The first approach of calling `subscribeToMore` suits our requirement of updating the list of messages, but we still have to notify our users. Let's use a subscription controller and run our notification side effect using its lifecycle events.

<code-tabs collection="libraries" default-tab="lit">

  ```html tab html
  <apollo-client id="messages-client">
    <apollo-query id="messages-query">
      <script type="application/graphql" src="Messages.query.graphql"></script>
      <template>
        <link rel="stylesheet" href="messages.css"/>
        <ol>
          <template type="repeat" repeat="{%raw%}{{ data.messages ?? [] }}{%endraw%}">
            <li>
              <h4>
                <time datetime="{%raw%}{{ date }}{%endraw%}">{%raw%}{{ formatDate(item.date) }}{%endraw%}</time>
                <span class="user">{%raw%}{{ item.user }}{%endraw%} said:</span>
              </h4>
              <p>{%raw%}{{ item.message }}{%endraw%}</p>
            </li>
          </template>
        </ol>
      </template>
    </apollo-query>

    <apollo-subscription id="messages-subscription">
      <script type="application/graphql" src="MessageSent.subscription.graphql"></script>
      <template>
        <mwc-snackbar labeltext="{%raw%}{{ data.messagesSent.user }}{%endraw%} sent a message!"></mwc-snackbar>
      </template>
    </apollo-subcription>

  </apollo-client>
  <script type="module">
    import '@apollo-elements/components';
    import '@material/mwc-snackbar';

    import { client } from './client';

    const q = document.getElementById('messages-query');
    const s = document.getElementById('messages-subscription');

    q.formatDate = function formatDate(iso) { /*...*/ };

    s.addEventListener('apollo-subscription-result', async event => {
      // update the query element
      const { client, subscriptionResult: { data: { messageSent } } } = event.detail;
      const { query } = q;
      const cached = client.readQuery({ query });
      client.writeQuery({ query, data: { messages: [...cached.messages, messageSent] } });

      // Display the notification
      await s.updateComplete;
      s.$('mwc-snackbar').show();
    });

    document.getElementById('messages-client').client = client;
  </script>
  ```

  ```js tab mixins
  import { ApolloQueryMixin } from '@apollo-elements/mixins';
  import { ApolloSubscriptionController } from '@apollo-elements/core';
  import { client } from './client';
  import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
  import { MessagesQuery } from './Messages.query.graphql.js';

  import '@material/mwc-snackbar';

  const template = document.createElement('template');
        template.innerHTML = `
        <link rel="stylesheet" href="messages.css"/>
        <mwc-snackbar></mwc-snackbar>
        <ol></ol>`;

  const msgTpl = document.createElement('template');
        msgTpl.innerHTML = `
        <li>
          <h4>
            <time>{%raw%}{{ formatDate(item.date) }}{%endraw%}</time>
            <span class="user">{%raw%}{{ item.user }}{%endraw%} said:</span>
          </h4>
          <p>{%raw%}{{ item.message }}{%endraw%}</p>
        </li>`;

  class Messages extends ApolloQueryMixin(HTMLElement) {
    client = client;

    query = MessagesQuery;

    subscription = new ApolloSubscriptionController(this, MessageSentSubscription, {
      onData: async ({ client, subscriptionResult: { data: { messageSent } } }) => {
        // update the query element
        const cached = client.readQuery({ query: MessagesQuery });
        client.writeQuery({
          query: MessagesQuery,
          data: { messages: [...cached.messages, messageSent] }
        });

        // Display the notification
        await this.updateComplete;
        this.$('mwc-snackbar').labelText = `${messageSent.user} sent a message!`;
        this.$('mwc-snackbar').show();
      }
    });

    $ = selector => this.shadowRoot.querySelector(selector);

    constructor() { /*...*/ }

    onData(data) { /*...*/ }

    static stampMessage({ date, message, user }) { /*...*/ }

    static formatDate(iso) { /*...*/ }
  }

  customElements.define('messages-query', MessagesQuery);
  ```

  ```ts tab lit
  import { ApolloQueryController, ApolloSubscriptionController } from '@apollo-elements/core';
  import { LitElement, html } from 'lit';
  import { customElement } from 'lit/decorators.js';

  import { client } from './client';
  import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
  import { MessagesQuery } from './Messages.query.graphql.js';

  import style from './messages.css.js';

  import { Snackbar } from '@material/mwc-snackbar';

  @customElement('messages-query')
  class Messages extends LitElement {
    static styles = [style];

    query = new ApolloQueryController(this, MessagesQuery);

    @query('mwc-snackbar'): Snackbar;

    subscription = new ApolloSubscriptionController(this, MessageSentSubscription, {
      onData: async ({ client, subscriptionResult: { data: { messageSent } } }) => {
        // update the query element
        const cached = client.readQuery({ query: MessagesQuery });
        client.writeQuery({
          query: MessagesQuery,
          data: { messages: [...cached.messages, messageSent] }
        });

        // Display the notification
        await this.updateComplete;
        this.snackbar.labelText = `${messageSent.user} sent a message!`
        this.snackbar.show();
      }
    });


    static formatDate(iso) { /*...*/ }

    render() { /*...*/ }
  }
  ```

  ```ts tab fast
  /*
    Apollo FAST doesn't support controllers yet. Stay Tuned!
   */
  ```

  ```js tab haunted
  import { useQuery, useSubscription, useEffect, component, html } from '@apollo-elements/haunted';
  import { client } from './client';
  import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
  import { MessagesQuery } from './Messages.query.graphql.js';

  import '@material/mwc-snackbar';

  function formatDate(iso) {
    try { return new Date(iso).toDateString(); }
    catch { return ''; }
  }

  function Messages() {
    const { data } = useQuery(MessagesQuery, { client });
    const { data: subscriptionData } = useSubscription(MessageSentSubscription, { client,
      onData: async ({ subscriptionResult: { data: { messageSent } } }) => {
        // update the query element
        const cached = client.readQuery({ query: MessagesQuery });
        client.writeQuery({
          query: MessagesQuery ,
          data: { messages: [...cached.messages, messageSent] }
        });
      }
    });

    useEffect(() => {
      this.shadowRoot.querySelector('mwc-snackbar').labelText =
        `${messageSent.user} sent a message!`
      this.shadowRoot.querySelector('mwc-snackbar').show();
    }, [subscriptionData])

    const messages = this.query.data || [];

    return html`
      <mwc-snackbar></mwc-snackbar>
      <ol>
        ${messages.map(({ date, user, message }) => html`
        <li>
          <h4>
            <time datetime="${date}">${formatDate(date)}</time>
            <span class="user">${user} said:</span>
          </h4>
          <p>${message}</p>
        </li>
        `)}
      </ol>
    `;
  }
  customElements.define('messages-query', component(Messages));
  ```

  ```js tab hybrids
  import { define, query, html } from '@apollo-elements/hybrids';

  import { client } from './client';

  import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
  import { MessagesQuery } from './Messages.query.graphql.js';

  import '@material/mwc-snackbar';

  function formatDate(iso) {/*...*/}

  define('chat-query', {
    query: query(MessagesQuery, { client }),
    subscription: subscription(MessageSentSubscription, { client,
      onData: async ({ subscriptionResult: { data: { messageSent } } }) => {
        // update the query element
        const cached = client.readQuery({ query: MessagesQuery });
        client.writeQuery({
          query: MessagesQuery,
          data: { messages: [...cached.messages, messageSent] }
        });

        const el = document.querySelector('chat-query')
        el.shadowRoot.querySelector('mwc-snackbar').labelText =
          `${messageSent.user} sent a message!`
        el.shadowRoot.querySelector('mwc-snackbar').show();
      }
    }),
    render: host => {
      const messages = host.query.data || [];
      return html`
        <mwc-snackbar></mwc-snackbar>
        <ol>
          ${messages.map(({ date, user, message }) => html`
          <li>
            <h4>
              <time datetime="${date}">${formatDate(date)}</time>
              <span class="user">${user} said:</span>
            </h4>
            <p>${message}</p>
          </li>
          `)}
        </ol>
      `;
    },
  });
  ```

</code-tabs>

## Subscription Component
We could create on a separate `<chat-subscription>` component to handle fetching the subscription side. See the HTML example in the previous section for an example of listening for the subscription's lifecycle events to update the query

## Next Steps

See this simple chat-app demo which demonstrates building custom elements which subscribe to a GraphQL server over websockets: [`#leeway`](https://leeway.apolloelements.dev)

Dive into the [`ApolloSubscription` API](/api/core/interfaces/subscription/) and [component lifecycle](/api/core/interfaces/subscription/lifecycle/)
or continue on to the [managing local state guide](/guides/usage/local-state/).
