import type { ApolloError } from '@apollo/client/core';
import type { GraphQLError } from 'graphql';

import { LitElement, property } from 'lit-element';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { ApolloElementInterface, Constructor } from '@apollo-elements/interfaces';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for apollo lit elements.
 *
 * See [[`ApolloElementInterface`]] for more information on events
 */
export class ApolloElement<TData = unknown, TVariables = unknown>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloElementMixin(LitElement as Constructor<LitElement>)<TData, TVariables>
  implements ApolloElementInterface<TData, TVariables> {
  declare context?: Record<string, unknown>;

  @property({ attribute: false }) client = /* c8 ignore next */ window.__APOLLO_CLIENT__ ?? null;

  @property({ attribute: false }) data: TData | null = null;

  @property({ attribute: false }) error: Error | ApolloError | null = null;

  @property({ attribute: false }) errors: readonly GraphQLError[] | null = null;

  @property({ type: Boolean, reflect: true }) loading = false;
}
