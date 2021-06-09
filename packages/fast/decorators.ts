export function hosted(opts?: { path?: string }) {
  return function(target: unknown, key: string): void {
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
