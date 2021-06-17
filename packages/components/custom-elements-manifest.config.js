import { plugins, copyPlugin } from '../docs/custom-elements-manifests-plugins/index.js';

export default {
  plugins: [
    ...plugins,
    copyPlugin(import.meta.url),
  ],
};
