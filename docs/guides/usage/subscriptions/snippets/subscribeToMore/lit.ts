import { ApolloQueryController } from '@apollo-elements/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { client } from './client.js';
import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
import { MessagesQuery } from './Messages.query.graphql.js';

import style from './messages.css.js';

@customElement('messages-query')
export class Messages extends LitElement {
  static styles = [style];

  query = new ApolloQueryController(this, MessagesQuery, { client });

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

  render() {
    const messages = this.query.data || [];
    return html`
      <ol>${messages.map(({ date, user, message }) => html`
        <li>
          <h4>
            <time datetime="${date}">${Messages.formatDate(date)}</time>
            <span class="user">${user} said:</span>
          </h4>
          <p>${message}</p>
        </li>`)}
      </ol>
    `;
  }
}
