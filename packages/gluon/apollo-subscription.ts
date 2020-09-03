import type { ApolloSubscriptionInterface, Constructor } from '@apollo-elements/interfaces';
import type { GluonElement } from '@gluon/gluon';

import { ApolloElement } from './apollo-element';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
export { html } from './apollo-element';

/**
 * `ApolloSubscription`
 *
 * 🚀 Custom element base class that updates with an Apollo GraphQL subscription.
 */
export class ApolloSubscription<TData, TVariables>
  extends ApolloSubscriptionMixin(
    ApolloElement as unknown as Constructor<ApolloElement & GluonElement>
  )<TData, TVariables>
  implements ApolloSubscriptionInterface<TData, TVariables> { }
