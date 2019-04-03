if (!('fromEntries' in Object)) {
  Object.fromEntries = function fromEntries(iterable) {
    return [...iterable]
      .reduce((obj, { 0: key, 1: val }) =>
        Object.assign(obj, { [key]: val }), {});
  };
}

/** @fileoverview Bootstraps the test bundle for karma-webpack. */
const testsContext = require.context('../../packages', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);
