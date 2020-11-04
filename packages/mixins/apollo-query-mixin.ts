import type { Constructor, ApolloQueryInterface } from '@apollo-elements/interfaces';
import type { DocumentNode } from 'graphql/language/ast';

import type {
  ErrorPolicy,
  FetchPolicy,
  ObservableQuery,
  ApolloQueryResult,
  FetchMoreOptions,
  SubscriptionOptions,
  SubscribeToMoreOptions,
  QueryOptions,
  FetchMoreQueryOptions,
  WatchQueryOptions,
  ApolloError,
} from '@apollo/client/core';

import { NetworkStatus } from '@apollo/client/core';

import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { stripUndefinedValues } from '@apollo-elements/lib/helpers';

import { ApolloElementMixin } from './apollo-element-mixin';

const pickExecuteQueryOpts =
  <TVariables>(opts: QueryOptions<TVariables>): QueryOptions<TVariables> =>
    stripUndefinedValues({
      context: opts.context,
      errorPolicy: opts.errorPolicy,
      fetchPolicy: opts.fetchPolicy,
      query: opts.query,
      variables: opts.variables,
    });

const pickWatchQueryOpts =
  (opts: WatchQueryOptions): WatchQueryOptions =>
    stripUndefinedValues({
      context: opts.context,
      errorPolicy: opts.errorPolicy,
      fetchPolicy: opts.fetchPolicy,
      nextFetchPolicy: opts.nextFetchPolicy,
      notifyOnNetworkStatusChange: opts.notifyOnNetworkStatusChange,
      partialRefetch: opts.partialRefetch,
      pollInterval: opts.pollInterval,
      query: opts.query,
      returnPartialData: opts.returnPartialData,
      variables: opts.variables,
    });

