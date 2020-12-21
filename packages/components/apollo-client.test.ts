import {
  gql,
  NormalizedCacheObject,
  OperationVariables,
  TypePolicies,
} from '@apollo/client/core';

import { ApolloClient } from '@apollo/client/core';

import { ApolloElementElement, ApolloQueryElement } from '@apollo-elements/interfaces';
import { fixtureSync, expect, nextFrame, oneEvent, defineCE, aTimeout } from '@open-wc/testing';
import { ApolloClientElement } from './apollo-client';

import './apollo-client';
import { makeClient } from '@apollo-elements/test-helpers';
import type {
  NonNullableParamMutationData,
  NonNullableParamMutationVariables,
  NoParamQueryData,
  NoParamQueryVariables,
} from '@apollo-elements/test-helpers';

import { spy, stub, SinonStub } from 'sinon';

import NoParamQuery from '@apollo-elements/test-helpers/graphql/NoParam.query.graphql';

/** @ignore */
class ShallowElement<D = unknown, V = OperationVariables> extends ApolloElementElement<D, V> {
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

/** @ignore */
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

/** @ignore */
class QueryElement<D = unknown, V = OperationVariables> extends ApolloQueryElement<D, V> {
  query = NoParamQuery;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = /* html */ `
      <div id="fake"></div>
    `;
  }
}


function mockFetch() {
  stub(window, 'fetch');
}

function restoreFetch() {
  (window.fetch as SinonStub).restore?.();
}

customElements.define('shallow-element', ShallowElement);
customElements.define('deep-element', DeepElement);
customElements.define('query-element', QueryElement);

describe('<apollo-client>', function() {
  let client: ApolloClient<NormalizedCacheObject> | undefined;
  let cached: ApolloClient<NormalizedCacheObject> | undefined;
  let element: ApolloClientElement | null;
  let shallow: ShallowElement | null;
  let deep: DeepElement | null;
  let query: QueryElement<NoParamQueryData, NoParamQueryVariables> | null;

  afterEach(function() {
    // @ts-expect-error: spy
    QueryElement.prototype.subscribe.restore?.();
    client = undefined;
    element = null;
    shallow = null;
    deep = null;
    query = null;
  });

  describe('without client', function() {
    beforeEach(async function() {
      spy(QueryElement.prototype, 'subscribe');
      element = fixtureSync<ApolloClientElement>(/* html */`
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
    beforeEach(async function() {
      spy(QueryElement.prototype, 'subscribe');
      cached = window.__APOLLO_CLIENT__;
      delete window.__APOLLO_CLIENT__;
      client = makeClient();
      element = fixtureSync<ApolloClientElement>(/* html */`
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
      window.__APOLLO_CLIENT__ = cached;
    });

    it('lists all child elements', function() {
      expect(element!.elements).to.include(shallow);
      expect(element!.elements).to.not.include(deep);
      expect(element!.elements).to.include(query);
      expect(element!.elements.every(x => x instanceof HTMLElement), 'HTMLElement').to.be.true;
    });

    it('assigns client to shallow elements', function() {
      expect(shallow!.client, 'shallow').to.equal(client);
    });

    it('assigns client to deep elements', function() {
      expect(query!.client, 'deep').to.equal(client);
    });

    it('subscribes elements', function() {
      expect(query!.subscribe).to.have.been.called;
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
        expect(element!.elements).to.not.include(deep);
      });
    });

    describe('when a non-apollo-element fires event', function() {
      let elements: readonly ApolloElementElement[];

      beforeEach(function() {
        ({ elements } = element!);
      });

      beforeEach(function() {
        deep!.shadowRoot.getElementById('fake')!
          .dispatchEvent(new Event('apollo-element-connected', { bubbles: true, composed: true }));
      });

      it('does nothing', function() {
        expect(element!.elements).to.deep.equal(elements);
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
      element = fixtureSync<ApolloClientElement>(/* html */`
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
    class ApolloQueryEl extends ApolloQueryElement<
      NonNullableParamMutationData,
      NonNullableParamMutationVariables
    > { }

    const tag = defineCE(ApolloQueryEl);
    it('creates a new client', async function() {
      element = fixtureSync<ApolloClientElement>(/* html */`
        <apollo-client uri="/graphql" validate-variables>
          <${tag}>
            <script type="application/graphql">
              query NonNull($nonNull: Boolean!, $nullable: Boolean) {
                nonNull(nonNull: $nonNull, nullable: $nullable) {
                  nonNull
                  nullable
                }
              }
            </script>
            <script type="application/json">
              {
                "nullable": true
              }
            </script>
          </${tag}>
        </apollo-client>
      `);

      await aTimeout(100);

      expect(element.querySelector<ApolloQueryEl>(tag)!.query).to.be.ok;
      expect(element.querySelector<ApolloQueryEl>(tag)!.variables).to.be.ok;
      expect(element.querySelector<ApolloQueryEl>(tag)!.observableQuery).to.be.ok;

      // first call is to introspect, and occurs regardless of operations

      expect(window.fetch).to.not.have.been.calledTwice;
    });
  });
});
