import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '../mixins/apollo-mutation-mixin';
import { Constructor, ApolloMutationInterface } from '@apollo-elements/interfaces';
import { defineObservedProperties } from './helpers/descriptor';

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 */
export class ApolloMutation<TData, TVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloMutationInterface<TData, TVariables> { }

defineObservedProperties(ApolloMutation, {
  called: false,
});
