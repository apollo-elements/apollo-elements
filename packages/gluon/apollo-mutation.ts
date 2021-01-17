import type { OperationVariables } from '@apollo/client/core';
import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { ApolloMutationInterface, Constructor, Data, Variables } from '@apollo-elements/interfaces';
import { defineObservedProperties } from './helpers/descriptor';

export { html } from '@gluon/gluon';

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 *
 * See [`ApolloMutationInterface`](https://apolloelements.dev/api/interfaces/mutation) for more information on events
 *
 * @element
 */
export class ApolloMutation<D, V = OperationVariables>
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<D, V>
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
}

defineObservedProperties(ApolloMutation, {
  called: false,
});
