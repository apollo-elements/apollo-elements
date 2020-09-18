import { ApolloElementInterface, ApolloQueryInterface } from '@apollo-elements/interfaces';
import { ApolloElementMixin, ApolloQueryMixin } from '@apollo-elements/mixins';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

import { html, fixtureSync, expect, nextFrame } from '@open-wc/testing';
import { ApolloClientElement } from './apollo-client';

import './apollo-client';
import { makeClient, NoParamQueryData, NoParamQueryVariables } from '@apollo-elements/test-helpers';

import NoParamQuery from '@apollo-elements/test-helpers/NoParam.query.graphql';

/** @ignore */
class ShallowElement extends ApolloElementMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<deep-element></deep-element>`;
  }
}

/** @ignore */
class DeepElement extends ApolloQueryMixin(HTMLElement) {
  query = NoParamQuery;
}

customElements.define('shallow-element', ShallowElement);
customElements.define('deep-element', DeepElement);

describe('<apollo-client>', function() {
  let client: ApolloClient<NormalizedCacheObject>;
  let cached: ApolloClient<NormalizedCacheObject>;
  let element: ApolloClientElement;
  let shallow: ApolloElementInterface & HTMLElement;
  let deep: ApolloQueryInterface<NoParamQueryData, NoParamQueryVariables> & HTMLElement;

  describe('with client', function() {
    beforeEach(async function() {
      cached = window.__APOLLO_CLIENT__;
      delete window.__APOLLO_CLIENT__;
      client = makeClient();
      element = fixtureSync<ApolloClientElement>(html`
        <apollo-client .client="${client}">
          <shallow-element></shallow-element>
        </apollo-client>
      `);
      shallow = element.querySelector('shallow-element');
      deep = shallow.shadowRoot.querySelector('deep-element');
      expect(window.__APOLLO_CLIENT__, 'no global client').to.be.undefined;
    });

    afterEach(function() {
      client = undefined;
      element = undefined;
      shallow = undefined;
      deep = undefined;
      window.__APOLLO_CLIENT__ = cached;
    });

    it('assigns client to shallow elements', function() {
      expect(shallow.client, 'shallow').to.equal(client);
    });

    it('assigns client to deep elements', function() {
      expect(deep.client, 'deep').to.equal(client);
    });

    describe('when setting client', function() {
      const next = makeClient();
      beforeEach(function() {
        element.client = next;
      });

      it('reassigns client to shallow elements', function() {
        expect(shallow.client, 'shallow').to.equal(next);
        expect(shallow.client, 'shallow').to.not.equal(client);
      });

      it('reassigns client to deep elements', function() {
        expect(deep.client, 'deep').to.equal(next);
        expect(deep.client, 'deep').to.not.equal(client);
      });

      describe('when element is a query element', function() {
        beforeEach(nextFrame);
        it('subscribes', function() {
          expect(deep.data).to.be.ok;
        });
      });
    });
  });
});
