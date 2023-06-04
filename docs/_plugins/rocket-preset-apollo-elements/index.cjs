const chalk = require ('chalk');
const helmet = require('eleventy-plugin-helmet');
const { mkdir, readFile, writeFile } = require('fs/promises');
const hirestime = require('hirestime');
const { dirname, join } = require('path');
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');
const { icon } = require('./lib/icon.cjs');
const { githubTag } = require('./liquid/github.cjs');
const { linkTag } = require('./liquid/link.cjs');
const { getWebmentionsForUrl } = require('./lib/webmentions.cjs');


const processor = postcss([
  postcssPresetEnv({ features: { 'nesting-rules': true } }),
]);

module.exports = function(eleventyConfig, { transformCSS = '' } = {}) {
  eleventyConfig.on('eleventy.before', async function() {
    const { bundle } = await import('./lib/bundle.js');
    await bundle();
  });

  // eleventyConfig.addPlugin(helmet);

  /* start blog */
  eleventyConfig.addFilter('getWebmentionsForUrl', getWebmentionsForUrl);
  eleventyConfig.addFilter('icon', icon(eleventyConfig));
  eleventyConfig.addFilter('uniUrlFilter', x => encodeURI(x));
  eleventyConfig.addShortcode('github', githubTag);
  eleventyConfig.addShortcode('dev', linkTag);
  /* end blog */

  eleventyConfig.on('afterBuild', async () => {
    if (!transformCSS) return;
    const cwd = join(process.cwd(), 'docs');
    const { globby } = await import('globby');
    const paths = await globby(transformCSS, { cwd });
    // @ts-expect-error: https://github.com/seriousManual/hirestime/pull/39
    const end = hirestime.default();
    // eslint-disable-next-line easy-loops/easy-loops
    for (const path of paths) {
      try {
        const to = (process.cwd(), '_site', path);
        const from = (process.cwd(), 'docs', path);
        const src = await readFile(from, 'utf-8');
        const { css: out } = await processor.process(src, { to, from });
        await mkdir(dirname(to), { recursive: true });
        await writeFile(to, out, 'utf-8');
      } catch (error) {
        console.error(error);
      }
    }
    console.log(chalk.yellow`[apollo-elements]`, 'PostCSS took', end.ms(), 'ms');
  });
};
