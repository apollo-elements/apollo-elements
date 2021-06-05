const configurable = true;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function bound(_: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  if (typeof descriptor?.value !== 'function')
    throw new TypeError(`Only methods can be decorated with @bound. <${key ?? _.name}> is not a method!`); /* c8 ignore next */
  return {
    configurable,
    get() {
      const value = descriptor.value.bind(this);
      Object.defineProperty(this, key, { value, configurable, writable: true });
      return value;
    },
  };
}
