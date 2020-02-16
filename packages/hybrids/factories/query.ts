import { documentFactory } from './document';

const errorMessage = 'Query must be a gql-parsed DocumentNode';

export const queryFactory = documentFactory({ errorMessage });
