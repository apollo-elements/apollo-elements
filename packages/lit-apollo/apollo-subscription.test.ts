import type {
  ApolloClient,
  FetchPolicy,
  FetchResult,
  Observable,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import { defineCE, fixture, expect, html } from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import { LitElement, TemplateResult } from 'lit-element';
import { assertType, isApolloError } from '@apollo-elements/test-helpers';

import type { SubscriptionElement } from '@apollo-elements/test-helpers/subscription.test';
import {
  describeSubscription,
  setupSubscriptionClass,
} from '@apollo-elements/test-helpers/subscription.test';

class TestableApolloSubscription<D = unknown, V = unknown>
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
    assertType<ApolloClient<NormalizedCacheObject>> (this.client);
    assertType<Record<string, unknown>>             (this.context);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document);
    assertType<Error>                               (this.error);
    assertType<readonly GraphQLError[]>             (this.errors);
    assertType<TypeCheckData>                       (this.data);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloSubscriptionInterface
    assertType<DocumentNode>                          (this.subscription);
    assertType<TypeCheckVars>                         (this.variables);
    assertType<FetchPolicy>                           (this.fetchPolicy);
    assertType<string>                                (this.fetchPolicy);
    assertType<boolean>                               (this.notifyOnNetworkStatusChange);
    assertType<number>                                (this.pollInterval);
    assertType<boolean>                               (this.skip);
    assertType<boolean>                               (this.noAutoSubscribe);
    assertType<Observable<FetchResult<TypeCheckData>>>(this.observable);
    assertType<ZenObservable.Subscription>            (this.observableSubscription);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}
