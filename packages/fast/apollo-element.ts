import type {
  Constructor,
  Data,
  Entries,
  GraphQLError,
  MaybeTDN,
  MaybeVariables,
} from '@apollo-elements/core/types';

import type * as C from '@apollo/client/core';

import type { CustomElement } from '@apollo-elements/core/types';

import type { ApolloController } from '@apollo-elements/core';

import { hosted } from './decorators';

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
export class ApolloElement<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloElementMixin(FASTElement as Constructor<FASTElement & CustomElement>)<D, V> {
  declare controller: ApolloController<D, V>;

  readyToReceiveDocument = false;

  @observable called = false;

  /** @summary Whether a request is in flight. */
  @hosted()
  @attr({ mode: 'boolean' })
  loading = false;

  /** @summary The Apollo Client instance */
  @hosted()
  @observable
  client: C.ApolloClient<C.NormalizedCacheObject> | null = window.__APOLLO_CLIENT__ ?? null;

  /** @summary Latest Data. */
  @hosted()
  @observable
  data: Data<D>|null = null;

  /** @summary Latest error */
  @hosted()
  @observable
  error: Error | C.ApolloError | null = null;

  /** @summary Latest errors */
  @hosted()
  @observable
  errors: readonly GraphQLError[] = [];

  get updateComplete(): Promise<boolean> {
    return DOM.nextUpdate().then(() => true);
  }

  [update](properties: Partial<this>): void {
    for (const [k, v] of Object.entries(properties) as Entries<this>)
      (this[k] !== v) && (this[k] = v);
  }
}
