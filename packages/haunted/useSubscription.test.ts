import * as S from '@apollo-elements/test/schema';

import type { ReactiveControllerHost } from 'lit';
import type {
  ApolloSubscriptionController,
  ApolloSubscriptionControllerOptions,
} from '@apollo-elements/core';

import type { GraphQLFormattedError } from 'graphql';

import { html } from 'haunted';
import { useSubscription } from './useSubscription';
import { component } from 'haunted';

import { aTimeout, defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import {
  ApolloClient,
  gql,
  TypedDocumentNode,
} from '@apollo/client';

import { setupClient, teardownClient, resetMessages, assertType } from '@apollo-elements/test';

import { spy, SinonSpy } from 'sinon';

describe('[haunted] useSubscription', function() {
  describe('with noAutoSubscribe set', function() {
    let element: HTMLElement;
    beforeEach(async function define() {
      function Component() {
        const { data } = useSubscription(S.NullableParamSubscription, { noAutoSubscribe: true });
        return data?.nullableParam?.nullable ?? 'nothing';
      }
      const tag = defineCE(component<HTMLElement>(Component));
      element = await fixture(`<${tag}></${tag}>`);
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
      function Component() {
        const { options: opts } = useSubscription(S.NullableParamSubscription);
        options = opts;
      }

      const tag = defineCE(component<HTMLElement>(Component));

      await fixture(`<${tag}></${tag}>`);
    });

    beforeEach(nextFrame);
    afterEach(() => options = undefined as unknown as typeof options);

    it('sets empty options', function() {
      expect(options).to.be.empty;
    });
  });

  describe('with shouldSubscribe set to constant false', function() {
    let element: HTMLElement;

    let doSubscribe: ApolloSubscriptionController<
      S.NullableParamSubscriptionData,
      S.NullableParamSubscriptionVariables
    >['subscribe'];

    beforeEach(async function define() {
      function Component() {
        const { data, subscribe } = useSubscription(S.NullableParamSubscription, {
          shouldSubscribe: () => false,
        });

        doSubscribe = subscribe;

        return data?.nullableParam?.nullable ?? 'nothing';
      }

      const tag = defineCE(component<HTMLElement>(Component));

      element = await fixture(`<${tag}></${tag}>`);
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
        let element: HTMLElement;

        beforeEach(async function define() {
          function NoParam() {
            const { data, error, loading, subscribe } = useSubscription(S.NoParamSubscription, {
              noAutoSubscribe: true,
            });

            // @ts-expect-error: testing escape hatch
            this.subscribe ??= subscribe;

            const noParam = data?.noParam!.noParam ?? 'fail';

            return html`
              <what-spin-such-loader ?active="${loading}"></what-spin-such-loader>
              <article id="error" ?hidden="${!error}">
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code>${error?.message}</code></pre>
              </article>
              <p>${noParam}</p>
            `;
          }

          const tag = defineCE(component(NoParam));

          element = await fixture(`<${tag}></${tag}>`);
        });

        // @ts-expect-error: testing escape hatch
        beforeEach(() => void element.subscribe());

        beforeEach(nextFrame);

        it('renders loading state', function() {
          expect(element).shadowDom.to.equal(`
            <what-spin-such-loader active></what-spin-such-loader>
            <article id="error" hidden>
              <h2>😢 Such Sad, Very Error! 😰</h2>
              <pre><code></code></pre>
            </article>
            <p>fail</p>
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
              <p>noParam</p>
            `);
          });
        });
      });

      describe('with variables', function() {
        let element: HTMLElement;

        beforeEach(async function define() {
          function NullableParam() {
            const {
              data,
              error,
              loading,
              subscribe,
            } = useSubscription(S.NullableParamSubscription, {
              noAutoSubscribe: true,
              variables: {
                nullable: 'POW',
                delay: 20,
              },
            });

            // @ts-expect-error: testing escape hatch
            this.subscribe ??= subscribe;

            const nullable = data?.nullableParam!.nullable ?? 'NullableParam';

            return html`
              <what-spin-such-loader ?active="${loading}"></what-spin-such-loader>
              <article id="error" ?hidden="${!error}">
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code>${error?.message}</code></pre>
              </article>
              <p>${nullable}</p>
            `;
          }

          const tag = defineCE(component(NullableParam));

          element = await fixture(`<${tag}></${tag}>`);
        });

        // @ts-expect-error: testing escape hatch
        beforeEach(() => void element.subscribe());

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
      let element: HTMLElement & { subscription: ApolloSubscriptionController<any> };

      beforeEach(async function define() {
        const tag = defineCE(component(function Component(this: typeof element) {
          this.subscription =
            useSubscription(S.NullableParamSubscription, {
              shouldSubscribe: () => false,
              onData: spy(),
              onError: spy(),
            });
        }));

        element = await fixture(`<${tag}></${tag}>`);
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
      let element: HTMLElement & { subscription: ApolloSubscriptionController<any> };

      beforeEach(async function define() {
        function Component(this: typeof element) {
          this.subscription = useSubscription(S.NullableParamSubscription, {
            noAutoSubscribe: true,
            onData: spy(),
            onError: spy(),
            onComplete: spy(),
          });
        }

        const tag = defineCE(component(Component));

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
          expect(element.subscription.error, 'element error')
            .to.be.ok
            .and.to.equal(element.subscription.error)
            .and.to.be.an.instanceof(Error);
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
          expect(element.subscription.data).to.deep.equal({
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

      beforeEach(async function define() {
        function Component(this: typeof element) {
          this.subscription = useSubscription(S.NullableParamSubscription, {
            onData: spy(),
            onComplete: spy(),
            onError: spy(),
          });
        }

        const tag = defineCE(component(Component));

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
        expect(element.subscription.data?.nullableParam?.nullable, 'data.nullableParam.nullable')
          .to.equal('Hello World');
        expect(element.subscription.loading, 'loading')
          .to.equal(element.subscription.loading)
          .and.to.be.false;
        expect(element.subscription.error, 'error')
          .to.equal(element.subscription.error)
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
          expect(element.subscription.data, 'element.subscription.data').to.deep.equal({
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
        const messages = new Set();

        function Component() {
          const { data } = useSubscription(S.MessageSentSubscription, { onData });

          messages.add(data?.messageSent?.message);

          return html`
            <ol>${[...messages].filter(Boolean).map(x => html`<li>${x}</li>`)}</ol>
          `;
        }

        const tag = defineCE(component<HTMLElement>(Component));

        element = await fixture(`<${tag}></${tag}>`);
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

type TypeCheckData = { a: 'a'; b: number };
type TypeCheckVars = { c: 'c'; d: number };

function TDNTypeCheck() {
  const TDN: TypedDocumentNode<TypeCheckData, TypeCheckVars> =
    gql`query TypedQuery($c: String, $d: Int) { a b }`;

  const {
    called,
    client,
    data,
    error,
    errors,
    host,
    loading,
    options,
    variables,
  } = useSubscription(TDN);

  assertType<boolean>(called);
  assertType<ApolloClient>(client!);
  assertType<Error>(error!);
  assertType<boolean>(loading);
  assertType<TypeCheckData>(data!);
  assertType<TypeCheckVars>(variables!);
  assertType<ApolloSubscriptionControllerOptions<TypeCheckData, TypeCheckVars>>(options);
  assertType<ReactiveControllerHost>(host);
  assertType<readonly GraphQLFormattedError[]>(errors);
}

function ManuallyTypedTypeCheck() {
  const {
    called,
    client,
    data,
    error,
    errors,
    host,
    loading,
    options,
    variables,
  } = useSubscription<TypeCheckData, TypeCheckVars>(gql``);

  assertType<boolean>(called);
  assertType<ApolloClient>(client!);
  assertType<Error>(error!);
  assertType<boolean>(loading);
  assertType<TypeCheckData>(data!);
  assertType<TypeCheckVars>(variables!);
  assertType<ApolloSubscriptionControllerOptions<TypeCheckData, TypeCheckVars>>(options);
  assertType<ReactiveControllerHost>(host);
  assertType<readonly GraphQLFormattedError[]>(errors);
}
