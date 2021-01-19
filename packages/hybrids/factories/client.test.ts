import { expect, fixture } from '@open-wc/testing';
import { ApolloElementElement } from '@apollo-elements/interfaces';
import { cuid } from '@apollo-elements/lib/cuid';
import { setupClient, teardownClient } from '@apollo-elements/test-helpers';
import { define } from 'hybrids';
import { client } from './client';

function getTag(): string {
  return `client-${cuid()}`;
}

describe('[hybrids] client factory', function() {
  let element: ApolloElementElement;

  afterEach(function() {
    element.remove();
    // @ts-expect-error: fixture
    element = undefined;
  });

  describe('with global client', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    describe('with no arguments', function() {
      beforeEach(async function() {
        const tag = getTag();
        define<ApolloElementElement>(tag, {
          client: client(),
        });
        element = await fixture<ApolloElementElement>(`<${tag}></${tag}>`);
      });

      it('uses global', function() {
        expect(element.client).to.equal(window.__APOLLO_CLIENT__);
      });
    });

    describe('with null first argument and no options', function() {
      beforeEach(async function() {
        const tag = getTag();
        define<ApolloElementElement>(tag, {
          client: client(null),
        });
        element = await fixture<ApolloElementElement>(`<${tag}></${tag}>`);
      });

      it('uses global', function() {
        expect(element.client).to.equal(window.__APOLLO_CLIENT__);
      });
    });

    describe('with null first argument and { useGlobal: true } options', function() {
      beforeEach(async function() {
        const tag = getTag();
        define<ApolloElementElement>(tag, {
          client: client(null, { useGlobal: true }),
        });
        element = await fixture<ApolloElementElement>(`<${tag}></${tag}>`);
      });

      it('uses global', function() {
        expect(element.client).to.equal(window.__APOLLO_CLIENT__);
      });
    });

    describe('with null first argument and { useGlobal: false } options', function() {
      beforeEach(async function() {
        const tag = getTag();
        define<ApolloElementElement>(tag, {
          client: client(null, { useGlobal: false }),
        });
        element = await fixture<ApolloElementElement>(`<${tag}></${tag}>`);
      });

      it('uses specific null client', function() {
        expect(element.client).to.be.null;
      });

      it('does not use global', function() {
        expect(element.client).to.not.equal(window.__APOLLO_CLIENT__);
      });
    });

    describe('with null first argument and {} options', function() {
      beforeEach(async function() {
        const tag = getTag();
        define<ApolloElementElement>(tag, {
          // @ts-expect-error: bad input
          client: client(null, {}),
        });
        element = await fixture<ApolloElementElement>(`<${tag}></${tag}>`);
      });

      it('uses global', function() {
        expect(element.client).to.equal(window.__APOLLO_CLIENT__);
      });
    });

    describe('with specific first argument and no options', function() {
      const specific = {} as typeof window.__APOLLO_CLIENT__;
      beforeEach(async function() {
        const tag = getTag();
        define<ApolloElementElement>(tag, {
          client: client(specific),
        });
        element = await fixture<ApolloElementElement>(`<${tag}></${tag}>`);
      });

      it('uses specific client', function() {
        expect(element.client).to.equal(specific);
      });

      it('does not use global', function() {
        expect(element.client).to.not.equal(window.__APOLLO_CLIENT__);
      });
    });

    describe('with specific first argument and { useGlobal: true } options', function() {
      const specific = {} as typeof window.__APOLLO_CLIENT__;
      beforeEach(async function() {
        const tag = getTag();
        define<ApolloElementElement>(tag, {
          client: client(specific, { useGlobal: true }),
        });
        element = await fixture<ApolloElementElement>(`<${tag}></${tag}>`);
      });

      it('uses specific client', function() {
        expect(element.client).to.equal(specific);
      });

      it('does not use global', function() {
        expect(element.client).to.not.equal(window.__APOLLO_CLIENT__);
      });
    });

    describe('with specific first argument and { useGlobal: false } options', function() {
      const specific = {} as typeof window.__APOLLO_CLIENT__;
      beforeEach(async function() {
        const tag = getTag();
        define<ApolloElementElement>(tag, {
          client: client(specific, { useGlobal: false }),
        });
        element = await fixture<ApolloElementElement>(`<${tag}></${tag}>`);
      });

      it('uses specific client', function() {
        expect(element.client).to.equal(specific);
      });

      it('does not use global', function() {
        expect(element.client).to.not.equal(window.__APOLLO_CLIENT__);
      });
    });

    describe('with specific first argument and {} options', function() {
      const specific = {} as typeof window.__APOLLO_CLIENT__;
      beforeEach(async function() {
        const tag = getTag();
        define<ApolloElementElement>(tag, {
          // @ts-expect-error: bad input
          client: client(specific, { }),
        });
        element = await fixture<ApolloElementElement>(`<${tag}></${tag}>`);
      });

      it('uses specific client', function() {
        expect(element.client).to.equal(specific);
      });

      it('does not use global', function() {
        expect(element.client).to.not.equal(window.__APOLLO_CLIENT__);
      });
    });
  });
});
