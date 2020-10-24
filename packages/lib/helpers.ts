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
