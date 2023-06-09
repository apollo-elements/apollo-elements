/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
const { DepGraph } = require('dependency-graph');

const urlFilter = require('@11ty/eleventy/src/Filters/Url.js');

const fs = require('fs');
const { SaxEventType, SAXParser } = require('sax-wasm');

const saxPath = require.resolve('sax-wasm/lib/sax-wasm.wasm');
const saxWasmBuffer = fs.readFileSync(saxPath);

/** @typedef {import('./types').NavigationNode} NavigationNode */
/** @typedef {import('./types').Heading} Heading */
/** @typedef {import('./types').SaxData} SaxData */

// Instantiate
const parser = new SAXParser(
  SaxEventType.Attribute | SaxEventType.OpenTag | SaxEventType.Text | SaxEventType.CloseTag,
  { highWaterMark: 256 * 1024 }, // 256k chunks
);
parser.prepareWasm(saxWasmBuffer);

/**
 * @param {string} html
 */
function getHeadingsOfHtml(html) {
  /** @type {Heading[]} */
  const headings = [];
  let capture = false;
  /** @type {Heading} */
  let captured = { text: '' };
  parser.eventHandler = (ev, _data) => {
    const data = /** @type {SaxData} */ (/** @type {any} */ (_data));
    if (ev === SaxEventType.OpenTag) {
      if (data.name === 'h2') {
        capture = true;
      }
    }

    if (capture && ev === SaxEventType.Text) {
      captured.text += data.value;
    }
    if (ev === SaxEventType.Attribute) {
      if (data.name.toString() === 'id') {
        captured.id = data.value.toString();
      }
    }

    if (ev === SaxEventType.CloseTag) {
      if (data.name === 'h2') {
        capture = false;
        headings.push(captured);
        captured = { text: '' };
      }
    }
  };
  parser.write(Buffer.from(html));
  parser.end();

  return headings;
}

const headingsCache = new Map();

/**
 * @param {NavigationNode[]} nodes
 * @param {string} key
 */
function findNavigationEntries(nodes = [], key = '') {
  const pages = [];
  for (const entry of nodes) {
    if (entry.data && entry.data.eleventyNavigation) {
      const nav = entry.data.eleventyNavigation;
      if ((!key && !nav.parent) || nav.parent === key) {
        pages.push({
          ...nav,
          url: nav.url || entry.data.page.url,
          pluginType: 'eleventy-navigation',
          templateContent: entry.templateContent,
          ...(key ? { parentKey: key } : {}),
        });
      }
    }
  }

  return pages
    .sort((a, b) => {
      return (a.order || 0) - (b.order || 0);
    })
    .map(entry => {
      if (!entry.title) {
        entry.title = entry.key;
      }
      if (entry.key) {
        // @ts-ignore
        entry.children = findNavigationEntries(nodes, entry.key);
      }
      return entry;
    });
}

/**
 * @param {NavigationNode[]} nodes
 * @param {object} options
 * @param {string} options.title
 */
function rocketPageAnchors(nodes, { title }) {
  for (const entry of nodes) {
    if (entry.data && entry.data.title === title) {
      if (!headingsCache.has(entry.templateContent)) {
        headingsCache.set(entry.templateContent, getHeadingsOfHtml(entry.templateContent));
      }
      const headings = /** @type {Heading[]} */ (headingsCache.get(entry.templateContent));
      const anchors = headings.map(heading => ({
        key: heading.text + Math.random(),
        parent: entry.key,
        url: `${entry.url}#${heading.id}`,
        pluginType: 'eleventy-navigation',
        parentKey: entry.key,
        title: heading.text,
        anchor: true,
      }));
      return anchors;
    }
  }
  return [];
}

/**
 * @param {NavigationNode[]} pages
 * @param {*} depGraph
 * @param {string} [parentKey]
 */
function findDependencies(pages, depGraph, parentKey) {
  for (const page of pages) {
    depGraph.addNode(page.key, page);
    if (parentKey) {
      depGraph.addDependency(page.key, parentKey);
    }
    if (page.children) {
      findDependencies(page.children, depGraph, page.key);
    }
  }
}

/**
 * @param {NavigationNode[]} nodes
 * @param {string} activeKey
 */
function findBreadcrumbEntries(nodes, activeKey) {
  const pages = findNavigationEntries(nodes);
  const graph = new DepGraph();
  findDependencies(pages, graph);

  return activeKey
    ? graph.dependenciesOf(activeKey).map(key => {
        const data = { ...graph.getNodeData(key) };
        delete data.children;
        data._isBreadcrumb = true;
        return data;
      })
    : [];
}

/**
 * @param {NavigationNode[]} pages
 * @param {*} _options
 * @return {string}
 */
function navigationToHtml(pages, _options = {}) {
  const options = {
    listElement: 'ul',
    listItemElement: 'li',
    listClass: '',
    listItemClass: '',
    listItemHasChildrenClass: '',
    activeKey: '',
    activeListItemClass: 'current',
    anchorClass: '',
    activeAnchorClass: '',
    activeTreeListClass: 'active',
    activeAnchorListClass: 'active',
    showExcerpt: false,
    isChildList: false,
    ..._options,
  };

  /** @type {Array<string>} */
  let activePages = [];
  if (options.activeKey) {
    const graph = new DepGraph();
    findDependencies(pages, graph);

    try {
      activePages = graph.dependenciesOf(options.activeKey);
    } catch (err) {
      /* no active pages found */
    }
  }
  const isChildList = !!options.isChildList;
  options.isChildList = true;

  if (pages.length && pages[0].pluginType !== 'eleventy-navigation') {
    throw new Error(
      'Incorrect argument passed to eleventyNavigationToHtml filter. You must call `eleventyNavigation` or `eleventyNavigationBreadcrumb` first, like: `collection.all | eleventyNavigation | eleventyNavigationToHtml | safe`',
    );
  }

  return pages.length
    ? `<${options.listElement}${
        !isChildList && options.listClass ? ` class="${options.listClass}"` : ''
      }>${pages
        .map(entry => {
          const liClass = [];
          if (options.listItemClass) {
            liClass.push(options.listItemClass);
          }
          if (options.activeKey === entry.key && options.activeListItemClass) {
            liClass.push(options.activeListItemClass);
          }
          if (options.activeTreeListClass && activePages && activePages.includes(entry.key)) {
            liClass.push(options.activeTreeListClass);
          }
          if (options.listItemHasChildrenClass && entry.children && entry.children.length) {
            liClass.push(options.listItemHasChildrenClass);
          }

          const output = [];
          output.push(
            `<${options.listItemElement}${liClass.length ? ` class="${liClass.join(' ')}"` : ''}>`,
          );
          output.push(`<a href="${urlFilter(entry.url)}">${entry.title}</a>`);
          if (options.showExcerpt && entry.excerpt) {
            output.push(`: ${entry.excerpt}`);
          }
          if (options.activeKey === entry.key && options.activeListItemClass) {
            output.push('<!-- ADD PAGE ANCHORS -->');
          }
          if (entry.children) {
            output.push(navigationToHtml(entry.children, options));
          }
          output.push(`</${options.listItemElement}>`);

          return output.join('\n');
        })
        .join('\n')}</${options.listElement}>`
    : '';
}

module.exports = {
  findNavigationEntries,
  findBreadcrumbEntries,
  rocketPageAnchors,
  toHtml: navigationToHtml,
};
