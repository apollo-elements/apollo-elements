import type { Entries } from '@apollo-elements/interfaces';

import {
  HelloQuery,
  NullableParamQuery,
  PaginatedQuery,
  MessagesQuery,
  MessageSentSubscription,
} from '@apollo-elements/test/schema';

import type {
  ApolloClient,
  ApolloError,
  NetworkStatus,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import { gql } from '@apollo/client/core';

import { html } from 'haunted';
import { useQuery } from './useQuery';
import { component, useState } from 'haunted';

import { aTimeout, defineCE, expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import { assertType, resetMessages, setupClient, teardownClient } from '@apollo-elements/test';

import { spy, SinonSpy } from 'sinon';

describe('[haunted] useQuery', function() {
  describe('README usage', function() {
    describe('with global client', function() {
      beforeEach(setupClient);

      afterEach(teardownClient);

      describe('with HelloQuery and a jaunty little template', function() {
        let element: HTMLElement;

        let refetchSpy: SinonSpy;

        afterEach(function() {
          refetchSpy?.restore?.();
        });

        beforeEach(async function define() {
          function Hello() {
            const c = useQuery(HelloQuery);

            refetchSpy ??= spy(c, 'refetch');

            return html`
              <what-spin-such-loader ?active="${c.loading}"></what-spin-such-loader>
              <article id="error" ?hidden="${!c.error}">
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code>${c.error?.message}</code></pre>
              </article>
              <p>${c.data?.helloWorld?.greeting}, ${c.data?.helloWorld?.name}!</p>

              <button id="start" @click="${() => c.startPolling(20)}">start</button>
              <button id="stop" @click="${c.stopPolling}">stop</button>
              <button id="executeQuery" @click="${() => c.executeQuery({ variables: { name: 'Mr Magoo', greeting: 'How do you do' } })}"></button>
              <button id="errorQuery" @click="${() => c.executeQuery({ variables: { name: 'Mr Magoo', greeting: 'How do you do' } })}"></button>
            `;
          }

          const tag = defineCE(component(Hello));

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        describe('calling startPolling', function() {
          beforeEach(function startPolling() {
            element.shadowRoot!.getElementById('start')!.click();
          });

          beforeEach(() => aTimeout(70));

          it('refetches', function() {
            expect(refetchSpy).to.have.been.calledThrice;
          });

          describe('then stopPolling', function() {
            beforeEach(function stopPolling() {
              element.shadowRoot!.getElementById('stop')!.click();
            });

            beforeEach(() => aTimeout(100));

            it('stops calling refetch', function() {
              expect(refetchSpy).to.have.been.calledThrice;
            });
          });
        });

        describe('calling executeQuery', function() {
          beforeEach(function() {
            element.shadowRoot!.getElementById('executeQuery')!.click();
          });

          beforeEach(nextFrame);

          it('refetches', function() {
            expect(element.shadowRoot!.textContent).to.include('How do you do, Mr Magoo!');
          });
        });
      });

      describe('with NullableParamQuery', function() {
        let element: HTMLElement;

        const $ = (x: string) => element.shadowRoot!.querySelector<HTMLElement>(x);

        const onError = spy();
        const onData = spy();

        afterEach(() => onError.resetHistory());
        afterEach(() => onData.resetHistory());

        beforeEach(async function define() {
          function Hello() {
            const { data, error, executeQuery } = useQuery(NullableParamQuery, {
              onData, onError,
            });

            return html`
              <p id="data">${data?.nullableParam?.nullable}</p>
              <p id="error">${error?.message}</p>
              <button id="executeQuery" @click="${() => executeQuery({ variables: { nullable: 'kloom' } }).catch(() => 0)}"></button>
              <button id="errorQuery" @click="${() => executeQuery({ variables: { nullable: 'error' } }).catch(() => 0)}"></button>
            `;
          }

          const tag = defineCE(component(Hello));

          element = await fixture(`<${tag}></${tag}>`);
        });

        it('calls onData', function() {
          expect(onData).to.have.been.called;
        });

        describe('on error', function() {
          beforeEach(function() {
            $('#errorQuery')!.click();
          });

          beforeEach(nextFrame);

          it('renders the error', function() {
            expect(element).shadowDom.to.equal(`
              <p id="data">Hello World</p>
              <p id="error">error</p>
              <button id="executeQuery"></button>
              <button id="errorQuery"></button>
            `);
          });

          it('calls onError', function() {
            expect(onError).to.have.been.called;
          });
        });
      });

      describe('fetchMore', function() {
        let element: HTMLElement;

        const $ = (x: string) => element.shadowRoot!.querySelector<HTMLElement>(x);

        const onError = spy();
        const onData = spy();

        afterEach(() => onError.resetHistory());
        afterEach(() => onData.resetHistory());

        beforeEach(async function define() {
          function Hello() {
            const [offset, setOffset] = useState(0);

            const { data, fetchMore } = useQuery(PaginatedQuery, {
              onData,
              onError,
              variables: {
                offset,
              },
            });

            return html`
              <p id="data">${data?.pages?.join?.(',')}</p>
              <button id="fetchMore" @click="${async (event: Event & { target: HTMLButtonElement }) => {
                const variables = { offset: offset + 10 };
                setOffset(variables.offset);
                await fetchMore({ variables }).catch(() => 0);
                element.dispatchEvent(new CustomEvent('updated'));
              }}"></button>
            `;
          }

          const tag = defineCE(component(Hello));

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        it('renders initial data', function() {
          expect(element).shadowDom.to.equal(`
            <p id="data">1,2,3,4,5,6,7,8,9,10</p>
            <button id="fetchMore"></button>
          `);
        });

        describe('calling fetchMore', function() {
          beforeEach(function() {
            $('#fetchMore')!.click();
          });

          beforeEach(nextFrame);

          it('renders next page', function() {
            expect(element).shadowDom.to.equal(`
              <p id="data">1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20</p>
              <button id="fetchMore"></button>
            `);
          });
        });
      });

      describe('subscribeToMore', function() {
        let element: HTMLElement;

        const $ = (x: string) => element.shadowRoot!.querySelector<HTMLElement>(x);

        const onError = spy();
        const onData = spy();

        afterEach(() => onError.resetHistory());
        afterEach(() => onData.resetHistory());
        afterEach(resetMessages);

        beforeEach(async function define() {
          function Hello() {
            const { data, subscribeToMore } = useQuery(MessagesQuery);

            const onClickSubscribeToMore = () => subscribeToMore({
              document: MessageSentSubscription,
              updateQuery: (_, n) => ({ messages: [n.subscriptionData.data.messageSent!] }),
            });

            return html`
              <button id="subscribeToMore" @click="${onClickSubscribeToMore}"></button>
              <ol>${data?.messages?.map?.(x => html`<li>${x?.message}</li>`)}</ol>
            `;
          }

          const tag = defineCE(component(Hello));

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        it('renders initial data', function() {
          expect(element).shadowDom.to.equal(`
            <button id="subscribeToMore"></button>
            <ol>
              <li>Message 1</li>
              <li>Message 2</li>
            </ol>
          `);
        });

        describe('calling subscribeToMore', function() {
          beforeEach(function() {
            $('#subscribeToMore')!.click();
          });

          beforeEach(nextFrame);

          it('renders subscription', function() {
            expect(element).shadowDom.to.equal(`
              <button id="subscribeToMore"></button>
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

      describe('without variables', function() {
        let element: HTMLElement;

        const onInput =
          (setter: (s: string) => void) =>
            (event: Event & { target: HTMLInputElement }) =>
              setter(event.target.value);

        const $ = (id: string) =>
          element.shadowRoot!.querySelector<HTMLInputElement>(`#${id}`);

        beforeEach(async function define() {
          function Hello() {
            const [name, setName] = useState('');
            const [greeting, setGreeting] = useState('');

            const variables = name && greeting ? { name, greeting } : undefined;

            const { data, error, loading, options, refetch } = useQuery(HelloQuery, { variables });

            if (variables !== options?.variables)
              refetch(variables);

            return html`
              <what-spin-such-loader ?active="${loading}"></what-spin-such-loader>
              <article id="error" ?hidden="${!error}">
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code>${error?.message}</code></pre>
              </article>
              <p>${data?.helloWorld!.greeting ?? 'Hello'}, ${data?.helloWorld!.name ?? 'Friend'}!</p>
              <input id="name" @input="${onInput(setName)}"/>
              <input id="greeting" @input="${onInput(setGreeting)}"/>
            `;
          }

          const tag = defineCE(component(Hello));

          element = await fixture(`<${tag}></${tag}>`);
        });

        it('renders data', function() {
          expect(element).shadowDom.to.equal(`
            <what-spin-such-loader></what-spin-such-loader>
            <article id="error" hidden>
              <h2>😢 Such Sad, Very Error! 😰</h2>
              <pre><code></code></pre>
            </article>
            <p>Shalom, Chaver!</p>
            <input id="name"/>
            <input id="greeting"/>
          `);
        });

        describe('when setting variables', function() {
          beforeEach(async function() {
            $('name')!.focus();
            await sendKeys({ type: 'Pardner' });
            $('greeting')!.focus();
            await sendKeys({ type: 'Howdy' });
            $('greeting')!.blur();
          });

          beforeEach(nextFrame);

          it('refetches', function() {
            expect(element).shadowDom.to.equal(`
              <what-spin-such-loader></what-spin-such-loader>
              <article id="error" hidden>
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code></code></pre>
              </article>
              <p>Howdy, Pardner!</p>
              <input id="name"/>
              <input id="greeting"/>
            `);
          });
        });
      });

      describe('with variables', function() {
        let element: HTMLElement;

        beforeEach(async function define() {
          function Hello() {
            const { data } = useQuery(HelloQuery, {
              variables: {
                greeting: 'How\'s it going',
                name: 'Dude',
              },
            });

            return html`
              <p>${data?.helloWorld?.greeting}, ${data?.helloWorld?.name}!</p>
            `;
          }

          const tag = defineCE(component(Hello));

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        it('renders data', function() {
          expect(element).shadowDom.to.equal(`
            <p>How's it going, Dude!</p>
          `);
        });
      });

      describe('with shouldSubscribe set as contant false', function() {
        let element: HTMLElement;

        beforeEach(async function define() {
          function Component() {
            const c = useQuery(HelloQuery, { shouldSubscribe: () => false });
            return html`
              <output>${c.data?.helloWorld?.greeting}</output>
              button @click="${() => c.subscribe()}"</button>
            `;
          }

          const tag = defineCE(component(Component));

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(() => aTimeout(100));

        it('does not subscribe', function() {
          expect(element).shadowDom.to.not.contain('Shalom');
        });

        describe('then calling subscribe', function() {
          beforeEach(function() {
            element.querySelector('button')?.click?.();
          });

          beforeEach(nextFrame);

          it('gets data', function() {
            expect(element.shadowRoot!.textContent).to.contain('Shalom');
          });
        });
      });
    });
  });
});

type TypeCheckData = { a: 'a'; b: number };
type TypeCheckVars = { c: 'c'; d: number };

const TDN: TypedDocumentNode<TypeCheckData, TypeCheckVars> =
  gql`query TypedQuery($c: String, $d: Int) { a b }`;

function TDNTypeCheck() {
  const {
    called,
    client,
    data,
    error,
    fetchMore,
    loading,
    networkStatus,
    variables,
    refetch,
    startPolling,
    stopPolling,
    subscribeToMore,
  } = useQuery(TDN);

  assertType<boolean>(called);
  assertType<ApolloClient<NormalizedCacheObject>>(client!);
  assertType<Error|ApolloError>(error!);
  assertType<NetworkStatus>(networkStatus);
  assertType<boolean>(loading);
  assertType<TypeCheckData>(data!);
  assertType<TypeCheckVars>(variables!);

  assertType<void>(startPolling(12));

  assertType<void>(stopPolling());

  (async function typeCheckRefetch() {
    const r = await refetch({ c: 'c', d: 2 });
    assertType<'a'>(r.data.a);
  });

  (subscribeToMore({
    document: gql`subscription { hi }`,
    updateQuery(data) {
      assertType<TypeCheckData>(data);
      return { a: 'a', b: 3 };
    },
  }));

  (async function typeCheckFetchMore() {
    fetchMore({
      variables: { c: 'c', d: 12 },
      updateQuery(data) {
        assertType<TypeCheckData>(data);
        return { a: 'a', b: 3 };
      },
    });
  });
}
