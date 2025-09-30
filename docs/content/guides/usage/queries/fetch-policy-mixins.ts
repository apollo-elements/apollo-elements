import type { FetchPolicy } from '@apollo/client/core';

class CacheOnlyQueryElement extends ApolloQueryMixin(HTMLElement)<typeof HeavySlowQuery> {
  query = HeavySlowQuery;

  fetchPolicy: FetchPolicy = 'cache-only';
}
