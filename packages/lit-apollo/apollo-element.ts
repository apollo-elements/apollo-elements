import type { NormalizedCacheObject, ApolloClient, ApolloError } from '@apollo/client/core';
import type { GraphQLError } from 'graphql';

import { LitElement, property } from 'lit-element';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { ApolloElementInterface } from '@apollo-elements/interfaces';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for apollo custom elements.
 */
export class ApolloElement<TData = unknown>
  extends ApolloElementMixin(LitElement)
  implements ApolloElementInterface<TData> {
  declare context?: Record<string, unknown>;

  @property({ attribute: false }) client: ApolloClient<NormalizedCacheObject> =
    window.__APOLLO_CLIENT__;

  @property({ attribute: false }) data: TData = null;

  @property({ attribute: false }) error: Error|ApolloError = null;

  @property({ attribute: false }) errors: readonly GraphQLError[] = null;

  @property({ type: Boolean, reflect: true }) loading = false;
}
