import type { GraphQLError } from '@apollo-elements/interfaces';

import * as S from '@apollo-elements/test/schema';

import {
  ApolloClient,
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { aTimeout, fixture, expect, nextFrame } from '@open-wc/testing';

import { html } from 'lit/static-html.js';

import {
  setupClient,
  isApolloError,
  assertType,
  teardownClient,
} from '@apollo-elements/test';

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

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };

export function TypeCheck(): void {
  const el = new ApolloSubscriptionElement<TypeCheckData, TypeCheckVars>();
  /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

  assertType<HTMLElement>                               (el);

  // ApolloElementInterface
  assertType<ApolloClient<NormalizedCacheObject>|null>  (el.client);
  assertType<Record<string, unknown>|undefined>         (el.context);
  assertType<boolean>                                   (el.loading);
  assertType<DocumentNode|null>                         (el.document);
  assertType<ApolloError|Error|null>                    (el.error);
  assertType<readonly GraphQLError[]|null>              (el.errors);
  assertType<TypeCheckData>                             (el.data!);
  assertType<string>                                    (el.error!.message);
  assertType<'a'>                                       (el.data.a);
  // @ts-expect-error: b as number type
  assertType<'a'>                                       (el.data.b);
  if (isApolloError(el.error!))
    assertType<readonly GraphQLError[]>                 (el.error.graphQLErrors);

  // ApolloSubscriptionInterface
  assertType<DocumentNode>                              (el.subscription!);
  assertType<TypeCheckVars>                             (el.variables!);
  assertType<ErrorPolicy>                               (el.errorPolicy!);
  assertType<string>                                    (el.errorPolicy!);
  // @ts-expect-error: ErrorPolicy is not a number
  assertType<number>                                    (el.errorPolicy!);
  assertType<FetchPolicy>                               (el.fetchPolicy!);

  /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
}
