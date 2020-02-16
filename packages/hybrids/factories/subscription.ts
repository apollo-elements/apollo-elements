import { documentFactory } from './document';
import type { ApolloSubscription } from '@apollo-elements/mixins/apollo-subscription';

export const subscriptionFactory = documentFactory({
  errorMessage: 'Subscription must be a gql-parsed DocumentNode',
  onSet: (host: ApolloSubscription<unknown, unknown>) => host.subscribe(),
});
