import { expect } from '@open-wc/testing';
import { gql } from "@apollo/client";

import { isClientOperation } from './is-client-operation';
import { createOperation } from '@apollo/client/link/utils';

// ALL CLIENT operations
const queryClientDirective =
  createOperation({
    query: gql`
      query @client {
        foo
      }
    `,
  }, {} as any);

const singleTopLevelClient =
  createOperation({
    query: gql`
      query {
        foo @client
      }
    `,
  }, {} as any);

const singleTopLevelWithChildClient =
  createOperation({
    query: gql`
      query {
        foo {
          bar @client
        }
      }
    `,
  }, {} as any);

// ALL NETWORK operations
const singleTopLevelNetwork =
  createOperation({
    query: gql`
      query {
        foo
      }
    `,
  }, {} as any);

const singleTopLevelNonClient =
  createOperation({
    query: gql`
      query {
        foo @hasRole(role: admin)
      }
    `,
  }, {} as any);

// MIXED operations
const mixedOp1 =
  createOperation({
    query: gql`
      query {
        foo
        bar @client
      }
    `,
  }, {} as any);

const mixedOp2 =
  createOperation({
    query: gql`
      query {
        foo @hasRole(role: admin)
        bar @client
      }
    `,
  }, {} as any);

const deepButClient =
  createOperation({
    query: gql`
      query {
        foo @hasRole(role: admin) {
          bar {
            baz @client
            qux {
              quux @client
            }
          }
        }
      }
    `,
  }, {} as any);

const deepButMixed =
  createOperation({
    query: gql`
      query {
        foo @hasRole(role: admin) {
          bar {
            baz @client
            qux {
              quux @client
            }
          }

          jim
        }
      }
    `,
  }, {} as any);


describe('[lib] isClientOperation', function() {
  it('accepts All-Client Operations', function() {
    expect(isClientOperation(queryClientDirective), 'query @client {}').to.be.true;
    expect(isClientOperation(singleTopLevelClient), 'Single top-level client directive').to.be.true;
    expect(
      isClientOperation(singleTopLevelWithChildClient),
      'Single top-level item with child level client directive').to.be.true;
    expect(isClientOperation(deepButClient), 'Deeply nested all-client query').to.be.true;
  });

  it('rejects All-Network Operations', function() {
    expect(
      isClientOperation(singleTopLevelNetwork),
      'Single top-level network directive').to.be.false;
    expect(
      isClientOperation(singleTopLevelNonClient),
      'Single top-level non-client directive').to.be.false;
  });

  it('rejects Mixed Operations', function() {
    expect(
      isClientOperation(mixedOp1),
      'Rejects mixed operation with top-level members').to.be.false;
    expect(isClientOperation(mixedOp2), 'Rejects mixed operation with directives').to.be.false;
    expect(
      isClientOperation(deepButMixed),
      'Rejects deeply mixed operation with directives').to.be.false;
  });
});
