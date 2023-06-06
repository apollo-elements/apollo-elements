import chalk from 'chalk';
import hirestime from 'hirestime';

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { getModule } from './manifests.js';


/** @typedef {import('custom-elements-manifest/schema').Package} Package */
/** @typedef {import('custom-elements-manifest/schema').Module} Module */
/** @typedef {import('package-json-types')} PackageJson */
/** @typedef {{ manifest: Package; package: PackageJson }} ManifestRecord */
/** @typedef {Record<string, ManifestRecord>} CollatedManifests */

/** @typedef {{ manifest: Package; packageJson: PackageJson; module: Module; index: Module; modules: Module[] }} ManifestAndPackageRecord */

/**
 * @typedef {object} Options
 * @property {string} root
 * @property {string} [package]
 * @property {string} [packages="packages/*\/package.json"]
 */

/**
 * @param  {object} options
 * @param  {string} options.cwd
 * @param  {string} options.path
 * @return {Promise<CollatedManifests>}
 */
async function getPackage({ cwd, path }) {
  try {
    const packagePath = join(cwd, path);
    const pkgJson = JSON.parse(await readFile(packagePath, 'utf8').catch(() => '{}'));
    const { name, customElements } = pkgJson;

    if (!name)
      throw new Error(`Invalid package.json at ${packagePath}`);
    if (!customElements)
      return {};

    const manifestPath = join(dirname(packagePath), customElements);
    const manifest = await readFile(manifestPath, 'utf-8').catch(() => void 0);

    return { [name]: { manifest, package: pkgJson } };
  } catch {
    throw new Error(`Could not read manifest from ${path}`);
  }
}

let cached;

/**
 * @param  {Options} options
 * @return  {Promise<CollatedManifests>}
 */
async function collateManifests(options) {
  if (cached)
    return cached;

  console.log(chalk.yellow`[custom-elements-manifest] ${chalk.blue`Reading ${chalk.bold`custom elements manifests`}...`}`);

  // @ts-expect-error: https://github.com/seriousManual/hirestime/pull/39
  const time = hirestime.default();
  const cwd =
      options?.root ? options.root
    : join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

  const packages = (
      options?.package ? [options.package]
    : options?.packages
  ) ?? 'packages/*/package.json';

  cached = globby(packages, { cwd }).then(packageJsons => packageJsons.reduce(async (acc, path) =>
    Object.assign(
      await acc,
      await getPackage({ path, cwd })
    ), Promise.resolve({}))
  );

  await cached;

  console.log(chalk.yellow`[custom-elements-manifest] ${chalk.green`Done in ${time.seconds()}s`}`);

  return cached;
}
/**
 * @param  {Options} options
 * @return {(data: { package: string; module: string; modules: string[]; }) => Promise<ManifestAndPackageRecord>}         [description]
 */
export function getCustomElementsManifests(options) {
  return async data => {
    const manifests = await collateManifests(options);
    const _manifest = manifests?.[data.package]?.manifest;
    /** @type{Package} */
    const manifest = typeof _manifest === 'string' ? JSON.parse(_manifest) : _manifest;
    const packageJson = manifests?.[data.package]?.package;
    const cem = {
      manifest,
      packageJson,
      module: getModule(manifest, data.module),
      modules: (data?.modules ?? []).map(m => getModule(manifest, m)),
      index: getModule(manifest, 'index.js'),
    };
    return cem;
  };
}
