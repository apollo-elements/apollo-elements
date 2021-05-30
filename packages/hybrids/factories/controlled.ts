import type { ApolloController } from '@apollo-elements/core';
import type { Descriptor } from 'hybrids';
import type { HybridsControllerHost } from './controller';

type Controller = ApolloController & { host: HybridsControllerHost };

export function controlled<
  V,
  E extends HTMLElement = HTMLElement,
  C extends Controller = Controller
>(
  initial?: V,
  getter: (host: E) => C = host => host['controller' as keyof E] as unknown as C,
): Descriptor<E, V> {
  let controller: C;
  let propertyName: keyof typeof controller;
  const INITIALS = new Map();
  return {
    get: () => {
      const v = controller[propertyName];
      return ((v === undefined && initial !== undefined) ? initial : v) as V;
    },
    set: (_, v) => {
      if (!controller)
        INITIALS.set(propertyName, v);
      else
        controller[propertyName] = v;
      return v;
    },
    connect(host, key, invalidate) {
      controller = getter(host);
      propertyName = key as keyof typeof controller;
      controller.host.register(key, invalidate);
      for (const [k, v] of INITIALS)
        controller[k as keyof typeof controller] = v;
    },
  };
}

export function option<
  V,
  E extends HTMLElement = HTMLElement,
  C extends Controller = Controller,
>(
  initial?: V,
  getter: (host: E) => C = host => host['controller' as keyof E] as unknown as C,
): Descriptor<E, V> {
  let controller: C;
  let propertyName: keyof C['options'];
  const INITIALS = new Map();
  return {
    get: () => {
      if (!propertyName)
        return initial as V;
      const v = controller?.options?.[propertyName as keyof typeof controller.options];
      return ((v === undefined && initial !== undefined) ? initial : v) as V;
    },
    set: (_, v) => {
      if (!propertyName)
        return initial;
      else if (!controller?.options)
        INITIALS.set(propertyName, v);
      else
        controller.options[propertyName as keyof typeof controller.options] = v;
      return v;
    },
    connect(host, key, invalidate) {
      propertyName = key as typeof propertyName;
      controller = getter(host);
      controller.host.register(key as string, invalidate);
      for (const [k, v] of INITIALS)
        controller.options[k as keyof typeof controller.options] = v;
    },
  };
}

export function method<
  V,
  E extends HTMLElement = HTMLElement,
  C extends ApolloController = ApolloController
>(
  getter: (host: E) => C = host => host['controller' as keyof E] as unknown as C,
): Descriptor<E, V> {
  return {
    connect: (host, key) => {
      Object.defineProperty(Object.getPrototypeOf(host), key, {
        value(...args: any[]) {
          const method = getter(host)[key as keyof C];
          if (typeof method !== 'function') return;
          return method.call(host, ...args);
        },
      });
    },
  };
}
