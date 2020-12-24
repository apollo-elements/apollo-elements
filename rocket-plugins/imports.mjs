/* eslint-env node */
/* eslint-disable easy-loops/easy-loops */

import visit from 'unist-util-visit';

import h from 'hastscript';
import Parse5 from 'parse5';
import toHast from 'hast-util-from-parse5';
import toHtml from 'hast-util-to-html';

const { ELEVENTY_ENV } = process.env;

export function setupImport(eleventyConfig, options) {
  eleventyConfig.addTransform('import-web-components', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      const tree = toHast(Parse5.parse(content));

      /**
       * Import specifiers to load
       */
      const specifiers = new Set(['']);

      visit(tree, 'element', function importDefinition(node, index, parent) {
        for (const [tagName, importSpecifier] of Object.entries(options.specifiers)) {
          const isProd = ELEVENTY_ENV === 'production';

          if (node.tagName === tagName) {
            const specifier =
                typeof importSpecifier === 'string' ? importSpecifier
              : typeof importSpecifier === 'function' ? importSpecifier(tagName, isProd)
              : null;

            specifiers.add(specifier ?? null);
          }
        }
        return node;
      });

      const value = [...specifiers]
        .filter(Boolean)
        .map(specifier => `import '${specifier}';`)
        .join('\n');

      if (specifiers.size > 0)
        tree.children.push(h('script', { type: 'module' }, [{ type: 'text', value }]));

      return toHtml(tree);
    } else
      return content;
  });
}
