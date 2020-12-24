/* eslint-env node */
/* eslint-disable no-console, easy-loops/easy-loops */

import globby from 'globby';

import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmdirSync, writeFileSync } from 'fs';

import { dirname, relative } from 'path';

import R from 'ramda';

const { mapObjIndexed } = R;

/** @typedef {import('custom-elements-manifest/schema')} CEM */

function getManifestPath(name) {
  switch (name) {
    case 'lit':
      name = 'lit-apollo';
  }
  const { pathname } = new URL(`../packages/${name}/custom-elements-manifest.json`, import.meta.url);
  return pathname;
}

const typeTablesDirURL = new URL('../docs/api/types/', import.meta.url);

function projectPath(pathname) {
  return relative(new URL(import.meta.url).pathname, pathname)
    .replace('../../', '');
}

function readJSONSync(path) {
  const url = new URL(path, import.meta.url);
  const content = readFileSync(url.toString().replace('file://', ''), 'utf-8');
  return JSON.parse(content);
}

/**
 * For any return or parameter type found in the manifest,
 * if it has an associated Markdown file in docs/api/types/,
 * replace the `description` field with the markdown file's contents.
 * @param  {object} table object map of typename to markdown description
 */
function replaceDescriptionUsingTables(table) {
  /**
   * @param  {CEM.Descriptor} member
   * @return {CEM.Descriptor}
   */
  return function(member) {
    const typeNames = Object.keys(table);
    // /^(Partial<|Promise<)?(a|b|c)/;
    const [, , foundMemberTypeName] = member.type?.type.match(new RegExp(`^(Partial<|Promise<)?(${typeNames.join('|')})`)) ?? [];
    if (!foundMemberTypeName)
      return member;
    else {
      console.log(`Replacing description for ${foundMemberTypeName}`);
      const description = table[foundMemberTypeName];
      return {
        ...member,
        description,
      };
    }
  };
}

function overwriteDescriptions(pathname) {
  const manifest = readJSONSync(pathname);
  const typeTables =
    Object.fromEntries(readdirSync(typeTablesDirURL.pathname)
      .map(filename => [
        filename.replace('.md', ''),
        readFileSync(new URL(`./${filename}`, typeTablesDirURL).pathname, 'utf8'),
      ]));

  const replaceDescriptionWithMarkdownTable = replaceDescriptionUsingTables(typeTables);

  const processClassMember = (value, key) => {
    switch (key) {
      case 'return':
        return replaceDescriptionWithMarkdownTable(value);
      case 'parameters':
        return value.map(replaceDescriptionWithMarkdownTable);
      default:
        return value;
    }
  };

  const modules = manifest.modules.map(mod => ({
    ...mod,
    declarations: mod.declarations?.map?.(function(declaration) {
      switch (declaration.kind) {
        case 'function':
          return mapObjIndexed(processClassMember, declaration);
        case 'class':
          return {
            ...declaration,
            members: declaration.members?.map?.(mapObjIndexed(processClassMember)),
          };
        default: return declaration;
      }
    }),
  }));

  const content = JSON.stringify({ ...manifest, modules }, null, 2);

  writeFileSync(pathname, content, 'utf8');
}

export function writeParameterAndReturnDescriptions() {
  overwriteDescriptions(getManifestPath('interfaces'));
  overwriteDescriptions(getManifestPath('hybrids'));
  overwriteDescriptions(getManifestPath('haunted'));
}

function capitalize(str) {
  return (str.charAt(0).toUpperCase() + str.slice(1));
}

/**
 * Transform the Interfaces manifest for the Polymer package
 * @param  {import('custom-elements-manifest/schema').Package} base interfaces manifest
 * @return {import('custom-elements-manifest/schema').Package}
 */
