import gql from 'graphql-tag';
import { chai, expect, html } from '@open-wc/testing';
import { spy, stub } from 'sinon';
import sinonChai from 'sinon-chai';
import { Observable } from 'apollo-link';

import { ApolloSubscriptionMixin } from './apollo-subscription-mixin.js';
import { client } from '../test/client.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { getElementWithLitTemplate } from '../test/helpers.js';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloSubscriptionMixin(HTMLElement);
const getTemplate = (tag, { subscription, variables, client, script } = {}) => html`
  <${tag}
      .client="${ifDefined(client)}"
      .subscription="${ifDefined(subscription)}"
      .variables="${variables}">
    ${script && scriptTemplate(script)}
  </${tag}>`;
const getElement = getElementWithLitTemplate({ getTemplate, getClass });

describe('ApolloSubscriptionMixin', function describeApolloSubscriptionMixin() {
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

  describe('subscription property', function describeSubscription() {
    it('accepts a script child', async function scriptChild() {
      const getStubbedClass = () => {
        const klass = class extends ApolloSubscriptionMixin(HTMLElement) { };
        spy(klass.prototype, 'subscribe');
        return klass;
      };

      const getStubbedElement = getElementWithLitTemplate({
        getClass: getStubbedClass,
        getTemplate,
      });

      const script = 'subscription { foo }';
      const el = await getStubbedElement({ client, script });

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
      const el = await getElement({ client });
      const subscribeStub = stub(el, 'subscribe');
      const variables = { bar: 1 };
      el.variables = variables;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe if subscription already initialized', async function() {
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) { baz } }`;
      const variables = { bar: 'qux' };
      const el = await getElement({ client, subscription, variables });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = { bar: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
    });
  });

  describe('variables property', function describeVariables() {
    it('calls subscribe when element has not yet initialized the subscription', async function() {
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) { baz } }`;
      const variables = { bar: 'qux' };
      const el = await getElement({ client, subscription });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = variables;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe when element already initialized the subscription', async function() {
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) { baz } }`;
      const variables = { bar: 'qux' };
      const el = await getElement({ client, subscription, variables });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = { bar: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
    });
  });

  describe('subscribe', function describeSubscribe() {
    it('creates an observable', async function createsObservable() {
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) { baz } }`;
      const variables = { bar: 'quux' };
      const el = await getElement({ client, subscription });
      el.variables = variables;
      el.subscribe();
      expect(el.observable).to.be.an.instanceof(Observable);
    });

    it('does nothing when there are not enough variables', async function notEnoughVariables() {
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) { baz } }`;
      const variables = {};
      const el = await getElement({ client, subscription });
      el.variables = variables;
      el.subscribe();
      expect(el.observable).to.not.be.ok;
    });

    it('can take a specific fetchPolicy', async function specificFetchPolicy() {
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) { baz } }`;
      const variables = { bar: 'quux' };
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
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) { baz } }`;
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
      const subscription = gql`subscription Foo($bar: String!) { foo(bar: $bar) { baz } }`;
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
      const el = await getElement({ client });
      const onSubscriptionDataStub = stub();
      el.onSubscriptionData = onSubscriptionDataStub;
      const subscriptionData = { data: 1 };
      el.nextData(subscriptionData);
      expect(onSubscriptionDataStub)
        .to.have.been.calledWith({ client, subscriptionData });
    });

    it('assigns to this.data', async function nextDataAssignsData() {
      const el = await getElement();
      el.nextData({ data: 1 });
      expect(el.data).to.equal(1);
    });

    it('assigns to this.loading', async function nextDataAssignsLoading() {
      const el = await getElement();
      el.nextData({ data: 1 });
      expect(el.loading).to.be.false;
    });

    it('assigns to this.error', async function nextDataAssignsError() {
      const el = await getElement();
      el.nextData({ data: 1 });
      expect(el.error).to.be.undefined;
    });
  });

  describe('nextError', function describeNextError() {
    it('assigns to this.error', async function nextErrorAssignsError() {
      const el = await getElement();
      el.nextError(1);
      expect(el.error).to.equal(1);
    });
  });
});
