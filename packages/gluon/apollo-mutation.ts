import type { GluonElement } from '@gluon/gluon';

import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '../mixins/apollo-mutation-mixin';
import { Constructor, ApolloMutationInterface } from '@apollo-elements/interfaces';

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 */
export class ApolloMutation<TData, TVariables>
  extends ApolloMutationMixin(
    ApolloElement as Constructor<GluonElement & ApolloElement>
  )<TData, TVariables>
  implements ApolloMutationInterface<TData, TVariables> {
  #called: boolean;

  constructor() {
    super();
    type This = this;
    Object.defineProperty(this, 'called', {
      get(this: This): boolean {
        return this.#called;
      },

      set(this: This, called: boolean) {
        this.#called = called;
        this.render();
      },
    });
  }
}
