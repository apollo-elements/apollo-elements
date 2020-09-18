import type {
  ApolloClient,
  FetchPolicy,
  FetchResult,
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

import { aTimeout, defineCE, expect, fixture, html as fhtml, unsafeStatic } from '@open-wc/testing';

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

class Test<D = unknown, V = unknown> extends ApolloSubscriptionMixin(HTMLElement)<D, V> { }

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends Test<TypeCheckData, TypeCheckVars> {
  render() {
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

describe('[mixins] ApolloSubscriptionMixin', function describeApolloSubscriptionMixin() {
  beforeEach(setupClient);
  afterEach(teardownClient);

  it('returns an instance of the superclass', async function returnsClass() {
    const tag = unsafeStatic(defineCE(class extends Test {}));
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    expect(element).to.be.an.instanceOf(HTMLElement);
  });

  it('sets default properties', async function setsDefaultProperties() {
    const tag = unsafeStatic(defineCE(class extends Test { }));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    expect(element.data, 'data').to.be.null;
    expect(element.variables, 'variables').to.be.null;
    expect(element.subscription, 'subscription').to.be.null;
    expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
    expect(element.fetchResults, 'fetchResults').to.be.undefined;
    expect(element.pollInterval, 'pollInterval').to.be.undefined;
    expect(element.onSubscriptionData, 'onSubscriptionData').to.be.undefined;
    expect(element.onError, 'onError').to.be.undefined;
    expect(element.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange').to.be.false;
    expect(element.observable, 'observableQuery').to.be.undefined;
  });

  describe('subscription property', function describeSubscription() {
    it('accepts a script child', async function scriptChild() {
      class StubbedClass extends Test {}

      spy(StubbedClass.prototype, 'subscribe');

      const script = `
        subscription NoParamSubscription {
          messageSent {
            message
          }
        }
      `;

      const tag = unsafeStatic(defineCE(StubbedClass));

      const el = await fixture<StubbedClass>(fhtml`
        <${tag}>
          <script type="application/graphql">${script}</script>
        </${tag}>`);

      expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
      expect(el.subscription).to.deep.equal(gql(script));
      expect(el.subscribe).to.have.been.called;
    });

    it('accepts a DocumentNode', async function() {
      type D = NoParamSubscriptionData;
      type V = NoParamSubscriptionVariables;
      const subscription = NoParamSubscription;
      const tag = unsafeStatic(defineCE(class extends Test<D, V> {}));
      const el = await fixture<Test<D, V>>(fhtml`<${tag}></${tag}>`);

      el.subscription = subscription;
      expect(el.subscription).to.equal(subscription);
    });

    it('rejects a non-DocumentNode', async function() {
      const tag = unsafeStatic(defineCE(class extends Test {}));

      const subscription = `subscription { foo }`;
      const el = await fixture<Test>(fhtml`<${tag}></${tag}>`);
      // @ts-expect-error: we're testing the error
      expect(() => el.subscription = subscription)
        .to.throw('Subscription must be a gql-parsed DocumentNode');
      expect(el.subscription).to.not.be.ok;
    });

    it('calls subscribe if subscription not yet initialized', async function() {
      const tag = unsafeStatic(defineCE(class extends Test { }));

      const el =
        await fixture<Test>(fhtml`
          <${tag}></${tag}>
        `);

      const subscribeStub = stub(el, 'subscribe');
      const subscription = gql`subscription { foo }`;
      el.subscription = subscription;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe if subscription already initialized', async function() {
      type D = NullableParamSubscriptionData;
      type V = NullableParamSubscriptionVariables;

      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        subscription = NullableParamSubscription;

        variables = { nullable: 'qux' };
      }));

      const el =
        await fixture<Test<D, V>>(fhtml`
          <${tag}></${tag}>
        `);

      const subscribeStub = stub(el, 'subscribe');

      el.variables = { nullable: 'quux' };

      expect(subscribeStub).to.not.have.been.calledTwice;
    });

    it('does not call subscribe if subscription is falsy', async function() {
      const tag = unsafeStatic(defineCE(class extends Test {
        subscription = null;

        variables = { bar: 'qux' };
      }));

      const el =
        await fixture<Test>(fhtml`
          <${tag}></${tag}>
        `);

      const subscribeStub = stub(el, 'subscribe');
      el.variables = { bar: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
    });
  });

  describe('variables property', function describeVariables() {
    it('calls subscribe when element has not yet initialized the subscription', async function() {
      type D = NullableParamSubscriptionData;
      type V = NullableParamSubscriptionVariables;

      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        subscription = NullableParamSubscription;

        variables = { nullable: 'qux' };
      }));

      const el =
        await fixture<Test<D, V>>(fhtml`
          <${tag}></${tag}>
        `);

      const subscribeStub = stub(el, 'subscribe');
      el.variables = { nullable: 'qux' };
      expect(subscribeStub).to.have.been.called;
    });

    it(
      'does not call subscribe when element already initialized the subscription',
      async function() {
      type D = NullableParamSubscriptionData;
      type V = NullableParamSubscriptionVariables;

      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        subscription = NullableParamSubscription;

        variables = { nullable: 'qux' };
      }));

      const el =
        await fixture<Test<D, V>>(fhtml`
          <${tag}></${tag}>
        `);

      const subscribeStub = stub(el, 'subscribe');
      el.variables = { nullable: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
      });
  });

  describe('subscribe', function describeSubscribe() {
    let clientSubscribeSpy: Sinon.SinonSpy;

    beforeEach(function() {
      clientSubscribeSpy = spy(window.__APOLLO_CLIENT__, 'subscribe');
    });

    afterEach(function() {
      clientSubscribeSpy.restore();
      clientSubscribeSpy = undefined;
    });

    it('creates an observable', async function createsObservable() {
      type D = NullableParamSubscriptionData;
      type V = NullableParamSubscriptionVariables;

      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        subscription = NullableParamSubscription;
      }));

      const el =
        await fixture<Test<D, V>>(fhtml`
          <${tag}></${tag}>
        `);

      el.variables = { nullable: 'quux' };
      el.subscribe();
      expect(el.observable).to.be.an.instanceof(Observable);
    });

    it('does nothing when there are not enough variables', async function notEnoughVariables() {
      type D = NonNullableParamSubscriptionData;
      type V = NonNullableParamSubscriptionVariables;

      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        subscription = NonNullableParamSubscription;
      }));

      const el =
        await fixture<Test<D, V>>(fhtml`
          <${tag}></${tag}>
        `);

      // @ts-expect-error: testing the case without enough variables
      el.variables = {};

      el.subscribe();

      await aTimeout(100);

      expect(el.data).to.be.null;
    });

    it('can take a specific fetchPolicy', async function specificFetchPolicy() {
      type D = NullableParamSubscriptionData;
      type V = NullableParamSubscriptionVariables;

      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        noAutoSubscribe = true;

        subscription = NullableParamSubscription;

        variables = { nullable: 'quux' };
      }));

      const el =
        await fixture<Test<D, V>>(fhtml`
          <${tag}></${tag}>
        `);

      const fetchPolicy = 'cache-only';

      el.subscribe({ fetchPolicy });

      expect(clientSubscribeSpy).to.have.been.calledWithMatch({ fetchPolicy });
    });

    it('uses fetchPolicy set on the element', async function specificFetchPolicy() {
      type D = NullableParamSubscriptionData;
      type V = NullableParamSubscriptionVariables;

      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        noAutoSubscribe = true;

        subscription = NullableParamSubscription;

        fetchPolicy = 'cache-only' as const;

        variables = { nullable: 'quux' }
      }));

      const el =
        await fixture<Test<D, V>>(fhtml`
          <${tag}></${tag}>
        `);

      el.subscribe();

      expect(clientSubscribeSpy).to.have.been.calledWithMatch({ fetchPolicy: 'cache-only' });
    });

    it('defaults to fetchPolicy set on the element', async function specificFetchPolicy() {
      type D = NullableParamSubscriptionData;
      type V = NullableParamSubscriptionVariables;

      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        noAutoSubscribe = true;

        subscription = NullableParamSubscription;

        fetchPolicy = 'cache-only' as const;

        variables = { nullable: 'quux' };
      }));

      const el =
        await fixture<Test<D, V>>(fhtml`
          <${tag}></${tag}>
        `);

      el.subscribe({ fetchPolicy: undefined });

      expect(clientSubscribeSpy).to.have.been.calledWithMatch({ fetchPolicy: 'cache-only' });
    });

    describe('with partial params', function() {
      type D = NullableParamSubscriptionData;
      type V = NullableParamSubscriptionVariables;

      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        noAutoSubscribe = true;
      }));

      let el: Test<D, V>;

      beforeEach(async function() {
        el =
          await fixture<Test<D, V>>(fhtml`
            <${tag}></${tag}>
          `);
      });

      it('defaults to element subscription', async function() {
        const fetchPolicy = 'network-only';
        el.subscription = NullableParamSubscription;
        const variables = { nullable: 'bar' };
        el.subscribe({ fetchPolicy, variables });
        expect(clientSubscribeSpy).to.have.been
          .calledWithMatch({
            query: NullableParamSubscription,
            fetchPolicy,
            variables,
          });
      });

      it('defaults to element fetchPolicy', async function() {
        const fetchPolicy = 'network-only';
        el.fetchPolicy = fetchPolicy;
        const subscription = NullableParamSubscription;
        const variables = { nullable: 'bar' };
        el.subscribe({ subscription, variables });
        expect(clientSubscribeSpy).to.have.been
          .calledWithMatch({
            fetchPolicy,
            query: NullableParamSubscription,
            variables,
          });
      });

      it('defaults to element variables', async function() {
        const fetchPolicy = 'network-only';
        const subscription = NullableParamSubscription;
        el.variables = { nullable: 'bar' };
        el.subscribe({ fetchPolicy, subscription });
        expect(clientSubscribeSpy).to.have.been
          .calledWithMatch({
            fetchPolicy,
            query: subscription,
            variables: el.variables,
          });
      });
    });
  });

  describe('when subscription updates', function() {
    type D = NonNullableParamSubscriptionData;
    type V = NonNullableParamSubscriptionVariables;

    let onSubscriptionDataSpy: Sinon.SinonSpy;

    let onErrorSpy: Sinon.SinonSpy;

    let element: Test<D, V>;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test<D, V> {
        onSubscriptionData(x) { x; }

        onError(x) { x; }
      }));

      element =
        await fixture<Test<D, V>>(fhtml`
          <${tag} .noAutoSubscribe="${true}"></${tag}>
        `);
    });

    beforeEach(function() {
      onSubscriptionDataSpy = spy(element, 'onSubscriptionData');
      onErrorSpy = spy(element, 'onError');
    });

    afterEach(function() {
      onSubscriptionDataSpy?.restore?.();
      onErrorSpy?.restore?.();
    });

    describe('with data', function() {
      beforeEach(async function() {
        element.subscription = NonNullableParamSubscription;
        element.variables = { nonNull: 'hola' };
        element.subscribe();
        await aTimeout(1000);
      });

      it('calls onSubscriptionData', function() {
        expect(onSubscriptionDataSpy).to.have.been.called;
        expect(onErrorSpy).to.not.have.been.called;
      });
    });

    describe('with error', function() {
      beforeEach(async function() {
        element.subscription = NonNullableParamSubscription;
        element.variables = { nonNull: 'error' };
        element.subscribe();
        await aTimeout(1000);
      });

      it('calls onError', function() {
        expect(onSubscriptionDataSpy).to.not.have.been.called;
        expect(onErrorSpy).to.have.been.called;
      });
    });
  });
});
