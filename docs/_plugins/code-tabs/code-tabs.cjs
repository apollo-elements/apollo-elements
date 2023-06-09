const { default: hirestime } = require('hirestime');
const { join } = require('path');

/** @param {import('@11ty/eleventy/src/UserConfig')} */
module.exports = function(eleventyConfig) {
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
      format: 'esm',
      target: 'es2021',
      outdir: 'docs/_plugins/code-tabs/components',
      plugins: [litCssPlugin()],
      entryPoints: [
        join(__dirname, 'components/code-tabs.ts',),
        join(__dirname, 'components/code-copy.ts',),
      ],
    }).catch(() => process.exit(1));

    console.log(chalk.yellow`[code-tabs] ${chalk.green`Done in ${time.seconds()}s`}`);
  })
}
