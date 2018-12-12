import gql from 'graphql-tag';

import test from 'tape';

import gqlFromInnerText from './gql-from-inner-text';

import { JSDOM } from 'jsdom';

// Expose JSDOM Element constructor
global.Element = (new JSDOM()).window.Element;
global.HTMLElement = (new JSDOM()).window.HTMLElement;
// 'Implement' innerText in JSDOM: https://github.com/jsdom/jsdom/issues/1245
Object.defineProperty(global.Element.prototype, 'innerText', {
  get() {
    return this.textContent;
  },
});

const query = 'query { one }';
const expectedGql = gql(query);

const testDom = new JSDOM(`
  <script id="valid" type="application/graphql">${query}</script>
  <script id="invalid-type" type="application/json">${query}</script>
  <script id="no-type">${query}</script>
  <div id="invalid-tag">${query}</div>
`);

const validElement = testDom.window.document.getElementById('valid');
const invalidType = testDom.window.document.getElementById('invalid-type');
const noType = testDom.window.document.getElementById('no-type');
const invalidTag = testDom.window.document.getElementById('invalid-tag');
const errorRegexp = /TypeError: Script must be of type "application\/graphql"/;

test('gqlFromInnerText with valid element', function(t) {
  t.equal(gqlFromInnerText(validElement), expectedGql, 'Returns Expected DocumentNode');
  t.doesNotThrow(() => gqlFromInnerText(validElement));
  t.end();
});

test('gqlFromInnerText with invalid type attribute', function(t) {
  t.throws(() => gqlFromInnerText(invalidType), errorRegexp, 'Throws expected error');
  t.end();
});

test('gqlFromInnerText with no type attribute', function(t) {
  t.throws(() => gqlFromInnerText(noType), errorRegexp, 'Throws expected error');
  t.end();
});

test('gqlFromInnerText with invalid tag', function(t) {
  t.throws(() => gqlFromInnerText(invalidTag), errorRegexp, 'Throws expected error');
  t.end();
});

test('gqlFromInnerText Handles weird input', function(t) {
  t.equal(gqlFromInnerText(), null, 'no params');
  t.equal(gqlFromInnerText(null), null, 'null params');
  t.equal(gqlFromInnerText(NaN), null, 'NaN params');
  t.throws(() => gqlFromInnerText({}), errorRegexp, 'undefined params');
  t.throws(() => gqlFromInnerText(1), errorRegexp, 'Number params');
  t.throws(() => gqlFromInnerText(true), errorRegexp, 'Boolean params');
  t.throws(() => gqlFromInnerText('foo'), errorRegexp, 'String params');
  t.throws(() => gqlFromInnerText(() => 'hmm'), errorRegexp, 'Function params');
  t.throws(() => gqlFromInnerText(Promise.resolve()), errorRegexp, 'Promise params');

  t.end();
});
