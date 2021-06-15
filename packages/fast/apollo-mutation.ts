import type {
  Constructor,
  Data,
  Variables,
  RefetchQueriesType,
  MaybeTDN,
  MaybeVariables,
} from '@apollo-elements/core/types';

import { attr } from '@microsoft/fast-element';

import { splitCommasAndTrim } from '@apollo-elements/core/lib/helpers';
import { ApolloElement } from './apollo-element.js';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

import { hosted } from './decorators.js';

/**
 * `ApolloMutation`
 *
 * 👩‍🚀 Custom element base class to issue mutations via your Apollo cache.
 *
 * See [`ApolloMutationInterface`](https://apolloelements.dev/api/core/interfaces/mutation) for more information on events
 *
 * @element
 */
export class ApolloMutation<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<D, V> {
  /**
   * @summary Latest mutation data.
   */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  declare variables: Variables<D, V> | null;

  @hosted()
  @attr({ mode: 'boolean' })
  called = false;

  /**
   * As an attribute, can be a string of comma-separated query names
   * ```html
   * <mutation-element refetch-queries="QueryA, QueryB,QueryC"></mutation-element>
   * ```
   * As a property, you can pass any legal `refetchQueries` value.
   */
  @hosted({ path: 'options' })
  @attr({
    mode: 'fromView',
    attribute: 'refetch-queries',
    converter: {
      toView() { /* c8 ignore next */ return null; },
      fromView(value: string|string[]): string[] {
        return typeof value !== 'string' ? value : splitCommasAndTrim(value);
      },
    },
  })
  refetchQueries: RefetchQueriesType<D> | null = null;

  @hosted({ path: 'options' })
  @attr({ mode: 'boolean', attribute: 'await-refetch-queries' })
  awaitRefetchQueries?: boolean;

  @hosted({ path: 'options' })
  @attr({ attribute: 'fetch-policy' })
  fetchPolicy?: 'no-cache'
}
