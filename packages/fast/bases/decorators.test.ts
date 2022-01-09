import { expect } from '@open-wc/testing';
import { hosted } from './decorators';

describe('[FAST] @hosted', function() {
  it('throws if misused', function() {
    expect(() => {
      class A {
        @hosted() a = 'a';
      }
      A;
    }).to.throw('a not described; call @controlled first');
  });
});
