
import { defineCE, expect, fixtureSync } from '@open-wc/testing';
import { TypePoliciesMixin } from './type-policies-mixin';
import { ApolloElementMixin } from './apollo-element-mixin';
import { setupClient, teardownClient } from '@apollo-elements/test-helpers';
import { gql } from '@apollo/client/core';

describe('TypePoliciesMixin', function() {
  class Base extends TypePoliciesMixin(ApolloElementMixin(HTMLElement)) {
    declare data: null;

    declare variables: null;
  }

  let element: Base;

  const query = gql`{
    hello @client
  }`;

  beforeEach(setupClient);
  afterEach(teardownClient);

  describe('with typePolicies set on the instance', function() {
    beforeEach(function() {
      class Test extends Base {
        typePolicies = {
          Query: {
            fields: {
              hello() {
                return 'hello';
              },
            },
          },
        }
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
