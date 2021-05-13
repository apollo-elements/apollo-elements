import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type * as I from '@apollo-elements/interfaces';

import { p } from '@apollo-elements/core/decorators';
import { notify, PolymerChangeEvent } from './notify-decorator';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

const last = Symbol('PolymerElement last known');

/**
 * See [ApolloElementInterface](/api/interfaces/element/) for more information.
 *
 * @fires 'data-changed'
 * @fires 'variables-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 */
export class PolymerApolloElement<
  D extends I.MaybeTDN = I.MaybeTDN,
  V = I.MaybeVariables<D>
> extends ApolloElementMixin(HTMLElement)<D, V>
  implements I.ApolloElementInterface<D, V> {
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare variables: I.Variables<D, V> | null;

  @notify() data: I.Data<D> | null = null;

  @notify() error: Error | ApolloError | null = null;

  @notify() errors: readonly I.GraphQLError[]|null = null;

  @notify() loading = false;

  [last] = new Map<keyof this, unknown>();

  requestUpdate(): void {
    if (this.controller)
      for (const [k] of this[p]!) this.maybeNotify(k as keyof this);
    super.requestUpdate();
  }

  maybeNotify(k: keyof this): void {
    if (this[k] !== this[last].get(k)) {
      this[last].set(k, this[k]);
      if (!this.controller)
        // @ts-expect-error: fix later
        this[k] = this[p]?.get?.(k);
      else
        // @ts-expect-error: fix later
        this[k] = this.controller?.[k];
      this.dispatchEvent(new PolymerChangeEvent(k as string, this[k]));
    }
  }
}
