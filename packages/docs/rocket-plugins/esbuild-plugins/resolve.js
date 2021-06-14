// @ts-check
import { createRequire } from 'module';

// @ts-expect-error: it's not typescript
import path from 'path';

// @ts-expect-error: it's not typescript
const require = createRequire(import.meta.url);

// @ts-expect-error: it's not typescript
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const ROOT = path.join(__dirname, '../../../..');

export function resolve({ external } = {}) {
  return {
    name: 'resolve-monorepo-pkgs',
    setup(build) {
      // Redirect all paths starting with "@apollo-elements/" to "/packages/"
      build.onResolve({ filter: /^@apollo-elements\// }, args => {
        let resolved = `${args.path.replace('@apollo-elements', `${ROOT}/packages`)}`;
        if (resolved.match(/\//g).length > 1)
            resolved += '.ts';
        else {
          // good Lord! I won't tell if you don't
          try {
            resolved = require.resolve(resolved);
          } catch(e) {
            resolved = e.message.match(/^Cannot find module '(.*)'/)[1].replace('.js', '.ts')
          }
        }
        return { path: resolved };
      });
    },
  }
}

export function unpkg() {
  return {
    name: 'resolve-unpkg',
    setup(build) {
      // Redirect all paths starting with "@apollo-elements/" to "/packages/"
      build.onResolve({ filter: /^@?lit\/?/ }, args => {
        return { path: `https://unpkg.com/${args.path}?module` };
      });
    },
  }
}
