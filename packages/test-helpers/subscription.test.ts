import { SetupFunction, SetupOptions, SetupResult } from './types';

import { defineCE, expect, fixture } from '@open-wc/testing';

import type { ApolloSubscriptionInterface, Constructor } from '@apollo-elements/interfaces';

import { gql } from '@apollo/client/core';

import { spy, SinonSpy } from 'sinon';
import { makeClient, setupClient, teardownClient } from './client';

import NoParamSubscription from './graphql/NoParam.subscription.graphql';
import NullableParamSubscription from './graphql/NullableParam.subscription.graphql';
import NonNullableParamSubscription from './graphql/NonNullableParam.subscription.graphql';

import Observable from 'zen-observable';

import {
  NoParamSubscriptionData,
  NoParamSubscriptionVariables,
  NullableParamSubscriptionData,
  NullableParamSubscriptionVariables,
} from './schema';
import { setupSpies, setupStubs } from './helpers';

type SE<D, V> = HTMLElement & ApolloSubscriptionInterface<D, V>;

export interface SubscriptionElement<D = unknown, V = unknown> extends SE<D, V> {
  hasRendered(): Promise<SubscriptionElement<D, V>>;
  stringify(x: unknown): string;
}

export interface DescribeSubscriptionComponentOptions {
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
  setupFunction: SetupFunction<SubscriptionElement>;

  /**
   * Optional: the class which setup function uses to generate the component.
   * Only relevant to class-based libraries
   */
  class?: Constructor<SubscriptionElement>;
}

