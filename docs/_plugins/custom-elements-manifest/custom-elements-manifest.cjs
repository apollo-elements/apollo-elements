const { prettyJson } = require('./lib/prettyJson.cjs');
const { linkToTypes } = require('./lib/linkToTypes.cjs');
const { trace } = require('./lib/fp.cjs');
const {
  getAttributes,
  getCssParts,
  getCssProperties,
  getDeclaration,
  getEvents,
  getExports,
  getFields,
  getGitHubURL,
  getHeadings,
  getMethods,
  getPrivateFields,
  getPrivateMethods,
  getSlots,
  getTypeString,
  isPrivate,
  manifestModuleImports,
  nonContent,
  sortByProp,
  sortClassMembers,
  split,
} = require('./lib/filters.cjs');

/**
 * @typedef {object} CEMOptions
 * @property {{ packageName?: string; keepExtension?: boolean; max?: number; }} [imports]
 * @property {boolean} [typeLinksNewTab=false]
 * @property {Record<string, string>} [typeLinks]
 */
/**
 * @param  {*} eleventyConfig
 * @param  {CEMOptions} options
 */
module.exports = function customElementsManifestPlugin(eleventyConfig, options) {
  const linkifyTypes = linkToTypes(options);
  eleventyConfig.on('eleventy.before', async function() {
    const { bundle } = await import('./lib/bundle.js')
    await bundle({path: __dirname});
  });

  eleventyConfig.addGlobalData('cem', async function getCustomElementsManifests() {
    const { getCustomElementsManifests } = await import('./lib/getCustomElementsManifests.js');
    return getCustomElementsManifests();
  });

  eleventyConfig.addFilter('linkToTypes', async function(...args) {
    return linkifyTypes(...args);
  });

  eleventyConfig.addFilter('codeBlock', async function(type, lang='ts') {
    return this.renderTemplate(`~~~${lang}\n${type}\n~~~`, 'njk,md');
  })

  eleventyConfig.addFilter('prettyJson', prettyJson);
  eleventyConfig.addFilter('split', split);
  eleventyConfig.addFilter('trace', trace);

  eleventyConfig.addFilter('getGitHubURL', getGitHubURL);
  eleventyConfig.addFilter('getDeclaration', getDeclaration);

  eleventyConfig.addFilter('getAttributes', getAttributes);
  eleventyConfig.addFilter('getCssParts', getCssParts);
  eleventyConfig.addFilter('getCssProperties', getCssProperties);
  eleventyConfig.addFilter('getEvents', getEvents);
  eleventyConfig.addFilter('getExports', getExports);
  eleventyConfig.addFilter('getFields', getFields);
  eleventyConfig.addFilter('getMethods', getMethods);
  eleventyConfig.addFilter('getPrivateFields', getPrivateFields);
  eleventyConfig.addFilter('getPrivateMethods', getPrivateMethods);
  eleventyConfig.addFilter('getSlots', getSlots);

  eleventyConfig.addFilter('getTypeString', getTypeString);
  eleventyConfig.addFilter('getHeadings', getHeadings);

  eleventyConfig.addFilter('sortByProp', sortByProp);
  eleventyConfig.addFilter('sortClassMembers', sortClassMembers);

  eleventyConfig.addFilter('isPrivate', isPrivate);

  eleventyConfig.addFilter('nonContent', nonContent);

  eleventyConfig.addPlugin(manifestModuleImports, options.imports);
};
