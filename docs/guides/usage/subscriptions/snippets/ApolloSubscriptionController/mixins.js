import { ApolloQueryMixin } from '@apollo-elements/mixins';
import { ApolloSubscriptionController } from '@apollo-elements/core';
import { client } from './client';
import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
import { MessagesQuery } from './Messages.query.graphql.js';

import '@material/mwc-snackbar';

const template = document.createElement('template');
      template.innerHTML = `
      <link webc:keep rel="stylesheet" href="messages.css">
      <mwc-snackbar></mwc-snackbar>
      <ol></ol>`;

const msgTpl = document.createElement('template');
      msgTpl.innerHTML = `
      <li>
        <h4>
          <time>{{ formatDate(item.date) }}</time>
          <span class="user">{{ item.user }} said:</span>
        </h4>
        <p>{{ item.message }}</p>
      </li>`;

class Messages extends ApolloQueryMixin(HTMLElement) {
  client = client;

  query = MessagesQuery;

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
      this.$('mwc-snackbar').labelText = `${messageSent.user} sent a message!`;
      this.$('mwc-snackbar').show();
    }
  });

  $ = selector => this.shadowRoot.querySelector(selector);

  constructor() { /*...*/ }

  onData(data) { /*...*/ }

  static stampMessage({ date, message, user }) { /*...*/ }

  static formatDate(iso) { /*...*/ }
}

customElements.define('messages-query', Messages);
