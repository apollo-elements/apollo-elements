import { ApolloElementInterface } from '@apollo-elements/interfaces';
import { ApolloElementMixin } from '@apollo-elements/mixins';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';

import { html, fixtureSync, expect } from '@open-wc/testing';
import { ApolloClientElement } from './apollo-client';

import './apollo-client';

/** @ignore */
class ShallowElement extends ApolloElementMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<deep-element></deep-element>`;
  }
}

/** @ignore */
class DeepElement extends ApolloElementMixin(HTMLElement) { }

customElements.define('shallow-element', ShallowElement);
customElements.define('deep-element', DeepElement);

function makeClient(): ApolloClient<NormalizedCacheObject> {
  const cache = new InMemoryCache();
  const link = new HttpLink({ uri: '/graphql' });
  return new ApolloClient({ cache, link, connectToDevTools: false });
}

describe('<apollo-client>', function() {
  let client: ApolloClient<NormalizedCacheObject>;
  let cached: ApolloClient<NormalizedCacheObject>;
  let element: ApolloClientElement;
  let shallow: ApolloElementInterface & HTMLElement;
  let deep: ApolloElementInterface & HTMLElement;

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
      const next = {};
      beforeEach(function() {
        // @ts-expect-error: just testing the assignment;
        element.client = next;
      });

      it('reassigns client to shallow elements', function() {
        expect(shallow.client, 'shallow').to.equal(next);
      });

      it('reassigns client to deep elements', function() {
        expect(deep.client, 'deep').to.equal(next);
      });
    });
  });
});