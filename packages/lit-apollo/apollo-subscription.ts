import type { OperationVariables } from '@apollo/client/core';
import type { ApolloSubscriptionInterface, Data, Variables } from '@apollo-elements/interfaces';

import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';

import { ApolloElement } from './apollo-element';

/**
 * `ApolloSubscription`
 *
 * 🚀 Custom element base class that updates with an Apollo GraphQL subscription.
 *
 * See [`ApolloSubscriptionInterface`](https://apolloelements.dev/api/interfaces/subscription) for more information on events
 *
 */
export class ApolloSubscription<D = unknown, V = OperationVariables>
  extends ApolloSubscriptionMixin(ApolloElement)<D, V>
  implements ApolloSubscriptionInterface<D, V> {
  /**
   * Latest subscription data.
   */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the subscription GraphQL document to that variable's value.
   *
   * @summary Subscription variables.
   */
  declare variables: Variables<D, V> | null;
}
