import path from 'path';
import esbuild from 'esbuild';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { litCssPlugin } from 'esbuild-plugin-lit-css';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const NS_PER_SEC = 1e9;

export async function bundleComponents() {
  const time = process.hrtime();
  console.log(chalk.yellow`[custom-elements-manifest] ${chalk.blue`Building ${chalk.bold`<type-doc>`} and ${chalk.bold`<json-viewer>`}...`}`);

  await esbuild.build({
    bundle: true,
    minify: process.env.CI === 'true',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    outdir: 'docs/_merged_assets/_static/custom-elements-manifest',
    entryPoints: {
      'type-doc': path.join(__dirname, 'components', 'type-doc', 'type-doc.ts'),
      'json-viewer': '@power-elements/json-viewer',
    },
    plugins: [litCssPlugin()],
  }).catch(() => {
    process.exit(1);
  });

  const [s, ns] = process.hrtime(time);
  const durationNs = s * NS_PER_SEC + ns;

  console.log(chalk.yellow`[custom-elements-manifest] ${chalk.green`Done in ${durationNs / NS_PER_SEC}s`}`);
}
