console.log("@apollo-elements/components custom-elements-manifest.config.js");

import { plugins, copyPlugin } from '../docs/custom-elements-manifests-plugins/index.js';

console.log(plugins, copyPlugin);

export default {
  exclude: [
    'apollo-client.ts',
  ],
  plugins: [
    ...plugins,
    copyPlugin(import.meta.url),
  ],
};

console.log('config loaded');
