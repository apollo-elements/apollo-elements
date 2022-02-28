import type * as I from '@apollo-elements/core/types';
import { defineCE, expect, fixtureSync } from '@open-wc/testing';
import { TypePoliciesMixin } from './type-policies-mixin';
import { ApolloQueryMixin } from './apollo-query-mixin';
import { setupClient, teardownClient } from '@apollo-elements/test';
import { gql } from '@apollo/client/core';

describe('TypePoliciesMixin', function() {
  class Base<D, V = I.VariablesOf<D>>
    extends TypePoliciesMixin(ApolloQueryMixin(HTMLElement))<D, V> { }

  let element: Base<unknown>;

  const query = gql`{
    hello @client
  }`;

  beforeEach(setupClient);
  afterEach(teardownClient);

  describe('with typePolicies set on the instance', function() {
    beforeEach(function() {
      class Test extends Base<unknown> {
        typePolicies = {
          Query: {
            fields: {
              hello() {
                return 'hello';
              },
            },
          },
        };
      }
      const tag = defineCE(Test);
      element = fixtureSync<Test>(`<${tag}></${tag}>`);
    });

    it('adds typePolicies to the cache', async function() {
      expect(await element.client!.query({ query }))
        .to.deep.equal({
          data: { hello: 'hello' },
          loading: false,
          networkStatus: 7,
        });
    });
  });
});
