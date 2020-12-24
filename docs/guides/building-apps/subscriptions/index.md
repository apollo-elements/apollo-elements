---
description: Use Apollo Elements to write high-performance realtime GraphQL subscription components
---

# Building Apps >> Subscriptions || 30

You can create components which use GraphQL subscriptions to update over websockets.

Consider this query:

```graphql copy
query MessagesQuery {
  messages {
    date
    message
    user
  }
}
```

And this subscription:

```graphql copy
subscription MessageSentSubscription {
  messageSent {
    date
    message
    user
  }
}
```

Let's define a component which performs the following tasks:
1. queries for messages
2. subscribes to any new messages
3. when new messages arrive, integrate them with the cached messages from the query.

We'll accomplish this by calling `subscribeToMore` on our element once it's connected to the DOM, passing in an `updateQuery` function to define the merge for new data:

<code-tabs collection="libraries">

  ```js tab mixins
  updateQuery(prev, { subscriptionData }) {
    if (!subscriptionData.data) return prev;
    return {
      ...prev,
      messages: [...prev.messages, subscriptionData.data.messageSent]
    };
  }

  connectedCallback() {
    const { updateQuery } = this;
    this.subscribeToMore({ updateQuery, document: MessageSentSubscription });
  }
  ```

  ```js tab lit
  updateQuery(prev, { subscriptionData }) {
    if (!subscriptionData.data) return prev;
    return {
      ...prev,
      messages: [...prev.messages, subscriptionData.data.messageSent]
    };
  }

  connectedCallback() {
    super.connectedCallback();
    const { updateQuery } = this;
    this.subscribeToMore({ updateQuery, document: MessageSentSubscription });
  }
  ```

  ```js tab fast
  updateQuery(prev, { subscriptionData }) {
    if (!subscriptionData.data) return prev;
    return {
      ...prev,
      messages: [...prev.messages, subscriptionData.data.messageSent]
    };
  }

  connectedCallback() {
    super.connectedCallback();
    const { updateQuery } = this;
    this.subscribeToMore({ updateQuery, document: MessageSentSubscription });
  }
  ```

  ```js tab haunted
  function updateQuery(prev, { subscriptionData }) {
    if (!subscriptionData.data) return prev;
    return {
      ...prev,
      messages: [...prev.messages, subscriptionData.data.messageSent]
    };
  }

  function Component() {
    const { data, subscribeToMore } = useQuery(Query);

    useEffect(() => {
      subscribeToMore({ document: MessageSentSubscription, updateQuery });
    }, [subscribeToMore]);

    return html`...`;
  }
  ```

  ```js tab hybrids
  function updateQuery(prev, { subscriptionData }) {
    if (!subscriptionData.data) return prev;
    return {
      ...prev,
      messages: [...prev.messages, subscriptionData.data.messageSent]
    };
  }

  function connect(host) {
    host.subscribeToMore({ updateQuery, document: MessageSentSubscription });
  }

  define('chat-query', {
    client: client(window.__APOLLO_CLIENT__),
    query: query<Data, Variables>(MessagesQuery),
    onSubscriptionData: { get() { return x => onSubscriptionData(host, x); } },
    // use a "private" property to gain access to connectedCallback
    __init_subscribetomore__: property(null, connect)
    render
  });
  ```

</code-tabs>

Alternatively, we could create on a separate component to handle fetching the subscription side. In this example, `<chat-subscription>` has its `subscription` property passed in from the parent, rather than defined statically, as one normally would. This could be useful in cases where `<chat-subscription>` can update a variety of different queries.

