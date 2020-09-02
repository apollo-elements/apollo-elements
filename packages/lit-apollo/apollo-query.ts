import type { NetworkStatus } from '@apollo/client/core';
import type { PropertyDeclarations } from 'lit-element';

import { ApolloElement } from './apollo-element';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { Constructor } from '@apollo-elements/interfaces';

/**
 * # ApolloQuery
 *
 * 🚀 A custom element base class that connects to your Apollo cache.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * import { ApolloQuery, html, customElement } from '@apollo-elements/lit-apollo';
 * import HelloQuery from './Hello.query.graphql';
 *
 *
 * @customElement('hello-element')
 * class ConnectedElement extends ApolloQuery {
 *   query = HelloQuery;
 *
 *   render() {
 *     return (
 *         this.loading ? html`
 *           <such-overlay-very-spin></such-overlay-very-spin>`
 *       : this.error ? html`
 *          <h1>😢 Such Sad, Very Error! 😰</h1>
 *          <strong>${this.error.message}</strong>`
 *       : html`
 *          <p>${this.data.helloWorld.greeting}, ${this.data.helloWorld.name}</p>`
 *     );
 *   }
 * };
 * ```
 */
export class ApolloQuery<TData, TVariables>
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables> {
  declare networkStatus: NetworkStatus;

  declare noAutoSubscribe: boolean;

  static get properties(): PropertyDeclarations {
    return {
      networkStatus: { type: Number },
      noAutoSubscribe: { type: Boolean, attribute: 'no-auto-subscribe' },
    };
  }
}
