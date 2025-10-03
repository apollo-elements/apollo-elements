import type * as I from '@apollo-elements/core/types';
import type * as S from './schema';
import type { ApolloMutationElement } from '@apollo-elements/core';

import { ApolloClient, InMemoryCache } from '@apollo/client';

import { SetupFunction } from './types';

import {
  aTimeout,
  expect,
  defineCE,
  fixture,
} from '@open-wc/testing';

import * as hanbi from 'hanbi';

import { makeClient, setupClient, teardownClient } from './client';

import { NoParamMutation, NullableParamMutation, HelloQuery, MessagesQuery, NoParamQuery } from './schema';

import { restoreSpies, stringify, waitForRender, mockQueriesInCache } from './helpers';
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
          const client = makeClient({ connectToDevTools: false });
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
          // @ts-expect-error: Test intentionally uses specific document type with generic element type
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
      beforeEach(() => mockQueriesInCache());

      afterEach(teardownClient);

      describe('when simply instantiating', function() {
        let element: ApolloMutationElement;

        let spies: Record<string | keyof ApolloMutationElement, ReturnType<typeof hanbi.stubMethod>>;

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

        let spies: Record<string|keyof ApolloMutationElement, ReturnType<typeof hanbi.stubMethod>>;

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction<any>({
            properties: {
              mutation: NoParamMutation,
              onCompleted: () => void null,
              onError: () => void null,
            },
          }));
        });

        let mutateCalls: any[] = [];
        let originalMutate: any;

        beforeEach(function spyClientMutate() {
          mutateCalls = [];
          originalMutate = element.client!.mutate;
          element.client!.mutate = function(...args: any[]) {
            mutateCalls.push(args[0]);
            return originalMutate.apply(element.client!, args);
          };
        });

        afterEach(function restoreClientMutate() {
          if (originalMutate && element.client) {
            element.client.mutate = originalMutate;
          }
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
            expect(mutateCalls.some(call =>
              call.optimisticResponse === optimisticResponse
            )).to.be.true;
          });

          describe('specifying optimisticResponse', function() {
            const optimisticResponse = { noParam: { noParam: 'specific' } };
            beforeEach(function callMutate() {
              element.mutate({ optimisticResponse });
            });

            it('uses specific optimisticResponse', function() {
              expect(mutateCalls.some(call =>
                call.optimisticResponse === optimisticResponse
              )).to.be.true;
            });
          });
        });

        describe('with refetchQueries property set as string[]', function() {
          const refetchQueries = [{ query: HelloQuery }];
          beforeEach(function() {
            element.refetchQueries = refetchQueries;
          });

          beforeEach(function callMutate() {
            element.mutate();
          });

          it('uses element\'s refetchQueries', function() {
            expect(mutateCalls.some(call =>
              call.refetchQueries === refetchQueries
            )).to.be.true;
          });

          describe('specifying refetchQueries', function() {
            const refetchQueries = ['B'];
            beforeEach(function callMutate() {
              element.mutate({ refetchQueries });
            });

            it('uses specific refetchQueries', function() {
              expect(mutateCalls.some(call =>
                call.refetchQueries === refetchQueries
              )).to.be.true;
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
            expect(mutateCalls.some(call =>
              call.awaitRefetchQueries === true
            )).to.be.true;
          });

          describe('specifying awaitRefetchQueries', function() {
            beforeEach(function callMutate() {
              element.mutate({ awaitRefetchQueries: false });
            });

            it('uses specific refetchQueries', function() {
              expect(mutateCalls.some(call =>
                call.awaitRefetchQueries === false
              )).to.be.true;
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
            expect(mutateCalls.some(call =>
              call.context === context
            )).to.be.true;
          });

          describe('specifying context', function() {
            const context = { a: 'b' };
            beforeEach(function callMutate() {
              element.mutate({ context });
            });

            it('uses specific context', function() {
              expect(mutateCalls.some(call =>
                call.context === context
              )).to.be.true;
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
            expect(mutateCalls.some(call =>
              call.errorPolicy === errorPolicy
            )).to.be.true;
          });

          describe('specifying errorPolicy', function() {
            const errorPolicy = 'ignore';
            beforeEach(function callMutate() {
              element.mutate({ errorPolicy });
            });

            it('uses specific errorPolicy', function() {
              expect(mutateCalls.some(call =>
                call.errorPolicy === errorPolicy
              )).to.be.true;
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
            expect(mutateCalls.some(call =>
              call.fetchPolicy === fetchPolicy
            )).to.be.true;
          });

          describe('specifying fetchPolicy', function() {
            beforeEach(function callMutate() {
              element.fetchPolicy = undefined;
              element.mutate({ fetchPolicy });
            });

            it('uses specific fetchPolicy', function() {
              expect(mutateCalls.some(call =>
                call.fetchPolicy === fetchPolicy
              )).to.be.true;
            });
          });
        });

        describe('mutate()', function() {
          beforeEach(function callMutate() {
            element.mutate();
          });

          it('calls client.mutate with element props', function() {
            expect(mutateCalls).to.have.length(1);
            const call = mutateCalls[0];
            expect(call.mutation).to.equal(element.mutation);
            expect(call.awaitRefetchQueries).to.equal(element.awaitRefetchQueries);
            expect(call.context).to.equal(element.context);
            expect(call.errorPolicy).to.equal(element.errorPolicy);
            expect(call.fetchPolicy).to.equal(element.fetchPolicy);
            expect(call.optimisticResponse).to.equal(element.optimisticResponse);
            expect(call.update).to.equal(element.updater);
          });
        });

        describe('mutate({})', function() {
          beforeEach(function callMutate() {
            element.mutate({});
          });

          it('defaults to element\'s mutation', function() {
            expect(mutateCalls).to.have.length(1);
            const call = mutateCalls[0];
            expect(call.mutation).to.equal(element.mutation);
            expect(call.awaitRefetchQueries).to.equal(element.awaitRefetchQueries);
            expect(call.context).to.equal(element.context);
            expect(call.errorPolicy).to.equal(element.errorPolicy);
            expect(call.fetchPolicy).to.equal(element.fetchPolicy);
            expect(call.optimisticResponse).to.equal(element.optimisticResponse);
            expect(call.update).to.equal(element.updater);
          });
        });

        describe('mutate({ refetchQueries })', function() {
          const refetchQueries = ['B'];
          beforeEach(function callMutate() {
            element.mutate({ refetchQueries });
          });

          it('uses specific refetchQueries', function() {
            expect(mutateCalls.some(call =>
              call.refetchQueries === refetchQueries
            )).to.be.true;
          });
        });

        describe('mutate({ errorPolicy })', function() {
          const errorPolicy = 'none';
          beforeEach(function callMutate() {
            element.mutate({ errorPolicy });
          });

          it('uses specific errorPolicy', function() {
            expect(mutateCalls.some(call =>
              call.errorPolicy === errorPolicy
            )).to.be.true;
          });
        });

        describe('mutate({ fetchPolicy })', function() {
          const fetchPolicy = 'no-cache';
          beforeEach(function callMutate() {
            element.mutate({ fetchPolicy });
          });

          it('uses specific fetchPolicy', function() {
            expect(mutateCalls.some(call =>
              call.fetchPolicy === fetchPolicy
            )).to.be.true;
          });
        });

        describe('mutate({ context })', function() {
          const context = { a: 'a' };
          beforeEach(function callMutate() {
            element.mutate({ context });
          });

          it('uses specific context', function() {
            expect(mutateCalls.some(call =>
              call.context === context
            )).to.be.true;
          });
        });

        describe('mutate({ awaitRefetchQueries })', function() {
          const awaitRefetchQueries = true;
          beforeEach(function callMutate() {
            element.mutate({ awaitRefetchQueries });
          });

          it('uses specific awaitRefetchQueries', function() {
            expect(mutateCalls.some(call =>
              call.awaitRefetchQueries === awaitRefetchQueries
            )).to.be.true;
          });
        });

        describe('mutate({ optimisticResponse, variables, update })', function() {
          const optimisticResponse = { noParam: { noParam: null } };
          const variables = {};
          const update = (): void => { null; };

          beforeEach(function callMutate() {
            element.mutate({ optimisticResponse, variables, update });
          });

          beforeEach(() => element.controller.host.updateComplete);

          it('uses element\'s mutation', function() {
            expect(mutateCalls).to.have.length.greaterThan(0);
            const call = mutateCalls[mutateCalls.length - 1];
            expect(call.mutation).to.equal(element.mutation);
            expect(call.optimisticResponse).to.equal(optimisticResponse);
            expect(call.update).to.equal(update);
            expect(call.variables).to.equal(variables);
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
            expect(mutateCalls).to.have.length.greaterThan(0);
            const call = mutateCalls[mutateCalls.length - 1];
            expect(call.mutation).to.equal(mutation);
            expect(call.optimisticResponse).to.equal(element.optimisticResponse);
            expect(call.update).to.equal(update);
            expect(call.variables).to.equal(variables);
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
            expect(mutateCalls).to.have.length.greaterThan(0);
            const call = mutateCalls[mutateCalls.length - 1];
            expect(call.mutation).to.equal(mutation);
            expect(call.optimisticResponse).to.equal(optimisticResponse);
            expect(call.update).to.equal(element.updater);
            expect(call.variables).to.equal(variables);
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
            expect(mutateCalls).to.have.length.greaterThan(0);
            const call = mutateCalls[mutateCalls.length - 1];
            expect(call.mutation).to.equal(mutation);
            expect(call.optimisticResponse).to.equal(optimisticResponse);
            expect(call.update).to.equal(update);
          });
        });
      });

      describe('with NullableParam mutation property set', function() {
        let element: TestableElement & ApolloMutationElement<typeof S.NullableParamMutation>;

        let spies: Record<string | keyof typeof element, ReturnType<typeof hanbi.stubMethod>>;
        let onCompletedSpy: ReturnType<typeof hanbi.spy>;
        let onErrorSpy: ReturnType<typeof hanbi.spy>;

        beforeEach(function createCallbackSpies() {
          onCompletedSpy = hanbi.spy();
          onErrorSpy = hanbi.spy();
        });

        beforeEach(async function setupElement() {
          ({ element, spies } = await setupFunction<any>({
            properties: {
              mutation: NullableParamMutation,
              onCompleted: onCompletedSpy.handler,
              onError: onErrorSpy.handler,
            },
          }));
        });

        let mutateCalls: any[] = [];
        let originalMutate: any;

        beforeEach(function spyClientMutate() {
          mutateCalls = [];
          originalMutate = element.client!.mutate;
          element.client!.mutate = function(...args: any[]) {
            mutateCalls.push(args[0]);
            return originalMutate.apply(element.client!, args);
          };
        });

        afterEach(function restoreClientMutate() {
          if (originalMutate && element.client) {
            element.client.mutate = originalMutate;
          }
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
            expect(onCompletedSpy.lastCall!.args[0]).to.deep.include({
              nullableParam: { nullable: 'Hello World', __typename: 'Nullable' }
            });
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
          let error: Error;

          beforeEach(function setVariablesToError() {
            element.variables = { nullable: 'error' };
          });

          beforeEach(async function catchMutateError() {
            try {
              await element.mutate();
              expect.fail('no error');
            } catch (e) {
              error = e as Error;
            }
          });

          beforeEach(waitForRender(() => element));

          it('calls onError with error', function() {
            expect(onErrorSpy.lastCall!.args[0]).to.deep.equal(error);
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
            expect(onCompletedSpy.callCount).to.equal(1);
            expect(onCompletedSpy.lastCall!.args[0]).to.deep.include({
                nullableParam: {
                  __typename: 'Nullable',
                  nullable: 'Hello World',
                },
              });
          });

          describe('then calling again', function() {
            beforeEach(() => aTimeout(50));
            beforeEach(() => element.mutate({
              variables: {
                nullable: 'second',
              },
            }));

            it('calls onCompleted with result', function() {
              expect(onCompletedSpy.callCount).to.equal(2);
              expect(onCompletedSpy.lastCall!.args[0]).to.deep.include({
                  nullableParam: {
                    nullable: 'second',
                    __typename: 'Nullable',
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

          let spies: Record<Exclude<keyof typeof element, symbol> | string, ReturnType<typeof hanbi.stubMethod>>;

          beforeEach(setupClient);
      beforeEach(() => mockQueriesInCache());

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

            beforeEach(() => element.controller.host.updateComplete);

            let onCompletedCalls: any[] = [];
            let onErrorCalls: any[] = [];
            let mutateCalls: any[] = [];
            let originalMutate: any;
            let originalOnCompleted: any;
            let originalOnError: any;

            beforeEach(function spyMethods() {
              onCompletedCalls = [];
              onErrorCalls = [];
              mutateCalls = [];

              originalOnCompleted = element.onCompleted;
              originalOnError = element.onError;
              originalMutate = element.client!.mutate;

              element.onCompleted = function(...args: any[]) {
                onCompletedCalls.push(args);
                return originalOnCompleted?.apply(element, args);
              };

              element.onError = function(...args: any[]) {
                onErrorCalls.push(args);
                return originalOnError?.apply(element, args);
              };

              element.client!.mutate = function(...args: any[]) {
                mutateCalls.push(args[0]);
                return originalMutate.apply(element.client!, args);
              };
            });

            afterEach(function restoreMethods() {
              if (originalOnCompleted) element.onCompleted = originalOnCompleted;
              if (originalOnError) element.onError = originalOnError;
              if (originalMutate && element.client) element.client.mutate = originalMutate;
            });

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
                expect(onCompletedCalls).to.have.length(1);
                expect(onCompletedCalls[0][0]).to.deep.include({
                  nullableParam: {
                    nullable: 'Hello World',
                    __typename: 'Nullable',
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
              let error: Error;

              beforeEach(function setVariablesToError() {
                element.variables = { nullable: 'error' };
              });

              beforeEach(async function catchMutateError() {
                try {
                  await element.mutate();
                  expect.fail('no error');
                } catch (e) {
                  error = e as Error;
                }
              });

              it('calls onError with error', function() {
                expect(onErrorCalls).to.have.length(1);
                expect(onErrorCalls[0][0]).to.equal(error);
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

            let mutateCalls: any[] = [];
            let originalMutate: any;

            beforeEach(function spyMethods() {
              mutateCalls = [];
              originalMutate = element.client!.mutate;
              element.client!.mutate = function(...args: any[]) {
                mutateCalls.push(args[0]);
                return originalMutate.apply(element.client!, args);
              };
            });

            afterEach(function restoreMutate() {
              if (originalMutate && element.client) {
                element.client.mutate = originalMutate;
              }
            });

            describe('mutate()', function() {
              beforeEach(async function callMutate() {
                await element.mutate();
              });

              it(`uses element's updater method for mutation's \`update\` option by default`, function() {
                const update = element.updater;
                expect(mutateCalls).to.have.length.greaterThan(0);
                expect(mutateCalls.some(call => call.update === update)).to.be.true;
              });
            });

            describe('mutate({ update })', function() {
              const update = () => void null;

              beforeEach(async function callMutate() {
                await element.mutate({ update });
              });

              it('allows passing custom update function', function() {
                expect(mutateCalls).to.have.length.greaterThan(0);
                expect(mutateCalls.some(call => call.update === update)).to.be.true;
              });
            });
          });
        });
      });
    }
  });
}
