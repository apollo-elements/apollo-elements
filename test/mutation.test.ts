import type * as I from '@apollo-elements/core/types';
import type { ApolloMutationElement } from '@apollo-elements/core';
import type * as S from './schema';

import { ApolloClient, ApolloError, InMemoryCache } from '@apollo/client/core';

import { SetupFunction } from './types';

import {
  aTimeout,
  expect,
  defineCE,
  fixture,
} from '@open-wc/testing';

import { match, spy, SinonSpy } from 'sinon';

import { setupClient, teardownClient } from './client';

import NoParamMutation from './graphql/NoParam.mutation.graphql';
import NullableParamMutation from './graphql/NullableParam.mutation.graphql';

import { restoreSpies, stringify, waitForRender } from './helpers';
import { TestableElement } from './types';

export interface DescribeMutationComponentOptions<E extends Omit<ApolloMutationElement<any, any>, 'update'|'updated'> = ApolloMutationElement<any, any>> {
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
   * The element must implement a `hasRendered` method which returns a promise that resolves when the element is finished rendering
   */
  setupFunction: SetupFunction<E & TestableElement>;

  /**
   * Optional: the class which setup function uses to generate the component.
   * Only relevant to class-based libraries
   */
  class?: I.Constructor<Omit<E, 'update'|'updated'> & TestableElement>;
}

export { setupMutationClass } from './helpers';

