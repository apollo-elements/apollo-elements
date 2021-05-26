import type * as I from '@apollo-elements/interfaces';

import type * as C from '@apollo/client/core';

import type { ApolloController } from '@apollo-elements/core';

import { update } from '@apollo-elements/core/apollo-controller';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { DOM, FASTElement, attr, observable } from '@microsoft/fast-element';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for Apollo FAST elements.
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/interfaces/element) for more information on events
 *
 * @element
 */
export class ApolloElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloElementMixin(FASTElement)<D, V> {
  declare controller: ApolloController<D, V>;

  readyToReceiveDocument = false;

  @observable called = false;

  /** @summary Whether a request is in flight. */
  @attr({ mode: 'boolean' }) loading = false;

  /** @summary Latest Data. */
  @observable data: I.Data<D>|null = null;

  /** @summary Latest error */
  @observable error: Error | C.ApolloError | null = null;

  /** @summary Latest errors */
  @observable errors: readonly I.GraphQLError[] = [];

  get updateComplete(): Promise<boolean> {
    return DOM.nextUpdate().then(() => true);
  }

  dataChanged(): void {
    if (!this.controller) return;
    if (this.controller.data !== this.data)
      this.controller.data = this.data;
  }

  errorChanged(): void {
    if (!this.controller) return;
    if (this.controller.error !== this.error)
      this.controller.error = this.error as null;
  }

  loadingChanged(): void {
    if (!this.controller) return;
    if (this.controller.loading !== this.loading)
      this.controller.loading = this.loading;
  }

  [update](properties: Partial<Record<keyof this, this[keyof this]>>): void {
    if (!properties) return;
    for (const [k, v] of Object.entries(properties) as I.Entries<this>)
      (this[k] !== v) && (this[k] = v);
  }
}
