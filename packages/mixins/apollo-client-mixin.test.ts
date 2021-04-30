import { ApolloElementElement, ApolloQueryElement } from '@apollo-elements/interfaces';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { defineCE, expect, fixtureSync } from '@open-wc/testing';
import { ApolloClientMixin } from './apollo-client-mixin';

import { assertType } from '@apollo-elements/test';

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

const client = window.__APOLLO_CLIENT__!;

import * as FAST from '@apollo-elements/fast';
import { FASTElement } from '@microsoft/fast-element';

class TypeCheckFAST extends ApolloClientMixin(client, FAST.ApolloQuery)<string, number> {
  check() {
    assertType<FASTElement>(this);
    assertType<ApolloElementElement>(this);
    assertType<ApolloQueryElement<string, number>>(this);
    assertType<string>(this.data!);
    assertType<number>(this.variables!);
  }
}

import * as Gluon from '@apollo-elements/gluon';
import { GluonElement } from '@gluon/gluon';

class TypeCheckGluon extends ApolloClientMixin(client, Gluon.ApolloQuery)<string, number> {
  check() {
    assertType<GluonElement>(this);
    assertType<ApolloElementElement>(this);
    assertType<ApolloQueryElement<string, number>>(this);
    assertType<string>(this.data!);
    assertType<number>(this.variables!);
  }
}
