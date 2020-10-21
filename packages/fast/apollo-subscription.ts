import { ApolloElement } from './apollo-element';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
import { ApolloSubscriptionInterface, Constructor } from '@apollo-elements/interfaces';

/**
 * `ApolloSubscription`
 *
 * 🚀 Custom element base class that updates with an Apollo GraphQL subscription.
 *
 */
export class ApolloSubscription<TData, TVariables>
  extends ApolloSubscriptionMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloSubscriptionInterface<TData, TVariables> {
}
