import type { Constructor, Data, Variables, VariablesOf } from '@apollo-elements/core/types';
import type { OperationVariables } from '@apollo/client/core';

import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

export { html } from '@gluon/gluon';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for apollo gluon elements.
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/core/interfaces/element) for more information on events
 *
 * @element
 */
export class ApolloElement<D = unknown, V extends OperationVariables = VariablesOf<D>>
  extends ApolloElementMixin(GluonElement as Constructor<GluonElement>)<D, V> {
  declare context?: Record<string, unknown>;

  declare variables: Variables<D, V> | null;

  declare data: Data<D> | null;

  update(): void {
    this.render().then(() => super.update());
  }

  get updateComplete(): Promise<boolean> {
    return this.render().then(() => true);
  }
}
