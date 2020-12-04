import type { DocumentNode } from 'graphql/language/ast';
import type { Constructor, ApolloMutationInterface } from '@apollo-elements/interfaces';

import type {
  ErrorPolicy,
  MutationOptions,
  MutationUpdaterFn,
  FetchResult,
  ApolloError,
  FetchPolicy,
} from '@apollo/client/core';

import { gqlDocument, writable } from '@apollo-elements/lib/descriptors';
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

    declare mutation: DocumentNode | null;

    declare optimisticResponse?: TData | ((vars: TVariables) => TData);

    declare errorPolicy?: ErrorPolicy;

    declare fetchPolicy?: Extract<FetchPolicy, 'no-cache'>;

    declare refetchQueries:
      null | MutationOptions<TData, TVariables>['refetchQueries'];

    declare awaitRefetchQueries?: boolean;

    declare called: boolean;

    onCompleted?(_data: TData): void;

    onError?(_error: Error): void;

    updater?(...params: Parameters<MutationUpdaterFn<TData>>): ReturnType<MutationUpdaterFn<TData>>;

    ignoreResults = false;

    mostRecentMutationId = 0;

    constructor() {
      super();
      this.variables ??= null;
      this.loading ??= false;
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
      if (!this.client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/pages/guides/getting-started/apollo-client.html'); /* c8 ignore next */ // covered

      const options: MutationOptions<TData, TVariables> = {
        // It's better to let Apollo client throw this error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        mutation: params?.mutation ?? this.mutation!,

        awaitRefetchQueries: params?.awaitRefetchQueries ?? this.awaitRefetchQueries,
        context: params?.context ?? this.context,
        errorPolicy: params?.errorPolicy ?? this.errorPolicy,
        fetchPolicy: params?.fetchPolicy ?? this.fetchPolicy,
        optimisticResponse: params?.optimisticResponse ?? this.optimisticResponse,
        refetchQueries: params?.refetchQueries ?? this.refetchQueries ?? undefined,
        update: params?.update ?? this.updater,
        variables: params?.variables ?? this.variables ?? undefined,
      };

      const mutationId = this.generateMutationId();

      this.loading = true;
      this.error = null;
      this.data = null;
      this.called = true;

      return this.client.mutate<TData, TVariables>(options)
        .then(this.onCompletedMutation.bind(this, mutationId))
        .catch(this.onMutationError.bind(this, mutationId));
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
    onCompletedMutation(mutationId: number, response: FetchResult<TData>): FetchResult<TData> {
      const { data } = response;
      this.dispatchEvent(new CustomEvent('apollo-mutation-result', { detail: response }));
      if (this.isMostRecentMutation(mutationId) && !this.ignoreResults) {
        this.loading = false;
        this.error = null;
        this.data = data ?? null;
        this.errors = response.errors ?? null;
        if (data)
          this.onCompleted?.(data);
      }
      return response;
    }

    /**
     * Callback for when a mutation fails.
     * @private
     */
    onMutationError(mutationId: number, error: ApolloError): never {
      this.dispatchEvent(new CustomEvent('apollo-error', { detail: error }));
      if (this.isMostRecentMutation(mutationId)) {
        this.loading = false;
        this.data = null;
        this.error = error;
      }
      this.onError?.(error);
      throw error;
    }
  }

  Object.defineProperties(ApolloMutationElement.prototype, {
    called: writable(false),
    mutation: gqlDocument(),
    optimisticResponse: writable(),
    refetchQueries: writable(null),
  });

  return ApolloMutationElement;
}

/**
 * `ApolloMutationMixin`: class mixin for apollo-mutation elements.
 */
export const ApolloMutationMixin =
  dedupeMixin(ApolloMutationMixinImpl);
