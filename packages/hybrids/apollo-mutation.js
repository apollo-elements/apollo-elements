import { clientFactory } from './factories/client';
import { mutationFactory } from './factories/mutation';
import { variablesFactory } from './factories/variables';

const isMostRecentMutation = (host, mutationId) => host.mostRecentMutationId === mutationId;

const onMutationCompleted = (host, response, mutationId) => {
  if (!isMostRecentMutation(host, mutationId) || host.ignoreResults) return;
  const { data } = response;
  host.loading = false;
  host.error = null;
  host.data = data;
  return host.onCompleted(data);
};

const onMutationError = (host, error, mutationId) => {
  if (!isMostRecentMutation(host, mutationId)) return;
  host.loading = false;
  host.data = null;
  host.error = error;
  return host.onError(error);
};

const mutate = {
  get: host => async ({
    context = host.context,
    errorPolicy = host.errorPolicy,
    fetchPolicy = host.fetchPolicy,
    mutation = host.mutation,
    optimisticResponse = host.optimisticResponse,
    refetchQueries = host.refetchQueries,
    update = host.onUpdate,
    awaitRefetchQueries = host.awaitRefetchQueries,
    variables = host.variables,
  } = host) => {
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

const noop = () => undefined;
export const ApolloMutation = {
  client: clientFactory(),
  data: null,
  errorPolicy: 'none',
  ignoreResults: false,
  mostRecentMutationId: 0,
  mutate,
  mutation: mutationFactory(),
  onCompleted: { get: (_, last) => (last || noop), set: (_, v) => v },
  onError: { get: (_, last) => (last || noop), set: (_, v) => v },
  variables: variablesFactory(),
};
