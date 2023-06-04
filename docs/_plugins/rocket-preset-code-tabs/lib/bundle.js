import chalk from 'chalk';
import esbuild from 'esbuild';
import hirestime from 'hirestime';

import { join } from 'path';
import { litCssPlugin } from 'esbuild-plugin-lit-css';

export async function bundle({ path }) {
  console.log(chalk.yellow`[code-tabs] ${chalk.blue`Building ${chalk.bold`<code-tabs>`} and ${chalk.bold`<code-copy>`}...`}`);
  // @ts-expect-error: https://github.com/seriousManual/hirestime/pull/39
  const time = hirestime.default();

  await esbuild.build({
    bundle: true,
    minify: process.env.CI === 'true',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    outdir: 'docs/_merged_assets/_static/code-tabs',
    external: ['*/code-copy.js'],
    plugins: [litCssPlugin()],
    entryPoints: {
      'code-copy': join(path, 'components', 'code-copy.ts'),
      'code-tabs': join(path, 'components', 'code-tabs.ts'),
    },
  }).catch(() => {
    process.exit(1);
  });

  console.log(chalk.yellow`[code-tabs] ${chalk.green`Done in ${time.seconds()}s`}`);
}
