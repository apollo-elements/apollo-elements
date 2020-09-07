import { expect } from '@open-wc/testing';
import gql from 'graphql-tag';

import { hasAllVariables } from './has-all-variables';

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

describe('[lib] hasAllVariables', function() {
  it('validates one required variable', function() {
    const query = r1;
    expect(hasAllVariables({ query, variables: { one: '1' } }), 'With variable').to.be.true;
    expect(hasAllVariables({ query, variables: {} }), 'With no variables').to.be.false;
  });

  it('validates two required variables', function() {
    const query = r2;
    expect(hasAllVariables({ query, variables: { one: '1', two: '2' } }), 'With all variables')
      .to.be.true;
    expect(hasAllVariables({ query, variables: { one: '1' } }), 'With first variable only')
      .to.be.false;
    expect(hasAllVariables({ query, variables: { two: '2' } }), 'With second variable only')
      .to.be.false;
    expect(hasAllVariables({ query, variables: {} }), 'With no variables').to.be.false;
  });

  it('validates one optional variable', function() {
    const query = o1;
    expect(hasAllVariables({ query, variables: { one: '1' } }), 'With variable').to.be.true;
    expect(hasAllVariables({ query, variables: {} }), 'With no variables').to.be.true;
  });

  it('validates two optional variables', function() {
    const query = o2;
    expect(hasAllVariables({ query, variables: { one: 'one', two: 'two' } }), 'With all variables')
      .to.be.true;
    expect(hasAllVariables({ query, variables: { one: 'one' } }), 'With one variable').to.be.true;
    expect(hasAllVariables({ query, variables: { two: 'two' } }), 'With another variable')
      .to.be.true;
    expect(hasAllVariables({ query, variables: {} }), 'With no variables').to.be.true;
  });

  it('validates one required and one optional variable', function() {
    const query = r1o1;
    expect(hasAllVariables({ query, variables: { one: 'one', two: 'two' } }), 'With all variables')
      .to.be.true;
    expect(hasAllVariables({ query, variables: { one: 'one' } }), 'With only the required variable')
      .to.be.true;
    expect(hasAllVariables({ query, variables: { two: 'two' } }), 'With only the options variable')
      .to.be.false;
    expect(hasAllVariables({ query, variables: {} }), 'With no variables').to.be.false;
  });

  it('handles weird input', function() {
    // @ts-expect-error: testing weird input
    expect(hasAllVariables(), 'no params').to.be.false;
    expect(hasAllVariables(void 0), 'void params').to.be.false;
    expect(hasAllVariables(null), 'null params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({}), 'empty object params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables([]), 'empty array params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables(NaN), 'NaN params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables(1), 'Number params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables(true), 'Boolean params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables('foo'), 'String params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables((() => 'hmm')), 'Function params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables(Promise.resolve()), 'Promise params').to.be.false;

    const query = r1;

    expect(hasAllVariables({ query }), 'missing variables').to.be.false;
    expect(hasAllVariables({ query, variables: void 0 }), 'void variables').to.be.false;
    expect(hasAllVariables({ query, variables: undefined }), 'undefined variables').to.be.false;
    expect(hasAllVariables({ query, variables: [] }), 'empty array variables').to.be.false;
    expect(hasAllVariables({ query, variables: [1] }), 'array variables').to.be.false;
    expect(hasAllVariables({ query, variables: [1] }), 'array of object variables').to.be.false;
    expect(hasAllVariables({ query, variables: null }), 'null variables').to.be.false;
    expect(hasAllVariables({ query, variables: NaN }), 'NaN variables').to.be.false;
    expect(hasAllVariables({ query, variables: '' }), 'Empty string variables').to.be.false;
    expect(hasAllVariables({ query, variables: 'foo' }), 'String variables').to.be.false;
    expect(hasAllVariables({ query, variables: 0 }), 'Number 0 variables').to.be.false;
    expect(hasAllVariables({ query, variables: 1 }), 'Number 1 variables').to.be.false;

    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ variables: {} }), 'undefined query').to.be.false;
    expect(hasAllVariables({ query: null }), 'null query').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query: NaN }), 'NaN query').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query: '' }), 'Empty string query').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query: 'foo' }), 'String query').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query: 0 }), 'Number 0 query').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query: 1 }), 'Number 1 query').to.be.false;
  });
});
