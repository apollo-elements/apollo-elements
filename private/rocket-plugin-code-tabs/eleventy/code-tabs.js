import path from 'path';

import esbuild from 'esbuild';
import chalk from 'chalk';

import { fileURLToPath } from 'url';
import { litCssPlugin } from 'esbuild-plugin-lit-css';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const NS_PER_SEC = 1e9;

export async function codeTabsEleventyPlugin(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('**/_static/code-tabs/**/*');
  eleventyConfig.on('beforeBuild', async function bundleComponents() {
    console.log(chalk.yellow`[code-tabs] ${chalk.blue`Building ${chalk.bold`<code-tabs>`} and ${chalk.bold`<code-copy>`}...`}`);
    const time = process.hrtime();

    await esbuild.build({
      bundle: true,
      minify: process.env.CI === 'true',
      sourcemap: true,
      format: 'esm',
      target: 'es2020',
      outdir: 'docs/_merged_assets/_static/code-tabs',
      plugins: [litCssPlugin()],
      entryPoints: {
        'code-copy': path.join(__dirname, '..', 'components', 'code-copy.ts'),
        'code-tabs': path.join(__dirname, '..', 'components', 'code-tabs.ts'),
      },
    }).catch(() => {
      process.exit(1);
    });

    const [s, ns] = process.hrtime(time);
    const durationNs = s * NS_PER_SEC + ns;

    console.log(chalk.yellow`[code-tabs] ${chalk.green`Done in ${durationNs / NS_PER_SEC}s`}`);
  });
}
