exports.compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

exports.isLengthy = xs => !!xs.length;

exports.propIs = prop => test => obj =>
  test instanceof RegExp ? !!obj[prop]?.match(test) : obj[prop] === test;

exports.and = (p, q) => x => p(x) && q(x);

exports.not = p => x => !p(x);

exports.trace = (x, tag) =>
  (console.log(tag, x), x);
