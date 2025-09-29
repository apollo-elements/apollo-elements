import type * as I from '@apollo-elements/core/types';
import type * as C from '@apollo/client';

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

class TestableApolloSubscription<D, V extends C.OperationVariables = C.OperationVariables>
  extends ApolloSubscription<D, V> implements TestableElement {
  render(): TemplateResult {
    return html`
      <output id="data">${stringify(this.data)}</output>
      <output id="error">${stringify(this.error)}</output>
      <output id="loading">${stringify(this.loading)}</output>
    `;
  }

  $(id: string) { return this.shadowRoot?.getElementById(id) ?? null; }

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
      const tag = defineCE(class Sub extends TestableApolloSubscription<unknown> {});
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
      class Test extends ApolloSubscription<unknown> {
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
    this.offsetHeight; // HTMLElement
    this.updateComplete; // LitElement
    // Note: getResolvers removed in Apollo Client v4
    // this.client?.getResolvers(); // ApolloClient
    this.loading = true;
    this.document?.definitions.map(x => x.kind); // DocumentNode
    this.error?.stack;
    this.errors.map(x => x.locations?.map(y => y.column)); // GraphQLError
    this.data?.a === 'a';
    // @ts-expect-error: b as number type
    this.data?.b === 'b';

    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    // ApolloElementInterface
    assertType<Record<string, unknown>>             (this.context!);
    // Note: graphQLErrors removed in Apollo Client v4
    // if (isApolloError(this.error!))
    //   assertType<readonly I.GraphQLError[]>(this.error.graphQLErrors);

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
