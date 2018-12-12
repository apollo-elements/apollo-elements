import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import string from 'rollup-plugin-string';

export default {
  input: 'test/src.js',
  output: {
    file: 'test/client.js',
    format: 'es',
    sourcemap: true,
  },

  plugins: [

    // REQUIRED to roll apollo-client up
    resolve({
      browser: true,
      jsnext: true,
      module: true,
    }),

    commonjs(),

    string({
      include: ['**/*.graphql'],
    }),

  ],
};
