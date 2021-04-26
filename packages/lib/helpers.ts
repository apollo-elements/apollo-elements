/** Splits a string by `,` then trims each of the results */
export function splitCommasAndTrim(value: string): string[] {
  return value
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
}

export function stripHTMLComments(string: string): string {
  return string.replace?.(/<!---->/g, '');
}

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
type ObjectOrArray = object | any[];
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

/**
 * Is an object or array empty?
 * @param  x object or array
 */
export function isEmpty(x: ObjectOrArray): boolean {
  const { length } = Array.isArray(x) ? x : Object.keys(x);
  return !length;
}

/** Capitalize a string */
export function capital(string: string): string {
  return `${string.substr(0, 1).toUpperCase()}${string.substr(1)}`;
}
