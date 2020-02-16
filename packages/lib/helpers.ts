import compose from 'crocks/helpers/compose';
import filter from 'crocks/pointfree/filter';
import { fromEntries } from './fromEntries';
const scriptSelector = 'script[type="application/graphql"]';

export const isGraphQLScript = (el: HTMLElement): boolean =>
  el instanceof HTMLElement &&
  el.matches(scriptSelector);

export const getGraphQLScriptChild = (el: HTMLElement): HTMLScriptElement =>
  el instanceof HTMLElement &&
  el.querySelector(scriptSelector);

export const replace = (a: RegExp|string, b: string) => (str: string): string =>
  typeof str === 'string' ? str.replace(a, b) : str;

declare global {
  interface ObjectConstructor {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    fromEntries<T = any>(entries: Iterable<readonly [PropertyKey, T]>): { [k in PropertyKey]: T };
    fromEntries(entries: Iterable<readonly any[]>): any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

const valueIsDefined = ([, v]): boolean => v !== undefined;

export const stripUndefinedValues = compose(
  fromEntries,
  filter(valueIsDefined),
  Object.entries,
) as <X>(o: X) => X;
