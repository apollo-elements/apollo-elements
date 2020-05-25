import { expect, fixture, unsafeStatic, html as litHtml } from '@open-wc/testing';
import { nextFrame } from '@open-wc/testing-helpers';
import gql from 'graphql-tag';
import 'sinon-chai';

import ApolloClient, { ObservableQuery } from 'apollo-client';
import { match, stub, spy } from 'sinon';

import { define, html } from 'hybrids';

import { client, setupClient, teardownClient } from '@apollo-elements/test-helpers/client';
import { isSubscription } from '@apollo-elements/test-helpers/helpers';
import { ApolloQuery } from './apollo-query';
import { ApolloQuery as IApolloQuery } from '@apollo-elements/mixins/apollo-query';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { DocumentNode } from 'graphql';

type Stub = ReturnType<typeof stub>;

interface TemplateOpts {
  query?: DocumentNode;
  variables?: unknown;
  client?: ApolloClient<NormalizedCacheObject>;
  script?: string;
  apolloQuery?: typeof ApolloQuery;
  render?: () => ReturnType<typeof html>;
}

let counter = -1;

async function getElement(opts?: TemplateOpts): Promise<HTMLElement & IApolloQuery<unknown, unknown>> {
  const {
    query = undefined,
    variables = undefined,
    script = undefined,
    apolloQuery = ApolloQuery,
    render = (): ReturnType<typeof html> => html`hi`,
  } = opts ?? {};
  counter++;

  const tag = `query-element-${counter}-${Date.now()}`;
  const unsafeTag = unsafeStatic(tag);

  define(tag, { ...apolloQuery, render });

  const apolloClient = opts?.client;

  const template = litHtml`
  <${unsafeTag} .client="${apolloClient}" .query="${query}" .variables="${variables}">
    ${script && litHtml`<script type="application/graphql">${script}</script>`}
  </${unsafeTag}>`;

  const element =
    await fixture<HTMLElement & IApolloQuery<unknown, unknown>>(template);

  return element;
}

