import {
  ApolloClient,
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { GraphQLError } from '@apollo-elements/interfaces';

import { fixture, expect, nextFrame } from '@open-wc/testing';

import { html } from 'lit-html';

import 'sinon-chai';

import {
  setupClient,
  NoParamQueryData,
  NoParamQueryVariables,
  isApolloError,
  assertType,
  NullableParamQueryData,
  NullableParamQueryVariables,
  teardownClient,
} from '@apollo-elements/test-helpers';

import './apollo-query';

import { ApolloQueryElement } from './apollo-query';

import NoParamQuery from '@apollo-elements/test-helpers/graphql/NoParam.query.graphql';
import NullableParamQuery from '@apollo-elements/test-helpers/graphql/NullableParam.query.graphql';

describe('[components] <apollo-query>', function describeApolloQuery() {
  beforeEach(setupClient);

  afterEach(teardownClient);

  describe('simply instantiating', function() {
    let element: ApolloQueryElement;
    beforeEach(async function() {
      element = await fixture(html`<apollo-query></apollo-query>`);
    });

    it('has a shadow root', function() {
      expect(element.shadowRoot).to.be.ok;
    });

    it('doesn\'t render anything', function() {
      expect(element.shadowRoot!.children).to.be.empty;
    });
  });

  describe('with template attribute set but empty', function() {
    let element: ApolloQueryElement;
    beforeEach(async function() {
      element = await fixture(html`<apollo-query template=""></apollo-query>`);
    });

    it('has null template', function() {
      expect(element.template).to.be.null;
    });
  });

  describe('with template attribute set but no template', function() {
    let element: ApolloQueryElement;
    beforeEach(async function() {
      element = await fixture(html`<apollo-query template="heh"></apollo-query>`);
    });

    it('has null template', function() {
      expect(element.template).to.be.null;
    });
  });

  describe('with `no-shadow` attribute set as a string', function() {
    let element: ApolloQueryElement;

    beforeEach(async function() {
      element = await fixture(html`<apollo-query no-shadow="special"></apollo-query>`);
    });

    it('creates a special div', function() {
      expect(element.querySelector('.special')).to.be.ok;
    });
  });

  describe('with template and query DOM and `no-shadow` attribute set', function() {
    let element: ApolloQueryElement<NoParamQueryData, NoParamQueryVariables>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query no-shadow>
          <script type="application/graphql">
            query NoParamQuery {
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
        </apollo-query>
      `);
    });

    beforeEach(nextFrame);
    beforeEach(nextFrame);

    it('renders', function() {
      expect(element.$$('h1').length).to.equal(1);
      expect(element.$$('span').length).to.equal(2);
      expect(element.$('#data')).to.be.ok;
      expect(element.$('#data')?.textContent).to.equal('noParam');
    });

    it('creates a query-result div', function() {
      expect(element.querySelector('.query-result')).to.be.ok;
    });

    it('renders to the light DOM', function() {
      expect(element.$('#data')).to.equal(element.querySelector('#data'));
    });

    it('does not blow away template', function() {
      expect(element.template).to.be.an.instanceof(HTMLTemplateElement);
    });

    it('does not blow away query', function() {
      expect(element.querySelector('script[type="application/graphql"]')).to.be.ok;
    });
  });

  describe('with `no-shadow` and `template` attributes set', function() {
    let element: ApolloQueryElement<NoParamQueryData, NoParamQueryVariables>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query no-shadow template="tpl" .query="${NoParamQuery}"></apollo-query>

        <template id="tpl">
          <h1>Template</h1>
          <span id="data">{{ data.noParam.noParam }}</span>
          <span id="error">{{ error.message }}</span>
        </template>
      `);
    });

    beforeEach(nextFrame);
    beforeEach(nextFrame);

    it('renders', function() {
      expect(element.$$('h1').length).to.equal(1);
      expect(element.$$('span').length).to.equal(2);
      expect(element.$('#data')).to.be.ok;
      expect(element.$('#data')?.textContent).to.equal('noParam');
    });

    it('renders to the light DOM', function() {
      expect(element.$('#data')).to.equal(element.querySelector('#data'));
    });

    it('does not blow away template', function() {
      expect(element.template).to.be.an.instanceof(HTMLTemplateElement);
    });
  });

  describe('with template in DOM and a query property', function() {
    let element: ApolloQueryElement<NoParamQueryData, NoParamQueryVariables>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query .query="${NoParamQuery}">
          <template>
            <h1>Template</h1>
            <span id="data">{{ data.noParam.noParam }}</span>
            <span id="error">{{ error.message }}</span>
          </template>
        </apollo-query>
      `);
    });

    beforeEach(nextFrame);

    it('renders', function() {
      expect(element.$$('h1').length).to.equal(1);
      expect(element.$$('span').length).to.equal(2);
      expect(element.$('#data')).to.be.ok;
      expect(element.$('#data')?.textContent).to.equal('noParam');
    });
  });

  describe('with template, query, and variables in DOM', function() {
    let element: ApolloQueryElement<NullableParamQueryData, NullableParamQueryVariables>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query>

          <script type="application/graphql">
            query NullableParamQuery($nullable: String) {
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

        </apollo-query>
      `);
    });

    beforeEach(nextFrame);

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

      beforeEach(nextFrame);

      it('rerenders', function() {
        expect(element.$('#data')).to.be.ok;
        expect(element.$('#data')?.textContent).to.equal('set by js');
      });
    });
  });

  describe('when query errors', function() {
    let element: ApolloQueryElement<NullableParamQueryData, NullableParamQueryVariables>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query
            .query="${NullableParamQuery}"
            .variables="${{ nullable: 'error' }}">
          <template>
            <h1>Template</h1>
            <span id="data">{{ data.nullableParam.nullable }}</span>
            <span id="error">{{ error.message }}</span>
          </template>
        </apollo-query>
      `);
    });

    it('renders', function() {
      expect(element.$('#error')).to.be.ok;
      expect(element.$('#error')?.textContent).to.equal('error');
    });
  });

  describe('with a list rendering template', function() {
    let element: ApolloQueryElement;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query>
          <template>
            <p>{{ data.me.name }}</p>
            <ul>
              <template type="repeat" repeat="{{ data.friends }}">
                <li data-id$="{{ item.id }}"
                    data-index$="{{ index }}">{{ item.name }}</li>
              </template>
            </ul>
          </template>
        </apollo-query>
      `);
    });

    describe('setting data', function() {
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
        expect(element.$$('li').length).to.equal(3);
        expect(element.shadowRoot!.textContent!.replace(/\s+/g, ' ').trim()).to.equal('ME A B C');
      });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };

function TypeCheck() {
  const el = new ApolloQueryElement<TypeCheckData, TypeCheckVars>();
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

  // ApolloQueryInterface
  assertType<DocumentNode>                              (el.query!);
  assertType<TypeCheckVars>                             (el.variables!);
  assertType<ErrorPolicy>                               (el.errorPolicy!);
  assertType<string>                                    (el.errorPolicy!);
  // @ts-expect-error: ErrorPolicy is not a number
  assertType<number>                                    (el.errorPolicy!);
  assertType<FetchPolicy>                               (el.fetchPolicy!);

  /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
}
