import chalk from 'chalk';
import esbuild from 'esbuild';
import hirestime from 'hirestime';

import { replace } from '@pwrs/esbuild-plugin-replace';
import { join } from 'path';
import { readFileSync } from 'fs';

export async function bundle({ path }) {
  console.log(chalk.yellow`[webcomponents-dev] ${chalk.blue`Building ${chalk.bold`<wcd-snippet>`}...`}`);
  const ESBUILD_BUNDLED_WCD_HTML =
    readFileSync(join(path, 'components', 'wcd-snippet', 'wcd-snippet.html'), 'utf8');

  // @ts-expect-error: https://github.com/seriousManual/hirestime/pull/39
  const time = hirestime.default();

  await esbuild.build({
    bundle: true,
    minify: process.env.CI === 'true',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    outdir: 'docs/_merged_assets/_static/webcomponents-dev',
    plugins: [replace({ ESBUILD_BUNDLED_WCD_HTML })],
    entryPoints: {
      'wcd-snippet': join(path, 'components', 'wcd-snippet', 'wcd-snippet.ts'),
    },
  }).catch(() => process.exit(1));

  console.log(chalk.yellow`[webcomponents-dev] ${chalk.green`Done in ${time.seconds()}s`}`);
}
