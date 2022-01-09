import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type {
  ComponentDocument,
  Data,
  SubscriptionDataOptions,
  Variables,
  VariablesOf,
} from '@apollo-elements/core/types';

import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  Observable,
  SubscriptionOptions,
  WatchQueryOptions,
  ObservableSubscription,
} from '@apollo/client/core';

import { ApolloController, ApolloControllerOptions } from './apollo-controller.js';

import { bound } from './lib/bound.js';

export interface ApolloSubscriptionControllerOptions<D, V = VariablesOf<D>>
          extends ApolloControllerOptions<D, V>,
          Partial<WatchQueryOptions<Variables<D, V>, Data<D>>> {
  variables?: Variables<D, V>;
  fetchPolicy?: FetchPolicy;
  noAutoSubscribe?: boolean;
  shouldSubscribe?: (options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>) => boolean;
  shouldResubscribe?: boolean;
  skip?: boolean;
  onData?: (detail: {
    client: ApolloClient<NormalizedCacheObject>;
    subscriptionData: { data: Data<D> | null; loading: boolean; error: null; };
  }) => void;
  onComplete?: () => void;
  onError?: (error: ApolloError) => void;
}

export class ApolloSubscriptionController<D = unknown, V = VariablesOf<D>>
  extends ApolloController<D, V> implements ReactiveController {
  private observable?: Observable<FetchResult<Data<D>>>;

  private observableSubscription?: ObservableSubscription;

  /** @summary Options to customize the subscription and to interface with the controller. */
  declare options: ApolloSubscriptionControllerOptions<D, V>;

  #hasDisconnected = false;

  #lastSubscriptionDocument?: DocumentNode;

  get subscription(): ComponentDocument<D, V> | null { return this.document; }

  set subscription(document: ComponentDocument<D, V> | null) { this.document = document; }

  /** Flags an element that's ready and able to auto-subscribe */
  public get canAutoSubscribe(): boolean {
    return (
      !!this.client &&
      !this.options.noAutoSubscribe &&
      this.shouldSubscribe()
    );
  }

  constructor(
    host: ReactiveControllerHost,
    subscription?: ComponentDocument<D, V> | null,
    options?: ApolloSubscriptionControllerOptions<D, V>
  ) {
    super(host, options);
    this.init(subscription ?? null);/* c8 ignore next */
  }

  override hostConnected(): void {
    super.hostConnected();
    /* c8 ignore start */ // covered
    if (this.#hasDisconnected && this.observableSubscription)
      this.subscribe(); /* c8 ignore stop */
    else
      this.documentChanged(this.subscription);
  }

  override hostDisconnected(): void {
    this.endSubscription();
    this.#hasDisconnected = true;
    super.hostDisconnected();
  }

  /**
   * Determines whether the element is able to automatically subscribe
   */
  private canSubscribe(
    options?: Partial<SubscriptionOptions<Variables<D, V> | null, Data<D>>>
  ): boolean {
    /* c8 ignore next 4 */
    return (
      !this.options.noAutoSubscribe &&
      !!this.client &&
      (!this.observable || !!this.options.shouldResubscribe) &&
      !!(options?.query ?? this.subscription)
    );
  }

  private initObservable(params?: Partial<SubscriptionDataOptions<D, V>>): void {
    const {
      shouldResubscribe = this.options.shouldResubscribe,
      client = this.client,
      skip = this.options.skip,
      ...rest
    } = params ?? {}; /* c8 ignore start */ // covered

    if (!client) /* c8 ignore start */ // covered
      throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/');

    if ((this.observable && !shouldResubscribe) || skip)
      return; /* c8 ignore stop */

    const query = params?.subscription ?? this.subscription as DocumentNode; /* c8 ignore next */

    this.#lastSubscriptionDocument = query;
    this.observable = client.subscribe({
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      variables: this.variables,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      ...rest,
      query,
    });
  }

  /**
   * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
   */
  private nextData(result: FetchResult<Data<D>>) {
    const { data = null, errors } = result;
    // If we got to this line without a client, it's because of user error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const client = this.client!;
    const loading = false;
    const subscriptionData = { data, loading, error: null };
    const detail = { client, subscriptionData };
    this.emitter.dispatchEvent(new CustomEvent('apollo-subscription-result', { detail }));
    this.data = data;
    this.error = null;
    this.errors = errors ?? [];
    this.loading = loading;
    this.options.onData?.(detail); /* c8 ignore next */ // covered
    this.notify('data', 'error', 'errors', 'loading');
  }

  /**
   * Sets `error` and `loading` on the instance when the subscription errors.
   */
  private nextError(error: ApolloError) {
    this.emitter.dispatchEvent(new CustomEvent('apollo-error', { detail: error }));
    this.error = error;
    this.loading = false;
    this.options.onError?.(error); /* c8 ignore next */ // covered
    this.notify('error', 'loading');
  }

  /**
   * Shuts down the subscription
   */
  private onComplete(): void {
    this.options.onComplete?.(); /* c8 ignore next */ // covered
    this.endSubscription();
    this.notify();
  }

  private endSubscription() {
    if (this.observableSubscription)
      this.observableSubscription.unsubscribe();
  }

  private shouldSubscribe(opts?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>): boolean {
    return this.options.shouldSubscribe?.(opts) ?? true; /* c8 ignore next */
  }

  protected override clientChanged(): void {
    if (this.canSubscribe() && this.shouldSubscribe())/* c8 ignore next */
      this.subscribe();/* c8 ignore next */
  }

  protected override documentChanged(doc?: ComponentDocument<D, V> | null): void {
    const query = doc ?? undefined;/* c8 ignore next */
    if (doc === this.#lastSubscriptionDocument)
      return;/* c8 ignore next */
    this.cancel();
    if (this.canSubscribe({ query }) && this.shouldSubscribe({ query })) /* c8 ignore next */
      this.subscribe();/* c8 ignore next */
  }

  protected override variablesChanged(variables?: Variables<D, V>): void {
    this.cancel();
    if (this.canSubscribe({ variables }) && this.shouldSubscribe({ variables }))/* c8 ignore next */
      this.subscribe();/* c8 ignore next */
  }

  /**
   * @summary Starts the subscription
   */
  @bound public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>): void {
    this.initObservable(params);

    /* c8 ignore start */ // covered
    const shouldResubscribe = params?.shouldResubscribe ?? this.options.shouldResubscribe;
    if (this.observableSubscription && !shouldResubscribe) return;
    /* c8 ignore stop */

    this.loading = true;
    this.notify('loading');

    this.observableSubscription =
      this.observable?.subscribe({
        next: this.nextData.bind(this),
        error: this.nextError.bind(this),
        complete: this.onComplete.bind(this),
      });
  }

  /**
   * @summary Ends the subscription
   */
  @bound public cancel(): void {
    this.endSubscription();
    this.observableSubscription = undefined;
    this.observable = undefined;
  }
}
