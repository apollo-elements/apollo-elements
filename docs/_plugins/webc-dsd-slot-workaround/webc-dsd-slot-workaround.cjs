/** @param {import('@11ty/eleventy/src/UserConfig')} */
module.exports = function(eleventyConfig, options) {
  eleventyConfig.addTransform('webc-dsd-slot-workaround', async function(content) {
    if (this.page.outputPath?.endsWith?.('.html')) {
      const { transform } = await import('./transform.js');
      return transform(content, options);
    }
  });
};

