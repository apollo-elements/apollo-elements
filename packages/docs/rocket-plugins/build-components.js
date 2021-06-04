import path from 'path';
import esbuild from 'esbuild';

export function buildComponents() {
  const basePath = path.join(path.dirname(import.meta.url.replace('file://', '')), '../../..');

  const resolve = {
    name: 'resolve-monorepo-pkgs',
    setup(build) {
      // Redirect all paths starting with "images/" to "./public/images/"
      build.onResolve({ filter: /^@apollo-elements\// }, args => {
        const resolved = `${args.path.replace('@apollo-elements', `${basePath}/packages`)}.ts`;
        return { path: resolved };
      });
    },
  };

  esbuild.build({
    entryPoints: ['packages/components/index.ts'],
    bundle: true,
    minify: true,
    outfile: 'docs/_assets/_static/apollo-elements.js',
    sourcemap: true,
    target: 'es2020',
    plugins: [resolve],
  }).catch(() => {
    process.exit(1);
  });

  esbuild.build({
    external: ['https://*'],
    entryPoints: ['packages/docs/docs-playground.ts'],
    bundle: true,
    minify: true,
    outfile: 'docs/_assets/_static/docs-playground.js',
    sourcemap: true,
    target: 'es2020',
  }).catch(() => {
    process.exit(1);
  });
}
