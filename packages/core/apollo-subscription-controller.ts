import type {
  ComponentDocument,
  Data,
  Variables,
  SubscriptionDataOptions,
} from '@apollo-elements/interfaces';

import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  Observable,
  OperationVariables,
  SubscriptionOptions,
  TypedDocumentNode,
  WatchQueryOptions,
} from '@apollo/client/core';

import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type { VariablesOf } from '@graphql-typed-document-node/core';

import { ApolloController, ApolloControllerOptions, update } from './apollo-controller';

import { bound } from '@apollo-elements/lib/bound';

export interface ApolloSubscriptionControllerOptions<D, V> extends ApolloControllerOptions<D, V>,
          Partial<WatchQueryOptions<Variables<D, V>, Data<D>>> {
  variables?: Variables<D, V>,
  fetchPolicy?: FetchPolicy;
  noAutoSubscribe?: boolean;
  shouldSubscribe?: (options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>) => boolean;
  shouldResubscribe?: boolean;
  skip?: boolean;
  onData?: (detail: {
    client: ApolloClient<NormalizedCacheObject>;
    subscriptionData: { data?: Data<D> | null; loading: boolean; error: null; };
  }) => void;
  onComplete?: () => void;
  onError?: (error: ApolloError) => void;
}

export class ApolloSubscriptionController<
  D extends DocumentNode,
  V = D extends TypedDocumentNode ? VariablesOf<D> : OperationVariables,
> extends ApolloController<D, V> implements ReactiveController {
  private observable?: Observable<FetchResult<Data<D>>>;

  private observableSubscription?: ZenObservable.Subscription;

  declare options: ApolloSubscriptionControllerOptions<D, V>;

  /**
   * Latest subscription data.
   */
  declare data?: Data<D>;

  /**
   * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
   *
   * Setting variables will initiate the subscription, unless [`noAutoSubscribe`](#noautosubscribe) is also set.
   *
   * @summary Subscription variables.
   */
  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  declare variables: Variables<D, V> | undefined;

  get subscription(): this['document'] { return this.document; }

  set subscription(document: this['document']) { this.document = document; }

  constructor(
    host: ReactiveControllerHost,
    subscription?: D,
    options?: ApolloSubscriptionControllerOptions<D, V>
  ) {
    super(host, options);
    this.init(subscription);
  }

  hostConnected(): void {
    this.documentChanged(this.subscription);
    super.hostConnected?.();
  }

  /**
   * Determines whether the element is able to automatically subscribe
   */
  private canSubscribe(
    options?: Partial<SubscriptionOptions<Variables<D, V> | null, Data<D>>>
  ): boolean {
    /* c8 ignore next 4 */
    return (
      !(this.options.noAutoSubscribe ?? false) &&
      !!this.client &&
      !!(options?.query ?? this.document)
    );
  }

  private initObservable(params?: Partial<SubscriptionDataOptions<D, V>>): void {
    const {
      shouldResubscribe = this.options.shouldResubscribe,
      client = this.client,
      skip = this.options.skip,
      ...rest
    } = params ?? {};

    if (!client)
      throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/');

    if ((this.observable && !shouldResubscribe) || skip)
      return;

    this.observable = client.subscribe({
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      query: this.subscription!,
      variables: this.variables,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      ...rest,
    });
  }

  /**
   * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
   */
  private nextData(result: FetchResult<Data<D>>) {
    const { data = null, errors } = result;
    // If we got to this line without a client, it's because of user error
    const client = this.client!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const loading = false;
    const subscriptionData = { data, loading, error: null };
    const detail = { client, subscriptionData };
    this.data = data ?? undefined;/* c8 ignore next */ // just to satisfy onData interface
    this.loading = loading;
    this.error = undefined;
    this.errors = errors;
    this.options.onData?.(detail); /* c8 ignore next */ // covered
    this[update]();
  }

  /**
   * Sets `error` and `loading` on the instance when the subscription errors.
   */
  private nextError(error: ApolloError) {
    this.error = error;
    this.loading = false;
    this.options.onError?.(error); /* c8 ignore next */ // covered
    this[update]();
  }

  /**
   * Shuts down the subscription
   */
  private onComplete(): void {
    this.options.onComplete?.(); /* c8 ignore next */ // covered
    this.endSubscription();
    this[update]();
  }

  private endSubscription() {
    if (this.observableSubscription) {
      this.observableSubscription.unsubscribe();
      this.observableSubscription = undefined;
    }
  }

  protected documentChanged(document?: DocumentNode | ComponentDocument<D>): void {
    this.cancel();
    const query = document;
    if (this.canSubscribe({ query }) && (this.options.shouldSubscribe?.({ query }) ?? true))
      this.subscribe();
  }

  protected variablesChanged(variables?: Variables<D, V>): void {
    this.cancel();
    if (this.canSubscribe({ variables }) && (this.options.shouldSubscribe?.({ variables }) ?? true))
      this.subscribe();
  }

  @bound public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>): void {
    this.initObservable(params);

    /* c8 ignore start */ // covered
    const shouldResubscribe = params?.shouldResubscribe ?? this.options.shouldResubscribe;
    if (this.observableSubscription && !shouldResubscribe) return;
    /* c8 ignore stop */

    this.loading = true;
    this[update]();

    this.observableSubscription =
      this.observable?.subscribe({
        next: this.nextData.bind(this),
        error: this.nextError.bind(this),
        complete: this.onComplete.bind(this),
      });
  }

  @bound public cancel(): void {
    this.endSubscription();
    this.observableSubscription = undefined;
    this.observable = undefined;
  }
}
