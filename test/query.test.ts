/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as I from '@apollo-elements/core/types';

import type { ApolloQueryElement } from '@apollo-elements/core';

import type { TestableElement } from './types';

import * as S from './schema';

import { SetupFunction } from './types';

import {
  aTimeout,
  defineCE,
  expect,
  fixture,
  nextFrame,
} from '@open-wc/testing';

import { gql } from '@apollo/client/core';

import {
  ApolloClient,
  ApolloQueryResult,
  DefaultOptions,
  InMemoryCache,
  NetworkStatus,
} from '@apollo/client/core';

import { html, unsafeStatic } from 'lit/static-html.js';

import { match, spy, SinonSpy } from 'sinon';
import { client, makeClient, setupClient, teardownClient } from './client';
import { isSubscription, restoreSpies, stringify, waitForRender } from './helpers';
import { GraphQLError } from 'graphql';

export interface DescribeQueryComponentOptions<E extends ApolloQueryElement = ApolloQueryElement<any, any>> {
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
  setupFunction: SetupFunction<E & TestableElement>;

  /**
   * Optional: the class which setup function uses to generate the component.
   * Only relevant to class-based libraries
   */
  class?: I.Constructor<Omit<E, 'update'|'updated'> & TestableElement>;
}

export { setupQueryClass } from './helpers';

