import hasAllVariables from './has-all-variables';
import gql from 'graphql-tag';
import test from 'tape';

const r1 = gql`
query NeedsOne($one: ID!) {
  needsOne(one: $one) {
    one
  }
}`;

const r2 = gql`
query NeedsTwo($one: String!, $two: String!) {
  needsOne(one: $one, two: $two) {
    one
    two
  }
}`;

const o1 = gql`
query OptOne($one: String) {
  optOne(one: $one) {
    one
  }
}`;

const o2 = gql`
query OptTwo($one: String, $two: String) {
  optTwo(one: $one, two: $two) {
    one
    two
  }
}`;

const r1o1 = gql`
query NeedsOneOptOne($one: String!, $two: String) {
  needsOneOptOne(one: $one, two: $two) {
    one
    two
  }
}`;

test('Validates one required variable', function(t) {
  const query = r1;
  t.equal(hasAllVariables({ query, variables: { one: '1' } }), true, 'With variable');
  t.equal(hasAllVariables({ query, variables: { } }), false, 'With no variables');
  t.end();
});

test('Validates two required variables', function(t) {
  const query = r2;
  t.equal(hasAllVariables({ query, variables: { one: '1', two: '2' } }), true, 'With all variables');
  t.equal(hasAllVariables({ query, variables: { one: '1' } }), false, 'With first variable only');
  t.equal(hasAllVariables({ query, variables: { two: '2' } }), false, 'With second variable only');
  t.equal(hasAllVariables({ query, variables: {} }), false, 'With no variables');
  t.end();
});

test('Validates one optional variable', function(t) {
  const query = o1;
  t.equal(hasAllVariables({ query, variables: { one: '1' } }), true, 'With variable');
  t.equal(hasAllVariables({ query, variables: { } }), true, 'With no variables');
  t.end();
});

test('Validates two optional variables', function(t) {
  const query = o2;
  t.equal(hasAllVariables({ query, variables: { one: 'one', two: 'two' } }), true, 'With all variables');
  t.equal(hasAllVariables({ query, variables: { one: 'one' } }), true, 'With one variable');
  t.equal(hasAllVariables({ query, variables: { two: 'two' } }), true, 'With another variable');
  t.equal(hasAllVariables({ query, variables: { } }), true, 'With no variables');
  t.end();
});

test('Validates one required and one optional variable', function(t) {
  const query = r1o1;
  t.equal(hasAllVariables({ query, variables: { one: 'one', two: 'two' } }), true, 'With all variables');
  t.equal(hasAllVariables({ query, variables: { one: 'one' } }), true, 'With only the required variable');
  t.equal(hasAllVariables({ query, variables: { two: 'two' } }), false, 'With only the options variable');
  t.equal(hasAllVariables({ query, variables: { } }), false, 'With no variables');
  t.end();
});

test('Handles weird input', function(t) {
  const query = r1;
  t.equal(hasAllVariables(), false, 'no params');
  t.equal(hasAllVariables({ }), false, 'undefined params');
  t.equal(hasAllVariables(null), false, 'null params');
  t.equal(hasAllVariables(NaN), false, 'NaN params');
  t.equal(hasAllVariables(1), false, 'Number params');
  t.equal(hasAllVariables(true), false, 'Boolean params');
  t.equal(hasAllVariables('foo'), false, 'String params');
  t.equal(hasAllVariables(() => 'hmm'), false, 'Function params');
  t.equal(hasAllVariables(Promise.resolve()), false, 'Promise params');

  t.equal(hasAllVariables({ query }), false, 'undefined variables');
  t.equal(hasAllVariables({ query, variables: null }), false, 'null variables');
  t.equal(hasAllVariables({ query, variables: NaN }), false, 'NaN variables');
  t.equal(hasAllVariables({ query, variables: '' }), false, 'Empty string variables');
  t.equal(hasAllVariables({ query, variables: 'foo' }), false, 'String variables');
  t.equal(hasAllVariables({ query, variables: 0 }), false, 'Number 0 variables');
  t.equal(hasAllVariables({ query, variables: 1 }), false, 'Number 1 variables');

  t.equal(hasAllVariables({ variables: {} }), false, 'undefined query');
  t.equal(hasAllVariables({ query: null }), false, 'null query');
  t.equal(hasAllVariables({ query: NaN }), false, 'NaN query');
  t.equal(hasAllVariables({ query: '' }), false, 'Empty string query');
  t.equal(hasAllVariables({ query: 'foo' }), false, 'String query');
  t.equal(hasAllVariables({ query: 0 }), false, 'Number 0 query');
  t.equal(hasAllVariables({ query: 1 }), false, 'Number 1 query');

  t.end();
});
