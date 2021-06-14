// @ts-check
// @ts-expect-error: it's not typescript
import esbuild from 'esbuild';
// @ts-expect-error: it's not typescript
import chalk from 'chalk';
// @ts-expect-error: it's not typescript
import mkdirp from 'mkdirp';

import { copySync } from 'cpx';

// @ts-expect-error: it's not typescript
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader/lib/index.mjs';

import { resolve, unpkg } from './esbuild-plugins/resolve.js';
import { litCss } from './esbuild-plugins/lit-css.js';

/**
 * @param  {import('esbuild').BuildOptions} opts
 */
function build(opts) {
  esbuild.build({
    bundle: true,
    minify: process.env.CI === 'true',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    ...opts,
    plugins: [
      resolve({ external: opts.external }),
      ...process.env.CI === 'true' ? [ unpkg()] : [],
      litCss(),
      graphqlLoaderPlugin(),
    ],
  }).catch(() => {
    process.exit(1);
  });

}

export function buildComponents() {
  build({
    entryPoints: ['packages/docs/entrypoints/apollo-elements.ts'],
    external: [ 'lit', 'lit/*', '@lit/*' ],
    outfile: 'docs/_assets/_static/apollo-elements.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/lit.ts'],
    outfile: 'docs/_assets/_static/lit.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/haunted.ts'],
    external: [ 'lit', 'lit/*', '@lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/apollo-elements-haunted.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/hybrids.ts'],
    external: [ 'lit', 'lit/*', '@lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/apollo-elements-hybrids.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/schemalink.ts'],
    external: [ 'lit', 'lit/*', '@lit/*', '@apollo/client/core/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/schema-link.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/client.ts'],
    outfile: 'docs/_assets/_static/apollo-client.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/mixins.ts'],
    external: [ 'lit', 'lit/*', '@lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/mixins.js',
  });

  build({
    entryPoints: ['packages/docs/entrypoints/polymer.ts'],
    external: [ 'lit', 'lit/*', '@lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    outfile: 'docs/_assets/_static/polymer.js',
  });

  build({
    external: [ 'lit', 'lit/*', '@lit/*', 'https://*' ],
    entryPoints: ['packages/docs/docs-playground.ts'],
    outfile: 'docs/_assets/_static/docs-playground.js',
  });

  build({
    external: [ 'lit', 'lit/*', '@lit/*', '@apollo-elements/core', '@apollo-elements/core/*' ],
    entryPoints: ['packages/docs/entrypoints/components.ts'],
    outfile: 'packages/docs/components.js',
  });
}

export function buildPlayground() {
  build({
    entryPoints: ['packages/docs/entrypoints/playground.ts'],
    outfile: 'docs/_assets/_static/playground-elements/playground.js',
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
