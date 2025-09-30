import { query, define, property, html } from '@apollo-elements/hybrids';

import { getClient } from './client';
import { formatDistance } from 'date-fns/esm';

import { UserSessionQuery } from './UserSession.query.graphql';

function getTime(userSession): string {
  const lastActive = userSession?.lastActive;
  return (
      !lastActive ? ''
    : formatDistance(new Date(lastActive), Date.now(), { addSuffix: true })
  );
}

async function connect(host) {
  // asynchronously get a reference to the client.
  // setting the client will automatically start querying.
  host.query.client = await getClient();
}

define('async-element', {
  // use 'connect' to gain access to connectedCallback
  __asyncClient: { connect },
  query: query(UserSessionQuery),
  render: ({ query }) => html`
    <h1>👋 ${query.data?.userSession.name}!</h1>
    <p>
      <span>Your last activity was</span>
      <time>${getTime(query.data?.userSession)}</time>
    </p>
  `
})
