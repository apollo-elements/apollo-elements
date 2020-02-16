/* istanbul ignore file */
export const fromEntries: typeof Object.fromEntries = xs =>
    Object.fromEntries ? Object.fromEntries(xs)
  : xs.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
