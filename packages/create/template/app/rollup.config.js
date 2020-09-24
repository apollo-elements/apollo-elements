import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@open-wc/rollup-plugin-html';
import graphql from '@apollo-elements/rollup-plugin-graphql';
import litcss from 'rollup-plugin-lit-css';
import esbuild from 'rollup-plugin-esbuild';

export default {
  input: 'index.html',

  output: {
    dir: 'build',
    format: 'es',
    sourcemap: true,
  },

  plugins: [
    esbuild({ ts: true, target: 'es2019', minify: true }),
    html(),
    resolve(),
    commonjs(),
    graphql(),
    litcss(),
  ],
};
