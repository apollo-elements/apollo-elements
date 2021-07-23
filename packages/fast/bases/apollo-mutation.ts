import type * as C from '@apollo/client/core';

import type {
  Data,
  Variables,
  RefetchQueriesType,
  MaybeTDN,
  MaybeVariables,
  ComponentDocument,
  OptimisticResponseType,
} from '@apollo-elements/core/types';

import { attr } from '@microsoft/fast-element';

import { splitCommasAndTrim } from '@apollo-elements/core/lib/helpers';
import { ApolloElement } from './apollo-element.js';
import { ApolloMutationBehavior } from '../apollo-mutation-behavior.js';

import { hosted } from '../decorators.js';
import { update } from '@apollo-elements/core/apollo-controller';
import { controlled } from '@apollo-elements/core/decorators';

/**
 * `ApolloMutation`
 *
 * 👩‍🚀  FASTElement base class to issue mutations via your Apollo cache.
 *
 * See [`ApolloMutationInterface`](https://apolloelements.dev/api/core/interfaces/mutation) for more information on events
 *
 * @element
 */
export class ApolloMutation<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
> extends ApolloElement<D, V> {
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

  controller = new ApolloMutationBehavior<D, V>(this, null, {
    onCompleted: data => this.onCompleted?.(data),
    onError: error => this.onError?.(error), /* c8 ignore next */ // covered
    [update]: (x: Partial<this>) => this[update](x),
  });

  /**
   * @summary Whether the mutation was called
   */
  @hosted()
  @controlled()
  @attr({ mode: 'boolean' })
  called = false;

  /** @summary The mutation. */
  @hosted()
  @controlled()
  mutation: ComponentDocument<D> | null = null;

  /**
   * An object that represents the result of this mutation that will be optimistically
   * stored before the server has actually returned a result, or a unary function that
   * takes the mutation's variables and returns such an object.
   *
   * This is most often used for optimistic UI, where we want to be able to see
   * the result of a mutation immediately, and update the UI later if any errors
   * appear.
   * @example <caption>Using a function</caption>
   * ```ts
   *         element.optimisticResponse = ({ name }: HelloMutationVariables) => ({
   *           __typename: 'Mutation',
   *           hello: {
   *             __typename: 'Greeting',
   *             name,
   *           },
   *         });
   * ```
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  optimisticResponse?: OptimisticResponseType<D, V>;

  /**
   * @summary If true, the returned data property will not update with the mutation result.
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ mode: 'boolean', attribute: 'ignore-results' })
  ignoreResults = false;

  /**
   * Queries refetched as part of refetchQueries are handled asynchronously,
   * and are not waited on before the mutation is completed (resolved).
   * Setting this to true will make sure refetched queries are completed
   * before the mutation is considered done. false by default.
   * @attr await-refetch-queries
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ mode: 'boolean', attribute: 'await-refetch-queries' })
  awaitRefetchQueries?: boolean;

  /**
   * Specifies the ErrorPolicy to be used for this mutation.
   * @attr error-policy
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ attribute: 'error-policy' })
  errorPolicy?: C.ErrorPolicy;

  /**
   * Specifies the FetchPolicy to be used for this mutation.
   * @attr fetch-policy
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ attribute: 'fetch-policy' })
  fetchPolicy?: 'no-cache'

  /**
   * As an attribute, can be a string of comma-separated query names
   * ```html
   * <mutation-element refetch-queries="QueryA, QueryB,QueryC"></mutation-element>
   * ```
   * As a property, you can pass any legal `refetchQueries` value.
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
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

  /**
   * A function which updates the apollo cache when the query responds.
   * This function will be called twice over the lifecycle of a mutation.
   * Once at the very beginning if an optimisticResponse was provided.
   * The writes created from the optimistic data will be rolled back before
   * the second time this function is called which is when the mutation has
   * succesfully resolved. At that point update will be called with the actual
   * mutation result and those writes will not be rolled back.
   *
   * The reason a DataProxy is provided instead of the user calling the methods
   * directly on ApolloClient is that all of the writes are batched together at
   * the end of the update, and it allows for writes generated by optimistic
   * data to be rolled back.
   */
  public updater?(
    ...params: Parameters<C.MutationUpdaterFn<Data<D>>>
  ): ReturnType<C.MutationUpdaterFn<Data<D>>>;

  public mutate(
    params?: Partial<C.MutationOptions<Data<D>, Variables<D, V>>>
  ): Promise<C.FetchResult<Data<D>>> {
    return this.controller.mutate({
      ...params,
      update: params?.update ?? this.updater,
    });
  }

  /**
   * Callback for when a mutation is completed.
   */
  onCompleted?(data: Data<D> | null): void

  /**
   * Callback for when an error occurs in mutation.
   */
  onError?(error: Error): void
}
