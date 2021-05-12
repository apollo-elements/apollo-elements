import type * as I from '@apollo-elements/interfaces';

import type * as C from '@apollo/client/core';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { FASTElement } from '@microsoft/fast-element';
import { attr, observable } from './decorators';

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
  declare context?: Record<string, unknown>;

  declare variables: I.Variables<D, V> | null;

  @observable data: I.Data<D> | null = null;

  @observable client: C.ApolloClient<C.NormalizedCacheObject> | null =
    window.__APOLLO_CLIENT__ ?? null;

  @observable error: C.ApolloError | Error | null = null;

  @observable errors: readonly I.GraphQLError[] | null = null;

  @attr({ attribute: 'error-policy' }) errorPolicy?: C.ErrorPolicy;

  @attr({ mode: 'boolean' }) loading = false;
}
