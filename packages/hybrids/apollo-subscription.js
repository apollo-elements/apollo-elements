import hasAllVariables from '@apollo-elements/lib/has-all-variables';
import isFunction from 'crocks/predicates/isFunction';

import { clientFactory } from './factories/client';
import { subscriptionFactory } from './factories/subscription';

const onNext = host => ({ data }) => {
  const { onSubscriptionData, client } = host;
  if (isFunction(onSubscriptionData)) onSubscriptionData({ client, subscriptionData: { data } });
  host.data = data;
  host.loading = false;
  host.error = null;
};

const onError = host => error => {
  host.error = error;
  host.loading = false;
};

const variables = {
  connect: (host, key) => {
    const onInvalidate = ({ target }) => {
      if (host === target && host[key]) host.subscribe();
    };

    host.addEventListener('@invalidate', onInvalidate);
    return () => host.removeEventListener('@invalidate', onInvalidate);
  },
};

const subscribe = {
  get: host => ({
    fetchPolicy = host.fetchPolicy,
    query = host.subscription,
    variables = host.variables,
  } = {}) => {
    if (!hasAllVariables({ query, variables })) return;
    const observable = host.client.subscribe({ fetchPolicy, query, variables });
    const error = host.nextError(host);
    const next = host.nextData(host);
    host.observable = observable;
    return observable.subscribe({ error, next });
  },
};

export const ApolloSubscription = {
  client: clientFactory(),
  data: null,
  errorPolicy: 'none',
  fetchPolicy: 'cache-first',
  subscription: subscriptionFactory(),
  variables,
  subscribe,
  nextData: { get: host => onNext(host) },
  nextError: { get: host => onError(host) },
};
