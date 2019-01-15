import { chai, expect, fixture, unsafeStatic, html as litHtml } from '@open-wc/testing';
import sinonChai from 'sinon-chai';
import gql from 'graphql-tag';

import { spy, stub } from 'sinon';
import { define, html } from 'hybrids';

import { client } from '@apollo-elements/test-helpers/client.js';

import { Observable } from 'apollo-link';

import { ApolloSubscription } from './apollo-subscription.js';

chai.use(sinonChai);

let counter = 0;
const getElement = async ({ subscription, variables, client, script, apolloSubscription = ApolloSubscription, render = () => html`hi` } = {}) => {
  const tag = `element-${counter}`;
  const unsafeTag = unsafeStatic(tag);

  define(tag, { ...apolloSubscription, render });

  const template = litHtml`
  <${unsafeTag} .client="${client}" .subscription="${subscription}" .variables="${variables}">
    ${script && litHtml`<script type="application/graphql">${script}</script>`}
  </${unsafeTag}>`;

  const element = await fixture(template);

  counter++;

  return element;
};

describe('ApolloSubscription', function describeApolloSubscription() {
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
    expect(el.observableQuery, 'observableQuery').to.be.undefined;
  });

  it('defaults to window.__APOLLO_CLIENT__ as client if set', async function defaultsToGlobalClient() {
    const cached = window.__APOLLO_CLIENT__;
    window.__APOLLO_CLIENT__ = {};
    const el = await getElement({});
    expect(el.client).to.equal(window.__APOLLO_CLIENT__);
    window.__APOLLO_CLIENT__ = cached;
  });

  it('defaults to null as client', async function defaultsToGlobalClient() {
    const cached = window.__APOLLO_CLIENT__;
    delete window.__APOLLO_CLIENT__;
    const el = await getElement({});
    expect(el.client).to.equal(null);
    window.__APOLLO_CLIENT__ = cached;
  });

  describe('subscription property', function describeSubscription() {
    it('accepts a script child', async function scriptChild() {
      const script = 'subscription { foo }';
      const apolloSubscription = { ...ApolloSubscription, subscribe: { get: () => stub() } };
      const el = await getElement({ client, script, apolloSubscription });
      expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
      expect(el.subscription).to.deep.equal(gql(script));
      expect(el.subscribe).to.have.been.called;
    });

    it('accepts a DocumentNode', async function() {
      const subscription = gql`subscription { foo }`;
      const el = await getElement({ client });
      el.subscription = subscription;
      expect(el.subscription).to.equal(subscription);
    });

    it('rejects a non-DocumentNode', async function() {
      const subscription = `subscription { foo }`;
      const el = await getElement({ client });
      expect(() => el.subscription = subscription).to.throw('Subscription must be a gql-parsed DocumentNode');
      expect(el.subscription).to.not.be.ok;
    });

    it('calls subscribe if subscription not yet initialized', async function() {
      const subscribeStub = stub();
      const apolloSubscription = {
        ...ApolloSubscription,
        subscribe: { get: () => subscribeStub },
      };
      const el = await getElement({ client, apolloSubscription });
      const subscription = gql`subscription { foo }`;
      el.subscription = subscription;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe if subscription already initialized', async function() {
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) }`;
      const variables = { bar: 'qux' };
      const el = await getElement({ client, subscription, variables });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = { bar: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
    });
  });

  describe('variables property', function describeVariables() {
    it('calls subscribe when element has not yet initialized the subscription', async function() {
      const subscription = gql`subscription { foo(bar: $bar) }`;
      const variables = { bar: 'qux' };
      const subscribeStub = stub();
      const apolloSubscription = { ...ApolloSubscription, subscribe: { get: () => subscribeStub } };
      const el = await getElement({ client, subscription, apolloSubscription });
      el.variables = variables;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe when element already initialized the subscription', async function() {
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) }`;
      const variables = { bar: 'qux' };
      const el = await getElement({ client, subscription, variables });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = { bar: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
      subscribeStub.restore();
    });
  });

  describe('subscribe', function describeSubscribe() {
    const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) }`;
    it('creates an observable', async function createsObservable() {
      const el = await getElement({ client });
      el.subscription = subscription;
      el.variables = { bar: 'qux' };
      expect(el.observable).to.be.an.instanceof(Observable);
    });

    it('does nothing when there are not enough variables', async function notEnoughVariables() {
      const variables = {};
      try {
        const el = await getElement({ client, subscription });
        el.variables = variables;
        el.subscribe();
        expect(el.observable).to.not.be.ok;
      } catch (error) {
        expect.fail(error);
      }
    });

    it('can take a specific fetchPolicy', async function specificFetchPolicy() {
      const variables = { bar: 'quux' };
      const fetchPolicy = 'cache-only';
      let clientSubscribeSpy;
      try {
        const el = await getElement({ client, subscription });
        clientSubscribeSpy = spy(client, 'subscribe');
        el.variables = variables;
        el.subscribe({ fetchPolicy });
        expect(clientSubscribeSpy).to.have.been.calledWith({
          query: subscription,
          variables,
          fetchPolicy,
        });
      } catch (error) {
        expect.fail(error);
      } finally {
        clientSubscribeSpy.restore();
      }
    });

    it('uses fetchPolicy set on the element', async function specificFetchPolicy() {
      const variables = { bar: 'quux' };
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
      const variables = { bar: 'quux' };
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
  });

  describe('nextData', function describeNextData() {
    it('calls onSubscriptionData if defined', async function callsOnSubscriptionData() {
      const onSubscriptionDataStub = stub();
      const apolloSubscription = {
        ...ApolloSubscription,
        onSubscriptionData: { get: () => onSubscriptionDataStub },
      };
      const el = await getElement({ client, apolloSubscription });
      const subscriptionData = { data: { foo: 'bar' } };
      el.nextData(subscriptionData);
      expect(onSubscriptionDataStub)
        .to.have.been.calledWith({ client, subscriptionData });
    });

    it('assigns to host\'s data property', async function nextDataAssignsData() {
      const el = await getElement();
      el.nextData({ data: { foo: 'bar' } });
      expect(el.data).to.deep.equal({ foo: 'bar' });
    });

    it('assigns to host\'s loading property', async function nextDataAssignsLoading() {
      const el = await getElement();
      el.nextData({ data: { foo: 'bar' } });
      expect(el.loading).to.be.false;
    });

    it('assigns to host\'s error property', async function nextDataAssignsError() {
      const el = await getElement();
      el.nextData({ data: { foo: 'bar' } });
      expect(el.error).to.be.null;
    });
  });

  describe('nextError', function describeNextError() {
    it('assigns to host\'s error property', async function nextErrorAssignsError() {
      const el = await getElement();
      el.nextError('error');
      expect(el.error).to.equal('error');
    });
  });
});
