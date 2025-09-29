import type * as I from '@apollo-elements/core/types';
import { defineCE, expect, fixtureSync } from '@open-wc/testing';
import { TypePoliciesMixin } from './type-policies-mixin';
import { ApolloQueryMixin } from './apollo-query-mixin';
import { setupClient, teardownClient } from '@apollo-elements/test';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

describe('TypePoliciesMixin', function() {
  class Base<D, V = I.VariablesOf<D>>
    extends TypePoliciesMixin(ApolloQueryMixin(HTMLElement))<D, V> { }

  let element: Base<unknown>;

  const query = gql`{
    hello
  }`;

  describe('with typePolicies set on the instance', function() {
    beforeEach(function() {
      // Create a test schema that returns null for hello, so we can test type policies override
      const schema = makeExecutableSchema({
        typeDefs: 'type Query { hello: String }',
        resolvers: { Query: { hello: () => null } }
      });

      // Create client with Apollo Client v4 compatible setup
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: new SchemaLink({ schema }),
      });

      window.__APOLLO_CLIENT__ = client;

      class Test extends Base<unknown> {
        typePolicies = {
          Query: {
            fields: {
              hello() {
                return 'hello from type policy';
              },
            },
          },
        };
      }
      const tag = defineCE(Test);
      element = fixtureSync<Test>(`<${tag}></${tag}>`);
    });

    afterEach(function() {
      window.__APOLLO_CLIENT__ = undefined;
    });

    it('adds typePolicies to the cache', async function() {
      // Wait for element to connect and apply type policies
      await element.updateComplete;

      const result = await element.client!.query({ query });
      expect(result.data).to.deep.equal({ hello: 'hello from type policy' });
    });
  });
});
