import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  Observable,
  OperationVariables,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { GraphQLError } from '@apollo-elements/interfaces';

import {
  defineCE,
  fixture,
  expect,
  html as fhtml,
  unsafeStatic,
} from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import { LitElement, TemplateResult, html } from 'lit-element';
import { property } from 'lit-element/lib/decorators';
import { assertType, isApolloError } from '@apollo-elements/test';

import type { SubscriptionElement } from '@apollo-elements/test/subscription.test';
import {
  describeSubscription,
  setupSubscriptionClass,
} from '@apollo-elements/test/subscription.test';

class TestableApolloSubscription<D = unknown, V = OperationVariables>
  extends ApolloSubscription<D, V>
  implements SubscriptionElement<D, V> {
  render(): TemplateResult {
    return html`
      <output id="data">${this.stringify(this.data)}</output>
      <output id="error">${this.stringify(this.error)}</output>
      <output id="loading">${this.stringify(this.loading)}</output>
    `;
  }

  stringify(x: unknown) { return JSON.stringify(x, null, 2); }

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
      const element = await fixture<Test>(fhtml`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
      expect(element).shadowDom.to.equal('bar');
    });

    describe('with a class that defines observedAttributes with decorator', function() {
      class Test extends ApolloSubscription<unknown, unknown> {
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
    assertType<ApolloClient<NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloSubscriptionInterface
    assertType<DocumentNode>                          (this.subscription!);
    assertType<TypeCheckVars>                         (this.variables!);
    assertType<ErrorPolicy>                           (this.errorPolicy!);
    assertType<FetchPolicy>                           (this.fetchPolicy!);
    assertType<string>                                (this.fetchPolicy);
    assertType<boolean>                               (this.notifyOnNetworkStatusChange!);
    assertType<number>                                (this.pollInterval!);
    assertType<boolean>                               (this.skip);
    assertType<boolean>                               (this.noAutoSubscribe);
    assertType<Observable<FetchResult<TypeCheckData>>>(this.observable!);
    assertType<ZenObservable.Subscription>            (this.observableSubscription!);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloSubscription<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
