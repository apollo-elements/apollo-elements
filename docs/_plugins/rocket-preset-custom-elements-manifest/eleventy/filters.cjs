const githubUrl = require('get-github-url');

const { join } = require('node:path');
const { and, compose, isLengthy, not, propIs } = require('../lib/fp.cjs');

/** @typedef {import('custom-elements-manifest/schema').Module} Module */
/** @typedef {import('custom-elements-manifest/schema').ClassMember} ClassMember */
/** @typedef {import('custom-elements-manifest/schema').Declaration} Declaration */
/** @typedef {import('custom-elements-manifest/schema').FunctionDeclaration} FunctionDeclaration */
/** @typedef {import('custom-elements-manifest/schema').FunctionLike} FunctionLike */
/** @typedef {import('custom-elements-manifest/schema').ClassDeclaration} ClassDeclaration */
/** @typedef {import('custom-elements-manifest/schema').ClassMethod} ClassMethod */
/** @typedef {import('custom-elements-manifest/schema').Parameter} Parameter */
/** @typedef {import('custom-elements-manifest/schema').Type} Type */

const isMixin = d => d.kind === 'mixin';

const kindIs = propIs('kind');

const nameIs = propIs('name');

const isPrivate = x =>
  x.privacy === 'protected' || x.privacy === 'private';

const split = (x, d) => !x ? '' : x.split(d ?? ' ');

const filterMembersBy = p => declaration =>
  (declaration?.members ?? []).filter(p);

const getDeclaration = (moduleData, declaration) =>
  (moduleData?.declarations ?? []).find(nameIs(declaration));

const getAllFields = filterMembersBy(kindIs('field'));

const getAllMethods = filterMembersBy(kindIs('method'));

const getFields = filterMembersBy(and(kindIs('field'), not(isPrivate)));

const getMethods = filterMembersBy(and(kindIs('method'), not(isPrivate)));

const getPrivateFields = filterMembersBy(and(kindIs('field'), isPrivate));

const getPrivateMethods = filterMembersBy(and(kindIs('method'), isPrivate));

const getExports = m => m.exports;

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

function manifestModuleImports(eleventyConfig, configOptions) {
  eleventyConfig.addFilter('manifestModuleImports', function(moduleData, callSiteOpts = {}) {
    if (!moduleData) return '';

    const { path, exports } = moduleData;

    const {
      packageName = '',
      keepExtension = false,
      max = 100,
    } = { ...configOptions, ...callSiteOpts };

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
 * @param  {string|Type} input
 * @return {string}
 */
function getTypeString(input) {
  return (typeof input === 'string' ? input : input?.text) ?? '';
}

module.exports = {
  getTypeString,
  manifestModuleImports,
  nonContent,
  sortClassMembers,
  sortByProp,
  getHeadings,
  isPrivate,
  split,
  filterMembersBy,
  getDeclaration,
  getAllFields,
  getAllMethods,
  getFields,
  getMethods,
  getPrivateFields,
  getPrivateMethods,
  getExports,
  getAttributes,
  getCssProperties,
  getCssParts,
  getSlots,
  getEvents,
  getGitHubURL,
}
