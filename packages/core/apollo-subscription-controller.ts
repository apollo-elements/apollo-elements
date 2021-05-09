import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type {
  ComponentDocument,
  Data,
  MaybeTDN,
  MaybeVariables,
  SubscriptionDataOptions,
  Variables,
} from '@apollo-elements/interfaces';

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
} from '@apollo/client/core';

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

export class ApolloSubscriptionController<D extends MaybeTDN = any, V = MaybeVariables<D>>
  extends ApolloController<D, V>
  implements ReactiveController {
  private observable?: Observable<FetchResult<Data<D>>>;

  private observableSubscription?: ZenObservable.Subscription;

  declare options: ApolloSubscriptionControllerOptions<D, V>;

  get subscription(): ComponentDocument<D> | null { return this.document; }

  set subscription(document: ComponentDocument<D> | null) { this.document = document; }

  constructor(
    host: ReactiveControllerHost,
    subscription?: ComponentDocument<D> | null,
    options?: ApolloSubscriptionControllerOptions<D, V>
  ) {
    super(host, options);
    this.init(subscription ?? null);
  }

  hostConnected(): void {
    this.documentChanged(this.subscription ?? null);
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
      !this.options.noAutoSubscribe &&
      !!this.client &&
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

    this.observable = client.subscribe({
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      query: this.subscription! as DocumentNode,
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const client = this.client!;
    const loading = false;
    const subscriptionData = { data, loading, error: null };
    const detail = { client, subscriptionData };
    this.data = data;
    this.error = null;
    this.errors = errors;
    this.loading = loading;
    this.options.onData?.(detail);
    this[update]({ data, error: undefined, errors, loading });
  }

  /**
   * Sets `error` and `loading` on the instance when the subscription errors.
   */
  private nextError(error: ApolloError) {
    this.error = error;
    this.loading = false;
    this.options.onError?.(error); /* c8 ignore next */ // covered
    this[update]({ error: this.error, loading: this.loading });
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

  protected documentChanged(document?: ComponentDocument<D> | null): void {
    this.cancel();
    const query = document ?? undefined;
    if (this.canSubscribe({ query }) && (this.options.shouldSubscribe?.({ query }) ?? true))
      this.subscribe();
  }

  protected variablesChanged(variables?: Variables<D, V>): void {
    this.cancel();
    if (this.canSubscribe({ variables }) && (this.options.shouldSubscribe?.({ variables }) ?? true))
      this.subscribe();
  }

  /** Flags an element that's ready and able to auto-subscribe */
  public get canAutoSubscribe(): boolean {
    return (
      !!this.client &&
      !this.options.noAutoSubscribe &&
      (this.options?.shouldSubscribe?.() ?? true)
    );
  }

  @bound public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>): void {
    this.initObservable(params);

    /* c8 ignore start */ // covered
    const shouldResubscribe = params?.shouldResubscribe ?? this.options.shouldResubscribe;
    if (this.observableSubscription && !shouldResubscribe) return;
    /* c8 ignore stop */

    this.loading = true;
    this[update]({ loading: this.loading });

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
