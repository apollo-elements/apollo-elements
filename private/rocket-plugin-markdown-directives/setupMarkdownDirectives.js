/* eslint-disable easy-loops/easy-loops */

import { visit } from 'unist-util-visit';

function toAttr(attr, value) {
  return (
      !value ? ''
    : value === true ? attr
    : `${attr}="${value}"`
  );
}

export function setupMarkdownDirectives({ page, rocketConfig, ...config }) {
  return function transformer(tree, file, next) {
    visit(tree, 'code', function markdownDirectives(node, index, parent) {
      for (const [command, fn] of Object.entries(config)) {
        if (typeof node.meta === 'string') {
          const [directive, ...args] = node.meta
            .split(' ')
            .map(x => x.trim());

          if (directive === command) {
            if (typeof fn !== 'function')
              throw new Error('Wrapper function must be a function');

            const { tagName, attributes = {} } = fn(args, { node, page, parent, rocketConfig });

            const attrs = Object.entries(attributes)
              .reduce((acc, [attr, value]) =>
                `${acc} ${toAttr(attr, value)}`, '');

            node = {
              type: 'root',
              children: [
                { type: 'html', value: `<${tagName}${attrs}>` },
                { type: 'text', value: '\n\n' },
                node,
                { type: 'text', value: '\n\n' },
                { type: 'html', value: `</${tagName}>` },
              ],
            };

            parent.children.splice(index, 1, node);
          }
        }
      }
    });

    if (typeof next === 'function')
      return next(null, tree, file);
    else
      return tree;
  };
}
