import {
  ApolloClient,
  FetchPolicy,
  FetchResult,
  NetworkStatus,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import type {
  NonNullableParamSubscriptionData,
  NonNullableParamSubscriptionVariables,
  NoParamSubscriptionData,
  NoParamSubscriptionVariables,
  NullableParamSubscriptionData,
  NullableParamSubscriptionVariables,
} from '@apollo-elements/test-helpers/schema';

import type Sinon from 'sinon';

import gql from 'graphql-tag';

import {
  aTimeout, defineCE, expect, fixture,
  html as fhtml, nextFrame, unsafeStatic,
} from '@open-wc/testing';

import 'sinon-chai';

import { spy, stub } from 'sinon';

import { Observable } from '@apollo/client/core';

import {
  setupClient,
  teardownClient,
  isApolloError,
  assertType,
} from '@apollo-elements/test-helpers';

import { ApolloSubscriptionMixin } from './apollo-subscription-mixin';

import NoParamSubscription from '@apollo-elements/test-helpers/NoParam.subscription.graphql';
import NullableParamSubscription from '@apollo-elements/test-helpers/NullableParam.subscription.graphql';
import NonNullableParamSubscription from '@apollo-elements/test-helpers/NonNullableParam.subscription.graphql';

import {
  describeSubscription,
  setupSubscriptionClass,
  SubscriptionElement,
} from '@apollo-elements/test-helpers/subscription.test';

class Test<D = unknown, V = unknown>
  extends ApolloSubscriptionMixin(HTMLElement)<D, V>
  implements SubscriptionElement<D, V> {
  #data: D = null;

  #error: Error = null;

  #loading = false;

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = /* html */`
      <output id="data"></output>
      <output id="error"></output>
      <output id="loading"></output>
    `;
    return template;
  }

  $(id: keyof Test) { return this.shadowRoot.getElementById(id); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get data() { return this.#data; }

  set data(value: D) {
    this.#data = value;
    this.render();
  }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get error() { return this.#error; }

  set error(value: Error) {
    this.#error = value;
    this.render();
  }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get loading() { return this.#loading; }

  set loading(value: boolean) {
    this.#loading = value;
    this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(Test.template.content.cloneNode(true));
  }

  render() {
    this.$('data').textContent = this.stringify(this.data);
    this.$('error').textContent = this.stringify(this.error);
    this.$('loading').textContent = this.stringify(this.loading);
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered() {
    await nextFrame();
    return this;
  }
}

describe('[mixins] ApolloSubscriptionMixin', function describeApolloSubscriptionMixin() {
  describeSubscription({
    class: Test,
    setupFunction: setupSubscriptionClass(Test),
  });

  describe('subclassing', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    it('returns an instance of the superclass', async function returnsClass() {
      const tag = unsafeStatic(defineCE(class extends Test {}));
      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      expect(element).to.be.an.instanceOf(HTMLElement);
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends Test<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

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
