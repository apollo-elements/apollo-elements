import { chai, expect, html } from '@open-wc/testing';
import { match, stub } from 'sinon';
import sinonChai from 'sinon-chai';

import { ApolloSubscriptionMixin } from './apollo-subscription-mixin.js';
import { client } from '../test/client.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { getElementWithLitTemplate } from '../test/helpers.js';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloSubscriptionMixin(HTMLElement);
const getTemplate = (tag, { mutation, variables, client, script } = {}) => html`
  <${tag}
      .client="${ifDefined(client)}"
      .mutation="${ifDefined(mutation)}"
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
