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
  DocumentNode,
  FetchPolicy,
  ApolloLink,
  Observable,
  OperationVariables,
} from '@apollo/client';

import type { Subscription } from 'rxjs';

import { ApolloController, ApolloControllerOptions } from './apollo-controller.js';

import { bound } from './lib/bound.js';

export interface ApolloSubscriptionControllerOptions<D, V = VariablesOf<D>>
          extends ApolloControllerOptions<D, V> {
  variables?: Variables<D, V>;
  fetchPolicy?: FetchPolicy;
  noAutoSubscribe?: boolean;
  shouldSubscribe?: (options?: Partial<ApolloClient.SubscribeOptions<Data<D>, Variables<D, V>>>) => boolean;
  shouldResubscribe?: boolean;
  skip?: boolean;
  onData?: (detail: {
    client: ApolloClient;
    subscriptionData: { data: Data<D> | null; loading: boolean; error: null; };
  }) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export class ApolloSubscriptionController<D = unknown, V extends OperationVariables = Variables<D, unknown>>
  extends ApolloController<D, V> implements ReactiveController {
  private observable?: Observable<ApolloLink.Result<Data<D>>>;

  private observableSubscription?: Subscription;

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
    this.init(subscription ?? null);
  }

  override hostConnected(): void {
    super.hostConnected();
    if (this.#hasDisconnected && this.observableSubscription)
      this.subscribe();
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
    options?: Partial<ApolloClient.SubscribeOptions<Data<D>, Variables<D, V>>>
  ): boolean {
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
    } = params ?? {};

    if (!client)
      throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/');

    if ((this.observable && !shouldResubscribe) || skip)
      return;

    const query = params?.subscription ?? this.subscription as DocumentNode;

    this.#lastSubscriptionDocument = query;
    this.observable = client.subscribe({
      // It's better to let Apollo client throw this error
      variables: this.variables ?? undefined,
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
  private nextData(result: ApolloLink.Result<Data<D>>) {
    const { data, error, errors, loading } = this;

    // In Apollo Client v4, subscription errors come through the error field (singular)
    if ((result as any).error) {
      this.nextError((result as any).error);
      return;
    }

    // Also check for GraphQL errors in the errors array
    if (result.errors && result.errors.length > 0) {
      this.nextError(result.errors[0] as any);
      return;
    }

    // If we got to this line without a client, it's because of user error
    const client = this.client!;
    const subscriptionData = { data: result?.data ?? null, loading: false, error: null };
    const detail = { client, subscriptionData };
    this.emitter.dispatchEvent(new CustomEvent('apollo-subscription-result', { detail }));
    this.data = result?.data ?? null;
    this.error = null;
    this.errors = result?.errors ? result.errors : [];
    this.loading = false;
    this.options.onData?.(detail);
    this.notify({ data, error, errors, loading });
  }

  /**
   * Sets `error` and `loading` on the instance when the subscription errors.
   */
  private nextError(apolloError: Error) {
    const { error, loading } = this;
    this.emitter.dispatchEvent(new CustomEvent('apollo-error', { detail: apolloError }));
    this.error = apolloError;
    this.loading = false;
    this.options.onError?.(apolloError);
    this.notify({ error, loading });
  }

  /**
   * Shuts down the subscription
   */
  private onComplete(): void {
    const { data, error, loading } = this;
    this.options.onComplete?.();
    this.endSubscription();
    this.notify({ data, error, loading });
  }

  private endSubscription() {
    if (this.observableSubscription)
      this.observableSubscription.unsubscribe();
  }

  private shouldSubscribe(opts?: Partial<ApolloClient.SubscribeOptions<Data<D>, Variables<D, V>>>): boolean {
    return this.options.shouldSubscribe?.(opts) ?? true;
  }

  protected override clientChanged(): void {
    if (this.canSubscribe() && this.shouldSubscribe())
      this.subscribe();
  }

  protected override documentChanged(doc?: ComponentDocument<D, V> | null): void {
    if (doc === this.#lastSubscriptionDocument)
      return;
    this.cancel();
    if (this.canSubscribe() && this.shouldSubscribe())
      this.subscribe();
  }

  protected override variablesChanged(variables?: Variables<D, V>): void {
    this.cancel();
    if (this.canSubscribe() && this.shouldSubscribe())
      this.subscribe();
  }

  /**
   * @summary Starts the subscription
   */
  @bound public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>): void {
    this.initObservable(params);

    const shouldResubscribe = params?.shouldResubscribe ?? this.options.shouldResubscribe;
    if (this.observableSubscription && !shouldResubscribe) return;

    const { loading } = this;
    this.loading = true;
    this.notify({ loading });

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
