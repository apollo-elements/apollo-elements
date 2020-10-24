import type { MutationOptions, MutationUpdaterFn, FetchResult } from '@apollo/client/core';
import type { DocumentNode } from 'graphql';

import { attr, ValueConverter } from '@microsoft/fast-element';

import { splitCommasAndTrim } from '@apollo-elements/lib/helpers';
import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { ApolloMutationInterface, Constructor } from '@apollo-elements/interfaces';

const refetchQueriesConverter: ValueConverter = {
  toView() { return null; },
  fromView(value: string|string[]): string[] {
    return typeof value !== 'string' ? value : splitCommasAndTrim(value);
  },
};

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 */
export class ApolloMutation<TData, TVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
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

  @attr({ mode: 'boolean' }) called = false;

  /**
   * As an attribute, can be a string of comma-separated query names
   * ```html
   * <mutation-element refetch-queries="QueryA, QueryB,QueryC"></mutation-element>
   * ```
   * As a property, you can pass any legal `refetchQueries` value.
   */
  @attr({ mode: 'fromView', attribute: 'refetch-queries', converter: refetchQueriesConverter })
  refetchQueries: MutationOptions['refetchQueries'] = null;
}
