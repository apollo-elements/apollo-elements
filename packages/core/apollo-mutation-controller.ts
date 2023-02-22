import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type {
  ComponentDocument,
  Data,
  MutationUpdaterFn,
  OptimisticResponseType,
  RefetchQueriesType,
  Variables,
  VariablesOf,
} from '@apollo-elements/core/types';

import type {
  ApolloError,
  FetchPolicy,
  FetchResult,
  MutationOptions,
  OperationVariables,
} from '@apollo/client/core';

import { ApolloController, ApolloControllerOptions } from './apollo-controller.js';

import { bound } from './lib/bound.js';

export interface ApolloMutationControllerOptions<D, V extends OperationVariables = VariablesOf<D>>
extends ApolloControllerOptions<D, V> {
  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  variables?: Variables<D, V>;
  refetchQueries?: RefetchQueriesType<D> | null;
  context?: Record<string, unknown>;
  optimisticResponse?: OptimisticResponseType<D, V>;
  fetchPolicy?: Extract<FetchPolicy, 'no-cache'>;
  awaitRefetchQueries?: boolean;
  ignoreResults?: boolean;
  onCompleted?(data: Data<D>|null): void;
  onError?(error: Error): void;
  update?: MutationUpdaterFn<Data<D>, Variables<D, V>>;
}

export class ApolloMutationController<D = any, V extends OperationVariables = VariablesOf<D>>
  extends ApolloController<D, V> implements ReactiveController {
  /**
   * The ID number of the most recent mutation since the element was instantiated.
   */
  private mostRecentMutationId = 0;

  /** @summary Options to customize the mutation and to interface with the controller. */
  declare options: ApolloMutationControllerOptions<D, V>;

  called = false;

  /** @summary The GraphQL mutation document */
  get mutation(): ComponentDocument<D> | null { return this.document; }

  set mutation(document: ComponentDocument<D> | null) { this.document = document; }

  constructor(
    host: ReactiveControllerHost,
    mutation?: ComponentDocument<D> | null,
    options?: ApolloMutationControllerOptions<D, V>
  ) {
    super(host, options);
    this.init(mutation ?? null);/* c8 ignore next */
  }

  /**
   * @summary Fires a mutation
   * This resolves a single mutation according to the options specified and returns a Promise which is either resolved with the resulting data or rejected with an error.
   */
  @bound public async mutate(
    params?: Partial<MutationOptions<Data<D>, Variables<D, V>>>
  ): Promise<FetchResult<Data<D>>> {
    if (!this.client)
      throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/'); /* c8 ignore next */ // covered
    const mutationId = this.generateMutationId();

    const { called = false, data, error, errors, loading } = this;
    this.loading = true;
    this.called = true;
    this.error = null;
    this.errors = [];
    this.data = null;
    this.notify({ called, data, error, errors, loading });

    return this.client.mutate({
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mutation: this.mutation!,

      awaitRefetchQueries: this.options.awaitRefetchQueries,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      optimisticResponse: this.options.optimisticResponse as OptimisticResponseType<any, any>,
      refetchQueries: this.options.refetchQueries ?? undefined,
      update: this.options.update as any,
      variables: this.variables as any,
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
    response: FetchResult<Data<D>>
  ): FetchResult<Data<D>> {
    const { data, error, errors, loading } = this;
    this.emitter.dispatchEvent(new CustomEvent('apollo-mutation-result', { detail: response }));
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      if (!this.options.ignoreResults) {
        this.error = null;
        this.data = response.data ?? null;/* c8 ignore next */
        this.errors = response.errors ?? [];
        this.options.onCompleted?.(this.data); /* c8 ignore next */
      }
      this.notify({ data, error, errors, loading });
    }
    return response;
  }

  /**
   * Callback for when a mutation fails.
   */
  private onMutationError(mutationId: number, apolloError: ApolloError): never {
    this.emitter.dispatchEvent(new CustomEvent('apollo-error', { detail: apolloError }));
    const { data, error, loading } = this;
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      this.data = null;
      this.error = apolloError;
    }
    this.options.onError?.(apolloError);
    this.notify({ data, error, loading });
    throw apolloError;
  }
}
