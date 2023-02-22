import type { Constructor, Data, Variables, VariablesOf } from '@apollo-elements/core/types';
import type { OperationVariables } from '@apollo/client/core';

import { ApolloElement } from './apollo-element.js';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

export { html } from '@gluon/gluon';

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 *
 * See [`ApolloMutationInterface`](https://apolloelements.dev/api/core/interfaces/mutation) for more information on events
 *
 * @element
 */
export class ApolloMutation<D = unknown, V extends OperationVariables = VariablesOf<D>>
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement<unknown>>)<D, V> {
  /** @summary Latest mutation data. */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  declare variables: Variables<D, V> | null;
}
