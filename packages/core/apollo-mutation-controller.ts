import type * as I from '@apollo-elements/interfaces';
import type * as C from '@apollo/client/core';

import type { ReactiveController, ReactiveControllerHost } from 'lit';

import { ApolloController, ApolloControllerOptions } from './apollo-controller';

import { bound } from '@apollo-elements/lib/bound';

export interface ApolloMutationControllerOptions<D, V> extends ApolloControllerOptions<D, V> {
  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  variables?: I.Variables<D, V>,
  refetchQueries?: I.RefetchQueriesType<D> | null,
  context?: Record<string, unknown>,
  optimisticResponse?: I.OptimisticResponseType<D, V>,
  errorPolicy?: C.ErrorPolicy;
  fetchPolicy?: Extract<C.FetchPolicy, 'no-cache'>,
  awaitRefetchQueries?: boolean,
  onCompleted?(data: I.Data<D>|null): void,
  onError?(error: Error): void,
  update?(
    ...p: Parameters<C.MutationUpdaterFn<I.Data<D>>>
  ): ReturnType<C.MutationUpdaterFn<I.Data<D>>>,
  ignoreResults?: boolean,
}

export class ApolloMutationController<D extends I.MaybeTDN = any, V = I.MaybeVariables<D>>
  extends ApolloController<D, V> implements ReactiveController {
  /**
   * The ID number of the most recent mutation since the element was instantiated.
   */
  private mostRecentMutationId = 0;

  declare options: ApolloMutationControllerOptions<D, V>;

  called = false;

  documentChanged?(document?: I.ComponentDocument<D> | null): void

  variablesChanged?(variables: I.Variables<D, V>): void

  get mutation(): this['document'] {
    return this.document ?? null;
  }

  set mutation(document: this['document']) { this.document = document; }

  constructor(
    host: ReactiveControllerHost,
    mutation?: I.ComponentDocument<D> | null,
    options?: ApolloMutationControllerOptions<D, V>
  ) {
    super(host, options);
    this.init(mutation ?? null);
  }

  /**
   * @summary Fires a mutation
   * This resolves a single mutation according to the options specified and returns a Promise which is either resolved with the resulting data or rejected with an error.
   */
  @bound public async mutate(
    params?: Partial<C.MutationOptions<I.Data<D>, I.Variables<D, V>>>
  ): Promise<C.FetchResult<I.Data<D>>> {
    if (!this.client)
      throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/'); /* c8 ignore next */ // covered
    const mutationId = this.generateMutationId();

    this.loading = true;
    this.called = true;
    this.error = null;
    this.errors = [];
    this.data = null;
    this.notify('called', 'data', 'error', 'errors', 'loading');

    return this.client.mutate<I.Data<D>, I.Variables<D, V>>({
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mutation: this.mutation!,

      awaitRefetchQueries: this.options.awaitRefetchQueries,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      optimisticResponse: this.options.optimisticResponse,
      refetchQueries: this.options.refetchQueries ?? undefined,
      update: this.options.update,
      variables: this.variables ?? undefined,
      ...params,
    })
      .then(this.onCompletedMutation.bind(this, mutationId))
      .catch(this.onMutationError.bind(this, mutationId));
  }

  /**
   * Increments and returns the most recent mutation id.
   */
  private generateMutationId(): number {
    this.mostRecentMutationId += 1;
    return this.mostRecentMutationId;
  }

  /**
   * Returns true when an ID matches the most recent mutation id.
   */
  private isMostRecentMutation(mutationId: number): boolean {
    return this.mostRecentMutationId === mutationId;
  }

  /**
   * Callback for when a mutation is completed.
   */
  private onCompletedMutation(
    mutationId: number,
    response: C.FetchResult<I.Data<D>>
  ): C.FetchResult<I.Data<D>> {
    const { data } = response;
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      if (!this.options.ignoreResults) {
        this.error = null;
        this.data = data ?? null;
        this.errors = response.errors ?? [];
        this.options.onCompleted?.(this.data); /* c8 ignore next */
      }
      this.notify('data', 'error', 'errors', 'loading');
    }
    return response;
  }

  /**
   * Callback for when a mutation fails.
   */
  private onMutationError(mutationId: number, error: C.ApolloError): never {
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      this.data = null;
      this.error = error;
    }
    this.options.onError?.(error);
    this.notify('data', 'error', 'loading');
    throw error;
  }
}
