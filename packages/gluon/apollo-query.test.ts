import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  WatchQueryFetchPolicy,
  NormalizedCacheObject,
  TypedDocumentNode,
  WatchQueryOptions,
} from '@apollo/client/core';

import type { QueryElement } from '@apollo-elements/test/query.test';

import type * as I from '@apollo-elements/interfaces';

import { NetworkStatus } from '@apollo/client/core';

import { assertType, isApolloError } from '@apollo-elements/test';

import { ApolloQuery } from './apollo-query';

import { html } from 'lit-html';

import { describeQuery, setupQueryClass } from '@apollo-elements/test/query.test';

import { defineCE, aTimeout, expect, fixture, nextFrame } from '@open-wc/testing';

import { spy } from 'sinon';

import { GluonElement } from '@gluon/gluon';

class TestableApolloQuery<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloQuery<D, V>
  implements QueryElement<D, V> {
  static get is() {
    return 'apollo-query';
  }

  declare shadowRoot: ShadowRoot;

  get template() {
    return html`
      <output id="data">${this.stringify(this.data)}</output>
      <output id="error">${this.stringify(this.error)}</output>
      <output id="errors">${this.stringify(this.errors)}</output>
      <output id="loading">${this.stringify(this.loading)}</output>
      <output id="networkStatus">${this.stringify(this.networkStatus)}</output>
    `;
  }

  $(id: keyof TestableApolloQuery<D, V>) { return this.shadowRoot.getElementById(id as string); }

  stringify(x: unknown) { return JSON.stringify(x, null, 2); }

  async hasRendered(): Promise<TestableApolloQuery<D, V>> {
    await nextFrame();
    await this.render();
    await aTimeout(50);
    return this;
  }
}

describe('[gluon] ApolloQuery', function() {
  describeQuery({
    class: TestableApolloQuery,
    setupFunction: setupQueryClass(TestableApolloQuery),
  });

  describe('subclassing', function() {
    let element: ApolloQuery;
    beforeEach(async function() {
      const tag = defineCE(class extends ApolloQuery {
        static get is() {
          return 'apollo-query';
        }
      });
      element = await fixture<ApolloQuery>(`<${tag}></${tag}>`);
      spy(element, 'render');
    });

    afterEach(function() {
      // @ts-expect-error: testing
      element.render.restore();
    });

    describe('setting networkStatus', function() {
      beforeEach(function() {
        element.networkStatus = 0;
      });

      it('renders', function() {
        expect(element.render).to.have.been.called;
      });

      it('caches', function() {
        expect(element.networkStatus).to.equal(0);
      });
    });
  });
});


type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloQuery<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<GluonElement>                        (this);

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly I.GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly I.GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloQueryInterface
    assertType<DocumentNode>                        (this.query!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<WatchQueryFetchPolicy>               (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    if (typeof this.nextFetchPolicy !== 'function')
      assertType<WatchQueryFetchPolicy>             (this.nextFetchPolicy!);
    assertType<NetworkStatus>                       (this.networkStatus);
    assertType<number>                              (this.networkStatus);
    // @ts-expect-error: NetworkStatus is not a string
    assertType<string>                              (this.networkStatus);
    assertType<boolean>                             (this.notifyOnNetworkStatusChange!);
    assertType<number>                              (this.pollInterval!);
    assertType<boolean>                             (this.partial!);
    assertType<boolean>                             (this.partialRefetch!);
    assertType<boolean>                             (this.returnPartialData!);
    assertType<boolean>                             (this.noAutoSubscribe);
    assertType<Partial<WatchQueryOptions<TypeCheckVars, TypeCheckData>>>(this.options!);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloQuery<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
