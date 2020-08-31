import type { MutationOptions, MutationUpdaterFn, FetchResult } from '@apollo/client/core';

import { PropertyDeclarations } from 'lit-element';

import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { Constructor } from '@apollo-elements/mixins/constructor';
import { ApolloMutationInterface } from '@apollo-elements/interfaces';
import type { DocumentNode } from 'graphql';

/**
 * # ApolloMutation
 *
 * 👩‍🚀 A custom element base class to issue mutations via your Apollo cache.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * import { ApolloMutation, html } from 'lit-apollo';
 * import Mutation from './mutation-element.graphql';
 *
 * class MutationElement extends ApolloMutation {
 *   mutation = Mutation;
 *
 *   render() {
 *     return html`<input @keyup="${this.onInput}"/>`
 *   }
 *
 *   onInput({ target: { value: input }, key }) {
 *     this.variables = { input };
 *     if (key === 'Enter') return this.mutate();
 *   }
 * };
 *
 * customElements.define('mutation-element', MutationElement)
 * ```
 */
export abstract class ApolloMutation<TData, TVariables>
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloMutationInterface<TData, TVariables> {
  declare data: TData;

  declare variables: TVariables;

  declare mutation: DocumentNode;

  declare optimisticResponse?: TData | ((vars: TVariables) => TData)

  declare loading: boolean;

  declare called: boolean;

  declare ignoreResults: boolean;

  declare mostRecentMutationId: number;

  onCompleted?(_data: FetchResult<TData>): void

  onError?(_error: Error): void

  updater?(...params: Parameters<MutationUpdaterFn<TData>>):
    ReturnType<MutationUpdaterFn<TData>>;

  static get properties(): PropertyDeclarations {
    return {
      called: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.called = false;
  }

  async mutate(
    params?: Partial<MutationOptions<TData, TVariables>>
  ): Promise<FetchResult<TData>> {
    const update = params?.update ?? this.updater;
    return super.mutate({ update, ...params });
  }
}
