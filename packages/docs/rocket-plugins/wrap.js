/* eslint-env node */
/* eslint-disable easy-loops/easy-loops */

import visit from 'unist-util-visit';

import { isPlugin } from './isPlugin.js';

const name = 'wrap-copy';

function toAttr(attr, value) {
  return (
      !value ? ''
    : value === true ? attr
    : `${attr}="${value}"`
  );
}

export function setupWrap(config) {
  return function(plugins) {
    if (!plugins.find(isPlugin(name))) {
      const plugin = function wrapCopy({ page }) {
        return function transformer(tree, file, next) {
          visit(tree, 'code', function copyWrapper(node, index, parent) {
            for (const [command, fn] of Object.entries(config)) {
              if (!node.meta) return node;
              const [directive, ...args] = node.meta
                .split(' ')
                .map(x => x.trim());

              if (directive === command) {
                if (typeof fn !== 'function')
                  throw new Error('Wrapper function must be a function');

                const { tagName, attributes = {} } = fn(args, page);

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

            return node;
          });

          if (typeof next === 'function')
            return next(null, tree, file);

          return tree;
        };
      };

      plugins = [{ name, plugin }, ...plugins];
      return plugins;
    }
  };
}
