import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '../mixins/apollo-mutation-mixin';
import { Constructor, ApolloMutationInterface } from '@apollo-elements/interfaces';

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 */
export class ApolloMutation<TData, TVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloMutationInterface<TData, TVariables> {
  protected __called = false;
}


Object.defineProperty(ApolloMutation.prototype, 'called', {
  get(this: ApolloMutation<unknown, unknown>): boolean {
    return this.__called;
  },

  set(this: ApolloMutation<unknown, unknown>, called: boolean) {
    this.__called = called;
    this.render();
  },
});
