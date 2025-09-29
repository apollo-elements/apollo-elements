import type { ApolloElementElement } from '@apollo-elements/core/types';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { defineCE, expect, fixtureSync } from '@open-wc/testing';
import { ApolloClientMixin } from './apollo-client-mixin';

import { ApolloQueryMixin } from './apollo-query-mixin';

class QE<D extends TypedDocumentNode<any, any>> extends ApolloQueryMixin(HTMLElement)<D> {}

describe('ApolloClientMixin', function() {
  let element: ApolloElementElement;
  let client: ApolloClient;
  describe('on an instanceof ApolloQueryElement', function() {
    afterEach(function() {
      window.__APOLLO_CLIENT__ = undefined;
    });

    beforeEach(function() {
      // Create a simple schema for the instance client first
      const schema = makeExecutableSchema({
        typeDefs: 'type Query { test: String }',
        resolvers: { Query: { test: () => 'test' } }
      });
      const instanceCache = new InMemoryCache();
      client = new ApolloClient({
        cache: instanceCache,
        link: new SchemaLink({ schema }),
        name: 'instance-client',
        version: 'instance'
      });

      // Create a different global client after the instance client
      const globalSchema = makeExecutableSchema({
        typeDefs: 'type Query { global: String }',
        resolvers: { Query: { global: () => 'global' } }
      });
      const globalCache = new InMemoryCache();
      window.__APOLLO_CLIENT__ = new ApolloClient({
        cache: globalCache,
        link: new SchemaLink({ schema: globalSchema }),
        name: 'global-client',
        version: 'global'
      });

      class Test<D extends TypedDocumentNode> extends ApolloClientMixin(client, QE)<D> {}
      const tag = defineCE(Test);
      element = fixtureSync<Test<TypedDocumentNode>>(`<${tag}></${tag}>`);
    });

    beforeEach(() => element.controller.host.updateComplete);

    it('provides access to the client', function() {
      expect(element.client).to.equal(client);
    });

    it('verifies clients are different objects', function() {
      // First verify the objects we created are actually different
      expect(client, 'client should not be the global client').to.not.equal(window.__APOLLO_CLIENT__);
      expect(client === window.__APOLLO_CLIENT__, 'strict equality between clients').to.be.false;
    });

    it('ignores global apollo client', function() {
      expect(element.client, 'element.client should be the instance client').to.equal(client);
      expect(element.client, 'element.client should not be the global client').to.not.equal(window.__APOLLO_CLIENT__);
    });
  });
});
