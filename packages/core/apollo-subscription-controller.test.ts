import type { TypedDocumentNode, ResultOf } from '@graphql-typed-document-node/core';

import * as S from '@apollo-elements/test/schema';

import * as E from './events';

import { update } from './apollo-controller';

import { ApolloError } from '@apollo/client/core';

import { ReactiveElement } from 'lit';

import { ApolloSubscriptionController } from './apollo-subscription-controller';

import { aTimeout, defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { resetMessages, setupClient, teardownClient } from '@apollo-elements/test';

import { spy, SinonSpy } from 'sinon';

describe('[core] ApolloSubscriptionController', function() {
  describe('on a ReactiveElement that mirrors props', function() {
    class MirroringHost<D extends TypedDocumentNode<any, any> = TypedDocumentNode<any, any>>
      extends ReactiveElement {
      declare subscription: D extends TypedDocumentNode<infer TD, infer TV>
        ? ApolloSubscriptionController<TD, TV>
        : ApolloSubscriptionController<any, any>;

      data?: this['subscription']['data'];
      error?: this['subscription']['error'];
      errors?: this['subscription']['errors'];
      loading?: boolean;

      updated() {
        this.data = this.subscription?.data;
        this.error = this.subscription?.error;
        this.errors = this.subscription?.errors;
        this.loading = this.subscription?.loading;
      }
    }

    describe('when simply instantiating', function() {
      let element: MirroringHost;

      const resetSpies = () => Object.values(handlers).forEach(h => h.resetHistory());

      const handlers = {
        [E.ApolloControllerConnectedEvent.type]: spy(),
        [E.ApolloControllerDisconnectedEvent.type]: spy(),
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
          subscription = new ApolloSubscriptionController<any>(this);
        });
        element = await fixture(`<${tag}></${tag}>`);
      });

      it('has default properties', function() {
        /* eslint-disable max-len */
        // fields
        expect(element.subscription.client, 'client').to.not.be.ok;
        expect(element.subscription.data, 'data').to.not.be.ok;
        expect(element.subscription.error, 'error').to.not.be.ok;
        expect(element.subscription.errors, 'errors').to.be.empty;
        expect(element.subscription.options, 'options').to.be.empty;
        expect(element.subscription.subscription, 'query').to.not.be.ok;
        expect(element.subscription.variables, 'variables').to.not.be.ok;
        expect(element.subscription.canAutoSubscribe, 'canAutoSubscribe').to.be.false;
        /* eslint-enable max-len */
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

      describe('calling [update]()', function() {
        let requestUpdateSpy: SinonSpy;
        beforeEach(() => requestUpdateSpy = spy(element, 'requestUpdate'));
        afterEach(() => requestUpdateSpy.restore());
        beforeEach(() => element.subscription[update]());
        it('updates the host', function() {
          expect(requestUpdateSpy).to.have.been.calledOnce;
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
        let subscribeSpy: SinonSpy;
        beforeEach(function() { subscribeSpy = spy(element.subscription, 'subscribe'); });
        afterEach(function() { subscribeSpy.restore(); });

        beforeEach(function setNullableParamSubscription() {
          element.subscription.subscription = S.NullableParamSubscription;
        });

        beforeEach(nextFrame);

        it('does not call subscribe', function() {
          expect(element.subscription.subscribe).to.not.have.been.called;
        });

        describe('then setting variables', function() {
          beforeEach(function setVariables() {
            element.subscription.variables = { nullable: '✈' };
          });

          beforeEach(nextFrame);

          it('does not call subscribe', function() {
            expect(element.subscription.subscribe).to.not.have.been.called;
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

      afterEach(teardownClient);

      describe('setting shouldSubscribe to constant false', function() {
        let element: MirroringHost<typeof S.NullableParamSubscription>;

        beforeEach(async function define() {
          class HelloSubscriptionHost extends MirroringHost<typeof S.NullableParamSubscription> {
            subscription = new ApolloSubscriptionController(this, S.NullableParamSubscription, {
              shouldSubscribe: () => false,
              onData: spy(),
              onError: spy(),
            });
          }

          const tag = defineCE(HelloSubscriptionHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(function spyClientSubscription() {
          spy(element.subscription.client!, 'subscribe');
        });

        afterEach(function restoreClientSubscription() {
          (element.subscription.client?.subscribe as SinonSpy).restore?.();
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
            expect(element.subscription.client?.subscribe).to.not.have.been.called;
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
          expect(element.subscription?.options?.onData).to.not.have.been.called;
          expect(element.subscription?.options?.onError).to.not.have.been.called;
        });

        describe('when query will reject', function() {
          beforeEach(function() { element.subscription.variables = { nullable: 'error' }; });
          describe('calling subscribe()', function() {
            beforeEach(function() { element.subscription.subscribe(); });
            beforeEach(nextFrame);
            it('calls onError', function() {
              expect(element.subscription.options.onError).to.have.been.calledWithMatch({
                message: 'error',
              });
            });
          });
        });
      });

      describe('with noAutoSubscribe option and NullableParamSubscription', function() {
        let element: MirroringHost<typeof S.NullableParamSubscription>;

        beforeEach(async function define() {
          class HelloSubscriptionHost extends MirroringHost<typeof S.NullableParamSubscription> {
            subscription = new ApolloSubscriptionController(this, S.NullableParamSubscription, {
              noAutoSubscribe: true,
              onData: spy(),
              onError: spy(),
              onComplete: spy(),
            });
          }

          const tag = defineCE(HelloSubscriptionHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        beforeEach(function spyClientSubscription() {
          spy(element.subscription.client!, 'subscribe');
        });

        afterEach(function restoreClientSubscription() {
          (element.subscription.client?.subscribe as SinonSpy).restore?.();
        });

        afterEach(function teardownElement() {
          element.remove();
          element = undefined as unknown as typeof element;
        });

        it('cannot auto subscribe', function() {
          expect(element.subscription.canAutoSubscribe).to.be.false;
        });

        it('does not subscribe', function() {
          expect(element.subscription.options?.onData).to.not.have.been.called;
        });

        describe('when subscribe() rejects', function() {
          beforeEach(function() {
            element.subscription.subscribe({ variables: {
              nullable: 'error',
            } });
          });

          beforeEach(() => aTimeout(50));

          it('sets error', function() {
            expect(element.subscription.error?.message, 'message').to.equal('error');
            expect(element.subscription.options.onError).to.have.been.calledWithMatch({
              message: 'error',
            });
            expect(element.error, 'element error')
              .to.be.ok
              .and.to.equal(element.subscription.error)
              .and.to.be.an.instanceof(ApolloError);
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
              expect(element.subscription.client!.subscribe).to.have.been.calledWithMatch({
                context: 'none',
              });
            });
          });
          describe('subscribe({ context })', function() {
            const context = {};
            beforeEach(() => (element.subscription.client!.subscribe as SinonSpy).resetHistory?.());
            beforeEach(() => element.subscription.subscribe({ context }));
            it('uses provided context', function() {
              expect(element.subscription.client!.subscribe).to.have.been.calledWithMatch({
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
              expect(element.subscription.client!.subscribe).to.have.been.calledWithMatch({
                errorPolicy: 'none',
              });
            });
          });
          describe('subscribe({ errorPolicy })', function() {
            beforeEach(() => (element.subscription.client!.subscribe as SinonSpy).resetHistory?.());
            beforeEach(() => element.subscription.subscribe({ errorPolicy: 'all' }));
            it('uses provided errorPolicy', function() {
              expect(element.subscription.client!.subscribe).to.have.been.calledWithMatch({
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
              expect(element.subscription.client!.subscribe).to.have.been.calledWithMatch({
                fetchPolicy: 'no-cache',
              });
            });
          });
          describe('subscribe({ fetchPolicy })', function() {
            beforeEach(() => element.subscription.subscribe({ fetchPolicy: 'cache-first' }));
            it('uses provided fetchPolicy', function() {
              expect(element.subscription.client!.subscribe).to.have.been.calledWithMatch({
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
                expect(element.subscription.client?.subscribe).to.have.been.calledTwice;
              });
              describe('then calling subscribe({ shouldResubscribe: false })', function() {
                beforeEach(() => element.subscription.subscribe({ shouldResubscribe: false }));
                it('does not calls client.subscribe() thrice', function() {
                  expect(element.subscription.client?.subscribe).to.have.been.calledTwice;
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
                expect(element.subscription.client?.subscribe).to.have.been.calledOnce;
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
                expect(element.subscription.client?.subscribe).to.not.have.been.called;
              });
              describe('then calling subscribe({ skip: false })', function() {
                beforeEach(() => element.subscription.subscribe({ skip: false }));
                it('calls client.subscribe() once', function() {
                  expect(element.subscription.client?.subscribe).to.have.been.calledOnce;
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
            expect(element.subscription.client?.subscribe).to.have.been.calledWithMatch({
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
            expect(element.subscription.options.onData)
              .to.have.calledOnce
              .and.to.have.been.calledWithMatch({
                subscriptionData: {
                  data,
                  loading: false,
                  error: null,
                },
              });
          });

          describe('then calling subscribe() again', function() {
            beforeEach(callSubscribe);
            it('does not call client.subscribe() a second time', function() {
              expect(element.subscription.client?.subscribe).to.have.been.calledOnce;
            });
          });
        });

        describe('subscribe({ subscription })', function() {
          beforeEach(function() {
            element.subscription.subscribe({ subscription: S.NullableParamSubscription });
          });

          beforeEach(nextFrame);

          it('calls client.subscribe() with passed subscribe', function() {
            expect(element.subscription.client?.subscribe).to.have.been.calledWithMatch({
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

        beforeEach(async function define() {
          class HelloSubscriptionHost extends MirroringHost<typeof S.NullableParamSubscription> {
            subscription = new ApolloSubscriptionController(this, S.NullableParamSubscription, {
              onData: spy(),
              onComplete: spy(),
              onError: spy(),
            });
          }

          const tag = defineCE(HelloSubscriptionHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        let querySpy: SinonSpy;
        let subscribeSpy: SinonSpy;
        beforeEach(() => {
          querySpy = spy(element.subscription.client!, 'query');
          subscribeSpy = spy(element.subscription.client!, 'subscribe');
        });

        afterEach(() => {
          querySpy.restore();
          subscribeSpy.restore();
        });

        beforeEach(() => aTimeout(50));

        it('sets data, error, and loading', function() {
          expect(element.subscription.data, 'data')
            .to.equal(element.data)
            .and.to.not.be.undefined;
          expect(element.subscription.data?.nullableParam?.nullable, 'data.nullableParam.nullable')
            .to.equal('Hello World');
          expect(element.subscription.loading, 'loading')
            .to.equal(element.loading)
            .and.to.be.false;
          expect(element.subscription.error, 'error')
            .to.equal(element.error)
            .and.to.not.be.ok;
        });

        it('calls onData', function() {
          expect(element.subscription.options.onData)
            .to.have.been.calledOnce
            .and.to.have.been.calledWithMatch({
              // client: element.subscription.client,
              subscriptionData: {
                loading: false,
                error: null,
                data: {
                  nullableParam: {
                    nullable: 'Hello World',
                  },
                },
              },
            });

          const [{ client }] = (element.subscription.options.onData as SinonSpy).lastCall.args;
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
            expect(element.subscription.options.onData).to.have.been.calledTwice;
            const [{ client, subscriptionData, ...res }] =
              (element.subscription.options.onData as SinonSpy).lastCall.args;
            expect(res).to.be.empty;
            expect(client, 'client')
              .to.equal(element.subscription.client)
              .and.to.equal(window.__APOLLO_CLIENT__);
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
              .to.equal(element.subscription.data)
              .and.to.deep.equal({
                nullableParam: {
                  __typename: 'Nullable',
                  nullable: 'אין עוד מלבדו',
                },
              });
          });
        });

        describe('removing then appending the element', function() {
          beforeEach(function() {
            spy(element.subscription, 'subscribe');
          });

          beforeEach(function() {
            const container = element.parentElement!;
            element.remove();
            container.append(element);
          });

          beforeEach(nextFrame);

          it('resubscribes on connect', function() {
            expect(element.subscription.subscribe).to.have.been.called;
          });
        });
      });

      describe('with MessageSentSubscription', function() {
        let element: MirroringHost<typeof S.MessageSentSubscription>;

        beforeEach(resetMessages);
        afterEach(resetMessages);

        beforeEach(async function define() {
          class HelloSubscriptionHost extends MirroringHost<typeof S.MessageSentSubscription> {
            declare shadowRoot: ShadowRoot;

            constructor() {
              super();
              this.attachShadow({ mode: 'open' }).innerHTML = `<ol></ol>`;
            }

            subscription = new ApolloSubscriptionController(this, S.MessageSentSubscription, {
              onData: spy(({ subscriptionData: { data } }) => {
                const li = document.createElement('li');
                li.textContent = data?.messageSent?.message ?? '';
                this.shadowRoot.querySelector('ol')?.appendChild(li);
              }),
            });

            data?: ResultOf<typeof S.MessageSentSubscription>;
          }

          const tag = defineCE(HelloSubscriptionHost);

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        it('renders initial data', function() {
          expect(element.subscription.options.onData).to.have.been.calledOnce;
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
