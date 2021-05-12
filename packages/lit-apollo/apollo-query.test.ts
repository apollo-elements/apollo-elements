import type { PropertyValues, TemplateResult } from 'lit';

import type * as I from '@apollo-elements/interfaces';

import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  WatchQueryFetchPolicy,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import { assertType, isApolloError } from '@apollo-elements/test';

import { describeQuery, setupQueryClass } from '@apollo-elements/test/query.test';

import { defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { property } from 'lit/decorators.js';

import { html, unsafeStatic } from 'lit/static-html.js';

import { ApolloQuery } from './apollo-query';
import { LitElement } from 'lit';
import { NetworkStatus } from '@apollo/client/core';

class TestableApolloQuery<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloQuery<D, V> {
  render() {
    return html`
      <output id="data">${this.stringify(this.data)}</output>
      <output id="error">${this.stringify(this.error)}</output>
      <output id="errors">${this.stringify(this.errors)}</output>
      <output id="loading">${this.stringify(this.loading)}</output>
      <output id="networkStatus">${this.stringify(this.networkStatus)}</output>
    `;
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered() {
    await nextFrame();
    await this.updateComplete;
    return this;
  }
}

const setupFunction = setupQueryClass(TestableApolloQuery);

describe('[lit-apollo] ApolloQuery', function() {
  describeQuery({ setupFunction, class: TestableApolloQuery });

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
    assertType<ApolloClient<NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
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
    assertType<Partial<WatchQueryOptions<TypeCheckVars, TypeCheckData>>>          (this.options!);

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


class TypeCheckLit extends ApolloQuery {
  update(changed: PropertyValues<TypeCheckLit>) {
    changed.has('data');
    super.update(changed);
  }

  a() {
    this.requestUpdate('data', null);
  }
}
