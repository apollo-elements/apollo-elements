import type { ApolloError, OperationVariables } from '@apollo/client/core';

import type { Constructor, Data, GraphQLError } from '@apollo-elements/interfaces';

import { LitElement, property } from 'lit-element';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for apollo lit elements.
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/interfaces/element) for more information on events
 */
export class ApolloElement<D = unknown, V = OperationVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloElementMixin(LitElement as Constructor<LitElement>)<D, V> {
  declare context?: Record<string, unknown>;

  @property({ attribute: false }) client = /* c8 ignore next */ window.__APOLLO_CLIENT__ ?? null;

  @property({ attribute: false }) data: Data<D> | null = null;

  @property({ attribute: false }) error: Error | ApolloError | null = null;

  @property({ attribute: false }) errors: readonly GraphQLError[] | null = null;

  @property({ type: Boolean, reflect: true }) loading = false;
}
