import type { OperationVariables } from '@apollo/client/core';
import type {
  ApolloSubscriptionInterface,
  Constructor,
  Data,
  Variables,
} from '@apollo-elements/interfaces';

import { ApolloElement } from './apollo-element';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';

import { attr } from '@microsoft/fast-element';

/**
 * `ApolloSubscription`
 *
 * 🚀 Custom element base class that updates with an Apollo GraphQL subscription.
 *
 * @element
 *
 * See [`ApolloSubscriptionInterface`](https://apolloelements.dev/api/interfaces/subscription) for more information on events
 *
 */
export class ApolloSubscription<D = unknown, V = OperationVariables>
  extends ApolloSubscriptionMixin(ApolloElement as Constructor<ApolloElement>)<D, V>
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

  @attr({
    attribute: 'fetch-policy',
  }) fetchPolicy: ApolloSubscriptionInterface<D, V>['fetchPolicy'];
}
