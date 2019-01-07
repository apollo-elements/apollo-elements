import { expect } from '@open-wc/testing';
import gql from 'graphql-tag';

import isClientOperation from './is-client-operation';
/* eslint-disable max-len */

// ALL CLIENT operations
const queryClientDirective = { query: gql`query @client { foo }` };
const singleTopLevelClient = { query: gql`query { foo @client }` };
const singleTopLevelWithChildClient = { query: gql`query { foo @client { bar } }` };

// ALL NETWORK operations
const singleTopLevelNetwork = { query: gql`query { foo }` };
const singleTopLevelNonClient = { query: gql`query { foo @hasRole(role: admin) }` };

// MIXED operations
const mixedOp1 = { query: gql`query { foo bar @client }` };
const mixedOp2 = { query: gql`query { foo @hasRole(role: admin) bar @client }` };


describe('isClientOperation', function() {
  it('accepts All-Client Operations', function() {
    expect(isClientOperation(queryClientDirective), 'query @client {}').to.be.ok;
    expect(isClientOperation(singleTopLevelClient), 'Single top-level client directive').to.be.ok;
    expect(isClientOperation(singleTopLevelWithChildClient), 'Single top-level item with child level client directive').to.be.ok;
  });

  it('rejects All-Network Operations', function() {
    expect(isClientOperation(singleTopLevelNetwork), 'Single top-level network directive').to.not.be.ok;
    expect(isClientOperation(singleTopLevelNonClient), 'Single top-level non-client directive').to.not.be.ok;
  });

  it('rejects Mixed Operations', function() {
    expect(isClientOperation(mixedOp1), 'Rejects mixed operation with top-level members').to.not.be.ok;
    expect(isClientOperation(mixedOp2), 'Rejects mixed operation with directives').to.not.be.ok;
  });
});
