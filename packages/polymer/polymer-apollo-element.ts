import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type {
  Data,
  GraphQLError,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/core/types';
import type { ApolloController } from '@apollo-elements/core';

import { getInitialProps, getInitialProp } from '@apollo-elements/core/decorators';
import { notify, PolymerChangeEvent } from './notify-decorator.js';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { GraphQLScriptChildMixin } from '@apollo-elements/mixins/graphql-script-child-mixin';

const last = Symbol('PolymerElement last known');

/**
 * See [ApolloElementInterface](/api/core/interfaces/element/) for more information.
 *
 * @fires {PolymerChangeEvent<Data<D>>} data-changed
 * @fires {PolymerChangeEvent<Variables<D, V>>} variables-changed
 * @fires {PolymerChangeEvent<Error>} error-changed
 * @fires {PolymerChangeEvent<readonly GraphQLError[]>} errors-changed
 * @fires {PolymerChangeEvent<boolean>} loading-changed
 */
export class PolymerApolloElement<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
> extends GraphQLScriptChildMixin(ApolloElementMixin(HTMLElement))<D, V> {
  static readonly is: `polymer-apollo-${'mutation'|'query'|'subscription'}`;

  /** @ignore */
  [last] = new Map<keyof this, unknown>();

  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare variables: Variables<D, V> | null;

  @notify() data: Data<D> | null = null;

  @notify() error: Error | ApolloError | null = null;

  @notify() errors: readonly GraphQLError[] = [];

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
        this[k] = getInitialProp(this, k) as this[keyof this];
      else
        this[k] = this.controller[k as keyof ApolloController<D, V>] as this[keyof this];
      this.dispatchEvent(new PolymerChangeEvent(k as string, this[k]));
    }
  }
}
