import { readmePlugin } from 'cem-plugin-readme';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default ({
  exclude: ['lib/*', '**/*.d.ts'],
  plugins: [
    readmePlugin({
      from: dirname(fileURLToPath(import.meta.url)),
      header: 'README.head.md',
      headingOffset: 2,
    }),
  ],
});
