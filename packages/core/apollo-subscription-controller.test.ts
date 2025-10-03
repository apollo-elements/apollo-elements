import type { TypedDocumentNode, ResultOf } from '@graphql-typed-document-node/core';

import * as S from '@apollo-elements/test/schema';

import * as E from './events';


import { ReactiveElement } from 'lit';

import { ApolloSubscriptionController } from './apollo-subscription-controller';

import { aTimeout, defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { resetMessages, setupClient, teardownClient, mockQueriesInCache } from '@apollo-elements/test';

import * as hanbi from 'hanbi';

describe('[core] ApolloSubscriptionController', function() {
  describe('on a ReactiveElement that mirrors props', function() {
    class MirroringHost<D extends TypedDocumentNode<any, any> = TypedDocumentNode<any, any>>
      extends ReactiveElement {
      declare subscription: D extends TypedDocumentNode<infer TD, infer TV>
        ? ApolloSubscriptionController<TD, TV extends import('@apollo/client').OperationVariables ? TV : any>
        : ApolloSubscriptionController<any, any>;

      data?: this['subscription']['data'];
      error?: this['subscription']['error'];
      errors?: this['subscription']['errors'];
      loading?: boolean;

      updated() {
        this.data = this.subscription?.data;
        this.error = this.subscription?.error;
        this.loading = this.subscription?.loading;
      }
    }

    describe('when simply instantiating', function() {
      let element: MirroringHost;

      const resetSpies = () => Object.values(handlers).forEach(h => h.reset());

      const handlers = {
        [E.ApolloControllerConnectedEvent.type]: hanbi.spy(),
        [E.ApolloControllerDisconnectedEvent.type]: hanbi.spy(),
      };

      afterEach(resetSpies);

      beforeEach(function() {
        for (const [type, handler] of Object.entries(handlers))
          window.addEventListener(type, handler.handler);
      });

      afterEach(function() {
        for (const [type, handler] of Object.entries(handlers))
          window.removeEventListener(type, handler.handler);
      });

      beforeEach(async function setupElement() {
        const tag = defineCE(class extends MirroringHost<any> {
          subscription = new ApolloSubscriptionController<any>(this);
        });
        element = await fixture(`<${tag}></${tag}>`);
      });

      it('has default properties', function() {

        // fields
        expect(element.subscription.client, 'client').to.not.be.ok;
        expect(element.subscription.data, 'data').to.not.be.ok;
        expect(element.subscription.error, 'error').to.not.be.ok;
        expect(element.subscription.options, 'options').to.be.empty;
        expect(element.subscription.subscription, 'query').to.not.be.ok;
        expect(element.subscription.variables, 'variables').to.not.be.ok;
        expect(element.subscription.canAutoSubscribe, 'canAutoSubscribe').to.be.false;

      });


      it('fires "apollo-controller-connected"', function() {
        const { type } = E.ApolloControllerConnectedEvent;
        const [event] = handlers[type].lastCall.args;
        expect(event.controller, 'controller').to.equal(element.subscription);
        expect(event.type, 'type').to.equal(type);
      });

      describe('when disconnecting', function() {
        beforeEach(resetSpies);
        beforeEach(() => element.remove());
        beforeEach(nextFrame);
        it('fires event on disconnect', function() {
          const { type } = E.ApolloControllerDisconnectedEvent;
          const [event] = handlers[type].lastCall.args;
          expect(event.controller, 'controller').to.equal(element.subscription);
          expect(event.type, 'type').to.equal(type);
        });
      });

      describe('without setting query or variables', function() {
        describe('subscribe()', function() {
          it('throws', function() {
            expect(() => element.subscription.subscribe())
              .to.throw('No Apollo client');
          });
        });

        describe('subscribe({ subscription })', function() {
          it('throws', function() {
            expect(() => element.subscription.subscribe({
              subscription: S.NullableParamSubscription,
            })).to.throw('No Apollo client');
          });
        });

        describe('subscribe()', function() {
          it('throws', async function() {
            try {
              element.subscription.subscribe();
              expect.fail('did not throw');
            } catch (error) {
              expect((error as Error).message).to.match(/^No Apollo client/);
            }
          });
        });

        describe('subscribe({ subscription })', function() {
          it('throws', function() {
            try {
              element.subscription.subscribe({
                subscription: S.NullableParamSubscription,
              });
              expect.fail('did not throw');
            } catch (error) {
              expect((error as Error).message).to.match(/^No Apollo client/);
            }
          });
        });
      });

      describe('setting NullableParam query', function() {
        let subscribeSpy: ReturnType<typeof hanbi.stubMethod>;
        beforeEach(function() { subscribeSpy = hanbi.stubMethod(element.subscription, 'subscribe').passThrough(); });
        afterEach(function() { subscribeSpy.restore(); });

        beforeEach(function setNullableParamSubscription() {
          element.subscription.subscription = S.NullableParamSubscription;
        });

        beforeEach(nextFrame);

        it('does not call subscribe', function() {
          expect(subscribeSpy.called).to.be.false;
        });

        describe('then setting variables', function() {
          beforeEach(function setVariables() {
            element.subscription.variables = { nullable: '✈' };
          });

          beforeEach(nextFrame);

          it('does not call subscribe', function() {
            expect(subscribeSpy.called).to.be.false;
          });
        });

        describe('subscribe()', function() {
          it('throws', function() {
            try {
              element.subscription.subscribe();
              expect.fail('did not throw');
            } catch (error) {
              expect((error as Error).message).to.match(/^No Apollo client/);
            }
          });
        });

        describe('subscribe({ query })', function() {
          it('throws', function() {
            try {
              element.subscription.subscribe({
                subscription: S.NonNullableParamSubscription,
              });
              expect.fail('did not throw');
            } catch (error) {
              expect((error as Error).message).to.match(/^No Apollo client/);
            }
          });
        });
      });
    });

    describe('with global client', function() {
      beforeEach(setupClient);

      beforeEach(() => mockQueriesInCache());

      afterEach(teardownClient);

      describe('setting shouldSubscribe to constant false', function() {
        let element: MirroringHost<typeof S.NullableParamSubscription>;
        const onDataSpy = hanbi.spy();
        const onErrorSpy = hanbi.spy();

        afterEach(() => {
          onDataSpy.reset();
          onErrorSpy.reset();
        });

        beforeEach(async function define() {
          class HelloSubscriptionHost extends MirroringHost<typeof S.NullableParamSubscription> {
            subscription = new ApolloSubscriptionController(this, S.NullableParamSubscription, {
              shouldSubscribe: () => false,
              onData: onDataSpy.handler,
              onError: onErrorSpy.handler,
            });
          }

          const tag = defineCE(HelloSubscriptionHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        let clientSubscribeSpy: ReturnType<typeof hanbi.stubMethod>;
        beforeEach(function spyClientSubscription() {
          clientSubscribeSpy = hanbi.stubMethod(element.subscription.client!, 'subscribe').passThrough();
        });

        afterEach(function restoreClientSubscription() {
          clientSubscribeSpy.restore();
        });

        it('cannot auto subscribe', function() {
          expect(element.subscription.canAutoSubscribe).to.be.false;
        });

        it('reads document from query', function() {
          expect(element.subscription.subscription)
            .to.be.ok
            .and.to.equal(element.subscription.document);
        });

        describe('setting subscription', function() {
          beforeEach(function() {
            element.subscription.subscription = S.NullableParamSubscription;
          });
          it('sets document', function() {
            expect(element.subscription.document).to.equal(S.NullableParamSubscription);
          });
          it('does not call client.subscribe()', function() {
            expect(clientSubscribeSpy.called).to.be.false;
          });
          describe('then calling subscribe', function() {
            beforeEach(() => element.subscription.subscribe());
            it('sets loading', function() {
              expect(element.subscription.loading).to.be.true;
            });
            describe('when subscription resolves', function() {
              beforeEach(() => aTimeout(50));
              it('refetches', function() {
                expect(element.subscription.data?.nullableParam?.nullable).to.be.a.string;
              });
              it('unsets loading', function() {
                expect(element.subscription.loading).to.be.false;
              });
            });
          });
        });

        beforeEach(() => aTimeout(100));

        it('does not fetch data', function() {
          expect(onDataSpy.called).to.be.false;
          expect(onErrorSpy.called).to.be.false;
        });

        describe('when query will reject', function() {
          beforeEach(function() { element.subscription.variables = { nullable: 'error' }; });
          describe('calling subscribe()', function() {
            beforeEach(function() { element.subscription.subscribe(); });
            beforeEach(() => aTimeout(200));
            it('calls onError', function() {
              expect(onErrorSpy.called).to.be.true;
              expect(onErrorSpy.lastCall.args[0]).to.be.ok;
              expect(onErrorSpy.lastCall.args[0]).to.have.property('message');
            });
          });
        });
      });

      describe('with noAutoSubscribe option and NullableParamSubscription', function() {
        let element: MirroringHost<typeof S.NullableParamSubscription>;
        const onDataSpy = hanbi.spy();
        const onErrorSpy = hanbi.spy();

        afterEach(() => {
          onDataSpy.reset();
          onErrorSpy.reset();
        });

        beforeEach(async function define() {
          class HelloSubscriptionHost extends MirroringHost<typeof S.NullableParamSubscription> {
            subscription = new ApolloSubscriptionController(this, S.NullableParamSubscription, {
              noAutoSubscribe: true,
              onData: onDataSpy.handler,
              onError: onErrorSpy.handler,
            });
          }

          const tag = defineCE(HelloSubscriptionHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        let clientSubscribeSpy: ReturnType<typeof hanbi.stubMethod>;
        beforeEach(function spyClientSubscription() {
          clientSubscribeSpy = hanbi.stubMethod(element.subscription.client!, 'subscribe').passThrough();
        });

        afterEach(function restoreClientSubscription() {
          clientSubscribeSpy.restore();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined as unknown as typeof element;
        });

        it('cannot auto subscribe', function() {
          expect(element.subscription.canAutoSubscribe).to.be.false;
        });

        it('does not subscribe', function() {
          expect(onDataSpy.called).to.be.false;
        });

        describe('when subscribe() rejects', function() {
          beforeEach(function() {
            element.subscription.subscribe({ variables: {
              nullable: 'error',
            } });
          });

          beforeEach(() => aTimeout(200));

          it('sets error', function() {
            expect(element.subscription.error).to.be.ok;
            expect(element.subscription.error).to.have.property('message');
            expect(onErrorSpy.called).to.be.true;
            expect(onErrorSpy.lastCall.args[0]).to.be.ok;
            expect(onErrorSpy.lastCall.args[0]).to.have.property('message');
            expect(element.error, 'element error')
              .to.be.ok;
            expect(element.error)
              .to.equal(element.subscription.error);
          });
        });

        describe('with empty options', function() {
          beforeEach(function() {
            element.subscription.options = {};
          });
          describe('subscribe({ variables })', function() {
            beforeEach(function() {
              element.subscription.subscribe({
                variables: {
                  nullable: 'whoop',
                },
              });
            });

            beforeEach(() => aTimeout(50));

            it('refetches and updates state', function() {
              expect(element.subscription.data).to.deep.equal({
                nullableParam: {
                  __typename: 'Nullable',
                  nullable: 'whoop',
                },
              });
            });
          });
        });

        describe('with context option', function() {
          beforeEach(function() {
            element.subscription.options.context = 'none';
          });
          describe('subscribe()', function() {
            beforeEach(() => element.subscription.subscribe());
            it('uses context option', function() {
              expect(clientSubscribeSpy.called).to.be.true;
              expect(clientSubscribeSpy.lastCall.args[0]).to.include({
                context: 'none',
              });
            });
          });
          describe('subscribe({ context })', function() {
            const context = {};
            beforeEach(() => clientSubscribeSpy.reset());
            beforeEach(() => element.subscription.subscribe({ context }));
            it('uses provided context', function() {
              expect(clientSubscribeSpy.called).to.be.true;
              expect(clientSubscribeSpy.lastCall.args[0]).to.include({
                context,
              });
            });
          });
        });

        describe('with errorPolicy option', function() {
          beforeEach(function() {
            element.subscription.options.errorPolicy = 'none';
          });
          describe('subscribe()', function() {
            beforeEach(() => element.subscription.subscribe());
            it('uses errorPolicy option', function() {
              expect(clientSubscribeSpy.called).to.be.true;
              expect(clientSubscribeSpy.lastCall.args[0]).to.include({
                errorPolicy: 'none',
              });
            });
          });
          describe('subscribe({ errorPolicy })', function() {
            beforeEach(() => clientSubscribeSpy.reset());
            beforeEach(() => element.subscription.subscribe({ errorPolicy: 'all' }));
            it('uses provided errorPolicy', function() {
              expect(clientSubscribeSpy.called).to.be.true;
              expect(clientSubscribeSpy.lastCall.args[0]).to.include({
                errorPolicy: 'all',
              });
            });
          });
        });

        describe('with fetchPolicy option', function() {
          beforeEach(function() {
            element.subscription.options.fetchPolicy = 'no-cache';
          });
          describe('subscribe()', function() {
            beforeEach(() => element.subscription.subscribe());
            it('uses fetchPolicy option', function() {
              expect(clientSubscribeSpy.called).to.be.true;
              expect(clientSubscribeSpy.lastCall.args[0]).to.include({
                fetchPolicy: 'no-cache',
              });
            });
          });
          describe('subscribe({ fetchPolicy })', function() {
            beforeEach(() => element.subscription.subscribe({ fetchPolicy: 'cache-first' }));
            it('uses provided fetchPolicy', function() {
              expect(clientSubscribeSpy.called).to.be.true;
              expect(clientSubscribeSpy.lastCall.args[0]).to.include({
                fetchPolicy: 'cache-first',
              });
            });
          });
        });

        describe('with shouldResubscribe option', function() {
          beforeEach(function() {
            element.subscription.options.shouldResubscribe = true;
          });
          describe('calling subscribe()', function() {
            function callSubscribe() { element.subscription.subscribe(); }
            beforeEach(callSubscribe);
            describe('then calling subscribe() again', function() {
              beforeEach(callSubscribe);
              it('calls client.subscribe() twice', function() {
                expect(clientSubscribeSpy.callCount).to.equal(2);
              });
              describe('then calling subscribe({ shouldResubscribe: false })', function() {
                beforeEach(() => element.subscription.subscribe({ shouldResubscribe: false }));
                it('does not calls client.subscribe() thrice', function() {
                  expect(clientSubscribeSpy.callCount).to.equal(2);
                });
              });
            });
          });
          describe('calling subscribe({ shouldResubscribe: false })', function() {
            function callSubscribe() {
              element.subscription.subscribe({ shouldResubscribe: false });
            }
            beforeEach(callSubscribe);
            describe('then calling subscribe({ shouldResubscribe: false }) again', function() {
              beforeEach(callSubscribe);
              it('does not calls client.subscribe() twice', function() {
                expect(clientSubscribeSpy.callCount).to.equal(1);
              });
            });
          });
        });

        describe('with skip option', function() {
          beforeEach(function() {
            element.subscription.options.skip = true;
          });
          describe('calling subscribe()', function() {
            function callSubscribe() { element.subscription.subscribe(); }
            beforeEach(callSubscribe);
            describe('then calling subscribe() again', function() {
              beforeEach(callSubscribe);
              it('does not call client.subscribe() even once', function() {
                expect(clientSubscribeSpy.called).to.be.false;
              });
              describe('then calling subscribe({ skip: false })', function() {
                beforeEach(() => element.subscription.subscribe({ skip: false }));
                it('calls client.subscribe() once', function() {
                  expect(clientSubscribeSpy.callCount).to.equal(1);
                });
              });
            });
          });
        });

        describe('subscribe()', function() {
          function callSubscribe() { element.subscription.subscribe(); }
          beforeEach(callSubscribe);

          beforeEach(() => aTimeout(50));

          it('calls client.subscribe() with controller subscription', function() {
            expect(clientSubscribeSpy.called).to.be.true;
            expect(clientSubscribeSpy.lastCall.args[0]).to.include({
              query: S.NullableParamSubscription,
            });
          });

          it('refetches and updates state', function() {
            const data = {
              nullableParam: {
                __typename: 'Nullable',
                nullable: 'Hello World',
              },
            };
            expect(element.subscription.data).to.deep.equal(data);
            expect(onDataSpy.callCount).to.equal(1);
          });

          describe('then calling subscribe() again', function() {
            beforeEach(callSubscribe);
            it('does not call client.subscribe() a second time', function() {
              expect(clientSubscribeSpy.callCount).to.equal(1);
            });
          });
        });

        describe('subscribe({ subscription })', function() {
          beforeEach(function() {
            element.subscription.subscribe({ subscription: S.NullableParamSubscription });
          });

          beforeEach(nextFrame);

          it('calls client.subscribe() with passed subscribe', function() {
            expect(clientSubscribeSpy.called).to.be.true;
            expect(clientSubscribeSpy.lastCall.args[0]).to.include({
              subscription: S.NullableParamSubscription,
            });
          });
        });

        describe('subscribe({ variables })', function() {
          beforeEach(function() {
            element.subscription.subscribe({
              variables: {
                nullable: 'שלום עליכם, רבי ומורי',
              },
            });
          });

          beforeEach(() => aTimeout(50));

          it('refetches and updates state', function() {
            expect(element.data).to.deep.equal({
              nullableParam: {
                __typename: 'Nullable',
                nullable: 'שלום עליכם, רבי ומורי',
              },
            });
          });
        });
      });

      describe('with NullableParamSubscription', function() {
        let element: MirroringHost<typeof S.NullableParamSubscription>;
        const onDataSpy = hanbi.spy();
        const onCompleteSpy = hanbi.spy();
        const onErrorSpy = hanbi.spy();

        beforeEach(async function define() {
          class HelloSubscriptionHost extends MirroringHost<typeof S.NullableParamSubscription> {
            subscription = new ApolloSubscriptionController(this, S.NullableParamSubscription, {
              onData: onDataSpy.handler,
              onComplete: onCompleteSpy.handler,
              onError: onErrorSpy.handler,
            });
          }

          const tag = defineCE(HelloSubscriptionHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        let querySpy: ReturnType<typeof hanbi.stubMethod>;
        let subscribeSpy: ReturnType<typeof hanbi.stubMethod>;
        beforeEach(() => {
          querySpy = hanbi.stubMethod(element.subscription.client!, 'query').passThrough();
          subscribeSpy = hanbi.stubMethod(element.subscription.client!, 'subscribe').passThrough();
        });

        afterEach(() => {
          querySpy.restore();
          subscribeSpy.restore();
        });

        beforeEach(() => aTimeout(50));

        it('sets data, error, and loading', function() {
          expect(element.subscription.data, 'data')
            .to.equal(element.data);
          expect(element.subscription.data)
            .to.not.be.undefined;
          expect(element.subscription.data?.nullableParam?.nullable, 'data.nullableParam.nullable')
            .to.equal('Hello World');
          expect(element.subscription.loading, 'loading')
            .to.equal(element.loading);
          expect(element.subscription.loading)
            .to.be.false;
          expect(element.subscription.error, 'error')
            .to.equal(element.error);
          expect(element.subscription.error)
            .to.not.be.ok;
        });

        it('calls onData', function() {
          // Apollo Client v4: onData may be called multiple times during subscription lifecycle
          expect(onDataSpy.callCount).to.equal(2);
          const [firstArg] = onDataSpy.lastCall.args;
          expect(firstArg.subscriptionData).to.deep.include({
            loading: false,
            error: null,
            data: {
              nullableParam: {
                __typename: 'Nullable',
                nullable: 'Hello World',
              },
            },
          });

          const [{ client }] = onDataSpy.lastCall.args;
          expect(client).to.equal(element.subscription.client);
        });

        describe('setting subscription variables', function() {
          beforeEach(function() {
            element.subscription.variables = {
              nullable: 'אין עוד מלבדו',
            };
          });

          beforeEach(() => aTimeout(50));

          it('refetches', function() {
            // Apollo Client v4: initial (null+data) + refetch (null+data) = 4 calls
            expect(onDataSpy.callCount).to.equal(4);
            const [{ client, subscriptionData, ...res }] =
              onDataSpy.lastCall.args;
            expect(res).to.be.empty;
            expect(client, 'client')
              .to.equal(element.subscription.client);
            expect(client)
              .to.equal(window.__APOLLO_CLIENT__);
            expect(subscriptionData, 'client').to.deep.equal({
              loading: false,
              error: null,
              data: {
                nullableParam: {
                  __typename: 'Nullable',
                  nullable: 'אין עוד מלבדו',
                },
              },
            });
            expect(element.data, 'element.data')
              .to.equal(element.subscription.data);
            expect(element.data).to.deep.equal({
              nullableParam: {
                __typename: 'Nullable',
                nullable: 'אין עוד מלבדו',
              },
            });
          });
        });

        describe('removing then appending the element', function() {
          let subscribeMethodSpy: ReturnType<typeof hanbi.stubMethod>;
          beforeEach(function() {
            subscribeMethodSpy = hanbi.stubMethod(element.subscription, 'subscribe').passThrough();
          });

          beforeEach(function() {
            const container = element.parentElement!;
            element.remove();
            container.append(element);
          });

          beforeEach(nextFrame);

          it('resubscribes on connect', function() {
            expect(subscribeMethodSpy.called).to.be.true;
          });
        });
      });

      describe('with MessageSentSubscription', function() {
        let element: MirroringHost<typeof S.MessageSentSubscription>;
        const onDataSpy = hanbi.spy();

        beforeEach(resetMessages);
        afterEach(resetMessages);

        beforeEach(async function define() {
          class HelloSubscriptionHost extends MirroringHost<typeof S.MessageSentSubscription> {
            declare shadowRoot: ShadowRoot;

            constructor() {
              super();
              this.attachShadow({ mode: 'open' }).innerHTML = `<ol></ol>`;
            }

            onDataImpl = ({ subscriptionData: { data } }: any) => {
              onDataSpy.handler();
              const li = document.createElement('li');
              li.textContent = data?.messageSent?.message ?? '';
              this.shadowRoot.querySelector('ol')?.appendChild(li);
            };

            subscription = new ApolloSubscriptionController(this, S.MessageSentSubscription, {
              onData: this.onDataImpl,
            });

            data?: ResultOf<typeof S.MessageSentSubscription>;
          }

          const tag = defineCE(HelloSubscriptionHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        it('renders initial data', function() {
          expect(onDataSpy.callCount).to.equal(1);
          expect(element).shadowDom.to.equal(`
            <ol>
              <li>Message 1</li>
            </ol>
          `);
        });
      });
    });
  });
});
