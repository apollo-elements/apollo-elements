const { default: hirestime } = require('hirestime');
const { join, dirname } = require('node:path');
const { cp } = require('node:fs/promises');
const fs = require('node:fs');

/** @param {import('@11ty/eleventy/src/UserConfig')} */
module.exports = function(eleventyConfig, options) {
  eleventyConfig.addWatchTarget(join(__dirname, 'components/*.webc'));
  eleventyConfig.addGlobalData('codeTabs',
    Object.fromEntries(
      Object.entries(options?.tabs ?? {})
        .map(([id, tab]) => [id, ({ id, ...tab })]),
    ));
  eleventyConfig.addJavaScriptFunction('readFileSync', function(src) {
    return fs.readFileSync(src, 'utf8');
  });
  eleventyConfig.addJavaScriptFunction('resolveRelativeToInput', function(src, page) {
    return join(dirname(page.inputPath), src);
  });
  eleventyConfig.on('eleventy.before', async function() {
    const esbuild = await import('esbuild');
    const { default: chalk } = await import('chalk');
    const { yellow, blue, bold } = chalk;
    const { litCssPlugin } = await import('esbuild-plugin-lit-css');

    console.log(
      yellow`[code-tabs] ${blue`Building ${bold`<code-tabs>`}...`}`,
    );

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
