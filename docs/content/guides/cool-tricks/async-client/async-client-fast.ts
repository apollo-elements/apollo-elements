import { FASTElement, customElement, html, ViewTemplate } from '@microsoft/fast-element';
import { ApolloQueryBehavior } from '@apollo-elements/fast';

import { UserSessionQuery } from './UserSession.query.graphql';

import { getClient } from './client';
import { formatDistance } from 'date-fns/esm';

function getTime(userSession): string {
  const lastActive = userSession?.lastActive;
  return (
      !lastActive ? ''
    : formatDistance(new Date(lastActive), Date.now(), { addSuffix: true })
  );
}

const template: ViewTemplate<AsyncElement> = html`
  <h1>👋 ${x => x.data?.userSession.name}!</h1>
  <p>
    <span>Your last activity was</span>
    <time>${x => getTime(x.data?.userSession)}</time>
  </p>
`;

@customElement({ name: 'async-element', template })
class AsyncElement extends FASTElement {
  noAutoSubscribe = true;

  query = new ApolloQueryBehavior(this, UserSessionQuery);

  async connectedCallback() {
    super.connectedCallback();
    // asynchronously get a reference to the client
    // setting the client will start fetching the query
    this.query.client = await getClient();
  }
};
