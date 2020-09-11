import type { MutationOptions, MutationUpdaterFn, FetchResult } from '@apollo/client/core';

import { LitElement, property } from 'lit-element';

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

  declare ignoreResults: boolean;

  declare mostRecentMutationId: number;

  onCompleted?(_data: FetchResult<TData>): void

  onError?(_error: Error): void

  updater?(...params: Parameters<MutationUpdaterFn<TData>>):
    ReturnType<MutationUpdaterFn<TData>>;

  @property({ type: Boolean }) called = false;

  /**
   * As an attribute, can be a string of comma-separated query names
   * ```html
   * <mutation-element refetch-queries="QueryA, QueryB,QueryC"></mutation-element>
   * ```
   * As a property, you can pass any legal `refetchQueries` value.
   */
  @property({ attribute: 'refetch-queries', converter: {
    fromAttribute(string: string): string[] {
      return (
        typeof string !== 'string' ? undefined
      : string
        .split(',')
        .map(x => x.trim())
        .filter(Boolean)
      );
    },
  } }) refetchQueries: MutationOptions['refetchQueries'] = null;

  public async mutate(
    params?: Partial<MutationOptions<TData, TVariables>>
  ): Promise<FetchResult<TData>> {
    const update = params?.update ?? this.updater;
    return super.mutate({ update, ...params });
  }
}
