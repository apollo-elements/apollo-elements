/* eslint-disable easy-loops/easy-loops */
import { join } from 'path';
import { markdown } from './markdown.mjs';
import { externalTypeLinks } from './link-to-type.mjs';
import githubUrl from 'get-github-url';

export function manifestModuleImports(eleventyConfig, globalOptions) {
  eleventyConfig.addFilter('manifestModuleImports', function(moduleData, opts = {}) {
    if (!moduleData) return '';
    const { path, exports } = moduleData;
    const { packageName, keepExtension, max = 100 } = { ...globalOptions, ...opts };
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

export function getTypeString(stringOrTypeDescriptor) {
  if (!stringOrTypeDescriptor) return '';
  return typeof stringOrTypeDescriptor === 'string' ? stringOrTypeDescriptor
  : stringOrTypeDescriptor.type ?? '';
}

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const isLengthy = xs => !!xs.length;

const isMixin = d => d.kind === 'mixin';

const split = (x, d) => !x ? '' : x.split(d ?? ' ');

const propIs = prop => test => obj => obj[prop] === test;

const kindIs = propIs('kind');

const pathIs = propIs('path');

const filterMembersBy = p => declaration =>
  (declaration?.members ?? []).filter(p);

const getModule = (manifest, path) =>
  (manifest?.modules ?? []).find(pathIs(path));

const getMethods = filterMembersBy(kindIs('method'));

const getFields = filterMembersBy(kindIs('field'));

const getExports = module => module.exports;

const getAttributes = declaration =>
  (declaration?.attributes ?? []).filter(attribute =>
    !getFields(declaration).some(f =>
      f.name === attribute.fieldName));

const getCssProperties = declaration =>
  declaration?.cssProperties ?? [];

const getCssParts = declaration =>
  declaration?.cssParts ?? [];

const getSlots = declaration =>
  declaration?.slots ?? [];

const getEvents = declaration =>
  declaration?.events ?? [];

const getGithubURL = ({ repository: { url = '', directory = '' } = {} } = {}) =>
  !url ? '' : `${githubUrl(url)}${directory ? `/tree/master/${directory}` : ''}`.replace('//', '/');

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

export function customElementsManifest(eleventyConfig, options) {
  eleventyConfig.addPairedShortcode('markdown', markdown);

  eleventyConfig.addFilter('split', split);

  eleventyConfig.addFilter('hackToInsertHeadings', (nodes = [], { key = '', module = {} } = {}) => (
    nodes.map(entry => (!entry?.data?.module || !entry.templateContent?.html) ? entry : ({
      ...entry,
      templateContent: {
        ...entry.templateContent,
        html: entry.templateContent.html +
          getHeadings(module)
            .map(heading => `<h2 id="${heading.toLowerCase()}">${heading}</h2>`)
            .join('\n'),
      },
    }))
  ));

  eleventyConfig.addFilter('getGithubURL', getGithubURL);

  eleventyConfig.addFilter('getModule', getModule);

  eleventyConfig.addFilter('getAttributes', getAttributes);
  eleventyConfig.addFilter('getCssParts', getCssParts);
  eleventyConfig.addFilter('getCssProperties', getCssProperties);
  eleventyConfig.addFilter('getEvents', getEvents);
  eleventyConfig.addFilter('getExports', getExports);
  eleventyConfig.addFilter('getFields', getFields);
  eleventyConfig.addFilter('getMethods', getMethods);
  eleventyConfig.addFilter('getSlots', getSlots);

  eleventyConfig.addFilter('getTypeString', getTypeString);
  eleventyConfig.addFilter('getHeadings', getHeadings);

  eleventyConfig.addPlugin(manifestModuleImports, options.imports);
  eleventyConfig.addPlugin(externalTypeLinks, options.types);
}
