import { typePolicies } from './typePolicies';

/**
 * There's no TypePoliciesMixin for hybrids,
 * but you can use this one-line function to do the same
 */
function connect(host) {
  host.query.client.cache.policies.addTypePolicies(host.typePolicies);
}

define('theme-toggle', {
  //... code from previous steps
  __typePolicies: { connect },
});
