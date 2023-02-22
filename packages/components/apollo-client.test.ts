/* eslint-disable max-len */
import type * as I from '@apollo-elements/core/types';

import type { SinonSpy } from 'sinon';

import type {
  NonNullableParamQueryData,
  NonNullableParamQueryVariables,
  NoParamQueryData,
  NoParamQueryVariables,
} from '@apollo-elements/test';

import type { ApolloQueryController } from '@apollo-elements/core';

import {
  gql,
  NormalizedCacheObject,
  type OperationVariables,
  TypePolicies,
} from '@apollo/client/core';

import { ApolloClient, TypedDocumentNode } from '@apollo/client/core';

import { ApolloController } from '@apollo-elements/core';

import * as Core from '@apollo-elements/core';
import * as S from '@apollo-elements/test/schema';

import * as FAST from '@apollo-elements/fast';
import * as Lit from '@apollo-elements/lit-apollo';
import * as LitDeco from 'lit/decorators.js';
import * as Haunted from '@apollo-elements/haunted';
import * as Hybrids from '@apollo-elements/hybrids';

import '@apollo-elements/polymer/polymer-apollo-query';

import {
  aTimeout,
  defineCE,
  expect,
  fixture,
  fixtureSync,
  nextFrame,
  oneEvent,
} from '@open-wc/testing';

import { html, unsafeStatic } from 'lit/static-html.js';

import { ApolloQueryMixin, ApolloMutationMixin } from '@apollo-elements/mixins';

import { ApolloClientElement } from './apollo-client';
import { makeClient, teardownClient } from '@apollo-elements/test';
import { spy, stub, SinonStub } from 'sinon';

import './apollo-client';

function mockFetch() {
  stub(window, 'fetch');
}

function restoreFetch() {
  (window.fetch as SinonStub).restore?.();
}

