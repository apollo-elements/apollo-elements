import type { Constructor, ApolloQueryInterface } from '@apollo-elements/interfaces';

import { NetworkStatus } from '@apollo/client/core';

import { ApolloQueryMixin } from '../mixins/apollo-query-mixin';
import { ApolloElement } from './apollo-element';
import { defineObservedProperties } from './helpers/descriptor';
export { html } from './apollo-element';

/**
 * 🚀 `ApolloQuery`
 *
 * Custom element base class that connects to your Apollo cache.
 */
export class ApolloQuery<TData, TVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloQueryInterface<TData, TVariables> { }

defineObservedProperties(ApolloQuery, {
  networkStatus: NetworkStatus.ready,
});
