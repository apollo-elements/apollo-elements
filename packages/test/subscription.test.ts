import type * as I from '@apollo-elements/interfaces';

import type { ApolloSubscriptionElement } from '@apollo-elements/core/types';

import { SetupFunction } from './types';

import { aTimeout, defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { gql, ApolloClient, InMemoryCache } from '@apollo/client/core';

import { spy, SinonSpy } from 'sinon';
import { makeClient, setupClient, teardownClient } from './client';
import { restoreSpies, stringify, waitForRender } from './helpers';
import { TestableElement } from './types';

import * as S from './schema';

export interface DescribeSubscriptionComponentOptions<T extends ApolloSubscriptionElement<any, any> = ApolloSubscriptionElement<any, any>> {
  /**
   * Async function which returns an instance of the query element
   * The element must render a template which contains the following DOM structure
   * ```html
   * <output id="data"></output>
   * <output id="error"></output>
   * <output id="loading"></output>
   * ```
   * On updates, each `<output>`'s text content should be
   * set to the `JSON.stringified` representation of it's associated value,
   * with 2 spaces as tabs.
   * The element must also implement a `stringify` method to perform that stringification,
   * as well as a `hasRendered` method which returns a promise that resolves when the element is finished rendering
   */
  setupFunction: SetupFunction<T & TestableElement>;

  /**
   * Optional: the class which setup function uses to generate the component.
   * Only relevant to class-based libraries
   */
  class?: I.Constructor<Omit<T, 'update'|'updated'> & TestableElement>;
}

export { setupSubscriptionClass } from './helpers';

export function describeSubscription(options: DescribeSubscriptionComponentOptions): void {
  const { setupFunction } = options;
  const Klass: I.Constructor<TestableElement> & typeof ApolloSubscriptionElement =
    options.class as unknown as I.Constructor<TestableElement> & typeof ApolloSubscriptionElement;

  describe(`ApolloSubscription interface`, function() {
    describe('when simply instantiating', function() {
      let element: ApolloSubscriptionElement & TestableElement|undefined;

      let spies: Record<keyof typeof element, SinonSpy>;

      beforeEach(async function setupElement() {
        ({ element, spies } = await setupFunction({
          spy: ['subscribe'],
        }));
      });

      afterEach(function teardownElement() {
        element?.remove?.();
        element = undefined;
      });

      afterEach(restoreSpies(() => spies));

      it('has default properties', function() {
        // nullable fields
        expect(element?.data, 'data').to.be.null;
        expect(element?.error, 'error').to.be.null;
        expect(element?.subscription, 'subscription').to.be.null;
        expect(element?.variables, 'variables').to.be.null;

        // defined fields
        expect(element?.loading, 'loading').to.be.false;
        expect(element?.noAutoSubscribe, 'noAutoSubscribe').to.be.false;
        expect(element?.shouldResubscribe, 'shouldResubscribe').to.be.false;
        expect(element?.skip, 'skip').to.be.false;

        // options fields
        expect(element?.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange').to.be.undefined;
        expect(element?.fetchPolicy, 'fetchPolicy').to.be.undefined;
        expect(element?.errorPolicy, 'errorPolicy').to.be.undefined;
        expect(element?.onError, 'onError').to.be.undefined;
        expect(element?.onSubscriptionComplete, 'onSubscriptionComplete').to.be.undefined;
        expect(element?.onSubscriptionData, 'onSubscriptionData').to.be.undefined;
        expect(element?.pollInterval, 'pollInterval').to.be.undefined;
      });

      it('caches observed properties', function() {
        if (!element)
          throw new Error('No element');

        const client = makeClient();
        element.client = client;
        expect(element?.client, 'client').to.equal(client);

        element.client = null;
        expect(element?.client, 'client').to.be.null;

        element.data = { data: 'data' };
        expect(element?.data, 'data').to.deep.equal({ data: 'data' });

        let err: Error;
        try {
          throw new Error('error');
        } catch (e) { err = e; }
        element.error = err;
        expect(element?.error, 'error').to.equal(err);

        element.loading = true;
        expect(element?.loading, 'loading').to.equal(true);

        element.loading = false;
        expect(element?.loading, 'loading').to.equal(false);

        const subscription = gql`{ __schema { __typename } }`;
        element.subscription = subscription;
        expect(element?.subscription, 'subscription').to.equal(subscription);

        element.subscription = null;
        expect(element?.subscription, 'subscription').to.be.null;
      });

      describe('setting loading', function() {
        beforeEach(function setLoading() {
          element!.loading = true;
        });

        beforeEach(waitForRender(() => element));

        it('renders loading', async function() {
          expect(element?.shadowRoot?.getElementById('loading')?.textContent)
            .to.equal(stringify(true));
        });
      });

      describe('calling subscribe without client', function() {
        it('throws', function() {
          expect(() => element!.subscribe()).to.throw('No Apollo client.');
        });

        describe('subscribe({ subscription, client })', async function() {
          let client: ApolloClient<any>|undefined;

          beforeEach(function() {
            client = new ApolloClient({ cache: new InMemoryCache() });
            spy(client, 'subscribe');
            element?.subscribe({ client, subscription: S.NullableParamSubscription });
          });

          afterEach(function() {
            (client?.subscribe as SinonSpy).restore();
            client = undefined;
            delete window.__APOLLO_CLIENT__;
          });

          it('calls client subscribe', function() {
            expect(client?.subscribe).to.have.been.calledWithMatch({
              query: S.NullableParamSubscription,
            });
          });
        });
      });

      describe('setting NoParam subscription', function() {
        beforeEach(function setSubscription() {
          element!.subscription = S.NoParamSubscription;
        });

        it('sets subscription property', function() {
          expect(element?.subscription).to.equal(S.NoParamSubscription);
        });

        it('does not call subscribe', function() {
          // NB: haunted doesn't like spying on it's element methods
          expect(element?.subscribe).to.not.have.been.called;
        });
      });

      describe('setting malformed subscription', function() {
        it('throws', function() {
          // @ts-expect-error: we're testing the error
          expect(() => element.subscription = `subscription { foo }`)
            .to.throw('Subscription must be a parsed GraphQL document.');
          expect(element?.subscription).to.not.be.ok;
        });
      });
    });

    describe('with global client available', function() {
      let element: ApolloSubscriptionElement & TestableElement | undefined;

      let spies: Record<string|keyof ApolloSubscriptionElement, SinonSpy>;

      beforeEach(setupClient);

      beforeEach(async function setupElement() {
        ({ element, spies } = await setupFunction({
          spy: ['subscribe'],
        }));
      });

      beforeEach(function spyClientSubscribe() {
        spies['client.subscribe'] = spy(element!.client!, 'subscribe');
      });

      afterEach(restoreSpies(() => spies));

      beforeEach(waitForRender(() => element));

      afterEach(function teardownElement() {
        element?.remove?.();
        element = undefined;
      });

      afterEach(teardownClient);

      describe('with no-auto-subscribe attribute set', function() {
        describe('after setting NoParam subscription', function() {
          beforeEach(function setSubscription() {
            element!.subscription = S.NoParamSubscription;
          });

          describe('subscribe()', function() {
            beforeEach(function() {
              element!.subscribe();
            });

            it('calls client subscribe once', function() {
              expect(element?.client?.subscribe).to.have.been.calledOnce;
            });

            describe('then cancelling the subscription', function() {
              beforeEach(function() {
                element!.cancel();
              });

              describe('then setting element\'s shouldSubscribe to false', function() {
                beforeEach(function() {
                  element!.shouldResubscribe = false;
                });

                describe('and calling subscribe()', function() {
                  beforeEach(function() {
                    element!.subscribe();
                  });

                  it('calls client subscribe again', function() {
                    expect(element?.client?.subscribe).to.have.been.calledTwice;
                  });
                });

                describe('and calling subscribe({ shouldSubscribe: true })', function() {
                  beforeEach(function() {
                    element!.subscribe({ shouldResubscribe: true });
                  });

                  it('calls client subscribe again', function() {
                    expect(element?.client?.subscribe).to.have.been.calledTwice;
                  });
                });

                describe('and calling subscribe({ shouldSubscribe: false })', function() {
                  beforeEach(function() {
                    element!.subscribe({ shouldResubscribe: false });
                  });

                  it('calls client subscribe again', function() {
                    expect(element?.client?.subscribe).to.have.been.calledTwice;
                  });
                });
              });

              describe('then setting element\'s shouldSubscribe to true', function() {
                beforeEach(function() {
                  element!.shouldResubscribe = true;
                });

                describe('and calling subscribe()', function() {
                  beforeEach(function() {
                    element!.subscribe();
                  });

                  it('calls client subscribe again', function() {
                    expect(element?.client?.subscribe).to.have.been.calledTwice;
                  });
                });

                describe('and calling subscribe({ shouldSubscribe: true })', function() {
                  beforeEach(function() {
                    element!.subscribe({ shouldResubscribe: true });
                  });

                  it('calls client subscribe again', function() {
                    expect(element?.client?.subscribe).to.have.been.calledTwice;
                  });
                });

                describe('and calling subscribe({ shouldSubscribe: false })', function() {
                  beforeEach(function() {
                    element!.subscribe({ shouldResubscribe: false });
                  });

                  it('calls client subscribe again', function() {
                    expect(element?.client?.subscribe).to.have.been.calledTwice;
                  });
                });
              });
            });

            describe('then calling subscribe({ shouldResubscribe })', function() {
              beforeEach(function() {
                element!.subscribe({ shouldResubscribe: true });
              });

              it('calls client subscribe again', function() {
                expect(element?.client?.subscribe).to.have.been.calledTwice;
              });
            });

            describe('then setting element\'s shouldSubscribe to false', function() {
              beforeEach(function() {
                element!.shouldResubscribe = false;
              });

              describe('and calling subscribe({ shouldSubscribe: true })', function() {
                beforeEach(function() {
                  element!.subscribe({ shouldResubscribe: true });
                });

                it('calls client subscribe again', function() {
                  expect(element?.client?.subscribe).to.have.been.calledTwice;
                });
              });
            });

            describe('then setting element\'s shouldSubscribe to true', function() {
              beforeEach(function() {
                element!.shouldResubscribe = true;
              });

              describe('and calling subscribe({ shouldSubscribe: false })', function() {
                beforeEach(function() {
                  element!.subscribe({ shouldResubscribe: false });
                });

                it('does not call client subscribe again', function() {
                  expect(element?.client?.subscribe).to.have.been.calledOnce;
                });
              });

              describe('and calling subscribe({ shouldSubscribe: true })', function() {
                beforeEach(function() {
                  element!.subscribe({ shouldResubscribe: true });
                });

                it('does call client subscribe again', function() {
                  expect(element?.client?.subscribe).to.have.been.calledTwice;
                });
              });
            });
          });
        });

        describe('and shouldResubscribe set', function() {
          beforeEach(function() {
            element!.shouldResubscribe = true;
          });

          describe('subscribe({ subscription })', async function() {
            beforeEach(function() {
              element?.subscribe({ subscription: S.NullableParamSubscription });
            });

            it('calls client subscribe', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                query: S.NullableParamSubscription,
              });
            });
          });

          describe('with element.skip true', function() {
            beforeEach(function() {
              element!.skip = true;
            });

            describe('subscribe()', async function() {
              beforeEach(function() {
                element!.subscribe();
              });

              it('does not call client subscribe', function() {
                expect(element?.client?.subscribe).to.not.have.been.called;
              });
            });

            describe('subscribe({ subscription, skip: false })', async function() {
              beforeEach(function() {
                element!.subscribe({
                  subscription: S.NullableParamSubscription,
                  skip: false,
                });
              });

              it('calls client subscribe', function() {
                expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                  query: S.NullableParamSubscription,
                });
              });
            });
          });

          describe('subscribe({ subscription, client })', async function() {
            let client: ApolloClient<any>|undefined;

            beforeEach(function() {
              client = new ApolloClient({ cache: new InMemoryCache() });
              spy(client, 'subscribe');
            });

            afterEach(function() {
              (client?.subscribe as SinonSpy).restore();
              client = undefined;
            });

            beforeEach(function() {
              element?.subscribe({ client, subscription: S.NullableParamSubscription });
            });

            it('calls client subscribe', function() {
              expect(client?.subscribe).to.have.been.calledWithMatch({
                query: S.NullableParamSubscription,
              });
            });

            it('does not call element client subscribe', function() {
              expect(element?.client?.subscribe).to.not.have.been.called;
            });
          });

          describe('with element context', function() {
            const context = {};

            beforeEach(function() {
              element!.context = context;
            });

            describe('subscribe({ subscription })', function() {
              beforeEach(function() {
                element?.subscribe({ subscription: S.NullableParamSubscription });
              });

              it('calls client subscribe with element context', function() {
                expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                  query: S.NullableParamSubscription,
                  context,
                });
              });
            });

            describe('subscribe({ subscription, context })', async function() {
              const context = {};

              beforeEach(function() {
                element?.subscribe({ subscription: S.NullableParamSubscription, context });
              });

              it('calls client subscribe with context param', function() {
                expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                  query: S.NullableParamSubscription,
                  context,
                });
              });
            });
          });

          describe('subscribe({ subscription, context })', async function() {
            const context = {};

            beforeEach(function() {
              element?.subscribe({ subscription: S.NullableParamSubscription, context });
            });

            it('calls client subscribe with context', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                query: S.NullableParamSubscription,
                context,
              });
            });
          });

          describe('with element errorPolicy', function() {
            beforeEach(function() {
              element!.errorPolicy = 'none';
            });

            describe('subscribe({ subscription })', async function() {
              beforeEach(function() {
                element?.subscribe({ subscription: S.NullableParamSubscription });
              });
              it('calls client subscribe with element errorPolicy', function() {
                expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                  query: S.NullableParamSubscription,
                  errorPolicy: 'none',
                });
              });
            });

            describe('subscribe({ subscription, errorPolicy })', async function() {
              beforeEach(function() {
                element?.subscribe({ subscription: S.NullableParamSubscription, errorPolicy: 'all' });
              });
              it('calls client subscribe with params errorPolicy', function() {
                expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                  query: S.NullableParamSubscription,
                  errorPolicy: 'all',
                });
              });
            });
          });

          describe('subscribe({ subscription, errorPolicy })', async function() {
            const errorPolicy = 'ignore';
            beforeEach(function() {
              element?.subscribe({ subscription: S.NullableParamSubscription, errorPolicy });
            });
            it('calls client subscribe', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                query: S.NullableParamSubscription,
                errorPolicy,
              });
            });
          });

          describe('with element fetchPolicy', function() {
            beforeEach(function() {
              element!.fetchPolicy = 'cache-first';
            });

            describe('subscribe({ subscription })', async function() {
              beforeEach(function() {
                element?.subscribe({ subscription: S.NullableParamSubscription });
              });
              it('calls client subscribe with element fetchPolicy', function() {
                expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                  query: S.NullableParamSubscription,
                  fetchPolicy: 'cache-first',
                });
              });
            });

            describe('subscribe({ subscription, fetchPolicy })', async function() {
              beforeEach(function() {
                element?.subscribe({
                  subscription: S.NullableParamSubscription,
                  fetchPolicy: 'network-only',
                });
              });
              it('calls client subscribe with params fetchPolicy', function() {
                expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                  query: S.NullableParamSubscription,
                  fetchPolicy: 'network-only',
                });
              });
            });
          });

          describe('subscribe({ subscription, fetchPolicy })', async function() {
            const fetchPolicy = 'no-cache';
            beforeEach(function() {
              element?.subscribe({ subscription: S.NullableParamSubscription, fetchPolicy });
            });

            it('calls client subscribe', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                query: S.NullableParamSubscription,
                fetchPolicy,
              });
            });
          });

          describe('subscribe({ subscription, variables })', async function() {
            const variables: S.NullableParamSubscriptionVariables = { nullable: 'params' };
            beforeEach(function() {
              element?.subscribe({ subscription: S.NullableParamSubscription, variables });
            });
            it('calls client subscribe', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                query: S.NullableParamSubscription,
                variables,
              });
            });
          });

          describe('with element variables', function() {
            beforeEach(function() {
              element!.variables = { nullable: 'with' };
            });

            describe('subscribe({ subscription })', async function() {
              beforeEach(function() {
                element?.subscribe({ subscription: S.NullableParamSubscription });
              });
              it('calls client subscribe with element variables', function() {
                expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                  query: S.NullableParamSubscription,
                  variables: { nullable: 'with' },
                });
              });
            });

            describe('subscribe({ subscription, variables })', async function() {
              beforeEach(function() {
                element?.subscribe({
                  subscription: S.NullableParamSubscription,
                  variables: { nullable: 'else' },
                });
              });
              it('calls client subscribe with params variables', function() {
                expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                  query: S.NullableParamSubscription,
                  variables: { nullable: 'else' },
                });
              });
            });
          });
        });
      });

      describe('setting NoParam subscription', function() {
        beforeEach(function setSubscription() {
          element!.subscription = S.NoParamSubscription;
        });

        it('calls subscribe', function() {
          expect(element?.client?.subscribe).to.have.been.called;
        });

        describe('then setting NullableParam subscription', function() {
          beforeEach(function setNullableParamSubscription() {
            element!.subscription = S.NullableParamSubscription;
          });

          beforeEach(waitForRender(() => element!));
          beforeEach(() => aTimeout(50));

          it('renders second subscription', async function() {
            const json = stringify({
              'nullableParam': {
                'nullable': 'Hello World',
                '__typename': 'Nullable',
              },
            });
            expect(element).shadowDom.to.equal(`
              <output id="data">${json}</output>
              <output id="error">null</output>
              <output id="loading">false</output>
            `);
          });

          describe('then setting variables', function() {
            beforeEach(function() {
              element!.variables = { nullable: 'quux' };
            });

            beforeEach(waitForRender(() => element));
            beforeEach(() => aTimeout(50));

            it('renders new variables', async function() {
              expect(element?.shadowRoot?.textContent).to.contain('quux');
            });
          });
        });
      });

      describe('setting NullableParam subscription', function() {
        beforeEach(function setSubscription() {
          element!.subscription = S.NullableParamSubscription;
        });

        beforeEach(waitForRender(() => element));

        it('calls subscribe', function() {
          expect(element?.client?.subscribe).to.have.been.called;
        });

        beforeEach(() => aTimeout(50));

        it('renders data', function() {
          const json = stringify({
            'nullableParam': {
              'nullable': 'Hello World',
              '__typename': 'Nullable',
            },
          });
          expect(element).shadowDom.to.equal(`
            <output id="data">${json}</output>
            <output id="error">null</output>
            <output id="loading">false</output>
          `);
        });

        describe('then setting variables', function() {
          beforeEach(function setVariables() {
            element!.variables = { nullable: 'qux' };
          });

          beforeEach(waitForRender(() => element));

          it('creates a new observable', function() {
            expect(element?.client?.subscribe).to.have.been.calledTwice;
          });

          beforeEach(() => aTimeout(50));

          it('renders the new data', function() {
            expect(element?.shadowRoot?.getElementById('data')?.textContent)
              .to.equal(stringify({
                nullableParam: {
                  nullable: 'qux',
                  __typename: 'Nullable',
                },
              }));
          });
        });

        describe('then setting variables that cause the subscription to error', function() {
          beforeEach(function setVariables() {
            element!.variables = { nullable: 'error' };
          });

          it('renders error', function() {
            expect(element?.shadowRoot?.getElementById('error')?.textContent)
              .to.equal(stringify(element?.error));
          });
        });

        describe('then setting null subscription', function() {
          beforeEach(function nullifySubscription() {
            element!.subscription = null;
          });

          it('does not create a new observable', function() {
            expect(element?.client?.subscribe).to.not.have.been.calledTwice;
          });
        });

        describe('when shouldResubscribe is set', function() {
          beforeEach(function setShouldResubscribe() {
            element!.shouldResubscribe = true;
          });

          beforeEach(() => element?.updateComplete);

          describe('subscribe({ fetchPolicy, variables })', function() {
            const fetchPolicy = 'network-only';
            const variables = { nullable: 'bar' };

            beforeEach(function() {
              element?.subscribe({ variables, fetchPolicy });
            });

            it('calls client subscribe with element subscription', function() {
              const { subscription } = element!;
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                query: subscription,
              });
            });

            it('calls client subscribe with specified FetchPolicy', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({ fetchPolicy });
            });

            it('calls client subscribe with element variables', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({ variables });
            });
          });

          describe('subscribe({ subscription, fetchPolicy })', function() {
            const fetchPolicy = 'cache-only';

            const subscription = S.NoParamSubscription;

            beforeEach(function setVariables() {
              element!.variables = { null: null };
            });

            beforeEach(function() {
              element?.subscribe({ subscription, fetchPolicy });
            });

            it('calls client subscribe with specified subscription', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({
                query: subscription,
              });
            });

            it('calls client subscribe with specified FetchPolicy', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({ fetchPolicy });
            });

            it('calls client subscribe with element variables', function() {
              const { variables } = element!;
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({ variables });
            });
          });

          describe('subscribe({ subscription, variables })', function() {
            const subscription = S.NonNullableParamSubscription;

            const variables = { nonNull: 'bar' };

            beforeEach(() => aTimeout(60));

            beforeEach(function() {
              element?.subscribe({ subscription, variables });
            });

            it('calls client subscribe with specified subscription', function() {
              expect(element?.client?.subscribe)
                .to.have.been.calledTwice;
              const [operation] = (element?.client?.subscribe as SinonSpy).lastCall.args;
              expect(operation.query).to.equal(subscription);
              expect(operation.variables).to.equal(variables);
            });

            it('calls client subscribe with element FetchPolicy', function() {
              const { fetchPolicy } = element!;
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({ fetchPolicy });
            });

            it('calls client subscribe with specified variables', function() {
              expect(element?.client?.subscribe).to.have.been.calledWithMatch({ variables });
            });
          });
        });
      });

      describe('setting malformed subscription', function() {
        let result: Error;

        beforeEach(function setBadSubscription() {
          try {
            // @ts-expect-error: we're testing the error
            element.subscription = `subscription { foo }`;
            expect.fail('should have thrown');
          } catch (e) {
            result = e;
          }
        });

        it('does not subscribe', function() {
          expect(element?.subscribe).to.not.have.been.called;
        });

        it('does not set subscription', function() {
          expect(element?.subscription).to.not.be.ok;
        });

        it('does not set error', function() {
          expect(element?.error).to.be.null;
        });

        it('throws expected error', function() {
          expect(result.message).to.equal('Subscription must be a parsed GraphQL document.');
        });
      });
    });
  });

  if (Klass) {
    describe('ApolloSubscription subclasses', function() {
      describe('with global client available', function() {
        beforeEach(setupClient);
        afterEach(teardownClient);

        describe('with subscription set as a class field', function() {
          let element: ApolloSubscriptionElement;

          beforeEach(async function() {
            class Test extends Klass {
              subscription = S.NoParamSubscription;
            }

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          it('caches subscription property', function() {
            expect(element?.subscription, 'subscription').to.equal(S.NoParamSubscription);
          });
        });

        describe('with shouldSubscribe overridden to return false', function() {
          let element: ApolloSubscriptionElement | undefined;

          beforeEach(() => spy(window.__APOLLO_CLIENT__!, 'subscribe'));
          afterEach(() => (window.__APOLLO_CLIENT__!.subscribe as SinonSpy).restore?.());

          afterEach(function teardownElement() {
            element?.remove?.();
            element = undefined;
          });

          beforeEach(async function() {
            class Test extends Klass {
              subscription = S.NullableParamSubscription;

              shouldSubscribe() {
                return false;
              }
            }

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          it('does not subscribe on connect', function() {
            expect(element?.client?.subscribe).to.not.have.been.called;
          });
        });

        describe('with noAutoSubscribe set as a class field', function() {
          let element: ApolloSubscriptionElement;

          beforeEach(() => spy(window.__APOLLO_CLIENT__!, 'subscribe'));
          afterEach(() => (window.__APOLLO_CLIENT__!.subscribe as SinonSpy).restore?.());

          afterEach(function teardownElement() {
            element?.remove?.();
            // @ts-expect-error: fixture cleanup
            element = undefined;
          });

          describe('when set before subscription field', function() {
            beforeEach(async function() {
              class Test extends Klass {
                noAutoSubscribe = true;

                subscription = S.NullableParamSubscription;
              }

              const tag = defineCE(Test);

              element = await fixture<Test>(`<${tag}></${tag}>`);
            });

            it('does not subscribe on connect', function() {
              expect(element?.client?.subscribe).to.not.have.been.called;
            });
          });

          describe('when set after subscription field', function() {
            beforeEach(async function() {
              class Test extends Klass {
                subscription = S.NullableParamSubscription;

                noAutoSubscribe = true;
              }

              const tag = defineCE(Test);

              element = await fixture<Test>(`<${tag}></${tag}>`);
            });

            it('does not subscribe on connect', function() {
              expect(element?.client?.subscribe).to.not.have.been.called;
            });
          });
        });

        describe('with fetchPolicy set as a class field', function() {
          let element: ApolloSubscriptionElement<typeof S.NullableParamSubscription> | undefined;

          let spies: Record<string|Exclude<keyof ApolloSubscriptionElement, symbol>, SinonSpy>;

          beforeEach(function spyClientSubscribe() {
            spies = {
              'client.subscribe': spy(window.__APOLLO_CLIENT__!, 'subscribe'),
            };
          });

          afterEach(function teardownElement() {
            element?.remove?.();
            element = undefined;
          });

          afterEach(restoreSpies(() => spies));

          beforeEach(async function() {
            class Test extends Klass<typeof S.NullableParamSubscription> {
              subscription = S.NullableParamSubscription;

              variables = { nullable: 'quux' };

              fetchPolicy = 'cache-only' as const;
            }

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          beforeEach(() => element?.updateComplete);

          it('sets fetchPolicy', function() {
            expect(element?.fetchPolicy).to.equal('cache-only');
          });

          it('sets controller fetchPolicy', function() {
            expect(element?.controller?.options.fetchPolicy).to.equal('cache-only');
          });

          it('subscribes with the given FetchPolicy', function() {
            expect(element?.client?.subscribe).to.have.been
              .calledWithMatch({ fetchPolicy: 'cache-only' });
          });
        });

        describe('with onComplete, onError, and onSubscriptionData set as class methods', function() {
          let element: TestableElement & ApolloSubscriptionElement<typeof S.NonNullableParamSubscription> | undefined;

          let spies: Record<string|Exclude<keyof ApolloSubscriptionElement, symbol>, SinonSpy> | undefined;

          beforeEach(function spyClientSubscribe() {
            spies = {
              'client.subscribe': spy(window.__APOLLO_CLIENT__!, 'subscribe'),
            };
          });

          afterEach(function teardownElement() {
            element?.remove?.();
            element = undefined;
          });

          afterEach(restoreSpies(() => spies));

          beforeEach(async function() {
            class Test extends Klass<typeof S.NonNullableParamSubscription> {
              subscription = S.NonNullableParamSubscription;

              noAutoSubscribe = true;

              onSubscriptionComplete(): void { null; }

              onSubscriptionData(x: unknown): void { x; }

              onError(x: unknown): void { x; }
            }

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);

            spies!['onSubscriptionComplete'] = spy(element, 'onSubscriptionComplete');
            spies!['onSubscriptionData'] = spy(element, 'onSubscriptionData');
            spies!['onError'] = spy(element, 'onError');
          });

          describe('with subscription that will resolve and immediately complete', function() {
            beforeEach(function setVariables() {
              element!.variables = { nonNull: 'hola' };
            });

            beforeEach(function subscribe() {
              element!.subscribe();
            });

            it('sets loading', function() {
              expect(element?.loading).to.be.true;
            });

            describe('when subscription resolves', function() {
              beforeEach(nextFrame);
              beforeEach(waitForRender(() => element));

              it('calls onSubscriptionData', function() {
                expect(element?.onSubscriptionData).to.have.been.called;
              });

              it('does not call onError', function() {
                expect(element?.onError).to.not.have.been.called;
              });

              it('calls onSubscriptionComplete', function() {
                expect(element?.onSubscriptionComplete).to.have.been.called;
              });
            });
          });

          describe('with subscription that should error', function() {
            beforeEach(function setVariablesToError() {
              element!.variables = { nonNull: 'error' };
            });

            beforeEach(function subscribe() {
              element?.subscribe();
            });

            describe('when subscription rejects', function() {
              beforeEach(waitForRender(() => element));

              it('does not call onSubscriptionData', function() {
                expect(element?.onSubscriptionData).to.not.have.been.called;
              });

              it('calls onError', function() {
                expect(element?.onError).to.have.been.called;
              });
            });
          });
        });
      });
    });
  }
}
