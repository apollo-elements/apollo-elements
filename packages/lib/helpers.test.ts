import { expect } from '@open-wc/testing';
import {
  isGraphQLScript,
  getGraphQLScriptChild,
  stripUndefinedValues,
} from './helpers';

describe('[lib] isGraphQLScript', function() {
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

describe('[lib] getGraphQLScriptChild', function() {
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

describe('[lib] stripUndefinedValues', function() {
  it('strips undefined values', function() {
    const input = { foo: 'bar', u: undefined };
    expect(stripUndefinedValues(input)).to.eql({ foo: 'bar' });
  });
});
