import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';
import { stat } from 'fs/promises';

const exists = x => stat(x).then(() => true, () => false);

/**
 * @param {string} source
 * @param {import("Koa").Context} context
 */
function tryToResolve(source, context) {
  let resolved = '';

  try {
    const require = createRequire(import.meta.url);
    resolved = require.resolve(source);
  } catch (error) {
    const { message } = error;
    // try not to look
    if (message.startsWith('Cannot find module')) {
      const [, resolved] = /Cannot find module '(.*)'/.exec(message) || [];
      if (!resolved)
        throw error;
    } else
      throw error;
  }

  // e.g., a relative path from a file deeper in the module graph
  // `context.path` here is the abspath to the importee
  if (!resolved)
    resolved = join(dirname(context.path), source);


  return resolved;
}

/**
 * Resolves local monorepo package imports. Needed because we consume our own monorepo packages
 * @return {import('@web/dev-server-core').Plugin}
 */
export function resolveLocalFilesFromTypeScriptSources() {
  const rootDir = fileURLToPath(new URL('..', import.meta.url));
  return {
    name: 'resolve-local-monorepo-packages-from-ts-sources',
    async transformImport({ source, context }) {
      const isNodeModule = source.match(/node_modules/) || context.path.match(/node_modules/);
      if (source.endsWith('.ts.js')) {
        // already resolved, but had `.js` appended, probably by export map
        return source.replace('.ts.js', isNodeModule ? '.js' : '.ts');
      } else if (isNodeModule) {
        // don't try to resolve node_modules, they're already resolved
        return;
      } else {
        const resolved = tryToResolve(source, context);
        const absToRoot = resolved.replace(rootDir, '/');
        const replaced = absToRoot.replace(/\.js$/, '.ts');
        const fileExists = await exists(join(rootDir, replaced));
        const final = (fileExists ? replaced : resolved);
        return final;
      }
    },
  };
}

