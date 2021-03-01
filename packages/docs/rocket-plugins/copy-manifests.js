// @ts-check
/* eslint-env node */
/* eslint-disable no-console, easy-loops/easy-loops */

/** @typedef {import('custom-elements-manifest/schema')} CEM */

import chalk from 'chalk';

import globby from 'globby';

import R from 'ramda';

import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmdirSync, writeFileSync } from 'fs';

import { dirname, relative } from 'path';

const { mapObjIndexed } = R;

function getManifestPath(name) {
  switch (name) {
    case 'lit':
      name = 'lit-apollo';
  }
  const { pathname } = new URL(`../../../packages/${name}/custom-elements-manifest.json`, import.meta.url);
  return pathname;
}

const typeTablesDirURL = new URL('../../../docs/api/types/', import.meta.url);

function projectPath(pathname) {
  return relative(new URL(import.meta.url).pathname, pathname)
    .replace('../../../', '');
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
 * @param  {object} mod custom element manifest module
 */
function replaceDescriptionUsingTables(table, mod) {
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
      console.log(chalk.blue`\tReplacing description for ${chalk.bold(foundMemberTypeName)}`);
      const typeDescription = table[foundMemberTypeName];

      const description = (
          !mod.path.match(/apollo-subscription\.[jt]s/) ? typeDescription
        : typeDescription.replace(/query/g, 'subscription')
      );

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

  const replaceDescriptionWithMarkdownTable = mod => replaceDescriptionUsingTables(typeTables, mod);

  const processClassMember = mod => (value, key) => {
    switch (key) {
      case 'return':
        return replaceDescriptionWithMarkdownTable(mod)(value);
      case 'parameters':
        return value.map(replaceDescriptionWithMarkdownTable(mod));
      default:
        return value;
    }
  };

  const modules = manifest.modules.map(mod => ({
    ...mod,
    declarations: mod.declarations?.map?.(function(declaration) {
      switch (declaration.kind) {
        case 'function':
          return mapObjIndexed(processClassMember(mod), declaration);
        case 'class':
          return {
            ...declaration,
            members: declaration.members?.map?.(mapObjIndexed(processClassMember(mod))),
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

/**
 * Transform the Interfaces manifest for the Polymer package
 * @param  {import('custom-elements-manifest/schema').Package} base interfaces manifest
 * @return {import('custom-elements-manifest/schema').Package}
 */
function transformPolymerManifest(base) {
  const polymerChangedEventsJson = readJSONSync('../polymer-changed-events.json');
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
          ...polymerChangedEventsJson,
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
  const mixinsJson = readJSONSync('../mixins.json');
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
      ...mixinsJson
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

const isMutationModule = module => module.path.includes('apollo-mutation');

const isClassDeclaration = declaration => declaration.kind === 'class';

function interfacesToComponentsPackage(manifest, interfacesManifest) {
  const mutationInterfaceMembers =
    interfacesManifest
      .modules
      .find(isMutationModule)
      .declarations
      .find(isClassDeclaration)
      .members;

  return {
    ...manifest,
    modules: manifest.modules.map(module =>
      !isMutationModule(module) ? module : ({
      ...module,
      declarations: module.declarations.map(declaration => !isClassDeclaration(declaration) ? declaration : ({
        ...declaration,
        members: [
          ...declaration.members,
          ...mutationInterfaceMembers
            .map(m => ({
              ...m,
              inheritedFrom: m.inheritedFrom ?? {
                "name": "ApolloMutation",
                "package": "@apollo-elements/lit-apollo",
                "module": "./apollo-mutation.js"
              },
            })),
        ],
      })),
    })),
  }
}

function writeTransformedManifest(pathname, data) {
  const content = JSON.stringify(data, null, 2);
  writeFileSync(pathname, content, 'utf-8');
  console.log(chalk.blue`\tGenerated`, chalk.bold(projectPath(pathname)));
}

export function generateManifestsFromInterfaces() {
  const interfacesManifest = readJSONSync(getManifestPath('interfaces'));

  for (const pkg of ['lit', 'fast', 'gluon', 'polymer', 'mixins'])
    writeTransformedManifest(getManifestPath(pkg), interfacesToPackage(interfacesManifest, pkg))

  const componentsBase = readJSONSync(new URL('../components-manifest.json', import.meta.url).pathname);

  writeTransformedManifest(
    getManifestPath('components'),
    interfacesToComponentsPackage(componentsBase, interfacesManifest),
  );
}

export function copyCustomElementManifests() {
  const pkgJson = readJSONSync('../../../package.json');
  const packageJsons = globby.sync(pkgJson.workspaces.map(w => `${w}/package.json`));
  const manifests = Promise.all(packageJsons.map(async function getJson(ppath) {
    let from;
    let to;

    try {
      const pkgJsonUrl = new URL(`../../../${ppath}`, import.meta.url);
      const cemUrl = new URL('./custom-elements-manifest.json', pkgJsonUrl);
      const { name } = readJSONSync(`../../../${ppath}`);

      ({ pathname: from } = new URL(cemUrl.pathname, new URL('../', import.meta.url)));
      ({ pathname: to } = new URL(`../../../docs/_data/cems/${name}/custom-elements-manifest.json`, import.meta.url));

      mkdirSync(dirname(to), { recursive: true });

      const manifestContent = readFileSync(from, 'utf8');
      writeFileSync(to, manifestContent, 'utf8');

      copyFileSync(pkgJsonUrl.pathname, new URL(`../../../docs/_data/cems/${name}/package.json`, import.meta.url).pathname);

      console.log(chalk.blue`\tCustom Elements Manifest written to`, chalk.bold(projectPath(to)));

      return { from, to };
    } catch (e) {
      rmdirSync(dirname(to), { recursive: true });
      return null;
    }
  }));

  return manifests;
}

const NS_PER_SEC = 1e9;

/**
 * Logs the performance of a function
 * @param  {string} tag  human-readable name of the op
 * @param  {() => any} func function that does the op
 */
function logPerf(tag, func) {
  const time = process.hrtime();
  console.log(`${tag}...\n\n`);
  func();
  const [s, ns] = process.hrtime(time);
  const durationNs = s * NS_PER_SEC + ns;
  console.log(`\n\nDone in ${durationNs / NS_PER_SEC}s!\n\n`);
}

export function generateManifests() {
  logPerf('Replacing type Descriptions', writeParameterAndReturnDescriptions);
  logPerf('Generating Custom Element Manifests', generateManifestsFromInterfaces);
  logPerf('Copying Custom Element Manifests', copyCustomElementManifests);
}
