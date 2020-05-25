import { expect, fixture, unsafeStatic, html as litHtml, nextFrame } from '@open-wc/testing';
import 'sinon-chai';
import gql from 'graphql-tag';

import { spy, stub } from 'sinon';
import { define, html } from 'hybrids';

import { client, setupClient, teardownClient } from '@apollo-elements/test-helpers/client';

import { Observable, DocumentNode } from 'apollo-link';

import { ApolloSubscription } from './apollo-subscription';

import type { ApolloSubscription as IApolloSubscription } from '@apollo-elements/mixins/apollo-subscription';
import type { NormalizedCacheObject } from 'apollo-cache-inmemory';
import type { ApolloClient } from 'apollo-client';

import {
  NoParamSubscription,
  NullableParamSubscription,
} from '@apollo-elements/test-helpers';

type Stub = ReturnType<typeof stub>

interface TemplateOpts {
  subscription?: DocumentNode;
  variables?: unknown;
  client?: ApolloClient<NormalizedCacheObject>;
  script?: string;
  apolloSubscription?: typeof ApolloSubscription;
  render?(): ReturnType<typeof html>;
}

let counter = -1;

async function getElement(opts?: TemplateOpts): Promise<HTMLElement & IApolloSubscription<unknown, unknown>> {
  counter++;

  const tag = `subscription-element-${counter}-${Date.now()}`;
  const unsafeTag = unsafeStatic(tag);

  define(tag, { ...opts?.apolloSubscription ?? ApolloSubscription, render: opts?.render });

  const { subscription, variables, client, render } = opts ?? {};

  const element =
    await fixture<HTMLElement & IApolloSubscription<unknown, unknown>>(litHtml`
      <${unsafeTag}
          .subscription="${subscription}"
          .variables="${variables}"
          .client="${client}"
          .render="${render}">
        ${opts?.script && litHtml`<script type="application/graphql">${opts?.script}</script>`}
      </${unsafeTag}>
    `);

  return element;
}

describe('[hybrids] ApolloSubscription', function describeApolloSubscription() {
  beforeEach(setupClient);
  afterEach(teardownClient);

  it('returns an instance of the superclass', async function returnsClass() {
    expect(await getElement()).to.be.an.instanceOf(HTMLElement);
  });

  it('sets default properties', async function setsDefaultProperties() {
    const el = await getElement();
    expect(el.fetchPolicy, 'fetchPolicy').to.be.undefined;
    expect(el.fetchResults, 'fetchResults').to.be.undefined;
    expect(el.pollInterval, 'pollInterval').to.be.undefined;
    expect(el.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange').to.be.undefined;
    expect(el.variables, 'variables').to.be.undefined;
    expect(el.subscription, 'subscription').to.be.null;
    expect(el.tryFetch, 'tryFetch').to.be.undefined;
    // @ts-expect-error
    expect(el.observableQuery, 'observableQuery').to.be.undefined;
  });

  it('defaults to window.__APOLLO_CLIENT__ as client', async function defaultsToGlobalClient() {
    const el = await getElement();
    expect(el.client).to.equal(window.__APOLLO_CLIENT__);
  });

  it('defaults to null as client', async function defaultsToGlobalClient() {
    const cached = window.__APOLLO_CLIENT__;
    delete window.__APOLLO_CLIENT__;
    const el = await getElement({ client: undefined });
    expect(el.client).to.equal(null);
    window.__APOLLO_CLIENT__ = cached;
  });

  describe('subscription property', function describeSubscription() {
    const subscription = NoParamSubscription;

    it('accepts a script child', async function scriptChild() {
      const script = `
        subscription {
          messageSent {
            message
          }
        }
      `;
      const apolloSubscription = { ...ApolloSubscription, subscribe: { get(): Stub { return stub(); } } };
      const el = await getElement({ client, script, apolloSubscription });
      expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
      expect(el.subscription).to.deep.equal(gql(script));
      expect(el.subscribe).to.have.been.called;
    });

    it('accepts a DocumentNode', async function() {
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

    describe('if subscription not yet initialized', function() {
      let el;
      let subscribeStub;
      beforeEach(async function() {
        subscribeStub = stub();
        const apolloSubscription = {
          ...ApolloSubscription,
          subscribe: { get(): Stub { return subscribeStub; } },
        };
        el = await getElement({ client, apolloSubscription });
        el.subscription = subscription;
      });

      it('calls subscribe', async function() {
        await nextFrame();
        expect(subscribeStub).to.have.been.called;
      });
    });

    describe('if subscription is already initialized', function() {
      let el;
      let subscribeStub;

      beforeEach(async function() {
        el = await getElement({ client, subscription });
        subscribeStub = stub(el, 'subscribe');
        el.subscription = null;
        el.subscription = NoParamSubscription;
      });

      it('does not call subscribe', async function() {
        expect(subscribeStub).to.not.have.been.calledTwice;
      });
    });
  });

  describe('variables property', function describeVariables() {
    const subscription = gql`
      subscription ParamSub($param: String) {
        nullableParam(param: $param) {
          message
        }
      }
    `;

    const variables = { param: 'param' };

    it('calls subscribe when element has not yet initialized the subscription', async function() {
      const subscribeStub = stub();
      const apolloSubscription = { ...ApolloSubscription, subscribe: { get(): Stub { return subscribeStub; } } };
      const el = await getElement({ client, subscription, apolloSubscription });
      el.variables = variables;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe when element already initialized the subscription', async function() {
      const el = await getElement({ client, subscription, variables });
      const subscribeStub = stub(el, 'subscribe');
      el.variables = { bar: 'quux' };
      expect(subscribeStub).to.not.have.been.calledTwice;
      subscribeStub.restore();
    });
  });

  describe('subscribe', function describeSubscribe() {
    const subscription = NullableParamSubscription;
    let el;
    describe('with enough variables', function() {
      const variables = { param: 'param' };
      beforeEach(async function() {
        el = await getElement();
        el.subscription = subscription;
        el.variables = variables;
      });

      it('creates an observable', function createsObservable() {
        expect(el.observable).to.be.an.instanceof(Observable);
      });
    });

    describe('with not enough variables', function() {
      const subscription = gql`
        subscription NeedsVars($nonNull: String!) {
          nonNullParam(param: $nonNull) {
            message
          }
        }
      `;
      const variables = { };
      beforeEach(async function() {
        try {
          el = await getElement({ subscription, variables });
          el.variables = null;
          el.subscribe();
        } catch (error) {
          expect.fail(error);
        }
      });

      it('does nothing when there are not enough variables', function notEnoughVariables() {
        expect(el.observable).to.not.be.ok;
      });
    });

    it('can take a specific fetchPolicy', async function specificFetchPolicy() {
      const variables = { param: 'param' };
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
      const variables = { param: 'param' };
      const fetchPolicy = 'cache-only';
      const el = await getElement({ subscription });
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
      const variables = { param: 'quux' };
      const fetchPolicy = 'cache-only';
      const el = await getElement({ subscription });
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
});
