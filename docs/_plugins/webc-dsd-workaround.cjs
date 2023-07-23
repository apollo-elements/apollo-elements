/** @param {import('@11ty/eleventy/src/UserConfig')} */
module.exports = function(eleventyConfig, options) {
  const TAG_NAME = options?.tagName ?? 'webc-dsd-slot-workaround';
  eleventyConfig.addTransform('webc-dsd-slot-workaround', async function(content) {
    if (this.page.outputPath?.endsWith?.('.html')) {
      const { transform } = await import('./transform.js');
      return transform(content);
    }
  });
};

