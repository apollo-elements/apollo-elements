// @ts-expect-error: it's not typescript
import graphqlLoaderPlugin from '@luckycatfactory/esbuild-graphql-loader/lib/index.mjs';

import chalk from 'chalk';
import esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';
import { litCssPlugin } from 'esbuild-plugin-lit-css';
import { resolvePlugin } from 'esbuild-plugin-monorepo-resolve';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

/**
 * @param  {import('esbuild').BuildOptions} opts
 */
async function build(opts) {
  await esbuild.build({
    bundle: true,
    minify: process.env.CI === 'true',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    outdir: 'docs/_assets/_static/apollo-elements',
    ...opts,
    plugins: [
      resolvePlugin(/* { external: opts.external }*/),
      litCssPlugin(),
      graphqlLoaderPlugin(),
    ],
  }).catch(() => {
    process.exit(1);
  });
}

const NS_PER_SEC = 1e9;

export async function buildComponents() {
  console.log(chalk.yellow`[apollo-elements] ${chalk.blue`Building ${chalk.bold`Apollo Elements`} packages...`}`);
  const time = process.hrtime();

  await Promise.all([
    build({
      external: ['https://*', 'http://*'],
      entryPoints: {
        'apollo-elements': path.join(__dirname, 'entrypoints/apollo-elements.ts'),
        'apollo-client': path.join(__dirname, 'entrypoints/client.ts'),
      },
    }),

    build({
      external: ['https://*', 'http://*', '@apollo-elements/core', '@apollo-elements/core/*'],
      entryPoints: {
        'fast': path.join(__dirname, 'entrypoints/fast.ts'),
        'gluon': path.join(__dirname, 'entrypoints/gluon.ts'),
        'haunted': path.join(__dirname, 'entrypoints/haunted.ts'),
        'hybrids': path.join(__dirname, 'entrypoints/hybrids.ts'),
        'lit-apollo': path.join(__dirname, 'entrypoints/lit-apollo.ts'),
        'lit': path.join(__dirname, 'entrypoints/lit.ts'),
        'mixins': path.join(__dirname, 'entrypoints/mixins.ts'),
        'polymer': path.join(__dirname, 'entrypoints/polymer.ts'),
        'sandbox': '@power-elements/codesandbox-button',
      },
    }),

    build({
      external: ['https://*', 'http://*', '@apollo/client/core/*', '@apollo-elements/core', '@apollo-elements/core/*'],
      entryPoints: {
        'schema-link': path.join(__dirname, 'entrypoints/schemalink.ts'),
      },
    }),
  ]);

  const [s, ns] = process.hrtime(time);
  const durationNs = s * NS_PER_SEC + ns;

  console.log(chalk.yellow`[apollo-elements] ${chalk.green`Done in ${durationNs / NS_PER_SEC}s`}`);
}

// import { copySync } from 'cpx';
// export function copyDTs() {
//   console.log(chalk.blue`Copying playground .d.ts...`);
//   for (const p of ['@apollo', '@graphql-typed-document-node', '@graphql-tools', 'graphql-tag'])
//     copySync(`./node_modules/${p}/**/*.d.ts`, `./docs/_assets/_static/node_modules/${p}`);
//   console.log(chalk.green`Done!`);
// }
