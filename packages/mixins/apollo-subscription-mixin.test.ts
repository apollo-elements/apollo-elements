import { expect, html } from '@open-wc/testing';
import gql from 'graphql-tag';
import 'sinon-chai';

import { spy, stub } from 'sinon';
import { Observable, DocumentNode } from 'apollo-link';

import { ApolloSubscriptionMixin } from './apollo-subscription-mixin';
import { client, setupClient, teardownClient } from '@apollo-elements/test-helpers/client';
import { getElementWithLitTemplate, graphQLScriptTemplate } from '@apollo-elements/test-helpers/helpers';
import { TemplateResult } from 'lit-html';
import ApolloClient from 'apollo-client';
import { ApolloSubscription } from './apollo-subscription';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { NoParamSubscription, NullableParamSubscription } from '@apollo-elements/test-helpers';
import { spreadProps } from '@open-wc/lit-helpers';

type Stub = ReturnType<typeof stub>;
type Spy = ReturnType<typeof spy>;

const getClass = () =>
  class extends ApolloSubscriptionMixin(HTMLElement) {};

interface TemplateOpts {
  subscription?: DocumentNode;
  variables?: unknown;
  client?: ApolloClient<NormalizedCacheObject>;
  script?: string;
}

function getTemplate(tag: string, opts: TemplateOpts): TemplateResult {
  return html`
    <${tag} ...="${spreadProps(opts ?? {})}">
      ${graphQLScriptTemplate(opts?.script)}
    </${tag}>
  `;
}

const getElement =
  getElementWithLitTemplate<HTMLElement & ApolloSubscription<unknown, unknown>>({ getTemplate, getClass });

