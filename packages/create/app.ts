import * as NCP from 'ncp';

import { promisify } from 'util';

import fs from 'fs';
import path from 'path';
import execa from 'execa';

import { codegen } from './codegen';
import type { AppOptions } from '.';

const cwd = process.cwd();

const ncp = promisify(NCP.ncp);

const rename = promisify(fs.rename);

/**
 * Copy the file structure from `template`, and rename the `__gitignore` file
 */
async function initFiles() {
  console.log('\nScaffolding App Files...\n');
  const templatePath = path.resolve(__dirname, 'template/app');
  await ncp(templatePath, cwd);
  await rename(path.join(cwd, '__gitignore'), path.join(cwd, '.gitignore'));
}

/**
 * Run the `init` command, passing flags
 */
async function initPackage(options: AppOptions) {
  await execa(
    options.pkgManager,
    ['init', ...(options.yes ? ['--yes'] : [])],
    { stdio: 'inherit' }
  );
}

async function execInstall(options: AppOptions) {
  if (!options.install) return;
  console.log('Installing dependencies...\n');
  await execa(
    options.pkgManager,
    ['install'],
    { stdio: 'inherit' }
  );
}

/**
 * Prompt the user to launch the dev server
 */
async function execStart(options: AppOptions) {
  if (!options.start)
    console.log('Launch aborted\n');
  else {
    console.log('🚀 Prepare for Takeoff...\n');
    return execa(
      options.pkgManager,
      ['start'],
      { stdio: 'inherit' }
    );
  }
}

/**
 * Generate an Apollo Elements App
 */
export async function app(options: AppOptions): Promise<void> {
  await initFiles();
  await initPackage(options);
  await execInstall(options);
  if (options.install)
    await codegen(options);
  await execStart(options);
}
