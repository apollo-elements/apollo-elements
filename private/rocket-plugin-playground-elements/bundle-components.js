import path from 'path';
import esbuild from 'esbuild';
import chalk from 'chalk';

import { replace } from 'esbuild-plugin-replace';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { copySync } from 'cpx';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const NS_PER_SEC = 1e9;

const ESBUILD_BUNDLED_PLAYGROUND_HTML =
  readFileSync(path.join(__dirname, 'components', 'docs-playground.html'), 'utf8');

const ESBUILD_BUNDLED_PLAYGROUND_PREVIEW =
  readFileSync(path.join(__dirname, 'components', 'playground-preview.html'), 'utf8');

let shouldBundlePlayground = true;

export async function bundleComponents({ importMap }) {
  const time = process.hrtime();
  console.log(chalk.yellow`[playground-elements] ${chalk.blue`Building ${chalk.bold`<docs-playground>`}${shouldBundlePlayground ? ` and ${chalk.bold`<playground-ide>`}` : ''}...`}`);

  await esbuild.build({
    bundle: true,
    minify: process.env.CI === 'true',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    outdir: 'docs/_merged_assets/_static/playground-elements',
    plugins: [
      replace({
        include: /docs-playground\.ts$/,
        ESBUILD_BUNDLED_IMPORT_MAP: JSON.stringify(importMap),
        ESBUILD_BUNDLED_PLAYGROUND_HTML,
        ESBUILD_BUNDLED_PLAYGROUND_PREVIEW,
      }),
    ],
    entryPoints: {
      'docs-playground': path.join(__dirname, 'components', 'docs-playground.ts'),
      ...shouldBundlePlayground && {
        'playground': 'playground-elements',
      },
    },
  }).catch(() => {
    process.exit(1);
  });

  shouldBundlePlayground = null;

  const OUT = 'docs/_merged_assets/_static/playground-elements/';
  copySync('node_modules/playground-elements/playground-service-worker-proxy.html', OUT);
  copySync('node_modules/playground-elements/playground-service-worker.js', OUT);
  copySync('node_modules/playground-elements/playground-typescript-worker.js', OUT);

  const [s, ns] = process.hrtime(time);
  const durationNs = s * NS_PER_SEC + ns;

  console.log(chalk.yellow`[playground-elements] ${chalk.green`Done in ${durationNs / NS_PER_SEC}s`}`);
}
