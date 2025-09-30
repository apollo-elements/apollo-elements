import { query, define } from '@apollo-elements/hybrids';
import { UserTypePolicies } from './typePolicies';
import { UserQuery } from './User.query.graphql';

define('profile-page', {
  query: query(UserQuery),
  __typePolicies: {
    /**
     * There's no TypePoliciesMixin for hybrids,
     * but you can use this one-line function to do the same
     */
    connect(host) {
      host.query.client.cache.policies.addTypePolicies(UserTypePolicies);
    }
  },
});
