const valueIsDefined =
  ([, v]): boolean => v !== undefined;

export function stripUndefinedValues<X>(o: X): X {
  return Object.fromEntries(Object.entries(o).filter(valueIsDefined)) as X;
}

/** Splits a string by `,` then trims each of the results */
export function splitCommasAndTrim(value: string): string[] {
  return value
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmpty(x: object | Array<unknown>): boolean {
  const { length } = Array.isArray(x) ? x : Object.keys(x);
  return !length;
}
