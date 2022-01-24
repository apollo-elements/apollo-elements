import * as S from '@apollo-elements/test/schema';

import type { ApolloSubscriptionController } from '@apollo-elements/core';

import { c, html, useEffect, useState, useRef, useLayoutEffect } from 'atomico';
import { useSubscription } from './useSubscription';

import { aTimeout, defineCE, expect, nextFrame } from '@open-wc/testing';

import { fixture } from 'atomico/test-dom';

import { ApolloError } from '@apollo/client/core';

import { setupClient, teardownClient, resetMessages } from '@apollo-elements/test';

import { spy, SinonSpy } from 'sinon';

describe('[atomico] useSubscription', function() {
  describe('with noAutoSubscribe set', function() {
    let element: HTMLElement & { updated: Promise<void> };
    beforeEach(async function define() {
      function Renderer() {
        const { data } = useSubscription(S.NullableParamSubscription, { noAutoSubscribe: true });
        return html`<host shadowDom>${data?.nullableParam?.nullable ?? 'nothing'}</host>`;
      }
      const Component = c(Renderer) as any;
      defineCE(Component);
      element = fixture(html`<${Component}></${Component}>`);
      await element.updated;
    });

    beforeEach(nextFrame);

    it('renders nothing', function() {
      expect(element).shadowDom.to.equal('nothing');
    });
  });

  describe('without options', function() {
    let options: ApolloSubscriptionController<
      S.NullableParamSubscriptionData,
      S.NullableParamSubscriptionVariables
    >['options'];

    beforeEach(async function define() {
      function Renderer() {
        const { options: opts } = useSubscription(S.NullableParamSubscription);
        options = opts;
        return html`<host></host>`;
      }
      const Component = c(Renderer) as any;
      defineCE(Component);
      const element = fixture(html`<${Component}></${Component}>`);
      // @ts-expect-error: upstream types
      await element.updated;
    });

    beforeEach(nextFrame);
    afterEach(() => options = undefined as unknown as typeof options);

    it('sets empty options', function() {
      expect(options).to.be.empty;
    });
  });

  describe('with shouldSubscribe set to constant false', function() {
    let element: HTMLElement & { updated: Promise<void> };

    let doSubscribe: ApolloSubscriptionController<
      S.NullableParamSubscriptionData,
      S.NullableParamSubscriptionVariables
    >['subscribe'];

    beforeEach(async function define() {
      function Renderer() {
        const { data, subscribe } = useSubscription(S.NullableParamSubscription, {
          shouldSubscribe: () => false,
        });

        doSubscribe = subscribe;

        return html`<host shadowDom>${data?.nullableParam?.nullable ?? 'nothing'}</host>`;
      }

      const Component = c(Renderer) as any;
      defineCE(Component);
      element = fixture(html`<${Component}></${Component}>`);
      await element.updated;
    });

    beforeEach(nextFrame);

    it('renders nothing', function() {
      expect(element).shadowDom.to.equal('nothing');
    });

    describe('without setting query or variables', function() {
      describe('subscribe()', function() {
        it('throws', function() {
          expect(() => doSubscribe())
            .to.throw('No Apollo client');
        });
      });
    });
  });

  describe('with global client', function() {
    beforeEach(setupClient);

    afterEach(teardownClient);

    describe('README examples', function() {
      describe('without variables', function() {
        let element: HTMLElement & { updated: Promise<void> };

        let sub: ApolloSubscriptionController<
          S.NoParamSubscriptionData,
          S.NoParamSubscriptionVariables
        >['subscribe'];

        beforeEach(async function define() {
          function Renderer() {
            const { data, error, loading, subscribe } = useSubscription(S.NoParamSubscription, {
              noAutoSubscribe: true,
            });

            useEffect(() => { sub = subscribe; }, [subscribe]);

            const spinRef = useRef();
            useLayoutEffect(() => {
              spinRef.current.toggleAttribute('active', loading);
            }, [loading]);

            return html`
              <host shadowDom>
                <what-spin-such-loader ref=${spinRef}></what-spin-such-loader>
                <article id="error" hidden=${!error}>
                  <h2>${'😢 Such Sad, Very Error! 😰'}</h2>
                  <pre><code>${error?.message}</code></pre>
                </article>
                <p>${data?.noParam!.noParam ?? 'fail'}</p>
              </host>
            `;
          }

          const Component = c(Renderer) as any;
          defineCE(Component);
          element = fixture(html`<${Component}></${Component}>`);
          await element.updated;
        });

        beforeEach(() => sub());

        describe('on mount', function() {
          beforeEach(() => element.updated);
          it('renders loading state', function() {
            expect(element).shadowDom.to.equal(`
              <what-spin-such-loader active></what-spin-such-loader>
              <article id="error" hidden>
                <h2>${'😢 Such Sad, Very Error! 😰'}</h2>
                <pre><code></code></pre>
              </article>
              <p>fail</p>
            `);
          });
        });
        describe('eventually', function() {
          beforeEach(() => aTimeout(20));
          it('renders data', function() {
            expect(element).shadowDom.to.equal(`
              <what-spin-such-loader></what-spin-such-loader>
              <article id="error" hidden>
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code></code></pre>
              </article>
              <p>noParam</p>
            `);
          });
        });
      });

      describe('with variables', function() {
        let element: HTMLElement & { updated: Promise<void> };

        let sub: ApolloSubscriptionController<typeof S.NullableParamSubscription>['subscribe'];

        beforeEach(async function define() {
          function Renderer() {
            const { data, error, loading, subscribe } =
              useSubscription(S.NullableParamSubscription, {
                noAutoSubscribe: true,
                variables: {
                  nullable: 'POW',
                  delay: 20,
                },
              });

            // @ts-expect-error: whatev
            useEffect(() => { sub = subscribe; }, [subscribe]);

            const spinRef = useRef();
            useLayoutEffect(() => {
              spinRef.current.toggleAttribute('active', loading);
            }, [loading]);

            const nullable = data?.nullableParam!.nullable ?? 'NullableParam';

            return html`
              <host shadowDom>
                <what-spin-such-loader ref=${spinRef}></what-spin-such-loader>
                <article id="error" hidden=${!error}>
                  <h2>${'😢 Such Sad, Very Error! 😰'}</h2>
                  <pre><code>${error?.message}</code></pre>
                </article>
                <p>${nullable}</p>
              </host>
            `;
          }

          const Component = c(Renderer) as any;
          defineCE(Component);
          element = fixture(html`<${Component}></${Component}>`);
          await element.updated;
        });

        beforeEach(() => sub());

        beforeEach(nextFrame);

        it('renders loading state', function() {
          expect(element).shadowDom.to.equal(`
            <what-spin-such-loader active></what-spin-such-loader>
            <article id="error" hidden>
              <h2>😢 Such Sad, Very Error! 😰</h2>
              <pre><code></code></pre>
            </article>
            <p>NullableParam</p>
          `);
        });
        describe('eventually', function() {
          beforeEach(() => aTimeout(20));
          it('renders data', function() {
            expect(element).shadowDom.to.equal(`
              <what-spin-such-loader></what-spin-such-loader>
              <article id="error" hidden>
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code></code></pre>
              </article>
              <p>POW</p>
            `);
          });
        });
      });
    });

    describe('setting shouldSubscribe to constant false', function() {
      let element: HTMLElement & {
        subscription: ApolloSubscriptionController<
          S.NullableParamSubscriptionData,
          S.NullableParamSubscriptionVariables
        >
      };

      let subscription: typeof element['subscription'];

      beforeEach(async function define() {
        const Component = c(
          function Renderer() {
            subscription =
              useSubscription(S.NullableParamSubscription, {
                shouldSubscribe: () => false,
                onData: spy(),
                onError: spy(),
              });
            return html`<host></host>`;
          }
        );
        defineCE(Component as any);
        element = fixture(html`<${Component}></${Component}>`);
        // @ts-expect-error: upstream types
        await element.updated;
      });

      it('reads document from query', function() {
        expect(subscription.subscription)
          .to.be.ok
          .and.to.equal(subscription.document);
      });

      describe('setting subscription', function() {
        beforeEach(function() {
          subscription.subscription = S.NullableParamSubscription;
        });
        it('sets document', function() {
          expect(subscription.document).to.equal(S.NullableParamSubscription);
        });
        describe('then calling subscribe', function() {
          beforeEach(() => subscription.subscribe());
          it('sets loading', function() {
            expect(subscription.loading).to.be.true;
          });
          describe('when subscription resolves', function() {
            beforeEach(() => aTimeout(50));
            it('refetches', function() {
              expect(subscription.data?.nullableParam?.nullable).to.be.a.string;
            });
            it('unsets loading', function() {
              expect(subscription.loading).to.be.false;
            });
          });
        });
      });

      beforeEach(() => aTimeout(100));

      it('does not fetch data', function() {
        expect(subscription?.options?.onData).to.not.have.been.called;
        expect(subscription?.options?.onError).to.not.have.been.called;
      });

      describe('when query will reject', function() {
        beforeEach(function() { subscription.variables = { nullable: 'error' }; });
        describe('calling subscribe()', function() {
          beforeEach(function() { subscription.subscribe(); });
          beforeEach(nextFrame);
          it('calls onError', function() {
            expect(subscription.options.onError).to.have.been.calledWithMatch({
              message: 'error',
            });
          });
        });
      });
    });

    describe('with noAutoSubscribe option and NullableParamSubscription', function() {
      let element: HTMLElement & { subscription: ApolloSubscriptionController<any> };

      let s: ApolloSubscriptionController<
        S.NullableParamSubscriptionData,
        S.NullableParamSubscriptionVariables
      >;

      beforeEach(async function define() {
        function Renderer(this: typeof element) {
          const subscription = useSubscription(S.NullableParamSubscription, {
            noAutoSubscribe: true,
            onData: spy(),
            onError: spy(),
            onComplete: spy(),
          });
          useEffect(() => { s = subscription; }, [subscription]);
          return html`<host></host>`;
        }

        const Component = c(Renderer) as any;
        defineCE(Component);
        element = fixture(html`<${Component}></${Component}>`);
        // @ts-expect-error: upstream types
        await element.updated;
      });

      beforeEach(nextFrame);

      beforeEach(function spyClientSubscription() {
        spy(s.client!, 'subscribe');
      });

      afterEach(function restoreClientSubscription() {
        (s.client?.subscribe as SinonSpy).restore?.();
      });

      afterEach(function teardownElement() {
        element.remove();
        element = undefined as unknown as typeof element;
        s = undefined as unknown as typeof s;
      });

      it('does not subscribe', function() {
        expect(s.options?.onData).to.not.have.been.called;
      });

      describe('when subscribe() rejects', function() {
        beforeEach(function() {
          s.subscribe({ variables: {
            nullable: 'error',
          } });
        });

        beforeEach(() => aTimeout(50));

        it('sets error', function() {
          expect(s.error?.message, 'message').to.equal('error');
          expect(s.options.onError).to.have.been.calledWithMatch({
            message: 'error',
          });
          expect(s.error, 'element error')
            .to.be.ok
            .and.to.equal(s.error)
            .and.to.be.an.instanceof(ApolloError);
        });
      });

      describe('with empty options', function() {
        beforeEach(function() {
          s.options = {};
        });
        describe('subscribe({ variables })', function() {
          beforeEach(function() {
            s.subscribe({
              variables: {
                nullable: 'whoop',
              },
            });
          });

          beforeEach(() => aTimeout(50));

          it('refetches and updates state', function() {
            expect(s.data).to.deep.equal({
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
          s.options.context = 'none';
        });
        describe('subscribe()', function() {
          beforeEach(() => s.subscribe());
          it('uses context option', function() {
            expect(s.client!.subscribe).to.have.been.calledWithMatch({
              context: 'none',
            });
          });
        });
        describe('subscribe({ context })', function() {
          const context = {};
          beforeEach(() => (s.client!.subscribe as SinonSpy).resetHistory?.());
          beforeEach(() => s.subscribe({ context }));
          it('uses provided context', function() {
            expect(s.client!.subscribe).to.have.been.calledWithMatch({
              context,
            });
          });
        });
      });

      describe('with errorPolicy option', function() {
        beforeEach(function() {
          s.options.errorPolicy = 'none';
        });
        describe('subscribe()', function() {
          beforeEach(() => s.subscribe());
          it('uses errorPolicy option', function() {
            expect(s.client!.subscribe).to.have.been.calledWithMatch({
              errorPolicy: 'none',
            });
          });
        });
        describe('subscribe({ errorPolicy })', function() {
          beforeEach(() => (s.client!.subscribe as SinonSpy).resetHistory?.());
          beforeEach(() => s.subscribe({ errorPolicy: 'all' }));
          it('uses provided errorPolicy', function() {
            expect(s.client!.subscribe).to.have.been.calledWithMatch({
              errorPolicy: 'all',
            });
          });
        });
      });

      describe('with fetchPolicy option', function() {
        beforeEach(function() {
          s.options.fetchPolicy = 'no-cache';
        });
        describe('subscribe()', function() {
          beforeEach(() => s.subscribe());
          it('uses fetchPolicy option', function() {
            expect(s.client!.subscribe).to.have.been.calledWithMatch({
              fetchPolicy: 'no-cache',
            });
          });
        });
        describe('subscribe({ fetchPolicy })', function() {
          beforeEach(() => s.subscribe({ fetchPolicy: 'cache-first' }));
          it('uses provided fetchPolicy', function() {
            expect(s.client!.subscribe).to.have.been.calledWithMatch({
              fetchPolicy: 'cache-first',
            });
          });
        });
      });

      describe('with shouldResubscribe option', function() {
        beforeEach(function() {
          s.options.shouldResubscribe = true;
        });
        describe('calling subscribe()', function() {
          function callSubscribe() { s.subscribe(); }
          beforeEach(callSubscribe);
          describe('then calling subscribe() again', function() {
            beforeEach(callSubscribe);
            it('calls client.subscribe() twice', function() {
              expect(s.client?.subscribe).to.have.been.calledTwice;
            });
          });
        });
      });

      describe('subscribe()', function() {
        function callSubscribe() { s.subscribe(); }
        beforeEach(callSubscribe);

        beforeEach(() => aTimeout(50));

        it('calls client.subscribe() with controller subscription', function() {
          expect(s.client?.subscribe).to.have.been.calledWithMatch({
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
          expect(s.data).to.deep.equal(data);
          expect(s.options.onData)
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
            expect(s.client?.subscribe).to.have.been.calledOnce;
          });
        });
      });

      describe('subscribe({ subscription })', function() {
        beforeEach(function() {
          s.subscribe({ subscription: S.NullableParamSubscription });
        });

        beforeEach(nextFrame);

        it('calls client.subscribe() with passed subscribe', function() {
          expect(s.client?.subscribe).to.have.been.calledWithMatch({
            subscription: S.NullableParamSubscription,
          });
        });
      });

      describe('subscribe({ variables })', function() {
        beforeEach(function() {
          s.subscribe({
            variables: {
              nullable: 'שלום עליכם, רבי ומורי',
            },
          });
        });

        beforeEach(() => aTimeout(50));

        it('refetches and updates state', function() {
          expect(s.data).to.deep.equal({
            nullableParam: {
              __typename: 'Nullable',
              nullable: 'שלום עליכם, רבי ומורי',
            },
          });
        });
      });
    });

    describe('with NullableParamSubscription', function() {
      let element: HTMLElement & { subscription: ApolloSubscriptionController<any> };

      let subscription: ApolloSubscriptionController<
        S.NullableParamSubscriptionData,
        S.NullableParamSubscriptionVariables
      >;

      beforeEach(async function define() {
        function Renderer(this: typeof element) {
          subscription = useSubscription(S.NullableParamSubscription, {
            onData: spy(),
            onComplete: spy(),
            onError: spy(),
          });
          return html`<host></host>`;
        }

        const Component = c(Renderer) as any;
        defineCE(Component);
        element = fixture(html`<${Component}></${Component}>`);
        // @ts-expect-error: upstream types
        await element.updated;
      });

      let querySpy: SinonSpy;
      let subscribeSpy: SinonSpy;

      beforeEach(() => {
        querySpy = spy(subscription.client!, 'query');
        subscribeSpy = spy(subscription.client!, 'subscribe');
      });

      afterEach(() => {
        querySpy.restore();
        subscribeSpy.restore();
      });

      beforeEach(() => aTimeout(50));

      it('sets data, error, and loading', function() {
        expect(subscription.data?.nullableParam?.nullable, 'data.nullableParam.nullable')
          .to.equal('Hello World');
        expect(subscription.loading, 'loading')
          .to.equal(subscription.loading)
          .and.to.be.false;
        expect(subscription.error, 'error')
          .to.equal(subscription.error)
          .and.to.not.be.ok;
      });

      it('calls onData', function() {
        expect(subscription.options.onData)
          .to.have.been.calledOnce
          .and.to.have.been.calledWithMatch({
            // client: subscription.client,
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

        const [{ client }] = (subscription.options.onData as SinonSpy).lastCall.args;
        expect(client).to.equal(subscription.client);
      });

      describe('setting subscription variables', function() {
        beforeEach(function() {
          subscription.variables = {
            nullable: 'אין עוד מלבדו',
          };
        });

        beforeEach(() => aTimeout(50));

        it('refetches', function() {
          expect(subscription.options.onData).to.have.been.calledTwice;
          const [{ client, subscriptionData, ...res }] =
            (subscription.options.onData as SinonSpy).lastCall.args;
          expect(res).to.be.empty;
          expect(client, 'client')
            .to.equal(subscription.client)
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
          expect(subscription.data, 'element.subscription.data').to.deep.equal({
            nullableParam: {
              __typename: 'Nullable',
              nullable: 'אין עוד מלבדו',
            },
          });
        });
      });
    });

    describe('with MessageSentSubscription', function() {
      let element: HTMLElement & { subscription: ApolloSubscriptionController<any> };

      beforeEach(resetMessages);
      afterEach(resetMessages);

      const onData = spy();

      beforeEach(async function define() {
        function Renderer(this: typeof element) {
          const { data } = useSubscription(S.MessageSentSubscription, { onData });

          const [messages, setMessages] = useState<string[]>([]);

          useEffect(() => {
            if (data?.messageSent?.message)
              setMessages([...messages, data.messageSent.message]);
          }, [data]);

          return html`
            <host shadowDom>
              <ol>${messages.map(x => html`<li>${x}</li>`)}</ol>
            </host>
          `;
        }

        const Component = c(Renderer) as any;
        defineCE(Component);
        element = fixture(html`<${Component}></${Component}>`);
        // @ts-expect-error: upstream types
        await element.updated;
      });

      beforeEach(nextFrame);

      it('renders initial data', function() {
        expect(onData).to.have.been.calledOnce;
        expect(element).shadowDom.to.equal(`
          <ol>
            <li>Message 1</li>
          </ol>
        `);
      });
    });
  });
});
