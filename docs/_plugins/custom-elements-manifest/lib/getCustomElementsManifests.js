import chalk from 'chalk';
import hirestime from 'hirestime';

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import { getModule } from './manifests.js';


/** @typedef {import('custom-elements-manifest/schema').Package} Package */
/** @typedef {import('custom-elements-manifest/schema').Module} Module */
/** @typedef {import('package-json-types')} PackageJson */

/**
 * @typedef {object} Options
 * @property {string} root
 * @property {string} [package]
 * @property {string} [packages="packages/*\/package.json"]
 */

class CEM {
  /** @type {Package} */ manifest;

  /** @type {PackageJson} */ package;

  constructor(args) {
    this.manifest = args.manifest;
    this.package = args.package;
  }

  getDeclarationsForModule(module) {
    return this.manifest.modules.find(x => x.path === module).declarations
  }

  getExportsForModule(module) {
    return this.manifest.modules.find(x => x.path === module).exports
  }
}

/**
 * @param  {Options} options
 * @return  {Promise<CollatedManifests>}
 */
async function collateManifests(options) {
  console.log(chalk.yellow`[custom-elements-manifest] ${chalk.blue`Reading ${chalk.bold`custom elements manifests`}...`}`);

  // @ts-expect-error: https://github.com/seriousManual/hirestime/pull/39
  const time = hirestime.default();
  const cwd = options?.root ?? process.cwd();
  const map = new Map();

  const packages = (
      options?.package ? [options.package]
    : options?.packages
  ) ?? 'packages/*/package.json';

  const packageJsonPaths = await glob(packages, { cwd });

  for (const path of packageJsonPaths) {
    try {
      const packagePath = join(cwd, path);
      const pkgJson = JSON.parse(await readFile(packagePath, 'utf8').catch(() => '{}'));
      const { name, customElements } = pkgJson;

      if (!name)
        throw new Error(`Invalid package.json at ${packagePath}`);
      if (!customElements)
        continue;

      const manifestPath = join(dirname(packagePath), customElements);
      const manifest = JSON.parse(await readFile(manifestPath, 'utf-8').catch(() => '{}'));

      map.set(name, new CEM({ manifest, package: pkgJson }));
    } catch {
      throw new Error(`Could not read manifest from ${path}`);
    }
  }

  console.log(chalk.yellow`[custom-elements-manifest] ${chalk.green`Done in ${time.seconds()}s`}`);
  return map;
}

let cached;

/**
 * @param  {Options} options
 * @return {Promise<Map<string, CEM>>}         [description]
 */
export async function getCustomElementsManifests(options) {
  cached ??= await collateManifests(options);
  return cached;
    // const _manifest = manifests?.[data.package]?.manifest;
    // /** @type{Package} */
    // const manifest = typeof _manifest === 'string' ? JSON.parse(_manifest) : _manifest;
    // const packageJson = manifests?.[data.package]?.package;
    // const cem = {
    //   manifest,
    //   packageJson,
    //   module: getModule(manifest, data.module),
    //   modules: (data?.modules ?? []).map(m => getModule(manifest, m)),
    //   index: getModule(manifest, 'index.js'),
    // };
    // return cem;
}
