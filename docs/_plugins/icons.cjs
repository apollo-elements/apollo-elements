// @ts-check
const fs = require('node:fs/promises');

/** @param{import('@11ty/eleventy/src/UserConfig.js')} eleventyConfig */
module.exports = function(eleventyConfig) {
  eleventyConfig.addExtension('svg', {
    outputFileExtension: 'svg',
    compile: x => () => x,
    compileOptions: {
      permalink(contents, path) {
        return () => path.startsWith('./docs/icons/') ? false : undefined;
      }
    },
    async getData(inputPath) {
      const content = await fs.readFile(inputPath, 'utf-8');
      const isIcon = inputPath.startsWith('./docs/icons/');
      const [,title] = content.match(/<title>(.*)<\/title>/m) ?? [];
      return {
        title,
        eleventyExcludeFromCollections: !isIcon,
      };
    }
  });

  const icons = new WeakMap();
  eleventyConfig.addJavaScriptFunction('getIcons', function(page) {
    if (!icons.has(page)) icons.set(page, new Map());
    return icons.get(page);
  });
};
