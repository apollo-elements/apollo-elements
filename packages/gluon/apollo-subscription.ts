import type * as I from '@apollo-elements/interfaces';

import { ApolloElement } from './apollo-element';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';

export { html } from '@gluon/gluon';

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
export class ApolloSubscription<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloSubscriptionMixin(ApolloElement as I.Constructor<ApolloElement>)<D, V>
  implements I.ApolloSubscriptionInterface<D, V> {
  /**
   * Latest subscription data.
   */
  declare data: I.Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the subscription GraphQL document to that variable's value.
   *
   * @summary Subscription variables.
   */
  declare variables: I.Variables<D, V> | null;
}
