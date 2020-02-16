import { expect } from '@open-wc/testing';

import gql from 'graphql-tag';
import gqlFromInnerText from './gql-from-inner-text';

const query = 'query { one }';
const expectedGql = gql(query);

const testDom = document.createElement('div');
testDom.innerHTML = `
  <script id="valid" type="application/graphql">${query}</script>
  <script id="invalid-type" type="application/json">${query}</script>
  <script id="no-type">${query}</script>
  <div id="invalid-tag">${query}</div>
`;

const validElement = testDom.querySelector('#valid') as HTMLScriptElement;
const invalidType = testDom.querySelector('#invalid-type') as HTMLScriptElement;
const noType = testDom.querySelector('#no-type') as HTMLScriptElement;
const invalidTag = testDom.querySelector('#invalid-tag');
const errorRegexp = /Script must be of type "application\/graphql"/;

describe('[lib] gqlFromInnerText', function describeGqlFromInnerText() {
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
    expect(() => gqlFromInnerText(
      // overriding type since that's the test
      invalidTag as HTMLScriptElement
    )).to.throw(errorRegexp, 'Throws expected error');
  });

  it('handles weird input', function() {
    expect(gqlFromInnerText(void 0), 'no params').to.be.null;
    expect(gqlFromInnerText(null), 'null params').to.be.null;
    expect(gqlFromInnerText(NaN as any), 'NaN params').to.be.null;
    expect(() => gqlFromInnerText({} as any), 'undefined params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText(1 as any), 'Number params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText(true as any), 'Boolean params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText('foo' as any), 'String params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText((() => 'hmm') as any), 'Function params').to.throw(errorRegexp);
    expect(() => gqlFromInnerText(Promise.resolve() as any), 'Promise params').to.throw(errorRegexp);
  });
});
