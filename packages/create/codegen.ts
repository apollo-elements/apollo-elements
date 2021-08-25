import path from 'path';
import execa, { ExecaReturnValue } from 'execa';
import { AppOptions, BaseOptions, ComponentOptions } from './options.js';
import { getOperationFileName, getUnprefixedTagName } from './component.js';
import Chalk from 'chalk';
const { blue, cyan, yellow, red, greenBright } = Chalk;

const cwd = process.cwd();

interface ExecaError {
  stdout: string;
  errors: Error[];
}

function getFailedFilename(options: ComponentOptions): string {
  try {
    return path.join(
      'src',
      'components',
      getUnprefixedTagName(options),
      getOperationFileName(options)
    );
  } catch {
    return 'the generated operation file';
  }
}

const isOptions = <T extends 'app'|'component'>(type: T) =>
  (options: BaseOptions): options is (T extends 'app' ? AppOptions : ComponentOptions) => {
  // @ts-expect-error: yes it does
    const [argv1] = options._;
    return argv1 === type;
  };

const isAppOptions = isOptions('app');

const isComponentOptions = isOptions('component');

function getFilename(options: BaseOptions): string {
  return (
      isComponentOptions(options) ? blue(getFailedFilename(options))
    : 'the operation definition'
  );
}

function isString(x: unknown): x is string {
  return typeof x === 'string';
}

/** Generate argv for execa */
function getCLIArgs(options: BaseOptions): string[] {
  return [
    (options.pkgManager === 'npm' && 'run'),
    'build:codegen',
    '--',
    '--errors-only',
  ].filter(isString);
}

function logNameError(options: BaseOptions, error: ExecaError): void {
  if (!options.silent)
    console.log(`${red('ERROR:')} Code generation failed.`);
  const uri = isAppOptions(options) ? cyan(options.uri) : 'the specified URI';
  if (!options.silent) {
    console.log(
      `       Is your graphql server running at ${uri}?`,
      `\n${red('ORIGINAL ERROR:')}\n`,
      error.stdout.split('\n').join('\n  '),
      '\n'
    );
  }
}

function logListrError(options: BaseOptions, error: ExecaError): void {
  if (options.silent)
    return;
  console.log(
    `${red('ERROR:')} Code generation failed.`,
    `\n${red('ORIGINAL ERROR:')}\n`
  );
  error.errors.forEach((e: Error) => console.log(e.message));
}

function logError(options: BaseOptions, error: ExecaError): void {
  if (options.silent) return;
  const filename = getFilename(options);
  console.log(
    `${yellow('WARNING:')} Code generation failed. Do the generated GraphQL operations match your schema?`,
    `         Check ${filename}`,
    `\n${red('ORIGINAL ERROR:')}\n`,
    error.stdout.split('\n').join('\n  '),
  );
}

/**
 * Run GraphQL codegen to develop an initial TypeScript schema
 */
export async function codegen(options: BaseOptions): Promise<ExecaReturnValue|void> {
  if (!options.codegen) return;
  if (!options.silent)
    console.log(`\n${cyan('Generating types from schema')}...\n`);
  try {
    await execa(options.pkgManager, getCLIArgs(options), { cwd, all: true });
    if (!options.silent)
      console.log(greenBright('Done!'));
  } catch (error) {
    if (error?.stdout.includes('Cannot read property \'name\' of undefined'))
      logNameError(options, error);
    else if (error?.name === 'ListrError')
      logListrError(options, error);
    else
      logError(options, error);
  }
}
