import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  FetchPolicy,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type {
  SubscriptionHookOptions as ReactSubscriptionHookOptions,
  SubscriptionResult as ReactSubscriptionResult,
} from '@apollo/client/react/types/types';

import type { State } from 'haunted';

import { ApolloSubscriptionElement } from '@apollo-elements/interfaces/apollo-subscription';

import { hook } from 'haunted';

import { ApolloHook } from './ApolloHook';

export type SubscriptionHookOptions<D, V> = Partial<
  Omit<ReactSubscriptionHookOptions<D, V>, 'client'|'fetchPolicy'> & {
    client: ApolloClient<NormalizedCacheObject>,
    noAutoSubscribe: boolean;
    shouldSubscribe: ApolloSubscriptionElement['shouldSubscribe'];
    fetchPolicy: FetchPolicy;
  }>;

export type SubscriptionResult<TData> = Omit<ReactSubscriptionResult<TData>, 'error'> & {
  error: Error | ApolloError;
}

class UseSubscriptionHook<TData, TVariables> extends ApolloHook<
  TData,
  TVariables,
  SubscriptionHookOptions<TData, TVariables>,
  SubscriptionResult<TData>,
  ApolloSubscriptionElement<TData, TVariables>
> {
  readonly type = 'subscription';

  readonly componentClass = ApolloSubscriptionElement;

  readonly defaults: Partial<ApolloSubscriptionElement<TData, TVariables>> = {
    notifyOnNetworkStatusChange: false,
    shouldResubscribe: false,
    skip: false,
  };

  constructor(
    id: number,
    state: State<ApolloSubscriptionElement<TData, TVariables>>,
    subscription: DocumentNode,
    options?: SubscriptionHookOptions<TData, TVariables>
  ) {
    super(id, state, subscription, options);
    this.init();
  }

  protected optionsToProperties() {
    const {
      onSubscriptionComplete, onSubscriptionData, shouldSubscribe,
      ...options
    } = this.options;
    return {
      ...this.defaults,
      noAutoSubscribe: options.noAutoSubscribe ?? this.state.host.hasAttribute('no-auto-subscribe'),
      skip: options.skip ?? false,
      subscription: this.document,
      variables: options.variables,
    };
  }

  protected optionsToOptionalMethods() {
    const { onSubscriptionData, shouldSubscribe } = this.options;
    return { onSubscriptionData, shouldSubscribe };
  }

  update(): SubscriptionResult<TData> {
    if (this.disconnected) this.connect();

    const { data, error, loading } = this.state.host;

    return { data, error, loading };
  }
}

export const useSubscription = hook(UseSubscriptionHook);
