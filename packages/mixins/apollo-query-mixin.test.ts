import type Sinon from 'sinon';
import type {
  NonNullableParamQueryData,
  NonNullableParamQueryVariables,
  NoParamQueryData,
  NoParamQueryVariables,
  NullableParamQueryData,
  NullableParamQueryVariables,
} from '@apollo-elements/test-helpers';

import { expect, html as fhtml, defineCE, unsafeStatic, fixture, nextFrame } from '@open-wc/testing';
import gql from 'graphql-tag';
import 'sinon-chai';

import { ObservableQuery, FetchPolicy } from '@apollo/client/core';
import { match, stub, spy } from 'sinon';

import { client, setupClient, teardownClient } from '@apollo-elements/test-helpers/client';
import { isSubscription } from '@apollo-elements/test-helpers/helpers';
import { ApolloQueryMixin } from './apollo-query-mixin';

import NonNullableParamQuery from '@apollo-elements/test-helpers/NonNullableParam.query.graphql';
import NoParamQuery from '@apollo-elements/test-helpers/NoParam.query.graphql';
import NoParamSubscription from '@apollo-elements/test-helpers/NoParam.subscription.graphql';
import NullableParamQuery from '@apollo-elements/test-helpers/NullableParam.query.graphql';

/* eslint-disable @typescript-eslint/no-unused-vars */
class AccessorTest extends ApolloQueryMixin(HTMLElement)<unknown, { hey: 'yo' }> {
  // @ts-expect-error: don't allow using accessors. Run a function when dependencies change instead
  get variables() {
    return { hey: 'yo' as const };
  }
}

class PropertyTest extends ApolloQueryMixin(HTMLElement)<unknown, { hey: 'yo' }> {
  variables = { hey: 'yo' as const };
}
/* eslint-enable @typescript-eslint/no-unused-vars */

class XL extends HTMLElement {}
class Test<D = unknown, V = unknown> extends ApolloQueryMixin(XL)<D, V> {}

