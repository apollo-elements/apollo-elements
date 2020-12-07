import { ApolloElementElement } from '@apollo-elements/interfaces';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { defineCE, expect, fixtureSync } from '@open-wc/testing';
import { ApolloClientMixin } from './apollo-client-mixin';

describe('ApolloClientMixin', function() {
  let element: ApolloElementElement;
  let client: ApolloClient<NormalizedCacheObject>;
  beforeEach(function() {
    // @ts-expect-error: just testing the assignment;
    window.__APOLLO_CLIENT__ = {};
    client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({ uri: '/graphql' }),
    });
    class Test extends ApolloClientMixin(client, ApolloElementElement) {}
    const tag = defineCE(Test);
    element = fixtureSync<Test>(`<${tag}></${tag}>`);
  });

  it('provides access to the client', function() {
    expect(element.client).to.equal(client);
  });

  it('ignores global apollo client', function() {
    expect(element.client).to.not.equal(window.__APOLLO_CLIENT__);
  });
});
