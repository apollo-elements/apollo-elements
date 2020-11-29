import esbuild from 'rollup-plugin-esbuild';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import litcss from 'rollup-plugin-lit-css';
import { copy } from '@web/rollup-plugin-copy';

export default {
  input: './packages/docs/components.ts',
  output: {
    format: 'es',
    file: './docs/components.js',
  },
  plugins: [
    litcss(),
    nodeResolve(),
    commonjs(),
    copy({ patterns: '**/*.svg', rootDir: 'packages/docs' }),
    esbuild({
      tsconfig: './packages/docs/tsconfig.json',
      include: 'packages/docs/*',
      minify: true,
      sourceMap: true,
      loaders: {
        '.ts': 'ts',
        '.css': 'ts',
        '.graphql': 'ts',
      },
    }),
  ],
};
