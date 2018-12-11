import isValidGql from './is-valid-gql';
import gql from 'graphql-tag';
import test from 'tape';

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

test('isValidGql Validates simple query', function(t) {
  t.equal(isValidGql(simpleValid), true);
  t.equal(isValidGql(simpleInvalid), false);
  t.end();
});

test('isValidGql Handles weird input', function(t) {
  t.equal(isValidGql(), false, 'no params');
  t.equal(isValidGql({}), false, 'undefined params');
  t.equal(isValidGql(null), false, 'null params');
  t.equal(isValidGql(NaN), false, 'NaN params');
  t.equal(isValidGql(1), false, 'Number params');
  t.equal(isValidGql(true), false, 'Boolean params');
  t.equal(isValidGql('foo'), false, 'String params');
  t.equal(isValidGql(() => 'hmm'), false, 'Function params');
  t.equal(isValidGql(Promise.resolve()), false, 'Promise params');

  t.end();
});
