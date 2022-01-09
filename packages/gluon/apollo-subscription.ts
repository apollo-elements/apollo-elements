import type { Constructor, Data, Variables, VariablesOf } from '@apollo-elements/core/types';

import { ApolloElement } from './apollo-element.js';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin.js';

export { html } from '@gluon/gluon';

/**
 * `ApolloSubscription`
 *
 * 🚀 Custom element base class that updates with an Apollo GraphQL subscription.
 *
 * @element
 *
 * See [`ApolloSubscriptionInterface`](https://apolloelements.dev/api/core/interfaces/subscription) for more information on events
 *
 */
export class ApolloSubscription<D = unknown, V = VariablesOf<D>>
  extends ApolloSubscriptionMixin(ApolloElement as Constructor<ApolloElement<unknown>>)<D, V> {
  /** @summary Latest subscription data. */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the subscription GraphQL document to that variable's value.
   *
   * @summary Subscription variables.
   */
  declare variables: Variables<D, V> | null;
}
