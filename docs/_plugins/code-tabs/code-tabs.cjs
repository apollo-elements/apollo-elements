const { default: hirestime } = require('hirestime');
const { join } = require('node:path');
const { cp } = require('node:fs/promises');

/** @param {import('@11ty/eleventy/src/UserConfig')} */
module.exports = function(eleventyConfig, options) {
  eleventyConfig.addWatchTarget('docs/_plugins/code-tabs/components/');
  eleventyConfig.addGlobalData('codeTabsCollections', options?.collections ?? {});
  eleventyConfig.on('eleventy.before', async function() {
    const esbuild = await import('esbuild');
    const { default: chalk } = await import('chalk');
    const { litCssPlugin } = await import('esbuild-plugin-lit-css');

    console.log(chalk.yellow`[code-tabs] ${chalk.blue`Building ${chalk.bold`<code-tabs>`}...`}`);

    const time = hirestime();

    await esbuild.build({
      bundle: true,
      minify: process.env.CI === 'true',
      sourcemap: true,
      allowOverwrite: true,
      external: [
        'lit',
        './code-copy.js',
      ],
      format: 'esm',
      target: 'es2021',
      outdir: 'docs/_plugins/code-tabs/components',
      plugins: [litCssPlugin()],
      entryPoints: [
        join(__dirname, 'components/code-copy.ts',),
        join(__dirname, 'components/code-tabs.ts',),
      ],
    }).catch(() => process.exit(1));

    await cp(
        join(__dirname, 'components/code-copy.js',),
        join(process.cwd(), '_site/assets/components/code-copy.js'),
    );
    await cp(
        join(__dirname, 'components/code-tabs.js',),
        join(process.cwd(), '_site/assets/components/code-tabs.js'),
    );

    console.log(chalk.yellow`[code-tabs] ${chalk.green`Done in ${time.seconds()}s`}`);
  });
}
