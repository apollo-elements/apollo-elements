import { useQuery, c } from '@apollo-elements/atomico';

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

  const messages = data?.messages ?? [];

  return (
    <host shadowDom>
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
