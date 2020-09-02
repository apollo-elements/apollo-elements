import type { Constructor, ApolloQueryInterface } from '@apollo-elements/interfaces';
import type { GraphQLError } from 'graphql';
import type { GluonElement } from '@gluon/gluon';
import type { ApolloClient, NetworkStatus, NormalizedCacheObject } from '@apollo/client/core';

import { ApolloQueryMixin } from '../mixins/apollo-query-mixin';
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
  extends ApolloQueryMixin(
    ApolloElement as Constructor<GluonElement & ApolloElement>
  )<TData, TVariables>
  implements ApolloQueryInterface<TData, TVariables> {
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare error: Error;

  declare errors: readonly GraphQLError[];

  declare loading: boolean;

  declare networkStatus: NetworkStatus;

  #networkStatus: NetworkStatus;

  constructor() {
    super();
    type This = this;
    Object.defineProperties(this, {
      networkStatus: {
        get(this: This): NetworkStatus {
          return this.#networkStatus;
        },

        set(this: This, networkStatus: NetworkStatus) {
          this.#networkStatus = networkStatus;
          this.render();
        },
      },
    });
  }
}
