import { SetupFunction } from './types';

import {
  expect,
  defineCE,
  fixture,
} from '@open-wc/testing';

import type { ApolloMutationElement, Constructor, RefetchQueriesType } from '@apollo-elements/interfaces';
import type { ApolloError, OperationVariables } from '@apollo/client/core';
import type {
  NoParamMutationData,
  NoParamMutationVariables,
  NullableParamMutationData,
  NullableParamMutationVariables,
} from './schema';

import { match, spy, SinonSpy } from 'sinon';

import { makeClient, setupClient } from './client';

import NoParamMutation from './graphql/NoParam.mutation.graphql';
import NullableParamMutation from './graphql/NullableParam.mutation.graphql';

import { restoreSpies, waitForRender } from './helpers';

export interface MutationElement<D = unknown, V = OperationVariables> extends ApolloMutationElement<D, V> {
  refetchQueries: RefetchQueriesType<D> | null;
  shadowRoot: ShadowRoot;
  hasRendered(): Promise<this>;
  stringify(x: unknown): string;
}

export interface DescribeMutationComponentOptions<E extends MutationElement = MutationElement<any, any>> {
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
  setupFunction: SetupFunction<E>;

  /**
   * Optional: the class which setup function uses to generate the component.
   * Only relevant to class-based libraries
   */
  class?: Constructor<E>;
}

export { setupMutationClass } from './helpers';

