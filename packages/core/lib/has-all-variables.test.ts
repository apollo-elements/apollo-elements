import type { Operation } from '@apollo/client/core';

import { expect } from '@open-wc/testing';

import { gql } from '@apollo/client/core';

import { hasAllVariables } from './has-all-variables';

function pass(description: string, operation: Partial<Operation>): Mocha.Suite {
  return describe(description, function() {
    return it('passes', function() {
      expect(hasAllVariables(operation)).to.be.true;
    });
  });
}

function fail(description: string, operation: Partial<Operation>): Mocha.Suite {
  return describe(description, function() {
    return it('fails', function() {
      expect(hasAllVariables(operation)).to.be.false;
    });
  });
}

describe('[lib] hasAllVariables', function() {
  describe('for no variables', function() {
    const query = gql`query NoVars { q { one } }`;
    pass('without variables', { query });
    pass('with variable', { query, variables: { one: '1' } });
    pass('with null variable', { query, variables: { one: null } });
    pass('without variable', { query, variables: {} });
  });

  describe('for one non-nullable variable', function() {
    const query = gql`query NeedsOne($one: ID!) { q(one: $one) { one } }`;
    pass('with variable', { query, variables: { one: '1' } });

    fail('with null variable', { query, variables: { one: null } });
    fail('without variable', { query, variables: {} });
  });

  describe('for one nullable variable', function() {
    const query = gql`query OptOne($one: String) { q(one: $one) { one } }`;
    pass('with no variable', { query, variables: {} });
    pass('with variable', { query, variables: { one: '1' } });
    pass('with null variable', { query, variables: { one: null } });
  });

  describe('for one nullable variable one level deep', function() {
    const query = gql`query NeedsOne($one: ID) { q { one(one: $one) { id } } }`;
    pass('with no variable', { query, variables: {} });
    pass('with variable', { query, variables: { one: '1' } });
    pass('with null variable', { query, variables: { one: null } });
  });

  describe('for one non-nullable variable one level deep', function() {
    const query = gql`query NeedsOne($one: ID!) { q { one(one: $one) { id } } }`;
    pass('with variable', { query, variables: { one: '1' } });

    fail('with no variable', { query, variables: {} });
    fail('with null variable', { query, variables: { one: null } });
  });

  describe('for two non-nullable variables', function() {
    const query = gql`query NeedsTwo($one: ID!, $two: ID!) { q(one: $one, two: $two) { one two } }`;
    pass('with both variables', { query, variables: { one: '1', two: '2' } });

    fail('with no variables', { query, variables: {} });
    fail('with both variables null', { query, variables: { one: null, two: null } });
    fail('with first variable only', { query, variables: { one: '1' } });
    fail('with first variable only null', { query, variables: { one: null } });
    fail(`with first variable null and second variable`, { query, variables: { one: null, two: '1' } });
    fail('with second variable only', { query, variables: { two: '1' } });
    fail('with second variable only null', { query, variables: { two: null } });
    fail(`with second variable null and first variable`, { query, variables: { one: '1', two: null } });
  });

  describe('for two nullable variables', function() {
    const query = gql`query OptTwo($one: ID, $two: ID) { q(one: $one, two: $two) { one two } }`;
    pass('with no variables', { query, variables: {} });
    pass('with both variables', { query, variables: { one: '1', two: '2' } });
    pass('with both variables null', { query, variables: { one: null, two: null } });
    pass('with first variable only', { query, variables: { one: '1' } });
    pass('with first variable only null', { query, variables: { one: null } });
    pass(`with first variable null and second variable`, { query, variables: { one: null, two: '1' } });
    pass('with second variable only', { query, variables: { two: '1' } });
    pass('with second variable only null', { query, variables: { two: null } });
    pass(`with second variable null and first variable`, { query, variables: { one: '1', two: null } });
  });

  describe('for one non-nullable and one nullable variable', function() {
    const query = gql`query NeedsOneOptOne($one: ID!, $two: ID) { q(one: $one, two: $two) { one two } }`;
    pass('with both variables', { query, variables: { one: '1', two: '2' } });
    pass('with first variable only', { query, variables: { one: '1' } });
    pass(`with first variable and second variable null`, { query, variables: { one: '1', two: null } });

    fail('with no variables', { query, variables: {} });
    fail('with both variables null', { query, variables: { one: null, two: null } });
    fail('with first variable only null', { query, variables: { one: null } });
    fail(`with first variable null and second variable`, { query, variables: { one: null, two: '1' } });
    fail('with second variable only', { query, variables: { two: '1' } });
    fail('with second variable only null', { query, variables: { two: null } });
  });

  describe('for one nullable and one non-nullable variable', function() {
    const query = gql`query OptOneNeedsOne($one: ID, $two: ID!) { q(one: $one, two: $two) { one two } }`;
    pass('with both variables', { query, variables: { one: '1', two: '2' } });
    pass(`with first variable null and second variable`, { query, variables: { one: null, two: '1' } });
    pass('with second variable only', { query, variables: { two: '1' } });

    fail('with no variables', { query, variables: {} });
    fail('with both variables null', { query, variables: { one: null, two: null } });
    fail('with first variable only', { query, variables: { one: '1' } });
    fail('with first variable only null', { query, variables: { one: null } });
    fail('with second variable only null', { query, variables: { two: null } });
    fail(`with second variable null and first variable`, { query, variables: { one: '1', two: null } });
  });

  describe('for two nullable and two non-nullable variables', function() {
    const query = gql`query OptOneNeedsOne($one: ID, $two: ID, $three: ID!, $four: ID!) { q(one: $one, two: $two, three: $three, four: $four) { one two three four } }`;
    pass('with al variables', { query, variables: { one: '1', two: '2', three: '3', four: '4' } });
    pass(`with first two variable null and last two variables set`, { query, variables: { one: null, two: null, three: '3', four: '4' } });
    pass('with last two variable only', { query, variables: { three: '3', four: '4' } });

    fail('with no variables', { query, variables: {} });
    fail('with first two variables null', { query, variables: { one: null, two: null } });
    fail('with first variable only', { query, variables: { one: '1' } });
    fail('with first variable only null', { query, variables: { one: null } });
    fail('with second variable only null', { query, variables: { two: null } });
    fail(`with second variable null and first variable`, { query, variables: { one: '1', two: null } });
    fail('with third variable only', { query, variables: { three: '3' } });
  });

  it('handles weird input', function() {
    // @ts-expect-error: testing weird input
    expect(hasAllVariables(), 'no params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables(void 0), 'void params').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables(null), 'null params').to.be.false;
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

    const query = gql`query NeedsOne($one: ID!) { q(one: $one) { one } }`;

    expect(hasAllVariables({ query }), 'missing variables').to.be.false;
    expect(hasAllVariables({ query, variables: void 0 }), 'void variables').to.be.false;
    expect(hasAllVariables({ query, variables: undefined }), 'undefined variables').to.be.false;
    expect(hasAllVariables({ query, variables: [] }), 'empty array variables').to.be.false;
    expect(hasAllVariables({ query, variables: [1] }), 'array variables').to.be.false;
    expect(hasAllVariables({ query, variables: [1] }), 'array of object variables').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query, variables: null }), 'null variables').to.be.false;
    expect(hasAllVariables({ query, variables: { boo: 'foo' } }), 'weird variables').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query, variables: NaN }), 'NaN variables').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query, variables: '' }), 'Empty string variables').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query, variables: 'foo' }), 'String variables').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query, variables: 0 }), 'Number 0 variables').to.be.false;
    // @ts-expect-error: testing weird input
    expect(hasAllVariables({ query, variables: 1 }), 'Number 1 variables').to.be.false;

    expect(hasAllVariables({ variables: {} }), 'undefined query').to.be.false;
    // @ts-expect-error: testing weird input
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
