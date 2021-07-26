import { Observable } from '@microsoft/fast-element';

export function hosted(opts?: { path?: string }) {
  return function(target: unknown, key: string): void {
    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    const { get, set } = descriptor ?? {}; /* c8 ignore next */
    if (!get || !set)
      throw new Error(`${key} not described; call @controlled first`);/* c8 ignore next */
    Object.defineProperty(target, key, {
      get() {
        Observable.track(this, key);
        return get.call(this);
      },
      set(v) {
        set.call(this, v);
        Observable.notify(this, v);
      },
    });
    Object.defineProperty(target, `${key}Changed`, {
      value() {
        if (!this.controller) return; /* c8 ignore next */ // covered
        if (opts?.path)
          this.controller[opts.path][key] = this[key]; /* c8 ignore next */ // covered
        else
          this.controller[key] = this[key];
      },
    });
  };
}
