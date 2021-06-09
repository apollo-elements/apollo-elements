import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type * as I from '@apollo-elements/interfaces';
import type { ApolloController } from '@apollo-elements/core';

import { getInitialProps, getInitialProp } from '@apollo-elements/core/decorators';
import { notify, PolymerChangeEvent } from './notify-decorator';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

const last = Symbol('PolymerElement last known');

/**
 * See [ApolloElementInterface](/api/interfaces/element/) for more information.
 *
 * @fires data-changed
 * @fires variables-changed
 * @fires error-changed
 * @fires errors-changed
 * @fires loading-changed
 */
export abstract class PolymerApolloElement<
  D extends I.MaybeTDN = I.MaybeTDN,
  V = I.MaybeVariables<D>
> extends ApolloElementMixin(HTMLElement)<D, V> {
  static readonly is: `polymer-apollo-${'mutation'|'query'|'subscription'}`;

  [last] = new Map<keyof this, unknown>();

  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare variables: I.Variables<D, V> | null;

  @notify() data: I.Data<D> | null = null;

  @notify() error: Error | ApolloError | null = null;

  @notify() errors: readonly I.GraphQLError[] = [];

  @notify() loading = false;

  requestUpdate(): void {
    this[last] ??= new Map();
    for (const [k] of getInitialProps(this))
      this.maybeNotify(k as keyof this);
    super.requestUpdate();
  }

  maybeNotify(k: keyof this): void {
    if (this[k] !== this[last].get(k)) {
      this[last].set(k, this[k]);
      if (!this.controller)
        this[k] = getInitialProp(this, k);
      else
        this[k] = this.controller[k as keyof ApolloController<D, V>] as this[keyof this];
      this.dispatchEvent(new PolymerChangeEvent(k as string, this[k]));
    }
  }
}
