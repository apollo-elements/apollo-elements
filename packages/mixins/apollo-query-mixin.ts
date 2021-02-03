import type {
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  FetchPolicy,
  ObservableQuery,
  OperationVariables,
  QueryOptions,
  SubscribeToMoreOptions,
  SubscriptionOptions,
  WatchQueryOptions,
} from '@apollo/client/core';

import type {
  ApolloQueryInterface,
  ComponentDocument,
  Constructor,
  Data,
  FetchMoreParams,
  RefetchQueriesType,
  Variables,
} from '@apollo-elements/interfaces';

import { NetworkStatus } from '@apollo/client/core';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { ApolloElementMixin } from './apollo-element-mixin';

import { booleanAttr, effect, gqlDocument, writable } from '@apollo-elements/lib/descriptors';

type ApolloQueryResultEvent<TData = unknown> =
  CustomEvent<ApolloQueryResult<TData>>;

declare global {
  interface HTMLElementEventMap {
    'apollo-query-result': ApolloQueryResultEvent;
  }
}

type MixinInstance = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new <D = unknown, V = Record<string, any>>(...a: any[]): ApolloQueryInterface<D, V>;
  documentType: 'query',
}

function ApolloQueryMixinImpl<B extends Constructor>(superclass: B): MixinInstance & B {
  class ApolloQueryElement<D = unknown, V = OperationVariables>
    extends ApolloElementMixin(superclass)
    implements Omit<ApolloQueryInterface<D, V>, 'shouldSubscribe'> {
    static documentType = 'query' as const;

    static get observedAttributes(): string[] {
      return [
        // exists on ApolloElement
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...super.observedAttributes!,
        'next-fetch-policy',
      ];
    }

    /**
     * The latest query data.
     */
    declare data: Data<D> | null;

    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL query.
     *
     * Setting variables will initiate the query, unless [`noAutoSubscribe`](#noautosubscribe) is also set.
     *
     * @summary Query variables.
     */
    declare variables: Variables<D, V> | null;

    declare query: DocumentNode | ComponentDocument<D> | null;

    declare fetchPolicy?: FetchPolicy;

    declare partial?: boolean;

    declare partialRefetch?: boolean;

    declare refetchQueries: RefetchQueriesType<D> | null;

    declare returnPartialData?: boolean;

    declare nextFetchPolicy?: FetchPolicy;

    declare networkStatus: NetworkStatus;

    declare observableQuery?: ObservableQuery<Data<D>, Variables<D, V>>;

    declare options: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>> | null;

    declare noAutoSubscribe: boolean;

    declare notifyOnNetworkStatusChange: boolean;

    declare pollInterval?: number;

    onData?(_result: ApolloQueryResult<Data<D>>): void

    onError?(_error: Error): void

    /** @private */
    __options: Partial<WatchQueryOptions> | null = null;

    /** @private */
    __networkStatus = NetworkStatus.ready;

    public get canAutoSubscribe() {
      return (
        !!this.client &&
        !this.noAutoSubscribe &&
        this.shouldSubscribe()
      );
    }

    constructor(...a: any[]) { super(...a); }

    attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
      super.attributeChangedCallback?.(name, oldVal, newVal);
      // @ts-expect-error: ts is not tracking the static side
      if (super.constructor?.observedAttributes?.includes?.(name))
        return;

      switch (name) {
        case 'next-fetch-policy':
          this.nextFetchPolicy = newVal as ApolloQueryElement<D, V>['nextFetchPolicy'];
          break;
      }
    }

    connectedCallback(): void {
      super.connectedCallback();
      this.documentChanged(this.query);
    }

    documentChanged(query: DocumentNode | ComponentDocument<D> | null): void {
      if (!query) return; /* c8 ignore next */ // all covered
      if (this.canSubscribe({ query }) && this.shouldSubscribe({ query })) /* c8 ignore next */ // all covered
        this.subscribe({ query }); /* c8 ignore next */ // all covered
    }

    variablesChanged(variables: Variables<D, V>): void {
      if (this.observableQuery)
        this.refetch(variables);
      else if (this.canSubscribe({ variables }) && this.shouldSubscribe({ variables }))
        this.subscribe({ variables });
      else
        return;
    }

    /**
     * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
     *
     * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
     */
    async refetch(variables: Variables<D, V>): Promise<ApolloQueryResult<Data<D>>> {
      if (!this.observableQuery)
        throw new Error('Cannot refetch without an ObservableQuery');
      return this.observableQuery.refetch(variables);
    }

    /**
     * Determines whether the element is able to automatically subscribe
     * @private
     */
    canSubscribe(options?: Partial<SubscriptionOptions<Variables<D, V> | null, Data<D>>>): boolean {
      /* c8 ignore next 4 */
      return (
        !this.noAutoSubscribe &&
        !!this.client &&
        !!(options?.query ?? this.document)
      );
    }

    /**
     * Determines whether the element should attempt to automatically subscribe i.e. begin querying
     *
     * Override to prevent subscribing unless your conditions are met.
     */
    shouldSubscribe(options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>): boolean {
      return (void options, true);
    }

    /**
     * Resets the observableQuery and subscribes.
     * @param params options for controlling how the subscription subscribes
     */
    subscribe(
      params?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>
    ): ZenObservable.Subscription {
      const options: SubscriptionOptions<Variables<D, V>, Data<D>> = {
        /* c8 ignore start */ // covered
        // It's better to let Apollo client throw this error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query: params?.query ?? this.query!,
        context: params?.context ?? this.context,
        errorPolicy: params?.errorPolicy ?? this.errorPolicy,
        fetchPolicy: params?.fetchPolicy ?? this.fetchPolicy,
        variables: params?.variables ?? this.variables ?? undefined,
        /* c8 ignore stop */
      };

      if (this.observableQuery)
        this.observableQuery.stopPolling(); /* c8 ignore next */ // covered

      this.observableQuery = this.watchQuery(options);

      this.loading = true;

      return this.observableQuery?.subscribe({
        next: this.nextData.bind(this),
        error: this.nextError.bind(this),
      });
    }

    /**
     * Lets you pass a GraphQL subscription and updateQuery function
     * to subscribe to more updates for your query.
     *
     * The `updateQuery` parameter is a function that takes the previous query data,
     * then a `{ subscriptionData: TSubscriptionResult }` object,
     * and returns an object with updated query data based on the new results.
     */
    subscribeToMore(
      options: SubscribeToMoreOptions<Data<D>, Variables<D, V>>
    ): (() => void) | void {
      return this.observableQuery?.subscribeToMore(options);
    }

    /**
     * Executes a Query once and updates the component with the result
     */
    async executeQuery(
      params?: Partial<QueryOptions<Variables<D, V>>>
    ): Promise<ApolloQueryResult<Data<D>>> {
      if (!this.client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/'); /* c8 ignore next */ // it's covered

      const { context, errorPolicy, fetchPolicy } = this;

      const options: QueryOptions<Variables<D, V>> = {
        context, errorPolicy, fetchPolicy,
        ...params,
        // It's better to let Apollo client throw this error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query: params?.query ?? this.query!,
        variables: params?.variables ?? this.variables ?? undefined,
      };

      this.loading = true;

      try {
        const result = await this.client.query(options);
        if (result) // NB: not sure why, but sometimes this returns undefined
          this.nextData(result);
        return result;
      } catch (error) {
        this.nextError(error);
        throw error;
      }
    }

    /**
     * Exposes the `ObservableQuery#fetchMore` method.
     * https://www.apollographql.com/docs/react/api/core/ObservableQuery/#ObservableQuery.fetchMore
     *
     * The optional `updateQuery` parameter is a function that takes the previous query data,
     * then a `{ subscriptionData: TSubscriptionResult }` object,
     * and returns an object with updated query data based on the new results.
     *
     * The optional `variables` parameter is an optional new variables object.
     */
    fetchMore(params?: Partial<FetchMoreParams<D, V>>): Promise<ApolloQueryResult<Data<D>>> {
      const options: typeof params = {
        // It's better to let Apollo client throw this error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query: params?.query ?? this.query!,
        updateQuery: params?.updateQuery,
        /* c8 ignore start */ // covered
        variables: params?.variables ?? this.variables ?? undefined,
        context: params?.context ?? this.context,
        /* c8 ignore stop */
      };

      this.loading = true;

      this.observableQuery ??=
        this.watchQuery(options as WatchQueryOptions<Variables<D, V>, Data<V>>);

      return this.observableQuery?.fetchMore(options).then(x => {
        this.loading = false;
        return x;
      });
    }

    /**
     * Creates an instance of ObservableQuery with the options provided by the element.
     * - `context` Context to be passed to link execution chain
     * - `errorPolicy` Specifies the ErrorPolicy to be used for this query
     * - `fetchPolicy` Specifies the FetchPolicy to be used for this query
     * - `fetchResults` Whether or not to fetch results
     * - `metadata` Arbitrary metadata stored in the store with this query. Designed for debugging, developer tools, etc.
     * - `notifyOnNetworkStatusChange` Whether or not updates to the network status should trigger next on the observer of this query
     * - `pollInterval` The time interval (in milliseconds) on which this query should be refetched from the server.
     * - `query` A GraphQL document that consists of a single query to be sent down to the server.
     * - `variables` A map going from variable name to variable value, where the variables are used within the GraphQL query.
     */
    watchQuery(
      params?: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>>
    ): ObservableQuery<Data<D>, Variables<D, V>> {
      if (!this.client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/'); /* c8 ignore next */ // it's covered

      const options: WatchQueryOptions<Variables<D, V>, Data<D>> = {
        context: this.context,
        errorPolicy: this.errorPolicy,
        fetchPolicy: this.fetchPolicy,
        notifyOnNetworkStatusChange: this.notifyOnNetworkStatusChange,
        partialRefetch: this.partialRefetch,
        pollInterval: this.pollInterval,
        returnPartialData: this.returnPartialData,
        nextFetchPolicy: this.nextFetchPolicy,
        ...params,
        // It's better to let Apollo client throw this error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query: params?.query ?? this.query!, /* c8 ignore next */ // it's covered
        variables: params?.variables ?? this.variables ?? undefined,
      };

      return this.client.watchQuery(options);
    }

    /**
     * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
     * @private
     */
    nextData(result: ApolloQueryResult<Data<D>>): void {
      this.dispatchEvent(new CustomEvent('apollo-query-result', { detail: result }));
      this.data = result.data;
      this.error = result.error ?? null;
      this.errors = result.errors ?? null;
      this.loading = result.loading;
      this.networkStatus = result.networkStatus;
      this.partial = result.partial;
      this.onData?.(result); /* c8 ignore next */ // it's covered
    }

    /**
     * Sets `error` and `loading` on the instance when the subscription errors.
     * @private
     */
    nextError(error: ApolloError): void {
      this.dispatchEvent(new CustomEvent('apollo-error', { detail: error }));
      this.error = error;
      this.loading = false;
      this.onError?.(error); /* c8 ignore next */ // covered
    }
  }

  Object.defineProperties(ApolloQueryElement.prototype, {
    query: gqlDocument(),
    networkStatus: writable(NetworkStatus.ready),
    noAutoSubscribe: booleanAttr('no-auto-subscribe'),
    /* eslint-disable @typescript-eslint/no-explicit-any */
    options: effect<ApolloQueryElement<any, any>>({
      name: 'options',
      init: null,
      onSet(options: ApolloQueryElement<any, any>['options']) {
        if (!options) return;
        this.observableQuery?.setOptions(options);
      },
    }),
    /* eslint-enable @typescript-eslint/no-explicit-any */
  });

  return ApolloQueryElement;
}


/**
 * `ApolloQueryMixin`: class mixin for apollo-query elements.
 */
export const ApolloQueryMixin =
  dedupeMixin(ApolloQueryMixinImpl);
