import type { MutationOptions } from '@apollo/client/core';

import { ComplexAttributeConverter, property } from 'lit-element';

import { splitCommasAndTrim } from '@apollo-elements/lib/helpers';
import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { ApolloMutationInterface, Constructor } from '@apollo-elements/interfaces';

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
export class ApolloMutation<TData, TVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloMutationInterface<TData, TVariables> {
  @property({ type: Boolean }) called = false;

  /**
   * As an attribute, can be a string of comma-separated query names
   * ```html
   * <mutation-element refetch-queries="QueryA, QueryB,QueryC"></mutation-element>
   * ```
   * As a property, you can pass any legal `refetchQueries` value.
   */
  @property({ attribute: 'refetch-queries', converter: refetchQueriesConverter })
  refetchQueries: MutationOptions<TData, TVariables>['refetchQueries'] | null = null;
}
