import hasAllVariables from '@apollo-elements/lib/has-all-variables';

import { clientFactory } from './factories/client';
import { queryFactory } from './factories/query';

const onNext = host => ({ data, loading, networkStatus, stale }) => {
  host.data = data;
  host.loading = loading;
  host.networkStatus = networkStatus;
  host.stale = stale;
};

const onError = host => error =>
  host.error = error;

const options = () => {
  const set = (host, options) => {
    if (host.observableQuery) host.observableQuery.setOptions(options);
    return options;
  };
  return { set };
};

const executeQuery = {
  get: host => ({
    metadata,
    context,
    query = host.query,
    variables = host.variables,
    fetchPolicy = host.fetchPolicy,
    errorPolicy = host.errorPolicy,
    fetchResults = host.fetchResults,
  } = host) => {
    const queryPromise =
      host.client
        .query({ context, errorPolicy, fetchPolicy, fetchResults, metadata, query, variables })
        .catch(onError(host));

    queryPromise.then(onNext(host));

    return queryPromise;
  },
};

const subscribeToMore = {
  get: ({ observableQuery }) => ({ document, updateQuery } = {}) =>
    observableQuery && observableQuery.subscribeToMore({ document, updateQuery }),
};

const fetchMore = {
  get: host => ({ query = host.query, updateQuery, variables } = {}) =>
    host.observableQuery &&
    host.observableQuery.fetchMore({ query, updateQuery, variables }),
};


const subscribe = {
  get: host => ({ query = host.query, variables = host.variables } = {}) => {
    if (!hasAllVariables({ query, variables })) return;
    host.observableQuery = host.watchQuery(host, { query });
    const error = onError(host);
    const next = onNext(host);
    return host.observableQuery.subscribe({ error, next });
  },
};

const watchQuery = {
  get: host => ({ query = host.query, variables = host.variables } = {}) =>
    host.client.watchQuery({
      context: host.context,
      errorPolicy: host.errorPolicy,
      fetchPolicy: host.fetchPolicy,
      fetchResults: host.fetchResults,
      metadata: host.metadata,
      notifyOnNetworkStatusChange: host.notifyOnNetworkStatusChange,
      pollInterval: host.pollInterval,
      query,
      variables,
    }),
};

function subscribeOrSetVariables(host, variables) {
  return variables &&
      host.observableQuery &&
      host.observableQuery.setVariables &&
      typeof host.observableQuery.setVariables === 'function'
    ? host.observableQuery.setVariables(variables)
    : host.subscribe({ variables });
}

function canSubscribe(host, key, target) {
  return !!(host === target && host[key]);
}

const variables = {
  connect: (host, key) => {
    const onInvalidate = ({ target }) =>
      canSubscribe(host, key, target) &&
      subscribeOrSetVariables(host, host[key]);
    host.addEventListener('@invalidate', onInvalidate);
    return () => host.removeEventListener('@invalidate', onInvalidate);
  },
};

export const ApolloQuery = {
  client: clientFactory(),
  data: null,
  errorPolicy: 'none',
  options: options(),
  query: queryFactory(),
  variables,
  watchQuery,
  subscribeToMore,
  executeQuery,
  fetchMore,
  subscribe,
};