describe('[hybrids] ApolloQuery', function describeApolloQueryMixin() {
  beforeEach(setupClient);
  afterEach(teardownClient);

  it('sets default properties', async function setsDefaultProperties() {
    const el = await getElement();
    expect(el.errorPolicy, 'errorPolicy').to.equal('none');
    expect(el.fetchPolicy, 'fetchPolicy').to.be.undefined;
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
    // @ts-expect-error
    window.__APOLLO_CLIENT__ = {};

    const el = await getElement({ });
    expect(el.client).to.equal(window.__APOLLO_CLIENT__);
    window.__APOLLO_CLIENT__ = cached;
  });

  describe('query property', function() {
    it('accepts a script child', async function scriptChild() {
      const script = 'query { noParam }';
      const apolloQuery = { ...ApolloQuery, subscribe: { get(): Stub { return stub(); } } };
      const el = await getElement({ client, script, apolloQuery });
      expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
      expect(el.query).to.deep.equal(gql(script));
      expect(el.subscribe).to.have.been.called;
    });

    it('accepts a parsed query', async function parsedQuery() {
      const query = gql`query { noParam }`;
      const el = await getElement({ client, query });
      expect(el.query, 'set query').to.equal(query);
      expect(el.observableQuery, 'get observableQuery').to.be.ok;
    });

    it('rejects a bad query', async function badQuery() {
      const query = `query { noParam }`;
      const el = await getElement({ client });
      // @ts-expect-error
      expect(() => el.query = query).to.throw('Query must be a gql-parsed DocumentNode');
      expect(el.query).to.be.null;
      expect(el.observableQuery).to.not.be.ok;
    });

    it('sets query based on GraphQL script child', async function() {
      const script = 'query { noParam }';
      const el = await getElement({ script });
      expect(el.query).to.deep.equal(gql(script));
    });

    it('observes children for addition of query script', async function() {
      const doc = `query { noParam }`;
      const el = await getElement({});
      expect(el.query).to.be.null;
      el.innerHTML = `<script type="application/graphql">${doc}</script>`;
      await nextFrame();
      expect(el.query).to.deep.equal(gql(doc));
    });

    it('does not change document for invalid children', async function() {
      const doc = `query { noParam }`;
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
      el.options = { query: null, errorPolicy: 'none' };
      expect(el.options).to.deep.equal({ query: null, errorPolicy: 'none' });
    });

    it('calls observableQuery.subscribe when there is a query', async function setOptionsCallsObservableQuerySetOptions() {
      const options = { query: null, errorPolicy: 'none' as const };
      const query = gql`query { noParam }`;
      const el = await getElement({ client, query });
      const setOptionsSpy = stub(el.observableQuery, 'setOptions');
      el.options = options;
      expect(setOptionsSpy).to.have.been.calledWith(options);
    });
  });

  describe('setting variables', function describeSetVariables() {
    describe('without observableQuery', function() {
      let el;

      beforeEach(async function() {
        el = await getElement({ client });
        el.variables = { nullable: 'nullable' };
      });

      afterEach(function() {
        el = undefined;
      });

      it('does nothing', async function setVariablesNoQuery() {
        expect(el.variables).to.deep.equal({ nullable: 'nullable' });
      });
    });

    describe('with an observableQuery', function() {
      let el;
      let setVariablesSpy;

      const query = gql`
        query NullableQuery($nullable: String) {
          nullableParam(nullable: $nullable) {
            nullable
          }
        }
      `;

      beforeEach(async function() {
        el = await getElement({ client, query });
        setVariablesSpy = spy(el.observableQuery, 'setVariables');
        el.variables = { nullable: 'nullable' };
      });

      afterEach(function() {
        setVariablesSpy.restore();
      });

      it('calls observableQuery.subscribe', async function setVariablesCallsObservableQuerySetVariables() {
        expect(setVariablesSpy).to.have.been.calledWithMatch({ nullable: 'nullable' });
      });
    });
  });

  describe('subscribe', function describeSubscribe() {
    const query = gql`
      query NeedyQuery($nonNull: String!) {
        nonNullParam(nonNull: $nonNull) {
          nonNull
        }
      }`;

    it('does nothing when the query variables do not satisfy the query', async function subscribeNotEnoughVariables() {
      const variables = {};
      const watchQueryStub = stub();
      watchQueryStub.returns({ subscribe: () => null });
      const apolloQuery = {
        ...ApolloQuery,
        watchQuery: {
          get(): Stub { return watchQueryStub; },
        },
      };
      const el = await getElement({ apolloQuery, client, query, variables });
      expect(el.watchQuery).to.not.have.been.called;
    });

    it('calls watchQuery when there are enough variables', async function subscribeEnoughVariables() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ client, query, variables });
      const watchQuerySpy = spy(el.client, 'watchQuery');
      expect(el.subscribe()).to.be.ok;
      expect(watchQuerySpy).to.have.been.called;
      watchQuerySpy.restore();
    });

    it('creates an observableQuery', async function subscribeCreatesObservableQuery() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ client, query, variables });
      const subscription = el.subscribe();
      expect(subscription).to.be.ok;
      expect(el.observableQuery).to.be.ok;
    });

    it('returns a subscription', async function subscribeReturnsSubscription() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ client, query, variables });
      const subscription = el.subscribe();
      expect(isSubscription(subscription)).to.be.true;
    });

    it('binds nextData to the subscription\'s next', async function bindsNextToNext() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ query, variables });
      expect(el.data).to.deep.equal({ nonNullParam: { __typename: 'NonNull', nonNull: 'nonNull' } });
    });

    it('binds nextError to the subscription\'s error', async function bindsErrorToError() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ client, query, variables });
      const subscription = el.subscribe();
      // @ts-expect-error
      subscription._observer.error('error');
      expect(el.error).to.equal('error');
    });
  });

  describe('subscribeToMore', function describeSubscribeToMore() {
    it('does nothing when there is no observableQuery', async function subscribeToMoreNoQuery() {
      const el = await getElement({ client });
      expect(el.subscribeToMore(null)).to.be.undefined;
    });

    it('calls observableQuery.subscribeToMore when there is a query', async function subscribeToMoreCallsObservableQuerySubscribeToMore() {
      const query = gql`
        query {
          noParam {
            noParam
          }
        }
      `;

      const el = await getElement({ client, query });

      const subscribeToMoreSpy = stub(el.observableQuery, 'subscribeToMore');

      // shouldn't this be an instance of ObservableQuery?
      const args = {
        document: gql`subscription { messageSent { message } }`,
        updateQuery: <T>(x: T): T => x,
      };

      expect(el.subscribeToMore(args)).to.be.undefined;
      expect(subscribeToMoreSpy).to.have.been.calledWith(args);
    });
  });

  describe('executeQuery', function describeExecuteQuery() {
    it('calls client.query with element properties', async function callsClientQuery() {
      const el = await getElement({ client });
      const queryStub = stub(el.client, 'query');
      queryStub.resolves({ data: true, loading: false, stale: false, networkStatus: 7 });
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
      queryStub.resolves({ data, loading: false, stale: false, networkStatus: 7 });
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
      const query = gql`
        query {
          noParam {
            noParam
          }
        }
      `;

      const el = await getElement({ client });

      const queryStub = stub(el.client, 'query');
      queryStub.resolves({ stale: false, loading: false, data: true, networkStatus: 7 });
      el.executeQuery({ query });
      expect(queryStub).to.have.been.calledWith(match({
        query,
      }));
      queryStub.restore();
    });

    it('defaults to element query', async function() {
      const query = gql`
        query {
          noParam {
            noParam
          }
        }
      `;

      const el = await getElement({ client, query });
      const queryStub = stub(el.client, 'query');
      queryStub.resolves({ stale: false, loading: false, data: true, networkStatus: 7 });
      el.executeQuery({ query: undefined });
      expect(queryStub).to.have.been.calledWithMatch({ query });
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
      const query = gql`
        query {
          noParam {
            noParam
          }
        }
      `;

      const el = await getElement({ client, query });
      const fetchMoreSpy = stub(el.observableQuery, 'fetchMore');
      const args = { query, updateQuery: <T>(x: T): T => x };
      expect(el.fetchMore(args)).to.be.undefined;
      expect(fetchMoreSpy).to.have.been.calledWith(match(args));
      fetchMoreSpy.restore();
    });
  });

  describe('watchQuery', function describeWatchQuery() {
    it('calls client watchQuery', async function callsClientWatchQuery() {
      const query = gql`
        query {
          noParam {
            noParam
          }
        }
      `;

      const el = await getElement({ client, query });
      const watchQueryStub = stub(el.client, 'watchQuery');
      const args = { query };
      expect(el.watchQuery(args)).to.be.undefined;
      expect(watchQueryStub).to.have.been.calledWith(match(args));
      watchQueryStub.restore();
    });

    it('returns an ObservableQuery', async function returnsObservableQuery() {
      const query = gql`
        query {
          noParam {
            noParam
          }
        }
      `;

      const el = await getElement({ client, query });
      expect(el.watchQuery(null)).to.be.an.instanceof(ObservableQuery);
    });

    it('accepts a specific query', async function() {
      const watchQueryStub = stub(client, 'watchQuery');
      const query = gql`
        query {
          noParam {
            noParam
          }
        }
      `;

      const el = await getElement({ client });
      el.watchQuery({ query });
      expect(watchQueryStub).to.have.been.calledWith(match({ query }));
      watchQueryStub.restore();
    });

    it('defaults to the element\'s query', async function() {
      const query = gql`
        query {
          noParam {
            noParam
          }
        }
      `;

      const el = await getElement({ client, query });
      const watchQueryStub = stub(el.client, 'watchQuery');
      el.watchQuery({ query: undefined });
      expect(watchQueryStub).to.have.been.calledWith(match({ query }));
      watchQueryStub.restore();
    });
  });

  describe('receiving data', function describeNextData() {
    const query = gql`
        query {
          noParam {
            noParam
          }
        }
      `;

    it('assigns to host\'s data property', async function dataAssigned() {
      const el = await getElement({ client, query });
      el.subscribe();
      expect(el.data).to.deep.equal({
        noParam: {
          __typename: 'NoParam',
          noParam: 'noParam',
        },
      });
    });

    it('assigns to host\'s loading property', async function loadingAssigned() {
      const el = await getElement({ client, query });
      el.subscribe();
      expect(el.loading).to.equal(false);
    });

    it('assigns to host\'s networkStatus property', async function networkStatusAssigned() {
      const el = await getElement({ client, query });
      el.subscribe();
      expect(el.networkStatus).to.equal(7);
    });

    it('assigns to host\'s stale property', async function staleAssigned() {
      const el = await getElement({ client, query });
      el.subscribe();
      expect(el.stale).to.equal(false);
    });
  });

  describe('nextError', function describeNextError() {
    const query = gql`
        query {
          nonNullParam(nonNull: null) {
            nonNull
          }
        }
      `;

    it('assigns to host\'s error property', async function errorAssigned() {
      const el = await getElement({ client, query });
      el.subscribe();
      expect(el.error).to.be.ok;
    });
  });
});
