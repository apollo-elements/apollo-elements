/* istanbul ignore file */
export const fromEntries: typeof Object.fromEntries = xs =>
    Object.fromEntries ? Object.fromEntries(xs)
  : xs.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

declare global {
  interface ObjectConstructor {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    fromEntries<T = any>(entries: Iterable<readonly [PropertyKey, T]>): { [k in PropertyKey]: T };
    fromEntries(entries: Iterable<readonly any[]>): any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}
