import execa, { ExecaReturnValue } from 'execa';
import { generate } from '@graphql-codegen/cli';
import { loadConfig } from 'graphql-config';
import { BaseOptions, ComponentOptions } from './options';
import { join } from 'path';
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
/**
 * Run GraphQL codegen to develop an initial TypeScript schema
 */
export async function codegen(options: BaseOptions): Promise<ExecaReturnValue|void> {
  if (options.skipCodegen) return;
  console.log(`\n${cyan('Generating types from schema')}...\n`);
  try {
    const pmCommand = options.pkgManager === 'npm' ? ['run'] : [];

    const args = [
      ...pmCommand,
      'build:codegen',
      '--',
      '--errors-only',
    ];

    await execa(options.pkgManager, args, { cwd, all: true });

    console.log(greenBright('Done!'));
  } catch (error) {
    if (error.name === 'ListrError') {
      console.log(`${red('ERROR:')} Codegen did not succeed.\n`);
      error.errors.forEach((e: Error) => console.log(e.message));
    } else {
      const filename =
        isComponentOptions(options) ? blue(getFailedFilename(options)) : 'the operation definition';
      console.log(`${yellow('WARNING:')} Codegen did not succeed. Do the generated GraphQL operations match your schema?`);
      console.log(`         Check ${filename}`);
      console.log(`\n${red('ORIGINAL ERROR:')}\n`, error.stdout.split('\n').join('\n  '));
    }
  }
}
