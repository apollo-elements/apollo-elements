import { createRequire } from 'module';

import path from 'path';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const ROOT = path.join(__dirname, '../..');

export function resolvePlugin() {
  return {
    name: 'resolve-monorepo-pkgs',
    setup(build) {
      // Redirect all paths starting with "@apollo-elements/" to "/packages/"
      build.onResolve({ filter: /^@apollo-elements\// }, args => {
        let resolved = `${args.path.replace('@apollo-elements', `${ROOT}/packages`)}`;
        if (resolved.match(/\/(?!\.js$)/g).length > 1)
          resolved += '.ts';
        else {
          // good Lord! I won't tell if you don't
          try {
            resolved = require.resolve(resolved);
          } catch (e) {
            resolved = e.message.match(/^Cannot find module '(.*)'/)[1].replace('.js', '.ts');
          }
        }
        return { path: resolved.replace('.js.ts', '.ts') };
      });
    },
  };
}
