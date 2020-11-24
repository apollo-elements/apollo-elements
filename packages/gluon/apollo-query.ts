import type { Constructor, ApolloQueryInterface } from '@apollo-elements/interfaces';

import { NetworkStatus, OperationVariables } from '@apollo/client/core';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { ApolloElement } from './apollo-element';
import { defineObservedProperties } from './helpers/descriptor';

export { html } from '@gluon/gluon';

/**
 * 🚀 `ApolloQuery`
 *
 * Custom element base class that connects to your Apollo cache.
 *
 * See [[`ApolloQueryInterface`]] for more information on events
 *
 * @element
 */
export class ApolloQuery<D = unknown, V = OperationVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement<any, any>>)<D, V>
  implements ApolloQueryInterface<D, V> { }

defineObservedProperties(ApolloQuery, {
  networkStatus: NetworkStatus.ready,
});
