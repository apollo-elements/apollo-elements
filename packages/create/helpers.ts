import type { Plugin } from '@web/dev-server-core';

interface Options {
  ts?: boolean
}

export function resolveCodegenPlugin({ ts }: Options = {}): Plugin {
  const extension = ts ? 'ts' : 'js';
  return {
    name: 'resolve-graphql-codegen-in-place',
    resolveImport({ source }) {
      if (source.match(/(mutation|query|subscription|fragment)\.graphql/))
        return `${source}.${extension}`;
    },
  };
}
