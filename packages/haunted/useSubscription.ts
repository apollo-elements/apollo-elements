import type {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { State } from 'haunted';

import { ApolloSubscriptionElement } from '@apollo-elements/interfaces/apollo-subscription';

import { hook } from 'haunted';

import { ApolloHook } from './ApolloHook';

export type SubscriptionHookOptions<D, V> = Partial<Pick<ApolloSubscriptionElement<D, V>,
  | 'fetchPolicy'
  | 'noAutoSubscribe'
  | 'onSubscriptionComplete'
  | 'onSubscriptionData'
  | 'shouldResubscribe'
  | 'shouldSubscribe'
  | 'skip'
  | 'subscription'
  | 'variables'
> & {
  client?: ApolloClient<NormalizedCacheObject>;
}>;

export type SubscriptionResult<D> = Pick<ApolloSubscriptionElement<D>,
  | 'data'
  | 'error'
  | 'loading'
>;

class UseSubscriptionHook<D, V = OperationVariables> extends ApolloHook<
  D,
  V,
  SubscriptionHookOptions<D, V>,
  SubscriptionResult<D>,
  ApolloSubscriptionElement<D, V>
> {
  readonly type = 'subscription';

  readonly componentClass = ApolloSubscriptionElement;

  readonly defaults: Partial<ApolloSubscriptionElement<D, V>> = {
    notifyOnNetworkStatusChange: false,
    shouldResubscribe: false,
    skip: false,
  };

  constructor(
    id: number,
    state: State<ApolloSubscriptionElement<D, V>>,
    subscription: D extends TypedDocumentNode ? D : DocumentNode,
    options?: SubscriptionHookOptions<D, V>
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

  protected optionsToOptionalMethods(): Partial<ApolloSubscriptionElement<D, V>> {
    const { onSubscriptionData, shouldSubscribe } = this.options;
    return { onSubscriptionData, shouldSubscribe };
  }

  update(): SubscriptionResult<D> {
    if (this.disconnected) this.connect();

    const { data, error, loading } = this.state.host;

    return { data, error, loading };
  }
}

export const useSubscription = hook(UseSubscriptionHook);
