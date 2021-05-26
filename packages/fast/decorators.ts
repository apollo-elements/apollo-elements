export function hosted(opts?: { path?: string }) {
  return function(target: any, key: string) {
    Object.defineProperty(target, `${key}Changed`, {
      value() {
        if (!this.controller) return;
        if (opts?.path) {
          if (this.controller[opts?.path][key] !== this[key])
            this.controller[opts?.path][key] = this[key];
        } else {
          if (this.controller[key] !== this[key])
            this.controller[key] = this[key];
        }
      },
    });
  };
}
