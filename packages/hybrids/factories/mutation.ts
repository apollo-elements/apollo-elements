import { documentFactory } from './document';

export const mutationFactory = documentFactory({
  errorMessage: 'Mutation must be a gql-parsed DocumentNode',
});
