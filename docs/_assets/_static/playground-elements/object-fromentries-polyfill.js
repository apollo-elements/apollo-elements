/**
 * Object.entriesFrom() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Object.fromEntries) {
  Object.fromEntries = function(entries) {
    if (!entries || !entries[Symbol.iterator])
      throw new Error('Object.fromEntries() requires a single iterable argument');
    const obj = {};
    for (const [key, value] of entries)
      obj[key] = value;

    return obj;
  };
}
