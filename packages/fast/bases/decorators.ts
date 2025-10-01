import { Observable } from '@microsoft/fast-element';

export function hosted(opts?: { path?: string }) {
  return function(target: unknown, key: string): void {
    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    const { get, set } = descriptor ?? {};
    if (!get || !set)
      throw new Error(`${key} not described; call @controlled first`);
    Object.defineProperty(target, key, {
      get() {
        Observable.track(this, key);
        return get.call(this);
      },
      set(v) {
        set.call(this, v);
        Observable.notify(this, key);
      },
    });
    Object.defineProperty(target, `${key}Changed`, {
      value() {
        if (!this.controller) return;  // covered
        if (opts?.path)
          this.controller[opts.path][key] = this[key];  // covered
        else
          this.controller[key] = this[key];
      },
    });
  };
}