function transformPolymerManifest(base) {
  return {
    ...base,
    modules: base.modules.map(({ kind, path, declarations, exports }) => ({
      kind,
      path,
      declarations: declarations.map(({
        kind,
        name,
        superclass,
        members,
        events,
        ...declaration
      }) => ({
        kind,
        name: `Polymer${name}`,
        superclass,
        members,
        events: [
          ...events,
          /* eslint-disable max-len */
          { name: 'data-changed', description: 'Notifies that `data` changed', type: { type: 'PolymerChangeEvent<Data<D>>' } },
          { name: 'variables-changed', description: 'Notifies that `variables` changed', type: { type: 'PolymerChangeEvent<Variables<D, V>>' } },
          { name: 'error-changed', description: 'Notifies that `error` changed', type: { type: 'PolymerChangeEvent<Error|ApolloError>' } },
          { name: 'errors-changed', description: 'Notifies that `errors` changed', type: { type: 'PolymerChangeEvent<readonly GraphQLError[]>' } },
          { name: 'loading-changed', description: 'Notifies that `loading` changed', type: { type: 'PolymerChangeEvent<boolean>' } },
          ...(
              path.includes('query') ? [{ name: 'network-status-changed', description: 'Notifies that `networkStatus` changed', type: { type: 'PolymerChangeEvent<NetworkStatus>' } }]
            : path.includes('mutation') ? [{ name: 'called-changed', description: 'Notifies that `called` changed', type: { type: 'PolymerChangeEvent<boolean>' } }]
            : path.includes('subscription') ? []
            : []
          ),
          /* eslint-enable max-len */
        ],
        ...declaration,
      })),
      exports: [
        ...exports.map(({ kind, name, declaration }) => ({
          kind,
          name: `Polymer${name}`,
          declaration,
        })),
        ...path.includes('apollo-') ? [polymerElementDefinition(path)] // define element if it's a single-export
        : exports.map(({ declaration: { module: path } }) => { // pack in all element definitions for the index
          const module = path.replace('.ts', '.js');
          const { kind, name, declaration } = polymerElementDefinition(module);
          return {
            kind,
            name,
            declaration: {
              ...declaration,
              module,
            },
          };
        }),
      ],
    })),
  };
}

/**
 * @param  {import('custom-elements-manifest/schema').Package} base interfaces manifest
 * @return {import('custom-elements-manifest/schema').Package}
 */
function transformMixinsManifest(base) {
  /* eslint-disable max-len */
  const PATH_RE = /apollo-(\w+)/;
  return {
    ...base,
    modules: [
      ...base.modules.map(({ kind, path, declarations, exports }) => ({
        kind,
        path: path.replace(PATH_RE, 'apollo-$1-mixin'),
        declarations:
          declarations.map(({
            kind,
            name,
            superclass,
            members,
            events,
            ...declaration
          }) => ({
            kind: 'mixin',
            name: `${name}Mixin`,
            superclass,
            members,
            events,
            parameters: [{
              name: 'superclass',
              type: {
                type: 'Constructor<CustomElement>',
              },
            }],
            return: {
              type: {
                type: `Constructor<${name}>`,
              },
            },
            ...declaration,
          })),
        exports:
          exports.map(exp => {
            const { kind } = exp;
            const module = exp.declaration.module && exp.declaration.module.replace(PATH_RE, `apollo-$1-mixin`);
            const name = `${exp.name}Mixin`;
            const { name: _, module: __, ...rest } = exp.declaration;
            const declaration = { name, module, ...rest };
            return { kind, name, declaration };
          }),
      })),

      {
        kind: 'javascript-module',
        path: './apollo-client-mixin.js',
        declarations: [
          {
            kind: 'mixin',
            name: 'ApolloClientMixin',
            description: 'Mixin which applies a specific ApolloClient instance to the element.',
            members: [
              {
                kind: 'field',
                name: 'client',
                description: 'The specified client',
                type: {
                  type: 'ApolloClient<NormalizedCacheObject>',
                },
              },
            ],
            parameters: [
              {
                name: 'superclass',
                type: {
                  type: 'Constructor<ApolloElement>',
                },
              },
              {
                name: 'client',
                description: 'The specific ApolloClient instance.',
                type: {
                  type: 'ApolloClient<NormalizedCacheObject>',
                },
              },
            ],
            return: {
              type: {
                type: `Constructor<ApolloElement>`,
              },
            },
          },
        ],
        exports: [
          {
            kind: 'js',
            name: 'ApolloClientMixin',
            declaration: {
              name: 'ApolloClientMixin',
            },
          },
        ],
      },

      {
        kind: 'javascript-module',
        path: './validate-variables-mixin.js',
        declarations: [
          {
            kind: 'mixin',
            name: 'ValidateVariablesMixin',
            description: `Mixin which prevents operations from fetching until their required variables are set.`,
            parameters: [
              {
                name: 'superclass',
                type: {
                  type: 'Constructor<ApolloElement>',
                },
              },
            ],
            return: {
              type: {
                type: `Constructor<ApolloElement>`,
              },
            },
          },
        ],
        exports: [
          {
            kind: 'js',
            name: 'ValidateVariablesMixin',
            declaration: {
              name: 'ValidateVariablesMixin',
            },
          },
        ],
      },

      {
        kind: 'javascript-module',
        path: './type-policies-mixin.js',
        declarations: [
          {
            kind: 'mixin',
            name: 'TypePoliciesMixin',
            description: 'Mixin which adds type policies to the Apollo cache.',
            members: [
              {
                kind: 'field',
                name: 'typePolicies',
                description: 'Type Policies added to the cache when the element connects.',
                type: {
                  type: 'TypePolicies',
                },
              },
            ],
            parameters: [
              {
                name: 'superclass',
                type: {
                  type: 'Constructor<ApolloElement>',
                },
              },
            ],
            return: {
              type: {
                type: `Constructor<ApolloElement & { typePolicies: TypePolicies }>`,
              },
            },
          },
        ],
        exports: [
          {
            kind: 'js',
            name: 'TypePoliciesMixin',
            declaration: {
              name: 'TypePoliciesMixin',
            },
          },
        ],
      },

    ],
  };
  /* eslint-enable max-len */
}

