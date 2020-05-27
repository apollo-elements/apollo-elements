import { readFileSync, writeFileSync } from 'fs';

[
  './apollo-element.d.ts',
  './apollo-mutation.d.ts',
  './apollo-query.d.ts',
].forEach(path => writeFileSync(path, readFileSync(path, 'utf-8')
  .replace(/\};\n\} & typeof (.*)Element;/, `} & $1Element;
} & typeof $1Element; `)));
