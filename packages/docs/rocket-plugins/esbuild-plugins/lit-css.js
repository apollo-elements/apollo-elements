// @ts-check

import { createRequire } from 'module';

// @ts-expect-error: it's not typescript
import fs from 'fs';

export function litCss({ filter = /\.css$/, tag = 'css', specifier = 'lit' } = {}) {

  const stringToTemplateLiteral = createRequire(import.meta.url)('string-to-template-literal').default;

  return {
    name: 'lit-css',
    setup(build) {
      const loader = 'js';
      build.onLoad({ filter }, async args => {
        const cssString = await fs.promises.readFile(args.path, 'utf8');
        let contents = `import {${tag}} from '${specifier}';export default ${tag}${stringToTemplateLiteral(cssString)}`;
        return { contents, loader };
      });
    }
  }
}
