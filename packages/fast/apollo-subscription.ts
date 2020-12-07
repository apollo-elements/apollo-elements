import type { OperationVariables } from '@apollo/client/core';
import { ApolloElement } from './apollo-element';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
import { ApolloSubscriptionInterface, Constructor } from '@apollo-elements/interfaces';

/**
 * `ApolloSubscription`
 *
 * 🚀 Custom element base class that updates with an Apollo GraphQL subscription.
 *
 * @element
 *
 * See [[`ApolloSubscriptionInterface`]] for more information on events
 *
 */
export class ApolloSubscription<D = unknown, V = OperationVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloSubscriptionMixin(ApolloElement as Constructor<ApolloElement<any, any>>)<D, V>
  implements ApolloSubscriptionInterface<D, V> { }
