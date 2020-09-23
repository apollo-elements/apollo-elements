#!/usr/bin/env node

/* eslint-env node */
/* eslint-disable no-console */
import { install, SupportedPackageManagers } from 'pkg-install';

import * as NCP from 'ncp';

import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

import execa from 'execa';
import { promisify } from 'util';

import BANNER from './banner';

const cwd = process.cwd();

const ncp = promisify(NCP.ncp);
const rename = promisify(fs.rename);
const writeFile = promisify(fs.writeFile);

const PACKAGES = [
  '@apollo/client',
  '@apollo-elements/lit-apollo',
  '@apollo-elements/mixins',
  'pwa-helpers',
];

const DEV_PACKAGES = [
  '@apollo-elements/rollup-plugin-graphql',
  '@graphql-codegen/cli',
  '@graphql-codegen/typescript-operations',
  '@graphql-codegen/typescript',
  '@open-wc/rollup-plugin-html',
  '@pwrs/eslint-config',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-node-resolve',
  '@web/dev-server-esbuild',
  '@web/dev-server-rollup',
  '@web/dev-server',
  'npm-run-all',
  'rollup-plugin-esbuild',
  'rollup-plugin-lit-css',
  'rollup',
  'typescript',
];

async function initFiles() {
  const templatePath = path.resolve(__dirname, 'template');
  await ncp(templatePath, cwd);
  await rename(path.join(cwd, '__gitignore'), path.join(cwd, '.gitignore'));
}

function initPackage(pkgManager: SupportedPackageManagers) {
  const args = process.argv
    .slice(2)
    .filter(arg => arg.startsWith('-'));

  return execa(pkgManager, ['init', ...args], { stdio: 'inherit' });
}

async function addScripts() {
  const pkgPath = path.join(cwd, 'package.json');

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkgJSON = require(pkgPath);

  const scripts = {
    ...pkgJSON.scripts,
    'start': 'run-p start:*',
    'start:codegen': 'graphql-codegen --watch',
    'start:serve': 'wds --watch',
    'lint': 'eslint',
    'build': 'rollup -c',
    'test': 'echo "Error: no test specified" && exit 1',
  };

  await writeFile(pkgPath, JSON.stringify({ ...pkgJSON, scripts }, null, 2));
}

async function codegen() {
  return execa('npx', ['graphql-codegen'], { stdio: 'inherit' });
}

async function promptStart() {
  const { confirmed } = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: 'Your app is ready. Launch?',
  });
  return confirmed;
}

async function start(pkgManager: SupportedPackageManagers, shouldStart: boolean) {
  if (!shouldStart)
    console.log('Launch aborted');
  else {
    console.log('🚀 Prepare for Takeoff...');
    return execa(pkgManager, ['start'], { stdio: 'inherit' });
  }
}

const pkgManager: SupportedPackageManagers =
    process.argv0 === 'npm' ? process.argv0
  : process.argv0 === 'yarn' ? process.argv0
  : 'npm';

Promise.resolve()
  .then(() => console.log(BANNER))
  .then(() => initPackage(pkgManager))
  .then(() => console.log('\nInstalling Packages...\n'))
  .then(() => install(PACKAGES, { stdio: 'inherit' }))
  .then(() => console.log('\nInstalling Dev Dependencies...\n'))
  .then(() => install(DEV_PACKAGES, { dev: true, stdio: 'inherit' }))
  .then(() => console.log('\nScaffolding App Files...\n'))
  .then(() => initFiles())
  .then(() => addScripts())
  .then(() => console.log('\nGenerating TypeScript Schema...\n'))
  .then(() => codegen())
  .then(() => promptStart())
  .then(should => start(pkgManager, should))
  .catch(console.error);
