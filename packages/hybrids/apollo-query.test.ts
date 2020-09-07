import type { ApolloQueryInterface } from '@apollo-elements/interfaces';
import type { Hybrids } from 'hybrids';
import type Sinon from 'sinon';

import { expect, nextFrame } from '@open-wc/testing';

import NonNullableParamQuery from '@apollo-elements/test-helpers/NonNullableParam.query.graphql';
import NoParamQuery from '@apollo-elements/test-helpers/NoParam.query.graphql';
import NoParamSubscription from '@apollo-elements/test-helpers/NoParam.subscription.graphql';
import NullableParamQuery from '@apollo-elements/test-helpers/NullableParam.query.graphql';

import {
  client,
  setupClient,
  teardownClient,
  isSubscription,
  NonNullableParamQueryData,
  NonNullableParamQueryVariables,
} from '@apollo-elements/test-helpers';

import { match, stub, spy } from 'sinon';

import { define, html } from 'hybrids';

import { ApolloQuery } from './apollo-query';

import 'sinon-chai';

import gql from 'graphql-tag';

type QueryEl<D = unknown, V = unknown> =
  HTMLElement &
  ApolloQueryInterface<D, V>;

let counter = 0;

function getTagName(): string {
  const tagName = `query-element-${counter}`;
  counter++;
  return tagName;
}

const basicRender =
  <D = unknown, V = unknown>(host: QueryEl<D, V>): ReturnType<typeof html> =>
    html`${JSON.stringify(host.data, null, 2)}`;

