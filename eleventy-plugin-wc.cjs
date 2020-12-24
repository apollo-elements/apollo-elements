// @ts-check
const { mdjsProcess } = require('@mdjs/core');
const visit = require('unist-util-visit');
const { init, parse } = require('es-module-lexer');

const { parseTitle } = require('@d4kmor/core/title');

/** @typedef {import('@mdjs/core').MdjsProcessPlugin} MdjsProcessPlugin */
/** @typedef {import('./types').EleventPluginMdjsUnified} EleventPluginMdjsUnified */

/**
 * @param {{ tags: Record<string, string> }} pluginOptions
 */
function addScripts(pluginOptions) {
  return tree => {
    const imports = new Set();
    const tags =
      Object.fromEntries(Object.entries(pluginOptions.tags).map(([k, v]) =>
        [k.toLowerCase(), v]));
    visit(tree, 'element', node => {
      const tagName = node.tagName.toLowerCase();
      if (tagName in tags)
        imports.add(tags[node.tagName.toLowerCase()]);
    });
    tree.wcImports = [...imports];
    return tree;
  };
}

/**
 * @param {string} source
 * @param {string} inputPath
 */
async function processImports(source, inputPath) {
  if (!inputPath.endsWith('index.md')) {
    if (source !== '' && source.includes('import')) {
      let newSource = '';
      let lastPos = 0;
      await init;
      const [imports] = parse(source);
      for (const importObj of imports) {
        newSource += source.substring(lastPos, importObj.s);
        const importSrc = source.substring(importObj.s, importObj.e);

        if (importSrc.startsWith('./'))
          newSource += `.${importSrc}`;
        else if (importSrc.startsWith('\'./'))
          newSource += `'.${importSrc.substring(1)}`;
        else if (importSrc.startsWith('../'))
          newSource += `../${importSrc}`;
        else if (importSrc.startsWith('\'../'))
          newSource += `'../${importSrc.substring(1)}`;
        else
          newSource += importSrc;

        lastPos = importObj.e;
      }
      newSource += source.substring(lastPos, source.length);
      return newSource;
    }
  }
  return source;
}

/**
 * @param {EleventPluginMdjsUnified} pluginOptions
 */
function eleventyUnified(pluginOptions) {
  /**
   * @param {string} mdjs
   * @param {*} eleventySettings
   */
  async function render(mdjs, eleventySettings) {
    const result = await mdjsProcess(mdjs, {
      setupUnifiedPlugins: [() => [addScripts]],
    });

    result.jsCode =
      await processImports(result.jsCode, result.wcImports);

    return result;
  }
  return {
    set: () => { },
    render,
  };
}

/**
 * @param {*} eleventyConfig
 * @param {EleventPluginMdjsUnified} [pluginOptions]
 */
function configFunction(eleventyConfig, pluginOptions = {}) {
  eleventyConfig.setLibrary('md', eleventyUnified(pluginOptions));
}

const eleventPluginMdjsUnified = {
  initArguments: {},
  configFunction,
};

module.exports = eleventPluginMdjsUnified;
