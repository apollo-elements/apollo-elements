import { ApolloQueryMixin } from '@apollo-elements/mixins'
import { client } from './client';
import { MessageSentSubscription } from './MessageSent.subscription.graphql.js';
import { MessagesQuery } from './Messages.query.graphql.js';

const template = document.createElement('template');
      template.innerHTML = `
      <link rel="stylesheet" href="messages.css">
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

  $ = selector => this.shadowRoot.querySelector(selector);

  constructor() {
    super();
    this
      .attachShadow({ mode: 'open' })
      .append(template.content.cloneNode(true))
  }

  connectedCallback() {
    super.connectedCallback();
    this.subscribeToMore({
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

  onData(data) {
    if (!data) return;
    for (const message of data.messages) {
      if (!this.$(`[datetime="${message.date}"]`))
        this.$('ol').append(Messages.stampMessage(message))
    }
  }

  static stampMessage({ date, message, user }) {
    const node = msgTpl.content.cloneNode(true);
    const time = node.querySelector('time')
          time.setAttribute('datetime', date);
          time.textContent = Messages.formatDate(date);
    const user = node.querySelector('.user');
          user.textContent = user;
    const p = node.querySelector('p');
          p.textContent = message;
    return node;
  }

  static formatDate(iso) {
    try { return new Date(iso).toDateString(); }
    catch { return ''; }
  }
}

customElements.define('messages-query', Messages);
