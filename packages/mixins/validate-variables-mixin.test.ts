import { defineCE, expect, fixtureSync, nextFrame } from '@open-wc/testing';
import { ValidateVariablesMixin } from './validate-variables-mixin';
import { ApolloQueryMixin } from './apollo-query-mixin';
import { setupClient, teardownClient } from '@apollo-elements/test-helpers';
import { ApolloQueryInterface } from '@apollo-elements/interfaces';

import NoParamQuery from '@apollo-elements/test-helpers/graphql/NoParam.query.graphql';
import NullableParamQuery from '@apollo-elements/test-helpers/graphql/NullableParam.query.graphql';
import NonNullableParamQuery from '@apollo-elements/test-helpers/graphql/NonNullableParam.query.graphql';

import type { DocumentNode } from '@apollo/client/core';

describe('ValidateVariablesMixin', function() {
  let element: ApolloQueryInterface<unknown, unknown>;
  function setQuery(query: DocumentNode|null) {
    return function() {
      element.query = query;
    };
  }

  beforeEach(setupClient);
  afterEach(teardownClient);

  beforeEach(function() {
    class Test extends ValidateVariablesMixin(ApolloQueryMixin(HTMLElement))<unknown, unknown> {}
    const tag = defineCE(Test);
    element = fixtureSync<Test>(`<${tag}></${tag}>`);
  });

  describe('without query', function() {
    beforeEach(setQuery(null));
    beforeEach(() => element.document = null);
    beforeEach(nextFrame);
    it('does nothing', function() {
      expect(element.data, 'data').to.not.be.ok;
      expect(element.error, 'error').to.not.be.ok;
    });
    describe('calling shouldSubscribe', function() {
      it('returns false', function() {
        expect(element.shouldSubscribe()).to.be.false;
      });
    });
  });

  describe('when query has no params', function() {
    beforeEach(setQuery(NoParamQuery));
    beforeEach(nextFrame);
    it('queries immediately', function() {
      expect(element.data, 'data').to.be.ok;
      expect(element.error, 'error').to.not.be.ok;
    });
    describe('calling shouldSubscribe', function() {
      it('returns true', function() {
        expect(element.shouldSubscribe()).to.be.true;
      });
    });
  });

  describe('when query has only nullable params', function() {
    beforeEach(setQuery(NullableParamQuery));
    beforeEach(nextFrame);
    it('queries immediately', function() {
      expect(element.data, 'data').to.be.ok;
      expect(element.error, 'error').to.not.be.ok;
    });
    describe('calling shouldSubscribe', function() {
      it('returns true', function() {
        expect(element.shouldSubscribe()).to.be.true;
      });
    });
  });

  describe('when query has only non-nullable params', function() {
    beforeEach(setQuery(NonNullableParamQuery));
    beforeEach(nextFrame);
    it('does not query', function() {
      expect(element.data, 'data').to.not.be.ok;
      expect(element.error, 'error').to.not.be.ok;
    });
    describe('calling shouldSubscribe', function() {
      it('returns false', function() {
        expect(element.shouldSubscribe()).to.be.false;
      });
    });
  });
});
