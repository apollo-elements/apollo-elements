const path = require('node:path');
module.exports = function(eleventyConfig, { importMap, playgroundImport }) {
  eleventyConfig.on('eleventy.before', async function() {
    const m = await import('./bundle.js')
    await m.bundle({ importMap, playgroundImport, path: path.join(__dirname) });
  });
}
