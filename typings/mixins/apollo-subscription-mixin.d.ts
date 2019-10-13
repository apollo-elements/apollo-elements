export function ApolloSubscriptionMixin(superclass: any): {
    new (): {
        new (...args: any[]): typeof import("./custom-element.js");
        /**
         * A GraphQL document containing a single subscription.
         *
         * @return {DocumentNode}
         */
        subscription: import("graphql").DocumentNode;
        document: import("graphql").DocumentNode;
        /**
         * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
         *
         * @return {TVariables}
         */
        variables: TVariables;
        __variables: TVariables;
        /**
         * Updates the element with the result of a subscription.
         *
         * @param  {SubscriptionResult<TData>} result The result of the subscription.
         * @protected
         */
        nextData({ data }: any): void;
        /**
         * Updates the element with the error when the subscription fails.
         *
         * @param  {ApolloError} error
         * @protected
         */
        nextError(error: import("apollo-client").ApolloError): void;
        /**
         * Specifies the FetchPolicy to be used for this subscription.
         * @type {FetchPolicy}
         */
        fetchPolicy: import("apollo-client").FetchPolicy;
        /**
         * Whether or not to fetch results.
         * @type {Boolean}
         */
        fetchResults: boolean;
        /**
         * The time interval (in milliseconds) on which this subscription should be refetched from the server.
         * @type {Number}
         */
        pollInterval: number;
        /**
         * Whether or not updates to the network status should trigger next on the observer of this subscription.
         * @type {Boolean}
         */
        notifyOnNetworkStatusChange: boolean;
        /**
         * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
         * @type {Boolean}
         */
        tryFetch: boolean;
        /**
         * Observable watching this element's subscription.
         * @type {import('zen-observable-ts').Observable<SubscriptionResult<TData>>}
         */
        observable: import("zen-observable-ts").default<any>;
        /**
         * @type {ApolloClient}
         */
        client: import("apollo-client").ApolloClient<any>;
        /** @protected */
        connectedCallback(): void;
        /**
         * Resets the observable and subscribes.
         *
         * @param  {SubscriptionOptions} [options={}]
         */
        subscribe({ fetchPolicy, query, variables, }?: import("apollo-client").SubscriptionOptions<import("apollo-client").OperationVariables>): Promise<import("zen-observable-ts").ZenObservable.Subscription>;
        data: any;
        loading: boolean;
        error: import("apollo-client").ApolloError;
    };
};
export type ApolloClient = import("apollo-client").ApolloClient<any>;
export type FetchPolicy = "no-cache" | "cache-first" | "network-only" | "cache-only" | "standby";
export type ApolloError = import("apollo-client").ApolloError;
export type SubscriptionOptions = import("apollo-client").SubscriptionOptions<import("apollo-client").OperationVariables>;
export type DocumentNode = import("graphql").DocumentNode;
export type Observable = import("zen-observable-ts").default<any>;
export type SubscriptionResult<TData_1 extends any> = any;
