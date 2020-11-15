import { SetupFunction, SetupOptions, SetupResult } from './types';

import {
  defineCE,
  expect,
  fixture,
  nextFrame,
  html,
  unsafeStatic,
} from '@open-wc/testing';

import HelloQuery from './graphql/Hello.query.graphql';
import NoParamQuery from './graphql/NoParam.query.graphql';
import NullableParamQuery from './graphql/NullableParam.query.graphql';
import NonNullableParamQuery from './graphql/NonNullableParam.query.graphql';

import NoParamSubscription from './graphql/NoParam.subscription.graphql';

import gql from 'graphql-tag';

import { ApolloQueryResult, NetworkStatus } from '@apollo/client/core';

import type { ApolloQueryInterface, Constructor } from '@apollo-elements/interfaces';

import type {
  NonNullableParamQueryData,
  NonNullableParamQueryVariables,
  NoParamQueryData,
  NoParamQueryVariables,
  NullableParamQueryData,
  NullableParamQueryVariables,
} from './schema';

import { ObservableQuery } from '@apollo/client/core';

import { match, spy, SinonSpy } from 'sinon';
import { client, makeClient } from './client';
import { isSubscription, setupSpies, setupStubs } from './helpers';
import { GraphQLError } from 'graphql/error/GraphQLError';

type QE<D, V> = HTMLElement & ApolloQueryInterface<D, V>;

export interface QueryElement<D = unknown, V = unknown> extends QE<D, V> {
  hasRendered(): Promise<QueryElement<D, V>>;
  stringify(x: unknown): string;
}

export interface DescribeQueryComponentOptions {
  /**
   * Async function which returns an instance of the query element
   * The element must render a template which contains the following DOM structure
   * ```html
   * <output id="data"></output>
   * <output id="error"></output>
   * <output id="errors"></output>
   * <output id="loading"></output>
   * <output id="networkStatus"></output>
   * ```
   * On updates, each `<output>`'s text content should be
   * set to the `JSON.stringified` representation of it's associated value,
   * with 2 spaces as tabs.
   * The element must also implement a `stringify` method to perform that stringification,
   * as well as a `hasRendered` method which returns a promise that resolves when the element is finished rendering
   */
  setupFunction: SetupFunction<QueryElement>;

  /**
   * Optional: the class which setup function uses to generate the component.
   * Only relevant to class-based libraries
   */
  class?: Constructor<QueryElement>;
}

export function setupQueryClass<T extends QueryElement>(Klass: Constructor<T>): SetupFunction<T> {
  return async function setupElement<B extends T>(opts: SetupOptions<B>): Promise<SetupResult<B>> {
    // @ts-expect-error: no time for this
    class Test extends Klass { }

    const { innerHTML = '', attributes, properties } = opts ?? {};

    const tag =
      defineCE(Test);

    const spies = setupSpies(opts?.spy, Test.prototype as B);
    const stubs = setupStubs(opts?.stub, Test.prototype as B);

    const attrs = attributes ? ` ${attributes}` : '';

    const element =
      await fixture<B>(`<${tag}${attrs}>${innerHTML}</${tag}>`);

    for (const [key, val] of Object.entries(properties ?? {}))
      element[key] = val;

    return { element, spies, stubs };
  };
}