export function describeMutation(options: DescribeMutationComponentOptions): void {
  const { setupFunction } = options;
  const Klass: typeof ApolloMutationElement = options.class as unknown as typeof ApolloMutationElement;
  describe(`ApolloMutation interface`, function() {
    describe('when simply instantiating', function() {
      beforeEach(teardownClient);
      let element: ApolloMutationElement & TestableElement;

      beforeEach(async function setupElement() {
        ({ element } = await setupFunction());
      });

      beforeEach(waitForRender(() => element));

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

        // optional fields
        expect(element.awaitRefetchQueries, 'awaitRefetchQueries').to.be.undefined;
        expect(element.errorPolicy, 'errorPolicy').to.be.undefined;
        expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
        expect(element.onCompleted, 'onCompleted').to.be.undefined;
        expect(element.onError, 'onError').to.be.undefined;
        expect(element.optimisticResponse, 'optimisticResponse').to.be.undefined;
        expect(element.updater, 'updater').to.be.undefined;
      });

      describe('setting observed properties', function() {
        describe('client', function() {
          const client = new ApolloClient({ cache: new InMemoryCache(), connectToDevTools: false });
          it('renders', async function() {
            element.client = client;
            await element.hasRendered();
            expect(element.client, 'client')
              .to.equal(client)
              .and
              .to.equal(element.controller.client);

            element.client = null;
            await element.hasRendered();
            expect(element.client, 'null')
              .to.be.null
              .and
              .to.equal(element.controller.client);
          });
        });

        describe('data', function() {
          const data = { data: 'data' };
          it('renders', async function() {
            element.data = data;
            await element.hasRendered();

            expect(element.data, 'data')
              .to.equal(data).and
              .to.equal(element.controller.data);
            expect(element.shadowRoot!.getElementById('data'), 'data')
              .lightDom.to.equal(JSON.stringify(data));

            element.data = null;
            await element.hasRendered();

            expect(element.data, 'null').to.be.null.and
              .to.equal(element.controller.data);
            expect(element.shadowRoot!.getElementById('data'), 'null')
              .lightDom.to.equal(JSON.stringify(null));
          });
        });

        describe('error', function() {
          it('renders', async function() {
            try {
              element.error = new Error('error');
              expect(element.error.message, 'error')
                .to.equal('error').and
                .to.equal(element.controller.error?.message);
            } catch { null; }
            element.error = null;
            await element.hasRendered();
            expect(element.error, 'null')
              .to.be.null.and
              .to.equal(element.controller.error);
          });
        });

        describe('loading', function() {
          it('renders', async function() {
            element.loading = true;
            await element.hasRendered();
            expect(element.loading, 'true')
              .to.be.true.and
              .to.equal(element.controller.loading);

            element.loading = false;
            await element.hasRendered();
            expect(element.loading, 'false')
              .to.be.false.and
              .to.equal(element.controller.loading);
          });
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
            .throw('Mutation must be a parsed GraphQL document.');
          expect(element.mutation).to.not.be.ok;
        });
      });
    });

    // hybrids and haunted don't play nice with custom attributes
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    if (!this.parent?.title.match(/^\[(haunted|hybrids)\]/)) {
      describe('with await-refetch-queries attribute', function() {
        let element: ApolloMutationElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'await-refetch-queries' }));
        });

        it('sets awaitRefetchQueries property', function() {
          expect(element.awaitRefetchQueries).to.be.true;
        });
      });

      describe('with refetch-queries="A"', function() {
        let element: ApolloMutationElement;

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
        let element: ApolloMutationElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'fetch-policy="no-cache"' }));
        });

        it('sets fetchPolicy property', function() {
          expect(element.fetchPolicy).to.equal('no-cache');
        });
      });

      describe('with refetch-queries="A,   B, C  "', function() {
        let element: ApolloMutationElement;

        beforeEach(async function() {
          ({ element } = await setupFunction({ attributes: 'refetch-queries="A,   B, C  "' }));
        });

        it('sets refetchQueries property', function() {
          expect(element.refetchQueries).to.deep.equal(['A', 'B', 'C']);
        });
      });
    }

    describe('with global client available', function() {
      beforeEach(setupClient);

      afterEach(teardownClient);

      describe('when simply instantiating', function() {
        let element: ApolloMutationElement;

        let spies: Record<string | keyof ApolloMutationElement, SinonSpy>;

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
            expect(element.client).to.equal(window.__APOLLO_CLIENT__);
          });
        });
      });

      describe('with NoParam mutation property set', function() {
        let element: ApolloMutationElement<typeof S.NoParamMutation>;

        let spies: Record<string|keyof ApolloMutationElement, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            properties: {
              mutation: NoParamMutation,
              onCompleted: () => void null,
              onError: () => void null,
            },
          }));
        });

        beforeEach(function spyClientMutate() {
          ['onCompleted', 'onError'].forEach(m => {
            try {
              spy(element, m as keyof typeof element);
            } catch {
              spy(element.controller.options, m as keyof typeof element.controller.options);
            }
          });
          spy(element.client!, 'mutate');
        });

        afterEach(function restoreClientMutate() {
          (element.client?.mutate as SinonSpy).restore?.();
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

          beforeEach(() => element.updateComplete);

          it('uses element\'s mutation', function() {
            expect(element.client!.mutate).to.have.been
              .calledWithMatch({
                awaitRefetchQueries: element.awaitRefetchQueries,
                context: element.context,
                errorPolicy: element.errorPolicy,
                fetchPolicy: element.fetchPolicy,
                mutation: element.mutation,
                optimisticResponse,
                refetchQueries: element.refetchQueries ?? undefined,
                update,
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
        let element: TestableElement & ApolloMutationElement<typeof S.NullableParamMutation>;

        let spies: Record<string | keyof typeof element, SinonSpy>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction({
            properties: {
              mutation: NullableParamMutation,
              onCompleted: spy(),
              onError: spy(),
            },
          }));
        });

        beforeEach(function spyClientMutate() {
          spy(element.client!, 'mutate');
        });

        afterEach(function restoreClientMutate() {
          (element.client?.mutate as SinonSpy).restore?.();
        });


        afterEach(function teardownElement() {
          element.remove();
          // @ts-expect-error: reset the fixture
          element = undefined;
        });

        afterEach(restoreSpies(() => spies));

        describe('when mutation resolves', function() {
          let loading: boolean|undefined;
          beforeEach(async function callMutate() {
            const p = element.mutate();
            ({ loading } = element);
            await p;
          });

          afterEach(() => loading = undefined);

          beforeEach(() => element.hasRendered());

          it('calls onCompleted with data', function() {
            expect(element.onCompleted).to.have.been
              .calledWithMatch({ nullableParam: match({ nullable: 'Hello World' }) });
          });

          it('sets loading', function() {
            expect(loading, 'in flight').to.be.true;
            expect(element.loading, 'after resolves').to.be.false;
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
            expect(element.shadowRoot!.getElementById('data')!.textContent)
              .to.equal(stringify({
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
            expect(element.errors).to.be.empty;
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
            expect(element.errors, 'errors').to.be.empty;
            expect(element.loading, 'loading').to.be.false;
          });

          it('renders error', function() {
            expect(element).shadowDom.to.equal(`
              <output id="called">true</output>
              <output id="data">null</output>
              <output id="error">${stringify(error)}</output>
              <output id="errors">[]</output>
              <output id="loading">false</output>
            `);
          });
        });

        describe('mutate()', function() {
          beforeEach(() => element.mutate());

          it('calls onCompleted with result', function() {
            expect(element.onCompleted)
              .to.have.been.calledOnce
              .and
              .to.have.been.calledWith(match({
                nullableParam: {
                  __typename: 'Nullable',
                  nullable: 'Hello World',
                },
              }));
          });

          describe('then calling again', function() {
            beforeEach(() => aTimeout(50));
            beforeEach(() => element.mutate({
              variables: {
                nullable: 'second',
              },
            }));

            it('calls onCompleted with result', function() {
              expect(element.onCompleted)
                .to.have.been.calledTwice.and
                .to.have.been.calledWithMatch({
                  nullableParam: {
                    nullable: 'second',
                  },
                });
            });
          });
        });
      });
    });

    if (Klass) {
      describe('ApolloMutation subclasses', function() {
        describe('with NullableParam mutation in class field', function() {
          let element: ApolloMutationElement<typeof S.NullableParamMutation>;

          let spies: Record<Exclude<keyof typeof element, symbol> | string, SinonSpy>;

          beforeEach(setupClient);

          beforeEach(async function setupElement() {
            class Test extends Klass<typeof S.NullableParamMutation> {
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
              class Test extends Klass<typeof S.NullableParamMutation> {
                mutation = NullableParamMutation;

                onError() { null; }

                onCompleted() { null; }
              }

              const tag = defineCE(Test);

              element = await fixture<Test>(`<${tag}></${tag}>`);
            });

            beforeEach(() => element.updateComplete);

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
              beforeEach(() => element.mutate());

              it('calls onCompleted with data', function() {
                expect(element.onCompleted)
                  .to.have.been.calledOnce
                  .and.to.have.been.calledWithMatch({
                    nullableParam: {
                      nullable: 'Hello World',
                    },
                  });
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
            let element: ApolloMutationElement<typeof S.NoParamMutation>;

            beforeEach(async function setupElement() {
              class Test extends (Klass as unknown as I.Constructor<typeof element>) {
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
