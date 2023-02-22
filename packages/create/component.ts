import type { ComponentOptions, Operation } from './options';

import Case from 'case';

import { fileURLToPath } from 'nodej:url';
import { dirname, join, relative } from 'node:path';
import { statSync } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';

import { codegen } from './codegen.js';
import { processTemplate, readFile, writeFile } from './files.js';

import Chalk from 'chalk';
import inquirer from 'inquirer';

const { green, greenBright } = Chalk;

const __dirname = dirname(fileURLToPath(import.meta.url));

type InterpolationKeys =
  | 'BASE_CLASS'
  | 'CONTROLLER_CLASS'
  | 'CLASS_NAME'
  | 'CSS_ARRAY'
  | 'CSS_IMPORT'
  | 'CSS_IMPORT'
  | 'OPERATION'
  | 'OPERATION_FILE_NAME'
  | 'OPERATION_NAME'
  | 'OPERATION_TYPE'
  | 'OPERATION_VARIABLES'
  | 'SCHEMA_PATH'
  | 'TAG_NAME'
  | 'UNPREFIXED'

type Interpolations =
  Record<InterpolationKeys, string>;

enum FileKey {
  component = 'component',
  style = 'style',
  operation = 'operation',
  index = 'index'
}

async function exists(path: string): Promise<boolean> {
  try {
    return !!(await stat(path));
  } catch {
    return false;
  }
}

const TEMPLATE_BASENAMES: Record<FileKey, string> = {
  component: '_component.ts',
  style: '_style.css',
  operation: '_operation.graphql',
  index: 'index.ts',
};

const DEFAULT_QUERY_FIELDS = `  # replace with your fields
  __schema {
    types {
      name
      kind
    }
  }`;

const DEFAULT_SUBSCRIPTION_FIELDS = DEFAULT_QUERY_FIELDS;

function memoize<T extends(...args: any[]) => unknown>(fn: T): T {
  if (!fn)
    throw new Error('Trying to memoize non-function');

  const cache = new Map<unknown, unknown>();

  const memoized =
    (function(...args) {
      const [key] = args;
      if (!cache.has(key))
        cache.set(key, fn(...args));

      return cache.get(key);
    }) as T;

  if (fn.name)
    Object.defineProperty(memoized, 'name', { value: fn.name, writable: false });

  return memoized;
}

const getBaseClass =
  memoize((options: ComponentOptions): string =>
    `Apollo${Case.capital(options.type)}`);

const getControllerClass =
  memoize((options: ComponentOptions): string =>
    `Apollo${Case.capital(options.type)}Controller`);

const getClassName =
  memoize((options: ComponentOptions): string =>
    `${getOperation(options)}Element`);

const getCssArray =
  memoize((options: ComponentOptions): string =>
    `[${getCSSImport(options) ? 'shared, ' : ''}style]` );

export const getUnprefixedTagName =
  memoize((options: ComponentOptions): string =>
    options
      .name
      .split('-')
      .slice(1)
      .join('-'));

const getOperation =
  memoize((options: ComponentOptions): string =>
    options.operationName ??
    Case.pascal(getUnprefixedTagName(options)));

const getOperationName =
  memoize((options: ComponentOptions): string =>
    getDefaultOperationNames(getOperation(options))[options.type]);

const getOperationVariables =
  memoize(function getOperationVariables(options: ComponentOptions): string {
    if (options.variables)
      return `(${options.variables})`;
    else
      return getDefaultVariables(getOperation(options))[options.type] ?? '';
  });

const getOperationArgs =
  memoize(function getOperationArgs(params: string) {
    const variables: Array<string> =
      params.match(/\$(\w+)/g) ?? [];

    const args =
      variables
        .map(x => `${x.replace('$', '')}: ${x}`)
        .join(', ');

    return args && `(${args})`;
  });

const getComponentPathFromDirectoryOption =
  memoize((options: ComponentOptions): string =>
    join('src', 'components', options.subdir ?? '', getUnprefixedTagName(options)));

const getComponentAbsPath =
  memoize((options: ComponentOptions): string =>
    join(options.directory, getComponentPathFromDirectoryOption(options)));

const getSchemaPath =
  memoize((options: ComponentOptions): string =>
    options.schemaPath ?? `./${options.operationName}.${options.type}.graphql`);

const getCSSImport =
  memoize(function getCSSImport(options: ComponentOptions): string {
    // allow users to disable shared css with ''
    if (options.sharedCssPath === '')
      return '';
    else {
      return (
        `\nimport shared from '${(
          options.sharedCssPath ??
        relative(
          getComponentAbsPath(options),
          join(options.directory, 'src', 'components', 'shared.css')
        )
        )}';`
      );
    }
  });

