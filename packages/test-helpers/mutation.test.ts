import { SetupFunction, SetupOptions, SetupResult } from './types';

import {
  expect,
  defineCE,
  fixture,
} from '@open-wc/testing';

import type { Constructor } from '@apollo-elements/interfaces/constructor';
import type { ApolloError } from '@apollo/client/core';
import type {
  NoParamMutationData,
  NoParamMutationVariables,
  NullableParamMutationData,
  NullableParamMutationVariables,
} from './schema';

import { match, spy, SinonSpy } from 'sinon';

import { makeClient, setupClient } from './client';
import { ApolloMutationInterface } from '@apollo-elements/interfaces';

import NoParamMutation from './graphql/NoParam.mutation.graphql';
import NullableParamMutation from './graphql/NullableParam.mutation.graphql';
import gql from 'graphql-tag';
import { restoreSpies, setupSpies, setupStubs, waitForRender } from './helpers';

type ME<D, V> = HTMLElement & ApolloMutationInterface<D, V>;
export interface MutationElement<D = unknown, V = unknown> extends ME<D, V> {
  hasRendered(): Promise<MutationElement<D, V>>;
  stringify(x: unknown): string;
}

export interface DescribeMutationComponentOptions {
  /**
   * Async function which returns an instance of the query element
   * The element must render a template which contains the following DOM structure
   * ```html
   * <output id="called"></output>
   * <output id="data"></output>
   * <output id="error"></output>
   * <output id="errors"></output>
   * <output id="loading"></output>
   * ```
   * On updates, each `<output>`'s text content should be
   * set to the `JSON.stringified` representation of it's associated value,
   * with 2 spaces as tabs.
   * The element must also implement a `stringify` method to perform that stringification,
   * as well as a `hasRendered` method which returns a promise that resolves when the element is finished rendering
   */
  setupFunction: SetupFunction<MutationElement>;

  /**
   * Optional: the class which setup function uses to generate the component.
   * Only relevant to class-based libraries
   */
  class?: Constructor<MutationElement>;
}

export function setupMutationClass<T extends MutationElement>(Klass: Constructor<T>): SetupFunction<T> {
  return async function setupElement<B extends T>(opts?: SetupOptions<B>): Promise<SetupResult<B>> {
    // @ts-expect-error: no time for this
    class Test extends Klass {}

    const { innerHTML = '', attributes, properties } = opts ?? {};

    // for mutation components, which don't fetch on connect,
    // and have optional instance callbacks,
    // we must ensure spies are created *after* properties are applied
    if (properties?.onCompleted)
      Test.prototype.onCompleted = properties.onCompleted;

    if (properties?.onError)
      Test.prototype.onError = properties.onError;

    const tag =
      defineCE(Test);

    const attrs = attributes ? ` ${attributes}` : '';

    const element =
      await fixture<B>(`<${tag}${attrs}>${innerHTML}</${tag}>`);

    const spies = setupSpies(opts?.spy, Test.prototype as B);
    const stubs = setupStubs(opts?.stub, Test.prototype as B);

    for (const [key, val] of Object.entries(properties ?? {}))
      key !== 'onCompleted' && key !== 'onError' && (element[key] = val);

    return { element, spies, stubs };
  };
}

