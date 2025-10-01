import * as C from '@apollo/client';
import type * as I from '@apollo-elements/core/types';

import * as S from '@apollo-elements/test/schema';

import { NetworkStatus } from '@apollo/client';

import { assertType, isApolloError, stringify, TestableElement } from '@apollo-elements/test';

import { ApolloQuery } from './apollo-query';

import { html } from 'lit-html';

import { describeQuery, setupQueryClass } from '@apollo-elements/test/query.test';

import { defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { spy, SinonSpy } from 'sinon';

import { GluonElement } from '@gluon/gluon';

class TestableApolloQuery<D, V = I.VariablesOf<D>>
  extends ApolloQuery<D, V>
  implements TestableElement {
  static get is() { return 'apollo-query'; }

  declare shadowRoot: ShadowRoot;

  get template() {
    return html`
      <output id="data">${stringify(this.data)}</output>
      <output id="error">${stringify(this.error)}</output>
      <output id="errors">${stringify(this.errors)}</output>
      <output id="loading">${stringify(this.loading)}</output>
      <output id="networkStatus">${stringify(this.networkStatus)}</output>
    `;
  }

  async render() {
    // For gluon, manually render template to DOM
    const { render } = await import('lit-html');
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    render(this.template, this.shadowRoot!);
  }

  $(id: string) {
    // Try both shadowRoot and lightDOM for gluon elements
    return this.shadowRoot?.getElementById(id) || this.querySelector(`#${id}`);
  }

  async hasRendered(): Promise<this> {
    await this.updateComplete;
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
        static get is() { return 'apollo-query'; }

        async render() {
          // Minimal render implementation for subclassing test
          return Promise.resolve();
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
        element.networkStatus = C.NetworkStatus.ready;
      });

      beforeEach(() => element.updateComplete);
      it('renders', function() {
        expect(element.render).to.have.been.called;
      });

      it('caches', function() {
        expect(element.networkStatus).to.equal(C.NetworkStatus.ready);
      });
    });

    describe('setting query to NullableParamQuery', function() {
      beforeEach(function() {
        element.query = S.NullableParamQuery;
      });

      beforeEach(nextFrame);

      beforeEach(function() {
        spy(element.controller, 'subscribe');
      });

      afterEach(function() {
        (element.controller.subscribe as SinonSpy).restore();
      });

      it('sets query on the controller', function() {
        expect(element.controller.query)
          .to.equal(element.document, 'element.document').and
          .to.equal(element.controller.document, 'element.controller.document').and
          .to.equal(element.query, 'element.query').and
          .to.equal(S.NullableParamQuery, 'S.NullableParamQuery');
      });
    });
  });

  describe('subclassing with query', function() {
    let element: ApolloQuery;
    beforeEach(async function() {
      const tag = defineCE(class extends ApolloQuery {
        static get is() { return 'apollo-query'; }
        query = S.NullableParamQuery;

        async render() {
          // Minimal render implementation for subclassing with query test
          return Promise.resolve();
        }
      });
      element = await fixture<ApolloQuery>(`<${tag}></${tag}>`);
    });

    beforeEach(nextFrame);

    it('sets query on the controller', function() {
      expect(element.controller.query)
        .to.equal(element.document, 'element.document').and
        .to.equal(element.controller.document, 'element.controller.document').and
        .to.equal(element.query, 'element.query').and
        .to.equal(S.NullableParamQuery, 'S.NullableParamQuery');
    });
  });
});


type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloQuery<TypeCheckData, TypeCheckVars> {
  typeCheck() {
     

    assertType<HTMLElement>                         (this);
    assertType<GluonElement>                        (this);

    // ApolloElementInterface
    assertType<C.ApolloClient>(this.client!);
    assertType<Record<string, unknown>>                 (this.context!);
    assertType<boolean>                                 (this.loading);
    assertType<C.DocumentNode>                          (this.document!);
    assertType<Error>                                   (this.error!);
    assertType<readonly I.GraphQLError[]>               (this.errors!);
    assertType<TypeCheckData>                           (this.data!);
    assertType<string>                                  (this.error.message);
    assertType<'a'>                                     (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                     (this.data.b);
    if (isApolloError(this.error))
      // Note: graphQLErrors removed in Apollo Client v4
      // assertType<readonly I.GraphQLError[]>(this.error.graphQLErrors);

    // ApolloQueryInterface
    assertType<C.DocumentNode>                          (this.query!);
    assertType<TypeCheckVars>                           (this.variables!);
    assertType<C.ErrorPolicy>                           (this.errorPolicy!);
    assertType<string>                                  (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                                  (this.errorPolicy);
    assertType<C.WatchQueryFetchPolicy>                 (this.fetchPolicy!);
    assertType<string>                                  (this.fetchPolicy);
    if (typeof this.nextFetchPolicy !== 'function')
      assertType<C.WatchQueryFetchPolicy>               (this.nextFetchPolicy!);
    assertType<NetworkStatus>                           (this.networkStatus);
    assertType<number>                                  (this.networkStatus);
    // @ts-expect-error: NetworkStatus is not a string
    assertType<string>                                  (this.networkStatus);
    // Note: notifyOnNetworkStatusChange removed in Apollo Client v4
    // assertType<boolean>(this.notifyOnNetworkStatusChange!);
    assertType<number>                                  (this.pollInterval!);
    assertType<boolean>                                 (this.partial!);
    // Note: partialRefetch removed in Apollo Client v4
    // assertType<boolean>(this.partialRefetch!);
    // Note: returnPartialData removed in Apollo Client v4
    // assertType<boolean>(this.returnPartialData!);
    assertType<boolean>                                 (this.noAutoSubscribe);
    assertType<Partial<C.WatchQueryOptions<TypeCheckVars, TypeCheckData>>>(this.options!);

     
  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloQuery<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
