import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';

import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader/lib/index.mjs';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const stringToTemplateLiteral = require('string-to-template-literal').default;

export function buildComponents() {
  const basePath = path.join(path.dirname(import.meta.url.replace('file://', '')), '../../..');

  const resolve = {
    name: 'resolve-monorepo-pkgs',
    setup(build) {
      // Redirect all paths starting with "images/" to "./public/images/"
      build.onResolve({ filter: /^@apollo-elements\// }, args => {
        let resolved = `${args.path.replace('@apollo-elements', `${basePath}/packages`)}`;
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
  };

  esbuild.build({
    entryPoints: ['packages/docs/entrypoints/apollo-elements.ts'],
    external: [
      'lit',
      'lit/*',
      '@apollo/client/core',
      '@apollo/client/core/*',
    ],
    bundle: true,
    minify: true,
    outfile: 'docs/_assets/_static/apollo-elements.js',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    plugins: [resolve],
  }).catch(() => {
    process.exit(1);
  });

  esbuild.build({
    entryPoints: ['packages/docs/entrypoints/client.ts'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'docs/_assets/_static/apollo-client.js',
    sourcemap: true,
    target: 'es2020',
    plugins: [resolve],
  }).catch(() => {
    process.exit(1);
  });

  esbuild.build({
    external: [
      'lit',
      'lit/*',
      'https://*'
    ],
    entryPoints: ['packages/docs/docs-playground.ts'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'docs/_assets/_static/docs-playground.js',
    sourcemap: true,
    target: 'es2020',
    plugins: [resolve],
  }).catch(() => {
    process.exit(1);
  });

  esbuild.build({
    external: [
      'lit',
      'lit/*',
      'https://*'
    ],
    entryPoints: ['packages/docs/entrypoints/components.ts'],
    bundle: true,
    minify: true,
    format: 'esm',
    outfile: 'packages/docs/components.js',
    sourcemap: true,
    target: 'es2020',
    plugins: [
      resolve,
      graphqlLoaderPlugin(),
      {
      	name: 'lit-css',
      	setup(build) {
      		const loader = 'js';

          const tag = 'css'
          const specifier = 'lit'
      		build.onLoad({ filter: /\.css$/ }, async args => {
            const cssString = await fs.promises.readFile(args.path, 'utf8');
      			let contents = `import {${tag}} from '${specifier}';export default ${tag}${stringToTemplateLiteral(cssString)}`;
      			return { contents, loader };
      		});
      	}
      }
    ]
  }).catch(() => {
    process.exit(1);
  });
}
