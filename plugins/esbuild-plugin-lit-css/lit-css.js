import { createRequire } from 'module';

import fs from 'fs';

export function litCssPlugin({ filter = /\.css$/, tag = 'css', specifier = 'lit' } = {}) {
  const require = createRequire(import.meta.url);

  const stringToTemplateLiteral = require('string-to-template-literal').default;

  return {
    name: 'lit-css',
    setup(build) {
      const loader = 'js';
      build.onLoad({ filter }, async args => {
        const cssString = await fs.promises.readFile(args.path, 'utf8');
        const contents = `import {${tag}} from '${specifier}';export default ${tag}${stringToTemplateLiteral(cssString)}`;
        return { contents, loader };
      });
    },
  };
}
