import { expect } from '@open-wc/testing';
import {
  isGraphQLScript,
  getGraphQLScriptChild,
  replace,
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

describe('[lib] replace', function() {
  it('replaces a string', function() {
    expect(replace('foo', '')('foobar')).to.equal('bar');
  });

  it('is identity otherwise', function() {
    expect(replace('foo', '')(1 as any)).to.equal(1);
  });
});

describe('[lib] stripUndefinedValues', function() {
  it('strips undefined values', function() {
    const input = { foo: 'bar', u: undefined };
    expect(stripUndefinedValues(input)).to.eql({ foo: 'bar' });
  });
});
