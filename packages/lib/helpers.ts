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

// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmpty(x: object | Array<unknown>): boolean {
  const { length } = Array.isArray(x) ? x : Object.keys(x);
  return !length;
}
