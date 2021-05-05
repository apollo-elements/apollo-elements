import type { ResultOf, VariablesOf } from '@graphql-typed-document-node/core';

import type { ApolloError, TypedDocumentNode } from '@apollo/client/core';

import * as S from '@apollo-elements/test/schema';

import { ReactiveElement } from 'lit';

import { ApolloQueryController } from './apollo-query-controller';

import { aTimeout, defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { resetMessages, setupClient, teardownClient } from '@apollo-elements/test';

import { spy, SinonSpy } from 'sinon';

/* eslint-disable no-invalid-this */
describe('[core] ApolloQueryController', function() {
  describe('with global client', function() {
    beforeEach(setupClient);

    afterEach(teardownClient);

    describe('on a ReactiveElement that mirrors props', function() {
      class MirroringHost<D extends TypedDocumentNode> extends ReactiveElement {
        query!: ApolloQueryController<D>;

        data?: unknown;

        error?: ApolloError|null;

        loading?: boolean;

        updated() {
          this.data = this.query?.data;
          this.error = this.query?.error;
          this.loading = this.query?.loading;
        }
      }

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
          beforeEach(function() { element.query.query = S.HelloQuery; });
          it('sets document', function() {
            expect(element.query.document).to.equal(S.HelloQuery);
          });
          describe('then calling subscribe', function() {
            beforeEach(() => element.query.subscribe());
            beforeEach(nextFrame);
            it('refetches', function() { expect(element.data).to.have.key('helloWorld'); });
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

      describe('with HelloQuery', function() {
        let element: MirroringHost<typeof S.HelloQuery>;

        const handler = spy();

        afterEach(() => (element?.query?.refetch as SinonSpy)?.restore?.());
        afterEach(() => handler?.resetHistory?.());

        before(function() {
          window.addEventListener('apollo-controller-connected', handler);
          window.addEventListener('apollo-controller-disconnected', handler);
        });

        after(function() {
          window.removeEventListener('apollo-controller-connected', handler);
          window.removeEventListener('apollo-controller-disconnected', handler);
        });

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

        it('fires "apollo-controller-connected"', function() {
          expect(handler.lastCall.args[0].controller).to.equal(element.query);
        });

        it('sets data, error, and loading', function() {
          expect(element.data, 'data').to.equal(element.query.data).and.to.not.be.undefined;
          expect(element.loading, 'loading')
            .to.equal(element.query.loading).and.to.not.be.undefined;
          expect(element.error, 'error').to.equal(element.query.error).and.to.be.undefined;
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

        describe('query.executeQuery({ variables })', function() {
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

        describe('query.executeQuery()', function() {
          beforeEach(function() {
            element.query.executeQuery();
          });

          beforeEach(nextFrame);

          it('refetches and updates state', function() {
            expect(element.query.options!.onData).to.have.callCount(4);
            expect(element.data).to.deep.equal({
              helloWorld: {
                __typename: 'HelloWorld',
                name: 'Chaver',
                greeting: 'Shalom',
              },
            });
          });
        });

        describe('with null options', function() {
          beforeEach(function() {
            delete element.query.options;
          });

          describe('query.executeQuery({ variables })', function() {
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
              expect(element.data).to.deep.equal({
                helloWorld: {
                  __typename: 'HelloWorld',
                  name: 'Gever',
                  greeting: 'Ahlan',
                },
              });
            });
          });
        });

        describe('when query rejects', function() {
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
            expect(element.error, 'element error').to.be.ok.and.to.equal(element.query.error);
            expect(element.query.error!.message, 'message').to.equal('Bad name');
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

            query = new ApolloQueryController(this, S.PaginatedQuery, {
              onData: spy(data => { this.$('data')!.innerText = data.pages.join(','); }),
              onError: spy(),
              variables: { offset: 0 } as VariablesOf<typeof S.PaginatedQuery>,
            })

            constructor() {
              super();
              this.attachShadow({ mode: 'open' }).innerHTML = `
                <p id="data"></p>
                <button id="fetchMore"></button>
              `;

              this.$('fetchMore')!.addEventListener('click', async () => {
                await this.query.fetchMore({
                  variables: {
                    offset: (this.query?.variables?.offset ?? 0) + 10,
                  },
                }).catch(() => 0);
              });
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
            <button id="fetchMore"></button>
          `);
        });

        describe('calling fetchMore', function() {
          beforeEach(function() { $('#fetchMore')!.click(); });
          beforeEach(nextFrame);

          it('calls onData again', function() {
            expect(element.query.options!.onData).to.have.callCount(5);
            expect(element.query.options!.onError).to.not.have.been.called;
          });

          it('renders next page', function() {
            expect(element).shadowDom.to.equal(`
              <p id="data">1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20</p>
              <button id="fetchMore"></button>
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
