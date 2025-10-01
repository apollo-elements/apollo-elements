/** Splits a string by `,` then trims each of the results */
export function splitCommasAndTrim(value: string): string[] {
  return value
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
}

type ObjectOrArray = object | unknown[];

/**
 * Is an object or array empty?
 * @param  x object or array
 */
export function isEmpty(x: ObjectOrArray): boolean {
  const { length } = Array.isArray(x) ? x : Object.keys(x);
  return !length;
}
