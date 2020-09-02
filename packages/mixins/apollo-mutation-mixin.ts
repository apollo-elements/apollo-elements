import type { DocumentNode } from 'graphql/language/ast';
import type { Constructor, CustomElement } from './constructor';
import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';
import type {
  ErrorPolicy,
  MutationOptions,
  MutationUpdaterFn,
  FetchResult,
  ApolloError,
  FetchPolicy,
} from '@apollo/client/core';

import bound from 'bind-decorator';

import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { ApolloElementMixin } from './apollo-element-mixin';
import { ApolloMutationInterface } from '@apollo-elements/interfaces';

function ApolloMutationMixinImpl<B extends Constructor<CustomElement>>(superclass: B) {
  /**
   * Class mixin for apollo-mutation elements
   */
  abstract class ApolloMutationElement<TData, TVariables>
    extends ApolloElementMixin(superclass)
    implements ApolloMutationInterface<TData, TVariables> {
    declare data: TData;

    declare mutation: DocumentNode;

    declare optimisticResponse?: TData | ((vars: TVariables) => TData);

    declare errorPolicy?: ErrorPolicy;

    declare fetchPolicy?: Extract<FetchPolicy, 'no-cache'>;

    declare refetchQueries?:
      RefetchQueryDescription | ((result: FetchResult<TData>) => RefetchQueryDescription);

    declare awaitRefetchQueries?: boolean;

    declare client: ApolloClient<NormalizedCacheObject>;

    declare context?: Record<string, unknown>;

    declare error: Error;

    declare errors: readonly GraphQLError[];

    declare loading: boolean;

    declare variables: TVariables;

    onCompleted?(_data: FetchResult<TData>): void;

    onError?(_error: Error): void;

    updater?(...params: Parameters<MutationUpdaterFn<TData>>):
        ReturnType<MutationUpdaterFn<TData>>;

    called = false;

    ignoreResults = false;

    mostRecentMutationId = 0;

    constructor() {
      super();
      type This = this;
      this.variables = null;
      Object.defineProperties(this, {
        mutation: {
          configurable: true,
          enumerable: true,

          get(this: This): DocumentNode {
            return this.document;
          },

          set(this: This, mutation) {
            try {
              this.document = mutation;
            } catch (error) {
              throw new TypeError('Mutation must be a gql-parsed DocumentNode');
            }
          },

        },
      });
    }

    /**
     * This resolves a single mutation according to the options specified and returns a Promise which is either resolved with the resulting data or rejected with an error.
     */
    @bound public async mutate(
      params?: Partial<MutationOptions<TData, TVariables>>
    ): Promise<FetchResult<TData>> {
      const options: MutationOptions<TData, TVariables> = {
        awaitRefetchQueries: params?.awaitRefetchQueries ?? this.awaitRefetchQueries,
        context: params?.context ?? this.context,
        errorPolicy: params?.errorPolicy ?? this.errorPolicy,
        fetchPolicy: params?.fetchPolicy ?? this.fetchPolicy,
        mutation: params?.mutation ?? this.mutation,
        optimisticResponse: params?.optimisticResponse ?? this.optimisticResponse,
        refetchQueries: params?.refetchQueries ?? this.refetchQueries,
        update: params?.update ?? this.updater,
        variables: params?.variables ?? this.variables,
      };

      const mutationId = this.generateMutationId();

      this.loading = true;
      this.error = undefined;
      this.data = undefined;
      this.called = true;

      return this.client.mutate(options)
        .then((response: FetchResult<TData>) => this.onCompletedMutation(response, mutationId))
        .catch((error: ApolloError) => this.onMutationError(error, mutationId));
    }

    /**
     * Increments and returns the most recent mutation id.
     * @private
     */
    generateMutationId(): number {
      this.mostRecentMutationId += 1;
      return this.mostRecentMutationId;
    }

    /**
     * Returns true when an ID matches the most recent mutation id.
     * @private
     */
    isMostRecentMutation(mutationId: number): boolean {
      return this.mostRecentMutationId === mutationId;
    }

    /**
     * Callback for when a mutation is completed.
     * @private
     */
    onCompletedMutation(
      response: FetchResult<TData>,
      mutationId: number,
    ): FetchResult<TData> {
      const { data } = response;
      if (this.isMostRecentMutation(mutationId) && !this.ignoreResults) {
        this.loading = false;
        this.error = null;
        this.data = data;
      }
      this.onCompleted?.(data);
      return response;
    }

    /**
     * Callback for when a mutation fails.
     * @private
     */
    onMutationError(error: ApolloError, mutationId: number): never {
      if (this.isMostRecentMutation(mutationId)) {
        this.loading = false;
        this.data = null;
        this.error = error;
      }
      this.onError?.(error);
      throw error;
    }
  }

  return ApolloMutationElement;
}

/**
 * `ApolloMutationMixin`: class mixin for apollo-mutation elements.
 */
export const ApolloMutationMixin =
  dedupeMixin(ApolloMutationMixinImpl);
