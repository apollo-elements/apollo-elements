import type * as I from '@apollo-elements/interfaces';

import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

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
export class ApolloElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloElementMixin(GluonElement as I.Constructor<GluonElement>)<D, V>
  implements I.ApolloElementInterface<D, V> {
  declare context?: Record<string, unknown>;

  declare variables: I.Variables<D, V> | null;

  declare data: I.Data<D> | null;

  update(): void {
    this.render({ sync: true });
  }

  get updateComplete(): Promise<boolean> {
    return this.render().then(() => true);
  }
}
