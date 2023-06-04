/**
 * @param  {string} attr
 * @param  {string|number|boolean} value
 * @return {string}
 */
function toAttr(attr, value) {
  return (
      !value ? ''
    : value === true ? attr
    : `${attr}="${value}"`
  );
}

/**
 * Add custom markdown fenced code block directives to Rocket
 *
 * @param  {Partial<import('./types.src').Options>} options
 * @return {Promise<import('unified').Transformer>}
 */
exports.markdownDirectives = async function markdownDirectives(options) {
  const { visit } = await import('unist-util-visit');

  const { page, rocketConfig, ...config } = (options);
  /** @type {import('unified').Transformer} */
  return function transformer(tree, file, next) {
    visit(tree, 'code', function markdownDirectives(node, index, parent) {
      // eslint-disable-next-line easy-loops/easy-loops
      for (const [command, fn] of Object.entries(config)) {
        if (typeof node.meta === 'string') {
          const [directive, ...args] = node.meta
            .split(' ')
            .map(x => x.trim());

          if (directive === command) {
            if (typeof fn !== 'function')
              throw new Error('Wrapper function must be a function');

            const { attributes, tagName, textContent } =
              fn(args, { node, page, parent, rocketConfig });

            const attrs = Object.entries(attributes ?? {})
              .reduce((acc, [attr, value]) =>
                `${acc} ${toAttr(attr, value)}`, '');

            const contentNode = textContent ? { type: 'text', value: textContent } : node;

            node = {
              type: 'root',
              children: [
                { type: 'html', value: `<${tagName}${attrs}>` },
                { type: 'text', value: '\n\n' },
                contentNode,
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
      return /** @type{import('unist').Node}*/(next(null, tree, file)); // best guess
    else
      return tree;
  };
}
