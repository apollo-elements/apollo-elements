import { FASTElement, customElement, html, ref, ViewTemplate } from 'lit';
import { ApolloQueryBehavior, ApolloSubscriptionBehavior } from '@apollo-elements/fast';

import { client } from './client';
import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
import { MessagesQuery } from './Messages.query.graphql.js';

import styles from './messages.css.js';

import { Snackbar } from '@material/mwc-snackbar';

const template: ViewTemplate<Messages> = html`...`;

@customElement({ name: 'messages-query', styles, template })
class Messages extends LitElement {
  query = new ApolloQueryBehavior(this, MessagesQuery);

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
}
