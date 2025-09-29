import type { ApolloQueryController } from '@apollo-elements/core';
import type {
  ApolloClient,
  NetworkStatus,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client';

import * as S from '@apollo-elements/test/schema';

import { gql } from '@apollo/client';

import { c, html, useState, useEffect } from 'atomico';
import { fixture } from 'atomico/test-dom';
import { useQuery } from './useQuery';

import { aTimeout, defineCE, expect, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import { assertType, resetMessages, setupClient, teardownClient } from '@apollo-elements/test';

import { useFakeTimers, SinonFakeTimers } from 'sinon';

describe('[atomico] useQuery', function() {
  function What() { return html`<div></div>`; }
  What.props = { active: { reflects: true, type: Boolean } };
  customElements.define('what-spin-such-loader', c(What));

  describe('with global client', function() {
    beforeEach(setupClient);

    afterEach(teardownClient);

    describe('README usage', function() {
      describe('with HelloQuery and a jaunty little template', function() {
        let element: HTMLElement & { updated: Promise<void>; };

        let refetchCallCount = 0;
        let originalRefetch: ApolloQueryController<typeof S.HelloQuery>['refetch'];

        let startPolling: ApolloQueryController<typeof S.HelloQuery>['startPolling'];
        let stopPolling: ApolloQueryController<typeof S.HelloQuery>['stopPolling'];
        let executeQuery: ApolloQueryController<typeof S.HelloQuery>['executeQuery'];

        afterEach(function() {
          refetchCallCount = 0;
        });

        beforeEach(async function define() {
          function Hello() {
            const con = useQuery(S.HelloQuery);

            const { data, error, loading } = con;

            useEffect(() => {
              ({ executeQuery, stopPolling, startPolling } = con);
              originalRefetch = con.refetch;
              con.refetch = (...args) => {
                refetchCallCount++;
                return originalRefetch.apply(con, args);
              };
            }, [con]);

            return html`
              <host shadowDom>
                <what-spin-such-loader active=${loading}></what-spin-such-loader>
                <article id="error" hidden=${!error}>
                  <h2>${'😢 Such Sad, Very Error! 😰'}</h2>
                  <pre><code>${error?.message}</code></pre>
                </article>
                <p>${data?.helloWorld?.greeting}, ${data?.helloWorld?.name}!</p>
              </host>
            `;
          }

          const Component = defineCE(c(Hello as any));
          element = fixture(html`<${Component}></${Component}>`);
          await element.updated;
        });

        beforeEach(nextFrame);

        describe('calling startPolling then stopPolling', function() {
          let clock: SinonFakeTimers;

          beforeEach(() => clock = useFakeTimers());
          afterEach(() => clock.restore());

          beforeEach(() => startPolling(1000));

          beforeEach(() => clock.tick(3500));

          it('refetches', function() {
            expect(refetchCallCount).to.equal(3);
          });

          describe('then stopPolling', function() {
            beforeEach(() => stopPolling());
            beforeEach(() => clock.tick(5000));

            it('stops calling refetch', function() {
              expect(refetchCallCount).to.equal(3);
            });
          });
        });

        describe('calling executeQuery', function() {
          beforeEach(async function() {
            await executeQuery({
              variables: {
                name: 'Mr Magoo',
                greeting: 'How do you do',
              },
            });
          });

          beforeEach(nextFrame);

          it('refetches', function() {
            expect(element.shadowRoot!.textContent).to.include('How do you do, Mr Magoo!');
          });
        });
      });
    });

    describe('with NullableParamQuery', function() {
      let element: HTMLElement & { updated: Promise<void>; };

      let ex: ApolloQueryController<typeof S.NullableParamQuery>['executeQuery'];

      let onErrorCalled = false;
      let onDataCalled = false;

      const onError = () => { onErrorCalled = true; };
      const onData = () => { onDataCalled = true; };

      afterEach(() => {
        onErrorCalled = false;
        onDataCalled = false;
      });

      beforeEach(async function define() {
        function Hello() {
          const { data, error, executeQuery } = useQuery(S.NullableParamQuery, {
            onData, onError,
          });

          useEffect(() => {
            ex = executeQuery;
          }, [executeQuery]);


          return html`
            <host shadowDom>
              <p id="data">${data?.nullableParam?.nullable}</p>
              <p id="error">${error?.message}</p>
            </host>
          `;
        }

        const Component = defineCE(c(Hello as any));
        element = fixture(html`<${Component}></${Component}>`);
        await element.updated;
      });

      describe('stam', function() {
        it('calls onData', function() {
          expect(onDataCalled).to.be.true;
        });
      });

      describe('on error', function() {
        beforeEach(async function() {
          await ex({ variables: { nullable: 'error' } }).catch(() => 0);
        });

        beforeEach(nextFrame);

        it('calls onError', function() {
          expect(onErrorCalled).to.be.true;
        });

        it('renders the error', function() {
          expect(element).shadowDom.to.equal(`
            <p id="data">Hello World</p>
            <p id="error">error</p>
          `);
        });
      });
    });

    describe('fetchMore', function() {
      let element: HTMLElement & { updated: Promise<void>; };

      let onErrorCalled = false;
      let onDataCalled = false;

      const onError = () => { onErrorCalled = true; };
      const onData = () => { onDataCalled = true; };

      let offset: number;
      let setOffset: (x: number) => void;
      let data: S.PaginatedQueryData | null;
      let fetchMore: ApolloQueryController<typeof S.PaginatedQuery>['fetchMore'];

      afterEach(() => {
        onErrorCalled = false;
        onDataCalled = false;
      });

      beforeEach(async function define() {
        function Hello() {
          [offset, setOffset] = useState(0);

          ({ data, fetchMore } = useQuery(S.PaginatedQuery, {
            onData,
            onError,
            variables: {
              offset,
            },
          }));

          return html`
            <host shadowDom>
              <p id="data">${data?.pages?.join?.(',')}</p>
            </host>
          `;
        }

        const Component = defineCE(c(Hello as any));
        element = fixture(html`<${Component}></${Component}>`);
        await element.updated;
      });

      beforeEach(nextFrame);

      it('renders initial data', function() {
        expect(element).shadowDom.to.equal(`
          <p id="data">1,2,3,4,5,6,7,8,9,10</p>
        `);
      });

      describe('calling fetchMore', function() {
        beforeEach(async function() {
          const variables = { offset: offset + 10 };
          setOffset(variables.offset);
          await fetchMore({ variables }).catch(() => 0);
          element.dispatchEvent(new CustomEvent('updated'));
        });

        beforeEach(nextFrame);

        it('renders next page', function() {
          expect(element).shadowDom.to.equal(`
            <p id="data">1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20</p>
          `);
        });
      });
    });

    describe('subscribeToMore', function() {
      let element: HTMLElement & { updated: Promise<void>; };

      let subscribeToMore: ApolloQueryController<typeof S.MessagesQuery>['subscribeToMore'];

      let onErrorCalled = false;
      let onDataCalled = false;

      const onError = () => { onErrorCalled = true; };
      const onData = () => { onDataCalled = true; };

      afterEach(() => {
        onErrorCalled = false;
        onDataCalled = false;
      });
      afterEach(resetMessages);

      beforeEach(async function define() {
        function Hello() {
          const { data, subscribeToMore: s } = useQuery(S.MessagesQuery);

          useEffect(() => { subscribeToMore = s; }, [s]);

          const messages = data?.messages ?? [];

          return html`
            <host shadowDom>
              <ol>${messages.map(x => html`<li>${x!.message}</li>`)}</ol>
            </host>
          `;
        }

        const Component = defineCE(c(Hello as any));
        element = fixture(html`<${Component}></${Component}>`);
        await element.updated;
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
          subscribeToMore({
            document: S.MessageSentSubscription,
            updateQuery: (prev, { subscriptionData }) => ({
              messages: [...(prev.messages || []), subscriptionData.data.messageSent]
            }),
          });
        });

        beforeEach(nextFrame);

        it('renders subscription', function() {
          expect(element).shadowDom.to.equal(`
            <ol>
              <li>Message 1</li>
              <li>Message 2</li>
              <li>Message 3</li>
            </ol>
          `);
        });
      });
    });

    describe('without variables', function() {
      let element: HTMLElement & { updated: Promise<void>; };

      const onInput =
        (setter: (s: string) => void) =>
          (event: Event & { target: HTMLInputElement }) =>
            setter(event.target.value);

      beforeEach(async function define() {
        function Hello() {
          const [name, setName] = useState('');
          const [greeting, setGreeting] = useState('');
          const [variables, setVariables] =
            useState(name && greeting ? ({ name, greeting }) : undefined);

          const { data, error, loading, options, refetch } = useQuery(S.HelloQuery, { variables });

          useEffect(() => {
            if (name && greeting) {
              setVariables({ name, greeting });
            }
          }, [name, greeting]);

          useEffect(() => {
            if (variables !== options?.variables)
              refetch(variables);
          }, [variables]);

          return html`
            <host shadowDom>
              <what-spin-such-loader active=${loading}></what-spin-such-loader>
              <article id="error" hidden=${!error}>
                <h2>${'😢 Such Sad, Very Error! 😰'}</h2>
                <pre><code>${error?.message}</code></pre>
              </article>
              <p>${data?.helloWorld!.greeting ?? 'Hello'}, ${data?.helloWorld!.name ?? 'Friend'}!</p>
              <input id="name" oninput=${onInput(setName)}/>
              <input id="greeting" oninput=${onInput(setGreeting)}/>
            </host>
          `;
        }

        const Component = defineCE(c(Hello as any));
        element = fixture(html`<${Component}></${Component}>`);
        await element.updated;
      });

      beforeEach(nextFrame);

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

      describe.skip('when setting variables', function() {
        beforeEach(async function() {
          element.shadowRoot!.querySelector<HTMLInputElement>('#name')!.focus();
          await sendKeys({ type: 'Pardner' });
          element.shadowRoot!.querySelector<HTMLInputElement>('#greeting')!.focus();
          await sendKeys({ type: 'Howdy' });
          element.shadowRoot!.querySelector<HTMLInputElement>('#greeting')!.blur();
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
      let element: HTMLElement & { updated: Promise<void>; };

      beforeEach(async function define() {
        function Hello() {
          const { data } = useQuery(S.HelloQuery, {
            variables: {
              greeting: 'How\'s it going',
              name: 'Dude',
            },
          });

          return html`
            <host shadowDom>
              <p>${data?.helloWorld?.greeting}, ${data?.helloWorld?.name}!</p>
            </host>
          `;
        }

        const Component = defineCE(c(Hello as any));
        element = fixture(html`<${Component}></${Component}>`);
        await element.updated;
      });

      beforeEach(nextFrame);

      it('renders data', function() {
        expect(element).shadowDom.to.equal(`
          <p>How's it going, Dude!</p>
        `);
      });
    });

    describe('with shouldSubscribe set as contant false', function() {
      let element: HTMLElement & { updated: Promise<void>; };

      beforeEach(async function define() {
        function Hello() {
          const { data, subscribe } = useQuery(S.HelloQuery, { shouldSubscribe: () => false });

          return html`
            <host shadowDom>
              <output>${data?.helloWorld?.greeting}</output>
              <button onclick=${() => subscribe()}></button>
            </host>
          `;
        }

        const Component = defineCE(c(Hello as any));
        element = fixture(html`<${Component}></${Component}>`);
        await element.updated;
      });

      beforeEach(() => aTimeout(50));

      it('does not subscribe', function() {
        expect(element).shadowDom.to.not.contain('Shalom');
      });

      describe('then calling subscribe', function() {
        beforeEach(function() {
          element.shadowRoot!.querySelector('button')!.click();
        });

        beforeEach(() => aTimeout(50));

        it('gets data', function() {
          expect(element.shadowRoot!.textContent).to.contain('Shalom');
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
  assertType<ApolloClient>(client!);
  assertType<Error>(error!);
  assertType<NetworkStatus>(networkStatus);
  assertType<boolean>(loading);
  assertType<TypeCheckData>(data!);
  assertType<TypeCheckVars>(variables!);

  assertType<void>(startPolling(12));

  assertType<void>(stopPolling());

  (async function typeCheckRefetch() {
    const r = await refetch({ c: 'c', d: 2 });
    assertType<'a' | undefined>(r.data?.a);
  });

  (subscribeToMore({
    document: gql`subscription { hi }`,
    updateQuery(data) {
      assertType<Partial<TypeCheckData>>(data);
      return { a: 'a', b: 3 };
    },
  }));

  (async function typeCheckFetchMore() {
    fetchMore({
      variables: { c: 'c', d: 12 },
      // Note: updateQuery removed in Apollo Client v4
    });
  });
}
