/** @param{import('@11ty/eleventy/src/UserConfig')} */
module.exports = function PagefindPlugin(eleventyConfig) {
  eleventyConfig.on('eleventy.after', async function() {
    const {$} = await import('execa');
    await $`npx pagefind --source _site`;
  });
}
