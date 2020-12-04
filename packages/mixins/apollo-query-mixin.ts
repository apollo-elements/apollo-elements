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

import { ApolloElementMixin } from './apollo-element-mixin';

import { booleanAttr, effect, gqlDocument, writable } from '@apollo-elements/lib/descriptors';

type ApolloQueryResultEvent<TData = unknown> =
  CustomEvent<ApolloQueryResult<TData>>;

declare global {
  interface HTMLElementEventMap {
    'apollo-query-result': ApolloQueryResultEvent;
  }
}

function ApolloQueryMixinImpl<B extends Constructor>(superclass: B) {
  class ApolloQueryElement<TData, TVariables>
    extends ApolloElementMixin(superclass)<TData, TVariables>
    implements ApolloQueryInterface<TData, TVariables> {
    static documentType = 'query';

    declare query: DocumentNode | null;

    declare fetchPolicy?: FetchPolicy;

    declare partial?: boolean;

    declare partialRefetch?: boolean;

    declare returnPartialData?: boolean;

    declare nextFetchPolicy?: FetchPolicy;

    declare networkStatus: NetworkStatus;

    declare observableQuery?: ObservableQuery<TData, TVariables>;

    declare options: Partial<WatchQueryOptions<TVariables, TData>> | null;

    declare noAutoSubscribe: boolean;

    declare notifyOnNetworkStatusChange: boolean;

    declare pollInterval?: number;

    onData?(_result: ApolloQueryResult<TData>): void

    onError?(_error: Error): void

    errorPolicy: ErrorPolicy = 'none';

    /** @private */
    __options: Partial<WatchQueryOptions> | null = null;

    /** @private */
    __networkStatus = NetworkStatus.ready;

    /** @protected */
    connectedCallback(): void {
      super.connectedCallback();
      this.documentChanged(this.query);
    }

    documentChanged(query: DocumentNode | null): void {
      if (!query) return; /* c8 ignore next */ // all covered
      if (this.canSubscribe({ query }) && this.shouldSubscribe({ query })) /* c8 ignore next */ // all covered
        this.subscribe({ query }); /* c8 ignore next */ // all covered
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
    refetch(variables: TVariables): Promise<ApolloQueryResult<TData>> | void {
      return this.observableQuery?.refetch(variables);
    }

    /**
     * Determines whether the element is able to automatically subscribe
     * @protected
     */
    canSubscribe(options?: Partial<SubscriptionOptions<TVariables, TData>>): boolean {
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
    shouldSubscribe(options?: Partial<SubscriptionOptions<TVariables, TData>>): boolean {
      return (void options, true);
    }

    /**
     * Resets the observableQuery and subscribes.
     */
    subscribe(
      params?: Partial<SubscriptionOptions<TVariables, TData>>
    ): ZenObservable.Subscription {
      const options: SubscriptionOptions<TVariables, TData> = {
        // It's better to let Apollo client throw this error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query: params?.query ?? this.query!,
        context: params?.context ?? this.context,
        fetchPolicy: params?.fetchPolicy ?? this.fetchPolicy,
        variables: params?.variables ?? this.variables ?? undefined,
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
    subscribeToMore(options: SubscribeToMoreOptions<TData, TVariables>): (() => void) | void {
      return this.observableQuery?.subscribeToMore(options);
    }

    /**
     * Executes a Query once and updates the component with the result
     */
    async executeQuery(
      params?: Partial<QueryOptions<TVariables>>
    ): Promise<ApolloQueryResult<TData>> {
      if (!this.client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/pages/guides/getting-started/apollo-client.html'); /* c8 ignore next */ // it's covered

      const { context, errorPolicy, fetchPolicy } = this;

      const options: QueryOptions<TVariables> = {
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
      const options: typeof params = {
        // It's better to let Apollo client throw this error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query: params?.query ?? this.query!,
        updateQuery: params?.updateQuery,
        variables: params?.variables ?? this.variables ?? undefined,
        context: params?.context ?? this.context,
      };

      this.loading = true;

      this.observableQuery ??= this.watchQuery(options);

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
      params?: Partial<WatchQueryOptions<TVariables, TData>>
    ): ObservableQuery<TData, TVariables> {
      if (!this.client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/pages/guides/getting-started/apollo-client.html'); /* c8 ignore next */ // it's covered

      const options: WatchQueryOptions<TVariables, TData> = {
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
    nextData(result: ApolloQueryResult<TData>): void {
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
      this.onError?.(error);
    }
  }

  Object.defineProperties(ApolloQueryElement.prototype, {
    query: gqlDocument(),
    networkStatus: writable(NetworkStatus.ready),
    noAutoSubscribe: booleanAttr('no-auto-subscribe'),
    options: effect<ApolloQueryElement<unknown, unknown>>({
      name: 'options',
      init: null,
      onSet(options: ApolloQueryElement<unknown, unknown>['options']) {
        if (!options) return;
        this.observableQuery?.setOptions(options);
      },
    }),
  });

  return ApolloQueryElement;
}


/**
 * `ApolloQueryMixin`: class mixin for apollo-query elements.
 */
export const ApolloQueryMixin =
  dedupeMixin(ApolloQueryMixinImpl);
