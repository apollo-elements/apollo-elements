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
