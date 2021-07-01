import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');

/**
 * @typedef {object} Options
 * @property  {string} scope
 * @property  {String} [dir='packages']
 */

/**
 * Redirect all paths starting with the given scope to the packages dir, by default "/packages/"
 * @param {Options} options
 * @return {import("esbuild").Plugin}
 */
export function monorepoResolvePlugin({ scope, dir = 'packages' }) {
  const filter = new RegExp(`^${scope}/`);
  return {
    name: 'resolve-monorepo-pkgs',
    setup(build) {
      build.onResolve({ filter }, args => {
        let resolved = `${args.path.replace(scope, `${ROOT}/${dir}`)}`;
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