describe('[hybrids] ApolloQuery', function describeApolloQueryMixin() {
  let element: QueryEl;
  let render = basicRender;
  let hybrid: Hybrids<QueryEl> = { ...ApolloQuery, render };

  function setupElement(properties = {}, innerHTML = '') {
    const container = document.createElement('div');
    const tag = getTagName();
    define(tag, hybrid);
    container.innerHTML = `<${tag}>${innerHTML}</${tag}>`;
    const [element] = container.children as HTMLCollectionOf<QueryEl>;
    document.body.appendChild(element);
    // @ts-expect-error: ??
    const update = render({ ...element, ...properties });
    update({ ...element, ...properties }, container);

    return element;
  }

  function setupFixture() {
    element = setupElement();
  }

  function setMockedClient() {
    element.client = client;
  }

  function teardownFixture() {
    element?.remove?.();
    element = undefined;
    render = basicRender;
    hybrid = { ...ApolloQuery, render };
  }

  /* Spies */

  let observableQuerySubscribeToMoreSpy: Sinon.SinonSpy;

  let refetchSpy: Sinon.SinonSpy;

  let observableQueryFetchMoreSpy: Sinon.SinonSpy;

  let observableQuerySetOptionsSpy: Sinon.SinonSpy;

  function spyRefetch() {
    refetchSpy = spy(element, 'refetch');
  }

  function restoreRefetch() {
    refetchSpy.restore();
  }

  function spyObservableQuerySubscribeToMore() {
    observableQuerySubscribeToMoreSpy = stub(element.observableQuery, 'subscribeToMore');
  }

  function restoreObservableQuerySubscribeToMore() {
    observableQuerySubscribeToMoreSpy.restore();
  }

  function spyObservableQueryFetchMore() {
    observableQueryFetchMoreSpy = stub(element.observableQuery, 'fetchMore');
  }

  function restoreObservableQueryFetchMore() {
    observableQueryFetchMoreSpy.restore();
  }

  function spyObservableQuerySetOptions() {
    observableQuerySetOptionsSpy = stub(element.observableQuery, 'setOptions');
  }

  function restoreObservableQuerySetOptions() {
    observableQuerySetOptionsSpy.restore();
  }

  /* Queries and Variables */

  function setNullableParamQuery() {
    element.query = NullableParamQuery;
  }

  function setNullableParamVariables() {
    element.variables = { nullable: 'nullable' };
  }

  function setNonNullableParamQuery() {
    element.query = NonNullableParamQuery;
  }

  function setInsufficientNonNullableQueryVariables() {
    element.variables = {};
  }

  function setSufficientNonNullableQueryVariables() {
    element.variables = { nonNull: 'nonNull' };
  }

  function setErrorNonNullableQueryVariables() {
    element.variables = { nonNull: 'error' };
  }

  async function setNoParamQuery() {
    element.query = NoParamQuery;
  }

  beforeEach(setupClient);
  beforeEach(setupFixture);
  afterEach(teardownFixture);
  afterEach(teardownClient);

  it('sets default properties', async function setsDefaultProperties() {
    expect(element.data, 'data').to.be.null;
    expect(element.error, 'error').to.be.null;
    expect(element.errors, 'errors').to.be.null;
    expect(element.errorPolicy, 'errorPolicy').to.equal('none');
    expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
    expect(element.networkStatus, 'networkStatus').to.be.undefined;
    expect(element.nextFetchPolicy, 'nextFetchPolicy').to.be.undefined;
    expect(element.noAutoSubscribe, 'noAutoSubscribe').to.be.false;
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
    expect(element.variables, 'variables').to.be.null;
    expect(element.refetch, 'refetch').to.be.an.instanceOf(Function);
  });

  describe('when window.__APOLLO_CLIENT__ is set', function() {
    let cached: typeof window.__APOLLO_CLIENT__;

    beforeEach(function() {
      cached = window.__APOLLO_CLIENT__;
      window.__APOLLO_CLIENT__ = {} as typeof window.__APOLLO_CLIENT__;
      element = setupElement();
    });

    afterEach(function() {
      window.__APOLLO_CLIENT__ = cached;
    });

    it('uses global client', async function defaultsToGlobalClient() {
      expect(element.client).to.equal(window.__APOLLO_CLIENT__);
    });
  });

  describe('query property', function() {
    beforeEach(setMockedClient);

    it('subscribes on set', async function subscribeeOnSetQuery() {
      expect(element.observableQuery).to.not.be.ok;

      element.query = NoParamQuery;

      expect(element.observableQuery).to.be.ok;
    });

    it('accepts a script child on connect', async function scriptChild() {
      teardownFixture();
      const script = NoParamQuery.loc.source.body;

      const innerHTML = `
        <script type="application/graphql">
          ${script}
        </script>
      `;

      element = setupElement({}, innerHTML);

      expect(element.firstElementChild).to.be.an.instanceof(HTMLScriptElement);

      expect(element.query).to.deep.equal(gql(script));
    });

    it('accepts a parsed query', async function parsedQuery() {
      expect(element.query).to.be.null;
      expect(element.observableQuery).to.not.be.ok;

      element.query = NoParamQuery;

      expect(element.query, 'set query').to.equal(NoParamQuery);
      expect(element.observableQuery, 'get observableQuery').to.be.ok;
    });

    it('rejects a bad query', async function badQuery() {
      const query = `query { noParam }`;

      // @ts-expect-error: checking error
      expect(() => element.query = query).to.throw('Query must be a gql-parsed DocumentNode');
      expect(element.query).to.be.null;
      expect(element.observableQuery).to.not.be.ok;
    });

    it('observes children for addition of query script', async function() {
      const doc = NoParamQuery.loc.source.body;

      expect(element.query).to.be.null;

      element.innerHTML = `<script type="application/graphql">${doc}</script>`;

      await nextFrame();

      expect(element.query).to.deep.equal(gql(doc));
    });

    it('does not change document for invalid children', async function() {
      const doc = `query { noParam }`;

      expect(element.query).to.be.null;

      element.innerHTML = `<script>${doc}</script>`;

      await nextFrame();

      expect(element.query).to.be.null;
    });
  });

  describe('setting options', function describeSetOptions() {
    function setOptions() {
      element.options = { query: null, errorPolicy: 'none' };
    }

    beforeEach(setOptions);

    describe('when there is no query', function() {
      it('does nothing when there is no observableQuery', async function setOptionsNoQuery() {
        element.options = { query: null, errorPolicy: 'none' };
        expect(element.options).to.deep.equal({ query: null, errorPolicy: 'none' });
      });
    });

    describe('when there is a query', function() {
      beforeEach(setNoParamQuery);
      beforeEach(spyObservableQuerySetOptions);
      afterEach(restoreObservableQuerySetOptions);

      it('calls observableQuery.subscribe', async function() {
        element.options = { query: null, errorPolicy: 'none' };
        expect(observableQuerySetOptionsSpy)
          .to.have.been.calledWithMatch({ query: null, errorPolicy: 'none' });
      });
    });
  });

  describe('setting variables', function describeSetVariables() {
    beforeEach(setMockedClient);
    describe('without observableQuery', function() {
      beforeEach(setNullableParamVariables);
      it('does nothing', async function setVariablesNoQuery() {
        expect(element.variables).to.deep.equal({ nullable: 'nullable' });
      });
    });

    // classMethod factory is breaking sinon spies
    describe.skip('with an observableQuery', function() {
      beforeEach(setNullableParamQuery);
      beforeEach(spyRefetch);
      beforeEach(setNullableParamVariables);
      afterEach(restoreRefetch);
      it('calls refetch', async function() {
        expect(refetchSpy).to.have.been.calledWithMatch({ nullable: 'nullable' });
      });
    });
  });

  describe('subscribe', function describeSubscribe() {
    beforeEach(setMockedClient);
    beforeEach(setNonNullableParamQuery);

    describe('with insufficient variables', function() {
      beforeEach(setInsufficientNonNullableQueryVariables);
      beforeEach(nextFrame);

      it('fails to query', async function subscribeNotEnoughVariables() {
        expect(element.data).to.be.null;
        expect(element.error).to.be.null;

        expect(element.subscribe()).to.be.ok;

        await nextFrame();

        expect(element.data, 'error').to.be.null;
        expect(element.error.message)
          .to.equal('Variable "$nonNull" of required type "String!" was not provided.');
      });
    });

    describe('with sufficient variables', function() {
      beforeEach(setSufficientNonNullableQueryVariables);
      beforeEach(() => element.subscribe());
      beforeEach(nextFrame);

      it('queries', async function subscribeEnoughVariables() {
        expect(element.data)
          .to.deep.equal({ nonNullParam: { __typename: 'NonNull', nonNull: 'nonNull' } });
        expect(element.error).to.be.null;
      });

      it('creates an observableQuery', async function subscribeCreatesObservableQuery() {
        expect(element.observableQuery).to.be.ok;
      });

      it('creates a subscription', async function subscribeReturnsSubscription() {
        expect(isSubscription(element.subscribe())).to.be.true;
      });
    });

    describe('with a GraphQL error', function() {
      beforeEach(setErrorNonNullableQueryVariables);
      beforeEach(nextFrame);

      it('sets element error', async function bindsErrorToError() {
        expect(element.error.message).to.equal('error');
      });
    });
  });

  describe('subscribeToMore', function describeSubscribeToMore() {
    beforeEach(setMockedClient);

    describe('without a query', function() {
      it('does nothing', async function subscribeToMoreNoQuery() {
        expect(element.subscribeToMore(null)).to.be.undefined;
      });
    });

    describe('with a query and sufficient variables', function() {
      beforeEach(setNoParamQuery);
      beforeEach(nextFrame);
      beforeEach(spyObservableQuerySubscribeToMore);
      beforeEach(nextFrame);
      afterEach(restoreObservableQuerySubscribeToMore);
      it('calls observableQuery.subscribeToMore when there is a query', async function() {
        const opts = {
          document: NoParamSubscription,
          updateQuery: <T>(x: T): T => x,
        };

        expect(element.subscribeToMore(opts)).to.be.undefined;

        expect(observableQuerySubscribeToMoreSpy).to.have.been.calledWithMatch(opts);
      });
    });
  });

  describe('executeQuery', function describeExecuteQuery() {
    beforeEach(setMockedClient);
    describe('with insufficient variables on element', function() {
      beforeEach(async function() {
        element.query = NonNullableParamQuery;
      });

      describe('when calling with variables', function() {
        beforeEach(async function() {
          type D = NonNullableParamQueryData;
          type V = NonNullableParamQueryVariables;

          await (element as ApolloQueryInterface<D, V>)
            .executeQuery({ variables: { nonNull: 'nonNull' } });
        });

        it('queries with element properties', async function callsClientQuery() {
          expect(element.data).to.deep.equal({
            nonNullParam: {
              __typename: 'NonNull',
              nonNull: 'nonNull',
            },
          });
          expect(element.error, 'error').to.be.null;
          expect(element.loading).to.be.false;
          expect(element.partial).to.not.be.ok;
          expect(element.networkStatus).to.equal(7);
        });
      });
    });

    describe('with variables set on element', function() {
      beforeEach(async function() {
        element.variables = { nonNull: 'nonNull' };
      });

      describe('calling with a query param', function() {
        beforeEach(async function() {
          await element.executeQuery({ query: NonNullableParamQuery });
        });

        it('queries', async function() {
          expect(element.data).to.deep.equal({
            nonNullParam: {
              __typename: 'NonNull',
              nonNull: 'nonNull',
            },
          });
        });
      });
    });
  });

  describe('fetchMore', function describeFetchMore() {
    describe('without a query', function() {
      it('does nothing', async function fetchMoreNoQuery() {
        expect(element.fetchMore()).to.be.undefined;
        expect(element.observableQuery).to.be.undefined;
      });
    });

    describe('with a query', function() {
      beforeEach(setNoParamQuery);
      beforeEach(spyObservableQueryFetchMore);
      afterEach(restoreObservableQueryFetchMore);
      it('calls observableQuery.fetchMore', async function() {
        const args = { query: NoParamQuery, updateQuery: <T>(x: T): T => x };

        expect(element.fetchMore(args)).to.be.undefined;

        expect(observableQueryFetchMoreSpy).to.have.been.calledWith(match(args));
      });
    });
  });

  describe('watchQuery', function describeWatchQuery() {
    describe('without a query set on the element', function() {
      describe('calling with a query', function() {
        it('creates an ObservableQuery with the passed query', function callsClientWatchQuery() {
          const oq = element.watchQuery({ query: NoParamQuery });
          expect(oq.options.query).to.equal(NoParamQuery);
        });
      });
    });

    describe('with a query set on the element', function() {
      beforeEach(setNoParamQuery);
      describe('calling with a query', function() {
        it('creates an ObservableQuery with the passed query', function callsClientWatchQuery() {
          const oq = element.watchQuery({ query: NoParamQuery });
          expect(oq.options.query).to.equal(NoParamQuery);
        });
      });
    });
  });

  describe('receiving data', function describeNextData() {
    beforeEach(setNoParamQuery);
    beforeEach(nextFrame);

    it('assigns to host\'s data property', async function dataAssigned() {
      expect(element.data).to.deep.equal({
        noParam: {
          __typename: 'NoParam',
          noParam: 'noParam',
        },
      });
    });

    it('assigns to host\'s loading property', async function loadingAssigned() {
      expect(element.loading).to.equal(false);
    });

    it('assigns to host\'s networkStatus property', async function networkStatusAssigned() {
      expect(element.networkStatus).to.equal(7);
    });

    it('assigns to host\'s partial property', async function partialAssigned() {
      expect(element.partial).to.be.undefined;
    });
  });

  describe('receiving error', function describeNextError() {
    beforeEach(setNonNullableParamQuery);
    beforeEach(setErrorNonNullableQueryVariables);
    beforeEach(nextFrame);
    it('assigns to host\'s error property', async function errorAssigned() {
      expect(element.error).to.be.ok;
    });
  });
});
