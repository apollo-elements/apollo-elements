import { documentFactory } from './document.js';

export const subscriptionFactory = documentFactory({
  errorMessage: 'Subscription must be a gql-parsed DocumentNode',
});
