// @ts-check
// @ts-expect-error: it's not typescript
import fs from 'fs';
// @ts-expect-error: it's not typescript
import path from 'path';
// @ts-expect-error: it's not typescript
import esbuild from 'esbuild';
// @ts-expect-error: it's not typescript
import chalk from 'chalk';
// @ts-expect-error: it's not typescript
import mkdirp from 'mkdirp';

import { copySync } from 'cpx';

// @ts-expect-error: it's not typescript
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader/lib/index.mjs';

import { createRequire } from 'module';

// @ts-expect-error: it's not typescript
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// @ts-expect-error: it's not typescript
const require = createRequire(import.meta.url);

const stringToTemplateLiteral = require('string-to-template-literal').default;

const ROOT = path.join(__dirname, '../../..');

/**
 * @param  {{ entryPoints: string[]; outfile: string; external?: string[] }} opts
 */
function build({ entryPoints, outfile, external }) {
  esbuild.build({
    entryPoints,
    external,
    outfile,
    bundle: true,
    minify: true,
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    plugins: [
      {
        name: 'resolve-monorepo-pkgs',
        setup(build) {
          // Redirect all paths starting with "images/" to "./public/images/"
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
      },
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
      },
      graphqlLoaderPlugin(),
    ],
  }).catch(() => {
    process.exit(1);
  });

}

export function buildComponents() {
  build({
    entryPoints: ['packages/docs/entrypoints/apollo-elements.ts'],
    external: [ 'lit', 'lit/*' ],
    outfile: 'docs/_assets/_static/apollo-elements.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/lit.ts'],
    outfile: 'docs/_assets/_static/lit.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/haunted.ts'],
    external: [ 'lit', 'lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/apollo-elements-haunted.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/hybrids.ts'],
    external: [ 'lit', 'lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/apollo-elements-hybrids.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/schemalink.ts'],
    external: [ 'lit', 'lit/*', '@apollo/client/core/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/schema-link.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/client.ts'],
    outfile: 'docs/_assets/_static/apollo-client.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/mixins.ts'],
    external: [ 'lit', 'lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/mixins.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/polymer.ts'],
    external: [ 'lit', 'lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/polymer.js',
  });

  build({
    external: [ 'lit', 'lit/*', 'https://*' ],
    entryPoints: ['packages/docs/docs-playground.ts'],
    outfile: 'docs/_assets/_static/docs-playground.js',
  });

  build({
    external: [ 'lit', 'lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    entryPoints: ['packages/docs/entrypoints/components.ts'],
    outfile: 'packages/docs/components.js',
  });
}

export function buildPlayground() {
  build({
    entryPoints: ['packages/docs/entrypoints/playground.ts'],
    outfile: 'docs/_assets/_static/playground-elements/playground.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/playground-typescript-worker.ts'],
    outfile: 'docs/_assets/_static/playground-typescript-worker.js',
  });

}

export async function onBeforeBuildBundleComponents() {
  console.log(chalk.blue`Building Components...`)
  buildComponents();
  console.log(chalk.green`Done!`)
}

export async function copyPlaygroundFiles() {
  console.log(chalk.blue`Copying playground files...`)
  const OUT = 'docs/_assets/_static/playground-elements/';
  const SITE = '_site/_assets/_static/playground-elements/'
  const DEV = '_site-dev/_assets/_static/playground-elements/'

  for (const base of [OUT, DEV, SITE]) {
    await mkdirp(base)
    copySync('node_modules/playground-elements/playground-service-worker-proxy.html', base);
    copySync('node_modules/playground-elements/playground-service-worker.js', base);
    copySync('node_modules/playground-elements/playground-typescript-worker.js', base);
  }

  console.log(chalk.green`Done!`)
}
