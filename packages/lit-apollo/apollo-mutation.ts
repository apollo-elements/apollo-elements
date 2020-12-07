import type {
  ApolloMutationInterface,
  Constructor,
  RefetchQueriesType,
  Variables,
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
 * See [[`ApolloMutationInterface`]] for more information on events
 *
 */
export class ApolloMutation<D, V = OperationVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement<any, any>>)<D, V>
  implements ApolloMutationInterface<D, V> {
  declare variables: Variables<D, V> | null;

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