describe('<apollo-client>', function() {
  describe('with basic elements', function() {
    class ShallowElement<
      D,
      V extends OperationVariables = I.VariablesOf<D>,
    > extends ApolloMutationMixin(HTMLElement)<D, V> {
      declare shadowRoot: ShadowRoot;

      constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = `
          <deep-element></deep-element>
          <div>
            <span></span>
          </div>
        `;
        this.shadowRoot.appendChild(new Text('yipee'));
      }
    }

    class DeepElement extends HTMLElement {
      declare shadowRoot: ShadowRoot;

      constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = /* html */`
          <query-element></query-element>
          <div id="fake"></div>
          <svg></svg>
        `;
        this.shadowRoot.appendChild(new Text('wheee'));
      }
    }

    class QueryElement<
      D,
      V extends OperationVariables = I.VariablesOf<D>,
    > extends ApolloQueryMixin(HTMLElement)<D, V> {
      query = S.NoParamQuery;

      constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = /* html */ `
          <div id="fake"></div>
        `;
      }
    }

    before(function() {
      customElements.define('shallow-element', ShallowElement);
      customElements.define('deep-element', DeepElement);
      customElements.define('query-element', QueryElement);
    });

    let client: ApolloClient<NormalizedCacheObject> | undefined;
    let cached: ApolloClient<NormalizedCacheObject> | undefined;
    let element: ApolloClientElement | null;
    let shallow: ShallowElement<any> | null;
    let deep: DeepElement | null;
    let query: QueryElement<NoParamQueryData, NoParamQueryVariables> | null;

    afterEach(function() {
      (QueryElement.prototype.subscribe as SinonSpy)?.restore?.();
      delete window.__APOLLO_CLIENT__;
      client = undefined;
      element = null;
      shallow = null;
      deep = null;
      query = null;
    });

    describe('without client', function() {
      beforeEach(async function() {
        spy(QueryElement.prototype, 'subscribe');
        element = await fixture<ApolloClientElement>(html`
          <apollo-client>
            <shallow-element></shallow-element>
            <deep-element></deep-element>
            <query-element></query-element>
          </apollo-client>
        `);
        shallow = element.querySelector('shallow-element');
        deep = shallow!.shadowRoot.querySelector('deep-element');
        query = deep!.shadowRoot.querySelector('query-element');
        expect(window.__APOLLO_CLIENT__, 'no global client').to.be.undefined;
      });

      it('does not initialize elements', function() {
        expect(query!.subscribe).to.not.have.been.called;
      });
    });

    describe('with client', function() {
      beforeEach(async function setupElements() {
        spy(QueryElement.prototype, 'subscribe');
        cached = window.__APOLLO_CLIENT__;
        delete window.__APOLLO_CLIENT__;
        client = makeClient();
        spy(client, 'watchQuery');
        element = await fixture<ApolloClientElement>(html`
          <apollo-client>
            <shallow-element></shallow-element>
            <deep-element></deep-element>
            <query-element></query-element>
          </apollo-client>
        `);
        element.client = client as ApolloClientElement['client'];
        shallow = element.querySelector('shallow-element');
        deep = shallow!.shadowRoot.querySelector('deep-element');
        query = deep!.shadowRoot.querySelector('query-element');
        expect(window.__APOLLO_CLIENT__, 'no global client').to.be.undefined;
      });

      afterEach(function() {
        (client?.watchQuery as SinonSpy).restore?.();
        window.__APOLLO_CLIENT__ = cached;
      });

      beforeEach(nextFrame);

      it('lists all child controllers', function() {
        expect(element!.controllers).to.include(shallow!.controller);
        expect(element!.controllers).to.not.include(deep);
        expect(element!.controllers).to.include(query!.controller);
        expect(element!.controllers.every(x => x instanceof ApolloController), 'ApolloController').to.be.true;
      });

      it('assigns client to shallow elements', function() {
        expect(shallow!.client, 'shallow').to.equal(client);
      });

      it('assigns client to deep elements', function() {
        expect(query!.client, 'deep').to.equal(client);
      });

      it('subscribes elements', function() {
        expect(client!.watchQuery).to.have.been.called;
      });

      describe('when setting client', function() {
        const next = makeClient() as ApolloClientElement['client'];
        beforeEach(function() {
          element!.client = next;
        });

        it('reassigns client to shallow elements', function() {
          expect(shallow!.client, 'shallow').to.equal(next);
          expect(shallow!.client, 'shallow').to.not.equal(client);
        });

        it('reassigns client to deep elements', function() {
          expect(query!.client, 'deep').to.equal(next);
          expect(query!.client, 'deep').to.not.equal(client);
        });

        describe('when element is a query element', function() {
          beforeEach(nextFrame);
          it('subscribes', function() {
            expect(query!.data).to.be.ok;
          });
        });
      });

      describe('moving the deep element out of scope', function() {
        beforeEach(function() {
          document.body.append(deep!);
        });

        afterEach(function() { deep!.remove(); });

        it('deletes deep element client', function() {
          expect(query!.client).to.not.be.ok;
        });

        it('removes deep from elements list', function() {
          expect(element!.controllers).to.not.include(deep);
        });
      });

      describe('when a non-apollo-element fires event', function() {
        let controllers: readonly ApolloController<any>[];

        beforeEach(function() {
          ({ controllers } = element!);
        });

        beforeEach(function() {
          deep!.shadowRoot.getElementById('fake')!
            .dispatchEvent(new Event('apollo-element-connected', { bubbles: true, composed: true }));
        });

        it('does nothing', function() {
          expect(element!.controllers).to.deep.equal(controllers);
        });
      });

      describe('setting typePolicies', function() {
        const user = Symbol('user');
        const typePolicies: TypePolicies = {
          Query: {
            fields: {
              user() {
                return user;
              },
            },
          },
        };

        beforeEach(function() {
          element!.typePolicies = typePolicies;
        });

        afterEach(function() {
          element!.typePolicies = undefined;
        });

        it('loads the type policies', function() {
          expect(client?.readQuery({ query: gql`{ user @client }` }).user).to.equal(user);
        });

        it('returns the set typePolicies', function() {
          expect(element!.typePolicies).to.equal(typePolicies);
        });
      });

      describe('setting non-string uri', function() {
        beforeEach(function() {
          spy(element!, 'createApolloClient');
          // @ts-expect-error: bad input
          element.uri = 1;
        });

        afterEach(function() {
          // @ts-expect-error: spy
          element.createApolloClient.restore();
        });

        it('does nothing', function() {
          expect(element!.uri).to.be.undefined;
          expect(element!.createApolloClient).to.not.have.been.called;
        });
      });
    });

    describe('with uri', function() {
      beforeEach(mockFetch);
      afterEach(restoreFetch);
      it('creates a new client', async function() {
        element = fixtureSync<ApolloClientElement>(html`
          <apollo-client uri="/graphql"></apollo-client>
        `);
        const { detail } = await oneEvent(element, 'client-changed');
        expect(detail.value).to.be.an.instanceOf(ApolloClient);
        expect(detail.value).to.eq(element.client);
      });
    });

    describe('with uri and validate-variables', function() {
      beforeEach(mockFetch);
      afterEach(restoreFetch);

      class ApolloQueryEl extends ApolloQueryMixin(HTMLElement)<
        NonNullableParamQueryData,
        NonNullableParamQueryVariables
      > { }

      const tag = defineCE(ApolloQueryEl);
      const tagName = unsafeStatic(tag);

      it('creates a new client', async function() {
        element = await fixture<ApolloClientElement>(html`
          <apollo-client uri="/graphql" validate-variables>
            <${tagName}
                .query="${S.NonNullableParamQuery}"
                .variables="${{ 'nullable': true }}"
            ></${tagName}>
          </apollo-client>
        `);

        await aTimeout(100);

        expect(element.querySelector<ApolloQueryEl>(tag)!.query).to.be.ok;
        expect(element.querySelector<ApolloQueryEl>(tag)!.variables).to.be.ok;

        // first call is to introspect, and occurs regardless of operations

        expect(window.fetch).to.not.have.been.calledTwice;
      });
    });
  });

  describe('with various children', function() {
    const TagNameQuery: TypedDocumentNode<{ tagName: string }, { tagName: string }> =
    gql`query TagNameQuery($tagName: String!) { tagName(tagName: $tagName) { tagName } }`;

    beforeEach(teardownClient);
    beforeEach(mockFetch);
    afterEach(restoreFetch);

    describe('that implement the apollo-query interface', function() {
      const TAG_NAMES = {
        fast: 'fast-apollo-query',
        lit: 'lit-apollo-query',
        polymer: 'polymer-apollo-query',
      };

      /* eslint-disable @typescript-eslint/no-unused-vars */
      @FAST.customElement({ name: TAG_NAMES.fast })
      class FASTApolloQuery extends FAST.ApolloQuery<any> { }

      @LitDeco.customElement(TAG_NAMES.lit)
      class LitApolloQuery extends Lit.ApolloQuery<any> { }
      /* eslint-enable @typescript-eslint/no-unused-vars */

      Object.values(TAG_NAMES).forEach(tagName => {
        describe(tagName, function() {
          beforeEach(async function(this: Mocha.Context) {
            const name = unsafeStatic(tagName);
            await fixture(html`
              <apollo-client uri="/graphql">
                <${name} .query="${TagNameQuery}" .variables="${{ tagName }}"></${name}>
              </apollo-client>
            `);
          });

          beforeEach(() => aTimeout(50));

          it('fetches the query', async function() {
            expect(window.fetch).to.have.been.calledOnce;
            const [, { body }] = (window.fetch as SinonSpy).firstCall.args;
            expect(JSON.parse(body).variables.tagName).to.equal(tagName);
          });
        });
      });
    });

    describe('that implement an ApolloQuery controller', function() {
      const FIXTURES = {

        haunted: {
          tagName: 'haunted-use-query',
          register: () => {
            const { tagName } = FIXTURES.haunted;
            customElements.define(tagName, Haunted.component(
              function HauntedApolloQuery(this: HTMLElement) {
                const { data } = Haunted.useQuery(TagNameQuery, { hostElement: this, variables: { tagName } });
                return JSON.stringify(data);
              } as any));
          },
        },

        lit: {
          tagName: 'lit-apollo-query-controller',
          register: () => {
            const { tagName } = FIXTURES.lit;
            @LitDeco.customElement(tagName) class LitApolloQueryController extends Lit.LitElement {
              query = new Core.ApolloQueryController(this, TagNameQuery, { variables: { tagName } });
            }
          },
        },

        hybrids: {
          tagName: 'hybrids-apollo-query-controller',
          register: () => {
            const { tagName } = FIXTURES.hybrids;
            Hybrids.define({
              tag: tagName,
              render: (host: any) => Hybrids.html`${JSON.stringify(host.query.data)}`,
              query: Hybrids.query(TagNameQuery, { variables: { tagName } }),
            } as unknown as Hybrids.Component<HTMLElement & { query: ApolloQueryController<typeof TagNameQuery> }>);
          },
        },

      };

      Object.values(FIXTURES).forEach(({ tagName, register }) => {
        describe(tagName, function() {
          beforeEach(register);
          beforeEach(async function() {
            await fixture(`
              <apollo-client uri="/graphql">
                <${tagName}></${tagName}>
              </apollo-client>
            `);
          });

          beforeEach(() => aTimeout(50));

          it('fetches the query', function() {
            expect(window.fetch).to.have.been.calledOnce;
            const [, init] = (window.fetch as SinonSpy).firstCall.args;
            expect(JSON.parse(init.body).variables.tagName).to.equal(tagName);
          });
        });
      });
    });
  });
});
