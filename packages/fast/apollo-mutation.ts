import type {
  ApolloMutationInterface,
  Constructor,
  Data,
  RefetchQueriesType,
  Variables,
} from '@apollo-elements/interfaces';

import type { OperationVariables } from '@apollo/client/core';

import { attr } from '@microsoft/fast-element';

import { splitCommasAndTrim } from '@apollo-elements/lib/helpers';
import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 *
 * See [`ApolloMutationInterface`](https://apolloelements.dev/api/interfaces/mutation) for more information on events
 *
 * @element
 */
export class ApolloMutation<D = unknown, V = OperationVariables>
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<D, V>
  implements ApolloMutationInterface<D, V> {
  /**
   * Latest mutation data.
   */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  declare variables: Variables<D, V> | null;

  @attr({ mode: 'boolean' }) called = false;

  /**
   * As an attribute, can be a string of comma-separated query names
   * ```html
   * <mutation-element refetch-queries="QueryA, QueryB,QueryC"></mutation-element>
   * ```
   * As a property, you can pass any legal `refetchQueries` value.
   */
  @attr({
    mode: 'fromView',
    attribute: 'refetch-queries',
    converter: {
      toView() { /* c8 ignore next */ return null; },
      fromView(value: string|string[]): string[] {
        return typeof value !== 'string' ? value : splitCommasAndTrim(value);
      },
    },
  }) refetchQueries: RefetchQueriesType<D> | null = null;
}
