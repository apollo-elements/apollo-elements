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

  @query('mwc-snackbar') snackbar: Snackbar;

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