<code-tabs collection="libraries">

  ```ts tab mixins
  import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
  import { format } from 'date-fns/fp';

  import './chat-subscription';

  import bound from 'bind-decorator';

  import MessagesQuery from './Messages.query.graphql';
  import MessageSentSubscription from './MessageSent.subscription.graphql';

  import type {
    MessagesQueryData as Data,
    MessagesQueryVariables as Variables,
  } from '../schema';

  const template = document.createElement('template');
  template.innerHTML = `
    <chat-subscription></chat-subscription>
  `;

  const errorTemplate = document.createElement('template');
  errorTemplate.innerHTML = `
    <h1>😢 Such Sad, Very Error! 😰</h1>
    <pre>
      <code></code>
    </pre>
  `;

  const dataTemplate = document.createElement('template');
  dataTemplate.innerHTML = '<dl></dl>';

  const itemTemplate = document.createElement('template');
  itemTemplate.innerHTML = `
    <dt>
      <time></time>
    </dt>
    <dd></dd>
  `;

  export class ChatQuery extends ApolloQueryMixin<Data, Variables> {
    query = MessagesQuery;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      this.$('chat-subscription').subscription =
        MessageSentSubscription;

      this.$('chat-subscription').onSubscriptionData =
        this.onSubscriptionData.bind(this);
    }

    render() {
      this.shadowRoot.querySelectorAll(':not(chat-subscription)')
        .forEach(el => el.remove());

      if (this.loading)
        this.shadowRoot.append(new Text('Loading...'));
      else if (this.error) {
        this.shadowRoot.append(errorTemplate.content.cloneNode(true));
        this.$('code').textContent = this.error.message;
      } else {
        this.shadowRoot.append(dataTemplate.content.cloneNode(true));
        this.data.messages.forEach(message => {
          const time = item.querySelector('time');
          const item = itemTemplate.content.cloneNode(true);
          time.textContent = format('HH:mm', message.date);
          time.parentNode.insertBefore(new Text(message.user), time);
          item.querySelector('dd').textContent = message.message;
          this.$('dl').append(item);
        });
      }
    }

    @bound onSubscriptionData(result) {
      const { client, subscriptionData: { data: { messageSent } } } = result;
      const { query } = this;
      const { messages } = client.readQuery({ query });
      const data = { messages: [...messages, messageSent] };
      client.writeQuery({ query, data });
    }
  }

  customElements.define('chat-query', ChatQuery);
  ```

  ```ts tab lit
  import { ApolloQuery, html, customElement } from '@apollo-elements/lit-apollo';
  import { format } from 'date-fns/fp';

  import './chat-subscription';

  import bound from 'bind-decorator';

  import MessagesQuery from './Messages.query.graphql';
  import MessageSentSubscription from './MessageSent.subscription.graphql';

  import type {
    MessagesQueryData as Data,
    MessagesQueryVariables as Variables,
  } from '../schema';

  @customElement("chat-query")
  export class ChatQuery extends ApolloQuery<Data, Variables> {
    query = MessagesQuery;

    render() {
      return html`
        <chat-subscription
            .subscription="${MessageSentSubscription}"
            .onSubscriptionData=${this.onSubscriptionData}>
        </chat-subscription>
      ${(
        this.loading ? html`
          Loading...`
      : this.error ? html`
          <h1>😢 Such Sad, Very Error! 😰</h1>
          <pre>
            <code>${error.message}</code>
          </pre>`
      : html`
        <dl>
          ${this.data.messages.map(message => html`
            <dt>
              <time>${format('HH:mm', message.date)}</time>
              ${message.user}
            </dt>
            <dd>${message.message}</dd>
          `)}
        </dl>`
        )}
      `;
    }

    @bound onSubscriptionData(result) {
      const { client, subscriptionData: { data: { messageSent } } } = result;
      const { query } = this;
      const { messages } = client.readQuery({ query });
      const data = { messages: [...messages, messageSent] };
      client.writeQuery({ query, data });
    }
  }

  ```

  ```ts tab fast
  import { ApolloQuery, html, customElement } from '@apollo-elements/fast';
  import { format } from 'date-fns/fp';

  import './chat-subscription';

  import bound from 'bind-decorator';

  import MessagesQuery from './Messages.query.graphql';
  import MessageSentSubscription from './MessageSent.subscription.graphql';

  import type {
    MessagesQueryData as Data,
    MessagesQueryVariables as Variables,
  } from '../schema';

  const template = html<ChatQuery>`
    <chat-subscription
        .subscription="${MessageSentSubscription}"
        .onSubscriptionData=${x => x.onSubscriptionData}>
    </chat-subscription>
  ${(
    x => x.loading ? html`
      Loading...`
  : x => x.error ? html`
      <h1>😢 Such Sad, Very Error! 😰</h1>
      <pre>
        <code>${x => x.error.message}</code>
      </pre>`
  : html`
    <dl>
      ${x => x.data.messages.map(message => html`
        <dt>
          <time>${format('HH:mm', message.date)}</time>
          ${message.user}
        </dt>
        <dd>${message.message}</dd>
      `)}
    </dl>`
    )}
  `;

  @customElement({ name: 'chat-query', template })
  export class ChatQuery extends ApolloQuery<Data, Variables> {
    query = MessagesQuery;

    @bound onSubscriptionData({ client, subscriptionData: { data: { messageSent } } }) {
      const { query } = this;
      const { messages } = client.readQuery({ query });
      const data = { messages: [...messages, messageSent] };
      client.writeQuery({ query, data });
    }
  }

  ```

  ```ts tab haunted
  import { useQuery, useSubscription, component, html } from '@apollo-elements/hybrids';
  import { format } from 'date-fns/fp';

  import MessagesQuery from './Messages.query.graphql';
  import MessageSentSubscription from './MessageSent.subscription.graphql';

  import type {
    MessagesQueryData as Data,
    MessagesQueryVariables as Variables,
    MessagesSubscriptionData as SubscriptionData,
    MessagesSubscriptionVariables as SubscriptionVariables,
  } from '../schema';

  function onSubscriptionData(host, result) {
    const { client, subscriptionData: { data: { messageSent } } } = result
    const { query } = host;
    const { messages } = client.readQuery({ query });
    const data = { messages: [...messages, messageSent] };
    client.writeQuery({ query, data });
  }

  function Chat() {
    const { data } = useSubscription(MessageSentSubscription, { onSubscriptionData });
  }

  function Messages() {
    const { data } = useQuery(MessagesQuery);

    return html`
    <chat-subscription .subscription="${MessageSentSubscription}"></chat-subscription>
    <dl>
      ${data.messages.map(({ date, user, message }) => html`
      <dt><time>${format('HH:mm', date)}</time> ${user}</dt>
      <dd>${message}</dd>
      `)}
    </dl>
  `;

  customElements.define('chat-query', component(Messages));
  customElements.define('chat-subscription', component(Chat));
  ```

  ```ts tab hybrids
  import { client, query, define, html } from '@apollo-elements/hybrids';
  import { format } from 'date-fns/fp';

  import './chat-subscription';

  import MessagesQuery from './Messages.query.graphql';
  import MessageSentSubscription from './MessageSent.subscription.graphql';

  import type {
    MessagesQueryData as Data,
    MessagesQueryVariables as Variables,
  } from '../schema';

  function onSubscriptionData(host, result) {
    const { client, subscriptionData: { data: { messageSent } } } = result
    const { query } = host;
    const { messages } = client.readQuery({ query });
    const data = { messages: [...messages, messageSent] };
    client.writeQuery({ query, data });
  }

  const render = ({ data, error, loading }) html`
    <chat-subscription
        .subscription="${MessageSentSubscription}"
        .onSubscriptionData=${onSubscriptionData}>
    </chat-subscription>
  ${(
    loading ? html`
      Loading...`
  : error ? html`
      <h1>😢 Such Sad, Very Error! 😰</h1>
      <pre>
        <code>${error.message}</code>
      </pre>`
  : html`
    <dl>
      ${data.messages.map(message => html`
        <dt>
          <time>${format('HH:mm', message.date)}</time>
          ${message.user}
        </dt>
        <dd>${message.message}</dd>
      `)}
    </dl>`
    )}
  `;

  define<ApolloQuery<Data, Variables>>('chat-query', {
    client: client(),
    query: query(MessagesQuery),
    onSubscriptionData: {
      get() {
        return x => onSubscriptionData(host, x);
      }
    },
    render
  });
  ```

</code-tabs>

See this simple chat-app demo which demonstrates building custom elements which subscribe to a GraphQL server over websockets: [`#leeway`](https://leeway.apolloelements.dev)
