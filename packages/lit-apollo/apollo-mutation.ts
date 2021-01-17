import type { OperationVariables } from '@apollo/client/core';

import type {
  ApolloMutationInterface,
  Data,
  RefetchQueriesType,
  Variables,
} from '@apollo-elements/interfaces';

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
  extends ApolloMutationMixin(ApolloElement)<D, V>
  implements ApolloMutationInterface<D, V> {
  /**
   * Latest mutation data.
   */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
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
