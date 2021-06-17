import { plugins, copyPlugin } from '../docs/custom-elements-manifests-plugins/index.js';

/** @type {import('@open-wc/custom-elements-manifest').Plugin} */
export default ({
  exclude: ['*.d.ts'],
  plugins: [
    ...plugins,
    copyPlugin(import.meta.url),
  ],
});
