import { useQuery, c } from '@apollo-elements/atomico';

import { UserSessionQuery } from './UserSession.query.graphql';

import { getClient } from './client';
import { formatDistance } from 'date-fns/esm';

function AsyncElement() {
  const query =
    useQuery(UserSessionQuery, { noAutoSubscribe: true });

  useEffect(async () => {
    // asynchronously get a reference to the client
    query.client = await getClient();
    // only then start fetching data
    query.subscribe();
  }, []);

  const name = query.data?.userSession.name ?? ''
  const lastActive = query.data?.userSession.lastActive;

  const time =
    !lastActive ? '' : formatDistance(lastActive, Date.now(), { addSuffix: true });

  return (
    <host shadowDom>
      <h1>👋 {name}!</h1>
      <p>
        <span>Your last activity was</span>
        <time>{time}</time>
      </p>
    </host>
  );
};

customElements.define('async-element', c(AsyncElement));