export function setupSubscriptionClass<T extends SubscriptionElement>(Klass: Constructor<T>): SetupFunction<T> {
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

export function describeSubscription(options: DescribeSubscriptionComponentOptions): void {
  const { setupFunction, class: Klass } = options;

  describe(`ApolloSubscription interface`, function() {
    describe('when simply instantiating', function() {
      let element: SubscriptionElement;

      let spies: Record<keyof typeof element, SinonSpy>;

      async function waitForRender() {
        await element.hasRendered();
      }

      beforeEach(async function setupElement() {
        ({ element, spies } = await setupFunction({
          spy: ['subscribe'],
        }));
      });

      afterEach(function teardownElement() {
        element?.remove?.();
        element = undefined;
      });

      afterEach(function restoreSpies() {
        for (const spy of Object.values(spies))
          spy.restore();
      });

      it('has default properties', function() {
        expect(element.data, 'data').to.be.null;
        expect(element.error, 'error').to.be.null;
        expect(element.loading, 'loading').to.be.false;
        expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
        expect(element.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange').to.be.false;
        expect(element.observable, 'observableQuery').to.be.undefined;
        expect(element.onError, 'onError').to.be.undefined;
        expect(element.onSubscriptionComplete, 'onSubscriptionComplete').to.be.undefined;
        expect(element.onSubscriptionData, 'onSubscriptionData').to.be.undefined;
        expect(element.pollInterval, 'pollInterval').to.be.undefined;
        expect(element.shouldResubscribe, 'shouldResubscribe').to.be.false;
        expect(element.skip, 'skip').to.be.false;
        expect(element.subscription, 'subscription').to.be.null;
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

        element.loading = true;
        expect(element.loading, 'loading').to.equal(true);

        element.loading = false;
        expect(element.loading, 'loading').to.equal(false);

        const subscription = gql`{ __schema { __typename } }`;
        element.subscription = subscription;
        expect(element.subscription, 'subscription').to.equal(subscription);

        element.subscription = null;
        expect(element.subscription, 'subscription').to.be.null;
      });

      describe('setting loading', function() {
        beforeEach(function setLoading() {
          element.loading = true;
        });

        beforeEach(waitForRender);

        it('renders loading', async function() {
          expect(element.shadowRoot.getElementById('loading').textContent)
            .to.equal(element.stringify(true));
        });
      });

      describe('setting NoParam subscription', function() {
        beforeEach(function setSubscription() {
          element.subscription = NoParamSubscription;
        });

        it('sets subscription property', function() {
          expect(element.subscription).to.equal(NoParamSubscription);
        });

        it('does not call subscribe', function() {
          expect(element.subscribe).to.not.have.been.called;
        });
      });

      describe('setting malformed subscription', function() {
        it('throws', function() {
          // @ts-expect-error: we're testing the error
          expect(() => element.subscription = `subscription { foo }`)
            .to.throw('Subscription must be a gql-parsed DocumentNode');
          expect(element.subscription).to.not.be.ok;
        });
      });
    });

    describe('with global client available', function() {
      let element: SubscriptionElement;

      let spies: Record<keyof typeof element, SinonSpy>;

      async function waitForRender() {
        await element.hasRendered();
      }

      beforeEach(setupClient);

      beforeEach(async function setupElement() {
        ({ element, spies } = await setupFunction({
          spy: ['subscribe'],
        }));
      });

      beforeEach(function spyClientSubscribe() {
        spies['client.subscribe'] = spy(element.client, 'subscribe');
      });

      afterEach(function restoreSpies() {
        for (const spy of Object.values(spies))
          spy.restore();
      });

      beforeEach(async function waitForRender() {
        await element.hasRendered();
      });

      afterEach(function teardownElement() {
        element?.remove?.();
        element = undefined;
      });

      afterEach(teardownClient);

      describe('setting NoParam subscription', function() {
        beforeEach(function setSubscription() {
          element.subscription = NoParamSubscription;
        });

        it('calls subscribe', function() {
          expect(element.subscribe).to.have.been.called;
        });

        it('creates an observable', function() {
          expect(element.client.subscribe).to.have.been.called;
        });

        describe('then setting NullableParam subscription', function() {
          beforeEach(function setNullableParamSubscription() {
            element.subscription = NullableParamSubscription;
          });

          beforeEach(waitForRender);

          it('renders second subscription', async function() {
            expect(element.shadowRoot.textContent).to.not.contain('messageSent');
            expect(element.shadowRoot.textContent).to.contain('nullable');
          });

          describe('then setting variables', function() {
            beforeEach(function() {
              element.variables = { nullable: 'quux' };
            });

            beforeEach(waitForRender);

            it('renders new variables', async function() {
              expect(element.shadowRoot.textContent).to.contain('quux');
            });
          });
        });
      });

      describe('setting NullableParam subscription', function() {
        beforeEach(function setSubscription() {
          element.subscription = NullableParamSubscription;
        });

        beforeEach(waitForRender);

        it('creates an observable', function() {
          expect(element.observable).to.be.an.instanceOf(Observable);
        });

        it('calls subscribe', function() {
          expect(element.subscribe).to.have.been.called;
        });

        it('renders data', function() {
          expect(element.shadowRoot.getElementById('data').textContent)
            .to.equal(element.stringify({
              nullableParam: {
                nullable: 'Hello World',
                __typename: 'Nullable',
              },
            }));
        });

        describe('then setting variables', function() {
          beforeEach(function setVariables() {
            element.variables = { nullable: 'qux' };
          });

          beforeEach(waitForRender);

          it('creates a new observable', function() {
            expect(element.client.subscribe).to.have.been.calledTwice;
          });

          it('renders the new data', function() {
            expect(element.shadowRoot.getElementById('data').textContent)
              .to.equal(element.stringify({
                nullableParam: {
                  nullable: 'qux',
                  __typename: 'Nullable',
                },
              }));
          });
        });

        describe('then setting variables that cause the subscription to error', function() {
          beforeEach(function setVariables() {
            element.variables = { nullable: 'error' };
          });

          it('renders error', function() {
            expect(element.shadowRoot.getElementById('error').textContent)
              .to.equal(element.stringify(element.error));
          });
        });

        describe('then setting null subscription', function() {
          beforeEach(function nullifySubscription() {
            element.subscription = null;
          });

          it('does not create a new observable', function() {
            expect(element.client.subscribe).to.not.have.been.calledTwice;
          });
        });

        describe('when shouldResubscribe is set', function() {
          beforeEach(function setShouldResubscribe() {
            element.shouldResubscribe = true;
          });

          describe('subscribe({ fetchPolicy, variables })', function() {
            const fetchPolicy = 'network-only';
            const variables = { nullable: 'bar' };

            beforeEach(function() {
              element.subscribe({ variables, fetchPolicy });
            });

            it('calls client subscribe with element subscription', function() {
              const { subscription: query } = element;
              expect(element.client.subscribe).to.have.been.calledWithMatch({ query });
            });

            it('calls client subscribe with specified FetchPolicy', function() {
              expect(element.client.subscribe).to.have.been.calledWithMatch({ fetchPolicy });
            });

            it('calls client subscribe with element variables', function() {
              expect(element.client.subscribe).to.have.been.calledWithMatch({ variables });
            });
          });

          describe('subscribe({ subscription, fetchPolicy })', function() {
            const fetchPolicy = 'cache-only';

            const subscription = NoParamSubscription;

            beforeEach(function setVariables() {
              element.variables = { null: null };
            });

            beforeEach(function() {
              element.subscribe({ subscription, fetchPolicy });
            });

            it('calls client subscribe with specified subscription', function() {
              expect(element.client.subscribe).to.have.been.calledWithMatch({
                query: subscription,
              });
            });

            it('calls client subscribe with specified FetchPolicy', function() {
              expect(element.client.subscribe).to.have.been.calledWithMatch({ fetchPolicy });
            });

            it('calls client subscribe with element variables', function() {
              const { variables } = element;
              expect(element.client.subscribe).to.have.been.calledWithMatch({ variables });
            });
          });

          describe('subscribe({ subscription, variables })', function() {
            const subscription = NonNullableParamSubscription;

            const variables = { nonNull: 'bar' };

            beforeEach(function() {
              element.subscribe({ subscription, variables });
            });

            it('calls client subscribe with specified subscription', function() {
              expect(element.client.subscribe).to.have.been.calledWithMatch({
                query: subscription,
              });
            });

            it('calls client subscribe with element FetchPolicy', function() {
              const { fetchPolicy } = element;
              expect(element.client.subscribe).to.have.been.calledWithMatch({ fetchPolicy });
            });

            it('calls client subscribe with specified variables', function() {
              expect(element.client.subscribe).to.have.been.calledWithMatch({ variables });
            });
          });
        });
      });

      describe('setting malformed subscription', function() {
        let result;

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
          expect(element.subscribe).to.not.have.been.called;
        });

        it('does not set subscription', function() {
          expect(element.subscription).to.not.be.ok;
        });

        it('sets error', function() {
          expect(element.error).to.be.null;
        });
      });

      describe('with NoParam subscription script child', function() {
        let element: SubscriptionElement<NoParamSubscriptionData, NoParamSubscriptionVariables>;

        let spies: Record<keyof typeof element, SinonSpy>;

        async function waitForRender() {
          await element.hasRendered();
        }

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            spy: ['subscribe'],
          }));
        });

        afterEach(function restoreSpies() {
          for (const spy of Object.values(spies))
            spy.restore();
        });

        beforeEach(async function waitForRender() {
          await element.hasRendered();
        });

        afterEach(function teardownElement() {
          element?.remove?.();
          element = undefined;
        });

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            spy: ['subscribe'],
            innerHTML: `
              <script type="application/graphql">${NoParamSubscription.loc.source.body}</script>
            `,
          }));
        });

        beforeEach(waitForRender);

        it('does not remove the script', function() {
          expect(element.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
        });

        it('sets the subscription property', function() {
          expect(element.subscription).to.deep.equal(gql(NoParamSubscription.loc.source.body));
        });

        it('calls subscribe()', async function scriptChild() {
          expect(element.subscribe).to.have.been.called;
        });
      });
    });
  });

  if (Klass) {
    describe('ApolloQuery subclasses', function() {
      describe('with global client available', function() {
        beforeEach(setupClient);
        afterEach(teardownClient);

        describe('with subscription set as a class field', function() {
          let element: SubscriptionElement;

          beforeEach(async function() {
            class Test extends Klass {
              subscription = NoParamSubscription;
            }

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          it('caches subscription property', function() {
            expect(element.subscription, 'subscription').to.equal(NoParamSubscription);
          });
        });

        describe('with noAutoSubscribe set as a class field', function() {
          let element: SubscriptionElement;

          let spies: Partial<Record<string|keyof typeof element, SinonSpy>>;

          async function waitForRender() {
            await element.hasRendered();
          }

          beforeEach(function spyClientSubscribe() {
            spies = {
              'client.subscribe': spy(window.__APOLLO_CLIENT__, 'subscribe'),
            };
          });

          afterEach(function teardownElement() {
            element?.remove?.();
            element = undefined;
          });

          afterEach(function restoreSpies() {
            for (const spy of Object.values(spies))
              spy.restore();
          });

          beforeEach(async function() {
            type D = NullableParamSubscriptionData;
            type V = NullableParamSubscriptionVariables;
            class Test extends (Klass as Constructor<SubscriptionElement<D, V>>) {
              subscription = NullableParamSubscription;

              noAutoSubscribe = true;
            }

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          it('does not subscribe on connect', function() {
            expect(element.client.subscribe).to.not.have.been.called;
          });
        });

        describe('with fetchPolicy set as a class field', function() {
          let element: SubscriptionElement;

          let spies: Partial<Record<string|keyof typeof element, SinonSpy>>;

          async function waitForRender() {
            await element.hasRendered();
          }

          beforeEach(function spyClientSubscribe() {
            spies = {
              'client.subscribe': spy(window.__APOLLO_CLIENT__, 'subscribe'),
            };
          });

          afterEach(function teardownElement() {
            element?.remove?.();
            element = undefined;
          });

          afterEach(function restoreSpies() {
            for (const spy of Object.values(spies))
              spy.restore();
          });

          beforeEach(async function() {
            type D = NullableParamSubscriptionData;
            type V = NullableParamSubscriptionVariables;
            class Test extends (Klass as Constructor<SubscriptionElement<D, V>>) {
              subscription = NullableParamSubscription;

              variables = { nullable: 'quux' };

              fetchPolicy = 'cache-only' as const;
            }

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          it('subscribes with the given FetchPolicy', function() {
            expect(element.client.subscribe).to.have.been
              .calledWithMatch({ fetchPolicy: 'cache-only' });
          });
        });

        describe('with onError and onSubscriptionData set as class methods', function() {
          let element: SubscriptionElement;

          let spies: Partial<Record<string|keyof typeof element, SinonSpy>>;

          async function waitForRender() {
            await element.hasRendered();
          }

          beforeEach(function spyClientSubscribe() {
            spies = {
              'client.subscribe': spy(window.__APOLLO_CLIENT__, 'subscribe'),
            };
          });

          afterEach(function teardownElement() {
            element?.remove?.();
            element = undefined;
          });

          afterEach(function restoreSpies() {
            for (const spy of Object.values(spies))
              spy.restore();
          });

          beforeEach(async function() {
            type D = NullableParamSubscriptionData;
            type V = NullableParamSubscriptionVariables;
            class Test extends (Klass as Constructor<SubscriptionElement<D, V>>) {
              subscription = NonNullableParamSubscription;

              noAutoSubscribe = true;

              onSubscriptionData(x) { x; }

              onError(x) { x; }
            }

            spies['onSubscriptionData'] = spy(Test.prototype, 'onSubscriptionData');
            spies['onError'] = spy(Test.prototype, 'onError');

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          describe('with subscription that will resolve', function() {
            beforeEach(function setVariables() {
              element.variables = { nonNull: 'hola' };
            });

            beforeEach(function subscribe() {
              element.subscribe();
            });

            it('sets loading', function() {
              expect(element.loading).to.be.true;
            });

            describe('when subscription resolves', function() {
              beforeEach(waitForRender);

              it('calls onSubscriptionData', function() {
                expect(element.onSubscriptionData).to.have.been.called;
              });

              it('does not call onError', function() {
                expect(element.onError).to.not.have.been.called;
              });
            });
          });

          describe('with subscription that should error', function() {
            beforeEach(function setVariablesToError() {
              element.variables = { nonNull: 'error' };
            });

            beforeEach(function subscribe() {
              element.subscribe();
            });

            describe('when subscription rejects', function() {
              beforeEach(waitForRender);

              it('does not call onSubscriptionData', function() {
                expect(element.onSubscriptionData).to.not.have.been.called;
              });

              it('calls onError', function() {
                expect(element.onError).to.have.been.called;
              });
            });
          });
        });
      });
    });
  }
}
