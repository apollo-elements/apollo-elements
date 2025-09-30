import { FASTElement, customElement, html, repeat } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';

import { client } from './client';
import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
import { MessagesQuery } from './Messages.query.graphql.js';

import style from './messages.css.js';

const template: ViewTemplate<Messages> = html`
  <ol>${repeat(x => x.query.data?.messages ?? [], ({ date, user, message }) => html`
    <li>
      <h4>
        <time datetime="${date}">${Message.formatDate(date)}</time>
        <span class="user">${user} said:</span>
      </h4>
      <p>${message}</p>
    </li>` as ViewTemplate<Message>)}
  </ol>
`;

@customElement({ name: 'messages-query', style template })
class Messages extends ApolloQuery<typeof MessagesQuery> {
  query = new ApolloQueryBehavior(this, MessagesQuery);

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
}