function ApolloQueryMixinImpl<B extends Constructor>(superclass: B) {
  class ApolloQueryElement<TData, TVariables>
    extends ApolloElementMixin(superclass)<TData, TVariables>
    implements ApolloQueryInterface<TData, TVariables> {
    static documentType = 'query';

    declare data: TData;

    declare query: DocumentNode;

    declare variables: TVariables;

    declare fetchPolicy: FetchPolicy;

    declare partial: boolean;

    declare partialRefetch: boolean;

    declare returnPartialData: boolean;

    declare nextFetchPolicy: FetchPolicy;

    declare networkStatus: NetworkStatus;

    declare observableQuery: ObservableQuery;

    declare options: Partial<WatchQueryOptions>;

    declare noAutoSubscribe: boolean;

    declare notifyOnNetworkStatusChange: boolean;

    declare pollInterval: number;

    onData?(_result: ApolloQueryResult<TData>): void

    onError?(_error: Error): void

    errorPolicy: ErrorPolicy = 'none';

    /** @private */
    __options: Partial<WatchQueryOptions> = null;

    /** @private */
    __networkStatus = NetworkStatus.ready;

    /** @protected */
    connectedCallback(): void {
      super.connectedCallback();
      this.documentChanged(this.query);
    }

    documentChanged(query: DocumentNode): void {
      if (this.canSubscribe({ query }) && this.shouldSubscribe({ query }))
        this.subscribe({ query });
    }

    variablesChanged(variables: TVariables): void {
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
    refetch(variables: TVariables): Promise<ApolloQueryResult<TData>> {
      return this.observableQuery?.refetch(variables);
    }

    /**
     * Determines whether the element is able to automatically subscribe
     * @protected
     */
    canSubscribe(options?: Partial<SubscriptionOptions>): boolean {
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
    shouldSubscribe(options?: Partial<SubscriptionOptions>): boolean {
      return (void options, true);
    }

    /**
     * Resets the observableQuery and subscribes.
     */
    subscribe(params?: Partial<SubscriptionOptions>): ZenObservable.Subscription {
      const options: SubscriptionOptions = {
        context: params?.context ?? this.context,
        fetchPolicy: params?.fetchPolicy ?? this.fetchPolicy,
        query: params?.query ?? this.query,
        variables: params?.variables ?? this.variables,
      };

      if (this.observableQuery)
        this.observableQuery.stopPolling();

      this.observableQuery =
        this.watchQuery(options);

      this.loading = true;

      return this.observableQuery.subscribe({
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
    subscribeToMore(options: SubscribeToMoreOptions): () => void {
      return this.observableQuery?.subscribeToMore(options);
    }

    /**
     * Executes a Query once and updates the component with the result
     */
    async executeQuery(
      params?: Partial<QueryOptions<TVariables>>
    ): Promise<void | ApolloQueryResult<TData>> {
      const query = params?.query ?? this.query;
      const variables = params?.variables ?? this.variables;
      const options = { ...pickExecuteQueryOpts(this), ...params, query, variables };

      this.loading = true;

      try {
        const result = await this.client.query(options);
        this.nextData(result);
        return result;
      } catch (error) {
        this.nextError(error);
        throw error;
      }
    }

    /**
     * Exposes the `ObservableQuery#fetchMore` method.
     * https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.fetchMore
     *
     * The optional `updateQuery` parameter is a function that takes the previous query data,
     * then a `{ subscriptionData: TSubscriptionResult }` object,
     * and returns an object with updated query data based on the new results.
     *
     * The optional `variables` parameter is an optional new variables object.
     */
    fetchMore(
      params?: Partial<(
        FetchMoreQueryOptions<TVariables, keyof TVariables> &
        FetchMoreOptions<TData, TVariables>
    )>): Promise<ApolloQueryResult<TData>> {
      const options = {
        query: params?.query ?? this.query,
        updateQuery: params?.updateQuery,
        variables: params?.variables,
        context: params?.context ?? this.context,
      };

      this.loading = true;

      return this.observableQuery?.fetchMore(options);
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
    watchQuery(params?: Partial<WatchQueryOptions>): ObservableQuery {
      const options: WatchQueryOptions = {
        ...pickWatchQueryOpts(this),
        ...params,
        query: params?.query ?? this.query,
        variables: params?.variables ?? this.variables,
      };

      return this.client.watchQuery(options);
    }

    /**
     * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
     * @private
     */
    nextData(result?: ApolloQueryResult<TData>): void {
      this.data = result?.data ?? null;
      this.loading = result?.loading;
      this.networkStatus = result?.networkStatus;
      this.partial = result?.partial;
      if (result.error !== undefined)
        this.error = result?.error;
      if (result.errors !== undefined)
        this.errors = result?.errors ?? null;
      this.onData?.(result);
    }

    /**
     * Sets `error` and `loading` on the instance when the subscription errors.
     * @private
     */
    nextError(error: ApolloError): void {
      this.error = error;
      this.onError?.(error);
    }
  }

  Object.defineProperties(ApolloQueryElement.prototype, {
    networkStatus: {
      configurable: true,
      enumerable: true,

      get(this: ApolloQueryElement<unknown, unknown>) {
        return this.__networkStatus;
      },

      set(this: ApolloQueryElement<unknown, unknown>, value) {
        this.__networkStatus = value;
      },
    },

    query: {
      configurable: true,
      enumerable: true,

      get(this: ApolloQueryElement<unknown, unknown>) {
        return this.document;
      },

      set(this: ApolloQueryElement<unknown, unknown>, query) {
        this.document = query;
      },
    },

    options: {
      configurable: true,
      enumerable: true,

      get(this: ApolloQueryElement<unknown, unknown>): Partial<WatchQueryOptions> {
        return this.__options;
      },

      set(this: ApolloQueryElement<unknown, unknown>, options) {
        this.__options = options;
        this.observableQuery?.setOptions(options);
      },
    },

    noAutoSubscribe: {
      configurable: true,
      enumerable: true,

      get(this: ApolloQueryElement<unknown, unknown>): boolean {
        return this.hasAttribute('no-auto-subscribe');
      },

      set(v: boolean) {
        if (v)
          this.setAttribute('no-auto-subscribe', '');
        else
          this.removeAttribute('no-auto-subscribe');
      },
    },
  });

  return ApolloQueryElement;
}


/**
 * `ApolloQueryMixin`: class mixin for apollo-query elements.
 */
export const ApolloQueryMixin =
  dedupeMixin(ApolloQueryMixinImpl);
