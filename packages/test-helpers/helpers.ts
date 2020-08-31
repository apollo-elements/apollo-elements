import { defineCE, fixture, unsafeStatic } from '@open-wc/testing';
import { TemplateResult, html } from 'lit-html';

const and =
  <T>(p: ((x: T) => boolean), q: ((x: T) => boolean)) =>
    (x: T) =>
      p(x) && q(x);

const hasProp =
  (prop: string) =>
    // eslint-disable-next-line @typescript-eslint/ban-types
    (o: object) =>
      o && prop in o;

export const getElementWithLitTemplate = <T extends Element>({ getClass, getTemplate }) =>
  async function createElementWithLitTemplate(...args): Promise<T> {
    const tagName = defineCE(getClass());
    const tag = unsafeStatic(tagName);
    const template = getTemplate(tag, ...args);
    const element = await fixture<T>(template);
    return element;
  };

// 🐤 quack quack 🦆
export const isSubscription = (x: any): x is ZenObservable.Subscription => (
  x.constructor.toString().startsWith('function Subscription') &&
  typeof x.unsubscribe === 'function' &&
  '_state' in x &&
  '_observer' in x
);

const hasGetAndSet = and(hasProp('get'), hasProp('set'));

const hasOwnGetterAndSetter = (obj: unknown, prop: string|number): boolean =>
  hasGetAndSet(Object.getOwnPropertyDescriptor(obj, prop));

export const hasGetterSetter = (obj: unknown, prop: string|number): boolean =>
  (!obj) ? false : (
    hasOwnGetterAndSetter(obj, prop) ||
    hasGetterSetter(Object.getPrototypeOf(obj), prop)
  );

export function graphQLScriptTemplate(script: string): TemplateResult {
  return !script ? html`` : html`<script type="application/graphql">${script}</script>`;
}
