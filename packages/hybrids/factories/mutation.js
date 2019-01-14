import { documentFactory } from './document.js';

export const mutationFactory = documentFactory({
  errorMessage: 'Mutation must be a gql-parsed DocumentNode',
});
