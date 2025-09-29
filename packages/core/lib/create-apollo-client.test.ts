import * as S from '@apollo-elements/test/schema';

import { createApolloClient } from './create-apollo-client';

import { expect } from '@open-wc/testing';

function mockApiResponse<T>(body: T = {} as T) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-type': 'application/json' },
  });
}

describe('createApolloClient()', function() {
  describe('with uri', function() {
    let client: typeof window.__APOLLO_CLIENT__;
    let fetchCalled: boolean;
    let originalFetch: typeof window.fetch;

    beforeEach(function() {
      fetchCalled = false;
      originalFetch = window.fetch;
      window.fetch = () => {
        fetchCalled = true;
        return Promise.resolve(mockApiResponse({ data: null }));
      };
      client = createApolloClient({ uri: '/graphql' });
    });

    afterEach(function() {
      window.fetch = originalFetch;
      client = undefined;
      fetchCalled = false;
    });

    describe('querying NonNull without params', function() {
      beforeEach(async function() {
        fetchCalled = false; // Reset before each test
        await client!.query({ query: S.NonNullableParamQuery, variables: { nonNull: 'test' } });
      });

      it('fetches', function() {
        expect(fetchCalled).to.be.true;
      });
    });
  });

  describe('with uri and validateVariables set', function() {
    let client: typeof window.__APOLLO_CLIENT__;
    let fetchCalled: boolean;
    let originalFetch: typeof window.fetch;

    beforeEach(function() {
      fetchCalled = false;
      originalFetch = window.fetch;
      window.fetch = () => {
        fetchCalled = true;
        return Promise.resolve(mockApiResponse({ data: null }));
      };
      client = createApolloClient({ uri: '/graphql', validateVariables: true });
    });

    afterEach(function() {
      window.fetch = originalFetch;
      client = undefined;
      fetchCalled = false;
    });

    describe('querying NonNull without params', function() {
      beforeEach(async function() {
        fetchCalled = false; // Reset before each test
        await client!.query({ query: S.NonNullableParamQuery, variables: { nonNull: null } }).catch(() => null);
      });

      it('does not fetch', function() {
        expect(fetchCalled).to.be.false;
      });
    });

    describe('querying NonNull with params', function() {
      beforeEach(async function() {
        fetchCalled = false; // Reset before each test
        await client!.query<typeof S.NonNullableParamQuery>({
          query: S.NonNullableParamQuery,
          variables: { nonNull: 'thing' },
        }).catch(() => null);
      });

      it('fetches', function() {
        expect(fetchCalled).to.be.true;
      });
    });
  });
});
