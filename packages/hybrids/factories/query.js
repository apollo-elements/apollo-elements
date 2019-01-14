import { documentFactory } from './document.js';

export const queryFactory = documentFactory({
  errorMessage: 'Query must be a gql-parsed DocumentNode',
  onSet: host => !host.noAutoSubscribe && host.subscribe(),
});
