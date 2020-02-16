import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'docs/src.js',
  output: { file: 'docs/bundle.js', format: 'esm' },
  plugins: [
    resolve(),
    terser({
      warnings: true,
      keep_fnames: true,
      compress: { passes: 2 },
      mangle: { properties: false, keep_fnames: true },
    }),
  ],
};
