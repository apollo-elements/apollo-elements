import type { MutationOptions, MutationUpdaterFn, FetchResult } from '@apollo/client/core';

import type { LitElement, PropertyDeclarations } from 'lit-element';

import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { ApolloMutationInterface, Constructor } from '@apollo-elements/interfaces';
import type { DocumentNode } from 'graphql';

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 */
export class ApolloMutation<TData, TVariables>
  extends ApolloMutationMixin(
    ApolloElement as Constructor<LitElement & ApolloElement>
  )<TData, TVariables>
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

  public async mutate(
    params?: Partial<MutationOptions<TData, TVariables>>
  ): Promise<FetchResult<TData>> {
    const update = params?.update ?? this.updater;
    return super.mutate({ update, ...params });
  }

  /**
   * Mutation components always update by default.
   */
  shouldUpdate(): boolean {
    return true;
  }
}