const getDefaultOperationNames =
  memoize((operationName: string): Record<Operation, string> =>
    ({
      mutation: `${operationName}`,
      query: operationName,
      subscription: operationName,
    }));

const getDefaultVariables =
  memoize((operationName: string): Partial<Record<Operation, string>> =>
    ({
      mutation: `($input: ${operationName}Input!)`,
    }));

const getFieldArgs =
  memoize(function getFieldArgs(options: ComponentOptions): string {
    // allow user to override fields
    if (options.fields)
      return '';
    else {
      const OPERATION_VARIABLES = getOperationVariables(options);
      return (!OPERATION_VARIABLES ? '' : getOperationArgs(OPERATION_VARIABLES));
    }
  });

const getFields =
  memoize((options: ComponentOptions): string =>
    ({
      subscription: DEFAULT_SUBSCRIPTION_FIELDS,
      query: DEFAULT_QUERY_FIELDS,
      mutation: `${Case.camel(getOperation(options))}${getFieldArgs(options)} {\n\t\tid\n\t}`,
    })[options.type]);

const getOperationFields =
  memoize((options: ComponentOptions): string =>
    options.fields ?? getFields(options));

const getOperationString =
  memoize((options: ComponentOptions): string =>
    `${options.type} ${options.operationName}${getOperationVariables(options)} {
  ${getOperationFields(options)}
}`);

export const getOperationFileName =
  memoize((options: ComponentOptions): string =>
    `${getOperation(options)}.${options.type}.graphql`);

const getInterpolations =
  memoize((options: ComponentOptions): Interpolations =>
    ({
      BASE_CLASS: getBaseClass(options),
      CONTROLLER_CLASS: getControllerClass(options),
      CLASS_NAME: getClassName(options),
      CSS_ARRAY: getCssArray(options),
      CSS_IMPORT: getCSSImport(options),
      OPERATION: options.operation ?? getOperationString(options),
      OPERATION_FILE_NAME: getOperationFileName(options),
      OPERATION_NAME: getOperationName(options),
      OPERATION_TYPE: options.type,
      OPERATION_VARIABLES: getOperationVariables(options),
      SCHEMA_PATH: getSchemaPath(options),
      TAG_NAME: options.name,
      UNPREFIXED: getUnprefixedTagName(options),
    }));

const getFileBasenames =
  memoize((options: ComponentOptions): Record<FileKey, string> =>
    ({
      component: `${getUnprefixedTagName(options)}.ts`,
      style: `${getUnprefixedTagName(options)}.css`,
      operation: getInterpolations(options).OPERATION_FILE_NAME,
      index: 'index.ts',
    }));

function getFileBasename(key: FileKey, options: ComponentOptions): string {
  return getFileBasenames(options)[key];
}

function getFilePath(key: FileKey, options: ComponentOptions): string {
  return join(getComponentAbsPath(options), getFileBasename(key, options));
}

async function shouldWriteToDir(options: ComponentOptions): Promise<boolean> {
  if (options.overwrite || !await exists(getComponentAbsPath(options)))
    return true;
  else {
    return await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      default: false,
      message: `Directory ${getComponentPathFromDirectoryOption(options)} exists. Overwrite?`,
    }]).then(({ overwrite = false }) => overwrite);
  }
}

async function getTemplate(key: FileKey): Promise<string> {
  const TEMPLATE_DIR =
    join(__dirname, 'template', 'component');

  return await readFile(join(TEMPLATE_DIR, TEMPLATE_BASENAMES[key]), 'utf8');
}

async function writeComponentFile(key: FileKey, options: ComponentOptions) {
  const PATH =
    getFilePath(key, options);

  const OUTPUT =
    processTemplate(await getTemplate(key), getInterpolations(options));

  await writeFile(PATH, OUTPUT, 'utf-8');
  if (!options.silent)
    console.log(`\tWrote ${green(relative(options.directory, PATH))}`);
}

async function writeComponent(options: ComponentOptions) {
  if (!await shouldWriteToDir(options))
    return;

  if (!options.silent)
    console.log(`\nCreating ${green(options.name)} in ${getComponentPathFromDirectoryOption(options)}\n`);

  await mkdir(getComponentAbsPath(options), { recursive: true });

  for (const key of Object.keys(FileKey) as FileKey[])
    await writeComponentFile(key, options);

  if (!options.silent)
    console.log(`\n${greenBright('Done!')}`);
}

/**
 * Generate an Apollo Element
 */
export async function component(options: ComponentOptions): Promise<void> {
  if (!options) return; // ctrl-c

  try {
    statSync(join(options.directory, 'package.json'));
  } catch (error) {
    return console.log('‼️ No package.json found.', '👉 Scaffold an app first');
  }

  await writeComponent(options);

  await codegen(options);
}
