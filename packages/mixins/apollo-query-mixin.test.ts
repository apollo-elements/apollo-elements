import type { ApolloQuery } from './apollo-query';

import { expect, html, defineCE, unsafeStatic, fixture, nextFrame } from '@open-wc/testing';
import { spreadProps } from '@open-wc/lit-helpers';
import gql from 'graphql-tag';
import 'sinon-chai';

import ApolloClient, { ObservableQuery } from 'apollo-client';
import { match, stub, spy } from 'sinon';

import { client, setupClient, teardownClient } from '@apollo-elements/test-helpers/client';
import { isSubscription, graphQLScriptTemplate } from '@apollo-elements/test-helpers/helpers';
import { ApolloQueryMixin } from './apollo-query-mixin';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { DocumentNode } from 'graphql';

import {
  NoParamQuery,
  NullableParamQuery,
  NoParamSubscription,
} from '@apollo-elements/test-helpers';

type Stub = ReturnType<typeof stub>
type Spy = ReturnType<typeof spy>

interface TemplateOpts {
  client?: ApolloClient<NormalizedCacheObject>;
  query?: DocumentNode;
  variables?: unknown;
  script?: string;
  onData?(): void;
  onError?(): void;
}

async function getElement(opts?: TemplateOpts): Promise<HTMLElement & ApolloQuery<unknown, unknown>> {
  const klass = ApolloQueryMixin(HTMLElement);
  const tag = unsafeStatic(defineCE(klass));
  const element = await fixture<HTMLElement & ApolloQuery<unknown, unknown>>(html`
  <${tag} ...="${spreadProps(opts ?? {})}">${graphQLScriptTemplate(opts?.script)}</${tag}>`);
  return element;
}

