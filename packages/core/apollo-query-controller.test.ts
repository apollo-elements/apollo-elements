import type { TypedDocumentNode, ResultOf, VariablesOf } from '@graphql-typed-document-node/core';

import * as S from '@apollo-elements/test/schema';

import * as C from './apollo-controller';

import { ApolloError, NetworkStatus } from '@apollo/client/core';

import { ReactiveElement } from 'lit';

import { ApolloQueryController } from './apollo-query-controller';

import { aTimeout, defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { resetMessages, setupClient, teardownClient } from '@apollo-elements/test';

import { match, spy, SinonSpy } from 'sinon';

describe('[core] ApolloQueryController', function() {
  describe('on a ReactiveElement that mirrors props', function() {
    class MirroringHost<D extends TypedDocumentNode> extends ReactiveElement {
        query!: ApolloQueryController<D>;

        data?: unknown;

        error?: Error|ApolloError|null;

        loading?: boolean;

        updated() {
          this.data = this.query?.data;
          this.error = this.query?.error;
          this.loading = this.query?.loading;
        }
    }

    describe('when simply instantiating', function() {
      let element: MirroringHost<any>;

      const resetSpies = () => Object.values(handlers).forEach(h => h.resetHistory());

      const handlers = {
        [C.ApolloControllerConnectedEvent.type]: spy(),
        [C.ApolloControllerDisconnectedEvent.type]: spy(),
      };

      afterEach(resetSpies);

      beforeEach(function() {
        for (const [type, handler] of Object.entries(handlers))
          window.addEventListener(type, handler);
      });

      afterEach(function() {
        for (const [type, handler] of Object.entries(handlers))
          window.removeEventListener(type, handler);
      });

      beforeEach(async function setupElement() {
        const tag = defineCE(class extends MirroringHost<any> {
          query = new ApolloQueryController(this);
        });
        element = await fixture(`<${tag}></${tag}>`);
      });

      it('has default properties', function() {
        /* eslint-disable max-len */
        // fields
        expect(element.query.client, 'client').to.not.be.ok;
        expect(element.query.data, 'data').to.not.be.ok;
        expect(element.query.error, 'error').to.not.be.ok;
        expect(element.query.errors, 'errors').to.be.empty;
        expect(element.query.options, 'options').to.be.empty;
        expect(element.query.query, 'query').to.not.be.ok;
        expect(element.query.variables, 'variables').to.not.be.ok;

        // defined fields
        expect(element.query.networkStatus, 'networkStatus').to.equal(NetworkStatus.ready);
        expect(element.query.partial, 'partial').to.be.false;
        /* eslint-enable max-len */
      });


      it('fires "apollo-controller-connected"', function() {
        const { type } = C.ApolloControllerConnectedEvent;
        const [event] = handlers[type].lastCall.args;
        expect(event.controller, 'controller').to.equal(element.query);
        expect(event.type, 'type').to.equal(type);
      });

      describe('when disconnecting', function() {
        beforeEach(resetSpies);
        beforeEach(() => element.remove());
        beforeEach(nextFrame);
        it('fires event on disconnect', function() {
          const { type } = C.ApolloControllerConnectedEvent;
          const [event] = handlers[type].lastCall.args;
          expect(event.controller, 'controller').to.equal(element.query);
          expect(event.type, 'type').to.equal(type);
        });
      });

      describe('calling [update]()', function() {
        let requestUpdateSpy: SinonSpy;
        beforeEach(() => requestUpdateSpy = spy(element, 'requestUpdate'));
        afterEach(() => requestUpdateSpy.restore());
        beforeEach(() => element.query[C.update]());
        it('updates the host', function() {
          expect(requestUpdateSpy).to.have.been.calledOnce;
        });
      });

      describe('without setting query or variables', function() {
        describe('subscribe()', function() {
          it('throws', function() {
            expect(() => element.query.subscribe())
              .to.throw('No Apollo client');
          });
        });

        describe('subscribe({ query })', function() {
          it('throws', function() {
            expect(() => element.query.subscribe({ query: S.NullableParamQuery }))
              .to.throw('No Apollo client');
          });
        });

        describe('executeQuery()', function() {
          it('throws', async function() {
            try {
              await element.query.executeQuery();
              expect.fail('did not throw');
            } catch (error) {
              expect(error.message).to.match(/^No Apollo client/);
            }
          });
        });

        describe('executeQuery({ query })', function() {
          it('throws', async function() {
            try {
              await element.query.executeQuery({ query: S.NullableParamQuery });
              expect.fail('did not throw');
            } catch (error) {
              expect(error.message).to.match(/^No Apollo client/);
            }
          });
        });
      });

      describe('setting NullableParam query', function() {
        let subscribeSpy: SinonSpy;
        beforeEach(function() { subscribeSpy = spy(element.query, 'subscribe'); });
        afterEach(function() { subscribeSpy.restore(); });

        beforeEach(function setNullableParamQuery() {
          element.query.query = S.NullableParamQuery;
        });

        beforeEach(nextFrame);

        it('does not call subscribe', function() {
          expect(element.query.subscribe).to.not.have.been.called;
        });

        describe('then setting variables', function() {
          beforeEach(function setVariables() {
            element.query.variables = { nullable: '✈' };
          });

          beforeEach(nextFrame);

          it('does not call subscribe', function() {
            expect(element.query.subscribe).to.not.have.been.called;
          });
        });

        describe('executeQuery()', function() {
          it('throws', async function() {
            try {
              await element.query.executeQuery();
              expect.fail('did not throw');
            } catch (error) {
              expect(error.message).to.match(/^No Apollo client/);
            }
          });
        });

        describe('executeQuery({ query })', function() {
          it('throws', async function() {
            try {
              await element.query.executeQuery({ query: S.NonNullableParamQuery });
              expect.fail('did not throw');
            } catch (error) {
              expect(error.message).to.match(/^No Apollo client/);
            }
          });
        });
      });
    });

    describe('with global client', function() {
      beforeEach(setupClient);

      afterEach(teardownClient);

      describe('setting shouldSubscribe to constant false', function() {
        let element: MirroringHost<typeof S.NullableParamQuery>;

        beforeEach(async function define() {
          class HelloQueryHost extends MirroringHost<typeof S.NullableParamQuery> {
            query = new ApolloQueryController(this, S.NullableParamQuery, {
              shouldSubscribe: () => false,
              onData: spy(),
              onError: spy(),
            });
          }

          const tag = defineCE(HelloQueryHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        it('reads document from query', function() {
          expect(element.query.query).to.be.ok.and.to.equal(element.query.document);
        });

        describe('setting query', function() {
          // @ts-expect-error: wrong query document!
          beforeEach(() => element.query.query = S.HelloQuery);
          it('sets document', function() {
            expect(element.query.document).to.equal(S.HelloQuery);
          });
          describe('then calling subscribe', function() {
            beforeEach(() => element.query.subscribe());
            it('sets loading', function() {
              expect(element.query.loading).to.be.true;
            });
            describe('when query resolves', function() {
              beforeEach(nextFrame);
              it('refetches', function() {
                expect(element.data).to.have.key('helloWorld');
              });
              it('unsets loading', function() {
                expect(element.query.loading).to.be.false;
              });
            });
          });
        });

        beforeEach(() => aTimeout(100));

        it('does not fetch data', function() {
          expect(element.query?.options?.onData).to.not.have.been.called;
          expect(element.query?.options?.onError).to.not.have.been.called;
        });

        describe('when query will reject', function() {
          beforeEach(function() { element.query.variables = { nullable: 'error' }; });
          describe('calling subscribe()', function() {
            beforeEach(function() { element.query.subscribe(); });
            beforeEach(nextFrame);
            it('calls onError', function() {
              expect(element.query.options!.onError).to.have.been.calledWithMatch({
                message: 'error',
              });
            });
          });
        });
      });

      describe('with noAutoSubscribe', function() {
        let element: MirroringHost<typeof S.HelloQuery>;

        afterEach(() => (element?.query?.refetch as SinonSpy)?.restore?.());

        afterEach(function() {
          element.remove();
          element = undefined as unknown as typeof element;
        });

        beforeEach(async function define() {
          class HelloQueryHost extends MirroringHost<typeof S.HelloQuery> {
            query = new ApolloQueryController(this, S.HelloQuery, {
              noAutoSubscribe: true,
              onData: spy(),
              onError: spy(),
            });

            constructor() {
              super();
              spy(this.query, 'refetch');
            }
          }

          const tag = defineCE(HelloQueryHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        it('does not subscribe', function() {
          expect(element.query.options?.onData).to.not.have.been.called;
        });

        describe('with partial data in the cache', function() {
          beforeEach(function() {
            element.query.client?.cache.reset();
            element.query.client?.cache.writeQuery({
              query: element.query.query!,
              data: {
                helloWorld: {
                  greeting: 'partial',
                },
              },
            });
          });

          describe('with returnPartialData option', function() {
            beforeEach(() => spy(element.query.client!, 'watchQuery'));
            afterEach(() => (element.query.client?.watchQuery as SinonSpy).restore());

            beforeEach(function() {
              element.query.options!.returnPartialData = true;
            });

            describe(`subscribe({ fetchPolicy: "cache-only", partialRefetch: false })`, function() {
              beforeEach(function subscribe() {
                element.query.subscribe({
                  fetchPolicy: 'cache-only',
                  partialRefetch: false,
                });
              });

              beforeEach(nextFrame);

              it('uses returnPartialData option', function() {
                expect(element.query.client!.watchQuery).to.have.been.calledOnceWith(match({
                  returnPartialData: true,
                  partialRefetch: false,
                  fetchPolicy: 'cache-only',
                }));
              });

              it('sets partial', function() {
                expect(element.query.partial).to.be.true;
              });
            });

            describe('subscribe({ returnPartialData })', function() {
              beforeEach(() => element.query.subscribe({ returnPartialData: false }));
              it('uses provided returnPartialData', function() {
                expect(element.query.client!.watchQuery).to.have.been.calledWithMatch({
                  returnPartialData: false,
                });
              });
            });
          });

          describe('with partialRefetch option', function() {
            beforeEach(() => spy(element.query.client!, 'query'));
            afterEach(() => (element.query.client?.query as SinonSpy).restore());

            beforeEach(function() {
              element.query.options!.partialRefetch = true;
            });

            describe('executeQuery()', function() {
              beforeEach(() => element.query.executeQuery());
              it('uses partialRefetch option', function() {
                expect(element.query.client!.query).to.have.been.calledWithMatch({
                  partialRefetch: true,
                });
              });
            });

            describe('executeQuery({ partialRefetch })', function() {
              before;
              beforeEach(() => element.query.executeQuery({ partialRefetch: false }));
              it('uses provided partialRefetch', function() {
                expect(element.query.client!.query).to.have.been.calledWithMatch({
                  partialRefetch: false,
                });
              });
            });
          });
        });
      });

      describe('with HelloQuery', function() {
        let element: MirroringHost<typeof S.HelloQuery>;

        afterEach(() => (element?.query?.refetch as SinonSpy)?.restore?.());

        beforeEach(async function define() {
          class HelloQueryHost extends MirroringHost<typeof S.HelloQuery> {
            query = new ApolloQueryController(this, S.HelloQuery, {
              onData: spy(),
            });

            constructor() {
              super();
              spy(this.query, 'refetch');
            }
          }

          const tag = defineCE(HelloQueryHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        it('sets data, error, and loading', function() {
          expect(element.query.data, 'data')
            .to.equal(element.data)
            .and.to.be.ok;
          expect(element.query.data?.helloWorld?.greeting, 'data.helloWorld.greeting')
            .to.equal('Shalom');
          expect(element.query.loading, 'loading')
            .to.equal(element.loading)
            .and.to.be.false;
          expect(element.query.error, 'error')
            .to.equal(element.error)
            .and.to.not.be.ok;
        });

        it('calls onData', function() {
          expect(element.query.options!.onData).to.have.callCount(3);
        });

        describe('setting query variables', function() {
          beforeEach(function() {
            element.query.variables = {
              name: 'רב ייד',
              greeting: 'וואס מאכסטו',
            };
          });

          beforeEach(nextFrame);

          it('refetches', function() {
            expect(element.query.options!.onData).to.have.callCount(4);
            expect(element.data).to.deep.equal({
              helloWorld: {
                __typename: 'HelloWorld',
                name: 'רב ייד',
                greeting: 'וואס מאכסטו',
              },
            });
          });
        });

        let querySpy: SinonSpy;
        let watchQuerySpy: SinonSpy;
        beforeEach(() => {
          querySpy = spy(element.query.client!, 'query');
          watchQuerySpy = spy(element.query.client!, 'watchQuery');
        });

        afterEach(() => {
          querySpy.restore();
          watchQuerySpy.restore();
        });

        describe('with empty options', function() {
          beforeEach(function() {
            element.query.options = {};
          });

          describe('executeQuery({ variables })', function() {
            beforeEach(function() {
              element.query.executeQuery({
                variables: {
                  name: 'Gever',
                  greeting: 'Ahlan',
                },
              });
            });

            beforeEach(nextFrame);

            it('refetches and updates state', function() {
              expect(element.query.data).to.deep.equal({
                helloWorld: {
                  __typename: 'HelloWorld',
                  name: 'Gever',
                  greeting: 'Ahlan',
                },
              });
            });
          });
        });

        describe('with context option', function() {
          beforeEach(function() {
            element.query.options!.context = 'none';
          });

          describe('executeQuery()', function() {
            beforeEach(() => element.query.executeQuery());
            it('uses context option', function() {
              expect(element.query.client!.query).to.have.been.calledWithMatch({
                context: 'none',
              });
            });
          });

          describe('executeQuery({ context })', function() {
            beforeEach(() => element.query.executeQuery({ context: 'all' }));
            it('uses provided context', function() {
              expect(element.query.client!.query).to.have.been.calledWithMatch({
                context: 'all',
              });
            });
          });
        });

        describe('with errorPolicy option', function() {
          beforeEach(function() {
            element.query.options!.errorPolicy = 'none';
          });

          describe('executeQuery()', function() {
            beforeEach(() => element.query.executeQuery());
            it('uses errorPolicy option', function() {
              expect(element.query.client!.query).to.have.been.calledWithMatch({
                errorPolicy: 'none',
              });
            });
          });

          describe('executeQuery({ errorPolicy })', function() {
            beforeEach(() => element.query.executeQuery({ errorPolicy: 'all' }));
            it('uses provided errorPolicy', function() {
              expect(element.query.client!.query).to.have.been.calledWithMatch({
                errorPolicy: 'all',
              });
            });
          });
        });

        describe('with fetchPolicy option', function() {
          beforeEach(function() {
            element.query.options!.fetchPolicy = 'no-cache';
          });

          describe('executeQuery()', function() {
            beforeEach(() => element.query.executeQuery());
            it('uses fetchPolicy option', function() {
              expect(element.query.client!.query).to.have.been.calledWithMatch({
                fetchPolicy: 'no-cache',
              });
            });
          });

          describe('executeQuery({ fetchPolicy })', function() {
            beforeEach(() => element.query.executeQuery({ fetchPolicy: 'cache-first' }));
            it('uses provided fetchPolicy', function() {
              expect(element.query.client!.query).to.have.been.calledWithMatch({
                fetchPolicy: 'cache-first',
              });
            });
          });
        });

        describe('with notifyOnNetworkStatusChange option', function() {
          beforeEach(function() {
            element.query.options!.notifyOnNetworkStatusChange = true;
          });

          describe('executeQuery()', function() {
            beforeEach(() => element.query.executeQuery());
            it('uses notifyOnNetworkStatusChange option', function() {
              expect(element.query.client!.query).to.have.been.calledWithMatch({
                notifyOnNetworkStatusChange: true,
              });
            });
          });

          describe('executeQuery({ notifyOnNetworkStatusChange })', function() {
            beforeEach(() => element.query.executeQuery({ notifyOnNetworkStatusChange: false }));
            it('uses provided notifyOnNetworkStatusChange', function() {
              expect(element.query.client!.query).to.have.been.calledWithMatch({
                notifyOnNetworkStatusChange: false,
              });
            });
          });
        });

        describe('executeQuery()', function() {
          beforeEach(function() {
            element.query.executeQuery();
          });

          beforeEach(nextFrame);

          it('calls client.query() with controller query', function() {
            expect(element.query.client?.query).to.have.been.calledWithMatch({
              query: S.HelloQuery,
            });
          });

          it('refetches and updates state', function() {
            expect(element.query.options!.onData).to.have.callCount(4);
            expect(element.query.data).to.deep.equal({
              helloWorld: {
                __typename: 'HelloWorld',
                name: 'Chaver',
                greeting: 'Shalom',
              },
            });
          });
        });

        describe('executeQuery({ query })', function() {
          beforeEach(function() {
            element.query.executeQuery({ query: S.NullableParamQuery });
          });

          beforeEach(nextFrame);

          it('calls client.query() with passed query', function() {
            expect(element.query.client?.query).to.have.been.calledWithMatch({
              query: S.NullableParamQuery,
            });
          });
        });

        describe('executeQuery({ variables })', function() {
          beforeEach(function() {
            element.query.executeQuery({ variables: {
              name: 'רבי ומורי',
              greeting: 'שלום עליכם',
            } });
          });

          beforeEach(nextFrame);

          it('refetches and updates state', function() {
            expect(element.data).to.deep.equal({
              helloWorld: {
                __typename: 'HelloWorld',
                name: 'רבי ומורי',
                greeting: 'שלום עליכם',
              },
            });
          });
        });

        describe('when executeQuery() rejects', function() {
          let err: Error|undefined;
          afterEach(function() { err = undefined; });
          beforeEach(function() {
            element.query.executeQuery({ variables: {
              name: 'error',
              greeting: '',
            } }).catch(e => err = e);
          });

          beforeEach(nextFrame);

          it('sets error', function() {
            expect(err, 'throws').to.equal(element.error);
            expect(element.query.error!.message, 'message').to.equal('Bad name');
            expect(element.error, 'element error')
              .to.be.ok
              .and.to.equal(element.query.error)
              .and.to.be.an.instanceof(ApolloError);
          });
        });

        describe('calling startPolling', function() {
          beforeEach(function startPolling() { element.query.startPolling(20); });

          beforeEach(() => aTimeout(70));

          it('refetches', function() {
            expect(element.query.refetch).to.have.been.calledThrice;
          });

          describe('then stopPolling', function() {
            beforeEach(function stopPolling() {
              element.query.stopPolling();
            });

            beforeEach(() => aTimeout(100));

            it('stops calling refetch', function() {
              expect(element.query.refetch).to.have.been.calledThrice;
            });
          });
        });
      });

      describe('with PaginatedQuery', function() {
        let element: MirroringHost<typeof S.PaginatedQuery>;

        const $ = (x: string) => element.shadowRoot!.querySelector<HTMLElement>(x);

        const onError = spy();
        const onData = spy();

        afterEach(() => onError.resetHistory());
        afterEach(() => onData.resetHistory());

        beforeEach(async function define() {
          class PaginatedQueryHost extends MirroringHost<typeof S.PaginatedQuery> {
            declare shadowRoot: ShadowRoot;

            $(id: string) { return this.shadowRoot.getElementById(id); }

            // @ts-expect-error: this should work ? try after updating deps
            query = new ApolloQueryController(this, S.PaginatedQuery, {
              onData: spy(data => { this.$('data')!.innerText = data.pages.join(','); }),
              onError: spy(),
              variables: { offset: 0 },
            })

            constructor() {
              super();
              this.attachShadow({ mode: 'open' }).innerHTML = `
                <p id="data"></p>
              `;
            }
          }

          const tag = defineCE(PaginatedQueryHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        it('calls onData', function() {
          expect(element.query.options!.onData).to.have.been.called;
          expect(element.query.options!.onError).to.not.have.been.called;
        });

        it('renders initial data', function() {
          expect(element).shadowDom.to.equal(`
            <p id="data">1,2,3,4,5,6,7,8,9,10</p>
          `);
        });

        describe('calling fetchMore', function() {
          beforeEach(async () => element.query.fetchMore({
            variables: { offset: (element.query?.variables?.offset ?? 0) + 10 },
          }).catch(() => 0));

          beforeEach(nextFrame);

          it('calls onData again', function() {
            expect(element.query.options!.onData).to.have.callCount(5);
            expect(element.query.options!.onError).to.not.have.been.called;
          });

          it('renders next page', function() {
            expect(element).shadowDom.to.equal(`
              <p id="data">1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20</p>
            `);
          });
        });
      });

      describe('with MessagesQuery', function() {
        let element: MirroringHost<typeof S.MessagesQuery>;

        afterEach(resetMessages);

        beforeEach(async function define() {
          class HelloQueryHost extends MirroringHost<typeof S.MessagesQuery> {
            declare shadowRoot: ShadowRoot;

            constructor() {
              super();
              this.attachShadow({ mode: 'open' });
            }

            query = new ApolloQueryController(this, S.MessagesQuery, {
              onData: data => {
                this.shadowRoot.innerHTML =
                  `<ol>${data.messages!.map(x => `<li>${x!.message}</li>`).join('')}</ol>`;
              },
            });

            data?: ResultOf<typeof S.MessagesQuery>;
          }

          const tag = defineCE(HelloQueryHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        it('renders initial data', function() {
          expect(element).shadowDom.to.equal(`
            <ol>
              <li>Message 1</li>
              <li>Message 2</li>
            </ol>
          `);
        });

        describe('calling subscribeToMore', function() {
          beforeEach(function() {
            element.query.subscribeToMore({
              document: S.MessageSentSubscription,
              updateQuery: (_, n) => ({ messages: [n.subscriptionData.data.messageSent!] }),
            });
          });

          beforeEach(nextFrame);

          it('renders subscription', function() {
            expect(element).shadowDom.to.equal(`
              <ol>
                <li>Message 1</li>
                <li>Message 2</li>
                <li>Message 3</li>
                <li>Message 4</li>
                <li>Message 5</li>
              </ol>
            `);
          });
        });
      });
    });
  });
});
