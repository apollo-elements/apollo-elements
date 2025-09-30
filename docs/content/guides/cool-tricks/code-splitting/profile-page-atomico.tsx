import { useQuery, useEffect, c } from '@apollo-elements/atomico';
import { UserTypePolicies } from './typePolicies';

import { UserQuery } from './User.query.graphql';

function ProfilePage({ client }) {
  const { client, data } = useQuery(UserQuery);

  /**
   * There's no TypePoliciesMixin for atomico,
   * but you can use the `useEffect` hook to do the same
   */
  useEffect(() => {
    client.cache.policies.addTypePolicies(UserTypePolicies);
  }, [client]);

  return <host>...</host>;
}

customElements.define('profile-page', c(ProfilePage));
