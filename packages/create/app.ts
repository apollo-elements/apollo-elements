import type { AppOptions } from './options';

import NCP from 'ncp';

import { promisify } from 'util';

import path from 'path';
import execa from 'execa';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

import { codegen } from './codegen.js';
import { readFile, processTemplate, writeFile } from './files.js';

import Chalk from 'chalk';
const { cyan, greenBright } = Chalk;

const ncp = promisify(NCP.ncp);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Copy the file structure from `template`, and rename the `__gitignore` file
 */
async function initFiles(options: AppOptions) {
  if (!options.silent)
    console.log(`\n${cyan('Scaffolding App Files')}...\n`);
  const templatePath = path.resolve(__dirname, 'template', 'app');
  await ncp(templatePath, options.directory);
  await fs.rename(
    path.join(options.directory, '__gitignore'),
    path.join(options.directory, '.gitignore')
  );

  const GRAPHQL_URI = options.uri;

  const interpolations = {
    GRAPHQL_URI,
  };

  const FILE_NAMES = {
    rc: '.graphqlrc.yml',
    client: path.join('src', 'client.ts'),
  };

  async function write(key: keyof typeof FILE_NAMES) {
    const filePath = path.join(options.directory, FILE_NAMES[key]);
    const template = await readFile(filePath, 'utf8');
    const output = processTemplate(template, interpolations);
    await writeFile(filePath, output, 'utf8');
  }

  for (const key of Object.keys(FILE_NAMES))
    await write(key as keyof typeof FILE_NAMES);

  if (!options.silent)
    console.log(greenBright('\nDone!'));
}

/**
 * Run the `init` command, passing flags
 */
async function initPackage(options: AppOptions) {
  await execa(
    options.pkgManager,
    ['init', ...(options.packageDefaults ? ['--yes', '--quiet'] : [])],
    { stderr: 'inherit' }
  );
}

async function execInstall(options: AppOptions) {
  if (!options.install) return;
  if (!options.silent)
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
  if (!options.start) {
    if (!options.silent) console.log('Launch aborted\n');
  } else {
    if (!options.silent) console.log('🚀 Prepare for Takeoff...\n');
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
  if (!options) return; // ctrl-c
  options.directory = path.normalize(options.directory);
  await initFiles(options);
  await initPackage(options);
  await execInstall(options);
  if (options.install)
    await codegen(options);
  try {
    await execStart(options);
  } catch (e) {
    await writeFile(path.join(options.directory, 'start-error.log'), e.stderr, 'utf-8');
    if (!options.silent) {
      console.log(
        'Something went wrong starting the app.\n',
        'An error log was written to start-error.log\n',
        'Please try running npm start again\n',
        'if the error persists, please file an issue with the log file at\n',
        '\thttps://github.com/apollo-elements/apollo-elements/issues/new?assignees=&labels=bug&template=bug_report.md&title=Apollo+Elements+Bug',
      );
    }
  }
}
