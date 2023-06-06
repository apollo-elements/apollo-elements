import esbuild from 'esbuild';
import hirestime from 'hirestime';
import chalk from 'chalk';

import { litCssPlugin } from 'esbuild-plugin-lit-css';
import { join } from 'path';

export async function bundle({ path }) {
  console.log(chalk.yellow`[custom-elements-manifest] ${chalk.blue`Building ${chalk.bold`Custom Elements Manifest components`}...`}`);
  // @ts-expect-error: https://github.com/seriousManual/hirestime/pull/39
  const time = hirestime.default();
  await esbuild.build({
    bundle: true,
    minify: process.env.CI === 'true',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    outdir: 'docs/_merged_assets/_static/custom-elements-manifest',
    plugins: [litCssPlugin()],
    entryPoints: {
      'css-value-doc': join(path, 'components', 'css-value-doc', 'css-value-doc.ts'),
      'type-doc': join(path, 'components', 'type-doc', 'type-doc.ts'),
      'json-viewer': '@power-elements/json-viewer',
    },
  }).catch(() => process.exit(1));
  console.log(chalk.yellow`[custom-elements-manifest] ${chalk.green`Done in ${time.seconds()}s`}`);
}
