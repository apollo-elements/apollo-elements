import isClientOperation from './is-client-operation';
import gql from 'graphql-tag';
import test from 'tape';

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


test('Accepts All-Client Operations', function(t) {
  t.ok(isClientOperation(queryClientDirective), 'query @client {}');
  t.ok(isClientOperation(singleTopLevelClient), 'Single top-level client directive');
  t.ok(isClientOperation(singleTopLevelWithChildClient), 'Single top-level item with child level client directive');
  t.end();
});

test('Rejects All-Network Operations', function(t) {
  t.notOk(isClientOperation(singleTopLevelNetwork), 'Single top-level network directive');
  t.notOk(isClientOperation(singleTopLevelNonClient), 'Single top-level non-client directive');
  t.end();
});

test('Rejects Mixed Operations', function(t) {
  t.notOk(isClientOperation(mixedOp1), 'Rejects mixed operation with top-level members');
  t.notOk(isClientOperation(mixedOp2), 'Rejects mixed operation with directives');
  t.end();
});