export function describeMutation(options: DescribeMutationComponentOptions): void {
  const { setupFunction, class: Klass } = options;
  describe(`ApolloMutation interface`, function() {
    describe('when simply instantiating', function() {
      let element: MutationElement;

      beforeEach(async function setupElement() {
        ({ element } = await setupFunction());
      });

      it('has default properties', function() {
        // nullable fields
        expect(element.client, 'client').to.be.null;
        expect(element.data, 'data').to.be.null;
        expect(element.mutation, 'mutation').to.be.null;
        expect(element.refetchQueries, 'refetchQueries').to.be.null;
        expect(element.variables, 'variables').to.be.null;

        // defined fields
        expect(element.called, 'called').to.be.false;
        expect(element.ignoreResults, 'ignoreResults').to.be.false;
        // @ts-expect-error: tsk tsk testing private properties
        expect(element.mostRecentMutationId, 'mostRecentMutationId').to.equal(0);

        // optional fields
        expect(element.awaitRefetchQueries, 'awaitRefetchQueries').to.be.undefined;
        expect(element.errorPolicy, 'errorPolicy').to.be.undefined;
        expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
        expect(element.onCompleted, 'onCompleted').to.be.undefined;
        expect(element.onError, 'onError').to.be.undefined;
        expect(element.optimisticResponse, 'optimisticResponse').to.be.undefined;
        expect(element.updater, 'updater').to.be.undefined;
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

        try {
          element.error = new Error('error');
          expect(element.error.message, 'error').to.equal('error');
        } catch { null; }

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
          expect(element.shadowRoot.getElementById('called')!.textContent).to.equal('true');
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

    // hybrids and haunted don't play nice with custom attributes
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    if (!this.parent?.title.match(/^\[(haunted|hybrids)\]/)) {
      describe('with await-refetch-queries attribute', function() {
        let element: MutationElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'await-refetch-queries' }));
        });

        it('sets awaitRefetchQueries property', function() {
          expect(element.awaitRefetchQueries).to.be.true;
        });
      });

      describe('with refetch-queries="A"', function() {
        let element: MutationElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'refetch-queries="A"' }));
        });

        it('sets refetchQueries property', function() {
          expect(element.refetchQueries).to.deep.equal(['A']);
        });

        describe('changing the attribute', function() {
          beforeEach(function() {
            element.setAttribute('refetch-queries', 'B');
          });
          it('changes the property', function() {
            expect(element.refetchQueries).to.deep.equal(['B']);
          });
        });

        describe('unsetting the attribute', function() {
          beforeEach(function() {
            element.removeAttribute('refetch-queries');
          });
          it('unsets the property', function() {
            expect(element.refetchQueries).to.be.null;
          });
        });
      });

      describe('with fetch-policy="no-cache"', function() {
        let element: MutationElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'fetch-policy="no-cache"' }));
        });

        it('sets fetchPolicy property', function() {
          expect(element.fetchPolicy).to.equal('no-cache');
        });
      });

      describe('with refetch-queries="A,   B, C  "', function() {
        let element: MutationElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'refetch-queries="A,   B, C  "' }));
        });

        it('sets refetchQueries property', function() {
          expect(element.refetchQueries).to.deep.equal(['A', 'B', 'C']);
        });
      });
    }

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

        let spies: Record<string | keyof MutationElement, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            spy: ['mutate'],
          }));
        });

        afterEach(restoreSpies(() => spies));

        afterEach(function teardownElement() {
          element?.remove();
          // @ts-expect-error: reset the fixture
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

        let spies: Record<string|keyof MutationElement, SinonSpy>;

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
          spies!['client.mutate'] = spy(element.client!, 'mutate');
        });

        afterEach(function teardownElement() {
          element.remove();
          // @ts-expect-error: reset the fixture
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
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ context: { the: 'context' } }));
          });
        });

        describe('with optimisticResponse property set as object', function() {
          const optimisticResponse = { noParam: { noParam: 'instance' } };
          beforeEach(function() {
            element.optimisticResponse = optimisticResponse;
          });

          beforeEach(function callMutate() {
            element.mutate();
          });

          it('uses element\'s optimisticResponse', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ optimisticResponse }));
          });

          describe('specifying optimisticResponse', function() {
            const optimisticResponse = { noParam: { noParam: 'specific' } };
            beforeEach(function callMutate() {
              element.mutate({ optimisticResponse });
            });

            it('uses specific optimisticResponse', function() {
              expect(element.client!.mutate).to.have.been
                .calledWithMatch(match({ optimisticResponse }));
            });
          });
        });

        describe('with refetchQueries property set as string[]', function() {
          const refetchQueries = ['A'];
          beforeEach(function() {
            element.refetchQueries = refetchQueries;
          });

          beforeEach(function callMutate() {
            element.mutate();
          });

          it('uses element\'s refetchQueries', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ refetchQueries }));
          });

          describe('specifying refetchQueries', function() {
            const refetchQueries = ['B'];
            beforeEach(function callMutate() {
              element.mutate({ refetchQueries });
            });

            it('uses specific refetchQueries', function() {
              expect(element.client!.mutate).to.have.been
                .calledWithMatch(match({ refetchQueries }));
            });
          });
        });

        describe('with awaitRefetchQueries property set', function() {
          beforeEach(function() {
            element.awaitRefetchQueries = true;
          });

          beforeEach(function callMutate() {
            element.mutate();
          });

          it('uses element\'s awaitRefetchQueries', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ awaitRefetchQueries: true }));
          });

          describe('specifying awaitRefetchQueries', function() {
            beforeEach(function callMutate() {
              element.mutate({ awaitRefetchQueries: false });
            });

            it('uses specific refetchQueries', function() {
              expect(element.client!.mutate).to.have.been
                .calledWithMatch(match({ awaitRefetchQueries: false }));
            });
          });
        });

        describe('with context property set', function() {
          const context = {};
          beforeEach(function() {
            element.context = context;
          });

          beforeEach(function callMutate() {
            element.mutate();
          });

          it('uses element\'s context', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ context }));
          });

          describe('specifying context', function() {
            const context = { a: 'b' };
            beforeEach(function callMutate() {
              element.mutate({ context });
            });

            it('uses specific context', function() {
              expect(element.client!.mutate).to.have.been
                .calledWithMatch(match({ context }));
            });
          });
        });

        describe('with errorPolicy property set', function() {
          const errorPolicy = 'all';
          beforeEach(function() {
            element.errorPolicy = errorPolicy;
          });

          beforeEach(function callMutate() {
            element.mutate();
          });

          it('uses element\'s errorPolicy', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ errorPolicy }));
          });

          describe('specifying errorPolicy', function() {
            const errorPolicy = 'ignore';
            beforeEach(function callMutate() {
              element.mutate({ errorPolicy });
            });

            it('uses specific errorPolicy', function() {
              expect(element.client!.mutate).to.have.been
                .calledWithMatch(match({ errorPolicy }));
            });
          });
        });

        describe('with fetchPolicy property set', function() {
          const fetchPolicy = 'no-cache';
          beforeEach(function() {
            element.fetchPolicy = fetchPolicy;
          });

          beforeEach(function callMutate() {
            element.mutate();
          });

          it('uses element\'s fetchPolicy', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ fetchPolicy }));
          });

          describe('specifying fetchPolicy', function() {
            beforeEach(function callMutate() {
              element.fetchPolicy = undefined;
              element.mutate({ fetchPolicy });
            });

            it('uses specific fetchPolicy', function() {
              expect(element.client!.mutate).to.have.been
                .calledWithMatch(match({ fetchPolicy }));
            });
          });
        });

        describe('mutate()', function() {
          beforeEach(function callMutate() {
            element.mutate();
          });

          it('calls client.mutate with element props', function() {
            expect(element.client!.mutate).to.have.been.calledWithMatch({
              awaitRefetchQueries: element.awaitRefetchQueries,
              context: element.context,
              errorPolicy: element.errorPolicy,
              fetchPolicy: element.fetchPolicy,
              mutation: element.mutation,
              optimisticResponse: element.optimisticResponse,
              refetchQueries: element.refetchQueries ?? undefined,
              update: element.updater,
              variables: element.variables ?? undefined,
            });
          });

          it('sets mostRecentMutationId', function() {
            // @ts-expect-error: tsk tsk testing private properties
            expect(element.mostRecentMutationId).to.equal(1);
          });

          describe('then calling again', function() {
            beforeEach(function callMutate() {
              element.mutate();
            });

            it('sets mostRecentMutationId', function() {
              // @ts-expect-error: tsk tsk testing private properties
              expect(element.mostRecentMutationId).to.equal(2);
            });
          });
        });

        describe('mutate({})', function() {
          beforeEach(function callMutate() {
            element.mutate({});
          });

          it('defaults to element\'s mutation', function() {
            expect(element.client!.mutate).to.have.been.calledWithMatch({
              awaitRefetchQueries: element.awaitRefetchQueries,
              context: element.context,
              errorPolicy: element.errorPolicy,
              fetchPolicy: element.fetchPolicy,
              mutation: element.mutation,
              optimisticResponse: element.optimisticResponse,
              refetchQueries: element.refetchQueries ?? undefined,
              update: element.updater,
              variables: element.variables ?? undefined,
            });
          });
        });

        describe('mutate({ refetchQueries })', function() {
          const refetchQueries = ['B'];
          beforeEach(function callMutate() {
            element.mutate({ refetchQueries });
          });

          it('uses specific refetchQueries', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ refetchQueries }));
          });
        });

        describe('mutate({ errorPolicy })', function() {
          const errorPolicy = 'none';
          beforeEach(function callMutate() {
            element.mutate({ errorPolicy });
          });

          it('uses specific errorPolicy', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ errorPolicy }));
          });
        });

        describe('mutate({ fetchPolicy })', function() {
          const fetchPolicy = 'no-cache';
          beforeEach(function callMutate() {
            element.mutate({ fetchPolicy });
          });

          it('uses specific fetchPolicy', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ fetchPolicy }));
          });
        });

        describe('mutate({ context })', function() {
          const context = { a: 'a' };
          beforeEach(function callMutate() {
            element.mutate({ context });
          });

          it('uses specific context', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ context }));
          });
        });

        describe('mutate({ awaitRefetchQueries })', function() {
          const awaitRefetchQueries = true;
          beforeEach(function callMutate() {
            element.mutate({ awaitRefetchQueries });
          });

          it('uses specific awaitRefetchQueries', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch(match({ awaitRefetchQueries }));
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
            expect(element.client!.mutate).to.have.been
              .calledWithMatch({
                awaitRefetchQueries: element.awaitRefetchQueries,
                context: element.context,
                errorPolicy: element.errorPolicy,
                fetchPolicy: element.fetchPolicy,
                mutation: element.mutation,
                refetchQueries: element.refetchQueries ?? undefined,

                update,
                optimisticResponse,
                variables,
              });
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
            expect(element.client!.mutate).to.have.been
              .calledWithMatch({
                awaitRefetchQueries: element.awaitRefetchQueries,
                context: element.context,
                errorPolicy: element.errorPolicy,
                fetchPolicy: element.fetchPolicy,
                optimisticResponse: element.optimisticResponse,
                refetchQueries: element.refetchQueries ?? undefined,

                mutation,
                update,
                variables,
              });
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
            expect(element.client!.mutate).to.have.been
              .calledWithMatch({
                awaitRefetchQueries: element.awaitRefetchQueries,
                context: element.context,
                errorPolicy: element.errorPolicy,
                fetchPolicy: element.fetchPolicy,
                refetchQueries: element.refetchQueries ?? undefined,
                update: element.updater,

                mutation,
                optimisticResponse,
                variables,
              });
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
            expect(element.client!.mutate).to.have.been
              .calledWithMatch({
                awaitRefetchQueries: element.awaitRefetchQueries,
                context: element.context,
                errorPolicy: element.errorPolicy,
                fetchPolicy: element.fetchPolicy,
                refetchQueries: element.refetchQueries ?? undefined,
                variables: element.variables ?? undefined,

                mutation,
                optimisticResponse,
                update,
              });
          });
        });
      });

      describe('with NullableParam mutation property set', function() {
        let element: MutationElement<NullableParamMutationData, NullableParamMutationVariables>;

        let spies: Record<string | keyof typeof element, SinonSpy>;

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
          spies!['client.mutate'] = spy(element.client!, 'mutate');
        });

        afterEach(function teardownElement() {
          element.remove();
          // @ts-expect-error: reset the fixture
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
            expect(element.shadowRoot.getElementById('data')!.textContent)
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
            expect(element.data, 'data').to.be.null;
            expect(element.error, 'error').to.equal(error);
            expect(element.errors, 'errors').to.be.null;
            expect(element.loading, 'loading').to.be.false;
          });

          it('renders error', function() {
            expect(element.shadowRoot.getElementById('error')?.textContent)
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
                ['client.mutate']: spy(element.client!, 'mutate'),
              };
            });

            afterEach(restoreSpies(() => spies));

            afterEach(function teardownElement() {
              element.remove();
              // @ts-expect-error: reset the fixture
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
              class Test extends (Klass as unknown as Constructor<typeof element>) {
                mutation = NoParamMutation;

                updater(): void { '💩'; }
              }

              const tag = defineCE(Test);

              element = await fixture<Test>(`<${tag}></${tag}>`);
            });

            beforeEach(function spyMethods() {
              spies = {
                ['client.mutate']: spy(element.client!, 'mutate'),
              };
            });

            describe('mutate()', function() {
              beforeEach(async function callMutate() {
                await element.mutate();
              });

              it(`uses element's updater method for mutation's \`update\` option by default`, function() {
                const update = element.updater;
                expect(element.client!.mutate).to.have.been.calledWith(match({ update }));
              });
            });

            describe('mutate({ update })', function() {
              const update = () => void null;

              beforeEach(async function callMutate() {
                await element.mutate({ update });
              });

              it('allows passing custom update function', function() {
                expect(element.client!.mutate).to.have.been.calledWith(match({ update }));
              });
            });
          });
        });
      });
    }
  });
}