export function describeQuery(options: DescribeQueryComponentOptions): void {
  const { setupFunction, class: Klass } = options;
  describe(`ApolloQuery interface`, function() {
    describe('when simply instantiating', function() {
      let element: QueryElement;

      let spies: Record<keyof typeof element, SinonSpy>;

      let connectEvent: Event;

      let disconnectEvent: Event;

      async function waitForRender() {
        await element.hasRendered();
      }

      beforeEach(function listen() {
        window.addEventListener('apollo-element-connected', e => connectEvent = e);
      });

      beforeEach(async function setupElement() {
        ({ element, spies } = await setupFunction({
          spy: ['subscribe'],
        }));
      });

      beforeEach(function listen() {
        window.addEventListener('apollo-element-disconnected', e => disconnectEvent = e);
      });

      afterEach(function restoreSpies() {
        connectEvent = undefined;
        disconnectEvent = undefined;
        for (const spy of Object.values(spies))
          spy.restore();
      });

      beforeEach(async function waitForRender() {
        await element.hasRendered();
      });

      afterEach(function teardownElement() {
        element.remove();
        element = undefined;
      });

      it('has default properties', function() {
        expect(element.client, 'client').to.be.null;
        expect(element.data, 'data').to.be.null;
        expect(element.error, 'error').to.be.null;
        expect(element.errors, 'errors').to.be.null;
        expect(element.errorPolicy, 'errorPolicy').to.equal('none');
        expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
        expect(element.networkStatus, 'networkStatus').to.equal(NetworkStatus.ready);
        expect(element.nextFetchPolicy, 'nextFetchPolicy').to.be.undefined;
        expect(element.noAutoSubscribe, 'noAuthSubscribe').to.be.false;
        expect(element.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange').to.be.undefined;
        expect(element.observableQuery, 'observableQuery').to.be.undefined;
        expect(element.onData, 'onData').to.be.undefined;
        expect(element.onError, 'onError').to.be.undefined;
        expect(element.options, 'options').to.be.null;
        expect(element.partial, 'partial').to.be.undefined;
        expect(element.partialRefetch, 'partialRefetch').to.be.undefined;
        expect(element.pollInterval, 'pollInterval').to.be.undefined;
        expect(element.query, 'query').to.be.null;
        expect(element.returnPartialData, 'returnPartialData').to.be.undefined;
        expect(element.variables, 'variables').to.be.null;
      });

      it('caches observed properties', function() {
        const client = makeClient();
        element.client = client;
        expect(element.client, 'client').to.equal(client);

        element.client = null;
        expect(element.client, 'client').to.be.null;

        element.data = { data: 'data' };
        expect(element.data, 'data').to.deep.equal({ data: 'data' });

        const err = new Error('HAH');
        element.error = err;
        expect(element.error, 'error').to.equal(err);

        const errs = [new GraphQLError('HAH')];
        element.errors = errs;
        expect(element.errors, 'errors').to.equal(errs);

        element.loading = true;
        expect(element.loading, 'loading').to.equal(true);

        element.loading = false;
        expect(element.loading, 'loading').to.equal(false);

        element.networkStatus = 1;
        expect(element.networkStatus, 'networkStatus').to.equal(1);

        element.networkStatus = 2;
        expect(element.networkStatus, 'networkStatus').to.equal(2);

        const query = gql`{ __schema { __typename } }`;
        element.query = query;
        expect(element.query, 'query').to.equal(query);

        element.query = null;
        expect(element.query, 'query').to.be.null;
      });

      it('notifies <apollo-client>', function() {
        expect(connectEvent).to.be.ok;
        expect(connectEvent.bubbles).to.be.true;
        expect(connectEvent.composed).to.be.true;
      });

      describe('subscribeToMore()', function() {
        it('does nothing when there is no observableQuery', function() {
          expect(element.subscribeToMore(null)).to.be.undefined;
        });
      });

      describe('without setting query or variables', function() {
        async function waitForRender() {
          await element.hasRendered();
        }

        function setProperties(properties: Partial<typeof element>) {
          return function() {
            for (const [key, val] of Object.entries(properties))
              element[key] = val;
          };
        }

        beforeEach(waitForRender);

        it('renders', function() {
          expect(element.shadowRoot.getElementById('data')).to.be.ok;
          expect(element.shadowRoot.getElementById('error')).to.be.ok;
          expect(element.shadowRoot.getElementById('errors')).to.be.ok;
          expect(element.shadowRoot.getElementById('loading')).to.be.ok;
          expect(element.shadowRoot.getElementById('networkStatus')).to.be.ok;
        });

        describe('when data is set', function() {
          beforeEach(setProperties({ data: { data: 'data' } }));
          beforeEach(waitForRender);
          it('renders', function() {
            expect(element.shadowRoot.getElementById('data').textContent)
              .to.equal(element.stringify({ data: 'data' }));
          });
        });

        describe('when error is set', function() {
          beforeEach(setProperties({ error: new Error('oops') }));
          beforeEach(waitForRender);
          it('renders', function() {
            expect(element.shadowRoot.getElementById('error').textContent)
              .to.equal(element.stringify(new Error('oops')));
          });
        });

        describe('when errors is set', function() {
          beforeEach(setProperties({ errors: [new GraphQLError('oops')] }));
          beforeEach(waitForRender);
          it('renders', function() {
            expect(element.shadowRoot.getElementById('errors').textContent)
              .to.equal(element.stringify([new GraphQLError('oops')]));
          });
        });

        describe('when loading is set', function() {
          beforeEach(setProperties({ loading: true }));
          beforeEach(waitForRender);
          it('renders', function() {
            expect(element.shadowRoot.getElementById('loading').textContent)
              .to.equal('true');
          });

          describe('and then unset', function() {
            beforeEach(setProperties({ loading: false }));
            beforeEach(waitForRender);
            it('renders', function() {
              expect(element.shadowRoot.getElementById('loading').textContent)
                .to.equal('false');
            });
          });
        });

        describe('when networkStatus is set', function() {
          beforeEach(setProperties({ networkStatus: NetworkStatus.error }));
          beforeEach(waitForRender);
          it('renders', function() {
            expect(element.shadowRoot.getElementById('networkStatus').textContent)
              .to.equal(NetworkStatus.error.toString());
          });
        });
      });

      describe('setting NullableParam query', function() {
        beforeEach(function setNullableParamQuery() {
          element.query = NullableParamQuery;
        });

        beforeEach(waitForRender);

        it('does not call subscribe', function() {
          expect(element.subscribe).to.not.have.been.called;
        });

        describe('then setting variables', function() {
          beforeEach(function setVariables() {
            element.variables = { nullable: '✈' };
          });

          beforeEach(waitForRender);

          it('does not call subscribe', function() {
            expect(element.subscribe).to.not.have.been.called;
          });
        });
      });

      describe('disconnecting', function() {
        beforeEach(function disconnect() {
          element.remove();
        });

        beforeEach(nextFrame);

        it('notifies <apollo-client>', function() {
          expect(disconnectEvent).to.be.ok;
          expect(disconnectEvent.bubbles).to.be.true;
          expect(disconnectEvent.composed).to.be.true;
        });
      });
    });

    describe('with global client available', function() {
      let element: QueryElement;

      let spies: Record<keyof typeof element, SinonSpy>;

      let cached: typeof window.__APOLLO_CLIENT__;

      async function waitForRender() {
        await element.hasRendered();
      }

      const mockClient = makeClient();

      beforeEach(function setGlobalClient() {
        cached = window.__APOLLO_CLIENT__;
        window.__APOLLO_CLIENT__ = mockClient;
      });

      afterEach(function unsetGlobalClient() {
        window.__APOLLO_CLIENT__ = cached;
      });

      afterEach(function restoreSpies() {
        for (const spy of Object.values(spies ?? {}))
          spy.restore();
      });

      afterEach(function teardownElement() {
        element?.remove?.();
        element = undefined;
      });

      describe('when simply instantiating', function() {
        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            spy: ['subscribe', 'refetch'],
          }));
        });

        beforeEach(function() {
          spies['client.subscribe'] = spy(element.client, 'subscribe');
        });

        it('uses the global client', async function() {
          expect(element.client).to.equal(mockClient);
        });

        describe('setting a malformed query', function() {
          it('throws an error', async function badQuery() {
            // @ts-expect-error: testing the error handler
            expect(() => element.query = 'query { foo }')
              .to.throw('Query must be a gql-parsed DocumentNode');
            expect(element.query, 'does not set query property').to.be.null;
            expect(element.observableQuery, 'does not initialize an observableQuery').to.not.be.ok;
          });
        });

        describe('setting options property', function() {
          beforeEach(function() {
            element.options = { errorPolicy: 'none', query: null };
          });

          it('sets options', function() {
            expect(element.options).to.deep.equal({ errorPolicy: 'none', query: null });
          });
        });

        describe('when shouldSubscribe() is always false', function() {
          beforeEach(function setShouldSubscribe() {
            element.shouldSubscribe = () => false;
          });

          describe('setting NullableParam query', function() {
            beforeEach(function setNullableParamQuery() {
              element.query = NullableParamQuery;
            });

            beforeEach(waitForRender);

            it('does not call subscribe', function() {
              expect(element.subscribe).to.not.have.been.called;
            });

            describe('then setting variables', function() {
              beforeEach(function setVariables() {
                element.variables = { nullable: '✈' };
              });

              beforeEach(waitForRender);

              it('does not call subscribe', function() {
                expect(element.subscribe).to.not.have.been.called;
              });
            });
          });
        });

        describe('setting a valid query', function() {
          beforeEach(function setNullableParamQuery() {
            element.query = NullableParamQuery;
          });

          it('calls subscribe', async function() {
            expect(element.subscribe).to.have.been.calledOnce;
          });

          describe('then setting options', function() {
            beforeEach(function() {
              spies['observableQuery.setOptions'] = spy(element.observableQuery, 'setOptions');
              element.options = { errorPolicy: 'none', query: NoParamQuery };
            });

            afterEach(function() {
              for (const stub of Object.values(spies))
                stub.restore();
            });

            it('calls observableQuery.subscribe when there is a query', async function() {
              expect(element.observableQuery.setOptions)
                .to.have.been.calledWith({ errorPolicy: 'none', query: NoParamQuery });
            });
          });

          describe('then setting variables', function() {
            beforeEach(function setVariables() {
              element.variables = { nullable: '✈' };
            });

            beforeEach(waitForRender);

            it('calls refetch', function() {
              expect(element.refetch).to.have.been.calledWithMatch({ nullable: '✈' });
            });
          });

          describe('then destroying observableQuery', function() {
            beforeEach(function destroyObservableQuery() {
              element.observableQuery = undefined;
            });

            describe('then setting variables', function() {
              beforeEach(function setVariables() {
                element.variables = { nullable: '✈' };
              });

              beforeEach(waitForRender);

              it('calls subscribe', function() {
                expect(element.subscribe)
                  .to.have.been.calledWithMatch({ variables: { nullable: '✈' } });
              });
            });
          });

          describe('then appending the element elsewhere', function() {
            beforeEach(nextFrame);

            beforeEach(async function() {
              document.body.append(element);
            });

            beforeEach(nextFrame);

            afterEach(function() {
              for (const spy of Object.values(spies))
                spy.restore();
            });

            afterEach(() => element.remove());

            it('subscribes', function() {
              expect(element.subscribe).to.have.been.calledTwice;
            });
          });
        });

        describe('setting variables', function() {
          beforeEach(function() {
            element.variables = { foo: 'foo' };
          });

          it('does not create an observableQuery', function() {
            expect(element.variables).to.deep.equal({ foo: 'foo' });
            expect(element.observableQuery).to.not.be.ok;
          });
        });

        describe('fetchMore()', function() {
          let result: ApolloQueryResult<typeof element['data']>;
          beforeEach(async function() {
            result = await element.fetchMore();
            return result;
          });

          it('does nothing when there is no observableQuery', function() {
            expect(result).to.be.undefined;
            expect(element.observableQuery).to.be.undefined;
          });
        });

        describe('appending a script child with wrong type', function() {
          beforeEach(function appendWrongTypeScript() {
            element.innerHTML = `<script type="app/gql">query { noParam }</script>`;
          });

          beforeEach(waitForRender);

          it('does not change document', function() {
            expect(element.query).to.be.null;
          });
        });

        describe('appending a script child with invalid contents', function() {
          beforeEach(function appendWrongTypeScript() {
            element.innerHTML = `<script type="application/graphql">quory { # hi }</script>`;
          });

          beforeEach(waitForRender);

          it('does not change document', function() {
            expect(element.query).to.be.null;
          });

          it('sets error', function() {
            expect(element.error.message.includes('quory')).to.be.true;
          });
        });
      });

      describe('with a graphql script child', function() {
        let spies: Record<keyof QueryElement, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } =
            await setupFunction({
              spy: ['subscribe'],
              innerHTML: `<script type="application/graphql">${NoParamQuery.loc.source.body}</script>`,
            }));
        });

        beforeEach(waitForRender);

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        it('does not remove script', function() {
          expect(element.firstElementChild).to.be.an.instanceof(HTMLElement);
        });

        it('sets query property', function() {
          expect(element.query).to.deep.equal(gql(NoParamQuery.loc.source.body));
        });

        it('calls subscribe', function() {
          expect(element.subscribe).to.have.been.called;
        });

        describe('changing the DOM script to HelloQuery', function() {
          beforeEach(function changeScript() {
            element.innerHTML = `<script type="application/graphql">${HelloQuery.loc.source.body}</script>`;
          });

          beforeEach(waitForRender);

          it('renders', function() {
            expect(element.shadowRoot.getElementById('data').textContent)
              .to.equal(element.stringify({
                helloWorld: {
                  __typename: 'HelloWorld',
                  name: 'Chaver',
                  greeting: 'Shalom',
                },
              }));
          });

          describe('setting the variables', function() {
            beforeEach(function setVariables() {
              element.variables = { name: 'Aleichem' };
            });

            beforeEach(waitForRender);

            it('rerenders', function() {
              expect(element.shadowRoot.getElementById('data').textContent)
                .to.equal(element.stringify({
                  helloWorld: {
                    __typename: 'HelloWorld',
                    name: 'Aleichem',
                    greeting: 'Shalom',
                  },
                }));
            });
          });
        });
      });

      describe('with no-auto-subscribe attribute set', function() {
        let element: QueryElement;

        let spies: Record<keyof QueryElement, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            spy: ['subscribe'],
            attributes: 'no-auto-subscribe',
          }));
        });

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        it('has noAutoSubscribe property set', function() {
          expect(element.noAutoSubscribe).to.be.true;
        });

        describe('setting a valid query', function() {
          beforeEach(function setQuery() {
            element.query = NoParamQuery;
          });

          it('does not call subscribe', async function noAutoSubscribe() {
            expect(element.subscribe).to.not.have.been.called;
          });
        });

        describe('removing no-auto-subscribe attribute', function() {
          beforeEach(function removeAttribute() {
            element.removeAttribute('no-auto-subscribe');
          });

          it('unsets noAutoSubscribe property', function() {
            expect(element.noAutoSubscribe).to.be.false;
          });
        });
      });

      describe('with NoParams query', function() {
        type Data = NoParamQueryData;
        type Variables = NoParamQueryVariables;

        let element: QueryElement<Data, Variables>;

        let spies: Record<keyof typeof element, SinonSpy>;

        function resetPrivateWatchQuerySpy() {
          spies['client.queryManager.watchQuery'].resetHistory();
        }

        function callSubscribe() {
          element.subscribe();
        }

        function setProperties(properties: Partial<typeof element>) {
          return function() {
            for (const [key, val] of Object.entries(properties))
              element[key] = val;
          };
        }

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction<typeof element>({
            spy: ['refetch'],
            properties: {
              query: NoParamQuery,
            },
          }));
        });

        beforeEach(function spyPrivateWatchQuery() {
          // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
          spies['client.queryManager.watchQuery'] = spy(element.client.queryManager, 'watchQuery');
        });

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        describe('setting variables', function() {
          beforeEach(function setVariables() {
            // @ts-expect-error: incorrectly setting variables
            element.variables = { errorPolicy: 'foo' };
          });

          it('calls refetch', function() {
            expect(element.refetch).to.have.been.calledWith(match({ errorPolicy: 'foo' }));
          });
        });

        describe('executeQuery({ query })', function() {
          const query = NullableParamQuery;

          beforeEach(function spyClientQuery() {
            spies['client.query'] = spy(element.client, 'query');
          });

          beforeEach(function executeQuery() {
            return element.executeQuery({ query });
          });

          it('accepts custom args', function() {
            expect(element.client.query).to.have.been.calledWith(match({ query }));
          });
        });

        describe('fetchMore({ updateQuery })', function() {
          let result: ApolloQueryResult<typeof element['data']>;

          beforeEach(function spyObservableQueryFetchMore() {
            spies['observableQuery.fetchMore'] = spy(element.observableQuery, 'fetchMore');
          });

          beforeEach(async function callFetchMore() {
            result = await element.fetchMore();
            return result;
          });

          it('calls observableQuery.fetchMore', async function() {
            expect(element.observableQuery.fetchMore)
              .to.have.been.called;
          });

          it('updates data', function() {
            expect(result.data.noParam.noParam).to.equal('noParam');
            expect(element.data.noParam.noParam).to.equal('noParam');
          });
        });

        describe('with no specific fetchPolicy', function() {
          beforeEach(resetPrivateWatchQuerySpy);

          beforeEach(callSubscribe);

          it('does not set an instance fetchPolicy', function() {
            expect(element.fetchPolicy).to.be.undefined;
          });

          it('respects client default fetchPolicy', async function() {
            // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
            expect(element.client.queryManager.watchQuery).to.have.been
              .calledWithMatch({ fetchPolicy: 'network-only' });
          });
        });

        describe('with fetchPolicy set on the element', function() {
          const fetchPolicy = 'no-cache';
          beforeEach(resetPrivateWatchQuerySpy);
          beforeEach(setProperties({ fetchPolicy }));
          beforeEach(callSubscribe);
          it('respects instance-specific fetchPolicy', async function() {
            expect(element.fetchPolicy).to.equal(fetchPolicy);
            // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
            expect(element.client.queryManager.watchQuery).to.have.been
              .calledWithMatch({ fetchPolicy });
          });
        });

        describe('subscribeToMore()', function() {
          beforeEach(function spySubscribeToMore() {
            spies['observableQuery.subscribeToMore'] =
            spy(element.observableQuery, 'subscribeToMore');
          });

          const args = { document: NoParamSubscription, updateQuery: x => x };

          let result: () => void;
          beforeEach(function callSubscribeToMore() {
            result = element.subscribeToMore(args);
          });

          it('calls observableQuery.subscribeToMore()', function() {
            expect(result).to.be.an.instanceof(Function);
            expect(element.observableQuery.subscribeToMore).to.have.been.calledWith(args);
          });
        });

        describe('watchQuery()', function() {
          beforeEach(function() {
            spies['client.watchQuery'] = spy(element.client, 'watchQuery');
          });

          let result: ObservableQuery;

          beforeEach(function callWatchQuery() {
            result = element.watchQuery();
            return result;
          });

          it('calls client watchQuery', function() {
            const { query, variables } = element;
            expect(element.client.watchQuery)
              .to.have.been.calledWith(match({ query, variables }));
          });

          it('creates an ObservableQuery', function() {
            expect(result).to.be.an.instanceof(ObservableQuery);
          });
        });

        describe('watchQuery({ variables })', function() {
          beforeEach(function() {
            spies['client.watchQuery'] = spy(element.client, 'watchQuery');
          });

          let result: ObservableQuery;

          beforeEach(function callWatchQuery() {
            result = element.watchQuery({ variables: {} });
            return result;
          });

          it('uses element instance variables', function() {
            const { query } = element;
            expect(element.client.watchQuery)
              .to.have.been.calledWith(match({ query, variables: {} }));
          });
        });

        describe('watchQuery({ query })', function() {
          beforeEach(function() {
            spies['client.watchQuery'] = spy(element.client, 'watchQuery');
          });

          let result: ObservableQuery;

          beforeEach(function callWatchQuery() {
            element.variables = {};
            result = element.watchQuery({ query: NullableParamQuery });
            return result;
          });

          it('uses element instance variables', function() {
            const { variables } = element;
            expect(element.client.watchQuery)
              .to.have.been.calledWith(match({ query: NullableParamQuery, variables }));
          });
        });

        describe('when client has default watchQuery options', function() {
          let cache;
          const variables = { foo: 'when client has default watchQuery options' };

          beforeEach(function setClientDefaults() {
            cache = element.client.defaultOptions;
            element.client.defaultOptions = {
              watchQuery: {
                notifyOnNetworkStatusChange: true,
                // @ts-expect-error: just checking that it passes arbitrary value, don't care abt the interface
                SOMETHING_SILLY: true,
              },
            };
          });

          beforeEach(function callWatchQuery() {
            element.watchQuery({ variables });
          });

          afterEach(function restoreClientDefaults() {
            element.client.defaultOptions = cache;
          });

          it('uses default options', function() {
            const { query } = element;
            // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
            expect(element.client.queryManager.watchQuery)
              .to.have.been.calledWith(match({
                query,
                variables,
                notifyOnNetworkStatusChange: true,
                SOMETHING_SILLY: true,
              }));
          });
        });
      });

      describe('with NullableParams query', function() {
        type Data = NullableParamQueryData;
        type Variables = NullableParamQueryVariables;

        let element: QueryElement<Data, Variables>;

        let spies: Record<string, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction<typeof element>({
            spy: ['refetch'],
            properties: {
              query: NullableParamQuery,
            },
          }));
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        describe('refetch()', function() {
          let spies: SinonSpy[];

          beforeEach(function setupSpies() {
            spies = [
              spy(element.observableQuery, 'refetch'),
            ];
          });

          beforeEach(function callRefetch() {
            element.refetch({ nullable: 'new args' });
          });

          afterEach(function restoreSpies() {
            for (const spy of spies)
              spy.restore();
          });

          it('calls observableQuery.refetch', function() {
            expect(element.observableQuery.refetch)
              .to.have.been.calledWith({ nullable: 'new args' });
          });

          describe('when observableQuery is destroyed', function() {
            beforeEach(function destroyObservableQuery() {
              element.observableQuery = undefined;
            });

            it('does nothing', function() {
              expect(element.refetch({ nullable: 'bar' })).to.be.undefined;
            });
          });
        });

        describe('setting new variables', function() {
          beforeEach(function setVariables() {
            element.variables = { nullable: '🍟' };
          });

          it('calls refetch', function() {
            expect(element.refetch)
              .to.have.been.calledWithMatch({ nullable: '🍟' });
          });
        });

        describe('executeQuery()', function() {
          beforeEach(function spyClientQuery() {
            spies['client.query'] = spy(element.client, 'query');
          });

          beforeEach(function executeQuery() {
            return element.executeQuery();
          });

          it('calls client.query with element properties', function() {
            const { errorPolicy, fetchPolicy, query } = element;
            expect(element.client.query)
              .to.have.been.calledWith(match({ errorPolicy, fetchPolicy, query }));
          });

          it('sets data from the response', function() {
            expect(element.data.nullableParam.nullable).to.equal('Hello World');
          });

          it('sets loading from the response', function() {
            expect(element.loading).to.be.false;
          });

          it('sets error from the response', function() {
            expect(element.error).to.be.null;
          });

          it('sets errors from the response', function() {
            expect(element.errors).to.be.null;
          });

          it('sets networkStatus from the response', function() {
            expect(element.networkStatus).to.equal(7);
          });
        });

        describe('executeQuery({ query })', function() {
          beforeEach(function spyClientQuery() {
            spies['client.query'] = spy(element.client, 'query');
          });

          beforeEach(function setVariables() {
            element.variables = { nullable: 'WHOOPIE' };
          });

          beforeEach(function executeQuery() {
            return element.executeQuery({ query: NoParamQuery });
          });

          it('defaults to element variables', async function() {
            const { variables } = element;
            expect(element.client.query)
              .to.have.been.calledWithMatch(match({ variables, query: NoParamQuery }));
          });
        });

        describe('executeQuery({ variables })', function() {
          const variables: NullableParamQueryVariables = { nullable: 'WHOOPIE' };
          beforeEach(function spyClientQuery() {
            spies['client.query'] = spy(element.client, 'query');
          });

          beforeEach(function executeQuery() {
            return element.executeQuery({ variables });
          });

          it('defaults to element query', async function() {
            const { query } = element;
            expect(element.client.query).to.have.been.calledWithMatch({ query, variables });
          });

          it('updates data with the response', function() {
            expect(element.data.nullableParam.nullable).to.equal('WHOOPIE');
          });
        });
      });

      describe('with NonNullableParams query', function() {
        type Data = NonNullableParamQueryData;
        type Variables = NonNullableParamQueryVariables;

        let element: QueryElement<Data, Variables>;

        let spies: Record<keyof typeof element, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction<typeof element>({
            spy: ['refetch', 'watchQuery'],
            properties: {
              query: NonNullableParamQuery,
            },
          }));
        });

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        describe('subscribe()', function() {
          beforeEach(function() {
            element.subscribe();
          });

          it('calls watchQuery', async function() {
            expect(element.watchQuery).to.have.been.called;
          });

          it('creates an observableQuery', async function() {
            expect(element.observableQuery).to.be.ok;
          });
        });

        describe('executeQuery()', function() {
          let error: Error;
          beforeEach(async function() {
            try {
              const r = await element.executeQuery({ variables: { nonNull: 'error' } });
              if (r)
                expect.fail('did not reject query', r.data.nonNullParam.nonNull);
            } catch (e) {
              error = e;
            }
          });

          it('updates error with the error', function() {
            expect(element.error).to.equal(error);
          });
        });
      });
    });
  });

  if (Klass) {
    describe('ApolloMutation subclasses', function() {
      describe('with noAutoSubscribe set as a class field', function() {
        let element: QueryElement;

        let spies: SinonSpy[];

        beforeEach(async function setupElement() {
          spies = [
            spy(Klass.prototype, 'subscribe'),
          ];

          class Test extends Klass {
            client = makeClient();

            noAutoSubscribe = true;
          }

          const tag = unsafeStatic(defineCE(Test));

          element = await fixture<QueryElement>(html`<${tag}></${tag}>`);
        });

        afterEach(function restoreSpies() {
          for (const spy of spies)
            spy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        it('has no-auto-subscribe attribute', function() {
          expect(element.hasAttribute('no-auto-subscribe')).to.be.true;
        });

        describe('unsetting noAutoSubscribe', function() {
          beforeEach(function unsetNoAutoSubscribe() {
            element.noAutoSubscribe = false;
          });

          it('removes the no-auto-subscribe attribute', function() {
            expect(element.hasAttribute('no-auto-subscribe')).to.be.false;
          });
        });

        describe('setting a valid query', function() {
          beforeEach(function setQuery() {
            element.query = NoParamQuery;
          });

          it('does not call subscribe', function() {
            expect(element.subscribe).to.not.have.been.called;
          });
        });
      });

      describe('with NoParams query set as a class field', function() {
        type Data = NoParamQueryData;
        type Variables = NoParamQueryVariables;

        let element: QueryElement<Data, Variables>;

        let spies: SinonSpy[];

        beforeEach(async function setupElement() {
          spies = [
            spy(Klass.prototype, 'subscribe'),
            spy(Klass.prototype, 'refetch'),
          ];

          class Test extends (Klass as Constructor<typeof element>) {
            client = makeClient();

            query = NoParamQuery;
          }

          const tag = unsafeStatic(defineCE(Test));

          element = await fixture<Test>(html`<${tag}></${tag}>`);
        });

        afterEach(function restoreSpies() {
          for (const spy of spies)
            spy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        it('sets the query property', async function() {
          expect(element.query).to.equal(NoParamQuery);
        });

        it('initializes an observableQuery', function() {
          expect(element.observableQuery).to.be.ok;
        });

        it('initializes an observableQuery', function() {
          expect(element.observableQuery).to.be.ok;
        });

        describe('setting variables', function() {
          beforeEach(function setVariables() {
            // @ts-expect-error: setting bad variables here, but that's ok because we're only testing the setter
            element.variables = { errorPolicy: 'foo' };
          });

          it('calls refetch', function() {
            expect(element.refetch).to.have.been.calledWith(match({ errorPolicy: 'foo' }));
          });
        });
      });

      describe('with NullableParams query and variables set as class fields', function() {
        type Data = NullableParamQueryData;
        type Variables = NullableParamQueryVariables;

        let element: QueryElement<Data, Variables>;

        let spies: SinonSpy[];

        beforeEach(async function setupElement() {
          spies = [
            spy(Klass.prototype, 'subscribe'),
            spy(Klass.prototype, 'refetch'),
          ];

          class Test extends (Klass as Constructor<typeof element>) {
            client = makeClient();

            query = NullableParamQuery;

            variables = { nullable: 'nullable' };
          }

          const tag = defineCE(Test);

          element = await fixture<Test>(`<${tag}></${tag}>`);
        });

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        describe('setting new variables', function() {
          beforeEach(function setVariables() {
            element.variables = { nullable: '🍟' };
          });

          it('calls refetch', function() {
            expect(element.refetch).to.have.been.calledOnceWith(match({ nullable: '🍟' }));
          });
        });
      });

      describe(`with NonNullableParams query and sufficient variables set as a class fields`, function() {
        type Data = NonNullableParamQueryData;
        type Variables = NonNullableParamQueryVariables;

        let element: QueryElement<Data, Variables>;

        let spies: SinonSpy[];

        beforeEach(async function setupElement() {
          spies = [
            spy(Klass.prototype, 'subscribe'),
            spy(Klass.prototype, 'watchQuery'),
            spy(Klass.prototype, 'refetch'),
          ];

          class Test extends (Klass as Constructor<typeof element>) {
            client = makeClient();

            query = NonNullableParamQuery;

            variables = { nonNull: 'nonNull' };
          }

          const tag = defineCE(Test);

          element = await fixture<Test>(`<${tag}></${tag}>`);
        });

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        describe('subscribe()', function() {
          let subscription: ZenObservable.Subscription;

          beforeEach(function() {
            subscription = element.subscribe();
          });

          afterEach(function teardownSubscription() {
            subscription = undefined;
          });

          it('calls watchQuery', async function subscribeEnoughVariables() {
            expect(element.watchQuery).to.have.been.called;
          });

          it('creates an observableQuery', async function subscribeCreatesObservableQuery() {
            expect(element.observableQuery).to.be.ok;
          });

          it('returns a subscription', async function subscribeReturnsSubscription() {
            expect(isSubscription(subscription)).to.be.true;
          });
        });
      });

      describe(`with NonNullableParams query and insufficient variables set as a class fields`, function() {
        type Data = NonNullableParamQueryData;
        type Variables = NonNullableParamQueryVariables;

        let element: QueryElement<Data, Variables>;

        let spies: Partial<Record<keyof typeof element, SinonSpy>>;

        beforeEach(async function setupElement() {
          spies = {
            subscribe: spy(Klass.prototype, 'subscribe'),
            watchQuery: spy(Klass.prototype, 'watchQuery'),
            refetch: spy(Klass.prototype, 'refetch'),
          };

          class Test extends (Klass as Constructor<typeof element>) {
            client = makeClient();

            query = NonNullableParamQuery;

            variables = { nonNull: null };
          }

          const tag = defineCE(Test);

          element = await fixture<Test>(`<${tag}></${tag}>`);
        });

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        describe('subscribe()', function() {
          let subscription: ZenObservable.Subscription;

          beforeEach(function() {
            subscription = element.subscribe();
          });

          afterEach(function teardownSubscription() {
            subscription = undefined;
          });

          it('calls watchQuery', function() {
            expect(element.watchQuery).to.have.been.called;
          });

          it('creates an observableQuery', function() {
            expect(element.observableQuery).to.be.ok;
          });

          it('creates a subscription', function() {
            expect(isSubscription(subscription)).to.be.true;
          });
        });
      });

      describe('with fetchPolicy set as a class field', function() {
        type Data = NoParamQueryData;
        type Variables = NoParamQueryVariables;

        let element: QueryElement<Data, Variables>;

        let spies: Partial<Record<string | keyof typeof element, SinonSpy>>;

        const fetchPolicy = 'no-cache' as const;

        beforeEach(async function setupElement() {
          const client = makeClient();
          class Test extends (Klass as Constructor<typeof element>) {
            client = client;

            query = NoParamQuery;

            fetchPolicy = fetchPolicy;

            noAutoSubscribe = true;
          }

          const tag = defineCE(Test);

          element = await fixture<Test>(`<${tag}></${tag}>`);

          spies = {
            'client.queryManager.watchQuery':
              // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
              spy(client.queryManager, 'watchQuery'),
          };
        });

        beforeEach(function callSubscribe() {
          element.subscribe();
        });

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        it('respects instance-specific fetchPolicy', async function() {
          expect(element.fetchPolicy).to.equal(fetchPolicy);
          // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
          expect(element.client.queryManager.watchQuery).to.have.been
            .calledWithMatch({ fetchPolicy });
        });
      });

      describe('with onData and onError methods defined in the class body', function() {
        describe(`with NonNullableParams query`, function() {
          type Data = NonNullableParamQueryData;
          type Variables = NonNullableParamQueryVariables;

          let element: QueryElement<Data, Variables>;

          let spies: Partial<Record<string | keyof typeof element, SinonSpy>>;

          beforeEach(async function setupElement() {
            class Test extends (Klass as Constructor<QueryElement<Data, Variables>>) {
              client = client;

              query = NonNullableParamQuery;

              noAutoSubscribe = true;

              onData(x) { x; }

              onError(x) { x; }
            }

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          beforeEach(function spyMethods() {
            spies = {
              onData: spy(element, 'onData'),
              onError: spy(element, 'onError'),
            };
          });

          afterEach(function restoreSpies() {
            for (const spy of Object.values(spies))
              spy.restore();
          });

          afterEach(function teardownElement() {
            element.remove();
            element = undefined;
          });

          describe('when executeQuery rejects', function() {
            const variables: Variables = { nonNull: 'error' };

            beforeEach(async function callExecuteQuery() {
              try {
                await element.executeQuery({ variables });
              } catch { null; }
            });

            it('does not call onData', function() {
              expect(element.onData).to.not.have.been.called;
            });

            it('calls onError', function() {
              expect(element.onError).to.have.been.called;
            });
          });

          describe('when executeQuery resolves', function() {
            const variables: Variables = { nonNull: 'nullable' };

            beforeEach(async function callExecuteQuery() {
              try {
                await element.executeQuery({ variables });
              } catch { null; }
            });

            it('does not call onData', function() {
              expect(element.onData).to.have.been.calledWithMatch({
                data: {
                  nonNullParam: {
                    __typename: 'NonNull',
                    nonNull: 'nullable',
                  },
                },
              });
            });

            it('calls onError', function() {
              expect(element.onError).to.not.have.been.called;
            });
          });
        });
      });
    });
  }
}
