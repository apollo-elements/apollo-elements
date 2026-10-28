import type { ApolloQueryController } from '@apollo-elements/core';
import type {
  ApolloClient,
  NetworkStatus,
  TypedDocumentNode,
} from '@apollo/client';

import * as S from '@apollo-elements/test/schema';

import { gql } from '@apollo/client';

import { c, html, useState, useEffect, useHost } from 'atomico';
import { fixture } from 'atomico/test-dom';
import { useQuery } from './useQuery';

import { aTimeout, defineCE, expect, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import { assertType, resetMessages, setupClient, teardownClient } from '@apollo-elements/test';

import * as hanbi from 'hanbi';

/** Wait until `condition` returns true, or fail after `timeout` ms. */
async function until(condition: () => boolean, timeout = 1000): Promise<void> {
  const start = performance.now();
  while (!condition()) {
    if (performance.now() - start > timeout)
      throw new Error('timed out waiting for condition');
    await aTimeout(10);
  }
}

describe('[atomico] useQuery', function() {
  function What() { return html`<div></div>`; }
  What.props = { active: { reflects: true, type: Boolean } };
  customElements.define('what-spin-such-loader', c(What));

  describe('with global client', function() {
    beforeEach(setupClient);

    afterEach(teardownClient);

    describe('README usage', function() {
      describe('with HelloQuery and a jaunty little template', function() {
        interface HelloElement extends HTMLElement {
          updated: Promise<void>;
          query: ApolloQueryController<S.HelloQueryData, S.HelloQueryVariables>;
        }

        let element: HelloElement;

        beforeEach(async function define() {
          function Hello() {
            const host = useHost();
            const con = useQuery(S.HelloQuery);

            const { data, error, loading } = con;

            // expose the controller on the element so tests never share state between fixtures
            useEffect(() => {
              (host.current as unknown as HelloElement).query = con;
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
          element = fixture(html`<${Component}></${Component}>`) as unknown as HelloElement;
          await element.updated;
          await until(() => !!element.query);
        });

        beforeEach(nextFrame);

        describe('calling startPolling then stopPolling', function() {
          let refetchSpy: ReturnType<typeof hanbi.stubMethod>;

          beforeEach(function start() {
            refetchSpy = hanbi.stubMethod(element.query, 'refetch').passThrough();
            element.query.startPolling(10);
          });

          afterEach(function stop() {
            element.query.stopPolling();
          });

          it('refetches', async function() {
            await until(() => refetchSpy.callCount >= 3);

            expect(refetchSpy.callCount).to.be.greaterThanOrEqual(3);
          });

          describe('then stopPolling', function() {
            it('stops calling refetch', async function() {
              // wait for polling to ramp up before stopping
              await until(() => refetchSpy.callCount >= 2);

              element.query.stopPolling();

              // allow any in-flight poll/refetch to settle
              await aTimeout(50);

              let previous = refetchSpy.callCount;

              // verify the count stays stable across multiple windows
              for (let i = 0; i < 3; i++) {
                await aTimeout(50);
                expect(refetchSpy.callCount).to.equal(previous);
                previous = refetchSpy.callCount;
              }
            });
          });
        });

        describe('calling executeQuery', function() {
          beforeEach(async function() {
            await element.query.executeQuery({
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

      const onErrorSpy = hanbi.spy();
      const onDataSpy = hanbi.spy();

      afterEach(() => {
        onErrorSpy.reset();
        onDataSpy.reset();
      });

      beforeEach(async function define() {
        function Hello() {
          const { data, error, executeQuery } = useQuery(S.NullableParamQuery, {
            onData: onDataSpy.handler,
            onError: onErrorSpy.handler,
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
          expect(onDataSpy.called).to.be.true;
        });
      });

      describe('on error', function() {
        beforeEach(async function() {
          await ex({ variables: { nullable: 'error' } }).catch(() => 0);
        });

        beforeEach(nextFrame);

        it('calls onError', function() {
          expect(onErrorSpy.called).to.be.true;
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

      const onErrorSpy = hanbi.spy();
      const onDataSpy = hanbi.spy();

      let offset: number;
      let setOffset: (x: number) => void;
      let data: S.PaginatedQueryData | null;
      let fetchMore: ApolloQueryController<typeof S.PaginatedQuery>['fetchMore'];

      afterEach(() => {
        onErrorSpy.reset();
        onDataSpy.reset();
      });

      beforeEach(async function define() {
        function Hello() {
          [offset, setOffset] = useState(0);

          ({ data, fetchMore } = useQuery(S.PaginatedQuery, {
            onData: onDataSpy.handler,
            onError: onErrorSpy.handler,
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

        it('calls onData', function() {
          expect(onDataSpy.called).to.be.true;
        });
        it('does not call onError', function() {
          expect(onErrorSpy.called).to.be.false;
        });
      });
    });

    describe('subscribeToMore', function() {
      let element: HTMLElement & { updated: Promise<void>; };

      let subscribeToMore: ApolloQueryController<typeof S.MessagesQuery>['subscribeToMore'];

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
            updateQuery: (prev, { subscriptionData }) => {
              const newMessage = subscriptionData.data.messageSent ?? null;
              return {
                ...prev,
                messages: [...(prev.messages || []), newMessage].filter((m): m is NonNullable<typeof newMessage> => m !== null)
              };
            },
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

export function TDNTypeCheck() {
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
