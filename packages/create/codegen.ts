import execa, { ExecaReturnValue } from 'execa';
import { BaseOptions, ComponentOptions } from './options';
import { getOperationFileName, getUnprefixedTagName } from './component';
import { blue, cyan, yellow, red, greenBright } from 'chalk';

const cwd = process.cwd();

function getFailedFilename(options: ComponentOptions): string {
  try {
    return `src/components/${getUnprefixedTagName(options)}/${getOperationFileName(options)}`;
  } catch {
    return 'the generated operation file';
  }
}

function isComponentOptions(options: BaseOptions): options is ComponentOptions {
  // @ts-expect-error: yes it does
  const [argv1] = options._;
  return argv1 === 'component';
}

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

/**
 * Run GraphQL codegen to develop an initial TypeScript schema
 */
export async function codegen(options: BaseOptions): Promise<ExecaReturnValue|void> {
  if (options.skipCodegen) return;
  console.log(`\n${cyan('Generating types from schema')}...\n`);
  try {
    await execa(options.pkgManager, getCLIArgs(options), { cwd, all: true });
    console.log(greenBright('Done!'));
  } catch (error) {
    if (error.name === 'ListrError') {
      console.log(`${red('ERROR:')} Codegen did not succeed.\n`);
      error.errors.forEach((e: Error) => console.log(e.message));
    } else {
      const filename = getFilename(options);
      console.log(`${yellow('WARNING:')} Codegen did not succeed. Do the generated GraphQL operations match your schema?`);
      console.log(`         Check ${filename}`);
      console.log(`\n${red('ORIGINAL ERROR:')}\n`, error.stdout.split('\n').join('\n  '));
    }
  }
}