describe('[mixins] ApolloQueryMixin', function describeApolloQueryMixin() {
  beforeEach(setupClient);
  afterEach(teardownClient);
  afterEach(function() {
    // @ts-expect-error
    client.queryManager?.watchQuery?.restore?.();
    // @ts-expect-error
    client.watchQuery?.restore?.();
    // @ts-expect-error
    client.query?.restore?.();
  });

  it('returns an instance of the superclass', async function returnsClass() {
    expect(await getElement()).to.be.an.instanceOf(HTMLElement);
  });

  it('default properties', async function setsDefaultProperties() {
    const el = await getElement();
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
      class StubbedElement extends ApolloQueryMixin(HTMLElement)<unknown, unknown> { }
      spy(StubbedElement.prototype, 'subscribe');
      const script = 'subscription { foo }';
      const tag = unsafeStatic(defineCE(StubbedElement));
      const el = await fixture<HTMLElement & ApolloQuery<unknown, unknown>>(html`
        <${tag}>${graphQLScriptTemplate(script)}</${tag}>
      `);
      expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
      expect(el.query).to.deep.equal(gql(script));
      expect(el.subscribe).to.have.been.called;
    });

    it('accepts a parsed query', async function parsedQuery() {
      const query = NoParamQuery;
      const el = await getElement({ query });
      expect(el.query).to.equal(query);
      expect(el.observableQuery).to.be.ok;
    });

    it('rejects a bad query', async function badQuery() {
      const query = `query { foo }`;
      const el = await getElement();
      expect(() =>
        // it's a bad query
        // @ts-expect-error
        el.query = query
      ).to.throw('Query must be a gql-parsed DocumentNode');
      expect(el.query).to.be.null;
      expect(el.observableQuery).to.not.be.ok;
    });

    it('calls subscribe when set', async function callsSubscribe() {
      const query = NoParamQuery;
      const el = await getElement();
      const subscribeStub = stub(el, 'subscribe');
      el.query = query;
      expect(subscribeStub).to.have.been.called;
    });

    it('does not call subscribe when set if noAutoSubscribe is set', async function noAutoSubscribe() {
      const query = NoParamQuery;
      const el = await getElement();
      const subscribeStub = stub(el, 'subscribe');
      el.noAutoSubscribe = true;
      el.query = query;
      expect(subscribeStub).to.not.have.been.called;
    });
  });

  describe('set options', function describeSetOptions() {
    it('does nothing when there is no observableQuery', async function setOptionsNoQuery() {
      const el = await getElement();
      el.options = { errorPolicy: 'none', query: null };
      expect(el.options).to.deep.equal({ errorPolicy: 'none', query: null });
    });

    it('calls observableQuery.subscribe when there is a query', async function setOptionsCallsObservableQuerySetOptions() {
      const query = NoParamQuery;
      const el = await getElement({ query });
      const setOptionsSpy = stub(el.observableQuery, 'setOptions');
      el.options = { errorPolicy: 'none', query };
      expect(setOptionsSpy).to.have.been.calledWith({ errorPolicy: 'none', query });
    });
  });

  describe('refetch', function describeRefetch() {
    it('calls observableQuery.refetch', async function callsOQRefetch() {
      const query = NullableParamQuery;
      const el = await getElement({ query });
      const refetchSpy = spy(el.observableQuery, 'refetch');
      el.refetch({ foo: 'bar' });
      expect(refetchSpy).to.have.been.calledWith({ foo: 'bar' });
      refetchSpy.restore();
    });

    it('performs no operation when there is no observable query', async function noopRefetch() {
      const el = await getElement();
      expect(el.refetch({ foo: 'bar' })).to.be.undefined;
    });
  });

  describe('set variables', function describeSetVariables() {
    describe('without observableQuery', function() {
      let el;

      beforeEach(async function() {
        el = await getElement();
        el.variables = { errorPolicy: 'foo' };
      });

      it('does nothing', async function setVariablesNoQuery() {
        expect(el.variables).to.deep.equal({ errorPolicy: 'foo' });
      });
    });

    describe('with an observableQuery', function() {
      let el;
      let setVariablesSpy;
      const query = NoParamQuery;

      beforeEach(async function() {
        el = await getElement({ query });
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
      query NeedyQuery($nonNull: String!) {
        nonNullParam(nonNull: $nonNull)
      }`;

    it('does nothing when the query variables do not satisfy the query', async function subscribeNotEnoughVariables() {
      const variables = {};
      const el = await getElement({ client, query, variables });
      const watchQuerySpy = spy(el, 'watchQuery');
      expect(el.subscribe()).to.be.undefined;
      expect(watchQuerySpy).to.not.have.been.called;
    });

    it('calls watchQuery when there are enough variables', async function subscribeEnoughVariables() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ query, variables });
      const watchQuerySpy = spy(el, 'watchQuery');
      expect(el.subscribe()).to.be.ok;
      expect(watchQuerySpy).to.have.been.called;
    });

    it('creates an observableQuery', async function subscribeCreatesObservableQuery() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ query, variables });
      const subscription = el.subscribe();
      expect(subscription).to.be.ok;
      expect(el.observableQuery).to.be.ok;
    });

    it('returns a subscription', async function subscribeReturnsSubscription() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ query, variables });
      const subscription = el.subscribe();
      expect(isSubscription(subscription)).to.be.true;
    });

    it('binds nextData to the subscription\'s next', async function bindsNextToNext() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ query, variables });
      const subscription = el.subscribe();
      // @ts-expect-error
      expect(subscription._observer.next).to.equal(el.nextData);
    });

    it('binds nextError to the subscription\'s error', async function bindsErrorToError() {
      const variables = { nonNull: 'nonNull' };
      const el = await getElement({ query, variables });
      const subscription = el.subscribe();
      // @ts-expect-error
      expect(subscription._observer.error).to.equal(el.nextError);
    });
  });

  describe('subscribeToMore', function describeSubscribeToMore() {
    it('does nothing when there is no observableQuery', async function subscribeToMoreNoQuery() {
      const el = await getElement();
      expect(el.subscribeToMore(null)).to.be.undefined;
    });

    it('calls observableQuery.subscribeToMore when there is a query', async function subscribeToMoreCallsObservableQuerySubscribeToMore() {
      const query = NoParamQuery;
      const el = await getElement({ query });
      const subscribeToMoreSpy = stub(el.observableQuery, 'subscribeToMore');
      // shouldn't this be an instance of ObservableQuery?
      const args = { document: NoParamSubscription, updateQuery: x => x };
      expect(el.subscribeToMore(args)).to.be.undefined;
      expect(subscribeToMoreSpy).to.have.been.calledWith(args);
    });
  });

  describe('executeQuery', function describeExecuteQuery() {
    it('calls client.query with element properties', async function callsClientQuery() {
      const el = await getElement();
      const queryStub = stub(el.client, 'query');
      queryStub.resolves({ data: true, loading: false, networkStatus: 7, stale: false });
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
      const el = await getElement();
      const queryStub = stub(el.client, 'query');
      const data = { foo: 'bar' };
      queryStub.resolves({ data, loading: false, networkStatus: 7, stale: false });
      await el.executeQuery();
      expect(el.data).to.equal(data);
      queryStub.restore();
    });

    it('updates error with the error', async function updatesErrorWithError() {
      const el = await getElement();
      const queryStub = stub(el.client, 'query');
      const error = new Error('whoops');
      queryStub.rejects(error);
      await el.executeQuery();
      expect(el.error).to.equal(error);
      queryStub.restore();
    });

    it('accepts custom args', async function() {
      const query = NoParamQuery;
      const el = await getElement();
      const queryStub = stub(el.client, 'query');
      queryStub.resolves({ data: true, loading: false, networkStatus: 7, stale: false });
      el.executeQuery({ query });
      expect(queryStub).to.have.been.calledWith(match({
        query,
      }));
      queryStub.restore();
    });

    describe('with partial arguments', function() {
      let el;
      let queryStub;
      beforeEach(async function() {
        el = await getElement();
        queryStub = stub(el.client, 'query');
        queryStub.resolves({ data: true, loading: false, networkStatus: 7, stale: false });
      });

      afterEach(function() {
        queryStub.restore();
      });

      it('defaults to element query', async function() {
        el.query = NoParamQuery;
        const variables = { foo: 'bar' };
        const { query } = el;
        el.executeQuery({ variables });
        expect(queryStub).to.have.been.calledWithMatch({ query, variables });
      });

      it('defaults to element variables', async function() {
        el.variables = { foo: 'bar' };
        const { variables } = el;
        const query = NoParamQuery;
        el.executeQuery({ query });
        expect(queryStub).to.have.been.calledWithMatch({ query, variables });
      });
    });
  });

  describe('fetchMore', function describeFetchMore() {
    it('does nothing when there is no observableQuery', async function fetchMoreNoQuery() {
      const el = await getElement();
      expect(el.fetchMore()).to.be.undefined;
      expect(el.observableQuery).to.be.undefined;
    });

    it('calls observableQuery.fetchMore when there is a query', async function fetchMoreCallsObservableQuerySubscribeToMore() {
      const query = NoParamQuery;
      const el = await getElement({ query });
      const fetchMoreSpy = stub(el.observableQuery, 'fetchMore');
      const args = { query, updateQuery: x => x };
      expect(el.fetchMore(args)).to.be.undefined;
      expect(fetchMoreSpy).to.have.been.calledWith(match(args));
      fetchMoreSpy.restore();
    });
  });

  describe('watchQuery', function describeWatchQuery() {
    it('calls client watchQuery', async function callsClientWatchQuery() {
      const watchQueryStub = spy(client, 'watchQuery');
      const query = NoParamQuery;
      const el = await getElement({ client, query });
      const args = { query };
      el.watchQuery(args);
      expect(watchQueryStub).to.have.been.calledWith(match(args));
      watchQueryStub.restore();
    });

    it('returns an ObservableQuery', async function returnsObservableQuery() {
      const query = NoParamQuery;
      const el = await getElement({ client, query });
      const actual = el.watchQuery();
      expect(actual).to.be.an.instanceof(ObservableQuery);
    });

    it('accepts a specific query', async function() {
      const watchQueryStub = stub(client, 'watchQuery');
      const query = NoParamQuery;
      const el = await getElement({ client });
      el.watchQuery({ query });
      expect(watchQueryStub).to.have.been.calledWithMatch({ query });
      watchQueryStub.restore();
    });

    it('defaults to the element\'s query', async function() {
      const watchQueryStub = spy(client, 'watchQuery');
      const query = NoParamQuery;
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
          // @ts-expect-error
          SOMETHING_SILLY: true,
        },
      };

      const watchQueryStub = spy(client.queryManager, 'watchQuery');
      const query = NoParamQuery;
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

  describe('when query rejects', function() {
    let el: ApolloQuery<unknown, unknown>;
    let onData: Spy;
    let onError: Spy;

    const query = gql`
      query {
        nonNullParam {
          nonexistent
        }
      }
    `;

    beforeEach(async function() {
      onData = spy();
      onError = spy();
      el = await getElement({ query, onData, onError });
      await nextFrame();
    });

    afterEach(function() {
      onData.resetHistory?.();
      onData = undefined;
      onError.resetHistory?.();
      onError = undefined;
      el = undefined;
    });

    it('calls onData', function() {
      expect(onError).to.have.been.called;
      expect(onData).to.not.have.been.called;
    });
  });

  describe('when query resolves', function() {
    let el: ApolloQuery<unknown, unknown>;
    let onData: Spy;
    let onError: Spy;

    const query = gql`
      query {
        nonNullParam(nonNull: "yup") {
          nonNull
        }
      }
    `;

    beforeEach(async function() {
      onData = spy();
      onError = spy();
      el = await getElement({ query, onData, onError });
    });

    afterEach(function() {
      onData.resetHistory?.();
      onData = undefined;
      onError.resetHistory?.();
      onError = undefined;
      el = undefined;
    });

    it('calls onData', async function() {
      expect(onError).to.not.have.been.called;
      expect(onData).to.have.been.calledWithMatch({
        data: {
          nonNullParam: {
            __typename: 'NonNull',
            nonNull: 'nonNull',
          },
        },
      });
    });
  });
});
