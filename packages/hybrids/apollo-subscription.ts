import type {
  ApolloSubscription as IApolloSubscription,
  SubscriptionResult,
} from '@apollo-elements/mixins/apollo-subscription';

import hasAllVariables from '@apollo-elements/lib/has-all-variables';
import isFunction from 'crocks/predicates/isFunction';

import { clientFactory } from './factories/client';
import { subscriptionFactory } from './factories/subscription';
import { ApolloError, SubscriptionOptions } from 'apollo-client';

type ApolloSubscriptionElement<TData, TVariables> =
  IApolloSubscription<TData, TVariables> &
  HTMLElement & {
    nextError(host: ApolloSubscriptionElement<TData, TVariables>): (error: Error) => void;
    nextData(host: ApolloSubscriptionElement<TData, TVariables>):
      ({ data }: SubscriptionResult<TData>) => void;
  };

export const ApolloSubscription = {
  client: clientFactory(),

  data: null,

  errorPolicy: 'none',

  fetchPolicy: 'cache-first',

  subscription: subscriptionFactory(),

  variables: {
    connect<TData, TVariables>(
      host: ApolloSubscriptionElement<TData, TVariables>,
      key: keyof IApolloSubscription<TData, TVariables>
    ): () => void {
      const onInvalidate = ({ target }): void => {
        if (host === target && host[key]) host.subscribe();
      };

      host.addEventListener('@invalidate', onInvalidate);
      return (): void => host.removeEventListener('@invalidate', onInvalidate);
    },

    set<TData, TVariables>(
      host: ApolloSubscriptionElement<TData, TVariables>,
      next: TVariables,
    ): TVariables {
      host.subscribe({ variables: next });
      return next;
    },
  },

  nextData: {
    get<TData, TVariables>(host: ApolloSubscriptionElement<TData, TVariables>) {
      return ({ data }: SubscriptionResult<TData>): void => {
        const { onSubscriptionData, client } = host;
        host.data = data;
        host.loading = false;
        host.error = null;
        if (isFunction(onSubscriptionData))
          onSubscriptionData({ client, subscriptionData: { data } });
      };
    },
  },

  nextError: {
    get<TData, TVariables>(host: ApolloSubscriptionElement<TData, TVariables>) {
      return (error: ApolloError): void => {
        host.error = error;
        host.loading = false;
      };
    },
  },

  subscribe: {
    get<TData, TVariables>(host: ApolloSubscriptionElement<TData, TVariables>) {
      return (options?: Partial<SubscriptionOptions>): ZenObservable.Subscription => {
        const fetchPolicy = options?.fetchPolicy ?? host.fetchPolicy;
        const query = options?.query ?? host.subscription;
        const variables = options?.variables ?? host.variables;
        if (!hasAllVariables({ query, variables })) return;
        const observable = host.client.subscribe({ fetchPolicy, query, variables });
        const error = host.nextError(host);
        const next = host.nextData(host);
        host.observable = observable;
        return observable.subscribe({ error, next });
      };
    },
  },

};
