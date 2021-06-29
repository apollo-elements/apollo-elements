import path from 'path';
import esbuild from 'esbuild';
import chalk from 'chalk';
import mkdirp from 'mkdirp';

import { readFileSync } from 'fs';
import { replace } from 'esbuild-plugin-replace';
import { fileURLToPath } from 'url';

const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

import { copySync } from 'cpx';

const NS_PER_SEC = 1e9;

const ESBUILD_BUNDLED_PLAYGROUND_HTML =
  readFileSync(path.join(__dirname, '..', 'components', 'docs-playground.html'), 'utf8');

const ESBUILD_BUNDLED_PLAYGROUND_PREVIEW =
  readFileSync(path.join(__dirname, '..', 'components', 'playground-preview.html'), 'utf8');

export async function playgroundElementsEleventyPlugin(eleventyConfig, { importMap }) {
  let shouldBundlePlayground = true;
  eleventyConfig.addPassthroughCopy('docs/_assets/_static/playground-elements/*');
  eleventyConfig.addPassthroughCopy(`docs/_assets/_static/playground-elements/playground-service-worker-proxy.html`);

  eleventyConfig.on('beforeBuild', async function bundleComponents() {
    const time = process.hrtime();
    console.log(chalk.yellow`[playground-elements] ${chalk.blue`Building ${chalk.bold`<docs-playground>`}${shouldBundlePlayground ? ` and ${chalk.bold`<playground-ide>`}` : ''}...`}`);

    await esbuild.build({
      bundle: true,
      minify: process.env.CI === 'true',
      sourcemap: true,
      format: 'esm',
      target: 'es2020',
      outdir: 'docs/_assets/_static/playground-elements',
      plugins: [
        replace({
          include: /docs-playground\.ts$/,
          ESBUILD_BUNDLED_IMPORT_MAP: JSON.stringify(importMap),
          ESBUILD_BUNDLED_PLAYGROUND_HTML,
          ESBUILD_BUNDLED_PLAYGROUND_PREVIEW,
        }),
      ],
      entryPoints: {
        'docs-playground': path.join(__dirname, '..', 'components', 'docs-playground.ts'),
        ...shouldBundlePlayground && {
          'playground': 'playground-elements',
        },
      },
    }).catch(() => {
      process.exit(1);
    });

    shouldBundlePlayground = null;

    const OUT = 'docs/_assets/_static/playground-elements/';
    const SITE = '_site/_assets/_static/playground-elements/';
    const DEV = '_site-dev/_assets/_static/playground-elements/';

    // eslint-disable-next-line easy-loops/easy-loops
    for (const base of [OUT, DEV, SITE]) {
      await mkdirp(base);
      copySync('node_modules/playground-elements/playground-service-worker-proxy.html', base);
      copySync('node_modules/playground-elements/playground-service-worker.js', base);
      copySync('node_modules/playground-elements/playground-typescript-worker.js', base);
    }

    const [s, ns] = process.hrtime(time);
    const durationNs = s * NS_PER_SEC + ns;

    console.log(chalk.yellow`[playground-elements] ${chalk.green`Done in ${durationNs / NS_PER_SEC}s`}`);
  });
}
