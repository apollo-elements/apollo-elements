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
  const { data: queryData } = useQuery(MessagesQuery, { client });
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

  const messages = queryData || [];

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
