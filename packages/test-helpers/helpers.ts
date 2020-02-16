import { defineCE, fixture, unsafeStatic } from '@open-wc/testing';
import and from 'crocks/logic/and';
import hasProp from 'crocks/predicates/hasProp';
import type { Subscription } from 'apollo-client/util/Observable';
import { TemplateResult, html } from 'lit-html';

export const getElementWithLitTemplate = <T extends Element>({ getClass, getTemplate }) =>
  async function createElementWithLitTemplate(...args): Promise<T> {
    const tagName = defineCE(getClass());
    const tag = unsafeStatic(tagName);
    const template = getTemplate(tag, ...args);
    const element = await fixture<T>(template);
    return element;
  };

// I'm going to cry
export const isSubscription = (x: any): x is Subscription => (
  x.constructor.toString().startsWith('function Subscription') &&
  typeof x.unsubscribe === 'function' &&
  '_state' in x &&
  '_observer' in x &&
  typeof x._observer.next === 'function' &&
  typeof x._observer.error === 'function'
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
