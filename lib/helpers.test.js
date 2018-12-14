import { expect } from '@open-wc/testing';
import {
  isGraphQLScript,
  getGraphQLScriptChild,
  replace,
} from './helpers.js';

describe('isGraphQLScript', function() {
  it('validates valid script', function() {
    const validScript = document.createElement('script');
    validScript.setAttribute('type', 'application/graphql');
    expect(isGraphQLScript(validScript)).to.be.true;
  });

  it('invalidates invalid script', function() {
    const invalid = document.createElement('script');
    invalid.setAttribute('type', 'text/javascript');
    expect(isGraphQLScript(invalid)).to.be.false;
  });
});

describe('getGraphQLScriptChild', function() {
  it('gets a graphql script child', function() {
    const doc = `query foo { bar }`;
    const element = document.createElement('div');
    element.innerHTML = `<script type="application/graphql">${doc}</script>`;
    expect(getGraphQLScriptChild(element)).to.equal(element.firstElementChild);
  });

  it('returns null otherwise', function() {
    const element = document.createElement('div');
    element.innerHTML = `<script></script>`;
    expect(getGraphQLScriptChild(element)).to.be.null;
  });
});

describe('replace', function() {
  it('replaces a string', function() {
    expect(replace('foo', '')('foobar')).to.equal('bar');
  });

  it('is identity otherwise', function() {
    expect(replace('foo', '')(1)).to.equal(1);
  });
});
