<meta name="description" content="How to use Apollo Elements to write declarative web components that subscribe to real-time updates over GraphQL"/>

You can create components which use GraphQL subscriptions to update over websockets.

In this example, `<chat-subscription>` has its `subscription` property passed in from the parent, rather than defined statically, as one normally would.
This could be useful in cases where `<chat-subscription>` can render a variety of different queries.

<details>
<summary>Messages.query.graphql</summary>

```graphql
query MessagesQuery {
  messages {
    date
    message
    user
  }
}
```

</details>

<details>
<summary>MessageSent.subscription.graphql</summary>

```graphql
subscription MessageSentSubscription {
  messageSent {
    date
    message
    user
  }
}
```

</details>

```ts
import { ApolloQuery, html, customElement } from '@apollo-elements/lit-apollo';
import { format } from 'date-fns/fp';

import './chat-subscription';

import bound from 'bind-decorator';

import MessagesQuery from './Messages.query.graphql';
import MessageSentSubscription from './MessageSent.subscription.graphql';

@customElement("chat-query")
export class ChatQuery extends ApolloQuery {
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
          <div>
            <dt>
              <time>${format('HH:mm', message.date)}</time>
              ${message.user}
            </dt>
            <dd>${message.message}</dd>
          </div>
        `)}
      </dl>`
      )}
    `;
  }

  @bound onSubscriptionData({ client, subscriptionData: { data: { messageSent } } }) {
    const { query } = this;
    const { messages } = client.readQuery({ query });
    const data = { messages: [...messages, messageSent] };
    client.writeQuery({ query, data });
  }
}
```

Alternatively, you can call `subscribeToMore` on a query component with a subscription `document` and an `updateQuery` function to have your component update it's data based on subscription results:

```js
updateQuery(prev, { subscriptionData }) {
  if (!subscriptionData.data) return prev;
  return {
    ...prev,
    messages: [...prev.messages, subscriptionData.data.messageSent]
  };
}

firstUpdated() {
  const { updateQuery } = this;
  this.subscribeToMore({
    updateQuery,
    document: gql`
      subscription {
        messageSent {
          date
          message
          user
        }
      }`
  });
}

```

See this simple chat-app demo which demonstrates building custom elements which subscribe to a GraphQL server over websockets: [`#leeway`](https://leeway.apolloelements.dev)
