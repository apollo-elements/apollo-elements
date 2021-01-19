import type { GraphQLError } from '@apollo-elements/interfaces';

import type {
  ApolloClient,
  ApolloError,
  ErrorPolicy,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { FASTElement, attr, observable } from '@microsoft/fast-element';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for Apollo FAST elements.
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/interfaces/element) for more information on events
 *
 * @element
 */
export class ApolloElement extends ApolloElementMixin(FASTElement) {
  declare context?: Record<string, unknown>;

  declare variables: unknown | null;

  @observable data: unknown | null = null;

  @observable client: ApolloClient<NormalizedCacheObject> | null =
    window.__APOLLO_CLIENT__ ?? null;

  @observable error: ApolloError | Error | null = null;

  @observable errors: readonly GraphQLError[] | null = null;

  @attr({ attribute: 'error-policy' }) errorPolicy?: ErrorPolicy;

  @attr({ mode: 'boolean' }) loading = false;
}
