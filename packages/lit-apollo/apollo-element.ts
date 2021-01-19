import type { ApolloError, ErrorPolicy } from '@apollo/client/core';

import type { Constructor, GraphQLError } from '@apollo-elements/interfaces';

import { LitElement, property } from 'lit-element';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for apollo lit elements.
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/interfaces/element) for more information on events
 */
export class ApolloElement extends ApolloElementMixin(LitElement as Constructor<LitElement>) {
  declare context?: Record<string, unknown>;

  declare variables: unknown | null;

  @property({ attribute: false }) client = /* c8 ignore next */ window.__APOLLO_CLIENT__ ?? null;

  @property({ attribute: false }) data: unknown | null = null;

  @property({ attribute: false }) error: Error | ApolloError | null = null;

  @property({ attribute: false }) errors: readonly GraphQLError[] | null = null;

  @property({ attribute: 'error-policy' }) errorPolicy?: ErrorPolicy;

  @property({ attribute: 'fetch-policy' }) fetchPolicy?: string;

  @property({ type: Boolean, reflect: true }) loading = false;
}
