import type {
  ApolloMutationInterface,
  Constructor,
  RefetchQueriesType,
} from '@apollo-elements/interfaces';

import type { OperationVariables } from '@apollo/client/core';

import { ComplexAttributeConverter, property } from 'lit-element';

import { splitCommasAndTrim } from '@apollo-elements/lib/helpers';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

import { ApolloElement } from './apollo-element';

const refetchQueriesConverter: ComplexAttributeConverter = {
  fromAttribute: splitCommasAndTrim,
};

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 *
 * See [`ApolloMutationInterface`](https://apolloelements.dev/api/interfaces/mutation) for more information on events
 *
 */
export class ApolloMutation<D, V = OperationVariables>
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<D, V>
  implements ApolloMutationInterface<D, V> {
  @property({ type: Boolean }) called = false;

  /**
   * As an attribute, can be a string of comma-separated query names
   * ```html
   * <mutation-element refetch-queries="QueryA, QueryB,QueryC"></mutation-element>
   * ```
   * As a property, you can pass any legal `refetchQueries` value.
   */
  @property({ attribute: 'refetch-queries', converter: refetchQueriesConverter })
  refetchQueries: RefetchQueriesType<D> | null = null;
}
