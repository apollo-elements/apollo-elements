import { defineCE, litFixture, unsafeStatic } from '@open-wc/testing';
import and from 'crocks/logic/and';
import hasProp from 'crocks/predicates/hasProp';

export const getElementWithLitTemplate = ({ getClass, getTemplate }) => async (...args) => {
  const tagName = defineCE(getClass());
  const tag = unsafeStatic(tagName);
  const template = getTemplate(tag, ...args);
  return await litFixture(template);
};

// I'm going to cry
export const isSubscription = x => (
  x.constructor.toString().startsWith('function Subscription') &&
  typeof x.unsubscribe === 'function' &&
  '_state' in x &&
  '_observer' in x &&
  typeof x._observer.next === 'function' &&
  typeof x._observer.error === 'function'
);

const hasGetAndSet = and(hasProp('get'), hasProp('set'));
const hasOwnGetterAndSetter = (obj, prop) =>
  hasGetAndSet(Object.getOwnPropertyDescriptor(obj, prop));
export const hasGetterSetter = (obj, prop) =>
  (!obj) ? false : (
    hasOwnGetterAndSetter(obj, prop) ||
    hasGetterSetter(Object.getPrototypeOf(obj), prop)
  );
