import type { NormalizedCacheObject, ApolloClient, ApolloError } from '@apollo/client/core';
import type { GraphQLError } from 'graphql';

import { LitElement, PropertyDeclarations } from 'lit-element';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { ApolloElementInterface } from '@apollo-elements/interfaces';

/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 */
export class ApolloElement
  extends ApolloElementMixin(LitElement)
  implements ApolloElementInterface<unknown> {
  static get properties(): PropertyDeclarations {
    return {
      client: { attribute: false },
      data: { attribute: false },
      error: { attribute: false },
      errors: { attribute: false },
      loading: { type: Boolean, reflect: true },
    };
  }

  declare context?: Record<string, unknown>;

  client: ApolloClient<NormalizedCacheObject> = window.__APOLLO_CLIENT__;

  data = null;

  error: Error|ApolloError = null;

  errors: readonly GraphQLError[] = null;

  loading = false;

  /**
   * Query and Subscription components will only render
   * if the component has `data`, an `error` or `errors,
   * or is `loading`. Mutation components will by default always render
   */
  shouldUpdate(): boolean {
    const { data, error, loading } = this;
    return (!!data || !!error || loading);
  }
}
