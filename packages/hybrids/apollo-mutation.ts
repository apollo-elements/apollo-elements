import { clientFactory } from './factories/client';
import { mutationFactory } from './factories/mutation';
import type { FetchResult } from 'apollo-link';
import type { ApolloError, MutationOptions } from 'apollo-client';
import type { ApolloMutation as IApolloMutation } from '@apollo-elements/mixins/apollo-mutation';

type MutationElement = HTMLElement & IApolloMutation<unknown, unknown>;

const isMostRecentMutation = (
  host: MutationElement,
  mutationId: number
): boolean =>
  host.mostRecentMutationId === mutationId;

const onMutationCompleted = <TData>(
  host: MutationElement,
  response: FetchResult<TData>,
  mutationId: number
): void => {
  if (!isMostRecentMutation(host, mutationId) || host.ignoreResults) return;
  const { data } = response;
  host.loading = false;
  host.error = null;
  host.data = data;
  return host.onCompleted?.(data);
};

const onMutationError = (
  host: MutationElement,
  error: ApolloError,
  mutationId: number
): void => {
  if (!isMostRecentMutation(host, mutationId)) return;
  host.loading = false;
  host.data = null;
  host.error = error;
  return host.onError?.(error);
};

const mutate = {
  get: (host: MutationElement) =>
    async (opts?: Partial<MutationOptions<unknown, unknown>>): Promise<FetchResult<unknown>> => {
      const {
        errorPolicy,
        fetchPolicy,
        refetchQueries,
        awaitRefetchQueries,
        context = host.context,
        mutation = host.mutation,
        optimisticResponse = host.optimisticResponse,
        update = host.updater,
        variables = host.variables,
      } = opts ?? {};

      host.mostRecentMutationId += 1;
      const mutationId = host.mostRecentMutationId;

      host.loading = true;
      host.error = null;
      host.data = null;
      host.called = true;

      try {
        const response = await host.client.mutate({
          context,
          errorPolicy,
          fetchPolicy,
          mutation,
          optimisticResponse,
          refetchQueries,
          update,
          awaitRefetchQueries,
          variables,
        });

        onMutationCompleted(host, response, mutationId);
        return response;
      } catch (error) {
        onMutationError(host, error, mutationId);
        return error;
      }
    },
};

export const ApolloMutation = {
  client: clientFactory(),
  data: null,
  errorPolicy: 'none',
  ignoreResults: false,
  mostRecentMutationId: 0,
  mutate,
  mutation: mutationFactory(),
  onCompleted: {
    get: (_, last): MutationElement['onCompleted'] => last,
    set: (_, v): MutationElement['onCompleted'] => v,
  },
  onError: {
    get: (_, last): MutationElement['onError'] => last,
    set: (_, v): MutationElement['onError'] => v,
  },
};