export function describeQuery(options: DescribeQueryComponentOptions): void {
  const { setupFunction } = options;
  const Klass: typeof ApolloQueryElement = options.class as unknown as typeof ApolloQueryElement;
  describe(`ApolloQuery interface`, function() {
    describe('when simply instantiating', function() {
      let element: TestableElement & ApolloQueryElement;

      let spies: Record<string|keyof ApolloQueryElement, SinonSpy> | undefined;

      let connectEvent: Event | undefined;

      let disconnectEvent: Event | undefined;

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

      afterEach(restoreSpies(() => spies));

      afterEach(function() {
        connectEvent = undefined;
        disconnectEvent = undefined;
      });

      beforeEach(() => element.controller.host.updateComplete);

      afterEach(function teardownElement() {
        element.remove?.();
        // @ts-expect-error: fixture cleanup
        element = undefined;
      });

      it('has default properties', function() {
        if (!element)
          throw new Error('No element');
        // nullable fields
        expect(element.client, 'client').to.be.null;
        expect(element.data, 'data').to.be.null;
        expect(element.error, 'error').to.be.null;
        expect(element.errors, 'errors').to.be.empty;
        expect(element.query, 'query').to.be.null;
        expect(element.variables, 'variables').to.be.null;

        // readonly fields
        expect(element.partial, 'partial')
          .to.be.false
          .and
          .to.equal(element.controller.partial);

        // defined fields
        expect(element.networkStatus, 'networkStatus').to.equal(NetworkStatus.ready);
        expect(element.noAutoSubscribe, 'noAutoSubscribe').to.be.false;
        expect(element.options, 'options')
          .to.equal(element.controller.options);

        // options
        expect(element.errorPolicy, 'errorPolicy')
          .to.be.undefined
          .and
          .to.equal(element.controller.options.errorPolicy);
        expect(element.fetchPolicy, 'fetchPolicy')
          .to.be.undefined
          .and
          .to.equal(element.controller.options.fetchPolicy);
        expect(element.nextFetchPolicy, 'nextFetchPolicy')
          .to.be.undefined
          .and
          .to.equal(element.controller.options.nextFetchPolicy);
        expect(element.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange')
          .to.be.undefined
          .and
          .to.equal(element.controller.options.notifyOnNetworkStatusChange);
        expect(element.partialRefetch, 'partialRefetch')
          .to.be.undefined
          .and
          .to.equal(element.controller.options.partialRefetch);
        expect(element.pollInterval, 'pollInterval')
          .to.be.undefined
          .and
          .to.equal(element.controller.options.pollInterval);
        expect(element.returnPartialData, 'returnPartialData')
          .to.be.undefined
          .and
          .to.equal(element.controller.options.returnPartialData);
      });

      it('caches observed properties', async function() {
        if (!element)
          throw new Error('No element');

        const client = new ApolloClient({ cache: new InMemoryCache(), connectToDevTools: false });
        element.client = client;
        await element.controller.host.updateComplete;
        expect(element.client, 'client')
          .to.equal(client)
          .and
          .to.equal(element.controller.client);

        element.client = null;
        await element.controller.host.updateComplete;
        expect(element.client, 'client')
          .to.be.null
          .and
          .to.equal(element.controller.client);

        element.data = { data: 'data' };
        await element.controller.host.updateComplete;
        expect(element.data, 'data')
          .to.deep.equal({ data: 'data' })
          .and
          .to.equal(element.controller.data);

        let err: Error;
        try {
          throw new Error('error');
        } catch (e) { err = e; }
        element.error = err;
        await element.controller.host.updateComplete;
        expect(element.error, 'error')
          .to.equal(err)
          .and
          .to.equal(element.controller.error);

        const errs = [new GraphQLError('HAH')];
        element.errors = errs;
        await element.controller.host.updateComplete;
        expect(element.errors, 'errors')
          .to.equal(errs)
          .and
          .to.equal(element.controller.errors);

        element.loading = true;
        await element.controller.host.updateComplete;
        expect(element.loading, 'loading')
          .to.equal(true)
          .and
          .to.equal(element.controller.loading);

        element.loading = false;
        await element.controller.host.updateComplete;
        expect(element.loading, 'loading')
          .to.equal(false)
          .and
          .to.equal(element.controller.loading);

        element.networkStatus = 1;
        await element.controller.host.updateComplete;
        expect(element.networkStatus, 'networkStatus')
          .to.equal(1)
          .and
          .to.equal(element.controller.networkStatus);

        element.networkStatus = 2;
        await element.controller.host.updateComplete;
        expect(element.networkStatus, 'networkStatus')
          .to.equal(2)
          .and
          .to.equal(element.controller.networkStatus);

        const query = gql`{ __schema { __typename } }`;
        element.query = query;
        await element.controller.host.updateComplete;
        expect(element.query, 'query')
          .to.equal(query)
          .and
          .to.equal(element.controller.query);

        element.query = null;
        await element.controller.host.updateComplete;
        expect(element.query, 'query')
          .to.be.null
          .and
          .to.equal(element.controller.query);
      });

      it('notifies <apollo-client>', function() {
        expect(connectEvent).to.be.ok;
        expect(connectEvent!.bubbles).to.be.true;
        expect(connectEvent!.composed).to.be.true;
      });

      describe('subscribeToMore()', function() {
        it('does nothing when there is no observableQuery', function() {
          expect(element.subscribeToMore({ document: gql`{ hi }` })).to.be.undefined;
        });
      });

      describe('without setting query or variables', function() {
        function setProperties(properties: Partial<typeof element>) {
          return function() {
            for (const [key, val] of Object.entries(properties!) as I.Entries<typeof element>)
              // @ts-expect-error: maybe fix this later
              element[key] = val;
          };
        }

        beforeEach(waitForRender(() => element));

        it('renders', function() {
          if (!element)
            throw new Error('No element');
          expect(element.shadowRoot?.getElementById('data')).to.be.ok;
          expect(element.shadowRoot?.getElementById('error')).to.be.ok;
          expect(element.shadowRoot?.getElementById('errors')).to.be.ok;
          expect(element.shadowRoot?.getElementById('loading')).to.be.ok;
          expect(element.shadowRoot?.getElementById('networkStatus')).to.be.ok;
        });

        describe('when data is set', function() {
          beforeEach(setProperties({ data: { data: 'data' } }));
          beforeEach(waitForRender(() => element));
          it('renders', function() {
            expect(element.shadowRoot?.getElementById('data')?.textContent)
              .to.equal(stringify({ data: 'data' }));
          });
        });

        describe('when error is set', function() {
          let err: Error;
          try {
            throw new Error('error');
          } catch (e) { err = e; }
          beforeEach(setProperties({ error: err }));
          beforeEach(waitForRender(() => element));
          it('renders', function() {
            expect(element.shadowRoot?.getElementById('error')?.textContent)
              .to.equal(stringify(err));
          });
        });

        describe('when errors is set', function() {
          beforeEach(setProperties({ errors: [new GraphQLError('oops')] }));
          beforeEach(waitForRender(() => element));
          it('renders', function() {
            expect(element.shadowRoot?.getElementById('errors')?.textContent)
              .to.equal(stringify([new GraphQLError('oops')]));
          });
        });

        describe('when loading is set', function() {
          beforeEach(setProperties({ loading: true }));
          beforeEach(waitForRender(() => element));
          it('renders', function() {
            expect(element.shadowRoot?.getElementById('loading')?.textContent)
              .to.equal('true');
          });

          describe('and then unset', function() {
            beforeEach(setProperties({ loading: false }));
            beforeEach(waitForRender(() => element));
            it('renders', function() {
              expect(element.shadowRoot?.getElementById('loading')?.textContent)
                .to.equal('false');
            });
          });
        });

        describe('when networkStatus is set', function() {
          beforeEach(setProperties({ networkStatus: NetworkStatus.error }));
          beforeEach(waitForRender(() => element));
          it('renders', function() {
            expect(element.shadowRoot?.getElementById('networkStatus')?.textContent)
              .to.equal(NetworkStatus.error.toString());
          });
        });

        describe('subscribe()', function() {
          it('throws', function() {
            expect(() => element.subscribe())
              .to.throw('No Apollo client');
          });
        });

        describe('subscribe({ query })', function() {
          it('throws', function() {
            expect(() => element.subscribe({ query: S.NullableParamQuery }))
              .to.throw('No Apollo client');
          });
        });

        describe('executeQuery()', function() {
          it('throws', async function() {
            try {
              await element.executeQuery();
              expect.fail('did not throw');
            } catch (error) {
              expect(error.message).to.match(/^No Apollo client/);
            }
          });
        });

        describe('executeQuery({ query })', function() {
          it('throws', async function() {
            try {
              await element.executeQuery({ query: S.NullableParamQuery });
              expect.fail('did not throw');
            } catch (error) {
              expect(error.message).to.match(/^No Apollo client/);
            }
          });
        });
      });

      describe('setting NullableParam query', function() {
        beforeEach(function setNullableParamQuery() {
          element!.query = S.NullableParamQuery;
        });

        beforeEach(waitForRender(() => element));

        it('does not call subscribe', function() {
          expect(element.subscribe).to.not.have.been.called;
        });

        describe('then setting variables', function() {
          beforeEach(function setVariables() {
            element!.variables = { nullable: '✈' };
          });

          beforeEach(waitForRender(() => element));

          it('does not call subscribe', function() {
            expect(element.subscribe).to.not.have.been.called;
          });
        });

        describe('executeQuery()', function() {
          it('throws', async function() {
            try {
              await element.executeQuery();
              expect.fail('did not throw');
            } catch (error) {
              expect(error.message).to.match(/^No Apollo client/);
            }
          });
        });

        describe('executeQuery({ query })', function() {
          it('throws', async function() {
            try {
              await element.executeQuery({ query: S.NonNullableParamQuery });
              expect.fail('did not throw');
            } catch (error) {
              expect(error.message).to.match(/^No Apollo client/);
            }
          });
        });
      });

      describe('disconnecting', function() {
        beforeEach(function disconnect() {
          element.remove();
        });

        beforeEach(nextFrame);

        it('notifies <apollo-client>', function() {
          expect(disconnectEvent, 'event').to.be.ok;
          expect(disconnectEvent?.bubbles).to.be.true;
          expect(disconnectEvent?.composed).to.be.true;
        });
      });
    });

    // hybrids and haunted don't play nice with custom attributes
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    if (!this.parent?.title.match(/^\[(haunted|hybrids)\]/)) {
      describe('with error-policy attribute set', function() {
        let element: ApolloQueryElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'error-policy="all"' }));
        });

        it('sets errorPolicy property', function() {
          expect(element.errorPolicy).to.equal('all');
        });

        describe('then updating error-policy attribute', function() {
          beforeEach(function() {
            element.setAttribute('error-policy', 'ignore');
          });

          it('updates errorPolicy property', function() {
            expect(element.errorPolicy).to.equal('ignore');
          });
        });
      });

      describe('with fetch-policy attribute set', function() {
        let element: ApolloQueryElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'fetch-policy="no-cache"' }));
        });

        it('sets fetchPolicy property', function() {
          expect(element.fetchPolicy).to.equal('no-cache');
        });

        describe('then updating fetch-policy attribute', function() {
          beforeEach(function() {
            element.setAttribute('fetch-policy', 'network-only');
          });

          it('updates fetchPolicy property', function() {
            expect(element.fetchPolicy).to.equal('network-only');
          });
        });
      });

      describe('with next-fetch-policy attribute set', function() {
        let element: ApolloQueryElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'next-fetch-policy="no-cache"' }));
        });

        it('sets nextFetchPolicy property', function() {
          expect(element.nextFetchPolicy).to.equal('no-cache');
        });

        describe('then updating next-fetch-policy attribute', function() {
          beforeEach(function() {
            element.setAttribute('next-fetch-policy', 'network-only');
          });

          it('updates nextFetchPolicy property', function() {
            expect(element.nextFetchPolicy).to.equal('network-only');
          });
        });
      });
    }

    describe('with global client available', function() {
      let element: ApolloQueryElement;

      let spies: Record<string|keyof ApolloQueryElement, SinonSpy> | undefined;

      let cached: typeof window.__APOLLO_CLIENT__;

      const mockClient = makeClient();

      beforeEach(function setGlobalClient() {
        cached = window.__APOLLO_CLIENT__;
        window.__APOLLO_CLIENT__ = mockClient;
      });

      afterEach(function unsetGlobalClient() {
        window.__APOLLO_CLIENT__ = cached;
      });

      afterEach(restoreSpies(() => spies));

      afterEach(function teardownElement() {
        element?.remove?.();
        // @ts-expect-error: fixture cleanup
        element = undefined;
      });

      describe('when simply instantiating', function() {
        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            spy: ['subscribe', 'refetch'],
          }));
        });

        beforeEach(function() {
          spies!['client.subscribe'] = spy(element.client!, 'subscribe');
          spies!['client.query'] = spy(element.client!, 'query');
          spies!['client.watchQuery'] = spy(element.client!, 'watchQuery');
          spies!['controller.refetch'] = spy(element.controller, 'refetch');
        });

        it('uses the global client', async function() {
          expect(element.client).to.equal(mockClient);
        });

        describe('setting a malformed query', function() {
          it('throws an error', async function badQuery() {
            // @ts-expect-error: testing the error handler
            expect(() => element.query = 'query { foo }')
              .to.throw('Query must be a parsed GraphQL document.');
            expect(element.query, 'does not set query property').to.be.null;
          });
        });

        describe('setting options property', function() {
          beforeEach(function() {
            element!.options = { errorPolicy: 'none' };
          });

          it('sets new options', function() {
            const { onData, onError, shouldSubscribe, ...options } = element.options;
            expect(options).to.deep.equal({ errorPolicy: 'none' });
          });

          it('retains onData and onError', function() {
            const { onData, onError } = element.options;
            expect(onData, 'onData').to.be.an.instanceof(Function);
            expect(onError, 'onError').to.be.an.instanceof(Function);
          });

          describe('then nullifying options property', function() {
            beforeEach(function() {
              // @ts-expect-error: checking illegal behaviour
              element!.options = null;
            });

            it('removes options', function() {
              const { onData, onError, shouldSubscribe, ...options } = element.options;
              expect(options).to.be.empty;
            });

            it('retains onData and onError', function() {
              const { onData, onError } = element.options;
              expect(onData, 'onData').to.be.an.instanceof(Function);
              expect(onError, 'onError').to.be.an.instanceof(Function);
            });
          });
        });

        describe('when shouldSubscribe() is always false', function() {
          beforeEach(function setShouldSubscribe() {
            element!.shouldSubscribe = () => false;
          });

          describe('setting NullableParam query', function() {
            beforeEach(function setNullableParamQuery() {
              element!.query = S.NullableParamQuery;
            });

            beforeEach(() => element.controller.host.updateComplete);

            it('does not call subscribe', function() {
              expect(element.subscribe).to.not.have.been.called;
            });

            describe('then setting variables', function() {
              beforeEach(function setVariables() {
                element!.variables = { nullable: '✈' };
              });

              beforeEach(() => element.controller.host.updateComplete);

              it('does not call subscribe', function() {
                expect(element.subscribe).to.not.have.been.called;
              });
            });
          });
        });

        describe('subscribe({ query })', async function() {
          beforeEach(function() {
            element.subscribe({ query: S.NullableParamQuery });
          });

          it('calls client query', function() {
            expect(element.client?.watchQuery).to.have.been
              .calledWithMatch(match({ query: S.NullableParamQuery }));
          });
        });

        describe('subscribe({ query, context })', async function() {
          const context = {};
          beforeEach(function() {
            element.subscribe({ query: S.NullableParamQuery, context });
          });

          it('calls client watchQuery', function() {
            expect(element.client?.watchQuery).to.have.been
              .calledWithMatch(match({ query: S.NullableParamQuery, context }));
          });
        });

        describe('subscribe({ query, errorPolicy })', async function() {
          const errorPolicy = 'ignore';
          beforeEach(function() {
            element.subscribe({ query: S.NullableParamQuery, errorPolicy });
          });
          it('calls client watchQuery', function() {
            expect(element.client?.watchQuery).to.have.been
              .calledWithMatch(match({ query: S.NullableParamQuery, errorPolicy }));
          });
        });

        describe('subscribe({ query, fetchPolicy })', async function() {
          const fetchPolicy = 'no-cache';
          beforeEach(function() {
            element.subscribe({ query: S.NullableParamQuery, fetchPolicy });
          });

          it('calls client watchQuery', function() {
            expect(element.client?.watchQuery).to.have.been
              .calledWithMatch(match({ query: S.NullableParamQuery, fetchPolicy }));
          });
        });

        describe('subscribe({ query, variables })', async function() {
          const variables: S.NullableParamQueryVariables = { nullable: 'params' };
          beforeEach(function() {
            element.subscribe({ query: S.NullableParamQuery, variables });
          });
          it('calls client watchQuery', function() {
            expect(element.client?.watchQuery).to.have.been
              .calledWithMatch(match({ query: S.NullableParamQuery, variables }));
          });
        });

        describe('executeQuery()', function() {
          it('throws', async function() {
            try {
              await element.executeQuery();
              expect.fail('did not throw');
            } catch (error) {
              expect(error.message).to.match(/query/);
            }
          });
        });

        describe('executeQuery({ query })', async function() {
          let result: ApolloQueryResult<any> | void;

          beforeEach(async function() {
            result = await element.executeQuery({ query: S.NullableParamQuery });
          });

          it('calls client query', function() {
            expect(element.client?.query).to.have.been.calledWith(match({ query: S.NullableParamQuery }));
          });

          it('returns a result', function() {
            expect(result).to.be.ok;
          });
        });

        describe('setting NullableParam query', function() {
          beforeEach(function setNullableParamQuery() {
            element!.query = S.NullableParamQuery;
          });

          beforeEach(() => element.controller.host.updateComplete);

          it('calls subscribe', function() {
            expect(element.client?.watchQuery).to.have.been.calledOnce;
          });

          describe('then setting variables', function() {
            beforeEach(function setVariables() {
              element!.variables = { nullable: '✈' };
            });

            beforeEach(() => element.controller.host.updateComplete);

            it('calls refetch', function() {
              element!.variables = { nullable: '✈' };
              expect(element.controller.refetch).to.have.been.calledWithMatch({ nullable: '✈' });
            });
          });

          describe('then appending the element elsewhere', function() {
            beforeEach(() => aTimeout(60));

            beforeEach(() => spy(window.__APOLLO_CLIENT__!.link!, 'request'));

            beforeEach(function() {
              document.body.append(element!);
            });

            beforeEach(nextFrame);

            afterEach(() => (window.__APOLLO_CLIENT__?.link.request as SinonSpy).restore?.());

            afterEach(() => {
              element.remove();
            });

            it('requests', function() {
              expect(window.__APOLLO_CLIENT__?.link.request).to.have.been.calledOnce;
            });
          });

          describe('executeQuery()', function() {
            let result: ApolloQueryResult<any> | undefined;

            beforeEach(async function() {
              result = (await element.executeQuery() || undefined);
            });

            afterEach(function() {
              result = undefined;
            });

            it('calls client query', function() {
              expect(element.client?.query).to.have.been.calledWith(match({ query: S.NullableParamQuery }));
            });

            it('returns a result', function() {
              expect(result).to.be.ok;
            });

            it('sets data', function() {
              expect(element.data).to.equal(result!.data);
            });
          });

          describe('executeQuery({ query })', function() {
            let result: ApolloQueryResult<S.NoParamQueryData> | undefined;

            beforeEach(async function() {
              result = (await element.executeQuery({ query: S.NoParamQuery }) || undefined);
            });

            it('calls client query', function() {
              expect(element.client?.query).to.have.been.calledWith(match({ query: S.NoParamQuery }));
            });

            it('returns a result', function() {
              expect(result).to.be.ok;
            });

            it('sets data', function() {
              expect(element.data).to.equal(result!.data);
            });
          });

          // TODO: test fetchMore (see components/apollo-query.test.ts)
        });

        describe('setting variables', function() {
          beforeEach(function() {
            element!.variables = { foo: 'foo' };
          });

          it('does not subscribe', function() {
            expect(element.variables).to.deep.equal({ foo: 'foo' });
            expect(element.client?.watchQuery).to.not.have.been.called;
          });
        });

        describe('fetchMore()', function() {
          let result: ApolloQueryResult<ApolloQueryElement['data']> | undefined;
          let error: Error | undefined;

          beforeEach(async function() {
            try {
              result = await element!.fetchMore();
              return result;
            } catch (e) {
              error = e;
            }
          });

          afterEach(function() {
            result = undefined;
            error = undefined;
          });

          it('throws', function() {
            expect(result).to.not.be.ok;
            expect(error).to.be.an.instanceOf(Error);
            expect(error!.message).to.match(/query/);
          });
        });
      });

      describe('with no-auto-subscribe attribute set', function() {
        let element: TestableElement & ApolloQueryElement;

        let spies: Record<string|keyof ApolloQueryElement, SinonSpy> | undefined;

        beforeEach(function(this: Mocha.Context) {
          if (this.SKIP_ATTRIBUTES) this.skip();
        });

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            spy: ['subscribe'],
            attributes: 'no-auto-subscribe',
          }));
        });

        beforeEach(function() {
          spies!['client.subscribe'] = spy(element!.client!, 'subscribe');
          spies!['client.query'] = spy(element!.client!, 'query');
          spies!['client.watchQuery'] = spy(element!.client!, 'watchQuery');
        });

        beforeEach(() => element.controller.host.updateComplete);

        afterEach(restoreSpies(() => spies));

        afterEach(function teardownElement() {
          element?.remove?.();
          // @ts-expect-error: fixture cleanup;
          element = undefined;
        });

        it('has noAutoSubscribe property set', function() {
          expect(element.noAutoSubscribe).to.be.true;
        });

        describe('setting a valid query', function() {
          beforeEach(function setQuery() {
            element!.query = S.NoParamQuery;
          });

          it('does not call subscribe', async function noAutoSubscribe() {
            expect(element.subscribe).to.not.have.been.called;
          });
        });

        describe('setting NullableParam query', function() {
          beforeEach(function setQuery() {
            element!.query = S.NullableParamQuery;
          });

          describe('with element context set', function() {
            const elContext = {};

            beforeEach(function() {
              element!.context = elContext;
            });

            beforeEach(() => element.controller.host.updateComplete);

            describe('subscribe()', async function() {
              beforeEach(function() {
                element.subscribe();
              });

              it('calls client watchQuery', function() {
                expect(element.client?.watchQuery).to.have.been
                  .calledWithMatch(match({ context: elContext }));
              });
            });

            describe('subscribe({ context })', async function() {
              const context = {};
              beforeEach(function() {
                element.subscribe({ context });
              });

              it('calls client watchQuery', function() {
                expect(element.client?.watchQuery).to.have.been
                  .calledWithMatch(match({ context }));
              });
            });

            describe('subscribe({ context })', async function() {
              const context = {};
              beforeEach(function() {
                element.subscribe({ context });
              });

              it('calls client watchQuery', function() {
                expect(element.client?.watchQuery).to.have.been
                  .calledWithMatch(match({ context }));
              });
            });
          });

          describe('with element errorPolicy set', function() {
            const elErrorPolicy = 'ignore';

            beforeEach(function() {
              element!.errorPolicy = elErrorPolicy;
            });

            describe('subscribe()', async function() {
              beforeEach(function() {
                element.subscribe();
              });

              it('calls client watchQuery', function() {
                expect(element.client?.watchQuery).to.have.been
                  .calledWithMatch(match({ errorPolicy: elErrorPolicy }));
              });
            });

            describe('subscribe({ errorPolicy })', async function() {
              const errorPolicy = 'all';
              beforeEach(function() {
                element.subscribe({ errorPolicy });
              });

              it('calls client watchQuery', function() {
                expect(element.client?.watchQuery).to.have.been
                  .calledWithMatch(match({ errorPolicy }));
              });
            });
          });

          describe('with element fetchPolicy set', function() {
            const elFetchPolicy = 'no-cache';

            beforeEach(function() {
              element!.fetchPolicy = elFetchPolicy;
            });

            describe('subscribe()', async function() {
              beforeEach(function() {
                element.subscribe();
              });

              it('calls client watchQuery', function() {
                expect(element.client?.watchQuery).to.have.been
                  .calledWithMatch(match({ fetchPolicy: elFetchPolicy }));
              });
            });

            describe('subscribe({ fetchPolicy })', async function() {
              const fetchPolicy = 'network-only';
              beforeEach(function() {
                element.subscribe({ fetchPolicy });
              });

              it('calls client watchQuery', function() {
                expect(element.client?.watchQuery).to.have.been
                  .calledWithMatch(match({ fetchPolicy }));
              });
            });
          });

          describe('with element variables set', function() {
            const elVariables: S.NullableParamQueryVariables = { nullable: 'element' };

            beforeEach(function() {
              element!.variables = elVariables;
            });

            describe('subscribe()', async function() {
              beforeEach(function() {
                element.subscribe();
              });

              it('calls client watchQuery', function() {
                expect(element.client?.watchQuery).to.have.been
                  .calledWithMatch(match({ variables: elVariables }));
              });
            });

            describe('subscribe({ variables })', async function() {
              const variables: S.NullableParamQueryVariables = { nullable: 'specific' };
              beforeEach(function() {
                element.subscribe({ variables });
              });

              it('calls client watchQuery', function() {
                expect(element.client?.watchQuery).to.have.been
                  .calledWithMatch(match({ variables }));
              });
            });
          });
        });

        describe('removing no-auto-subscribe attribute', function() {
          beforeEach(function removeAttribute() {
            element.removeAttribute('no-auto-subscribe');
          });

          beforeEach(waitForRender(() => element));

          it('unsets noAutoSubscribe property', function() {
            expect(element.noAutoSubscribe).to.be.false;
          });
        });
      });

      describe('with NoParams query', function() {
        let element: TestableElement & ApolloQueryElement<typeof S.NoParamQuery>;

        function resetPrivateWatchQuerySpy() {
          // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
          (element.client!.queryManager!.watchQuery as SinonSpy).resetHistory?.();
        }

        function callSubscribe() {
          element.subscribe();
        }

        function setProperties(properties?: Partial<typeof element>) {
          return function() {
            for (const [key, val] of Object.entries(properties ?? {}) as I.Entries<typeof properties>)
              element[key] = val;
          };
        }

        beforeEach(async function setupElement() {
          ({ element } = await setupFunction({
            properties: {
              query: S.NoParamQuery,
            },
          }));
        });

        // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
        afterEach(() => (element.client!.queryManager.watchQuery as SinonSpy).restore?.());
        beforeEach(() => spy(element.controller, 'refetch'));
        afterEach(() => (element.controller.refetch as SinonSpy).restore?.());

        afterEach(function teardownElement() {
          element.remove();
          // @ts-expect-error: reset the fixture
          element = undefined;
        });

        describe('setting variables', function() {
          beforeEach(function setVariables() {
            // @ts-expect-error: incorrectly setting variables
            element.variables = { errorPolicy: 'foo' };
          });

          beforeEach(nextFrame);

          it('calls refetch', function() {
            expect(element.controller.refetch).to.have.been.calledWithMatch({
              errorPolicy: 'foo',
            });
          });
        });

        describe('executeQuery()', function() {
          const query = S.NoParamQuery;

          beforeEach(function spyClientQuery() {
            spies!['client.query'] = spy(element!.client!, 'query');
          });

          beforeEach(function executeQuery() {
            return element.executeQuery();
          });

          it('accepts custom args', function() {
            expect(element.client?.query).to.have.been.calledWith(match({ query }));
          });
        });

        describe('executeQuery({ query })', function() {
          const query = S.NullableParamQuery;

          beforeEach(function spyClientQuery() {
            spies!['client.query'] = spy(element!.client!, 'query');
          });

          beforeEach(function executeQuery() {
            return element.executeQuery({ query });
          });

          it('accepts custom args', function() {
            expect(element.client?.query).to.have.been.calledWith(match({ query }));
          });
        });

        describe('fetchMore({ updateQuery })', function() {
          let result: ApolloQueryResult<ApolloQueryElement['data']>;

          beforeEach(async function callFetchMore() {
            result = await element!.fetchMore();
            return result;
          });

          it('updates data', function() {
            expect(result.data?.noParam.noParam).to.equal('noParam');
            expect(element.data?.noParam?.noParam).to.equal('noParam');
          });
        });

        describe('with no specific fetchPolicy', function() {
          beforeEach(resetPrivateWatchQuerySpy);
          // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
          beforeEach(() => spy(element.client!.queryManager!, 'watchQuery'));

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
          // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
          beforeEach(() => spy(element.client!.queryManager!, 'watchQuery'));
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
          const args = { document: S.NoParamSubscription, updateQuery: (x: any) => x };

          let result: (() => void) | void;

          beforeEach(function callSubscribeToMore() {
            result = element.subscribeToMore(args);
          });

          it('calls observableQuery.subscribeToMore()', function() {
            expect(result).to.be.an.instanceof(Function);
          });

          // TODO: test effects on data
        });

        describe('when client has default watchQuery options', function() {
          let cache: DefaultOptions;
          const variables = { foo: 'when client has default watchQuery options' };

          // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
          beforeEach(() => spy(element.client!.queryManager!, 'watchQuery'));
          // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
          afterEach(() => (element.client!.queryManager!.watchQuery as SinonSpy).restore?.());

          beforeEach(function setClientDefaults() {
            cache = element!.client!.defaultOptions;
            element!.client!.defaultOptions = {
              watchQuery: {
                notifyOnNetworkStatusChange: true,
                // @ts-expect-error: just checking that it passes arbitrary value, don't care abt the interface
                SOMETHING_SILLY: true,
              },
            };
          });

          beforeEach(function callWatchQuery() {
            // @ts-expect-error: just testing the call
            element.subscribe({ variables });
          });

          afterEach(function restoreClientDefaults() {
            element!.client!.defaultOptions = cache;
          });

          it('uses default options', function() {
            // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
            expect(element.client.queryManager.watchQuery)
              .to.have.been.calledWithMatch({
                notifyOnNetworkStatusChange: true,
                SOMETHING_SILLY: true,
              });
          });
        });
      });

      describe('with NullableParams query', function() {
        let element: TestableElement & ApolloQueryElement<typeof S.NullableParamQuery>;

        beforeEach(async function setupElement() {
          ({ element } = await setupFunction({
            properties: {
              query: S.NullableParamQuery,
            },
          }));
        });

        beforeEach(() => spy(element.controller, 'refetch'));
        afterEach(() => (element?.controller?.refetch as SinonSpy)?.restore?.());

        afterEach(function teardownElement() {
          element?.remove?.();
          // @ts-expect-error: fixture cleanup
          element = undefined;
        });

        describe('refetch()', function() {
          beforeEach(function callRefetch() {
            element!.refetch({ nullable: 'new args' });
          });

          beforeEach(waitForRender(() => element));
          beforeEach(nextFrame);
          beforeEach(waitForRender(() => element));

          it('updates data', function() {
            expect(element.data?.nullableParam?.nullable).to.equal('new args');
          });
        });

        describe('setting new variables', function() {
          beforeEach(function() {
            // HACK: 🤷‍♂️ this fails only for haunted if I don't redeclare the spy here
            (element.controller.refetch as SinonSpy).restore?.();
            spies!.refetch?.restore?.();
            spies!.refetch = spy(element.controller, 'refetch');
          });

          beforeEach(function setVariables() {
            element!.variables = { nullable: '🍟' };
          });

          it('calls refetch', function() {
            expect(element.controller.refetch)
              .to.have.been.calledWithMatch({ nullable: '🍟' });
          });
        });

        describe('executeQuery()', function() {
          beforeEach(function spyClientQuery() {
            spies!['client.query'] = spy(element!.client!, 'query');
          });

          beforeEach(() => element.executeQuery());

          beforeEach(() => element.controller.host.updateComplete);

          it('calls client.query with element properties', function() {
            const { errorPolicy, fetchPolicy, query } = element!;
            expect(element.client!.query)
              .to.have.been.calledWith(match({ errorPolicy, fetchPolicy, query }));
          });

          it('sets data from the response', function() {
            expect(element.data!.nullableParam!.nullable).to.equal('Hello World');
          });

          it('sets loading from the response', function() {
            expect(element.loading).to.be.false;
          });

          it('sets error from the response', function() {
            expect(element.error).to.be.null;
          });

          it('sets errors from the response', function() {
            expect(element.errors).to.be.empty;
          });

          it('sets networkStatus from the response', function() {
            expect(element.networkStatus).to.equal(7);
          });
        });

        describe('executeQuery({ query })', function() {
          beforeEach(function spyClientQuery() {
            spies!['client.query'] = spy(element!.client!, 'query');
          });

          beforeEach(function setVariables() {
            element!.variables = { nullable: 'WHOOPIE' };
          });

          beforeEach(function executeQuery() {
            return element!.executeQuery({ query: S.NoParamQuery });
          });

          it('defaults to element variables', async function() {
            const { variables } = element!;
            expect(element!.client!.query)
              .to.have.been.calledWithMatch(match({ variables, query: S.NoParamQuery }));
          });
        });

        describe('executeQuery({ variables })', function() {
          const variables: S.NullableParamQueryVariables = { nullable: 'WHOOPIE' };
          beforeEach(function spyClientQuery() {
            spies!['client.query'] = spy(element!.client!, 'query');
          });

          beforeEach(function executeQuery() {
            return element!.executeQuery({ variables });
          });

          it('defaults to element query', async function() {
            const { query } = element!;
            expect(element!.client!.query).to.have.been.calledWithMatch({ query, variables });
          });

          it('updates data with the response', function() {
            expect(element!.data!.nullableParam!.nullable).to.equal('WHOOPIE');
          });
        });
      });

      describe('with NonNullableParams query', function() {
        let element: ApolloQueryElement<typeof S.NonNullableParamQuery>;

        beforeEach(async function setupElement() {
          ({ element } = await setupFunction({
            properties: {
              query: S.NonNullableParamQuery,
            },
          }));
        });

        beforeEach(() => spy(element.controller, 'refetch'));
        afterEach(() => (element?.controller?.refetch as SinonSpy)?.restore?.());

        afterEach(function teardownElement() {
          element?.remove?.();
          // @ts-expect-error: fixture cleanup
          element = undefined;
        });

        describe('executeQuery()', function() {
          let error: Error;
          beforeEach(async function() {
            try {
              const r = await element!.executeQuery({ variables: { nonNull: 'error' } });
              if (r)
                expect.fail('did not reject query', r!.data!.nonNullParam!.nonNull);
            } catch (e) {
              error = e;
            }
          });

          beforeEach(() => element.controller.host.updateComplete);

          it('updates error with the error', function() {
            expect(element!.error).to.equal(error);
          });
        });
      });
    });
  });

  if (Klass) {
    describe('ApolloQuery subclasses', function() {
      describe('with client set as class field', function() {
        let client: ApolloClient<any>;

        let element: ApolloQueryElement;

        beforeEach(() => {
          client = new ApolloClient({ cache: new InMemoryCache(), connectToDevTools: false });
        });

        afterEach(() => {
          // @ts-expect-error: reset test fixture
          client = undefined;
        });

        beforeEach(async function() {
          const tag = defineCE(class Test extends Klass {
            client = client;
          });

          element = await fixture<ApolloQueryElement>(`<${tag}></${tag}>`);
        });

        beforeEach(() => element.controller.host.updateComplete);

        it('sets client', function() {
          expect(element.client).to.equal(client);
        });

        it('calling subscribe({ query }) does not throw', function() {
          expect(() => {
            element.subscribe({ query: S.NoParamQuery });
          }).to.not.throw;
        });
      });

      describe('with a global client', function() {
        beforeEach(setupClient);
        afterEach(teardownClient);
        describe('with client set as class field', function() {
          let client: ApolloClient<any>;

          let element: ApolloQueryElement;

          beforeEach(teardownClient);
          afterEach(teardownClient);

          beforeEach(() => {
            client = new ApolloClient({ cache: new InMemoryCache(), connectToDevTools: false });
          });

          afterEach(() => {
            // @ts-expect-error: reset test fixture
            client = undefined;
          });

          beforeEach(async function() {
            const tag = defineCE(class Test extends Klass {
              client = client;
            });

            element = await fixture<ApolloQueryElement>(`<${tag}></${tag}>`);
          });

          beforeEach(() => element.controller.host.updateComplete);

          it('sets client', function() {
            expect(element.client).to.equal(client);
          });

          it('calling subscribe({ query }) does not throw', function() {
            expect(() => {
              element.subscribe({ query: S.NoParamQuery });
            }).to.not.throw;
          });
        });
      });

      describe('with noAutoSubscribe set as a class field', function() {
        let element: ApolloQueryElement;

        let spies: Record<string, SinonSpy>;

        beforeEach(setupClient);
        afterEach(teardownClient);

        beforeEach(async function setupElement() {
          spies = {
            subscribe: spy(Klass.prototype, 'subscribe'),
          };

          class Test extends Klass {
            noAutoSubscribe = true;
          }

          const tag = unsafeStatic(defineCE(Test));

          element = await fixture<ApolloQueryElement>(html`<${tag}></${tag}>`);
        });

        afterEach(restoreSpies(() => spies));

        afterEach(function teardownElement() {
          element.remove();
          // @ts-expect-error: reset the fixture
          element = undefined;
        });

        beforeEach(() => element.controller.host.updateComplete);

        it('has no-auto-subscribe attribute', function() {
          expect(element.hasAttribute('no-auto-subscribe')).to.be.true;
        });

        describe('unsetting noAutoSubscribe', function() {
          beforeEach(function unsetNoAutoSubscribe() {
            element.noAutoSubscribe = false;
          });

          beforeEach(() => element.controller.host.updateComplete);

          it('removes the no-auto-subscribe attribute', function() {
            expect(element.hasAttribute('no-auto-subscribe')).to.be.false;
          });
        });

        describe('setting a valid query', function() {
          beforeEach(function setQuery() {
            element.query = S.NoParamQuery;
          });

          it('does not call subscribe', function() {
            expect(element.subscribe).to.not.have.been.called;
          });
        });
      });

      describe('with NoParams query set as a class field', function() {
        class Test extends Klass {
          query = S.NoParamQuery;
        }

        let element: Test;

        beforeEach(setupClient);
        afterEach(teardownClient);

        beforeEach(async function setupElement() {
          const tag = unsafeStatic(defineCE(class extends Test {}));

          element = await fixture<Test>(html`<${tag}></${tag}>`);
        });

        beforeEach(() => spy(element.controller, 'refetch'));
        afterEach(() => (element.controller.refetch as SinonSpy).restore?.());

        afterEach(function teardownElement() {
          element.remove();
          // @ts-expect-error: reset the fixture
          element = undefined;
        });

        it('sets the query property', async function() {
          expect(element.query).to.equal(S.NoParamQuery);
        });

        describe('setting variables', function() {
          beforeEach(function setVariables() {
            element.variables = { errorPolicy: 'foo' };
          });

          it('calls refetch', function() {
            expect(element.controller.refetch).to.have.been.calledWith(match({ errorPolicy: 'foo' }));
          });
        });
      });

      describe('with NullableParams query and variables set as class fields', function() {
        class Test extends Klass {
          query = S.NullableParamQuery;

          variables = { nullable: 'nullable' };
        }

        let element: Test;

        beforeEach(setupClient);
        beforeEach(() => spy(window.__APOLLO_CLIENT__!, 'watchQuery'));
        afterEach(() => (window.__APOLLO_CLIENT__!.watchQuery as SinonSpy).restore?.());
        afterEach(teardownClient);

        beforeEach(async function setupElement() {
          const tag = defineCE(class extends Test {});
          element = await fixture<Test>(`<${tag}></${tag}>`);
        });

        it('subscribes to the query', function() {
          expect(window.__APOLLO_CLIENT__!.watchQuery)
            .to.have.been.calledOnce
            .and
            .to.have.been.calledWithMatch({ variables: { nullable: 'nullable' } });
        });

        beforeEach(() => element.controller.host.updateComplete);

        beforeEach(() => spy(element.controller, 'refetch'));
        afterEach(() => (element.controller.refetch as SinonSpy).restore?.());

        afterEach(function teardownElement() {
          element.remove();
          // @ts-expect-error: reset the fixture
          element = undefined;
        });

        describe('setting new variables', function() {
          beforeEach(nextFrame);

          beforeEach(function setVariables() {
            element.variables = { nullable: '🍟' };
          });

          beforeEach(nextFrame);

          it('calls refetch', function() {
            expect(element.controller.refetch)
              .to.have.been.calledOnce
              .and
              .to.have.been.calledWithMatch({ nullable: '🍟' });
          });
        });
      });

      describe(`with NonNullableParams query and sufficient variables set as a class fields`, function() {
        type Data = S.NonNullableParamQueryData;
        type Variables = S.NonNullableParamQueryVariables;

        let element: ApolloQueryElement<Data, Variables>;

        beforeEach(setupClient);
        afterEach(teardownClient);

        beforeEach(async function setupElement() {
          class Test extends Klass<Data, Variables> {
            query = S.NonNullableParamQuery;

            variables = { nonNull: 'nonNull' };
          }

          const tag = defineCE(Test);

          element = await fixture<Test>(`<${tag}></${tag}>`);
        });

        afterEach(function teardownElement() {
          element?.remove?.();
          // @ts-expect-error: reset the fixture
          element = undefined;
        });

        describe('subscribe()', function() {
          let subscription: ZenObservable.Subscription;

          beforeEach(function() {
            subscription = element.subscribe();
          });

          afterEach(function teardownSubscription() {
            // @ts-expect-error: reset the fixture
            subscription = undefined;
          });

          it('returns a subscription', async function subscribeReturnsSubscription() {
            expect(isSubscription(subscription)).to.be.true;
          });

          // TODO: test effects
        });
      });

      describe(`with NonNullableParams query and insufficient variables set as a class fields`, function() {
        type Data = S.NonNullableParamQueryData;
        type Variables = S.NonNullableParamQueryVariables;

        let element: ApolloQueryElement<Data, Variables>;

        beforeEach(setupClient);
        afterEach(teardownClient);
        beforeEach(async function setupElement() {
          class Test extends (Klass as unknown as I.Constructor<typeof element>) {
            query = S.NonNullableParamQuery;

            // @ts-expect-error: test bad input
            variables = { nonNull: null };
          }

          const tag = defineCE(Test);

          // @ts-expect-error: test bad input
          element = await fixture<Test>(`<${tag}></${tag}>`);
        });

        afterEach(function teardownElement() {
          element?.remove?.();
          // @ts-expect-error: reset the fixture
          element = undefined;
        });

        describe('subscribe()', function() {
          let subscription: ZenObservable.Subscription;

          beforeEach(function() {
            subscription = element.subscribe();
          });

          afterEach(function teardownSubscription() {
            // @ts-expect-error: reset the fixture
            subscription = undefined;
          });

          it('creates a subscription', function() {
            expect(isSubscription(subscription)).to.be.true;
          });

          it('sets error', function() {
            expect(element.error?.message).to.equal('Variable "$nonNull" of non-null type "String!" must not be null.');
          });

          // TODO: test effects
        });
      });

      describe('with fetchPolicy set as a class field', function() {
        let element: I.ApolloQueryElement;

        const fetchPolicy = 'no-cache' as const;

        beforeEach(setupClient);
        afterEach(teardownClient);
        beforeEach(async function setupElement() {
          const tag = defineCE(class Test extends Klass {
            query = S.NoParamQuery;

            fetchPolicy = fetchPolicy;
          });

          element = await fixture<I.ApolloQueryElement>(`<${tag}></${tag}>`);
          await element.controller.host.updateComplete;
        });

        beforeEach(() => spy(element.client!['queryManager'], 'watchQuery'));

        beforeEach(() => element.subscribe());

        afterEach(() => (element.client?.watchQuery as SinonSpy).restore?.());

        afterEach(() => {
          element.remove();
        });

        it('respects instance-specific fetchPolicy', async function() {
          expect(element.fetchPolicy).to.equal(fetchPolicy);
          // @ts-expect-error: should probably test effects, but for now 🤷‍♂️
          expect(element.client!.queryManager.watchQuery).to.have.been
            .calledWithMatch({ fetchPolicy });
        });
      });

      describe('with onData and onError methods defined in the class body', function() {
        describe(`with NonNullableParams query`, function() {
          class Test extends Klass {
            client = client;

            query = S.NonNullableParamQuery;

            noAutoSubscribe = true;

            onData(x: unknown) { x; }

            onError(x: unknown) { x; }
          }

          let element: Test;

          let spies: Record<string | Exclude<keyof typeof element, symbol>, SinonSpy>;

          beforeEach(setupClient);
          afterEach(teardownClient);

          beforeEach(async function setupElement() {
            const tag = defineCE(class extends Test {});

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          beforeEach(() => element.controller.host.updateComplete);

          beforeEach(function spyMethods() {
            spies = {
              onData: spy(element, 'onData'),
              onError: spy(element, 'onError'),
            };
          });

          afterEach(restoreSpies(() => spies));

          afterEach(function teardownElement() {
            element.remove();
            // @ts-expect-error: reset the fixture
            element = undefined;
          });

          describe('when executeQuery rejects', function() {
            const variables: S.NonNullableParamQueryVariables = { nonNull: 'error' };

            beforeEach(() => element.executeQuery({ variables }).catch(() => 0));

            beforeEach(nextFrame);

            it('does not call onData', function() {
              expect(element.onData).to.not.have.been.called;
            });

            it('calls onError', function() {
              expect(element.onError).to.have.been.called;
            });
          });

          describe('when executeQuery resolves', function() {
            const variables: S.NonNullableParamQueryVariables = { nonNull: 'nullable' };

            beforeEach(() => element.executeQuery({ variables }));

            beforeEach(() => element.controller.host.updateComplete);

            it('calls onData', function() {
              expect(element.onData).to.have.been.calledWithMatch({
                nonNullParam: {
                  __typename: 'NonNull',
                  nonNull: 'nullable',
                },
              });
            });

            it('does not call onError', function() {
              expect(element.onError).to.not.have.been.called;
            });
          });
        });
      });
    });
  }
}
