import type * as I from '@apollo-elements/core/types';
import type * as C from '@apollo/client/core';

import type { PropertyValues, TemplateResult } from 'lit';

import * as S from '@apollo-elements/test/schema';

import { assertType, isApolloError, stringify, TestableElement } from '@apollo-elements/test';

import { describeQuery, setupQueryClass } from '@apollo-elements/test/query.test';

import { makeClient } from '@apollo-elements/test';

import { defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { property } from 'lit/decorators.js';

import { html, unsafeStatic } from 'lit/static-html.js';

import { ApolloQuery } from './apollo-query';
import { LitElement } from 'lit';
import { NetworkStatus } from '@apollo/client/core';

import { spy, SinonSpy } from 'sinon';

class TestableApolloQuery<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloQuery<D, V> implements TestableElement {
  render() {
    return html`
      <output id="data">${stringify(this.data)}</output>
      <output id="error">${stringify(this.error)}</output>
      <output id="errors">${stringify(this.errors)}</output>
      <output id="loading">${stringify(this.loading)}</output>
      <output id="networkStatus">${stringify(this.networkStatus)}</output>
    `;
  }

  $(id: keyof this) {
    return this.shadowRoot!.getElementById(id as string);
  }

  async hasRendered() {
    await nextFrame();
    await this.updateComplete;
    return this;
  }
}

describe('[lit-apollo] ApolloQuery', function() {
  describeQuery({
    setupFunction: setupQueryClass(TestableApolloQuery),
    class: TestableApolloQuery,
  });

  describe('subclassing', function() {
    let el: ApolloQuery;
    beforeEach(async function subclass() {
      class Test extends ApolloQuery { }
      const tagName = defineCE(Test);
      el = await fixture<Test>(`<${tagName}></${tagName}>`);
    });

    it('produces an instance of LitElement', function() {
      expect(el).to.be.an.instanceOf(LitElement);
    });

    it('renders when data is set', async function rendersOnData() {
      class Test extends ApolloQuery<{ foo: string }> {
        render(): TemplateResult {
          return html`${this.data?.foo ?? 'FAIL'}`;
        }
      }

      const tagName = defineCE(Test);
      const tag = unsafeStatic(tagName);
      const element = await fixture<Test>(html`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
      expect(element).shadowDom.to.equal('bar');
    });

    it('calls onError', async function() {
      const s = spy();
      class Test extends ApolloQuery {
        client = makeClient();
        onError(err: Error) {
          s(err);
        }
      }

      const tagName = defineCE(Test);
      const tag = unsafeStatic(tagName);
      const element = await fixture<Test>(html`<${tag}></${tag}>`);
      await element.executeQuery({
        query: S.NullableParamQuery,
        variables: {
          nullable: 'error',
        },
      }).catch(() => null);
      expect(s).to.have.been.calledOnce;
    });

    it('polling', async function() {
      class Test extends ApolloQuery { }
      const tagName = defineCE(Test);
      const tag = unsafeStatic(tagName);
      const element = await fixture<Test>(html`<${tag}></${tag}>`);
      spy(element.controller, 'startPolling');
      spy(element.controller, 'stopPolling');
      element.startPolling(1000);
      expect(element.controller.startPolling).to.have.been.calledWith(1000);
      element.stopPolling();
      expect(element.controller.stopPolling).to.have.been.calledOnce;
      (element.controller.startPolling as SinonSpy).restore();
      (element.controller.stopPolling as SinonSpy).restore();
    });
    describe('with a class that defines observedAttributes with decorator', function() {
      class Test extends ApolloQuery {
        @property({ type: Number, attribute: 'x-a', reflect: true }) xA = 0;
      }

      let element: Test;

      beforeEach(async function subclass() {
        const tagName = defineCE(Test);
        element = await fixture<Test>(`<${tagName}></${tagName}>`);
      });

      it('preserves decorator behaviour', async function() {
        element.xA = 2;
        await element.updateComplete;
        expect(element.getAttribute('x-a'), 'setting property').to.equal('2');
        element.setAttribute('x-a', '1');
        expect(element.xA, 'setting attribute').to.equal(1);
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
    assertType<LitElement>                          (this);

    // ApolloElementInterface
    assertType<C.ApolloClient<C.NormalizedCacheObject>>(this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<C.DocumentNode>                      (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly I.GraphQLError[]>           (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly I.GraphQLError[]>         (this.error.graphQLErrors);

    // ApolloQueryInterface
    assertType<C.DocumentNode>                      (this.query!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<C.ErrorPolicy>                       (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<C.WatchQueryFetchPolicy>             (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    assertType<C.WatchQueryFetchPolicy|((...a: any[])=>any)>(this.nextFetchPolicy!);
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
    assertType<Partial<C.WatchQueryOptions<TypeCheckVars, TypeCheckData>>>          (this.options!);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloQuery<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}


class TypeCheckLit extends ApolloQuery {
  update(changed: PropertyValues<TypeCheckLit>) {
    changed.has('data');
    super.update(changed);
  }

  a() {
    this.requestUpdate('data', null);
  }
}
