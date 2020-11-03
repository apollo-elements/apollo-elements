import type {
  ApolloClient,
  ApolloError,
  FetchPolicy,
  FetchResult,
  Observable,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import { html } from 'lit-html';

import { nextFrame } from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import { assertType, isApolloError } from '@apollo-elements/test-helpers';

import {
  describeSubscription,
  setupSubscriptionClass,
  SubscriptionElement,
} from '@apollo-elements/test-helpers/subscription.test';

import { GluonElement } from '@gluon/gluon';

class TestableApolloSubscription<D = unknown, V = unknown>
  extends ApolloSubscription<D, V>
  implements SubscriptionElement<D, V> {
  static get is() { return 'gluon-test-subscription-element'; }

  #data: D = null;

  #error: ApolloError = null;

  #loading = false;

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get data() { return this.#data; }

  set data(v: D) { this.#data = v; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get error() { return this.#error; }

  set error(v: ApolloError) { this.#error = v; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get loading() { return this.#loading; }

  set loading(v: boolean) { this.#loading = v; this.render(); }

  get template() {
    return html`
      <output id="data">${this.stringify(this.data)}</output>
      <output id="error">${this.stringify(this.error)}</output>
      <output id="loading">${this.stringify(this.loading)}</output>
    `;
  }

  $(id: keyof TestableApolloSubscription<D, V>) { return this.shadowRoot.getElementById(id); }

  stringify(x: unknown) { return JSON.stringify(x, null, 2); }

  async hasRendered() {
    await nextFrame();
    await this.render();
    return this;
  }
}

describe('[gluon] ApolloSubscription', function() {
  describeSubscription({
    class: TestableApolloSubscription,
    setupFunction: setupSubscriptionClass(TestableApolloSubscription),
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloSubscription<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<GluonElement>                        (this);

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
