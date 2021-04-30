import type { SetupOptions } from '@apollo-elements/test';

import type {
  NullableParamSubscriptionData,
  NullableParamSubscriptionVariables,
} from '@apollo-elements/test/schema';

import { html } from 'haunted';
import { useSubscription } from './useSubscription';
import { component } from 'haunted';

import { TypedDocumentNode, DocumentNode, gql } from '@apollo/client/core';

import NullableParamSubscription from '@apollo-elements/test/graphql/NullableParam.subscription.graphql';

import { aTimeout, defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import {
  setupClient,
  setupSpies,
  setupStubs,
  teardownClient,
  assertType,
} from '@apollo-elements/test';

import {
  describeSubscription,
  SubscriptionElement,
} from '@apollo-elements/test/subscription.test';

import { ApolloSubscriptionElement, Entries } from '@apollo-elements/interfaces';

describe('[haunted] useSubscription', function() {
  const ccOrig = ApolloSubscriptionElement.prototype.connectedCallback;

  afterEach(function() {
    ApolloSubscriptionElement.prototype.connectedCallback = ccOrig;
  });

  describeSubscription({
    async setupFunction<T extends SubscriptionElement>(opts?: SetupOptions<T>) {
      const { innerHTML = '', attributes, properties } = opts ?? {};

      ApolloSubscriptionElement.prototype.connectedCallback = function(this: T) {
        this.stringify = (x: unknown) => JSON.stringify(x, null, 2);

        this.hasRendered = async () => {
          await nextFrame();
          return this;
        };

        ccOrig?.call?.(this);
      };

      function Subscription<H extends T>(this: H) {
        const { loading, data, error } = useSubscription(null as unknown as DocumentNode);

        return html`
          <output id="data">${this.stringify(data)}</output>
          <output id="error">${this.stringify(error)}</output>
          <output id="loading">${this.stringify(loading)}</output>
        `;
      }

      const klass = component<SubscriptionElement>(Subscription);

      const tag = defineCE(klass);

      const attrs = attributes ? ` ${attributes}` : '';

      const element = await fixture<T>(`<${tag}${attrs}>${innerHTML}</${tag}>`);

      const spies = setupSpies(opts?.spy, element);
      const stubs = setupStubs(opts?.stub, element);

      for (const [key, val] of Object.entries(properties ?? {}) as Entries<T>)
        element[key] = val;

      return { element, spies, stubs };
    },

  });

  describe('with noAutoSubscribe set', function() {
    let element: SubscriptionElement;
    beforeEach(async function define() {
      function Component() {
        const { data } =
          useSubscription<NullableParamSubscriptionData, NullableParamSubscriptionVariables>(
            NullableParamSubscription, { noAutoSubscribe: true }
          );
        return html`${data?.nullableParam?.nullable}`;
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
    let element: SubscriptionElement;

    function shouldSubscribe() {
      return false;
    }

    beforeEach(async function define() {
      function Component() {
        const { data } =
          useSubscription<NullableParamSubscriptionData, NullableParamSubscriptionVariables>(
            NullableParamSubscription, { shouldSubscribe }
          );
        return html`${data?.nullableParam?.nullable}`;
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

      describe('without variables', function() {
        let element: ApolloSubscriptionElement<
          NullableParamSubscriptionData,
          NullableParamSubscriptionVariables
        >;

        beforeEach(async function define() {
          function NullableParam() {
            const { data, error, loading } =
              useSubscription<NullableParamSubscriptionData, NullableParamSubscriptionVariables>(
                NullableParamSubscription
              );

            const nullable = data?.nullableParam!.nullable ?? 'fail';

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

        it('renders data', function() {
          expect(element.shadowRoot!.querySelector('what-spin-such-loader')!.hasAttribute('active'))
            .to.be.false;
          expect(element.shadowRoot!.getElementById('error')!.hidden).to.be.true;
          expect(element.shadowRoot!.textContent).to.not.include('fail');
          expect(element.shadowRoot!.textContent).to.include('Hello World');
        });
      });

      describe('with variables', function() {
        let element: ApolloSubscriptionElement<
          NullableParamSubscriptionData,
          NullableParamSubscriptionVariables
        >;

        beforeEach(async function define() {
          const variables = {
            nullable: 'POW',
          };

          function NullableParam() {
            const { data, error, loading } =
              useSubscription<NullableParamSubscriptionData, NullableParamSubscriptionVariables>(
                NullableParamSubscription, { variables }
              );

            const nullable = data?.nullableParam!.nullable ?? 'NullableParam';

            return html`
              <what-spin-such-loader ?active="${loading}"></what-spin-such-loader>
              <article id="error" ?hidden="${!error}"></article>
                <h2>😢 Such Sad, Very Error! 😰</h2>
                <pre><code>${error?.message}</code></pre>
              </article>
              <p>${nullable}</p>
            `;
          }

          const tag = defineCE(component(NullableParam));

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
          expect(element.shadowRoot!.textContent).to.include('POW');
        });
      });
    });
  });
});

type TypeCheckData = { a: 'a'; b: number };
type TypeCheckVars = { c: 'c'; d: number };

const TDN: TypedDocumentNode<TypeCheckData, TypeCheckVars> =
  gql`subscription TypedQuery($c: String, $d: Int) { a b }`;

function TDNTypeCheck() {
  const { data } = useSubscription(TDN);
  assertType<TypeCheckData>(data!);
}
