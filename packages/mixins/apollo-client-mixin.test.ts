import { ApolloElementElement, ApolloQueryElement } from '@apollo-elements/interfaces';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { defineCE, expect, fixtureSync } from '@open-wc/testing';
import { ApolloClientMixin } from './apollo-client-mixin';

import { assertType } from '@apollo-elements/test';

describe('ApolloClientMixin', function() {
  let element: ApolloElementElement;
  let client: ApolloClient<NormalizedCacheObject>;
  describe('on an instanceof ApolloQueryElement', function() {
    beforeEach(function() {
      // @ts-expect-error: just testing the assignment;
      window.__APOLLO_CLIENT__ = {};
      client = new ApolloClient({ cache: new InMemoryCache() });
      class Test extends ApolloClientMixin(client, ApolloQueryElement) {}
      const tag = defineCE(Test);
      element = fixtureSync<Test>(`<${tag}></${tag}>`);
    });

    beforeEach(() => element.updateComplete);

    it('provides access to the client', function() {
      expect(element.client).to.equal(client);
    });

    it('ignores global apollo client', function() {
      expect(element.client).to.not.equal(window.__APOLLO_CLIENT__);
    });
  });
});

const client = window.__APOLLO_CLIENT__!;

import * as FAST from '@apollo-elements/fast';
import { FASTElement } from '@microsoft/fast-element';

type Data = { a: 'a' }
class TypeCheckFAST extends ApolloClientMixin(client, FAST.ApolloQuery)<Data, Data> {
  check() {
    assertType<FASTElement>(this);
    assertType<ApolloElementElement>(this);
    assertType<ApolloQueryElement<Data, Data>>(this);
    assertType<Data>(this.data!);
    assertType<Data>(this.variables!);
  }
}

import * as Gluon from '@apollo-elements/gluon';
import { GluonElement } from '@gluon/gluon';

class TypeCheckGluon extends ApolloClientMixin(client, Gluon.ApolloQuery)<Data, Data> {
  check() {
    assertType<GluonElement>(this);
    assertType<ApolloElementElement>(this);
    assertType<ApolloQueryElement<Data, Data>>(this);
    assertType<Data>(this.data!);
    assertType<Data>(this.variables!);
  }
}