export function describeMutation(options: DescribeMutationComponentOptions): void {
  const { setupFunction, class: Klass } = options;
  describe(`ApolloMutation interface`, function() {
    describe('when simply instantiating', function() {
      let element: MutationElement;

      beforeEach(async function setupElement() {
        ({ element } = await setupFunction());
      });

      it('has default properties', function() {
        expect(element.awaitRefetchQueries, 'awaitRefetchQueries').to.be.undefined;
        expect(element.called, 'called').to.be.false;
        expect(element.client, 'client').to.be.null;
        expect(element.data, 'data').to.be.null;
        expect(element.errorPolicy, 'errorPolicy').to.be.undefined;
        expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
        expect(element.ignoreResults, 'ignoreResults').to.be.false;
        expect(element.mostRecentMutationId, 'mostRecentMutationId').to.equal(0);
        expect(element.mutation, 'mutation').to.be.null;
        expect(element.onCompleted, 'onCompleted').to.be.undefined;
        expect(element.onError, 'onError').to.be.undefined;
        expect(element.optimisticResponse, 'optimisticResponse').to.be.null;
        expect(element.refetchQueries, 'refetchQueries').to.be.null;
        expect(element.updater, 'updater').to.be.undefined;
        expect(element.variables, 'variables').to.be.null;
      });

      it('caches observed properties', function() {
        const client = makeClient();
        element.client = client;
        expect(element.client, 'client').to.equal(client);

        element.client = null;
        expect(element.client, 'client').to.be.null;

        element.called = true;
        expect(element.called, 'called').to.be.true;

        element.called = false;
        expect(element.called, 'called').to.be.false;

        const data = { data: 'data' };
        element.data = data;
        expect(element.data, 'data').to.equal(data);

        element.data = null;
        expect(element.data, 'data').to.be.null;

        const err = new Error('error');

        element.error = err;
        expect(element.error, 'error').to.equal(err);

        element.error = null;
        expect(element.error, 'error').to.be.null;

        element.loading = true;
        expect(element.loading, 'loading').to.be.true;

        element.loading = false;
        expect(element.loading, 'loading').to.be.false;
      });

      describe('setting called', function() {
        beforeEach(function setCalled() {
          element.called = !element.called;
        });

        beforeEach(waitForRender(() => element));

        it('renders', function() {
          expect(element.shadowRoot.getElementById('called').textContent).to.equal('true');
        });
      });

      describe('with NoParam mutation script child', function() {
        let element: MutationElement<NoParamMutationData, NoParamMutationVariables>;

        beforeEach(async function setupElement() {
          ({ element } = await setupFunction({
            innerHTML: `<script type="application/graphql">${NoParamMutation.loc.source.body}</script>`,
          }));
        });

        it('does not remove the script', function() {
          expect(element.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
        });

        it('sets the mutation property', function() {
          expect(element.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
          expect(element.mutation).to.deep.equal(gql(NoParamMutation.loc.source.body));
        });
      });

      describe('setting mutation with NoParam mutation', function() {
        beforeEach(function setMutation() {
          element.mutation = NoParamMutation;
        });

        it('sets mutation', function() {
          expect(element.mutation).to.equal(NoParamMutation);
        });
      });

      describe('setting mutation with a malformed mutation', function() {
        it('throws an error', async function badMutation() {
          // @ts-expect-error: i'm testing the error handler
          expect(() => element.mutation = 'foo').to
            .throw('Mutation must be a gql-parsed DocumentNode');
          expect(element.mutation).to.not.be.ok;
        });
      });
    });

    describe('with global client available', function() {
      let cached = window.__APOLLO_CLIENT__;

      const mockClient = makeClient();

      beforeEach(function setGlobalClient() {
        cached = window.__APOLLO_CLIENT__;
        window.__APOLLO_CLIENT__ = mockClient;
      });

      afterEach(function unsetGlobalClient() {
        window.__APOLLO_CLIENT__ = cached;
      });

      describe('when simply instantiating', function() {
        let element: MutationElement;

        let spies: Record<keyof typeof element, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            spy: ['mutate'],
          }));
        });

        afterEach(restoreSpies(() => spies));

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        describe('when simply instantiating', function() {
          it('uses global client', function() {
            expect(element.client).to.equal(mockClient);
          });
        });
      });

      describe('with NoParam mutation property set', function() {
        let element: MutationElement<NoParamMutationData, NoParamMutationVariables>;

        let spies: Record<keyof typeof element, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction<typeof element>({
            spy: ['onCompleted', 'onError'],
            properties: {
              mutation: NoParamMutation,
              onCompleted: () => void null,
              onError: () => void null,
            },
          }));
        });

        beforeEach(function spyClientMutate() {
          spies['client.mutate'] = spy(element.client, 'mutate');
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        afterEach(restoreSpies(() => spies));

        it('sets the mutation property', function() {
          expect(element.mutation).to.equal(NoParamMutation);
        });

        describe('with context property set', function() {
          beforeEach(function setContext() {
            element.context = { the: 'context' };
          });

          beforeEach(function callMutate() {
            element.mutate();
          });

          it('uses element\'s context', function() {
            expect(element.client.mutate).to.have.been
              .calledWithMatch(match({ context: { the: 'context' } }));
          });
        });

        describe('mutate()', function() {
          beforeEach(function callMutate() {
            element.mutate();
          });

          it('calls client.mutate with element props', function() {
            expect(element.client.mutate).to.have.been.calledWithMatch({
              mutation: element.mutation,
              variables: element.variables,
              update: element.updater,
            });
          });

          it('sets mostRecentMutationId', function() {
            expect(element.mostRecentMutationId).to.equal(1);
          });

          describe('then calling again', function() {
            beforeEach(function callMutate() {
              element.mutate();
            });

            it('sets mostRecentMutationId', function() {
              expect(element.mostRecentMutationId).to.equal(2);
            });
          });
        });

        describe('mutate({})', function() {
          beforeEach(function callMutate() {
            element.mutate({});
          });

          it('defaults to element\'s mutation', function() {
            const { mutation } = element;
            expect(element.client.mutate).to.have.been.calledWith(match({ mutation }));
          });
        });

        describe('mutate({ optimisticResponse, variables, update })', function() {
          const optimisticResponse = { noParam: { noParam: null } };
          const variables = {};
          const update = (): void => { null; };

          beforeEach(function callMutate() {
            element.mutate({ optimisticResponse, variables, update });
          });

          it('uses element\'s mutation', function() {
            expect(element.client.mutate).to.have.been
              .calledWithMatch(match({ mutation: element.mutation }));
          });
        });

        describe('mutate({ mutation, variables, update })', function() {
          const mutation = NullableParamMutation;
          const variables = {};
          const update = (): void => { null; };

          beforeEach(function callMutate() {
            element.mutate({ mutation, variables, update });
          });

          it('uses element\'s optimisticResponse', function() {
            expect(element.client.mutate).to.have.been
              .calledWithMatch(match({ optimisticResponse: element.optimisticResponse }));
          });
        });

        describe('mutate({ mutation, optimisticResponse, variables })', function() {
          const optimisticResponse = { noParam: { noParam: null } };
          const mutation = NullableParamMutation;
          const variables = {};

          beforeEach(function callMutate() {
            element.mutate({ mutation, optimisticResponse, variables });
          });

          it('uses element\'s updater', function() {
            expect(element.client.mutate).to.have.been
              .calledWithMatch(match({ update: element.updater }));
          });
        });

        describe('mutate({ mutation, optimisticResponse, update })', function() {
          const optimisticResponse = { noParam: { noParam: null } };
          const mutation = NullableParamMutation;
          const update = (): void => { null; };

          beforeEach(function callMutate() {
            element.mutate({ mutation, optimisticResponse, update });
          });

          it('uses element\'s variables', function() {
            expect(element.client.mutate).to.have.been
              .calledWithMatch(match({ variables: element.variables }));
          });
        });
      });

      describe('with NullableParam mutation property set', function() {
        let element: MutationElement<NullableParamMutationData, NullableParamMutationVariables>;

        let spies: Record<keyof typeof element, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction<typeof element>({
            spy: ['onCompleted', 'onError'],
            properties: {
              mutation: NullableParamMutation,
              onCompleted: () => void null,
              onError: () => void null,
            },
          }));
        });

        beforeEach(function spyClientMutate() {
          spies['client.mutate'] = spy(element.client, 'mutate');
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined;
        });

        afterEach(restoreSpies(() => spies));

        describe('when mutation resolves', function() {
          beforeEach(async function callMutate() {
            await element.mutate();
          });

          beforeEach(waitForRender(() => element));

          it('calls onCompleted with data', function() {
            expect(element.onCompleted).to.have.been
              .calledWithMatch({ nullableParam: match({ nullable: 'Hello World' }) });
          });

          it('sets loading', async function() {
            const p = element.mutate();
            expect(element.loading).to.be.true;
            await p;
            expect(element.loading).to.be.false;
          });

          it('sets data', function() {
            expect(element.data).to.deep.equal({
              nullableParam: {
                nullable: 'Hello World',
                __typename: 'Nullable',
              },
            });
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

          it('sets error', function() {
            expect(element.error).to.be.null;
          });

          it('sets errors', function() {
            expect(element.errors).to.be.null;
          });
        });

        describe('when mutation rejects', function() {
          let error: ApolloError;

          beforeEach(function setVariablesToError() {
            element.variables = { nullable: 'error' };
          });

          beforeEach(async function catchMutateError() {
            try {
              await element.mutate();
              expect.fail('no error');
            } catch (e) {
              error = e;
            }
          });

          beforeEach(waitForRender(() => element));

          it('calls onError with error', function() {
            expect(element.onError).to.have.been.calledWithMatch(error);
          });

          it('sets data, error, errors, and loading', function() {
            expect(element.data).to.be.null;
            expect(element.error).to.equal(error);
            expect(element.errors).to.be.null;
            expect(element.loading).to.be.false;
          });

          it('renders error', function() {
            expect(element.shadowRoot.getElementById('error').textContent)
              .to.equal(element.stringify(error));
          });
        });
      });
    });

    if (Klass) {
      describe('ApolloMutation subclasses', function() {
        describe('with NullableParam mutation in class field', function() {
          let element: MutationElement<NullableParamMutationData, NullableParamMutationVariables>;

          let spies: Record<keyof typeof element | string, SinonSpy>;

          beforeEach(setupClient);

          beforeEach(async function setupElement() {
            class Test extends (Klass as Constructor<typeof element>) {
              mutation = NullableParamMutation;
            }

            const tag = defineCE(Test);

            element = await fixture<Test>(`<${tag}></${tag}>`);
          });

          it('sets the mutation property', function() {
            expect(element.mutation).to.equal(NullableParamMutation);
          });

          describe('with mutation, onCompleted, and onError defined as class methods', function() {
            beforeEach(async function() {
              class Test extends (Klass as Constructor<typeof element>) {
                mutation = NullableParamMutation;

                onError() { null; }

                onCompleted() { null; }
              }

              const tag = defineCE(Test);

              element = await fixture<Test>(`<${tag}></${tag}>`);
            });

            beforeEach(function spyMethods() {
              spies = {
                onError: spy(element, 'onError'),
                onCompleted: spy(element, 'onCompleted'),
                ['client.mutate']: spy(element.client, 'mutate'),
              };
            });

            afterEach(restoreSpies(() => spies));

            afterEach(function teardownElement() {
              element.remove();
              element = undefined;
            });

            it('sets the mutation property', function() {
              expect(element.mutation).to.equal(NullableParamMutation);
            });

            describe('when mutation resolves', function() {
              beforeEach(async function callMutate() {
                await element.mutate();
              });

              it('calls onCompleted with data', function() {
                expect(element.onCompleted).to.have.been
                  .calledWithMatch({ nullableParam: match({ nullable: 'Hello World' }) });
              });

              it('sets loading', async function() {
                const p = element.mutate();
                expect(element.loading).to.be.true;
                await p;
                expect(element.loading).to.be.false;
              });

              it('sets data', function() {
                expect(element.data).to.deep.equal({
                  nullableParam: {
                    __typename: 'Nullable',
                    nullable: 'Hello World',
                  },
                });
              });

              it('sets error', function() {
                expect(element.error).to.be.null;
              });
            });

            describe('when mutation rejects', function() {
              let error: ApolloError;

              beforeEach(function setVariablesToError() {
                element.variables = { nullable: 'error' };
              });

              beforeEach(async function catchMutateError() {
                try {
                  await element.mutate();
                  expect.fail('no error');
                } catch (e) {
                  error = e;
                }
              });

              it('calls onError with error', function() {
                expect(element.onError).to.have.been.calledWithMatch(error);
              });

              it('sets data, error, loading', function() {
                expect(element.data).to.be.null;
                expect(element.error).to.equal(error);
                expect(element.loading).to.be.false;
              });
            });
          });

          describe('with `updater` defined as a class method', function() {
            let element: MutationElement<NoParamMutationData, NoParamMutationVariables>;

            beforeEach(async function setupElement() {
              class Test extends (Klass as Constructor<typeof element>) {
                mutation = NoParamMutation;

                updater(): void { '💩'; }
              }

              const tag = defineCE(Test);

              element = await fixture<Test>(`<${tag}></${tag}>`);
            });

            beforeEach(function spyMethods() {
              spies = {
                ['client.mutate']: spy(element.client, 'mutate'),
              };
            });

            describe('mutate()', function() {
              beforeEach(async function callMutate() {
                await element.mutate();
              });

              it(`uses element's updater method for mutation's \`update\` option by default`, function() {
                const update = element.updater;
                expect(element.client.mutate).to.have.been.calledWith(match({ update }));
              });
            });

            describe('mutate({ update })', function() {
              const update = () => void null;

              beforeEach(async function callMutate() {
                await element.mutate({ update });
              });

              it('allows passing custom update function', function() {
                expect(element.client.mutate).to.have.been.calledWith(match({ update }));
              });
            });
          });
        });
      });
    }
  });
}
