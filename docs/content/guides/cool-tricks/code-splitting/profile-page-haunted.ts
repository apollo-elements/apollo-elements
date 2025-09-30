import { useQuery, useEffect, component, html } from '@apollo-elements/haunted';
import { UserTypePolicies } from './typePolicies';

import { UserQuery } from './User.query.graphql';

function ProfilePage({ client }) {
  const { client, data } = useQuery(UserQuery);

  /**
   * There's no TypePoliciesMixin for haunted,
   * but you can use the `useEffect` hook to do the same
   */
  useEffect(() => {
    client.cache.policies.addTypePolicies(UserTypePolicies);
  }, [client]);

  return html`...`;
}

customElements.define('profile-page', component(ProfilePage));
