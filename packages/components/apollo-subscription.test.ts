import * as S from '@apollo-elements/test/schema';

import * as C from '@apollo/client/core';

import { aTimeout, fixture, expect, nextFrame } from '@open-wc/testing';

import { html } from 'lit/static-html.js';

import { setupClient, teardownClient } from '@apollo-elements/test';

import './apollo-subscription';

import { ApolloSubscriptionElement } from './apollo-subscription';

import NoParamSubscription from '@apollo-elements/test/graphql/NoParam.subscription.graphql';
import NullableParamSubscription from '@apollo-elements/test/graphql/NullableParam.subscription.graphql';

describe('[components] <apollo-subscription>', function describeApolloSubscription() {
  beforeEach(setupClient);

  afterEach(teardownClient);

  describe('simply instantiating', function() {
    let element: ApolloSubscriptionElement;
    beforeEach(async function() {
      element = await fixture(html`<apollo-subscription></apollo-subscription>`);
    });

    it('has a shadow root', function() {
      expect(element.shadowRoot).to.be.ok;
    });

    it('doesn\'t render anything', function() {
      expect(element).shadowDom.to.equal('');
    });

    describe('setting fetch-policy attr', function() {
      it('cache-first', async function() {
        element.setAttribute('fetch-policy', 'cache-first');
        await element.updateComplete;
        expect(element.fetchPolicy === 'cache-first').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('cache-only', async function() {
        element.setAttribute('fetch-policy', 'cache-only');
        await element.updateComplete;
        expect(element.fetchPolicy === 'cache-only').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('network-only', async function() {
        element.setAttribute('fetch-policy', 'network-only');
        await element.updateComplete;
        expect(element.fetchPolicy === 'network-only').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('no-cache', async function() {
        element.setAttribute('fetch-policy', 'no-cache');
        await element.updateComplete;
        expect(element.fetchPolicy === 'no-cache').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('standby', async function() {
        element.setAttribute('fetch-policy', 'standby');
        await element.updateComplete;
        expect(element.fetchPolicy === 'standby').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('forwards an illegal value', async function() {
        element.setAttribute('fetch-policy', 'cache-and-network');
        await element.updateComplete;
        // @ts-expect-error: test for bad value
        expect(element.fetchPolicy === 'cache-and-network').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
    });

    describe('setting error-policy attr', function() {
      it('all', async function() {
        element.setAttribute('error-policy', 'all');
        await element.updateComplete;
        expect(element.errorPolicy === 'all').to.be.true;
        expect(element.errorPolicy).to.equal(element.controller.options.errorPolicy);
      });
      it('none', async function() {
        element.setAttribute('error-policy', 'none');
        await element.updateComplete;
        expect(element.errorPolicy === 'none').to.be.true;
        expect(element.errorPolicy).to.equal(element.controller.options.errorPolicy);
      });
      it('ignore', async function() {
        element.setAttribute('error-policy', 'ignore');
        await element.updateComplete;
        expect(element.errorPolicy === 'ignore').to.be.true;
        expect(element.errorPolicy).to.equal(element.controller.options.errorPolicy);
      });
      it('forwards an illegal value', async function() {
        element.setAttribute('error-policy', 'shmoo');
        await element.updateComplete;
        // @ts-expect-error: test for bad value
        expect(element.errorPolicy === 'shmoo').to.be.true;
        expect(element.errorPolicy).to.equal(element.controller.options.errorPolicy);
      });
    });

    describe('setting context', function() {
      it('as empty object', async function() {
        element.context = {};
        await element.updateComplete;
        expect(element.controller.options.context).to.be.ok.and.to.be.empty;
      });
      it('as non-empty object', async function() {
        element.context = { a: 'b' };
        await element.updateComplete;
        expect(element.controller.options.context).to.deep.equal({ a: 'b' });
      });
      it('as illegal non-object', async function() {
        // @ts-expect-error: test bad value
        element.context = 1;
        await element.updateComplete;
        expect(element.controller.options.context).to.equal(1);
      });
    });

    describe('setting client', function() {
      it('as global client', async function() {
        element.client = window.__APOLLO_CLIENT__!;
        await element.updateComplete;
        expect(element.controller.client).to.equal(window.__APOLLO_CLIENT__);
      });
      it('as new client', async function() {
        const client = new C.ApolloClient({ cache: new C.InMemoryCache() });
        element.client = client;
        await element.updateComplete;
        expect(element.controller.client).to.equal(client);
      });
      it('as illegal value', async function() {
        // @ts-expect-error: test bad value
        element.client = 1;
        await element.updateComplete;
        expect(element.controller.client).to.equal(1);
      });
    });

    describe('setting loading', function() {
      it('as true', async function() {
        element.loading = true;
        await element.updateComplete;
        expect(element.controller.loading).to.equal(true);
      });
      it('as false', async function() {
        element.loading = false;
        await element.updateComplete;
        expect(element.controller.loading).to.equal(false);
      });
      it('as illegal value', async function() {
        // @ts-expect-error: test bad value
        element.loading = 1;
        await element.updateComplete;
        expect(element.controller.loading).to.equal(1);
      });
    });

    describe('setting subscription', function() {
      it('as DocumentNode', async function() {
        const subscription = C.gql`{ nullable }`;
        element.subscription = subscription;
        await element.updateComplete;
        expect(element.controller.subscription)
          .to.equal(subscription)
          .and.to.equal(element.controller.document);
      });
      it('as TypedDocumentNode', async function() {
        const subscription = C.gql`{ nullable }` as C.TypedDocumentNode<{ a: 'b'}, {a: 'b'}>;
        element.subscription = subscription;
        await element.updateComplete;
        expect(element.controller.subscription).to.equal(subscription);
        const l = element as unknown as ApolloSubscriptionElement<typeof subscription>;
        l.data = { a: 'b' };
        // @ts-expect-error: can't assign bad data type
        l.data = { b: 'c' };
        // @ts-expect-error: can't assign bad variables type
        l.variables = { b: 'c' };
      });
      it('as illegal value', async function() {
        expect(() => {
          // @ts-expect-error: can't assign bad variables type
          element.subscription = 1;
        }).to.throw(/Subscription must be a parsed GraphQL document./);
        await element.updateComplete;
        expect(element.subscription)
          .to.be.null.and
          .to.equal(element.document).and
          .to.equal(element.controller.subscription).and
          .to.equal(element.controller.document);
      });
    });

    describe('setting error', function() {
      it('as ApolloError', async function() {
        const error = new C.ApolloError({ });
        element.error = error;
        await element.updateComplete;
        expect(element.controller.error).to.equal(error);
      });
      it('as Error', async function() {
        let error: Error;
        try {
          throw new Error();
        } catch (err) {
          error = err;
          element.error = error;
        }
        await element.updateComplete;
        expect(element.controller.error).to.equal(error);
      });
      it('as null', async function() {
        const error = null;
        element.error = error;
        await element.updateComplete;
        expect(element.controller.error).to.equal(error);
      });
      it('as illegal value', async function() {
        const error = 0;
        // @ts-expect-error: test bad value
        element.error = error;
        await element.updateComplete;
        expect(element.controller.error).to.equal(error);
      });
    });
  });

  describe('with "no-auto-subscribe" attribute', function() {
    let element: ApolloSubscriptionElement;
    beforeEach(async function() {
      element = await fixture(html`
        <apollo-subscription no-auto-subscribe>
          <template>{{ data.noParam.noParam }}</template>
        </apollo-subscription>
      `);
    });
    beforeEach(nextFrame);
    it('sets noAutoSubscribe', function() {
      expect(element.noAutoSubscribe, 'element').to.be.true;
      expect(element.controller.options.noAutoSubscribe, 'options').to.be.true;
    });
    describe('setting subscription', function() {
      beforeEach(() => element.subscription = S.NoParamSubscription);
      beforeEach(() => aTimeout(50));
      it('doesn\'t render anything', function() {
        expect(element).shadowDom.to.equal('');
      });
      describe('then calling subscribe()', function() {
        beforeEach(() => element.subscribe());
        beforeEach(() => aTimeout(50));
        it('renders data', function() {
          expect(element).shadowDom.to.equal('noParam');
        });
      });
    });
  });

  describe('with template attribute set but empty', function() {
    let element: ApolloSubscriptionElement;
    beforeEach(async function() {
      element = await fixture(html`<apollo-subscription template=""></apollo-subscription>`);
    });

    it('has null template', function() {
      expect(element.template).to.be.null;
    });
  });

  describe('with template attribute set but no template', function() {
    let element: ApolloSubscriptionElement;
    beforeEach(async function() {
      element = await fixture(html`<apollo-subscription template="heh"></apollo-subscription>`);
    });

    it('has null template', function() {
      expect(element.template).to.be.null;
    });
  });

  describe('with `no-shadow` attribute set as a string', function() {
    let element: ApolloSubscriptionElement;

    beforeEach(async function() {
      element = await fixture(html`<apollo-subscription no-shadow="special"></apollo-subscription>`);
    });

    it('creates a special div', function() {
      expect(element.querySelector('.special')).to.be.ok;
    });
  });

  describe('with template and subscription DOM and `no-shadow` attribute set', function() {
    let element: ApolloSubscriptionElement<typeof NoParamSubscription>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-subscription no-shadow>
          <script type="application/graphql">
            subscription NoParamSubscription {
              noParam {
                noParam
              }
            }
          </script>
          <template>
            <h1>Template</h1>
            <span id="data">{{ data.noParam.noParam }}</span>
            <span id="error">{{ error.message }}</span>
          </template>
        </apollo-subscription>
      `);
    });

    beforeEach(() => aTimeout(50));

    it('renders', function() {
      expect(element.$$('h1').length, 'h1').to.equal(1);
      expect(element.$$('span').length, 'span').to.equal(2);
      expect(element.$('#data'), '#data').to.be.ok;
      expect(element.$('#data')?.textContent, '#data').to.equal('noParam');
    });

    it('creates a subscription-result div', function() {
      expect(element.querySelector('.output')).to.be.ok;
    });

    it('renders to the light DOM', function() {
      expect(element.$('#data')).to.equal(element.querySelector('#data'));
    });

    it('does not blow away template', function() {
      expect(element.template).to.be.an.instanceof(HTMLTemplateElement);
    });

    it('does not blow away subscription', function() {
      expect(element.querySelector('script[type="application/graphql"]')).to.be.ok;
    });
  });

  describe('with `no-shadow` and `template` attributes set', function() {
    let element: ApolloSubscriptionElement<typeof NoParamSubscription>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-subscription no-shadow template="tpl" .subscription="${NoParamSubscription}"></apollo-subscription>

        <template id="tpl">
          <h1>Template</h1>
          <span id="data">{{ data.noParam.noParam }}</span>
          <span id="error">{{ error.message }}</span>
        </template>
      `);
    });

    beforeEach(() => aTimeout(50));

    it('renders', function() {
      expect(element.$$('h1').length, 'h1').to.equal(1);
      expect(element.$$('span').length, 'span').to.equal(2);
      expect(element.$('#data'), '#data').to.be.ok;
      expect(element.$('#data')?.textContent, '#data').to.equal('noParam');
    });

    it('renders to the light DOM', function() {
      expect(element.$('#data')).to.equal(element.querySelector('#data'));
    });

    it('does not blow away template', function() {
      expect(element.template).to.be.an.instanceof(HTMLTemplateElement);
    });
  });

  describe('with template in DOM and a subscription property', function() {
    let element: ApolloSubscriptionElement<typeof NoParamSubscription>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-subscription .subscription="${NoParamSubscription}">
          <template>
            <h1>Template</h1>
            <span id="data">{{ data.noParam.noParam }}</span>
            <span id="error">{{ error.message }}</span>
          </template>
        </apollo-subscription>
      `);
    });

    beforeEach(() => aTimeout(50));

    it('renders', function() {
      expect(element.$$('h1').length).to.equal(1);
      expect(element.$$('span').length).to.equal(2);
      expect(element.$('#data')).to.be.ok;
      expect(element.$('#data')?.textContent).to.equal('noParam');
    });
  });

  describe('with template, subscription, and variables in DOM', function() {
    let element: ApolloSubscriptionElement<typeof S.NullableParamSubscription>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-subscription>

          <script type="application/graphql">
            subscription NullableParamSubscription($nullable: String) {
              nullableParam(nullable: $nullable) {
                nullable
              }
            }
          </script>

          <script type="application/json">
            {
              "nullable": "DOM"
            }
          </script>

          <template>
            <h1>Template</h1>
            <span id="data">{{ data.nullableParam.nullable }}</span>
            <span id="error">{{ error.message }}</span>
          </template>

        </apollo-subscription>
      `);
    });

    beforeEach(() => aTimeout(50));

    it('renders', function() {
      expect(element.$$('h1').length).to.equal(1);
      expect(element.$$('span').length).to.equal(2);
      expect(element.$('#data')).to.be.ok;
      expect(element.$('#data')?.textContent).to.equal('DOM');
    });

    describe('setting variables property', function() {
      beforeEach(function() {
        element.variables = { nullable: 'set by js' };
      });

      beforeEach(() => aTimeout(50));

      it('rerenders', function() {
        expect(element.$('#data')).to.be.ok;
        expect(element.$('#data')?.textContent).to.equal('set by js');
      });
    });
  });

  describe('when subscription errors', function() {
    let element: ApolloSubscriptionElement<typeof S.NullableParamSubscription>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-subscription
            .subscription="${NullableParamSubscription}"
            .variables="${{ nullable: 'error' }}">
          <template>
            <h1>Template</h1>
            <span id="data">{{ data.nullableParam.nullable }}</span>
            <span id="error">{{ error.message }}</span>
          </template>
        </apollo-subscription>
      `);
    });

    beforeEach(() => element.updateComplete);

    it('renders', function() {
      expect(element.$('#error')).to.be.ok;
      expect(element.$('#error')?.textContent).to.equal('error');
    });
  });

  describe('with a list rendering template', function() {
    let element: ApolloSubscriptionElement;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-subscription>
          <template>
            <p>{{ data.me.name }}</p>
            <ul>
              <template type="repeat" repeat="{{ data.friends || [] }}">
                <li data-id="{{ item.id }}"
                    data-index="{{ index }}">{{ item.name }}</li>
              </template>
            </ul>
          </template>
        </apollo-subscription>
      `);
    });

    describe('cancelling', function() {
      beforeEach(() => element.cancel());
      describe('then setting data', function() {
        beforeEach(function() {
          element.data = {
            me: { name: 'ME' },
            friends: [
              { id: 'friend-a', name: 'A' },
              { id: 'friend-b', name: 'B' },
              { id: 'friend-c', name: 'C' },
            ],
          };
        });
        beforeEach(nextFrame);
        it('renders the list', function() {
          expect(element).shadowDom.to.equal(`
            <p>ME</p>
            <ul>
              <li data-id="friend-a" data-index="0">A</li>
              <li data-id="friend-b" data-index="1">B</li>
              <li data-id="friend-c" data-index="2">C</li>
            </ul>
          `);
        });
      });
    });
  });
});
