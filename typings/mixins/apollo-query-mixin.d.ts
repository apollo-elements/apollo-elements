export function ApolloQueryMixin(superclass: any): {
    new <TBase extends import("./constructor.js").Constructor<typeof import("./custom-element.js")>, TCacheShape, TData, TVariables>(): {
        new (...args: any[]): typeof import("./custom-element.js");
        /**
         * A GraphQL document containing a single query.
         *
         * @return {DocumentNode}
         */
        query: import("graphql").DocumentNode;
        document: import("graphql").DocumentNode;
        /**
       * An object map from variable name to variable value, where the variables are used within the GraphQL query.
       *
       * @return {TVariables}
       */
        variables: TVariables;
        __variables: TVariables;
        /**
       * Exposes the [`ObservableQuery#setOptions`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setOptions) method.
       *
       * @return {ModifiableWatchQueryOptions} options [options](https://www.apollographql.com/docs/react/api/apollo-client.html#ModifiableWatchQueryOptions) object.
       */
        options: import("apollo-client/core/watchQueryOptions").ModifiableWatchQueryOptions<import("apollo-client").OperationVariables>;
        __options: import("apollo-client/core/watchQueryOptions").ModifiableWatchQueryOptions<import("apollo-client").OperationVariables>;
        /**
       * Updates the element with the result of a query.
       *
       * @param  {import('apollo-client').ApolloQueryResult<TData>} result The result of the query.
       * @protected
       */
        nextData({ data, loading, networkStatus, stale }: import("apollo-client").ApolloQueryResult<TData>): void;
        /**
       * Updates the element with the error when the query fails.
       *
       * @param  {Error} error
       * @protected
       */
        nextError(error: Error): void;
        /**
       * Specifies the ErrorPolicy to be used for this query.
       * @type {ErrorPolicy}
       */
        errorPolicy: import("apollo-client").ErrorPolicy;
        /**
       * Specifies the FetchPolicy to be used for this query.
       * @type {FetchPolicy}
       */
        fetchPolicy: import("apollo-client").FetchPolicy;
        /**
       * Whether or not to fetch results.
       * @type {Boolean}
       */
        fetchResults: boolean;
        /**
       * The time interval (in milliseconds) on which this query should be refetched from the server.
       * @type {Number}
       */
        pollInterval: number;
        /**
       * Whether or not updates to the network status should trigger next on the observer of this query.
       * @type {Boolean}
       */
        notifyOnNetworkStatusChange: boolean;
        /**
       * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
       * @type {Boolean}
       */
        tryFetch: boolean;
        /**
       * The apollo ObservableQuery watching this element's query.
       * @type {import('apollo-client').ObservableQuery<TData>}
       */
        observableQuery: import("apollo-client").ObservableQuery<TData, import("apollo-client").OperationVariables>;
        /**
       * @type {ApolloClient}
       */
        client: import("apollo-client").ApolloClient<any>;
        /** @protected */
        connectedCallback(): void;
        /**
         * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
         *
         * @param  {TVariables} variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
         * @return {Promise<import('apollo-client').ApolloQueryResult<TData>>}
         */
        refetch(variables: TVariables): Promise<import("apollo-client").ApolloQueryResult<TData>>;
        /**
       * Exposes the [`ObservableQuery#setVariables`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setVariables) method.
       *
       * @deprecated: This method on ObservableQuery is meant to be private. It will be removed.
       * @param {TVariables}   variables      The new set of variables. If there are missing variables, the previous values of those variables will be used.
       * @param {boolean} [tryFetch=this.tryFetch]       Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
       * @param {boolean} [fetchResults=this.fetchResults]   Option to ignore fetching results when updating variables.
       * @return {Promise<void | import('apollo-client').ApolloQueryResult<TData>>}
       */
        setVariables(variables: TVariables, tryFetch?: boolean, fetchResults?: boolean): Promise<void | import("apollo-client").ApolloQueryResult<TData>>;
        /** @typedef {ZenObservable.ObservableLike<import('apollo-client').ApolloQueryResult<TData>>} QueryResultObservable */
        /**
       * Resets the observableQuery and subscribes.
       *
       * @param  {import('apollo-client').SubscriptionOptions<TVariables>} [params={}]
       */
        subscribe({ query, variables, }?: import("apollo-client").SubscriptionOptions<TVariables>): Promise<import("zen-observable-ts").ZenObservable.Subscription>;
        /**
       * Lets you pass a GraphQL subscription and updateQuery function
       * to subscribe to more updates for your query.
       *
       * The `updateQuery` parameter is a function that takes the previous query data,
       * then a `{ subscriptionData: TSubscriptionResult }` object,
       * and returns an object with updated query data based on the new results.
       *
       * @param  {SubscribeToMoreOptions} options
       * @return {() => void}
       */
        subscribeToMore(options: import("apollo-client").SubscribeToMoreOptions<any, import("apollo-client").OperationVariables, any>): () => void;
        /**
       * Executes a Query once and updates the component with the result
       *
       * @param {QueryOptions} [options=this]
       * @return {Promise<import('apollo-client').ApolloQueryResult<TData>>}
       */
        executeQuery({ query, variables, ...options }?: import("apollo-client").QueryOptions<import("apollo-client").OperationVariables>): Promise<import("apollo-client").ApolloQueryResult<TData>>;
        /** @typedef {import('apollo-client').ApolloQueryResult<TData>} FetchMoreResult */
        /**
       * Exposes the `ObservableQuery#fetchMore` method.
       * https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.fetchMore
       *
       * The optional `updateQuery` parameter is a function that takes the previous query data,
       * then a `{ subscriptionData: TSubscriptionResult }` object,
       * and returns an object with updated query data based on the new results.
       *
       * The optional `variables` parameter is an optional new variables object.
       *
       * @param  {FetchMoreQueryOptions & FetchMoreOptions} [params={}]
       * @return {Promise<FetchMoreResult>}
       */
        fetchMore({ query, updateQuery, variables, }?: import("apollo-client").FetchMoreQueryOptions<any, any> & import("apollo-client").FetchMoreOptions<any, import("apollo-client").OperationVariables>): Promise<import("apollo-client").ApolloQueryResult<TData>>;
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
       *
       * @param  {WatchQueryOptions}       [options=this]
       *
       * @return {import('apollo-client').ObservableQuery<TData, TVariables>}
       * @protected
       */
        watchQuery({ query, variables, ...options }?: import("apollo-client").WatchQueryOptions<import("apollo-client").OperationVariables>): import("apollo-client").ObservableQuery<TData, TVariables>;
        data: TData;
        loading: boolean;
        networkStatus: import("apollo-client").NetworkStatus;
        stale: boolean;
        error: Error;
        /**
         * @param {TData} data
         * @abstract
         */
        onCompleted(data: TData): void;
        /**
         * @param {Error} error
         * @abstract
         */
        onError(error: Error): void;
    };
};
export type ApolloClient = import("apollo-client").ApolloClient<any>;
export type ApolloError = import("apollo-client").ApolloError;
export type ErrorPolicy = "all" | "none" | "ignore";
export type FetchMoreQueryOptions = import("apollo-client").FetchMoreQueryOptions<any, any>;
export type FetchMoreOptions = import("apollo-client").FetchMoreOptions<any, import("apollo-client").OperationVariables>;
export type FetchPolicy = "no-cache" | "cache-first" | "network-only" | "cache-only" | "standby";
export type QueryOptions = import("apollo-client").QueryOptions<import("apollo-client").OperationVariables>;
export type SubscribeToMoreOptions = {
    document: import("graphql").DocumentNode; /**
     * Class mixin for apollo-query elements
     * @template {import('./constructor').Constructor<import('./custom-element')>} TBase
     * @template TCacheShape
     * @template TData
     * @template TVariables
     * @inheritdoc
     * @param {TBase} superclass
     * @return {import('./return-constructor').ReturnConstructor<TBase & import('./apollo-query')<TData, TVariables>}
     */
    variables?: import("apollo-client").OperationVariables;
    updateQuery?: import("apollo-client/core/watchQueryOptions").UpdateQueryFn<any, import("apollo-client").OperationVariables, any>;
    onError?: (error: Error) => void;
};
export type WatchQueryOptions = import("apollo-client").WatchQueryOptions<import("apollo-client").OperationVariables>;
export type ModifiableWatchQueryOptions = import("apollo-client/core/watchQueryOptions").ModifiableWatchQueryOptions<import("apollo-client").OperationVariables>;
export type DocumentNode = import("graphql").DocumentNode;
export type ZenObservable = typeof import("zen-observable-ts");