/**
 * @param  {import('custom-elements-manifest/schema').Package} manifest pre-transform manifest
 * @param  {'components'|'fast'|'gluon'|'haunted'|'hybrids'|'interfaces'|'lib'|'lit-apollo'|'mixins'|'polymer'} pkg
 * @return {import('custom-elements-manifest/schema').Package}
 */
function interfacesToPackage(manifest, pkg) {
  const base = {
    ...manifest,
    modules: manifest.modules.map(({ kind, path, declarations, exports }) => ({
      kind,
      path: path.replace('.ts', '.js'),
      declarations: declarations.map(({
        kind,
        name,
        superclass,
        members,
        ...declaration
      }) => ({
        kind,
        name: name.replace('Interface', ''),
        ...superclass && { superclass: {
          ...superclass,
          package: '@apollo-elements/interfaces',
        } },
        members: members.map(({ ...member }) => ({
          ...member,
          inheritedFrom: member.inheritedFrom ?? {
            name: `Apollo${(
                   path.includes('query') ? 'Query'
                 : path.includes('subscription') ? 'Subscription'
                 : path.includes('mutation') ? 'Mutation'
                 : 'Element'
            )}Interface`,
            package: '@apollo-elements/interfaces',
            module: path,
          },
        })),
        ...declaration,
      })),
      exports: [
        ...exports.map(({ kind, name, declaration }) => ({
          kind,
          name: name.replace('Interface', ''),
          declaration: {
            ...declaration,
            name: declaration.name.replace('Interface', ''),
            module: declaration.module?.replace?.('.ts', '.js'),
          },
        })),
      ],
    })),
  };

  switch (pkg) {
    case 'polymer': return transformPolymerManifest(base);
    case 'mixins': return transformMixinsManifest(base);
    default: return base;
  }
}

function polymerElementDefinition(path) {
  const name = path.replace(/^\.\/(\w+-\w+)\.(js|ts)$/, '$1');
  const className = `PolymerApollo${capitalize(name.replace('apollo-', ''))}`;
  const filepath = `./${className}.description.md`;
  const { pathname } = new URL(filepath, import.meta.url);
  const description = readFileSync(pathname, 'utf8');
  return {
    kind: 'custom-element-definition',
    name,
    description,
    declaration: {
      name: className,
    },
  };
}

export function generateManifestsFromInterfaces() {
  const interfacesManifest = readJSONSync(getManifestPath('interfaces'));

  for (const pkg of ['lit', 'fast', 'gluon', 'polymer', 'mixins']) { // eslint-disable-line easy-loops/easy-loops
    const pathname = getManifestPath(pkg);
    const content = JSON.stringify(interfacesToPackage(interfacesManifest, pkg), null, 2);
    writeFileSync(pathname, content, 'utf-8');
    console.log('Generated', projectPath(pathname));
  }
}

export function copyCustomElementManifests() {
  const pkgJson = readJSONSync('../package.json');
  const packageJsons = globby.sync(pkgJson.workspaces.map(w => `${w}/package.json`));
  const manifests = Promise.all(packageJsons.map(async function getJson(ppath) {
    let from;
    let to;

    try {
      const pkgJsonUrl = new URL(`../${ppath}`, import.meta.url);
      const cemUrl = new URL('./custom-elements-manifest.json', pkgJsonUrl);
      const { name } = readJSONSync(`../${ppath}`);

      ({ pathname: from } = new URL(cemUrl, new URL('../', import.meta.url)));
      ({ pathname: to } = new URL(`../docs/_data/cems/${name}/custom-elements-manifest.json`, import.meta.url));

      mkdirSync(dirname(to), { recursive: true });

      const manifestContent = readFileSync(from, 'utf8');
      writeFileSync(to, manifestContent, 'utf8');

      copyFileSync(pkgJsonUrl.pathname, new URL(`../docs/_data/cems/${name}/package.json`, import.meta.url).pathname);

      console.log('Custom Elements Manifest written to', projectPath(to));

      return { from, to };
    } catch (e) {
      rmdirSync(dirname(to), { recursive: true });
      return null;
    }
  }));

  return manifests;
}

export function generateManifests() {
  writeParameterAndReturnDescriptions();
  generateManifestsFromInterfaces();
  copyCustomElementManifests();
}
