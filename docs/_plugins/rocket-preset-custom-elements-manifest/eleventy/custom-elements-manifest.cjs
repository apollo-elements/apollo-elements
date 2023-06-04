const { prettyJson } = require('./prettyJson.cjs');
const { linkToTypes } = require('./linkToTypes.cjs');
const { trace } = require('../lib/fp.cjs');
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
} = require('./filters.cjs');

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
  eleventyConfig.addFilter('linkToTypes', linkToTypes(options));

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
