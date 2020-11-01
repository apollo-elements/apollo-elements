// import esbuild from 'rollup-plugin-esbuild';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import litcss from 'rollup-plugin-lit-css';
import { copy } from '@web/rollup-plugin-copy';

export default {
  input: './packages/docs/components.ts',
  // external: id => id.includes('packages/docs/'),
  output: {
    format: 'es',
    file: './docs/components.js',
  },
  plugins: [
    litcss(),
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: 'packages/docs/tsconfig.json' }),
    copy({ patterns: '**/*.svg', rootDir: 'packages/docs' }),
    // esbuild({
    //   tsconfig: './packages/docs/tsconfig.json',
    //   include: 'packages/docs/*',
    //   minify: true,
    //   sourceMap: true,
    //   loaders: {
    //     '.ts': 'ts',
    //     '.css': 'ts',
    //     '.graphql': 'ts',
    //   },
    // }),
  ],
};
