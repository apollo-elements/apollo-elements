import { expect } from '@open-wc/testing';

import { gqlFromInnerText } from './gql-from-inner-text';

import gql from 'graphql-tag';
import NoParamQuery from '@apollo-elements/test-helpers/NoParam.query.graphql';

const query = NoParamQuery.loc.source.body;
const expectedGql = gql(query);

const ERROR_REGEXP = /script must be of type "application\/graphql"/;

describe('[lib] gqlFromInnerText', function describeGqlFromInnerText() {
  let s: HTMLScriptElement;

  afterEach(function() {
    s?.remove();
    s = undefined;
  });

  describe('with valid element', function() {
    beforeEach(function() {
      s = document.createElement('script');
      s.setAttribute('type', 'application/graphql');
      s.textContent = query;
    });

    it('does not throw', function() {
      expect(() => gqlFromInnerText(s)).to.not.throw;
    });

    it('returns DocumentNode', function() {
      expect(gqlFromInnerText(s)).to.equal(expectedGql);
    });
  });

  describe('with invalid type attribute', function() {
    beforeEach(function() {
      s = document.createElement('script');
      s.setAttribute('type', 'application/json');
      s.textContent = query;
    });

    it('throws an error', function() {
      expect(() => gqlFromInnerText(s)).to.throw(ERROR_REGEXP, 'Throws expected error');
    });
  });

  describe('with no type attribute', function() {
    beforeEach(function() {
      s = document.createElement('script');
      s.textContent = query;
    });

    it('throws an error', function() {
      expect(() => gqlFromInnerText(s)).to.throw(ERROR_REGEXP, 'Throws expected error');
    });
  });

  describe('with invalid tag', function() {
    beforeEach(function() {
      s = document.createElement('div');
      s.textContent = query;
    });

    it('throws an error', function() {
      // @ts-expect-error: testing for error.
      expect(() => gqlFromInnerText(s)).to.throw(ERROR_REGEXP, 'Throws expected error');
    });
  });

  it('handles weird input', function() {
    expect(() => gqlFromInnerText(void 0), 'no params').to.throw(ERROR_REGEXP);
    expect(() => gqlFromInnerText(null), 'null params').to.throw(ERROR_REGEXP);
    // @ts-expect-error: testing for error.
    expect(() => gqlFromInnerText(NaN), 'NaN params').to.throw(ERROR_REGEXP);
    // @ts-expect-error: testing for error.
    expect(() => gqlFromInnerText({}), 'undefined params').to.throw(ERROR_REGEXP);
    // @ts-expect-error: testing for error.
    expect(() => gqlFromInnerText(1), 'Number params').to.throw(ERROR_REGEXP);
    // @ts-expect-error: testing for error.
    expect(() => gqlFromInnerText(true), 'Boolean params').to.throw(ERROR_REGEXP);
    // @ts-expect-error: testing for error.
    expect(() => gqlFromInnerText('foo'), 'String params').to.throw(ERROR_REGEXP);
    // @ts-expect-error: testing for error.
    expect(() => gqlFromInnerText((() => 'hmm')), 'Function params').to.throw(ERROR_REGEXP);
    // @ts-expect-error: testing for error.
    expect(() => gqlFromInnerText(Promise.resolve()), 'Promise params').to.throw(ERROR_REGEXP);
  });
});
