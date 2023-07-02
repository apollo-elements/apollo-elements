import { useQuery, useSubscription, useEffect, useHost, c } from '@apollo-elements/atomico';
import { client } from './client';
import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
import { MessagesQuery } from './Messages.query.graphql.js';

import '@material/mwc-snackbar';

function formatDate(iso) {
  try { return new Date(iso).toDateString(); }
  catch { return ''; }
}

function Messages() {
  const ref = useHost();
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
    ref.current.shadowRoot.querySelector('mwc-snackbar').labelText =
      `${messageSent.user} sent a message!`
    ref.current.shadowRoot.querySelector('mwc-snackbar').show();
  }, [subscriptionData])

  const messages = queryData?.messages ?? [];

  return (
    <host shadowDom>
      <mwc-snackbar></mwc-snackbar>
      <ol>
        {messages.map(({ date, user, message }) => (
        <li>
          <h4>
            <time datetime={date}>{formatDate(date)}</time>
            <span class="user">{user} said:</span>
          </h4>
          <p>{message}</p>
        </li>
        ))}
      </ol>
    </host>
  );
}

customElements.define('messages-query', c(Messages));
