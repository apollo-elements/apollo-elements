import { chai, expect, fixture, unsafeStatic, html as litHtml } from '@open-wc/testing';
import { nextFrame } from '@open-wc/testing-helpers';
import gql from 'graphql-tag';
import sinonChai from 'sinon-chai';

import { ObservableQuery } from 'apollo-client';
import { match, stub, spy } from 'sinon';

import { define, html } from 'hybrids';

import { client } from '@apollo-elements/test-helpers/client';
import { isSubscription } from '@apollo-elements/test-helpers/helpers';
import { ApolloQuery } from './apollo-query';

chai.use(sinonChai);

let counter = 0;
const getElement = async ({ query, variables, client, script, apolloQuery = ApolloQuery, render = () => html`hi` }) => {
  const tag = `element-${counter}`;
  const unsafeTag = unsafeStatic(tag);

  define(tag, { ...apolloQuery, render });

  const template = litHtml`
  <${unsafeTag} .client="${client}" .query="${query}" .variables="${variables}">
    ${script && litHtml`<script type="application/graphql">${script}</script>`}
  </${unsafeTag}>`;

  const element = await fixture(template);

  counter++;

  return element;
};

describe('ApolloQuery', function describeApolloQueryMixin() {
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

  describe('query property', function() {
    it('accepts a script child', async function scriptChild() {
      const script = 'query { foo }';
      const apolloQuery = { ...ApolloQuery, subscribe: { get: () => stub() } };
      const el = await getElement({ client, script, apolloQuery });
      expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
      expect(el.query).to.deep.equal(gql(script));
      expect(el.subscribe).to.have.been.called;
    });

    it('accepts a parsed query', async function parsedQuery() {
      const query = gql`query { foo { bar } }`;
      const el = await getElement({ client, query });
      expect(el.query, 'set query').to.equal(query);
      expect(el.observableQuery, 'get observableQuery').to.be.ok;
    });

    it('rejects a bad query', async function badQuery() {
      const query = `query { foo { bar } }`;
      const el = await getElement({ client });
      expect(() => el.query = query).to.throw('Query must be a gql-parsed DocumentNode');
      expect(el.query).to.be.null;
      expect(el.observableQuery).to.not.be.ok;
    });

    it('sets query based on GraphQL script child', async function() {
      const script = 'query foo { bar }';
      const el = await getElement({ script });
      expect(el.query).to.deep.equal(gql(script));
    });

    it('observes children for addition of query script', async function() {
      const doc = `query newQuery { new }`;
      const el = await getElement({});
      expect(el.query).to.be.null;
      el.innerHTML = `<script type="application/graphql">${doc}</script>`;
      await nextFrame();
      expect(el.query).to.deep.equal(gql(doc));
    });

    it('does not change document for invalid children', async function() {
      const doc = `query newQuery { new }`;
      const el = await getElement({});
      expect(el.query).to.be.null;
      el.innerHTML = `<script>${doc}</script>`;
      await nextFrame();
      expect(el.query).to.be.null;
    });
  });

  describe('setting options', function describeSetOptions() {
    it('does nothing when there is no observableQuery', async function setOptionsNoQuery() {
      const el = await getElement({ client });
      el.options = { errorPolicy: 'foo' };
      expect(el.options).to.deep.equal({ errorPolicy: 'foo' });
    });

    it('calls observableQuery.subscribe when there is a query', async function setOptionsCallsObservableQuerySetOptions() {
      const query = gql`query { foo { bar } }`;
      const el = await getElement({ client, query });
      const setOptionsSpy = stub(el.observableQuery, 'setOptions');
      el.options = { errorPolicy: 'foo' };
      expect(setOptionsSpy).to.have.been.calledWith({ errorPolicy: 'foo' });
    });
  });

  describe('setting variables', function describeSetVariables() {
    it('does nothing when there is no observableQuery', async function setVariablesNoQuery() {
      const el = await getElement({ client });
      el.variables = { errorPolicy: 'foo' };
      expect(el.variables).to.deep.equal({ errorPolicy: 'foo' });
    });

    it('calls observableQuery.subscribe when there is a query', async function setVariablesCallsObservableQuerySetVariables() {
      const query = gql`query { foo { bar } }`;
      const el = await getElement({ client, query });
      const setVariablesSpy = stub(el.observableQuery, 'setVariables');
      // shouldn't this be an instance of ObservableQuery?
      el.variables = { errorPolicy: 'foo' };
      expect(setVariablesSpy).to.have.been.calledWith({ errorPolicy: 'foo' });
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
      const subscribeSpy = spy(el.observableQuery, 'subscribe');
      expect(await el.subscribe()).to.be.undefined;
      expect(subscribeSpy).to.not.have.been.called;
    });

    it('calls watchQuery when there are enough variables', async function subscribeEnoughVariables() {
      const variables = { needed: 'needed' };
      const el = await getElement({ client, query, variables });
      const watchQuerySpy = spy(el.client, 'watchQuery');
      expect(await el.subscribe()).to.be.ok;
      expect(watchQuerySpy).to.have.been.called;
      watchQuerySpy.restore();
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
      subscription._observer.next({ data: { foo: 'foo' } });
      expect(el.data).to.deep.equal({ foo: 'foo' });
    });

    it('binds nextError to the subscription\'s error', async function bindsErrorToError() {
      const variables = { needed: 'needed' };
      const el = await getElement({ client, query, variables });
      const subscription = await el.subscribe();
      subscription._observer.error('error');
      expect(el.error).to.equal('error');
    });
  });

  describe('subscribeToMore', function describeSubscribeToMore() {
    it('does nothing when there is no observableQuery', async function subscribeToMoreNoQuery() {
      const el = await getElement({ client });
      expect(el.subscribeToMore()).to.be.undefined;
    });

    it('calls observableQuery.subscribeToMore when there is a query', async function subscribeToMoreCallsObservableQuerySubscribeToMore() {
      const query = gql`query { foo { bar } }`;
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
      const query = gql`query foo { bar { baz } }`;
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
      const query = gql`query foo { bar { baz } }`;
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
      const query = gql`query { foo { bar } }`;
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
      const query = gql`query { foo { bar } }`;
      const el = await getElement({ client, query });
      const watchQueryStub = stub(el.client, 'watchQuery');
      const args = { query };
      expect(el.watchQuery(args)).to.be.undefined;
      expect(watchQueryStub).to.have.been.calledWith(match(args));
      watchQueryStub.restore();
    });

    it('returns an ObservableQuery', async function returnsObservableQuery() {
      const query = gql`query { foo { bar } }`;
      const el = await getElement({ client, query });
      expect(el.watchQuery()).to.be.an.instanceof(ObservableQuery);
    });

    it('accepts a specific query', async function() {
      const watchQueryStub = stub(client, 'watchQuery');
      const query = gql`query { foo { bar } }`;
      const el = await getElement({ client });
      el.watchQuery({ query });
      expect(watchQueryStub).to.have.been.calledWith(match({ query }));
      watchQueryStub.restore();
    });

    it('defaults to the element\'s query', async function() {
      const query = gql`query { foo { bar } }`;
      const el = await getElement({ client, query });
      const watchQueryStub = stub(el.client, 'watchQuery');
      el.watchQuery({ query: undefined });
      expect(watchQueryStub).to.have.been.calledWith(match({ query }));
      watchQueryStub.restore();
    });
  });

  describe('receiving data', function describeNextData() {
    it('assigns to host\'s data property', async function dataAssigned() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const subscription = await el.subscribe();
      subscription._observer.next({ data: { foo: 'bar ' } });
      expect(el.data).to.deep.equal({ foo: 'bar ' });
    });

    it('assigns to host\'s loading property', async function loadingAssigned() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const subscription = await el.subscribe();
      subscription._observer.next({ data: {}, loading: 1 });
      expect(el.loading).to.equal(1);
    });

    it('assigns to host\'s networkStatus property', async function networkStatusAssigned() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const subscription = await el.subscribe();
      subscription._observer.next({ data: {}, networkStatus: 1 });
      expect(el.networkStatus).to.equal(1);
    });

    it('assigns to host\'s stale property', async function staleAssigned() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const subscription = await el.subscribe();
      subscription._observer.next({ data: {}, stale: 1 });
      expect(el.stale).to.equal(1);
    });
  });

  describe('nextError', function describeNextError() {
    it('assigns to host\'s error property', async function errorAssigned() {
      const query = gql`query { foo }`;
      const el = await getElement({ client, query });
      const subscription = await el.subscribe();
      subscription._observer.error(1);
      expect(el.error).to.equal(1);
    });
  });
});
