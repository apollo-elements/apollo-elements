import { ApolloQueryInterface } from '@apollo-elements/interfaces';
import type { NetworkStatus } from '@apollo/client/core';

import { ApolloQueryMixin } from '../mixins/apollo-query-mixin';
import { Constructor } from '../mixins/constructor';
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
 * import { ApolloQuery, html } from '@apollo-elements/gluon';
 * import HelloQuery from './HelloWorld.query.graphql';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class ConnectedElement extends ApolloQuery {
 *   query = HelloQuery;
 *
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
export class ApolloQuery<TData, TVariables>
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloQueryInterface<TData, TVariables> {
  declare networkStatus: NetworkStatus;

  #networkStatus: NetworkStatus;

  constructor() {
    super();
    Object.defineProperties(this, {
      networkStatus: {
        get(this: ApolloQuery<TData, TVariables>): NetworkStatus {
          return this.#networkStatus;
        },

        set(this: ApolloQuery<TData, TVariables>, networkStatus: NetworkStatus) {
          this.#networkStatus = networkStatus;
          this.render();
        },
      },
    });
  }
}
