import { ApolloElementMixin } from './apollo-element-mixin.js';
import gqlFromInnerText from '../lib/gql-from-inner-text.js';
import hasAllVariables from '../lib/has-all-variables.js';
import isValidGql from '../lib/is-valid-gql.js';
import isFunction from 'crocks/predicates/isFunction';

const scriptSelector = 'script[type="application/graphql"]';

/**
 * `ApolloSubscriptionMixin`: class mixin for apollo-subscription elements.
 *
 * @mixinFunction
 * @appliesMixin ApolloElementMixin
 *
 * @param {class} superclass
 * @return {class}
 */
export const ApolloSubscriptionMixin = superclass => class extends ApolloElementMixin(superclass) {
  /**
   * A GraphQL document that consists of a single subscription.
   * @type {DocumentNode|null}
   */
  get subscription() {
    return this.__subscription || gqlFromInnerText(this.querySelector(scriptSelector));
  }

  set subscription(subscription) {
    this.__subscription = subscription;
    if (subscription == null) return;
    const valid = isValidGql(subscription);
    const variables = this.__variables;
    if (!valid) throw new Error('Subscription must be a gql-parsed document');
    this.subscribe({ query: subscription, variables });
  }

  /**
   * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
   * @type {Object}
   */
  get variables() {
    return this.__variables;
  }

  set variables(variables) {
    this.__variables = variables;
    const subscription = this.__subscription;
    this.observableQuery
      ? this.setVariables(variables)
      : this.subscribe({ query: subscription, variables });
  }

  constructor() {
    super();
    this.nextData = this.nextData.bind(this);
    this.nextError = this.nextError.bind(this);

    /**
     * Specifies the FetchPolicy to be used for this subscription.
     * @type {FetchPolicy}
     */
    this.fetchPolicy = 'cache-first';

    /**
     * Whether or not to fetch results.
     * @type {Boolean}
     */
    this.fetchResults = undefined;

    /**
     * The time interval (in milliseconds) on which this subscription should be refetched from the server.
     * @type {Number}
     */
    this.pollInterval = undefined;

    /**
     * Whether or not updates to the network status should trigger next on the observer of this subscription.
     * @type {Boolean}
     */
    this.notifyOnNetworkStatusChange = undefined;

    /**
     * Variables used in the subscription.
     * @type {Object}
     */
    this.variables = undefined;

    /**
     * Apollo Subscription Object.
     * e.g. gql`
     * subscription MySubscription {
     *   mySubscription {
     *     foo
     *   }
     * `
     * @type {DocumentNode}
     */
    this.subscription = undefined;

    /**
     * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
     * @type {Boolean}
     */
    this.tryFetch = undefined;

    /**
     * The apollo ObservableQuery watching this element's subscription.
     * @type {Observable}
     */
    this.observableQuery = undefined;
  }

  /**
   * Exposes the [`ObservableQuery#setOptions`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setOptions) method.
   * @param {ModifiableWatchQueryOptions} options [options](https://www.apollographql.com/docs/react/api/apollo-client.html#ModifiableWatchQueryOptions) object.
   * @return {Promise<ApolloQueryResult>}
   */
  setOptions(options) {
    return (
      this.observableQuery &&
      this.observableQuery.setOptions(options)
    );
  }

  /**
   * Exposes the [`ObservableQuery#setVariables`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setVariables) method.
   * @param {Object}  variables                        The new set of variables. If there are missing variables, the previous values of those variables will be used.
   * @return {Promise<ApolloQueryResult>}
   */
  setVariables(variables) {
    return (
      this.observableQuery &&
      this.observableQuery.setVariables(variables)
    );
  }

  /**
   * Resets the observableQuery and subscribes.
   * @param  {Object} options
   * @param  {FetchPolicy}                [options.fetchPolicy=this.fetchPolicy]
   * @param  {DocumentNode}               [options.query=this.subscription]
   * @param  {Object}                     [options.variables=this.variables]
   * @return {Observable.Subscription}
   */
  async subscribe({
    fetchPolicy = this.fetchPolicy,
    query = this.subscription,
    variables = this.variables,
  } = {}) {
    if (!hasAllVariables({ query, variables })) return;
    this.observableQuery = this.client.subscribe({ query, variables, fetchPolicy });
    return this.observableQuery.subscribe({
      next: this.nextData,
      error: this.nextError,
    });
  }

  /**
   * Updates the element with the result of a subscription.
   * @param  {ApolloQueryResult} result The result of the subscription.
   * @param  {Object}  result.data          The data from the subscription.
   * @param  {Boolean} result.loading       Whether the subscription is loading.
   * @protected
   */
  nextData({ data }) {
    const { client, onSubscriptionData } = this;
    if (isFunction(onSubscriptionData)) onSubscriptionData({ client, subscriptionData: { data } });
    this.data = data;
    this.loading = false;
    this.error = undefined;
  }

  /**
   * Updates the element with the error when the subscription fails.
   * @param  {Error} error
   * @protected
   */
  nextError(error) {
    this.error = error;
    this.loading = false;
  }
};
