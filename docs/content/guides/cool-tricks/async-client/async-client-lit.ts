import { ApolloQueryController } from '@apollo-elements/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UserSessionQuery } from './UserSession.query.graphql';
import { getClient } from './client';
import { formatDistance } from 'date-fns/esm';

@customElement('async-element')
class AsyncElement extends LitElement {
  query = new ApolloQueryController(this, UserSessionQuery);

  async connectedCallback() {
    super.connectedCallback();
    // asynchronously get a reference to the client
    // setting the client will automatically subscribe.
    this.query.client = await getClient();
  }

  render() {
    const name = this.query.data?.userSession?.name ?? '';
    const lastActive = this.query.data?.userSession?.lastActive;

    const time =
      !lastActive ? '' : formatDistance(lastActive, Date.now(), { addSuffix: true });

    return html`
      <h1>👋 ${name}!</h1>
      <p>
        <span>Your last activity was</span>
        <time>${time}</time>
      </p>
    `;
   }
};
