import type { ApolloElementInterface } from '@apollo-elements/interfaces';

import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { defineObservedProperties } from './helpers/descriptor';

export { html } from '@gluon/gluon';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for apollo gluon elements.
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/interfaces/element) for more information on events
 *
 * @element
 */
export class ApolloElement
  extends ApolloElementMixin(GluonElement)
  implements ApolloElementInterface {
  declare context?: Record<string, unknown>;

  declare variables: unknown | null;

  declare data: unknown | null;
}

defineObservedProperties(ApolloElement, {
  data: null,
  error: null,
  errors: null,
  loading: false,
});
