import { bound } from './bound';

import { expect } from '@open-wc/testing';
describe('@bound', function() {
  describe('on a class', function() {
    it('throws', function() {
      expect(() => {
        // @ts-expect-error: testing the error
        @bound class Class {}
      }).to.throw('Only methods can be decorated with @bound. <Class> is not a method!');
    });
  });
  describe('on a property', function() {
    it('throws', function() {
      expect(() => {
        // @ts-expect-error: testing the error
        class Class { @bound x: number; }
      }).to.throw('Only methods can be decorated with @bound. <x> is not a method!');
    });
  });
  describe('on a method', function() {
    it('binds a method', function() {
      class Class {
        y = 0;

        @bound x() { return this.y; }
      }
      const instance = new Class();
      const { x } = instance;
      expect(x()).to.equal(0).and.to.equal(instance.x());
    });
  });
});
