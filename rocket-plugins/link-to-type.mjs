import visit from 'unist-util-visit';

import h from 'hastscript';
import map from 'unist-util-map';
import Parse5 from 'parse5';
import toHast from 'hast-util-from-parse5';
import toHtml from 'hast-util-to-html';

const isNodeOfName =
  node =>
    name =>
      node.value.match(new RegExp(`\\b${name}\\b`));

function isConfiguredName(options, node) {
  return (
    node.type === 'text' &&
    Object.keys(options)
      .some(isNodeOfName(node))
  );
}

function isTSCodeBlock(node) {
  return (
    node &&
    node.type === 'element' &&
    node.tagName === 'code' &&
    node.properties?.className?.includes('language-ts')
  );
}

function wrap(options, node) {
  const name = node.value.trim();

  const [, prefix, suffix] =
    node.value.match(new RegExp(`(.*)${name}(.*)`, 'm'));

  const href = options[name];
  const rest = href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return { type: 'root', children: [
    { type: 'text', value: prefix },
    h('a', { href, ...rest }, [{ type: 'text', value: name }]),
    { type: 'text', value: suffix },
  ] };
}

function transformContent(content, outputPath, options) {
  const tree = toHast(Parse5.parse(content));

  return toHtml(map(tree, function(node, index, parent) {
    if (!isTSCodeBlock(parent) || !isConfiguredName(options, node))
      return node;
    else
      return wrap(options, node);
  }));
}

export function externalTypeLinks(eleventyConfig, options) {
  eleventyConfig.addTransform('external-type-links', function(content, outputPath) {
    return (
        !outputPath.endsWith('.html') ? content
      : transformContent(content, outputPath, options)
    );
  });
}
