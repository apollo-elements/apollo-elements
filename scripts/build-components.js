// @ts-check
/* eslint-env node */
import esbuild from 'esbuild';
import path from 'path';

const basePath = path.join(path.dirname(import.meta.url.replace('file://', '')), '..');

const resolve = {
  name: 'resolve-monorepo-pkgs',
  setup(build) {
    // Redirect all paths starting with "images/" to "./public/images/"
    build.onResolve({ filter: /^@apollo-elements\// }, args => {
      const resolved = args.path.replace('@apollo-elements', `${basePath}/packages`) + '.ts';
      return { path: resolved };
    });
  },
};

esbuild.build({
  entryPoints: ['packages/components/index.ts'],
  bundle: true,
  minify: true,
  outfile: 'docs/_assets/_static/apollo-elements.js',
  sourcemap: true,
  target: 'es2017',
  plugins: [resolve],
}).catch(err => {
  process.exit(1);
});
