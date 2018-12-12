import gql from 'graphql-tag';
import gqlFromInnerText from './gql-from-inner-text';

import { expect } from '@open-wc/testing';

const query = 'query { one }';
const expectedGql = gql(query);

const testDom = document.createElement('div');
testDom.innerHTML = `
  <script id="valid" type="application/graphql">${query}</script>
  <script id="invalid-type" type="application/json">${query}</script>
  <script id="no-type">${query}</script>
  <div id="invalid-tag">${query}</div>
`;

const validElement = testDom.querySelector('#valid');
const invalidType = testDom.querySelector('#invalid-type');
const noType = testDom.querySelector('#no-type');
const invalidTag = testDom.querySelector('#invalid-tag');
const errorRegexp = /Script must be of type "application\/graphql"/;

describe('gqlFromInnerText', function describeGqlFromInnerText() {
  it('returns with valid element', function() {
    expect(() => gqlFromInnerText(validElement)).to.not.throw;
    expect(gqlFromInnerText(validElement)).to.equal(expectedGql);
  });

  it('throws with invalid type attribute', function() {
    expect(() => gqlFromInnerText(invalidType)).to.throw(errorRegexp);
  });

  it('throws with no type attribute', function() {
    expect(() => gqlFromInnerText(noType)).to.throw(errorRegexp, 'Throws expected error');
  });

  it('throws with invalid tag', function() {
    expect(() => gqlFromInnerText(invalidTag)).to.throw(errorRegexp, 'Throws expected error');
  });

  it('handles weird input', function() {
    expect(gqlFromInnerText(), 'no params').to.be.null;
    expect(gqlFromInnerText(null), 'null params').to.be.null;
    expect(gqlFromInnerText(NaN), 'NaN params').to.be.null;
    expect(() => gqlFromInnerText({}), 'undefined params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText(1), 'Number params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText(true), 'Boolean params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText('foo'), 'String params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText(() => 'hmm'), 'Function params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText(Promise.resolve()), 'Promise params').to.throw(errorRegexp);
  });
});
