import type {
  Data,
  OptimisticResponseType,
  RefetchQueriesType,
  Variables,
} from '@apollo-elements/interfaces';

import type {
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  MutationOptions,
  MutationUpdaterFn,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type { VariablesOf } from '@graphql-typed-document-node/core';

import { ApolloController, ApolloControllerOptions, update } from './apollo-controller';

import { bound } from '@apollo-elements/lib/bound';

export interface ApolloMutationControllerOptions<D, V> extends ApolloControllerOptions<D, V> {
  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  variables?: Variables<D, V>,
  refetchQueries?: RefetchQueriesType<D> | null,
  context?: Record<string, unknown>,
  optimisticResponse?: OptimisticResponseType<D, V>,
  errorPolicy?: ErrorPolicy;
  fetchPolicy?: Extract<FetchPolicy, 'no-cache'>,
  awaitRefetchQueries?: boolean,
  onCompleted?(data?: Data<D>|null): void,
  onError?(error?: Error): void,
  update?(...p: Parameters<MutationUpdaterFn<Data<D>>>): ReturnType<MutationUpdaterFn<Data<D>>>,
  ignoreResults?: boolean,
}

export class ApolloMutationController<
  D extends DocumentNode,
  V = D extends TypedDocumentNode ? VariablesOf<D> : OperationVariables,
> extends ApolloController<D, V> implements ReactiveController {
  /**
   * The ID number of the most recent mutation since the element was instantiated.
   */
  private mostRecentMutationId = 0;

  declare data?: Data<D> | null;

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  declare variables: Variables<D, V> | undefined;

  declare options: ApolloMutationControllerOptions<D, V>;

  called = false;

  documentChanged?(document: DocumentNode): void

  variablesChanged?(variables: Variables<D, V>): void

  get mutation(): this['document'] { return this.document; }

  set mutation(document: this['document']) { this.document = document; }

  constructor(
    host: ReactiveControllerHost,
    mutation?: D,
    options?: ApolloMutationControllerOptions<D, V>
  ) {
    super(host, options);
    this.init(mutation);
  }

  /**
   * This resolves a single mutation according to the options specified and returns a Promise which is either resolved with the resulting data or rejected with an error.
   */
  @bound public async mutate(
    params?: Partial<MutationOptions<Data<D>, Variables<D, V>>>
  ): Promise<FetchResult<Data<D>>> {
    if (!this.client)
      throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/'); /* c8 ignore next */ // covered
    const mutationId = this.generateMutationId();

    this.loading = true;
    this.called = true;
    this.error = null;
    this.data = undefined;
    this[update]();

    return this.client.mutate<Data<D>, Variables<D, V>>({
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
      variables: this.variables,
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
    const { data } = response;
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      if (!this.options.ignoreResults) {
        this.error = null;
        this.data = data;
        this.errors = response.errors;
        this.options.onCompleted?.(data); /* c8 ignore next */
      }
      this[update]();
    }
    return response;
  }

  /**
   * Callback for when a mutation fails.
   */
  private onMutationError(mutationId: number, error: ApolloError): never {
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      this.data = undefined;
      this.error = error;
    }
    this.options.onError?.(error);
    this[update]();
    throw error;
  }
}
