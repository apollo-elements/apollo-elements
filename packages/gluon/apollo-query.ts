import type { NetworkStatus } from 'apollo-client';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { ApolloElement } from './apollo-element';
export { html } from './apollo-element';

/**
 * # ApolloQuery
 *
 * 🚀 A custom element base class that connects to your Apollo cache.
 *
 * ## Usage
 *
 * ```js
 * import { client } from './apollo-client';
 * import { ApolloQuery, html } from '@apollo-elements/gluon';
 * import query from './connected-element.graphql';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class ConnectedElement extends ApolloQuery {
 *   client = client;
 *   query = query;
 *   get template() {
 *     const { data, error, loading, networkStatus } = this;
 *     return (
 *         loading ? html`<such-overlay-very-spin></such-overlay-very-spin>`
 *       : error ? errorTemplate(error)
 *       : html`<p>${data.helloWorld.greeting}, ${data.helloWorld.name}</p>`
 *     );
 *   }
 * };
 *
 * customElements.define('connected-element', ConnectedElement)
 * ```
 */
export class ApolloQuery<
  TData,
  TVariables
> extends ApolloQueryMixin(ApolloElement)<TData, TVariables> {
  /**
   * `networkStatus` is useful if you want to display a different loading indicator (or no indicator at all)
   * depending on your network status as it provides a more detailed view into the state of a network request
   * on your component than `loading` does. `networkStatus` is an enum with different number values between 1 and 8.
   * These number values each represent a different network state.
   *
   * 1. `loading`: The query has never been run before and the request is now pending. A query will still have this network status even if a result was returned from the cache, but a query was dispatched anyway.
   * 2. `setVariables`: If a query’s variables change and a network request was fired then the network status will be setVariables until the result of that query comes back. React users will see this when options.variables changes on their queries.
   * 3. `fetchMore`: Indicates that fetchMore was called on this query and that the network request created is currently in flight.
   * 4. `refetch`: It means that refetch was called on a query and the refetch request is currently in flight.
   * 5. Unused.
   * 6. `poll`: Indicates that a polling query is currently in flight. So for example if you are polling a query every 10 seconds then the network status will switch to poll every 10 seconds whenever a poll request has been sent but not resolved.
   * 7. `ready`: No request is in flight for this query, and no errors happened. Everything is OK.
   * 8. `error`: No request is in flight for this query, but one or more errors were detected.
   *
   * If the network status is less then 7 then it is equivalent to `loading` being true. In fact you could
   * replace all of your `loading` checks with `networkStatus < 7` and you would not see a difference.
   * It is recommended that you use `loading`, however.
   */
  get networkStatus(): NetworkStatus { return this.#networkStatus; }

  set networkStatus(networkStatus: NetworkStatus) {
    this.#networkStatus = networkStatus;
    // @ts-expect-error
    this.render();
  }

  #networkStatus: NetworkStatus;
}
