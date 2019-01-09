import resolve from 'rollup-plugin-node-resolve';
export default {
  input: 'docs/src.js',
  output: { file: 'docs/bundle.js', format: 'esm' },
  plugins: [resolve()],
};
