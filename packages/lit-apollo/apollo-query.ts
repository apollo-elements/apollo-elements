import { ApolloElement } from './apollo-element';
import type { NetworkStatus } from 'apollo-client';
import { property } from 'lit-element';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

/**
 * # ApolloQuery
 *
 * 🚀 A custom element base class that connects to your Apollo cache.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * import { client } from './apollo-client';
 * import { ApolloQuery, html } from 'lit-apollo';
 * import query from './connected-element.graphql';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class ConnectedElement extends ApolloQuery {
 *   client = client;
 *   query = query;
 *
 *   render() {
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
  TVariables,
> extends ApolloQueryMixin(ApolloElement)<TData, TVariables> {
  /**
   * Enum of network statuses. See https://bit.ly/2sfKLY0
   */
  @property({ type: Number }) networkStatus: NetworkStatus;

  /**
   * If the query should not subscribe until `subscribe` is explicitly called.
   */
  @property({ type: Boolean, attribute: 'no-auto-subscribe' }) noAutoSubscribe: boolean;

  /**
   * By default, will only render if
   *   - The component has `data` or
   *   - The component has an `error` or
   *   - The component has a `loading` status.
   */
  shouldUpdate(): boolean {
    return (
      !!this.data ||
      !!this.error ||
      this.loading != null
    );
  }
}
