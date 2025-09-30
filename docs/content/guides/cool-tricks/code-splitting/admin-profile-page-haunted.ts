import { useQuery, useEffect, component, html } from '@apollo-elements/haunted';
import { UserTypePolicies, AdminTypePolicies } from './typePolicies';

import { UserQuery } from './User.query.graphql';

function AdminProfilePage() {
  const { client, data } = useQuery(UserQuery);

  /**
   * There's no TypePoliciesMixin for haunted,
   * but you can use the `useEffect` hook to do the same
   */
  useEffect(() => {
    client.cache.policies.addTypePolicies(UserTypePolicies),
    client.cache.policies.addTypePolicies(AdminTypePolicies),
  }, [client]);

  return html`...`;
}

customElements.define('admin-profile-page', component(AdminProfilePage));
