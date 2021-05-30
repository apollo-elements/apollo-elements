import type * as I from '@apollo-elements/interfaces';
import type * as C from '@apollo/client/core';

import { defineCE, expect, fixture } from '@open-wc/testing';

import { html as h, unsafeStatic } from 'lit/static-html.js';

import { ApolloSubscription } from './apollo-subscription';
import { LitElement, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import { assertType, isApolloError, stringify, TestableElement } from '@apollo-elements/test';

import {
  describeSubscription,
  setupSubscriptionClass,
} from '@apollo-elements/test/subscription.test';

class TestableApolloSubscription<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloSubscription<D, V>
  implements TestableElement {
  render(): TemplateResult {
    return html`
      <output id="data">${stringify(this.data)}</output>
      <output id="error">${stringify(this.error)}</output>
      <output id="loading">${stringify(this.loading)}</output>
    `;
  }

  $(id: keyof this) { return this.shadowRoot?.getElementById(id as string) ?? null; }

  async hasRendered() {
    await this.updateComplete;
    return this;
  }
}

describe('[lit-apollo] ApolloSubscription', function describeApolloSubscription() {
  describeSubscription({
    class: TestableApolloSubscription,
    setupFunction: setupSubscriptionClass(TestableApolloSubscription),
  });

  describe('subclassing', function() {
    it('is an instance of LitElement', async function() {
      const tag = defineCE(class Sub extends TestableApolloSubscription {});
      const el = await fixture(`<${tag}></${tag}>`);
      expect(el).to.be.an.instanceOf(LitElement);
    });

    it('renders when data is set', async function rendersOnData() {
      class Test extends ApolloSubscription<{ foo: string }> {
        render(): TemplateResult {
          return html`${this.data?.foo ?? 'FAIL'}`;
        }
      }

      const tagName = defineCE(Test);
      const tag = unsafeStatic(tagName);
      const element = await fixture<Test>(h`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
      expect(element).shadowDom.to.equal('bar');
    });

    describe('with a class that defines observedAttributes with decorator', function() {
      class Test extends ApolloSubscription {
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
        expect(element.getAttribute('x-a')).to.equal('2');
        element.setAttribute('x-a', '1');
        expect(element.xA).to.equal(1);
      });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloSubscription<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<LitElement>                          (this);

    // ApolloElementInterface
    assertType<C.ApolloClient<C.NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<C.DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly I.GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly I.GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloSubscriptionInterface
    assertType<C.DocumentNode>                          (this.subscription!);
    assertType<TypeCheckVars>                         (this.variables!);
    assertType<C.ErrorPolicy>                           (this.errorPolicy!);
    assertType<C.FetchPolicy>                           (this.fetchPolicy!);
    assertType<string>                                (this.fetchPolicy);
    assertType<boolean>                               (this.notifyOnNetworkStatusChange!);
    assertType<number>                                (this.pollInterval!);
    assertType<boolean>                               (this.skip);
    assertType<boolean>                               (this.noAutoSubscribe);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloSubscription<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
