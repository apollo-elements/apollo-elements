import { chai, expect, html } from '@open-wc/testing';
import gql from 'graphql-tag';
import sinonChai from 'sinon-chai';

import { ObservableQuery } from 'apollo-client';
import { ifDefined } from 'lit-html/directives/if-defined';
import { match, stub, spy } from 'sinon';

import { client } from '@apollo-elements/test-helpers/client';
import { getElementWithLitTemplate, isSubscription } from '@apollo-elements/test-helpers/helpers';
import { ApolloQueryMixin } from './apollo-query-mixin';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloQueryMixin(HTMLElement);
const getTemplate = (tag, { query, variables, client, script } = {}) => html`
  <${tag}
      .client="${ifDefined(client)}"
      .query="${ifDefined(query)}"
      .variables="${variables}">
    ${script && scriptTemplate(script)}
  </${tag}>`;

const getElement = getElementWithLitTemplate({ getClass, getTemplate });

describe('ApolloQueryMixin', function describeApolloQueryMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    expect(await getElement()).to.be.an.instanceOf(HTMLElement);
  });

  it('sets default properties', async function setsDefaultProperties() {
    const el = await getElement({ client });
    expect(el.errorPolicy, 'errorPolicy').to.equal('none');
    expect(el.fetchPolicy, 'fetchPolicy').to.equal('cache-first');
    expect(el.fetchResults, 'fetchResults').to.be.undefined;
    expect(el.pollInterval, 'pollInterval').to.be.undefined;
    expect(el.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange').to.be.undefined;
    expect(el.variables, 'variables').to.be.undefined;
    expect(el.query, 'query').to.be.null;
    expect(el.tryFetch, 'tryFetch').to.be.undefined;
    expect(el.observableQuery, 'observableQuery').to.be.undefined;
  });

  describe('query property', function() {
    it('accepts a script child', async function scriptChild() {
      const getStubbedClass = () => {
        const klass = class extends ApolloQueryMixin(HTMLElement) { };
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
      expect(el.query).to.deep.equal(gql(script));
      expect(el.subscribe).to.have.been.called;
    });

    it('accepts a parsed query', async function parsedQuery() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      expect(el.query).to.equal(query);
      expect(el.observableQuery).to.be.ok;
    });

    it('rejects a bad query', async function badQuery() {
      const query = `query { foo }`;
      const el = await getElement({ client });
      expect(() => el.query = query).to.throw('Query must be a gql-parsed DocumentNode');
      expect(el.query).to.be.null;
      expect(el.observableQuery).to.not.be.ok;
    });

    it('calls subscribe when set', async function callsSubscribe() {
      const query = gql`query { foo }`;
      const el = await getElement({ client });
      const subscribeStub = stub(el, 'subscribe');
      el.query = query;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe when set if noAutoSubscribe is set', async function noAutoSubscribe() {
      const query = gql`query { foo }`;
      const el = await getElement({ client });
      const subscribeStub = stub(el, 'subscribe');
      el.noAutoSubscribe = true;
      el.query = query;
      expect(subscribeStub).to.not.have.been.called;
    });
  });

  describe('setting options', function describeSetOptions() {
    it('does nothing when there is no observableQuery', async function setOptionsNoQuery() {
      const el = await getElement({ client });
      el.options = { errorPolicy: 'foo' };
      expect(el.options).to.deep.equal({ errorPolicy: 'foo' });
    });

    it('calls observableQuery.subscribe when there is a query', async function setOptionsCallsObservableQuerySetOptions() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const setOptionsSpy = stub(el.observableQuery, 'setOptions');
      el.options = { errorPolicy: 'foo' };
      expect(setOptionsSpy).to.have.been.calledWith({ errorPolicy: 'foo' });
    });
  });

  describe('refetch', function describeRefetch() {
    it('calls observableQuery.refetch', async function callsOQRefetch() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const refetchSpy = spy(el.observableQuery, 'refetch');
      el.refetch({ foo: 'bar' });
      expect(refetchSpy).to.have.been.calledWith({ foo: 'bar' });
      refetchSpy.restore();
    });

    it('performs no operation when there is no observable query', async function noopRefetch() {
      const el = await getElement({ client });
      expect(el.refetch({ foo: 'bar' })).to.be.undefined;
    });
  });

  describe('setting variables', function describeSetVariables() {
    describe('without observableQuery', function() {
      let el;

      beforeEach(async function() {
        el = await getElement({ client });
        el.variables = { errorPolicy: 'foo' };
      });

      it('does nothing', async function setVariablesNoQuery() {
        expect(el.variables).to.deep.equal({ errorPolicy: 'foo' });
      });
    });
    describe('with an observableQuery', function() {
      let el;
      let setVariablesSpy;
      const query = gql`query { foo }`;

      beforeEach(async function() {
        el = await getElement({ client, query });
        setVariablesSpy = spy(el.observableQuery, 'setVariables');
      });

      afterEach(function() {
        setVariablesSpy.restore();
      });

      it('calls observableQuery.subscribe', async function setVariablesCallsObservableQuerySetVariables() {
        // shouldn't this be an instance of ObservableQuery?
        el.variables = { errorPolicy: 'foo' };
        expect(setVariablesSpy).to.have.been.calledWith(match({ errorPolicy: 'foo' }));
      });
    });
  });

  describe('subscribe', function describeSubscribe() {
    const query = gql`
      query NeedyQuery($needed: String!) {
        needy(needed: $needed)
      }`;

    it('does nothing when the query variables do not satisfy the query', async function subscribeNotEnoughVariables() {
      const variables = {};
      const el = await getElement({ client, query, variables });
      const watchQuerySpy = spy(el, 'watchQuery');
      expect(await el.subscribe()).to.be.undefined;
      expect(watchQuerySpy).to.not.have.been.called;
    });

    it('calls watchQuery when there are enough variables', async function subscribeEnoughVariables() {
      const variables = { needed: 'needed' };
      const el = await getElement({ client, query, variables });
      const watchQuerySpy = spy(el, 'watchQuery');
      expect(await el.subscribe()).to.be.ok;
      expect(watchQuerySpy).to.have.been.called;
    });

    it('creates an observableQuery', async function subscribeCreatesObservableQuery() {
      const variables = { needed: 'needed' };
      const el = await getElement({ client, query, variables });
      const subscription = await el.subscribe();
      expect(subscription).to.be.ok;
      expect(el.observableQuery).to.be.ok;
    });

    it('returns a subscription', async function subscribeReturnsSubscription() {
      const variables = { needed: 'needed' };
      const el = await getElement({ client, query, variables });
      const subscription = await el.subscribe();
      expect(isSubscription(subscription)).to.be.true;
    });

    it('binds nextData to the subscription\'s next', async function bindsNextToNext() {
      const variables = { needed: 'needed' };
      const el = await getElement({ client, query, variables });
      const subscription = await el.subscribe();
      expect(subscription._observer.next).to.equal(el.nextData);
    });

    it('binds nextError to the subscription\'s error', async function bindsErrorToError() {
      const variables = { needed: 'needed' };
      const el = await getElement({ client, query, variables });
      const subscription = await el.subscribe();
      expect(subscription._observer.error).to.equal(el.nextError);
    });
  });

  describe('subscribeToMore', function describeSubscribeToMore() {
    it('does nothing when there is no observableQuery', async function subscribeToMoreNoQuery() {
      const el = await getElement({ client });
      expect(el.subscribeToMore()).to.be.undefined;
    });

    it('calls observableQuery.subscribeToMore when there is a query', async function subscribeToMoreCallsObservableQuerySubscribeToMore() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const subscribeToMoreSpy = stub(el.observableQuery, 'subscribeToMore');
      // shouldn't this be an instance of ObservableQuery?
      const args = { document: gql`subscription { foo } `, updateQuery: x => x };
      expect(el.subscribeToMore(args)).to.be.undefined;
      expect(subscribeToMoreSpy).to.have.been.calledWith(args);
    });
  });

  describe('executeQuery', function describeExecuteQuery() {
    it('calls client.query with element properties', async function callsClientQuery() {
      const el = await getElement({ client });
      const queryStub = stub(el.client, 'query');
      queryStub.resolves(true);
      const { errorPolicy, fetchPolicy, query } = el;
      el.executeQuery();
      expect(queryStub).to.have.been.calledWith(match({
        errorPolicy,
        fetchPolicy,
        query,
      }));
      queryStub.restore();
    });

    it('updates data with the response', async function updatesDataWithResponse() {
      const el = await getElement({ client });
      const queryStub = stub(el.client, 'query');
      const data = { foo: 'bar' };
      queryStub.resolves({ data });
      await el.executeQuery();
      expect(el.data).to.equal(data);
      queryStub.restore();
    });

    it('updates error with the error', async function updatesErrorWithError() {
      const el = await getElement({ client });
      const queryStub = stub(el.client, 'query');
      const error = new Error('whoops');
      queryStub.rejects(error);
      await el.executeQuery();
      expect(el.error).to.equal(error);
      queryStub.restore();
    });

    it('accepts custom args', async function() {
      const query = gql`query { foo }`;
      const el = await getElement({ client });
      const queryStub = stub(el.client, 'query');
      queryStub.resolves(true);
      el.executeQuery({ query });
      expect(queryStub).to.have.been.calledWith(match({
        query,
      }));
      queryStub.restore();
    });

    it('defaults to element query', async function() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const queryStub = stub(el.client, 'query');
      queryStub.resolves(true);
      el.executeQuery({ query: undefined });
      expect(queryStub).to.have.been.calledWith(match({
        query,
      }));
      queryStub.restore();
    });
  });

  describe('fetchMore', function describeFetchMore() {
    it('does nothing when there is no observableQuery', async function fetchMoreNoQuery() {
      const el = await getElement({ client });
      expect(el.fetchMore()).to.be.undefined;
      expect(el.observableQuery).to.be.undefined;
    });

    it('calls observableQuery.fetchMore when there is a query', async function fetchMoreCallsObservableQuerySubscribeToMore() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const fetchMoreSpy = stub(el.observableQuery, 'fetchMore');
      const args = { query, updateQuery: x => x };
      expect(el.fetchMore(args)).to.be.undefined;
      expect(fetchMoreSpy).to.have.been.calledWith(match(args));
      fetchMoreSpy.restore();
    });
  });

  describe('watchQuery', function describeWatchQuery() {
    it('calls client watchQuery', async function callsClientWatchQuery() {
      const watchQueryStub = stub(client, 'watchQuery');
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const args = { query };
      expect(el.watchQuery(args)).to.be.undefined;
      expect(watchQueryStub).to.have.been.calledWith(match(args));
      watchQueryStub.restore();
    });

    it('returns an ObservableQuery', async function returnsObservableQuery() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const actual = el.watchQuery();
      expect(actual).to.be.an.instanceof(ObservableQuery);
    });

    it('accepts a specific query', async function() {
      const watchQueryStub = stub(client, 'watchQuery');
      const query = gql`query { foo }`;
      const el = await getElement({ client });
      el.watchQuery({ query });
      expect(watchQueryStub).to.have.been.calledWith(match({ query }));
      watchQueryStub.restore();
    });

    it('defaults to the element\'s query', async function() {
      const watchQueryStub = stub(client, 'watchQuery');
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      el.watchQuery({ query: undefined });
      expect(watchQueryStub).to.have.been.calledWith(match({ query }));
      watchQueryStub.restore();
    });

    it('uses default options', async function() {
      const cache = client.defaultOptions;
      client.defaultOptions = {
        watchQuery: {
          notifyOnNetworkStatusChange: true,
          SOMETHING_SILLY: true,
        },
      };

      const watchQueryStub = stub(client.queryManager, 'watchQuery');
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      el.watchQuery({ query: undefined });
      expect(watchQueryStub).to.have.been.calledWith(match({
        query,
        notifyOnNetworkStatusChange: true,
        SOMETHING_SILLY: true,
      }));

      watchQueryStub.restore();
      client.defaultOptions = cache;
    });
  });

  describe('nextData', function describeNextData() {
    it('assigns to this.data', async function dataAssigned() {
      const el = await getElement();
      el.nextData({ data: 1 });
      expect(el.data).to.equal(1);
    });

    it('assigns to this.loading', async function loadingAssigned() {
      const el = await getElement();
      el.nextData({ loading: 1 });
      expect(el.loading).to.equal(1);
    });

    it('assigns to this.networkStatus', async function networkStatusAssigned() {
      const el = await getElement();
      el.nextData({ networkStatus: 1 });
      expect(el.networkStatus).to.equal(1);
    });

    it('assigns to this.stale', async function staleAssigned() {
      const el = await getElement();
      el.nextData({ stale: 1 });
      expect(el.stale).to.equal(1);
    });
  });

  describe('nextError', function describeNextError() {
    it('assigns to this.error', async function errorAssigned() {
      const el = await getElement();
      el.nextError(1);
      expect(el.error).to.equal(1);
    });
  });
});
