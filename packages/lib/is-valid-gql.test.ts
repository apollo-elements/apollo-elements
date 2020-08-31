import { expect } from '@open-wc/testing';
import gql from 'graphql-tag';

import { isValidGql } from './is-valid-gql';

const simpleValid = gql`
  query {
    myQuery {
      one
    }
  }
`;

const tag = ((strings: TemplateStringsArray, ...values: any[]): string =>
  strings.reduce((acc, string, i) => `${acc}${string}${values[i]}`, ''));

const simpleInvalid = tag`
  query {
    myQuery {
      one
    }
  }
`;

const simpleMutation = gql`mutation { foo { bar } }`;

describe('[lib] isValidGql', function() {
  it('isValidGql Validates simple query', function() {
    expect(isValidGql(simpleValid)).to.be.true;
    expect(isValidGql(simpleInvalid as any)).to.be.false;
  });

  it('isValidGql Validates simple mutation', function() {
    expect(isValidGql(simpleMutation)).to.be.true;
  });

  it('isValidGql Handles weird input', function() {
    expect(isValidGql(void 0), 'no params').to.be.false;
    expect(isValidGql({} as any), 'undefined params').to.be.false;
    expect(isValidGql(null), 'null params').to.be.false;
    expect(isValidGql(NaN as any), 'NaN params').to.be.false;
    expect(isValidGql(1 as any), 'Number params').to.be.false;
    expect(isValidGql(true as any), 'Boolean params').to.be.false;
    expect(isValidGql('foo' as any), 'String params').to.be.false;
    expect(isValidGql((() => 'hmm') as any), 'Function params').to.be.false;
    expect(isValidGql(Promise.resolve() as any), 'Promise params').to.be.false;
  });
});
