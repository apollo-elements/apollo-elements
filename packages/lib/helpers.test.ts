import { expect } from '@open-wc/testing';
import { stripUndefinedValues } from './helpers';

describe('[lib] stripUndefinedValues', function() {
  it('strips undefined values', function() {
    const input = { foo: 'bar', u: undefined };
    expect(stripUndefinedValues(input)).to.eql({ foo: 'bar' });
  });
});
