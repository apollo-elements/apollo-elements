import { html } from 'haunted';
import { useQuery } from './useQuery';
import { component } from 'haunted';

import { Entries, restoreSpies, SetupOptions } from '@apollo-elements/test-helpers';
import HelloQuery from '@apollo-elements/test-helpers/graphql/Hello.query.graphql';

import { aTimeout, defineCE, expect, fixture, nextFrame } from '@open-wc/testing';
import { ApolloQueryElement } from '@apollo-elements/interfaces';

import { setupClient, setupSpies, setupStubs, teardownClient } from '@apollo-elements/test-helpers';
import { describeQuery, QueryElement } from '@apollo-elements/test-helpers/query.test';

import { spy, SinonSpy, SinonStub } from 'sinon';

import type {
  HelloQueryData,
  HelloQueryVariables,
} from '@apollo-elements/test-helpers/schema';
import { DocumentNode } from 'graphql';

const ccOrig = ApolloQueryElement.prototype.connectedCallback;

describe('[haunted] useQuery', function() {
  afterEach(function() {
    ApolloQueryElement.prototype.connectedCallback = ccOrig;
  });

  describeQuery({
    async setupFunction<T extends QueryElement<any, any>>(opts?: SetupOptions<T>) {
      const { innerHTML = '', attributes, properties } = opts ?? {};

      let spies!: Record<string|keyof T, SinonSpy>;
      let stubs!: Record<string|keyof T, SinonStub>;

      ApolloQueryElement.prototype.connectedCallback = function(this: T) {
        spies ??= setupSpies(opts?.spy, this);
        stubs ??= setupStubs(opts?.stub, this);

        this.stringify = (x: unknown) => JSON.stringify(x, null, 2);

        this.hasRendered = async () => {
          await nextFrame();
          return this;
        };

        ccOrig.call(this);
      };

      function Query<H extends QueryElement>(this: H) {
        const { loading, data, error } = useQuery(null as unknown as DocumentNode);

        return html`
          <output id="data">${this.stringify(data)}</output>
          <output id="error">${this.stringify(error)}</output>
          <output id="errors">${this.stringify(this.errors)}</output>
          <output id="loading">${this.stringify(loading)}</output>
          <output id="networkStatus">${this.stringify(this.networkStatus)}</output>
        `;
      }

      const klass = component<QueryElement>(Query);

      const tag = defineCE(klass);

      const attrs = attributes ? ` ${attributes}` : '';

      const element = await fixture<T>(`<${tag}${attrs}>${innerHTML}</${tag}>`);

      for (const [key, val] of Object.entries(properties ?? {}) as Entries<T>)
        element[key] = val;

      return { element, spies, stubs };
    },

  });

  describe('with noAutoSubscribe set', function() {
    let element: QueryElement & { shadowRoot: ShadowRoot };

    beforeEach(async function define() {
      function Component() {
        const { data } =
          useQuery<HelloQueryData, HelloQueryVariables>(HelloQuery, { noAutoSubscribe: true });
        return html`${data?.helloWorld?.greeting}`;
      }

      const tag = defineCE(component(Component));

      element = await fixture(`<${tag}></${tag}>`);
    });

    beforeEach(nextFrame);

    it('sets no-auto-subscribe attribute', function() {
      expect(element.hasAttribute('no-auto-subscribe')).to.be.true;
    });
  });

  describe('with shouldSubscribe set', function() {
    let element: QueryElement & { shadowRoot: ShadowRoot };

    function shouldSubscribe() {
      return false;
    }

    beforeEach(async function define() {
      function Component() {
        const { data } =
          useQuery<HelloQueryData, HelloQueryVariables>(HelloQuery, { shouldSubscribe });
        return html`${data?.helloWorld?.greeting}`;
      }

      const tag = defineCE(component(Component));

      element = await fixture(`<${tag}></${tag}>`);
    });

    beforeEach(nextFrame);

    it('sets shouldSubscribe on the element', function() {
      expect(element.shouldSubscribe).to.equal(shouldSubscribe);
    });
  });

  describe('README usage', function() {
    describe('with global client', function() {
      beforeEach(setupClient);

      afterEach(teardownClient);

      describe('with startPolling', function() {
        let element: ApolloQueryElement<HelloQueryData, HelloQueryVariables> & {
          shadowRoot: ShadowRoot
        };

        let spies: Record<string | keyof typeof element, SinonSpy>;

        beforeEach(async function define() {
          function Hello() {
            const { startPolling, stopPolling } = useQuery(HelloQuery);
            return html`
              <button id="start" @click="${() => startPolling(20)}">start</button>
              <button id="stop" @click="${stopPolling}">stop</button>
            `;
          }

          const tag = defineCE(component(Hello));

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(function() {
          spies = {
            'observableQuery.refetch': spy(element.observableQuery!, 'refetch'),
          };
        });

        beforeEach(function startPolling() {
          element.shadowRoot.getElementById('start')!.click();
        });

        beforeEach(() => aTimeout(70));

        afterEach(restoreSpies(() => spies));

        it('refetches', function() {
          expect(element.observableQuery!.refetch).to.have.been.calledThrice;
        });

        describe('then stopPolling', function() {
          beforeEach(function stopPolling() {
            element.shadowRoot.getElementById('stop')!.click();
          });

          beforeEach(() => aTimeout(100));

          it('stops calling refetch', function() {
            expect(element.observableQuery!.refetch).to.have.been.calledThrice;
          });
        });
      });

      describe('without variables', function() {
        let element: ApolloQueryElement<HelloQueryData, HelloQueryVariables>;

        beforeEach(async function define() {
          function Hello() {
            const { data, error, loading } =
              useQuery<HelloQueryData, HelloQueryVariables>(HelloQuery);

            const greeting = data?.helloWorld!.greeting ?? 'Hello';
            const name = data?.helloWorld!.name ?? 'Friend';

            return html`
              <what-spin-such-loader ?active="${loading}"></what-spin-such-loader>
              <article id="error" ?hidden="${!error}">
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code>${error?.message}</code></pre>
              </article>
              <p>${greeting}, ${name}!</p>
            `;
          }

          const tag = defineCE(component(Hello));

          element = await fixture(`<${tag}></${tag}>`);
        });

        it('renders data', function() {
          expect(element.shadowRoot!.querySelector('what-spin-such-loader')!.hasAttribute('active'))
            .to.be.false;
          expect(element.shadowRoot!.getElementById('error')!.hidden).to.be.true;
          expect(element.shadowRoot!.textContent).to.include('Shalom, Chaver!');
        });
      });

      describe('with variables', function() {
        let element: ApolloQueryElement<HelloQueryData, HelloQueryVariables>;
        beforeEach(async function define() {
          const variables = {
            greeting: 'How\'s it going',
            name: 'Dude',
          };

          function Hello() {
            const { data, error, loading } =
              useQuery<HelloQueryData, HelloQueryVariables>(HelloQuery, { variables });

            const greeting = data?.helloWorld!.greeting ?? 'Hello';
            const name = data?.helloWorld!.name ?? 'Friend';

            return html`
              <what-spin-such-loader ?active="${loading}"></what-spin-such-loader>
              <article id="error" ?hidden="${!error}">
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code>${error?.message}</code></pre>
              </article>
              <p>${greeting}, ${name}!</p>
            `;
          }

          const tag = defineCE(component(Hello));

          element = await fixture(`<${tag}></${tag}>`);
        });

        beforeEach(nextFrame);

        beforeEach(async function() {
          await aTimeout(500);
        });

        it('renders data', function() {
          expect(element.shadowRoot!.querySelector('what-spin-such-loader')!.hasAttribute('active'))
            .to.be.false;
          expect(element.shadowRoot!.getElementById('error')!.hidden).to.be.true;
          expect(element.shadowRoot!.textContent).to.include('How\'s it going, Dude!');
        });
      });
    });
  });
});
