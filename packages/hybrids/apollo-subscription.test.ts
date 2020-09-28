import { aTimeout, expect, nextFrame } from '@open-wc/testing';
import 'sinon-chai';
import gql from 'graphql-tag';

import { define, html } from 'hybrids';

import { setupClient, teardownClient } from '../test-helpers/client';

import { Observable } from '@apollo/client/core';

import { ApolloSubscription, ApolloSubscriptionElement } from './apollo-subscription';

import NoParamSubscription from '@apollo-elements/test-helpers/NoParam.subscription.graphql';

import NullableParamSubscription from '@apollo-elements/test-helpers/NullableParam.subscription.graphql';
import NonNullableParamSubscription from '@apollo-elements/test-helpers/NonNullableParam.subscription.graphql';

let counter = 0;

function getTagName(): string {
  const tagName = `subscription-element-${counter}`;
  counter++;
  return tagName;
}

const basicRender =
  <D = unknown, V = unknown>(host: ApolloSubscriptionElement<D, V>): ReturnType<typeof html> =>
    html`${JSON.stringify(host.data, null, 2)}`;

describe('[hybrids] ApolloSubscription', function describeApolloSubscription() {
  let element: ApolloSubscriptionElement;
  let render = basicRender;

  function setupElement(properties = {}, innerHTML = '') {
    const container = document.createElement('div');
    const tag = getTagName();
    define(tag, { ...ApolloSubscription, render });
    container.innerHTML = `<${tag}>${innerHTML}</${tag}>`;
    const [element] = container.children as HTMLCollectionOf<ApolloSubscriptionElement>;
    document.body.appendChild(element);
    const update = render(Object.assign(element, properties));
    update({ ...element, ...properties }, container);
    return element;
  }

  async function setupFixture() {
    element = setupElement();
    await nextFrame();
  }

  function teardownFixture() {
    element?.remove?.();
    element = undefined;
    render = basicRender;
  }

  function setNoParamSubscription() {
    element.subscription = NoParamSubscription;
  }

  function setNullableParamSubscription() {
    element.subscription = NullableParamSubscription;
  }

  beforeEach(setupClient);
  beforeEach(setupFixture);
  beforeEach(nextFrame);
  afterEach(teardownFixture);
  afterEach(teardownClient);

  it('returns an instance of the superclass', async function returnsClass() {
    expect(element).to.be.an.instanceOf(HTMLElement);
  });

  it('sets default properties', async function setsDefaultProperties() {
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

  it('defaults to window.__APOLLO_CLIENT__ as client', async function defaultsToGlobalClient() {
    expect(element.client).to.equal(window.__APOLLO_CLIENT__);
  });

  describe('subscription property', function describeSubscription() {
    it('accepts a script child on connect', async function scriptChild() {
      teardownFixture();

      const script = NoParamSubscription.loc.source.body;

      const innerHTML = `
        <script type="application/graphql">
          ${script}
        </script>
      `;

      element = setupElement({}, innerHTML);

      expect(element.firstElementChild).to.be.an.instanceof(HTMLScriptElement);

      expect(element.subscription).to.deep.equal(gql(script));
    });

    it('accepts a DocumentNode', async function() {
      element.subscription = NoParamSubscription;

      expect(element.subscription).to.equal(NoParamSubscription);
    });

    it('rejects a non-DocumentNode', async function() {
      const subscription = `subscription { foo }`;
      // @ts-expect-error: testing the error
      expect(() => element.subscription = subscription)
        .to.throw('Subscription must be a gql-parsed DocumentNode');
      expect(element.subscription).to.not.be.ok;
    });
  });

  describe('if subscription not yet initialized', function() {
    describe('setting variables', function() {
      let textContent: string;
      beforeEach(function() {
        element.variables = { nullable: 'INITIAL_VARS' };
        textContent = element.shadowRoot?.textContent;
      });

      it('does not render', async function() {
        expect(element.shadowRoot.textContent).to.equal(textContent);
      });
    });

    describe('setting subscription that has no parameters', function() {
      beforeEach(setNoParamSubscription);

      beforeEach(() => aTimeout(100));

      it('subscribes', async function() {
        expect(element.data).to.be.ok;
      });

      it('renders', function() {
        expect(element.shadowRoot.textContent).to.contain('messageSent');
      });

      describe('then setting another document with nullable variables', function() {
        beforeEach(setNullableParamSubscription);
        beforeEach(() => aTimeout(100));
        it('renders second subscription', async function() {
          expect(element.shadowRoot.textContent).to.not.contain('messageSent');
          expect(element.shadowRoot.textContent).to.contain('nullable');
        });
        describe('then setting variables', function() {
          beforeEach(function() {
            element.variables = { nullable: 'quux' };
          });
          beforeEach(() => aTimeout(100));
          it('renders new variables', async function() {
            expect(element.shadowRoot.textContent).to.contain('quux');
          });
        });
      });
    });
  });

  describe('subscribe', function describeSubscribe() {
    describe('with enough variables', function() {
      beforeEach(async function() {
        element.subscription = NullableParamSubscription;
        element.variables = { param: 'param' };
      });

      it('creates an observable', function createsObservable() {
        expect(element.observable).to.be.an.instanceof(Observable);
      });
    });

    describe('with not enough variables', function() {
      beforeEach(async function() {
        element.cancel();
        element.subscription = NonNullableParamSubscription;
        element.variables = {};
        element.subscribe();
      });

      it('does not subscribe', function notEnoughVariables() {
        expect(element.data).to.be.null;
        expect(element.error).to.be.null;
      });
    });
  });
});
