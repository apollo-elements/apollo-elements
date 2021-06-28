import githubUrl from 'get-github-url';

import { join } from 'path';
import { markdown } from './markdown.js';
import { externalTypeLinks } from './link-to-type.js';
import { prettyJson } from './prettyJson.js';
import { bundleComponents } from './bundle-components.js';

/** @typedef {import('custom-elements-manifest/schema').Module} Module */
/** @typedef {import('custom-elements-manifest/schema').ClassMember} ClassMember */
/** @typedef {import('custom-elements-manifest/schema').Declaration} Declaration */
/** @typedef {import('custom-elements-manifest/schema').FunctionDeclaration} FunctionDeclaration */
/** @typedef {import('custom-elements-manifest/schema').FunctionLike} FunctionLike */
/** @typedef {import('custom-elements-manifest/schema').ClassDeclaration} ClassDeclaration */
/** @typedef {import('custom-elements-manifest/schema').ClassMethod} ClassMethod */
/** @typedef {import('custom-elements-manifest/schema').Parameter} Parameter */
/** @typedef {import('custom-elements-manifest/schema').Type} Type */

export function manifestModuleImports(eleventyConfig, globalOptions) {
  eleventyConfig.addFilter('manifestModuleImports', function(moduleData, opts = {}) {
    if (!moduleData) return '';

    const { path, exports } = moduleData;
    const { packageName = '', keepExtension = false, max = 100 } = { ...globalOptions, ...opts };
    const resolved = !packageName ? path : join(packageName, path);
    const names = exports.filter(x=> x.kind === 'js').map(x => x.name);
    const sideEffects = exports.filter(x => x.kind === 'custom-element-definition');

    const specifier = (
        keepExtension ? resolved
      : resolved.replace(/\.(\w+)$/, '').replace(/\/index(\.\w+)?$/, '')
    );

    const namedOneLiner = (names.length ? `import { ${names.join(', ')} } from '${specifier}';` : '');

    const sideEffectImports = (sideEffects.length && `import '${specifier}';`);

    const namedImports = (namedOneLiner && namedOneLiner.length <= max) ? namedOneLiner
      : namedOneLiner
        .replace(/{ /, '{\n  ')
        .replace(/(\w), (\w)/g, '$1,\n  $2')
        .replace(/ }/, '\n}')
        .replace(', }', ' }');

    return [sideEffectImports, namedImports].filter(Boolean).join('\n');
  });
}

/**
 * @param  {string|Type} stringOrTypeDescriptor
 * @return {string}
 */
export function getTypeString(stringOrTypeDescriptor) {
  if (!stringOrTypeDescriptor) return '';
  return typeof stringOrTypeDescriptor === 'string' ? stringOrTypeDescriptor
  : stringOrTypeDescriptor.text ?? '';
}

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const isLengthy = xs => !!xs.length;

const isMixin = d => d.kind === 'mixin';

const isPrivate = x => x.privacy === 'protected' || x.privacy === 'private';

const split = (x, d) => !x ? '' : x.split(d ?? ' ');

const propIs = prop => test => obj =>
  test instanceof RegExp ? !!obj[prop]?.match(test) : obj[prop] === test;

const and = (p, q) => x => p(x) && q(x);

const not = p => x => !p(x);

const kindIs = propIs('kind');

const pathIs = propIs('path');

const nameIs = propIs('name');

const filterMembersBy = p => declaration =>
  (declaration?.members ?? []).filter(p);

const getModule = (manifest, path) =>
  (manifest?.modules ?? []).find(pathIs(path));

const getDeclaration = (moduleData, declaration) =>
  (moduleData?.declarations ?? []).find(nameIs(declaration));

const getAllFields = filterMembersBy(kindIs('field'));

const getAllMethods = filterMembersBy(kindIs('method'));

const getFields = filterMembersBy(and(kindIs('field'), not(isPrivate)));

const getMethods = filterMembersBy(and(kindIs('method'), not(isPrivate)));

const getPrivateFields = filterMembersBy(and(kindIs('field'), isPrivate));

const getPrivateMethods = filterMembersBy(and(kindIs('method'), isPrivate));

const getExports = module => module.exports;

const getAttributes = declaration =>
  (declaration?.attributes ?? []).filter(attribute =>
    !getAllFields(declaration).some(f =>
      f.name === attribute.fieldName));

const getCssProperties = declaration =>
  declaration?.cssProperties ?? [];

const getCssParts = declaration =>
  declaration?.cssParts ?? [];

const getSlots = declaration =>
  declaration?.slots ?? [];

const getEvents = declaration =>
  declaration?.events ?? [];

const getGitHubURL = ({ repository: { url = '', directory = '' } = {} } = {}) =>
  !url ? '' : `${githubUrl(url)}${directory ? `/tree/master/${directory}` : ''}`;

function getHeadings(module) {
  const { exports = [], declarations = [] } = module ?? {};
  return Object.entries({
    'Exports': exports.length,
    'Signature': declarations.some(isMixin),
    'Properties': declarations.some(compose(isLengthy, getFields)),
    'Attributes': declarations.some(compose(isLengthy, getAttributes)),
    'Methods': declarations.some(compose(isLengthy, getMethods)),
    'Slots': declarations.some(compose(isLengthy, getSlots)),
    'CSS Custom Properties': declarations.some(compose(isLengthy, getCssProperties)),
    'CSS Shadow Parts': declarations.some(compose(isLengthy, getCssParts)),
    'Events': declarations.some(compose(isLengthy, getEvents)),
  }).filter(([, v]) => !!v).map(([k]) => k);
}

function sortByProp(list = [], prop = '') {
  return list.sort((a, b) => (a[prop] ?? '').localeCompare((b[prop] ?? '')));
}

/**
 * Sort a list of custom-element.json `ClassMember`s
 * @param  {import("custom-elements-manifest/schema").ClassMember[]}  [list=[]]
 * @return {import("custom-elements-manifest/schema").ClassMember[]}
 */
function sortClassMembers(list = []) {
  return sortByProp(list, 'name')
    .sort((a, b) => (a.inheritedFrom && b.inheritedFrom) ? 0 : a.inheritedFrom ? 1 : -1)
    .sort((a, b) => (a.static && b.static) ? 0 : a.static ? -1 : 1);
}

/**
 * Get the non-content blocks from a _joiningBlocks directory
 * @param  {Record<string, string>} blocks Object with keys blockname (file name) and values block include path
 * @return {Record<string, string>} blocks Object with keys blockname (file name) and values block include path
 */
function nonContent(blocks) {
  return Object.fromEntries(Object.entries(blocks).filter(([k]) => k !== '10-content.njk'));
}

/**
 * @typedef   {Object} HackOptions
 * @property  {String} key   11ty Navigation key
 * @property  {Object} module custom element manifest
 * @property  {String} package custom element manifest package name
 */

export function customElementsManifest(eleventyConfig, options) {
  eleventyConfig.on('beforeBuild', bundleComponents);
  eleventyConfig.addPassthroughCopy('docs/_assets/_static/custom-elements-manifest/**/*');
  eleventyConfig.addPairedShortcode('markdown', markdown);

  eleventyConfig.addWatchTarget(`docs/_data/customElementsManifests/**/*.json`);

  eleventyConfig.addFilter('prettyJson', prettyJson);
  eleventyConfig.addFilter('split', split);
  eleventyConfig.addFilter('getGitHubURL', getGitHubURL);
  eleventyConfig.addFilter('getModule', getModule);
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
  eleventyConfig.addPlugin(externalTypeLinks, options.types);
}
