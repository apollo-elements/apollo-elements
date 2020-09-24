import { capital, pascal } from 'case';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

import { codegen } from './codegen';
import type { ComponentOptions } from '.';
import { processTemplate, readFile, writeFile } from './files';

const cwd = process.cwd();

async function writeComponent(options: ComponentOptions) {
  const { name, subdir = '' } = options;
  const UNPREFIXED = name.split('-').slice(1).join('-');
  const CLASS_NAME = pascal(UNPREFIXED);

  const _componentDir = path.join('src', 'components', subdir ?? '', UNPREFIXED);
  const COMPONENT_DIR = path.join(cwd, _componentDir);
  const TEMPLATE_DIR = path.join(__dirname, 'template/component');

  console.log(`\nCreating ${name} in ${_componentDir}\n`);

  await mkdirp(COMPONENT_DIR);

  const interpolations = {
    UNPREFIXED,
    CLASS_NAME,
    TAG_NAME: name,
    OPERATION_NAME: `${CLASS_NAME}${capital(options.type)}`,
    OPERATION_FILE_NAME: `${CLASS_NAME}.${options.type}.graphql`,
    OPERATION_TYPE: options.type,
    BASE_CLASS: `Apollo${capital(options.type)}`,
    SCHEMA_PATH: path.relative(COMPONENT_DIR, path.join(cwd, 'src', 'schema')),
    SHARED_CSS_PATH:
      path.relative(COMPONENT_DIR, path.join(cwd, 'src', 'components', 'shared.css')),
  };

  const FILE_BASENAMES = {
    component: `${UNPREFIXED}.ts`,
    style: `${UNPREFIXED}.css`,
    query: interpolations.OPERATION_FILE_NAME,
    index: 'index.ts',
  };

  const TEMPLATE_BASENAMES = {
    component: '_component.ts',
    style: '_style.css',
    query: '_operation.graphql',
    index: 'index.ts',
  };

  async function write(key: keyof typeof FILE_BASENAMES) {
    const template = await readFile(path.join(TEMPLATE_DIR, TEMPLATE_BASENAMES[key]), 'utf8');
    const filePath = path.join(COMPONENT_DIR, FILE_BASENAMES[key]);
    const output = processTemplate(template, interpolations);
    console.log(`Writing ${path.relative(cwd, filePath)}`);
    await writeFile(filePath, output, 'utf8');
  }

  for (const key of Object.keys(FILE_BASENAMES))
    await write(key as keyof typeof FILE_BASENAMES);

  console.log('\nDone!');
}

/**
 * Generate an Apollo Element
 */
export async function component(options: ComponentOptions): Promise<void> {
  try {
    fs.statSync(path.join(cwd, 'package.json'));
  } catch (error) {
    return console.log('‼️ No package.json found.', '👉 Scaffold an app first');
  }

  await writeComponent(options);

  await codegen(options);
}
