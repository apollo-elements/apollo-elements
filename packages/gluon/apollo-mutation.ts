import type * as I from '@apollo-elements/interfaces';

import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

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
export class ApolloMutation<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloMutationMixin(ApolloElement as I.Constructor<ApolloElement>)<D, V> {
  /**
   * Latest mutation data.
   */
  declare data: I.Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  declare variables: I.Variables<D, V> | null;
}
