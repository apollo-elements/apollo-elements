import type { ApolloElementElement } from '@apollo-elements/core/types';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';
import { defineCE, expect, fixtureSync } from '@open-wc/testing';
import { ApolloClientMixin } from './apollo-client-mixin';

import { ApolloQueryMixin } from './apollo-query-mixin';

class QE<D extends TypedDocumentNode<any, any>> extends ApolloQueryMixin(HTMLElement)<D> {}

describe('ApolloClientMixin', function() {
  let element: ApolloElementElement;
  let client: ApolloClient<NormalizedCacheObject>;
  describe('on an instanceof ApolloQueryElement', function() {
    beforeEach(function() {
      // @ts-expect-error: just testing the assignment;
      window.__APOLLO_CLIENT__ = {};
      client = new ApolloClient({ cache: new InMemoryCache() });
      class Test<D extends TypedDocumentNode> extends ApolloClientMixin(client, QE)<D> {}
      const tag = defineCE(Test);
      element = fixtureSync<Test<TypedDocumentNode>>(`<${tag}></${tag}>`);
    });

    beforeEach(() => element.controller.host.updateComplete);

    it('provides access to the client', function() {
      expect(element.client).to.equal(client);
    });

    it('ignores global apollo client', function() {
      expect(element.client).to.not.equal(window.__APOLLO_CLIENT__);
    });
  });
});
