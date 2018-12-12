import isValidGql from './is-valid-gql';
import gql from 'graphql-tag';
import { expect } from '@open-wc/testing';

const simpleValid = gql`
  query {
    myQuery {
      one
    }
  }
`;

const tag = (x => x);
const simpleInvalid = tag`
  query {
    myQuery {
      one
    }
  }
`;

describe('isValidGql', function() {
  it('isValidGql Validates simple query', function() {
    expect(isValidGql(simpleValid)).to.be.true;
    expect(isValidGql(simpleInvalid)).to.be.false;
  });

  it('isValidGql Handles weird input', function() {
    expect(isValidGql(), 'no params').to.be.false;
    expect(isValidGql({}), 'undefined params').to.be.false;
    expect(isValidGql(null), 'null params').to.be.false;
    expect(isValidGql(NaN), 'NaN params').to.be.false;
    expect(isValidGql(1), 'Number params').to.be.false;
    expect(isValidGql(true), 'Boolean params').to.be.false;
    expect(isValidGql('foo'), 'String params').to.be.false;
    expect(isValidGql(() => 'hmm'), 'Function params').to.be.false;
    expect(isValidGql(Promise.resolve()), 'Promise params').to.be.false;
  });
});
