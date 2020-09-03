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
    // @ts-expect-error: testing invalid input
    expect(isValidGql(simpleInvalid)).to.be.false;
  });

  it('isValidGql Validates simple mutation', function() {
    expect(isValidGql(simpleMutation)).to.be.true;
  });

  it('isValidGql Handles weird input', function() {
    expect(isValidGql(void 0), 'no params').to.be.false;
    // @ts-expect-error: testing invalid input
    expect(isValidGql({}), 'undefined params').to.be.false;
    expect(isValidGql(null), 'null params').to.be.false;
    // @ts-expect-error: testing invalid input
    expect(isValidGql(NaN), 'NaN params').to.be.false;
    // @ts-expect-error: testing invalid input
    expect(isValidGql(1), 'Number params').to.be.false;
    // @ts-expect-error: testing invalid input
    expect(isValidGql(true), 'Boolean params').to.be.false;
    // @ts-expect-error: testing invalid input
    expect(isValidGql('foo'), 'String params').to.be.false;
    // @ts-expect-error: testing invalid input
    expect(isValidGql((() => 'hmm')), 'Function params').to.be.false;
    // @ts-expect-error: testing invalid input
    expect(isValidGql(Promise.resolve()), 'Promise params').to.be.false;
  });
});
