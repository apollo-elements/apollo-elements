// @ts-check
const { AssetCache } = require("@11ty/eleventy-fetch");
const cache = new AssetCache('import_map_results');

let lastOptions;

module.exports = function(eleventyConfig, options) {
  eleventyConfig.addGlobalData('importMap', async function(configData) {
    const serializedOptions = JSON.stringify(options.specs);
    let map;
    // if (serializedOptions !== lastOptions) {
    //   lastOptions = serializedOptions;
    //   map = await fetchIt(options, cache);
    // } else {
      map = !cache.isCacheValid(options.cacheFor ?? '1d')
        ? await fetchIt(options, cache)
        : await cache.getCachedValue();
    // }
    const json = { ...map };
    const additional = await options?.additionalImports?.call(this, configData) ?? {}
    for (const [key, value] of Object.entries(additional))
      json.imports[key] = value;
    return json;
  });
}

async function fetchIt(options, cache) {
  console.log('[eleventy-plugin-jspm]: Generating import map...');
  const { Generator } = await import('@jspm/generator');
  const generator = new Generator({ env: options.env ?? ['production', 'browser', 'module'] });
  await generator.install(options.specs);
  const map = generator.getMap();
  await cache.save(map, 'json');
  console.log('[eleventy-plugin-jspm]:  ...Done!');
  return map;
}
