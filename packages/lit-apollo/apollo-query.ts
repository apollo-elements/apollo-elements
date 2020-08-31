import type { NetworkStatus } from '@apollo/client/core';
import type { PropertyDeclarations } from 'lit-element';

import { ApolloElement } from './apollo-element';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { Constructor } from '@apollo-elements/mixins/constructor';

/**
 * # ApolloQuery
 *
 * 🚀 A custom element base class that connects to your Apollo cache.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * import { ApolloQuery, html } from 'lit-apollo';
 * import Query from './connected-element.graphql';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class ConnectedElement extends ApolloQuery {
 *   query = Query;
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
export abstract class ApolloQuery<TData, TVariables> extends
  ApolloQueryMixin(ApolloElement as unknown as Constructor<ApolloElement>)<TData, TVariables> {
  declare networkStatus: NetworkStatus;

  declare noAutoSubscribe: boolean;

  static get properties(): PropertyDeclarations {
    return {
      networkStatus: { type: Number },
      noAutoSubscribe: { type: Boolean, attribute: 'no-auto-subscribe' },
    };
  }

  /**
   * By default, will only render if
   *   - The component has `data` or
   *   - The component has an `error` or
   *   - The component is loading.
   */
  shouldUpdate(): boolean {
    const { data, error, loading } = this;
    return (!!data || !!error || loading);
  }
}
