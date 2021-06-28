import { plugins, copyPlugin } from '@apollo-elements/custom-elements-manifest-preset';

/** @type {import('@open-wc/custom-elements-manifest').Plugin} */
export default ({
  exclude: ['*.d.ts'],
  plugins: [
    ...plugins,
    copyPlugin(import.meta.url),
  ],
});
