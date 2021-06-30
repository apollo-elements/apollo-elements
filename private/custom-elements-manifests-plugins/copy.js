import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

function readJSONSync(path) {
  const url = new URL(path, import.meta.url);
  const content = fs.readFileSync(url.toString().replace('file://', ''), 'utf-8');
  return JSON.parse(content);
}

const NS_PER_SEC = 1e9;

/**
 * @param  {string} configUrl path to custom-elements-manifest.config.js
 * @return {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function copyPlugin(configUrl) {
  return {
    name: 'copy-manifests-to-rocket-data',
    packageLinkPhase() {
      const time = process.hrtime();

      const pkgDirPath = path.dirname(new URL(configUrl).pathname);
      const manifestPath = path.join(pkgDirPath, 'custom-elements.json');
      const pkgJsonPath = path.join(pkgDirPath, 'package.json');

      const { name } = readJSONSync(pkgJsonPath);

      // TODO: get package root here.
      const { pathname: to } = new URL(`../../docs/_data/customElementsManifests/${name}/`, import.meta.url);

      console.log(to);

      fs.mkdirSync(to, { recursive: true });

      fs.copyFileSync(pkgJsonPath, path.join(to, 'package.json'));
      fs.copyFileSync(manifestPath, path.join(to, 'custom-elements.json'));

      const [s, ns] = process.hrtime(time);
      const durationNs = s * NS_PER_SEC + ns;
      console.log(chalk.green`Copied manifest and package for ${chalk.bold(name)} in ${durationNs / NS_PER_SEC}s`);
    },
  };
}
