import { plugins, copyPlugin } from '@apollo-elements/cem-preset';

/** @type {import('@open-wc/custom-elements-manifest').Plugin} */
export default ({
  exclude: ['*.d.ts'],
  plugins: [
    ...plugins,
    copyPlugin({ from: import.meta.url, to: '../../docs/_data/customElementsManifests/' }),
  ],
});
