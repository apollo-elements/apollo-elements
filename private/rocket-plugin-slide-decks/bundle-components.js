import path from 'path';
import esbuild from 'esbuild';
import chalk from 'chalk';

import { fileURLToPath } from 'url';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const NS_PER_SEC = 1e9;

export async function bundleComponents() {
  const time = process.hrtime();
  console.log(chalk.yellow`[slide-decks] ${chalk.blue`Building ${chalk.bold`<slidem-deck>`} and ${chalk.bold`<slidem-slide>`}...`}`);

  await esbuild.build({
    bundle: true,
    minify: process.env.CI === 'true',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    outdir: 'docs/_merged_assets/_static/slide-decks',
    entryPoints: {
      'slidem': path.join(__dirname, 'entrypoints', 'slidem.js'),
    },
  }).catch(() => {
    process.exit(1);
  });

  const [s, ns] = process.hrtime(time);
  const durationNs = s * NS_PER_SEC + ns;

  console.log(chalk.yellow`[slide-decks] ${chalk.green`Done in ${durationNs / NS_PER_SEC}s`}`);
}
