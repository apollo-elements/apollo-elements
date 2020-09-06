import { expect } from '@open-wc/testing';

import { getGraphQLScriptChildDocument } from './get-graphql-script-child-document';

import gql from 'graphql-tag';
import NoParamQuery from '@apollo-elements/test-helpers/NoParam.query.graphql';

const query = NoParamQuery.loc.source.body;
const expectedGql = gql(query);

describe('[lib] getGraphQLScriptChildDocument', function describeGqlFromInnerText() {
  let element: HTMLElement;

  afterEach(function() {
    element?.remove();
    element = undefined;
  });

  describe('with no script', function() {
    beforeEach(function() {
      element = document.createElement('div');
      element.innerHTML = `
      `;
    });

    it('does not throw', function() {
      expect(() => getGraphQLScriptChildDocument(element)).to.not.throw;
    });

    it('returns null', function() {
      expect(getGraphQLScriptChildDocument(element)).to.be.null;
    });
  });

  describe('with valid script', function() {
    beforeEach(function() {
      element = document.createElement('div');
      element.innerHTML = `
        <script type="application/graphql">
          ${query}
        </script>
      `;
    });

    it('does not throw', function() {
      expect(() => getGraphQLScriptChildDocument(element)).to.not.throw;
    });

    it('returns DocumentNode', function() {
      expect(getGraphQLScriptChildDocument(element)).to.equal(expectedGql);
    });
  });

  describe('with invalid type attribute', function() {
    beforeEach(function() {
      element = document.createElement('div');
      element.innerHTML = `
        <script type="application/json">
          ${query}
        </script>
      `;
    });

    it('does not throw', function() {
      expect(() => getGraphQLScriptChildDocument(element)).to.not.throw;
    });

    it('returns null', function() {
      expect(getGraphQLScriptChildDocument(element)).to.be.null;
    });
  });

  describe('with no type attribute', function() {
    beforeEach(function() {
      element = document.createElement('div');
      element.innerHTML = `
        <script>
          ${query}
        </script>
      `;
    });

    it('does not throw', function() {
      expect(() => getGraphQLScriptChildDocument(element)).to.not.throw;
    });

    it('returns null', function() {
      expect(getGraphQLScriptChildDocument(element)).to.be.null;
    });
  });
});
