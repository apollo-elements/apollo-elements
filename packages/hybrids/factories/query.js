import { documentFactory } from './document.js';

const errorMessage = 'Query must be a gql-parsed DocumentNode';

export const queryFactory = documentFactory({ errorMessage });
