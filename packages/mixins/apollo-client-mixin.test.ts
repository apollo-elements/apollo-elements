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
import { assertType } from '@apollo-elements/test';

class QE<D extends TypedDocumentNode> extends ApolloQueryMixin(HTMLElement)<D> {}

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

const client = window.__APOLLO_CLIENT__!;

import * as FAST from '@apollo-elements/fast';
import { FASTElement } from '@microsoft/fast-element';

type D = TypedDocumentNode<{ a: 'a' }, { a: 'a' }>;
class TypeCheckFAST extends ApolloClientMixin(
  client,
  FAST.ApolloQuery
)<D> {
  check() {
    assertType<FASTElement>(this);
    assertType<ApolloElementElement>(this);
    assertType<QE<D>>(this);
    assertType<{ a: 'a' }>(this.data!);
    assertType<{ a: 'a' }>(this.variables!);
  }
}

import * as Gluon from '@apollo-elements/gluon';
import { GluonElement } from '@gluon/gluon';

class TypeCheckGluon extends ApolloClientMixin(client, Gluon.ApolloQuery)<D> {
  check() {
    assertType<GluonElement>(this);
    assertType<ApolloElementElement>(this);
    assertType<QE<D>>(this);
    assertType<{ a: 'a' }>(this.data!);
    assertType<{ a: 'a' }>(this.variables!);
  }
}
