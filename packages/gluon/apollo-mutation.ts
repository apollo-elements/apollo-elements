import type {
  Constructor,
  Data,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/core/types';

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
export class ApolloMutation<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<D, V> {
  /** @summary Latest mutation data. */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  declare variables: Variables<D, V> | null;
}
