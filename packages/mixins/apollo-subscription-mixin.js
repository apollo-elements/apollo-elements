import isFunction from 'crocks/predicates/isFunction';
import hasAllVariables from '@apollo-elements/lib/has-all-variables.js';
import { stripUndefinedValues } from '@apollo-elements/lib/helpers.js';
import { ApolloElementMixin } from './apollo-element-mixin.js';

/** @typedef {import('apollo-client').FetchPolicy} FetchPolicy */
/** @typedef {import('apollo-client').ApolloError} ApolloError */
/** @typedef {import('apollo-client').SubscriptionOptions} SubscriptionOptions */
/** @typedef {import('graphql').DocumentNode} DocumentNode */
/** @typedef {import('zen-observable')} Observable */

/**
 * @typedef {Object} SubscriptionResult
 * @template {Object} TData
 * @property {Boolean} loading whether the subscription is loading
 * @property {TData} data subscription data
 * @property {ApolloError} error subscription error
 */

/**
 * `ApolloSubscriptionMixin`: class mixin for apollo-subscription elements.
 *
 * @polymer
 * @mixinFunction
 * @appliesMixin ApolloElementMixin
 *
 * @param {*} superclass the class to mix in to
 * @return {ApolloSubscriptionMixin~mixin} the mixed class
 */
export const ApolloSubscriptionMixin = superclass =>
  /**
   * Class mixin for apollo-subscription elements
   * @mixin
   * @template TVariables
   * @template TData
   * @alias ApolloSubscriptionMixin~mixin
   */
  class extends ApolloElementMixin(superclass) {
    /**
     * A GraphQL document containing a single subscription.
     *
     * @return {DocumentNode}
     */
    get subscription() {
      return this.document;
    }

    set subscription(subscription) {
      try {
        this.document = subscription;
      } catch (error) {
        throw new TypeError('Subscription must be a gql-parsed DocumentNode');
      }
      if (subscription && !this.observable) this.subscribe();
    }

    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
     *
     * @return {TVariables}
     */
    get variables() {
      return this.__variables;
    }

    set variables(variables) {
      this.__variables = variables;
      if (!this.observable) this.subscribe();
    }

    constructor() {
      super();
      this.nextData = this.nextData.bind(this);
      this.nextError = this.nextError.bind(this);

      /**
       * Specifies the FetchPolicy to be used for this subscription.
       * @type {FetchPolicy}
       */
      this.fetchPolicy;

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
       * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
       * @type {Boolean}
       */
      this.tryFetch = undefined;

      /**
       * Observable watching this element's subscription.
       * @type {Observable}
       */
      this.observable;
    }

    /** @protected */
    connectedCallback() {
      super.connectedCallback && super.connectedCallback();
      this.subscribe();
    }

    /**
     * Resets the observable and subscribes.
     *
     * @param  {SubscriptionOptions} options
     * @return {Promise<Observer<SubscriptionResult<TData>>>}
     */
    async subscribe({
      fetchPolicy = this.fetchPolicy,
      query = this.subscription,
      variables = this.variables,
    } = {}) {
      if (!hasAllVariables({ query, variables })) return;
      this.observable = this.client.subscribe(
        stripUndefinedValues({ query, variables, fetchPolicy })
      );
      return this.observable.subscribe({
        next: this.nextData,
        error: this.nextError,
      });
    }

    /**
     * Updates the element with the result of a subscription.
     *
     * @param  {SubscriptionResult<TData>} result The result of the subscription.
     * @protected
     */
    nextData({ data }) {
      const { client, onSubscriptionData } = this;
      const subscriptionData = { data };
      if (isFunction(onSubscriptionData)) onSubscriptionData({ client, subscriptionData });
      this.data = data;
      this.loading = false;
      this.error = undefined;
    }

    /**
     * Updates the element with the error when the subscription fails.
     *
     * @param  {ApolloError} error
     * @protected
     */
    nextError(error) {
      this.error = error;
      this.loading = false;
    }
  };