describe('[mixins] ApolloSubscriptionMixin', function describeApolloSubscriptionMixin() {
  beforeEach(setupClient);
  afterEach(teardownClient);
  it('returns an instance of the superclass', async function returnsClass() {
    expect(await getElement()).to.be.an.instanceOf(HTMLElement);
  });

  it('sets default properties', async function setsDefaultProperties() {
    const el = await getElement({ client });
    expect(el.fetchPolicy, 'fetchPolicy').to.equal('cache-first');
    expect(el.fetchResults, 'fetchResults').to.be.undefined;
    expect(el.pollInterval, 'pollInterval').to.be.undefined;
    expect(el.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange').to.be.undefined;
    expect(el.variables, 'variables').to.be.undefined;
    expect(el.subscription, 'subscription').to.be.null;
    expect(el.tryFetch, 'tryFetch').to.be.undefined;
    // @ts-expect-error
    expect(el.observableQuery, 'observableQuery').to.be.undefined;
  });

  describe('subscription property', function describeSubscription() {
    it('accepts a script child', async function scriptChild() {
      const getStubbedClass = () => {
        const Klass = class extends ApolloSubscriptionMixin(HTMLElement)<unknown, unknown> { };
        spy(Klass.prototype, 'subscribe');
        return Klass;
      };

      const getStubbedElement = getElementWithLitTemplate<HTMLElement & ApolloSubscription<unknown, unknown>>({
        getClass: getStubbedClass,
        getTemplate,
      });

      const script = `
        subscription NoParamSubscription {
          messageSent {
            message
          }
        }
      `;

      const el = await getStubbedElement({ client, script });

      expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
      expect(el.subscription).to.deep.equal(gql(script));
      expect(el.subscribe).to.have.been.called;
    });

    it('accepts a DocumentNode', async function() {
      const subscription = NoParamSubscription;
      const el = await getElement({ client });
      el.subscription = subscription;
      expect(el.subscription).to.equal(subscription);
    });

    it('rejects a non-DocumentNode', async function() {
      const subscription = `subscription { foo }`;
      const el = await getElement({ client });
      // @ts-expect-error
      expect(() => el.subscription = subscription).to.throw('Subscription must be a gql-parsed DocumentNode');
      expect(el.subscription).to.not.be.ok;
    });

    it('calls subscribe if subscription not yet initialized', async function() {
      const el = await getElement({ client });
      const subscribeStub = stub(el, 'subscribe');
      const subscription = gql`subscription { foo }`;
      el.subscription = subscription;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe if subscription already initialized', async function() {
      const subscription = NullableParamSubscription;
      const variables = { param: 'qux' };
      const el = await getElement({ client, subscription, variables });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = { param: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
    });

    it('does not call subscribe if subscription is falsy', async function() {
      const subscription = null;
      const variables = { bar: 'qux' };
      const el = await getElement({ client, subscription, variables });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = { bar: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
    });
  });

  describe('variables property', function describeVariables() {
    it('calls subscribe when element has not yet initialized the subscription', async function() {
      const subscription = NullableParamSubscription;
      const variables = { param: 'qux' };
      const el = await getElement({ client, subscription });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = variables;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe when element already initialized the subscription', async function() {
      const subscription = NullableParamSubscription;
      const variables = { param: 'qux' };
      const el = await getElement({ client, subscription, variables });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = { param: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
    });
  });

  describe('subscribe', function describeSubscribe() {
    it('creates an observable', async function createsObservable() {
      const subscription = NullableParamSubscription;
      const variables = { param: 'quux' };
      const el = await getElement({ client, subscription });
      el.variables = variables;
      el.subscribe();
      expect(el.observable).to.be.an.instanceof(Observable);
    });

    it('does nothing when there are not enough variables', async function notEnoughVariables() {
      const subscription = NullableParamSubscription;
      const variables = {};
      const el = await getElement({ client, subscription });
      el.variables = variables;
      el.subscribe();
      expect(el.observable).to.not.be.ok;
    });

    it('can take a specific fetchPolicy', async function specificFetchPolicy() {
      const subscription = NullableParamSubscription;
      const variables = { param: 'quux' };
      const fetchPolicy = 'cache-only';
      const el = await getElement({ client, subscription });
      const clientSubscribeSpy = spy(client, 'subscribe');
      el.variables = variables;
      el.subscribe({ fetchPolicy });
      expect(clientSubscribeSpy).to.have.been.calledWith({
        query: subscription,
        variables,
        fetchPolicy,
      });
      clientSubscribeSpy.restore();
    });

    it('uses fetchPolicy set on the element', async function specificFetchPolicy() {
      const subscription = NullableParamSubscription;
      const variables = { param: 'quux' };
      const fetchPolicy = 'cache-only';
      const el = await getElement({ client, subscription });
      const clientSubscribeSpy = spy(client, 'subscribe');
      el.fetchPolicy = fetchPolicy;
      el.variables = variables;
      el.subscribe();
      expect(clientSubscribeSpy).to.have.been.calledWith({
        query: subscription,
        variables,
        fetchPolicy,
      });
      clientSubscribeSpy.restore();
    });

    it('defaults to fetchPolicy set on the element', async function specificFetchPolicy() {
      const subscription = NullableParamSubscription;
      const variables = { param: 'quux' };
      const fetchPolicy = 'cache-only';
      const el = await getElement({ client, subscription });
      const clientSubscribeSpy = spy(client, 'subscribe');
      el.fetchPolicy = fetchPolicy;
      el.variables = variables;
      el.subscribe({ fetchPolicy: undefined });
      expect(clientSubscribeSpy).to.have.been.calledWith({
        query: subscription,
        variables,
        fetchPolicy,
      });
      clientSubscribeSpy.restore();
    });

    describe('with partial params', function() {
      let el: HTMLElement & ApolloSubscription<unknown, unknown>;

      let subscribeSpy: Spy;

      beforeEach(async function() {
        el = await getElement();
        subscribeSpy = spy(el.client, 'subscribe');
      });

      afterEach(function() {
        subscribeSpy.restore?.();
        subscribeSpy = undefined;
      });

      it('defaults to element subscription', async function() {
        const fetchPolicy = 'network-only';
        el.subscription = NullableParamSubscription;
        const variables = { param: 'bar' };
        el.subscribe({ fetchPolicy, variables });
        expect(subscribeSpy).to.have.been
          .calledWithMatch({
            fetchPolicy,
            query: el.subscription,
            variables,
          });
      });

      it('defaults to element fetchPolicy', async function() {
        el.fetchPolicy = 'network-only';
        const subscription = NullableParamSubscription;
        const variables = { param: 'bar' };
        el.subscribe({ query: subscription, variables });
        expect(subscribeSpy).to.have.been
          .calledWithMatch({
            fetchPolicy: el.fetchPolicy,
            query: subscription,
            variables,
          });
      });

      it('defaults to element variables', async function() {
        const fetchPolicy = 'network-only';
        const subscription = NullableParamSubscription;
        el.variables = { param: 'bar' };
        el.subscribe({ fetchPolicy, query: subscription });
        expect(subscribeSpy).to.have.been
          .calledWithMatch({
            fetchPolicy,
            query: subscription,
            variables: el.variables,
          });
      });
    });
  });

  describe('when subscription updates', function() {
    const subscription = NullableParamSubscription;
    const variables = { param: 'hola' };
    let onSubscriptionData;
    let onError;
    let el;
    beforeEach(async function() {
      onSubscriptionData = stub();
      onError = stub();
      el = await getElement({ onSubscriptionData, onError });
    });

    afterEach(function() {
      onSubscriptionData.restore?.();
      onError.restore?.();
    });

    describe('with data', function() {
      beforeEach(async function() {
        el.subscription = subscription;
        el.variables = variables;
        el.subscribe();
      });

      it('calls onSubscriptionData', function() {
        expect(onSubscriptionData).to.have.been.called;
        expect(onError).to.not.have.been.called;
      });
    });

    describe('with error', function() {
      beforeEach(async function() {
        el.subscription = subscription;
        el.variables = { param: 'error' };
        el.subscribe();
      });

      it('calls onError', function() {
        expect(onSubscriptionData).to.not.have.been.called;
        expect(onError).to.have.been.called;
      });
    });
  });
});
