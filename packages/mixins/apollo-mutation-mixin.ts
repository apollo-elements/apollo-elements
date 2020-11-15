import type { DocumentNode } from 'graphql/language/ast';
import type { Constructor, ApolloMutationInterface } from '@apollo-elements/interfaces';
import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';
import {
  ErrorPolicy,
  MutationOptions,
  MutationUpdaterFn,
  FetchResult,
  ApolloError,
  FetchPolicy,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { ApolloElementMixin } from './apollo-element-mixin';

type ApolloMutationResultEvent<TData = unknown> =
  CustomEvent<FetchResult<TData>>;

declare global {
  interface HTMLElementEventMap {
    'apollo-mutation-result': ApolloMutationResultEvent;
  }
}

function ApolloMutationMixinImpl<B extends Constructor>(superclass: B) {
  class ApolloMutationElement<TData, TVariables>
    extends ApolloElementMixin(superclass)<TData, TVariables>
    implements ApolloMutationInterface<TData, TVariables> {
    static documentType = 'mutation';

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

    declare loading: boolean;

    declare variables: TVariables;

    onCompleted?(_data: TData): void;

    onError?(_error: Error): void;

    updater?(...params: Parameters<MutationUpdaterFn<TData>>):
        ReturnType<MutationUpdaterFn<TData>>;

    declare called: boolean;

    ignoreResults = false;

    mostRecentMutationId = 0;

    constructor() {
      super();
      this.variables = null;
    }

    connectedCallback() {
      super.connectedCallback?.();
    }

    /**
     * This resolves a single mutation according to the options specified and returns a Promise which is either resolved with the resulting data or rejected with an error.
     */
    public async mutate(
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
      this.error = null;
      this.data = null;
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
    onCompletedMutation(response: FetchResult<TData>, mutationId: number): FetchResult<TData> {
      const { data } = response;
      this.dispatchEvent(new CustomEvent('apollo-mutation-result', { detail: response }));
      if (this.isMostRecentMutation(mutationId) && !this.ignoreResults) {
        this.loading = false;
        this.error = null;
        this.data = data ?? null;
        this.errors = response.errors ?? null;
      }
      this.onCompleted?.(data);
      return response;
    }

    /**
     * Callback for when a mutation fails.
     * @private
     */
    onMutationError(error: ApolloError, mutationId: number): never {
      this.dispatchEvent(new CustomEvent('apollo-error', { detail: error }));
      if (this.isMostRecentMutation(mutationId)) {
        this.loading = false;
        this.data = null;
        this.error = error ?? null;
      }
      this.onError?.(error);
      throw error;
    }
  }

  Object.defineProperties(ApolloMutationElement.prototype, {
    called: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: false,
    },

    mutation: {
      configurable: true,
      enumerable: true,

      get(this: ApolloMutationElement<unknown, unknown>): DocumentNode {
        return this.document;
      },

      set(this: ApolloMutationElement<unknown, unknown>, mutation) {
        this.document = mutation;
      },

    },

    optimisticResponse: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null,
    },

    refetchQueries: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null,
    },

  });

  return ApolloMutationElement;
}

/**
 * `ApolloMutationMixin`: class mixin for apollo-mutation elements.
 */
export const ApolloMutationMixin =
  dedupeMixin(ApolloMutationMixinImpl);