describe('[mixins] ApolloQueryMixin', function describeApolloQueryMixin() {
  let subscribeSpy: Sinon.SinonSpy;

  afterEach(function() {
    subscribeSpy?.restore?.();
    subscribeSpy = undefined;
  });

  beforeEach(setupClient);
  afterEach(teardownClient);
  afterEach(function() {
    // @ts-expect-error: its a stub;
    client.queryManager?.watchQuery?.restore?.();
    // @ts-expect-error: its a stub;
    client.watchQuery?.restore?.();
    // @ts-expect-error: its a stub;
    client.query?.restore?.();
  });

  describe('instantiating simple derived class', function() {
    let element: Test;

    async function setupElement() {
      const tag = unsafeStatic(defineCE(class extends Test {}));
      element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    }

    beforeEach(setupElement);

    it('returns an instance of the superclass', async function returnsClass() {
      expect(element).to.be.an.instanceOf(HTMLElement);
    });

    it('has default properties', async function setsDefaultProperties() {
      expect(element.data, 'data').to.be.null;
      expect(element.error, 'error').to.be.null;
      expect(element.errors, 'errors').to.be.null;
      expect(element.errorPolicy, 'errorPolicy').to.equal('none');
      expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
      expect(element.networkStatus, 'networkStatus').to.be.undefined;
      expect(element.nextFetchPolicy, 'nextFetchPolicy').to.be.undefined;
      expect(element.noAutoSubscribe, 'noAuthSubscribe').to.be.false;
      expect(element.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange').to.be.undefined;
      expect(element.observableQuery, 'observableQuery').to.be.undefined;
      expect(element.onData, 'onData').to.be.undefined;
      expect(element.onError, 'onError').to.be.undefined;
      expect(element.options, 'options').to.be.undefined;
      expect(element.partial, 'partial').to.be.undefined;
      expect(element.partialRefetch, 'partialRefetch').to.be.undefined;
      expect(element.pollInterval, 'pollInterval').to.be.undefined;
      expect(element.query, 'query').to.be.null;
      expect(element.returnPartialData, 'returnPartialData').to.be.undefined;
      expect(element.variables, 'variables').to.be.undefined;
    });

    describe('when window.__APOLLO_CLIENT__ is set', function() {
      let cached: typeof window.__APOLLO_CLIENT__;

      beforeEach(function() {
        cached = window.__APOLLO_CLIENT__;
        window.__APOLLO_CLIENT__ = {} as typeof window.__APOLLO_CLIENT__;
      });

      beforeEach(setupElement);

      afterEach(function() {
        window.__APOLLO_CLIENT__ = cached;
      });

      it('uses global client', async function defaultsToGlobalClient() {
        expect(element.client).to.equal(window.__APOLLO_CLIENT__);
      });
    });
  });

  describe('instantiating with graphql script child', function() {
    const script = NoParamQuery.loc.source.body;

    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test<NoParamQueryData, NoParamQueryVariables> { }));

      subscribeSpy = spy(Test.prototype, 'subscribe');

      element = await fixture<Test>(fhtml`
        <${tag}>
          <script type="application/graphql">
            ${script}
          </script>
        </${tag}>
      `);
    });

    it('does not remove script', async function() {
      expect(element.firstElementChild).to.be.an.instanceof(HTMLElement);
    });

    it('sets query property', async function() {
      expect(element.query).to.deep.equal(gql(script));
    });

    it('calls subscribe', function() {
      expect(subscribeSpy).to.have.been.called;
    });
  });

  describe('query property', function() {
    describe('without setting as class field', function() {
      let element: Test;

      beforeEach(async function() {
        subscribeSpy = spy(Test.prototype, 'subscribe');

        const tag = unsafeStatic(defineCE(class extends Test { }));

        element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
      });

      describe('setting a malformed query', function() {
        it('throws an error', async function badQuery() {
          // @ts-expect-error: testing the error handler
          expect(() => element.query = 'query { foo }').to.throw('Query must be a gql-parsed DocumentNode');
          expect(element.query, 'does not set query property').to.be.null;
          expect(element.observableQuery, 'does not initialize an observableQuery').to.not.be.ok;
        });
      });

      describe('setting a valid query', function() {
        beforeEach(function() {
          element.query = NoParamQuery;
        });

        it('calls subscribe', async function callsSubscribe() {
          expect(subscribeSpy).to.have.been.called;
        });
      });
    });

    describe('with noAutoSubscribe set as a class field', function() {
      let element: Test;

      beforeEach(async function() {
        subscribeSpy = spy(Test.prototype, 'subscribe');

        const tag = unsafeStatic(defineCE(class extends Test<NoParamQueryData, NoParamQueryVariables> {
          noAutoSubscribe = true;
        }));

        element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
      });

      describe('setting a valid query', function() {
        beforeEach(function() {
          element.query = NoParamQuery;
        });

        it('does not call subscribe', async function noAutoSubscribe() {
          expect(subscribeSpy).to.not.have.been.called;
        });
      });
    });

    describe('with valid query set as a class field', function() {
      let element: Test;

      beforeEach(async function() {
        subscribeSpy = spy(Test.prototype, 'subscribe');

        const tag = unsafeStatic(defineCE(class extends Test<NoParamQueryData, NoParamQueryVariables> {
          query = NoParamQuery;
        }));

        element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
      });

      it('sets the query property', async function() {
        expect(element.query).to.equal(NoParamQuery);
      });

      it('initializes an observableQuery', async function() {
        expect(element.observableQuery).to.be.ok;
      });

      it('initializes an observableQuery', async function() {
        expect(element.observableQuery).to.be.ok;
      });
    });
  });

  describe('set options', function describeSetOptions() {
    it('does nothing when there is no observableQuery', async function setOptionsNoQuery() {
      const tag = unsafeStatic(defineCE(class extends Test {}));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      element.options = { errorPolicy: 'none', query: null };
      expect(element.options).to.deep.equal({ errorPolicy: 'none', query: null });
    });

    it('calls observableQuery.subscribe when there is a query', async function setOptionsCallsObservableQuerySetOptions() {
      const tag = unsafeStatic(defineCE(class extends Test<NoParamQueryData, NoParamQueryVariables> {
        query = NoParamQuery;
      }));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      const setOptionsSpy = stub(element.observableQuery, 'setOptions');

      element.options = { errorPolicy: 'none', query: NoParamQuery };

      expect(setOptionsSpy).to.have.been.calledWith({ errorPolicy: 'none', query: NoParamQuery });
    });
  });

  describe('refetch', function describeRefetch() {
    it('calls observableQuery.refetch', async function callsOQRefetch() {
      const tag = unsafeStatic(defineCE(class extends Test<NullableParamQueryData, NullableParamQueryVariables> {
        query = NullableParamQuery;
      }));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      const refetchSpy = spy(element.observableQuery, 'refetch');

      element.refetch({ foo: 'bar' });

      expect(refetchSpy).to.have.been.calledWith({ foo: 'bar' });
      refetchSpy.restore();
    });

    it('performs no operation when there is no observable query', async function noopRefetch() {
      const tag = unsafeStatic(defineCE(class extends Test {}));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      expect(element.refetch({ foo: 'bar' })).to.be.undefined;
    });
  });

  describe('set variables', function describeSetVariables() {
    describe('without query property', function() {
      it('does nothing', async function setVariablesNoQuery() {
        const tag = unsafeStatic(defineCE(class extends Test {}));

        const element = await fixture<Test>(fhtml`
          <${tag}></${tag}>
        `);

        element.variables = { errorPolicy: 'foo' };

        expect(element.variables).to.deep.equal({ errorPolicy: 'foo' });
        expect(element.observableQuery).to.not.be.ok;
      });
    });

    describe('with query property', function() {
      let element: Test<NoParamQueryData, NoParamQueryVariables>;

      let refetchSpy: Sinon.SinonSpy;

      beforeEach(async function() {
        const tag = unsafeStatic(defineCE(class extends Test<NoParamQueryData, NoParamQueryVariables> {
          query = NoParamQuery;
        }));

        element = await fixture<Test<NoParamQueryData, NoParamQueryVariables>>(fhtml`<${tag}></${tag}>`);
        refetchSpy = spy(element, 'refetch');
      });

      afterEach(function() {
        refetchSpy.restore();
      });

      it('calls refetch', async function setVariablesCallsObservableQuerySetVariables() {
        // @ts-expect-error: incorrectly setting variables
        element.variables = { errorPolicy: 'foo' };
        expect(refetchSpy).to.have.been.calledWith(match({ errorPolicy: 'foo' }));
      });
    });

    describe('with existing class field variables', function() {
      let element: Test<NullableParamQueryData, NullableParamQueryVariables>;

      let refetchSpy: Sinon.SinonSpy;

      beforeEach(async function() {
        const tag = unsafeStatic(defineCE(class extends Test<NullableParamQueryData, NullableParamQueryVariables> {
          query = NullableParamQuery;

          variables = { nullable: 'nullable' };
        }));

        element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
        refetchSpy = spy(element, 'refetch');
      });

      afterEach(function() {
        refetchSpy.restore();
      });

      describe('setting new variables', function() {
        beforeEach(function() {
          element.variables = { nullable: '🍟' };
        });

        it('calls refetch', async function setVariablesCallsObservableQuerySetVariables() {
          expect(refetchSpy).to.have.been.calledOnceWith(match({ nullable: '🍟' }));
        });
      });
    });
  });

  describe('subscribe', function describeSubscribe() {
    describe('when the query variables do not satisfy the query', function() {
      let element: Test<NonNullableParamQueryData, NonNullableParamQueryVariables>;

      let watchQuerySpy: Sinon.SinonSpy;

      beforeEach(async function() {
        const tag = unsafeStatic(defineCE(class extends Test<NonNullableParamQueryData, NonNullableParamQueryVariables> {
          client = client;

          query = NonNullableParamQuery;
        }));

        element = await fixture(fhtml`<${tag}></${tag}>`);

        watchQuerySpy = spy(element, 'watchQuery');
      });

      afterEach(function() {
        watchQuerySpy.restore();
        element = undefined;
        watchQuerySpy = undefined;
      });

      beforeEach(function() {
        element.subscribe();
      });

      it('calls watchQuery', async function() {
        expect(watchQuerySpy).to.have.been.called;
      });

      it('creates an observableQuery', async function() {
        expect(element.observableQuery).to.be.ok;
      });
    });

    describe('when the query variables satisfy the query', function() {
      let element: Test<NonNullableParamQueryData, NonNullableParamQueryVariables>;

      let watchQuerySpy: Sinon.SinonSpy;

      let subscription: ZenObservable.Subscription;

      beforeEach(async function() {
        const tag = unsafeStatic(defineCE(class extends Test<NonNullableParamQueryData, NonNullableParamQueryVariables> {
          client = client;

          query = NonNullableParamQuery;

          variables = { nonNull: 'nonNull' };
        }));

        element = await fixture(fhtml`<${tag}></${tag}>`);

        watchQuerySpy = spy(element, 'watchQuery');
      });

      afterEach(function() {
        watchQuerySpy.restore();
        element = undefined;
        subscription = undefined;
        watchQuerySpy = undefined;
      });

      beforeEach(function() {
        subscription = element.subscribe();
      });

      it('calls watchQuery', async function subscribeEnoughVariables() {
        expect(watchQuerySpy).to.have.been.called;
      });

      it('creates an observableQuery', async function subscribeCreatesObservableQuery() {
        expect(element.observableQuery).to.be.ok;
      });

      it('returns a subscription', async function subscribeReturnsSubscription() {
        expect(isSubscription(subscription)).to.be.true;
      });
    });
  });

  describe('subscribeToMore', function describeSubscribeToMore() {
    it('does nothing when there is no observableQuery', async function subscribeToMoreNoQuery() {
      const tag = unsafeStatic(defineCE(class extends Test {}));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      expect(element.subscribeToMore(null)).to.be.undefined;
    });

    it('calls observableQuery.subscribeToMore when there is a query', async function subscribeToMoreCallsObservableQuerySubscribeToMore() {
      const tag = unsafeStatic(defineCE(class extends Test<NoParamQueryData, NoParamQueryVariables> {
        query = NoParamQuery;
      }));

      const element = await fixture<Test<NoParamQueryData, NoParamQueryVariables>>(fhtml`<${tag}></${tag}>`);

      const subscribeToMoreSpy = stub(element.observableQuery, 'subscribeToMore');

      const args = { document: NoParamSubscription, updateQuery: x => x };
      expect(element.subscribeToMore(args)).to.be.undefined;
      expect(subscribeToMoreSpy).to.have.been.calledWith(args);
    });
  });

  describe('executeQuery', function describeExecuteQuery() {
    it('calls client.query with element properties', async function callsClientQuery() {
      const tag = unsafeStatic(defineCE(class extends Test { }));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      const queryStub = stub(element.client, 'query');
      queryStub.resolves({ data: true, loading: false, networkStatus: 7, partial: undefined });
      const { errorPolicy, fetchPolicy, query } = element;
      element.executeQuery();
      expect(queryStub).to.have.been.calledWith(match({ errorPolicy, fetchPolicy, query }));
      queryStub.restore();
    });

    it('updates data with the response', async function updatesDataWithResponse() {
      const tag = unsafeStatic(defineCE(class extends Test { }));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      const queryStub = stub(element.client, 'query');
      const data = { foo: 'bar' };
      queryStub.resolves({ data, loading: false, networkStatus: 7, partial: undefined });
      await element.executeQuery();
      expect(element.data).to.equal(data);
      queryStub.restore();
    });

    it('updates error with the error', async function updatesErrorWithError() {
      const tag = unsafeStatic(defineCE(class extends Test<NonNullableParamQueryData, NonNullableParamQueryVariables> {
        query = NonNullableParamQuery;
      }));

      const element = await fixture<Test<NonNullableParamQueryData, NonNullableParamQueryVariables>>(fhtml`<${tag}></${tag}>`);

      try {
        const r = await element.executeQuery({ variables: { nonNull: 'error' } });
        if (r)
          expect.fail('did not reject query', r.data.nonNullParam.nonNull);
      } catch (e) {
        expect(element.error).to.equal(e);
      }
    });

    it('accepts custom args', async function() {
      const query = NoParamQuery;

      class Test extends ApolloQueryMixin(HTMLElement)<NoParamQueryData, NoParamQueryData> {
      }

      const tag = unsafeStatic(defineCE(Test));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      const queryStub = stub(element.client, 'query');

      queryStub.resolves({ data: true, loading: false, networkStatus: 7, partial: undefined });

      element.executeQuery({ query });

      expect(queryStub).to.have.been.calledWith(match({ query }));

      queryStub.restore();
    });

    describe('with partial arguments', function() {
      class Test extends ApolloQueryMixin(HTMLElement)<unknown, unknown> { }

      const tag = unsafeStatic(defineCE(Test));

      let element: Test;

      let queryStub: Sinon.SinonStub;

      beforeEach(async function() {
        element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
        queryStub = stub(element.client, 'query');
        queryStub.resolves({ data: true, loading: false, networkStatus: 7, partial: undefined });
      });

      afterEach(function() {
        queryStub.restore();
      });

      it('defaults to element query', async function() {
        element.query = NoParamQuery;
        const variables = { foo: 'bar' };
        const { query } = element;
        element.executeQuery({ variables });
        expect(queryStub).to.have.been.calledWithMatch({ query, variables });
      });

      it('defaults to element variables', async function() {
        element.variables = { foo: 'bar' };
        const { variables } = element;
        const query = NoParamQuery;
        element.executeQuery({ query });
        expect(queryStub).to.have.been.calledWithMatch(match({ variables }));
      });
    });
  });

  describe('fetchMore', function describeFetchMore() {
    it('does nothing when there is no observableQuery', async function fetchMoreNoQuery() {
      class Test extends ApolloQueryMixin(HTMLElement)<unknown, unknown> {
      }

      const tag = unsafeStatic(defineCE(Test));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      expect(element.fetchMore()).to.be.undefined;
      expect(element.observableQuery).to.be.undefined;
    });

    it('calls observableQuery.fetchMore when there is a query', async function fetchMoreCallsObservableQuerySubscribeToMore() {
      const query = NoParamQuery;

      class Test extends ApolloQueryMixin(HTMLElement)<unknown, unknown> {
        query = query;
      }

      const tag = unsafeStatic(defineCE(Test));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      const fetchMoreSpy = stub(element.observableQuery, 'fetchMore');
      const args = { query, updateQuery: x => x };
      expect(element.fetchMore(args)).to.be.undefined;
      expect(fetchMoreSpy).to.have.been.calledWith(match(args));
      fetchMoreSpy.restore();
    });
  });

  describe('watchQuery', function describeWatchQuery() {
    it('calls client watchQuery', async function callsClientWatchQuery() {
      const watchQueryStub = spy(client, 'watchQuery');
      const query = NoParamQuery;

      class Test extends ApolloQueryMixin(HTMLElement)<unknown, unknown> {
        client = client;

        query = query;
      }

      const tag = unsafeStatic(defineCE(Test));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      const args = { query };
      element.watchQuery(args);
      expect(watchQueryStub).to.have.been.calledWith(match(args));
      watchQueryStub.restore();
    });

    it('returns an ObservableQuery', async function returnsObservableQuery() {
      const query = NoParamQuery;

      class Test extends ApolloQueryMixin(HTMLElement)<unknown, unknown> {
        client = client;

        query = query;
      }

      const tag = unsafeStatic(defineCE(Test));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      const actual = element.watchQuery();
      expect(actual).to.be.an.instanceof(ObservableQuery);
    });

    it('accepts a specific query', async function() {
      const watchQueryStub = stub(client, 'watchQuery');

      const query = NoParamQuery;

      class Test extends ApolloQueryMixin(HTMLElement)<unknown, unknown> {
        client = client;
      }

      const tag = unsafeStatic(defineCE(Test));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      element.watchQuery({ query });
      expect(watchQueryStub).to.have.been.calledWithMatch({ query });
      watchQueryStub.restore();
    });

    it('defaults to the element\'s query', async function() {
      const watchQueryStub = spy(client, 'watchQuery');
      const query = NoParamQuery;

      class Test extends ApolloQueryMixin(HTMLElement)<unknown, unknown> {
        client = client;

        query = query;
      }

      const tag = unsafeStatic(defineCE(Test));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      element.watchQuery({ query: undefined });
      expect(watchQueryStub).to.have.been.calledWith(match({ query }));
      watchQueryStub.restore();
    });

    it('uses default options', async function() {
      const cache = client.defaultOptions;

      client.defaultOptions = {
        watchQuery: {
          notifyOnNetworkStatusChange: true,
          // @ts-expect-error: just checking that it passes arbitrary value, don't care abt the interface
          SOMETHING_SILLY: true,
        },
      };

      // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
      const watchQueryStub = spy(client.queryManager, 'watchQuery');

      const query = NoParamQuery;

      class Test extends ApolloQueryMixin(HTMLElement)<unknown, unknown> {
        client = client;

        query = query;
      }

      const tag = unsafeStatic(defineCE(Test));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      element.watchQuery({ query: undefined });

      expect(watchQueryStub).to.have.been.calledWith(match({
        query,
        notifyOnNetworkStatusChange: true,
        SOMETHING_SILLY: true,
      }));

      watchQueryStub.restore();
      client.defaultOptions = cache;
    });
  });

  describe('fetchPolicy', function() {
    let queryStub: Sinon.SinonSpy;
    beforeEach(function() {
      // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
      queryStub = spy(client.queryManager, 'watchQuery');
    });

    afterEach(function() {
      queryStub.restore();
    });

    describe('with no specific fetchPolicy', function() {
      class Test extends ApolloQueryMixin(HTMLElement)<NoParamQueryData, NoParamQueryVariables> {}
      let element: Test;

      beforeEach(async function() {
        const tag = unsafeStatic(defineCE(class extends Test {
          client = client;

          query = NoParamQuery;
        }));

        element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
      });

      it('does not set an instance fetchPolicy', function() {
        expect(element.fetchPolicy).to.be.undefined;
      });

      it('respects client default fetchPolicy', async function() {
        expect(queryStub).to.have.been
          .calledWithMatch({ fetchPolicy: 'network-only' });
      });
    });

    it('respects instance-specific fetchPolicy', async function() {
      const query = NoParamQuery;

      const fetchPolicy = 'no-cache' as FetchPolicy;

      class Test extends ApolloQueryMixin(HTMLElement)<unknown, unknown> {
        client = client;

        query = query;

        fetchPolicy = fetchPolicy;
      }

      const tag = unsafeStatic(defineCE(Test));

      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      expect(element.fetchPolicy).to.equal(fetchPolicy);
      expect(queryStub).to.have.been
        .calledWithMatch({ fetchPolicy: 'no-cache' });
    });
  });

  describe('when query rejects', function() {
    class Test extends ApolloQueryMixin(HTMLElement)<NonNullableParamQueryData, NonNullableParamQueryVariables> { }
    let element: Test;
    let onDataSpy: Sinon.SinonSpy;
    let onErrorSpy: Sinon.SinonSpy;

    beforeEach(async function setupElement() {
      const tag = unsafeStatic(defineCE(class extends Test {
        client = client;

        query = NonNullableParamQuery;

        variables = { nonNull: 'error' };

        noAutoSubscribe = true;

        onData(x) { x; }

        onError(x) { x; }
      }));

      element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    });

    beforeEach(function spyMethods() {
      onDataSpy = spy(element, 'onData');
      onErrorSpy = spy(element, 'onError');
    });

    beforeEach(function subscribe() {
      element.executeQuery();
    });

    beforeEach(nextFrame);

    afterEach(function restoreSpies() {
      onDataSpy.restore();
      onErrorSpy.restore();
      element = undefined;
    });

    it('does not call onData', function() {
      expect(onDataSpy).to.not.have.been.called;
    });

    it('calls onError', function() {
      expect(onErrorSpy).to.have.been.called;
    });
  });

  describe('when query resolves', function() {
    class Test extends ApolloQueryMixin(HTMLElement)<NullableParamQueryData, NullableParamQueryVariables> { }

    let element: Test;
    let onDataSpy: Sinon.SinonSpy;
    let onErrorSpy: Sinon.SinonSpy;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {
        query = NullableParamQuery;

        variables = { nullable: 'nullable' };

        noAutoSubscribe = true;

        onData(x) { x; }

        onError(x) { x; }
      }));
      element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    });

    beforeEach(function spyMethods() {
      onDataSpy = spy(element, 'onData');
      onErrorSpy = spy(element, 'onError');
    });

    beforeEach(function() {
      element.subscribe();
    });

    beforeEach(nextFrame);

    afterEach(function() {
      onDataSpy.restore();
      onErrorSpy.restore();
      element = undefined;
    });

    it('does not call onError', function() {
      expect(onErrorSpy).to.not.have.been.called;
    });

    it('calls onData', async function() {
      expect(onDataSpy).to.have.been.calledWithMatch({
        data: {
          nullableParam: {
            __typename: 'Nullable',
            nullable: 'nullable',
          },
        },
      });
    });
  });
});
