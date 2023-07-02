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
